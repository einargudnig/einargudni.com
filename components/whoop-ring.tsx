import { cn } from "@/lib/utils";

interface WhoopRingProps {
  label: string;
  displayValue: string;
  // 0..1 — how much of the ring is filled.
  fill: number;
  // Tailwind text-color class, e.g. "text-emerald-500".
  colorClass: string;
  subtitle?: string;
}

const SIZE = 120;
const STROKE = 10;
const RADIUS = (SIZE - STROKE) / 2;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

export function WhoopRing({
  label,
  displayValue,
  fill,
  colorClass,
  subtitle,
}: WhoopRingProps) {
  const clamped = Math.max(0, Math.min(1, fill));
  const dashOffset = CIRCUMFERENCE * (1 - clamped);

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative" style={{ width: SIZE, height: SIZE }}>
        <svg
          width={SIZE}
          height={SIZE}
          viewBox={`0 0 ${SIZE} ${SIZE}`}
          className={cn("-rotate-90", colorClass)}
        >
          <circle
            cx={SIZE / 2}
            cy={SIZE / 2}
            r={RADIUS}
            stroke="currentColor"
            strokeOpacity={0.15}
            strokeWidth={STROKE}
            fill="none"
          />
          <circle
            cx={SIZE / 2}
            cy={SIZE / 2}
            r={RADIUS}
            stroke="currentColor"
            strokeWidth={STROKE}
            strokeLinecap="round"
            fill="none"
            strokeDasharray={CIRCUMFERENCE}
            strokeDashoffset={dashOffset}
            className="transition-[stroke-dashoffset] duration-500"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className={cn("text-2xl tabular-nums", colorClass)}>
            {displayValue}
          </span>
        </div>
      </div>
      <div className="text-center">
        <p className="text-sm font-medium">{label}</p>
        {subtitle ? (
          <p className="text-xs text-muted-foreground">{subtitle}</p>
        ) : null}
      </div>
    </div>
  );
}
