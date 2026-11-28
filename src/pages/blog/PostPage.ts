import { Component } from "@effect/ui";
import { Html } from "@effect/ui/html";
import { Schema } from "effect";
import { posts } from "virtual:content";
import { Entry, neighbours } from "../../components/Entry.ts";
import { pageHead } from "../../components/head.ts";
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
          description: post.description ?? post.excerpt,
          image: `/og/blog-${post.slug}.png`,
          type: "article",
        })
      : [];
  },
  view: (h) => {
    const post = find(h.props.slug);
    if (!post) return h.p("This post doesn't exist.");
    const { older, newer } = neighbours(posts, post);
    return Entry(h, {
      title: post.title,
      date: post.date,
      minutes: post.metadata.readingTime,
      description: post.description,
      draft: post.draft,
      content: h.queries.content,
      older: older && { title: older.title, href: older.permalink },
      newer: newer && { title: newer.title, href: newer.permalink },
      index: { title: "All writing", href: "/blog" },
    });
  },
});

export const PostPage = PostPageNoDeps.pipe(Component.provide(GetContent.layer));
