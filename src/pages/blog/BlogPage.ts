import { Html } from "@effect/ui/html";
import { Schema } from "effect";
import { posts } from "virtual:content";
import { formatShortDate } from "@/lib/utils";
import { pageHead } from "../../components/head.ts";
import { Ledger, LedgerEmpty } from "../../components/Ledger.ts";
import { AppRoute } from "../../routes.ts";

// Drafts stay reachable by URL (they render with an "under construction"
// banner) but are not listed.
const sortedPosts = posts
  .filter((post) => !post.draft)
  .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

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
          h.ol.children(
            sortedPosts.map((post) =>
              h.li
                .key(post.slug)
                .class("border-t border-border first:border-t-0")
                .children(
                  h.a
                    .attr("href", AppRoute.print(AppRoute.Post({ params: { slug: post.slug } })))
                    .class("group grid gap-x-6 gap-y-0.5 py-3 sm:grid-cols-[7rem_1fr]")
                    .children(
                      h.span
                        .class("text-sm text-muted-foreground tabular-nums sm:pt-0.5")
                        .children(formatShortDate(post.date)),
                      h.span
                        .class(
                          "font-medium underline-offset-4 decoration-1 group-hover:text-brand group-hover:underline",
                        )
                        .children(post.title),
                    ),
                ),
            ),
          ),
          LedgerEmpty(h).children("Older posts are still being migrated from the previous site."),
        ],
      }),
    ),
});
