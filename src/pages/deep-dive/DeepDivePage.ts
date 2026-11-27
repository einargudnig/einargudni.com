import { Component, Head } from "@effect/ui";
import { Html, HtmlHead } from "@effect/ui/html";
import { Schema } from "effect";
import { AsyncResult } from "effect/reactivity";
import { deepDives } from "virtual:content";
import { formatBlogDate } from "@/lib/utils";
import { ContentTableOfContents, ContentView } from "../../content/ContentView.ts";
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
  // A deep dive has no description of its own, so the site's stays.
  head: ({ props }) => {
    const dive = find(props.slug);
    if (!dive) return [];
    const image = `/og/deep-dive-${dive.slug}.png`;
    return [
      Head.title(dive.title),
      HtmlHead.meta({ property: "og:title", content: dive.title }),
      HtmlHead.meta({ property: "og:image", content: image }),
      HtmlHead.meta({ property: "og:type", content: "article" }),
      HtmlHead.meta({ name: "twitter:card", content: "summary_large_image" }),
      HtmlHead.meta({ name: "twitter:image", content: image }),
    ];
  },
  view: (h) => {
    const dive = find(h.props.slug);
    if (!dive) return h.p("This deep dive doesn't exist.");
    const content = h.queries.content;
    return h.section.class("w-full max-w-2xl space-y-8 print:space-y-6").children(
      h.div.children(
        h.h1
          .class(
            "text-4xl md:text-5xl font-semibold tracking-[-0.035em] leading-[1.05] max-w-[22ch] text-balance",
          )
          .children(dive.title),
        h.div
          .class("flex items-center gap-3 mt-4 mb-8")
          .children(
            h.div
              .class("text-sm text-muted-foreground tabular-nums")
              .children(formatBlogDate(dive.date)),
            h.div.class("h-px flex-1 bg-border/50"),
          ),
      ),
      h.article.class("prose dark:prose-invert max-w-[65ch] leading-relaxed").children(
        AsyncResult.isSuccess(content) ? ContentTableOfContents(h, content.value) : null,
        dive.draft
          ? h.p
              .class("mb-6 border-y border-border py-2.5 text-sm text-muted-foreground")
              .children("Draft. This piece is not finished yet.")
          : null,
        AsyncResult.match(content, {
          onInitial: () => h.p.class("text-muted-foreground").children("Loading…"),
          onFailure: () =>
            h.p.children("This piece didn't load. Reloading the page usually fixes it."),
          onSuccess: ({ value }) => ContentView(h, value),
        }),
      ),
    );
  },
});

export const DeepDivePage = DeepDivePageNoDeps.pipe(Component.provide(GetContent.layer));
