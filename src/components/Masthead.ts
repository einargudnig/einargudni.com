import { Html } from "@effect/ui/html";
import { AppRoute } from "../routes.ts";
import { EditionToggle } from "./EditionToggle.ts";
import { KeyboardHint } from "./KeyboardHint.ts";
import { SunTimes } from "./SunTimes.ts";

const NAV = [
  { href: AppRoute.print(AppRoute.UseCases()), name: "use cases" },
  { href: AppRoute.print(AppRoute.Blog()), name: "blog" },
  { href: AppRoute.print(AppRoute.Uses()), name: "uses" },
];

// The masthead: name and sections on a full-weight rule, today's Reykjavík
// sun and the edition beneath it.
export const Masthead = <M>(h: Html.H<M>, pathname: string) =>
  h.header.class("masthead mb-14 md:mb-20 print:mb-8").children(
    h.div
      .class("flex items-baseline justify-between gap-4 border-b border-foreground pb-2.5")
      .children(
        h.a
          .attr("href", "/")
          .attr("aria-current", pathname === "/" ? "page" : undefined)
          .class("font-semibold tracking-tight transition-colors hover:text-brand")
          .children("Einar Gudni"),
        h.nav
          .attr("aria-label", "Main")
          .attr("id", "nav")
          .class("flex items-baseline gap-3 text-sm sm:gap-5")
          .children(
            NAV.map(({ href, name }) => {
              const active = pathname.startsWith(href);
              return h.a
                .key(href)
                .attr("href", href)
                .attr("aria-current", active ? "page" : undefined)
                .class(
                  "underline-offset-[6px] transition-colors",
                  active
                    ? "text-foreground underline decoration-1"
                    : "text-muted-foreground hover:text-foreground",
                )
                .children(name);
            }),
            h.a
              .attr("href", "/#contact")
              .class("hidden text-brand underline-offset-[6px] hover:underline sm:inline")
              .children("work with me"),
          ),
      ),
    h.div
      .class("flex items-center justify-between gap-4 pt-2")
      .children(
        SunTimes(h, {}),
        h.div
          .class("flex items-center gap-4")
          .children(
            h.a
              .attr("href", "/#contact")
              .class("text-sm text-brand underline-offset-[6px] hover:underline sm:hidden")
              .children("hire"),
            EditionToggle(h, {}),
            KeyboardHint(h, {}),
          ),
      ),
  );
