import { Component, UiSchema } from "@effect/ui";
import { Html } from "@effect/ui/html";
import { Tabs as KitTabs } from "@effect/ui-kit";
import { Schema } from "effect";
import { learnings, links } from "virtual:content";
import { formatShortDate } from "@/lib/utils";
import { pageHead } from "../../components/head.ts";
import { ContentEntry } from "../../content/ContentEntry.ts";
import { GetContent } from "../../queries/GetContent.ts";
import { AppRoute } from "../../routes.ts";

const byDateDesc = (a: { readonly date: string }, b: { readonly date: string }) =>
  new Date(b.date).getTime() - new Date(a.date).getTime();

const sortedLearnings = [...learnings].sort(byDateDesc);
const sortedLinks = [...links].sort(byDateDesc);

// Radix's ArrowTopRightIcon, drawn inline so it renders on the server.
const ARROW_TOP_RIGHT =
  "M3.64645 11.3536C3.45118 11.1583 3.45118 10.8417 3.64645 10.6465L10.2929 4L6 4C5.72386 4 5.5 3.77614 5.5 3.5C5.5 3.22386 5.72386 3 6 3L11.5 3C11.6326 3 11.7598 3.05268 11.8536 3.14645C11.9473 3.24022 12 3.36739 12 3.5L12 9.00001C12 9.27615 11.7761 9.50001 11.5 9.50001C11.2239 9.50001 11 9.27615 11 9.00001V4.70711L4.35355 11.3536C4.15829 11.5488 3.84171 11.5488 3.64645 11.3536Z";

const Tab = Schema.Literals(["notes", "links"]);

const NotesPageMessage = UiSchema.TaggedEnum({
  SelectedTab: { value: Schema.String },
});

// ui-kit's Tabs gives the switcher tab roles, ties each tab to its panel, and
// moves focus between them with the arrow keys. The underline shows on the
// tab the kit marks data-active.
const TAB_CLASS =
  "group px-3 py-2 text-sm font-medium transition-colors relative text-muted-foreground hover:text-foreground/80 data-active:text-foreground data-active:hover:text-foreground";
const TABS = [
  { value: "notes", label: "Notes" },
  { value: "links", label: "Links" },
] as const;
const TAB_UNDERLINE =
  "absolute bottom-0 left-3 right-3 h-px bg-foreground hidden group-data-active:block";

