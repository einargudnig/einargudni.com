import { Command, Subscription, UiSchema } from "@effect/ui";
import { Html } from "@effect/ui/html";
import { ChevronDown } from "lucide";
import { Effect, Queue, Schema, Stream } from "effect";
import { Icon } from "../../components/Icon.ts";

export const TocHeading = Schema.Struct({
  id: Schema.String,
  title: Schema.String,
  level: Schema.Number,
});
export type TocHeading = typeof TocHeading.Type;

const TableOfContentsMessage = UiSchema.TaggedEnum({
  ClickedHeading: { id: Schema.String },
  ScrolledPastHeading: { id: Schema.String },
});

const ScrollToHeading = Command.make("ScrollToHeading", { args: { id: Schema.String } }, ({ id }) =>
  Effect.sync(() => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })),
);

// The section being read: the last heading whose top has passed the fold
// line near the top of the viewport. Read on scroll, at most once a frame,
// so a jump or a fast fling still lands on the right section.
const FOLD = 120;

const scrollSpy = (ids: ReadonlyArray<string>) =>
  Stream.callback<string>((queue) =>
    Effect.acquireRelease(
      Effect.sync(() => {
        let frame = 0;
        let last = "";
        const measure = () => {
          frame = 0;
          let current = ids[0] ?? "";
          for (const id of ids) {
            const top = document.getElementById(id)?.getBoundingClientRect().top;
            if (top !== undefined && top <= FOLD) current = id;
          }
          if (current !== last) {
            last = current;
            Queue.offerUnsafe(queue, current);
          }
        };
        const onScroll = () => {
          if (frame === 0) frame = requestAnimationFrame(measure);
        };
        addEventListener("scroll", onScroll, { passive: true });
        measure();
        return { onScroll, cancel: () => cancelAnimationFrame(frame) };
      }),
      ({ onScroll, cancel }) =>
        Effect.sync(() => {
          removeEventListener("scroll", onScroll);
          cancel();
        }),
    ),
  );

// The headings come from the document itself, so the list is in the
// prerendered HTML instead of being read from the DOM after load. "margin"
// is the sticky index beside the article on wide screens, where the scroll
// spy marks the section being read; "inline" is a collapsed row above the
// article everywhere else.
export const TableOfContents = Html.component({
  name: "TableOfContents",
  props: Schema.Struct({
    headings: Schema.Array(TocHeading),
    variant: Schema.Literals(["margin", "inline"]),
  }),
  model: Schema.Struct({ activeId: Schema.String }),
  message: TableOfContentsMessage,
  restore: false,
}).make({
  init: () => ({ activeId: "" }),
  update: ($, message) =>
    TableOfContentsMessage.match(message, {
      ClickedHeading: ({ id }) =>
        $.set({ activeId: id }).run(ScrollToHeading.make({ id }).pipe(Command.asNoop)),
      ScrolledPastHeading: ({ id }) => ({ activeId: id }),
    }),
  subscriptions: ({ props }) =>
    props.variant === "margin"
      ? [
          Subscription.make(
            "scroll-spy",
            props.headings.map((heading) => heading.id),
            (ids) =>
              scrollSpy(ids).pipe(
                Stream.map((id) => TableOfContentsMessage.ScrolledPastHeading({ id })),
              ),
          ),
        ]
      : [],
  view: (h, { activeId }) => {
    const { headings, variant } = h.props;
    const list = h.ol.class(variant === "inline" ? "[&>li:last-child>a]:border-b-0" : "").children(
      headings.map((heading, index) =>
        h.li
          .key(String(index))
          .class(heading.level > 2 ? "pl-3" : "")
          .children(
            h.a
              .attr("href", `#${heading.id}`)
              .attr("aria-current", activeId === heading.id ? "location" : undefined)
              .class(
                "relative block border-b border-border py-1.5 leading-snug transition-colors duration-200 hover:text-foreground",
                variant === "margin"
                  ? "pl-3 before:absolute before:top-2 before:bottom-2 before:left-0 before:w-px before:origin-top before:bg-foreground before:transition-transform before:duration-300 before:ease-[var(--ease-out)]"
                  : "",
                variant === "margin" && activeId !== heading.id ? "before:scale-y-0" : "",
                activeId === heading.id ? "text-foreground" : "text-muted-foreground",
              )
              .on("click", TableOfContentsMessage.ClickedHeading({ id: heading.id }), {
                preventDefault: true,
              })
              .children(heading.title),
          ),
      ),
    );
    const head = [
      h.span.class("font-medium text-foreground").children("Contents"),
      h.span.class("tabular-nums text-muted-foreground").children(String(headings.length)),
    ];
    return variant === "margin"
      ? h.nav
          .attr("aria-label", "Contents")
          .class("border-t border-foreground text-[0.8125rem]")
          .children(h.p.class("flex justify-between pt-2 pb-1").children(head), list)
      : h.details
          .class(
            "group not-prose border-t border-foreground border-b border-b-border text-sm",
          )
          .children(
            h.summary
              .class(
                "flex cursor-pointer list-none items-center justify-between gap-3 py-2.5 [&::-webkit-details-marker]:hidden",
              )
              .children(
                h.span.class("font-medium text-foreground").children("Contents"),
                h.span
                  .class("flex items-center gap-2 tabular-nums text-muted-foreground")
                  .children(
                    String(headings.length),
                    Icon(
                      h,
                      ChevronDown,
                      "h-4 w-4 transition-transform duration-200 group-open:rotate-180",
                    ).attr("stroke-width", "1.75"),
                  ),
              ),
            h.nav.attr("aria-label", "Contents").class("pb-2").children(list),
          );
  },
});