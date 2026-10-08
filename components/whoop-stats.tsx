import type { WhoopSnapshot } from "@/lib/life-os";
import { WhoopRing } from "./whoop-ring";

const STRAIN_MAX = 21;

const recoveryColor = (score: number) =>
  score >= 67 ? "text-emerald-400" : score >= 34 ? "text-yellow-400" : "text-red-500";

const sleepColor = (perf: number) =>
  perf >= 85 ? "text-emerald-400" : perf >= 70 ? "text-yellow-400" : "text-red-500";

export function WhoopStats({ data }: { data: WhoopSnapshot }) {
  const dateLabel = new Date(data.date).toLocaleDateString("en", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-3 gap-4">
        {data.sleep && (
          <WhoopRing
            label="Sleep"
            displayValue={`${Math.round(data.sleep.performance)}%`}
            fill={data.sleep.performance / 100}
            colorClass={sleepColor(data.sleep.performance)}
            subtitle={data.sleep.hours ? `${data.sleep.hours.toFixed(1)} hrs` : undefined}
          />
        )}
        {data.recovery && (
          <WhoopRing
            label="Recovery"
            displayValue={`${data.recovery.score}%`}
            fill={data.recovery.score / 100}
            colorClass={recoveryColor(data.recovery.score)}
            subtitle={recoverySubtitle(data.recovery)}
          />
        )}
        {data.strain != null && (
          <WhoopRing
            label="Strain"
            displayValue={data.strain.toFixed(1)}
            fill={data.strain / STRAIN_MAX}
            colorClass="text-sky-400"
          />
        )}
      </div>
      <p className="text-xs text-muted-foreground">Stats from {dateLabel}</p>
    </div>
  );
}

function recoverySubtitle(r: NonNullable<WhoopSnapshot["recovery"]>) {
  const parts: string[] = [];
  if (r.hrv != null) parts.push(`HRV ${r.hrv}ms`);
  if (r.rhr != null) parts.push(`RHR ${r.rhr}`);
  return parts.length ? parts.join(" · ") : undefined;
}