export const NotesPageNoDeps = Html.component({
  name: "NotesPage",
  model: Schema.Struct({ tab: Tab }),
  message: NotesPageMessage,
  queries: {
    bodies: { queryMany: GetContent, args: () => sortedLearnings.map(({ path }) => ({ path })) },
  },
}).make({
  init: () => ({ tab: "notes" as const }),
  update: ($, { value }) => (value === "notes" || value === "links" ? { tab: value } : $.model),
  head: () =>
    pageHead({
      title: "Notes",
      description: "Quick thoughts and ideas",
      image: "/og/notes.png",
    }),
  view: (h, { tab }) =>
    h.section.class("w-full max-w-2xl space-y-10 print:space-y-8 mb-8").children(
      h.h1
        .class(
          "text-4xl md:text-5xl font-semibold tracking-[-0.04em] leading-[1.05] text-balance mb-6",
        )
        .children("Notes"),
      KitTabs(h, {
        props: { value: tab, tabs: TABS.map(({ value }) => ({ value })) },
        onEmit: { Selected: ({ value }) => NotesPageMessage.SelectedTab({ value }) },
        view: (tabs) =>
          tabs.root(h.div).children(
            tabs
              .list(h.div.class("flex gap-1 border-b border-border/50 mb-8"))
              .children(
                TABS.map(({ value, label }) =>
                  tabs
                    .tab({ element: h.button.key(value).class(TAB_CLASS), value })
                    .children(label, h.span.class(TAB_UNDERLINE)),
                ),
              ),
            tabs.panel({ element: h.div, value: "notes" })?.children(
              h.div.class("divide-y divide-border").children(
                sortedLearnings.map((item) =>
                  h.div
                    .key(`${item.topic}-${item.date}`)
                    .class("py-8 first:pt-0")
                    .children(
                      h.article.class("prose dark:prose-invert mb-3").children(
                        h.header.class("mb-4").children(
                          h.h2.class("text-xl font-semibold").children(item.title),
                          h.div
                            .class("text-sm text-muted-foreground flex items-center gap-2")
                            .children(
                              h.span.class("text-foreground").children(item.topic),
                              h.span.children("·"),
                              h.time
                                .class("tabular-nums")
                                .attr("datetime", item.date)
                                .children(formatShortDate(item.date)),
                              item.deepDiveSlug && h.span.children("·"),
                              item.deepDiveSlug &&
                                h.a
                                  .attr(
                                    "href",
                                    AppRoute.print(
                                      AppRoute.DeepDive({ params: { slug: item.deepDiveSlug } }),
                                    ),
                                  )
                                  .class(
                                    "text-foreground underline decoration-1 underline-offset-4 hover:text-brand",
                                  )
                                  .children("Deep dive"),
                            ),
                        ),
                        item.path ? ContentEntry(h, h.queries.bodies, item.path) : null,
                      ),
                    ),
                ),
              ),
            ) ?? null,
            tabs.panel({ element: h.div, value: "links" })?.children(
              h.div.class("divide-y divide-border").children(
                sortedLinks.map((item) =>
                  h.div
                    .key(item.url)
                    .class("py-6 first:pt-0")
                    .children(
                      h.a
                        .attr("href", item.url)
                        .attr("target", "_blank")
                        .attr("rel", "noopener noreferrer")
                        .class("group block")
                        .children(
                          h.div
                            .class("flex items-start justify-between gap-3")
                            .children(
                              h.div
                                .class("space-y-1.5")
                                .children(
                                  h.h2
                                    .class(
                                      "text-base font-semibold group-hover:text-brand transition-colors",
                                    )
                                    .children(
                                      item.title,
                                      h.svg
                                        .attr("width", "15")
                                        .attr("height", "15")
                                        .attr("viewBox", "0 0 15 15")
                                        .attr("fill", "none")
                                        .attr("xmlns", "http://www.w3.org/2000/svg")
                                        .class(
                                          "inline-block ml-1.5 h-3.5 w-3.5 opacity-0 -translate-y-0.5 group-hover:opacity-60 group-hover:translate-y-0 transition-[opacity,transform] duration-150",
                                        )
                                        .children(
                                          h.path
                                            .attr("d", ARROW_TOP_RIGHT)
                                            .attr("fill", "currentColor")
                                            .attr("fill-rule", "evenodd")
                                            .attr("clip-rule", "evenodd"),
                                        ),
                                    ),
                                  h.p
                                    .class("text-sm text-muted-foreground leading-relaxed")
                                    .children(item.description),
                                  h.div
                                    .class(
                                      "flex items-center gap-2 text-xs text-muted-foreground/70",
                                    )
                                    .children(
                                      h.time
                                        .class("tabular-nums")
                                        .attr("datetime", item.date)
                                        .children(formatShortDate(item.date)),
                                      item.tags && item.tags.length > 0 && h.span.children("·"),
                                      ...(item.tags ?? []).map((tag) =>
                                        h.span
                                          .key(tag)
                                          .class("text-muted-foreground")
                                          .children(tag),
                                      ),
                                    ),
                                ),
                            ),
                        ),
                    ),
                ),
                sortedLinks.length === 0 &&
                  h.p.class("text-muted-foreground text-sm py-8").children("No links yet."),
              ),
            ) ?? null,
          ),
      }),
    ),
});

export const NotesPage = NotesPageNoDeps.pipe(Component.provide(GetContent.layer));
