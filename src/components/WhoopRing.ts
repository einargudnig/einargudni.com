import type { Html } from "@effect/ui/html";

const SIZE = 120;
const STROKE = 10;
const RADIUS = (SIZE - STROKE) / 2;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

const circle = <M>(h: Html.H<M>) =>
  h.circle.attrs({
    cx: String(SIZE / 2),
    cy: String(SIZE / 2),
    r: String(RADIUS),
    stroke: "currentColor",
    "stroke-width": String(STROKE),
    fill: "none",
  });

export const WhoopRing = <M>(
  h: Html.H<M>,
  options: {
    readonly label: string;
    readonly displayValue: string;
    // 0..1 — how much of the ring is filled.
    readonly fill: number;
    // Tailwind text-color class, e.g. "text-emerald-500".
    readonly colorClass: string;
    readonly subtitle?: string;
  },
) => {
  const clamped = Math.max(0, Math.min(1, options.fill));
  const dashOffset = CIRCUMFERENCE * (1 - clamped);

  return h.div.class("flex flex-col items-center gap-2").children(
    h.div
      .class("relative")
      .style({ width: `${SIZE}px`, height: `${SIZE}px` })
      .children(
        h.svg
          .attrs({ width: String(SIZE), height: String(SIZE), viewBox: `0 0 ${SIZE} ${SIZE}` })
          .class(`-rotate-90 ${options.colorClass}`)
          .children(
            circle(h).attr("stroke-opacity", "0.15"),
            circle(h)
              .attrs({
                "stroke-linecap": "round",
                "stroke-dasharray": String(CIRCUMFERENCE),
                "stroke-dashoffset": String(dashOffset),
              })
              .class("transition-[stroke-dashoffset] duration-500"),
          ),
        h.div
          .class("absolute inset-0 flex items-center justify-center")
          .children(
            h.span
              .class(`text-2xl tabular-nums ${options.colorClass}`)
              .children(options.displayValue),
          ),
      ),
    h.div
      .class("text-center")
      .children(
        h.p.class("text-sm font-medium").children(options.label),
        options.subtitle
          ? h.p.class("text-xs text-muted-foreground").children(options.subtitle)
          : null,
      ),
  );
};
