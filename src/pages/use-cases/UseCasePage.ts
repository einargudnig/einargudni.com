import type { View } from "@effect/ui";
import { Component } from "@effect/ui";
import { Html } from "@effect/ui/html";
import { Schema } from "effect";
import { AsyncResult } from "effect/reactivity";
import { ArrowLeft, ArrowRight } from "lucide";
import { ENGAGEMENT_LABEL, findWork, formatMonth, relatedTitle, type WorkEntry } from "@/lib/work";
import { pageHead } from "../../components/head.ts";
import { Icon } from "../../components/Icon.ts";
import { ContentView } from "../../content/ContentView.ts";
import { GetContent } from "../../queries/GetContent.ts";
import { AppRoute } from "../../routes.ts";

// One ruled row of the facts table: label in the first column, value after.
const Fact = <M, C extends View.Children<M, never>>(
  h: Html.H<M>,
  options: { readonly label: string; readonly children: C },
) =>
  h.div
    .class("grid grid-cols-[7rem_1fr] gap-x-6 border-b border-border py-2.5")
    .children(
      h.dt.class("text-muted-foreground").children(options.label),
      h.dd.children(options.children),
    );

const Facts = <M>(h: Html.H<M>, entry: WorkEntry) =>
  h.dl.class("mt-10 border-t border-foreground text-sm").children(
    entry.engagement !== "personal"
      ? Fact(h, {
          label: "Client",
          children: [
            entry.clientUrl
              ? h.a
                  .attr("href", entry.clientUrl)
                  .class(
                    "underline decoration-1 underline-offset-4 hover:text-brand transition-colors",
                  )
                  .children(entry.client)
              : entry.client,
          ],
        })
      : null,
    Fact(h, { label: "Engagement", children: [ENGAGEMENT_LABEL[entry.engagement]] }),
    Fact(h, { label: "Role", children: [entry.role] }),
    Fact(h, {
      label: "Started",
      children: [h.span.class("tabular-nums").children(formatMonth(entry))],
    }),
    Fact(h, {
      label: "Stack",
      children: [h.span.class("text-muted-foreground").children(entry.stack.join(", "))],
    }),
    Fact(h, {
      label: "Outcome",
      children: [
        h.span.class("text-base font-medium leading-snug text-pretty").children(entry.outcome),
      ],
    }),
  );

const HireCta = <M>(h: Html.H<M>) =>
  h.aside.class("border-t border-foreground pt-3").children(
    h.p.class("font-semibold tracking-tight").children("Building something like this?"),
    h.p
      .class("mt-1 max-w-[52ch] text-muted-foreground leading-relaxed")
      .children(
        "If you have a system that could use an agent, or an agent that needs to be trusted in production, tell me about it.",
      ),
    h.a
      .attr("href", `${AppRoute.print(AppRoute.Home())}#contact`)
      .class(
        "mt-4 inline-flex items-center gap-1.5 rounded-sm bg-brand px-4 py-2 font-medium text-brand-foreground transition-[filter,transform] duration-200 ease-[var(--ease-out)] hover:brightness-110 active:scale-[0.98]",
      )
      .children("Work with me", Icon(h, ArrowRight, "h-4 w-4")),
  );

const Related = <M>(h: Html.H<M>, related: ReadonlyArray<string>) =>
  h.aside
    .class("border-t border-border pt-3")
    .children(
      h.h2.class("text-sm text-muted-foreground").children("Related writing"),
      h.ul
        .class("mt-2 space-y-1")
        .children(
          related.map((path) =>
            h.li
              .key(path)
              .children(
                h.a
                  .attr("href", path)
                  .class("text-sm hover:text-brand transition-colors")
                  .children(relatedTitle(path)),
              ),
          ),
        ),
    );

export const UseCasePageNoDeps = Html.component({
  name: "UseCasePage",
  props: Schema.Struct({ slug: Schema.String }),
  model: Schema.Struct({}),
  message: Schema.Never,
  queries: {
    content: {
      query: GetContent,
      args: ({ props }) => {
        const entry = findWork(props.slug);
        return entry ? { path: entry.path } : undefined;
      },
    },
  },
}).make({
  init: () => ({}),
  update: ($) => $.model,
  head: ({ props }) => {
    const entry = findWork(props.slug);
    return entry
      ? pageHead({
          title: entry.title,
          description: entry.summary,
          image: `/og/use-cases-${entry.slug}.png`,
          type: "article",
        })
      : [];
  },
  view: (h) => {
    const entry = findWork(h.props.slug);
    if (!entry) return h.p("This use case doesn't exist.");
    return h.section.class("w-full max-w-2xl space-y-8 print:space-y-6").children(
      h.div.children(
        h.a
          .attr("href", AppRoute.print(AppRoute.UseCases()))
          .class(
            "inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-brand transition-colors",
          )
          .children(Icon(h, ArrowLeft, "h-3 w-3"), "All use cases"),
        h.h1
          .class(
            "mt-4 text-4xl md:text-5xl font-semibold tracking-[-0.035em] leading-[1.05] max-w-[22ch] text-balance",
          )
          .children(entry.title),
        h.p
          .class("mt-4 max-w-[58ch] text-lg text-muted-foreground leading-relaxed text-pretty")
          .children(entry.summary),
        Facts(h, entry),
      ),
      h.article.class("prose dark:prose-invert max-w-[65ch] leading-relaxed").children(
        entry.draft
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
      HireCta(h),
      entry.related.length > 0 ? Related(h, entry.related) : null,
    );
  },
});

export const UseCasePage = UseCasePageNoDeps.pipe(Component.provide(GetContent.layer));
