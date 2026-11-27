import type { Html } from "@effect/ui/html";
import { formatMonth, type WorkEntry } from "@/lib/work";

// Use cases as almanac rows: period, entry, client. Under the title sits
// the outcome, because someone deciding whether to hire reads results first;
// the stack waits on the case study itself.
export const WorkList = <M>(h: Html.H<M>, entries: ReadonlyArray<WorkEntry>) =>
  h.ol.children(
    entries.map((entry) =>
      h.li
        .key(entry.slug)
        .class("border-t border-border first:border-t-0")
        .children(
          h.a
            .attr("href", entry.permalink)
            .class("group grid gap-x-6 gap-y-1 py-4 sm:grid-cols-[7rem_1fr_12rem]")
            .children(
              h.span
                .class("text-sm text-muted-foreground tabular-nums sm:pt-0.5")
                .children(formatMonth(entry)),
              h.span
                .class("min-w-0")
                .children(
                  h.span
                    .class(
                      "block font-medium underline-offset-4 decoration-1 group-hover:text-brand group-hover:underline",
                    )
                    .children(entry.title),
                  h.span
                    .class(
                      "mt-1 block max-w-[60ch] text-sm text-muted-foreground leading-relaxed text-pretty",
                    )
                    .children(entry.outcome),
                ),
              h.span
                .class("text-sm text-muted-foreground sm:pt-0.5 sm:text-right")
                .children(
                  entry.client,
                  entry.kind === "agent"
                    ? h.span.class("whitespace-nowrap text-foreground").children(" · agents")
                    : null,
                  entry.draft ? h.span.class("whitespace-nowrap").children(" · draft") : null,
                ),
            ),
        ),
    ),
  );
