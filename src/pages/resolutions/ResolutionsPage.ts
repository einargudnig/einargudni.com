import { Html } from "@effect/ui/html";
import { Schema } from "effect";
import { pageTitle } from "../../components/ProseSection.ts";

const RESOLUTIONS = [
  "Become a dad!",
  "sub 75 minute pro single HYROX ",
  "Create a native app",
  "Publish an app (app store, play store)",
  "Create a simple web service in hono",
  "Re-write the simple web service in effect",
  "Finish Total TypeScript Pro courses",
  "Finish the uses page",
];

// The unchecked, disabled checkbox the shadcn/Radix one rendered: a button
// that ignores clicks, with no indicator while unchecked.
const checkbox =
  "peer border-input dark:bg-input/30 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground dark:data-[state=checked]:bg-primary data-[state=checked]:border-primary focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive size-4 shrink-0 rounded-[4px] border shadow-xs transition-shadow outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50";

export const ResolutionsPage = Html.component({
  name: "ResolutionsPage",
  model: Schema.Struct({}),
  message: Schema.Never,
}).make({
  init: () => ({}),
  update: ($) => $.model,
  view: (h) =>
    h.section
      .class("w-full max-w-2xl space-y-8 print:space-y-6 mb-8")
      .children(
        h.h1.class(pageTitle).children("Resolutions"),
        h.div
          .class("prose prose-neutral dark:prose-invert")
          .children(
            h.p.class("text-brand text-lg font-mono").children("2026"),
            h.ul
              .class("mt-4")
              .children(
                RESOLUTIONS.map((resolution) =>
                  h.li
                    .key(resolution)
                    .class("flex items-center gap-2")
                    .children(
                      h.button
                        .attr("type", "button")
                        .attr("role", "checkbox")
                        .attr("aria-checked", "false")
                        .attr("data-state", "unchecked")
                        .attr("data-disabled", "")
                        .attr("data-slot", "checkbox")
                        .attr("value", "on")
                        .disabled(true)
                        .class(checkbox),
                      h.p.children(resolution),
                    ),
                ),
              ),
          ),
      ),
});
