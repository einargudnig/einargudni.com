import { Component } from "@effect/ui";
import { Html } from "@effect/ui/html";
import { Schema } from "effect";
import { learnings } from "virtual:content";
import { formatBlogDate } from "@/lib/utils";
import { pageHead } from "../../components/head.ts";
import { ContentEntry } from "../../content/ContentEntry.ts";
import { GetContent } from "../../queries/GetContent.ts";
import { AppRoute } from "../../routes.ts";

const sorted = [...learnings].sort(
  (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
);

// The site's outline button, small (components/ui/button.tsx).
const BUTTON =
  "inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-[transform,background-color,color] duration-150 ease-[var(--ease-out)] active:scale-[0.97] disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50 h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5";

export const LearningsPageNoDeps = Html.component({
  name: "LearningsPage",
  model: Schema.Struct({}),
  message: Schema.Never,
  queries: {
    bodies: { queryMany: GetContent, args: () => sorted.map(({ path }) => ({ path })) },
  },
}).make({
  init: () => ({}),
  update: ($) => $.model,
  head: () =>
    pageHead({
      title: "Learnings",
      description: "Things I've learned along the way",
      image: "/og/learnings.png",
    }),
  view: (h) =>
    h.section.class("w-full max-w-2xl space-y-10 print:space-y-8 mb-8").children(
      h.h1
        .class(
          "text-4xl md:text-5xl font-semibold tracking-[-0.04em] leading-[1.05] text-balance mb-6",
        )
        .children("Notes"),
      h.div.class("divide-y divide-border/50 stagger-list").children(
        sorted.map((item) =>
          h.div
            .key(`${item.topic}-${item.date}`)
            .class("py-8 first:pt-0")
            .children(
              h.article.class("prose dark:prose-invert mb-3").children(
                h.header.class("mb-4").children(
                  h.h2.class("text-xl font-semibold").children(item.title),
                  h.div.class("text-sm text-muted-foreground flex items-center gap-2").children(
                    h.span.class("text-brand font-mono").children(item.topic),
                    h.span.children("·"),
                    h.time
                      .class("font-mono tabular-nums")
                      .attr("datetime", item.date)
                      .children(formatBlogDate(item.date)),
                    item.deepDiveSlug
                      ? h.a
                          .attr(
                            "href",
                            AppRoute.print(
                              AppRoute.DeepDive({ params: { slug: item.deepDiveSlug } }),
                            ),
                          )
                          .class("no-underline")
                          .children(
                            h.button
                              .attr("data-slot", "button")
                              .class(BUTTON)
                              .children("Deep Dive"),
                          )
                      : null,
                  ),
                ),
                item.path ? ContentEntry(h, h.queries.bodies, item.path) : null,
              ),
            ),
        ),
      ),
    ),
});

export const LearningsPage = LearningsPageNoDeps.pipe(Component.provide(GetContent.layer));
