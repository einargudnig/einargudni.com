import { Link } from "@/components/ui/link";
import type { WhoopSnapshot } from "@/lib/life-os";

// Trends + the sleep→recovery insight, computed by my life-os from its store. Sits
// under the Whoop rings to add context to today.
export function LifeOsHealth({ data }: { data: WhoopSnapshot }) {
  const { trends, insight } = data;
  // A metric with no samples in the window is dropped rather than rendered as a gap.
  const summary = [
    trends.avgRecovery != null && `Recovery ${trends.avgRecovery}`,
    trends.avgSleep != null && `Sleep ${trends.avgSleep}h`,
    `${trends.workouts} workouts`,
  ].filter(Boolean);

  return (
    <div className="mt-5 space-y-3 border-t border-border/50 pt-4">
      <p className="text-xs text-muted-foreground tabular-nums">
        {trends.days}-day avg · {summary.join(" · ")}
      </p>
      {insight.enough && insight.sleepDelta != null && (
        <p className="max-w-[65ch] text-sm leading-relaxed text-muted-foreground">
          Sleep is my recovery lever: nights of 7h+ average{" "}
          <span className="font-medium text-foreground tabular-nums">{insight.afterGood}</span>{" "}
          recovery vs{" "}
          <span className="font-medium text-foreground tabular-nums">{insight.afterShort}</span>{" "}
          after short ones — a{" "}
          <span className="tabular-nums">
            {insight.sleepDelta > 0 ? "+" : ""}
            {insight.sleepDelta}
          </span>{" "}
          swing, surfaced by my{" "}
          <Link
            href="/now"
            className="underline underline-offset-2 hover:text-brand transition-colors"
          >
            life-os
          </Link>
          .
        </p>
      )}
    </div>
  );
}
