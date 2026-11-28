import { Component } from "@effect/ui";
import { Html } from "@effect/ui/html";
import { Schema } from "effect";
import { deepDives } from "virtual:content";
import { Entry, neighbours } from "../../components/Entry.ts";
import { pageHead } from "../../components/head.ts";
import { GetContent } from "../../queries/GetContent.ts";

const find = (slug: string) => deepDives.find((dive) => dive.slug === slug);

export const DeepDivePageNoDeps = Html.component({
  name: "DeepDivePage",
  props: Schema.Struct({ slug: Schema.String }),
  model: Schema.Struct({}),
  message: Schema.Never,
  queries: {
    content: {
      query: GetContent,
      args: ({ props }) => {
        const dive = find(props.slug);
        return dive ? { path: dive.path } : undefined;
      },
    },
  },
}).make({
  init: () => ({}),
  update: ($) => $.model,
  head: ({ props }) => {
    const dive = find(props.slug);
    return dive
      ? pageHead({
          title: dive.title,
          description: dive.description ?? dive.excerpt,
          image: `/og/deep-dive-${dive.slug}.png`,
          type: "article",
        })
      : [];
  },
  view: (h) => {
    const dive = find(h.props.slug);
    if (!dive) return h.p("This deep dive doesn't exist.");
    const { older, newer } = neighbours(deepDives, dive);
    return Entry(h, {
      title: dive.title,
      date: dive.date,
      minutes: dive.metadata.readingTime,
      description: dive.description,
      draft: dive.draft,
      content: h.queries.content,
      older: older && { title: older.title, href: older.permalink },
      newer: newer && { title: newer.title, href: newer.permalink },
      index: { title: "All writing", href: "/blog" },
    });
  },
});

export const DeepDivePage = DeepDivePageNoDeps.pipe(Component.provide(GetContent.layer));
