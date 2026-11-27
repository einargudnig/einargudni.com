import { Component } from "@effect/ui";
import { Html } from "@effect/ui/html";
import { Schema } from "effect";
import { AsyncResult } from "effect/reactivity";
import { posts } from "virtual:content";
import { formatBlogDate } from "@/lib/utils";
import { pageHead } from "../../components/head.ts";
import { ContentTableOfContents, ContentView } from "../../content/ContentView.ts";
import { GetContent } from "../../queries/GetContent.ts";

const find = (slug: string) => posts.find((post) => post.slug === slug);

export const PostPageNoDeps = Html.component({
  name: "PostPage",
  props: Schema.Struct({ slug: Schema.String }),
  model: Schema.Struct({}),
  message: Schema.Never,
  queries: {
    content: {
      query: GetContent,
      args: ({ props }) => {
        const post = find(props.slug);
        return post ? { path: post.path } : undefined;
      },
    },
  },
}).make({
  init: () => ({}),
  update: ($) => $.model,
  head: ({ props }) => {
    const post = find(props.slug);
    return post
      ? pageHead({
          title: post.title,
          description: post.excerpt,
          image: `/og/blog-${post.slug}.png`,
          type: "article",
        })
      : [];
  },
  view: (h) => {
    const post = find(h.props.slug);
    if (!post) return h.p("This post doesn't exist.");
    return h.section.class("w-full max-w-2xl space-y-8 print:space-y-6").children(
      h.div.children(
        h.h1
          .class(
            "text-4xl md:text-5xl font-semibold tracking-[-0.035em] leading-[1.05] max-w-[22ch] text-balance",
          )
          .children(post.title),
        h.div
          .class("flex items-center gap-3 mt-4 mb-8")
          .children(
            h.div
              .class("text-sm text-muted-foreground tabular-nums")
              .children(formatBlogDate(post.date)),
            h.div.class("h-px flex-1 bg-border/50"),
          ),
      ),
      h.article.class("prose dark:prose-invert max-w-[65ch] leading-relaxed").children(
        AsyncResult.isSuccess(h.queries.content)
          ? ContentTableOfContents(h, h.queries.content.value)
          : null,
        post.draft
          ? h.p
              .class("mb-6 border-y border-border py-2.5 text-sm text-muted-foreground")
              .children("Draft. This piece is not finished yet.")
          : null,
        AsyncResult.match(h.queries.content, {
          onInitial: () => h.p.class("text-muted-foreground").children("Loading…"),
          onFailure: () =>
            h.p.children("This piece didn't load. Reloading the page usually fixes it."),
          onSuccess: ({ value }) => ContentView(h, value),
        }),
      ),
    );
  },
});

export const PostPage = PostPageNoDeps.pipe(Component.provide(GetContent.layer));
