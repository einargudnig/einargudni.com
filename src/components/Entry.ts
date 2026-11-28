import type { Html } from "@effect/ui/html";
import { AsyncResult } from "effect/reactivity";
import { formatShortDate } from "@/lib/utils";
import { ContentView, contentsOf } from "../content/ContentView.ts";
import { TableOfContents } from "../content/islands/TableOfContents.ts";
import type { Content } from "../queries/GetContent.ts";

export interface EntryLink {
  readonly title: string;
  readonly href: string;
}

export interface EntryOptions {
  readonly title: string;
  readonly date: string;
  readonly minutes: number;
  readonly description: string | null | undefined;
  readonly draft: boolean;
  readonly content: AsyncResult.AsyncResult<Content, unknown>;
  readonly older: EntryLink | undefined;
  readonly newer: EntryLink | undefined;
  readonly index: EntryLink;
}

// Newest first, drafts left out unless the entry itself is one: a draft can
// link onward, but nothing published links to a draft.
export const neighbours = <E extends { readonly date: string; readonly draft: boolean }>(
  entries: ReadonlyArray<E>,
  entry: E,
) => {
  const listed = entries
    .filter((other) => other === entry || !other.draft)
    .toSorted((a, b) => b.date.localeCompare(a.date));
  const at = listed.indexOf(entry);
  return { newer: listed[at - 1], older: listed[at + 1] };
};

// The newest entry has no "Newer" and the oldest no "Older": the slot stays
// empty so the other keeps its side.
const Neighbour = <M>(h: Html.H<M>, label: string, link: EntryLink | undefined, end: boolean) =>
  h.div
    .class(end ? "sm:text-right" : "")
    .children(
      link
        ? [
            h.p.key("label").class("text-sm text-muted-foreground").children(label),
            h.a
              .key("link")
              .attr("href", link.href)
              .class("mt-1 block font-medium text-pretty underline-offset-4 hover:underline")
              .children(link.title),
          ]
        : null,
    );

// A post or deep dive: title, dek and a dated meta rule; the contents in the
// margin on wide screens and collapsed above the prose elsewhere; then the
// end-matter, ruled like a ledger, so a reader who finishes has somewhere to go.
export const Entry = <M>(h: Html.H<M>, options: EntryOptions) => {
  const contents = AsyncResult.isSuccess(options.content) ? contentsOf(options.content.value) : [];
  return h.section.class("w-full max-w-2xl").children(
    h.div.attr("aria-hidden", "true").class("reading-progress"),
    h.header.children(
      h.h1
        .class(
          "text-4xl md:text-5xl font-semibold tracking-[-0.035em] leading-[1.05] max-w-[22ch] text-balance",
        )
        .children(options.title),
      options.description
        ? h.p
            .class("mt-5 max-w-[52ch] text-lg leading-relaxed text-pretty text-muted-foreground")
            .children(options.description)
        : null,
      h.p
        .class("mt-6 flex items-center gap-3 text-sm tabular-nums text-muted-foreground")
        .children(
          h.time
            .attr("datetime", options.date.slice(0, 10))
            .children(formatShortDate(options.date)),
          h.span.attr("aria-hidden", "true").children("·"),
          h.span.children(`${Math.max(1, options.minutes)} min read`),
          h.span.attr("aria-hidden", "true").class("h-px flex-1 bg-border"),
        ),
    ),
    h.div.class("relative mt-10").children(
      contents.length > 0
        ? h.aside.class("absolute top-0 bottom-0 left-full ml-12 hidden w-44 xl:block").children(
            h.div.class("sticky top-10").children(
              TableOfContents(h, {
                key: "contents-margin",
                props: { headings: contents, variant: "margin" },
              }),
            ),
          )
        : null,
      h.article.class("prose dark:prose-invert max-w-[65ch]").children(
        contents.length > 0
          ? h.div.class("mb-10 xl:hidden").children(
              TableOfContents(h, {
                key: "contents-inline",
                props: { headings: contents, variant: "inline" },
              }),
            )
          : null,
        options.draft
          ? h.p
              .class("mb-6 border-y border-border py-2.5 text-sm text-muted-foreground")
              .children("Draft. This piece is not finished yet.")
          : null,
        AsyncResult.match(options.content, {
          onInitial: () => h.p.class("text-muted-foreground").children("Loading…"),
          onFailure: () =>
            h.p.children("This piece didn't load. Reloading the page usually fixes it."),
          onSuccess: ({ value }) => ContentView(h, value),
        }),
      ),
      h.footer.class("mt-16 max-w-[65ch] border-t border-foreground pt-3").children(
        h.nav
          .attr("aria-label", "More writing")
          .class("grid gap-6 sm:grid-cols-2")
          .children(
            Neighbour(h, "Older", options.older, false),
            Neighbour(h, "Newer", options.newer, true),
          ),
        h.p
          .class(
            "mt-8 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 border-t border-border pt-3 text-sm",
          )
          .children(
            h.a
              .attr("href", options.index.href)
              .class(
                "text-muted-foreground underline-offset-4 hover:text-foreground hover:underline",
              )
              .children(options.index.title),
            h.span
              .class("text-muted-foreground")
              .children(
                "Building something like this? ",
                h.a
                  .attr("href", "/#contact")
                  .class("font-medium text-foreground underline underline-offset-4")
                  .children("Work with me"),
              ),
          ),
      ),
    ),
  );
};
