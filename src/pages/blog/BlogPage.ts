import { Html } from "@effect/ui/html";
import { Schema } from "effect";
import { deepDives, posts } from "virtual:content";
import { formatShortDate } from "@/lib/utils";
import { pageHead } from "../../components/head.ts";
import { Ledger, LedgerEmpty } from "../../components/Ledger.ts";
import { AppRoute } from "../../routes.ts";

// Drafts stay reachable by URL (they render with an "under construction"
// banner) but are not listed.
const newestFirst = <E extends { readonly date: string; readonly draft: boolean }>(
  entries: ReadonlyArray<E>,
) => entries.filter((entry) => !entry.draft).toSorted((a, b) => b.date.localeCompare(a.date));

const sortedPosts = newestFirst(posts);
const sortedDives = newestFirst(deepDives);

interface Row {
  readonly key: string;
  readonly href: string;
  readonly date: string;
  readonly title: string;
  readonly summary: string;
}

// A ledger row: the date, the title, and a line of the entry's dek or its
// opening, so a title like "barf" says what it is about.
const EntryRows = <M>(h: Html.H<M>, rows: ReadonlyArray<Row>) =>
  h.ol.children(
    rows.map((row) =>
      h.li
        .key(row.key)
        .class("border-t border-border first:border-t-0")
        .children(
          h.a
            .attr("href", row.href)
            .class("group grid gap-x-6 gap-y-0.5 py-3 sm:grid-cols-[7rem_1fr]")
            .children(
              h.span
                .class("text-sm text-muted-foreground tabular-nums sm:pt-0.5")
                .children(formatShortDate(row.date)),
              h.span.children(
                h.span
                  .class(
                    "block font-medium underline-offset-4 decoration-1 group-hover:text-brand group-hover:underline",
                  )
                  .children(row.title),
                h.span
                  .class("mt-0.5 line-clamp-1 text-sm text-muted-foreground")
                  .children(row.summary),
              ),
            ),
        ),
    ),
  );

export const BlogPage = Html.component({
  name: "BlogPage",
  model: Schema.Struct({}),
  message: Schema.Never,
}).make({
  init: () => ({}),
  update: ($) => $.model,
  head: () =>
    pageHead({
      title: "Blog",
      description: "Thoughts on software, tech, and building things",
      image: "/og/blog.png",
    }),
  view: (h) =>
    h.section.class("w-full space-y-12 mb-8").children(
      h.h1
        .class("text-4xl md:text-5xl font-semibold tracking-[-0.04em] leading-[1.05] text-balance")
        .children("Blog"),
      Ledger(h, {
        title: "Posts",
        aside: String(sortedPosts.length),
        children: [
          sortedPosts.length === 0 && LedgerEmpty(h).children("No posts yet."),
          EntryRows(
            h,
            sortedPosts.map((post) => ({
              key: post.slug,
              href: AppRoute.print(AppRoute.Post({ params: { slug: post.slug } })),
              date: post.date,
              title: post.title,
              summary: post.description ?? post.excerpt,
            })),
          ),
          LedgerEmpty(h).children("Older posts are still being migrated from the previous site."),
        ],
      }),
      sortedDives.length > 0 &&
        Ledger(h, {
          title: "Deep dives",
          aside: String(sortedDives.length),
          children: [
            EntryRows(
              h,
              sortedDives.map((dive) => ({
                key: dive.slug,
                href: AppRoute.print(AppRoute.DeepDive({ params: { slug: dive.slug } })),
                date: dive.date,
                title: dive.title,
                summary: dive.description ?? dive.excerpt,
              })),
            ),
          ],
        }),
    ),
});
