import { Html } from "@effect/ui/html";
import { Schema } from "effect";
import { pageHead } from "../components/head.ts";
import { Ledger } from "../components/Ledger.ts";
import { AppRoute } from "../routes.ts";

const heading =
  "max-w-[18ch] text-4xl font-semibold leading-[1.05] tracking-[-0.04em] text-balance md:text-5xl";

const ELSEWHERE = [
  { href: AppRoute.print(AppRoute.Home()), label: "Home" },
  { href: AppRoute.print(AppRoute.UseCases()), label: "Use cases" },
  { href: AppRoute.print(AppRoute.Blog()), label: "Blog" },
  { href: AppRoute.print(AppRoute.Uses()), label: "Uses" },
];

// Prerendered once as 404.html and served for any unknown path, so the path
// it names comes from the browser, not the build.
export const NotFoundPage = Html.component({
  name: "NotFoundPage",
  model: Schema.Struct({}),
  message: Schema.Never,
}).make({
  init: () => ({}),
  update: ($) => $.model,
  head: () => pageHead({ title: "Not found", description: "There's nothing at this address." }),
  view: (h) =>
    h.section.class("space-y-16").children(
      h.div
        .class("space-y-4")
        .children(
          h.p.class("text-sm text-muted-foreground tabular-nums").children("404"),
          h.h1.class(heading).children("Not in the almanac."),
          h.p
            .class("max-w-[54ch] text-lg text-muted-foreground leading-relaxed text-pretty")
            .children(
              "There's nothing at this address. It may have moved, or it was never written.",
            ),
        ),
      // Every way out, printed as the almanac's own table so a dead end still
      // looks like part of the site.
      Ledger(h, {
        title: "Try instead",
        children: [
          h.ol.children(
            ELSEWHERE.map(({ href, label }) =>
              h.li
                .key(href)
                .class("border-t border-border first:border-t-0")
                .children(
                  h.a
                    .attr("href", href)
                    .class("group block py-3")
                    .children(
                      h.span
                        .class("font-medium underline-offset-4 decoration-1 group-hover:underline")
                        .children(label),
                    ),
                ),
            ),
          ),
        ],
      }),
    ),
});
