import type { View } from "@effect/ui";
import { Html } from "@effect/ui/html";

// The almanac's table head: a full-weight rule, the table's name, and either
// how many entries follow or where the rest of them are.
export const LedgerHead = <M>(
  h: Html.H<M>,
  options: { readonly title: string; readonly id?: string; readonly aside?: string; readonly href?: string },
) =>
  h.div
    .class("flex items-baseline justify-between gap-4 border-t border-foreground pt-2.5 pb-1")
    .children(
      h.h2.attr("id", options.id).class("font-semibold tracking-tight").children(options.title),
      options.href
        ? h.a
            .attr("href", options.href)
            .class("text-sm text-muted-foreground underline-offset-4 transition-colors hover:text-brand hover:underline")
            .children(options.aside ?? "")
        : options.aside
          ? h.span.class("text-sm text-muted-foreground tabular-nums").children(options.aside)
          : null,
    );

// A table section. `scroll-mt` keeps an anchored heading clear of the top.
export const Ledger = <M, C extends View.Children<M>>(
  h: Html.H<M>,
  options: {
    readonly title: string;
    readonly aside?: string;
    readonly href?: string;
    readonly id?: string;
    readonly children: C;
  },
) =>
  h.section
    .attr("aria-labelledby", options.id ? `${options.id}-title` : undefined)
    .attr("id", options.id)
    .class("scroll-mt-8")
    .children(
      LedgerHead(h, {
        title: options.title,
        ...(options.aside === undefined ? {} : { aside: options.aside }),
        ...(options.href === undefined ? {} : { href: options.href }),
        ...(options.id === undefined ? {} : { id: `${options.id}-title` }),
      }),
      options.children,
    );

// An empty table still prints its ruling, so absence reads as designed.
export const LedgerEmpty = <M>(h: Html.H<M>) =>
  h.p.class("border-t border-border py-3 text-sm text-muted-foreground");
