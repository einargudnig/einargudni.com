import { Command, Subscription, UiSchema } from "@effect/ui";
import { Html } from "@effect/ui/html";
import { Effect, Queue, Schema, Stream } from "effect";

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

// Highlights the heading currently near the top of the viewport.
const scrollSpy = (ids: ReadonlyArray<string>) =>
  Stream.callback<string>((queue) =>
    Effect.acquireRelease(
      Effect.sync(() => {
        const observer = new IntersectionObserver(
          (entries) => {
            for (const entry of entries) {
              if (entry.isIntersecting) Queue.offerUnsafe(queue, entry.target.id);
            }
          },
          { rootMargin: "-80px 0px -80% 0px" },
        );
        for (const id of ids) {
          const element = document.getElementById(id);
          if (element) observer.observe(element);
        }
        return observer;
      }),
      (observer) => Effect.sync(() => observer.disconnect()),
    ),
  );

// The headings come from the document itself, so the list is in the
// prerendered HTML instead of being read from the DOM after load.
export const TableOfContents = Html.component({
  name: "TableOfContents",
  props: Schema.Struct({ headings: Schema.Array(TocHeading) }),
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
  subscriptions: ({ props }) => [
    Subscription.make(
      "scroll-spy",
      props.headings.map((heading) => heading.id),
      (ids) =>
        scrollSpy(ids).pipe(Stream.map((id) => TableOfContentsMessage.ScrolledPastHeading({ id }))),
    ),
  ],
  view: (h, { activeId }) =>
    h.div.class("my-8").children(
      h.h2.class("text-lg font-medium").children("Table of Contents"),
      h.nav.class("mt-2").children(
        h.ul.class("space-y-2").children(
          h.props.headings.map((heading, index) =>
            h.li
              .key(String(index))
              .style({ paddingLeft: `${heading.level - 1}rem` })
              .children(
                h.a
                  .attr("href", `#${heading.id}`)
                  .class(
                    activeId === heading.id
                      ? "text-sm inline-block hover:underline font-medium text-primary"
                      : "text-sm inline-block hover:underline text-muted-foreground",
                  )
                  .on("click", TableOfContentsMessage.ClickedHeading({ id: heading.id }), {
                    preventDefault: true,
                  })
                  .children(heading.title),
              ),
          ),
        ),
      ),
    ),
});
