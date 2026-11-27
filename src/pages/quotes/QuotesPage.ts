import { Component } from "@effect/ui";
import { Html } from "@effect/ui/html";
import { Schema } from "effect";
import { quotes } from "virtual:content";
import { formatBlogDate } from "@/lib/utils";
import { ContentEntry } from "../../content/ContentEntry.ts";
import { GetContent } from "../../queries/GetContent.ts";

const sorted = [...quotes].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

// The page sets no head of its own, so the site's title and description stay.
export const QuotesPageNoDeps = Html.component({
  name: "QuotesPage",
  model: Schema.Struct({}),
  message: Schema.Never,
  queries: {
    bodies: { queryMany: GetContent, args: () => sorted.map(({ path }) => ({ path })) },
  },
}).make({
  init: () => ({}),
  update: ($) => $.model,
  view: (h) =>
    h.section.class("w-full max-w-2xl space-y-10 print:space-y-8 mb-8").children(
      h.h1
        .class(
          "text-4xl md:text-5xl font-semibold tracking-[-0.04em] leading-[1.05] text-balance mb-6",
        )
        .children("Quotes"),
      h.div.class("divide-y divide-border/50 stagger-list").children(
        sorted.map((quote) =>
          // `author` + `date` alone aren't guaranteed unique (a single author
          // can be quoted more than once on the same day), so `text` is
          // included to disambiguate — two distinct quotes never share text.
          h.div
            .key(`${quote.author}-${quote.date}-${quote.text}`)
            .class("py-8 first:pt-0 last:pb-0")
            .children(
              h.article.children(
                h.blockquote
                  .class("border-l-2 border-brand pl-4 italic text-lg leading-relaxed max-w-[65ch]")
                  .children(`“${quote.text}”`),
                h.div
                  .class("text-sm text-muted-foreground mt-3 flex items-center gap-2")
                  .children(
                    h.span.class("font-medium text-foreground").children(quote.author),
                    quote.source && h.span.class("mx-1").children("·"),
                    quote.source && h.span.children(quote.source),
                    h.span.class("mx-1").children("·"),
                    h.time
                      .class("font-mono tabular-nums")
                      .attr("datetime", quote.date)
                      .children(formatBlogDate(quote.date)),
                  ),
                quote.path
                  ? h.div
                      .class("mt-4 text-sm text-muted-foreground")
                      .children(ContentEntry(h, h.queries.bodies, quote.path))
                  : null,
              ),
            ),
        ),
      ),
    ),
});

export const QuotesPage = QuotesPageNoDeps.pipe(Component.provide(GetContent.layer));
