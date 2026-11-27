import type { Html } from "@effect/ui/html";
import type { WhoopSnapshot } from "@/lib/whoop";
import { AppRoute } from "../routes.ts";

const figure = <M>(h: Html.H<M>, value: number | null) =>
  h.span.class("font-medium text-foreground tabular-nums").children(String(value));

// Trends + the sleep→recovery insight, computed by my life-os from its store. Sits
// under the Whoop rings to add context to today.
export const LifeOsHealth = <M>(h: Html.H<M>, { trends, insight }: WhoopSnapshot) => {
  // A metric with no samples in the window is dropped rather than rendered as a gap.
  const summary = [
    trends.avgRecovery != null && `Recovery ${trends.avgRecovery}`,
    trends.avgSleep != null && `Sleep ${trends.avgSleep}h`,
    `${trends.workouts} workouts`,
  ].filter(Boolean);

  return h.div
    .class("mt-5 space-y-3 border-t border-border/50 pt-4")
    .children(
      h.p
        .class("text-xs text-muted-foreground tabular-nums")
        .children(`${trends.days}-day avg · ${summary.join(" · ")}`),
      insight.enough && insight.sleepDelta != null
        ? h.p
            .class("max-w-[65ch] text-sm leading-relaxed text-muted-foreground")
            .children(
              "Sleep is my recovery lever: nights of 7h+ average ",
              figure(h, insight.afterGood),
              " recovery vs ",
              figure(h, insight.afterShort),
              " after short ones — a ",
              h.span
                .class("tabular-nums")
                .children(`${insight.sleepDelta > 0 ? "+" : ""}${insight.sleepDelta}`),
              " swing, surfaced by my ",
              h.a
                .attr("href", AppRoute.print(AppRoute.Now()))
                .class("underline underline-offset-2 hover:text-brand transition-colors")
                .children("life-os"),
              ".",
            )
        : null,
    );
};
