import type { Html } from "@effect/ui/html";
import overview from "@/data/life-os-overview.json";

// Grouped in en-US on purpose: the server and every browser print the same
// digits, so hydration never sees a different number.
const count = (n: number) => n.toLocaleString("en-US");

// Public-safe snapshot of my personal data system. The numbers are generated on my
// Mac by `bun run overview` in the life-os repo and committed here — only aggregates,
// no health/sleep/screen data ever leaves the machine.
export const LifeOs = <M>(h: Html.H<M>) => {
  const { system, activity } = overview;
  const stats = [
    { label: "days tracked", value: count(system.daysCovered) },
    { label: "data points", value: count(system.dataPoints) },
    { label: "workouts", value: count(activity.workouts) },
    { label: "git pushes", value: count(activity.githubPushes) },
  ];
  return h.div
    .class("prose prose-neutral dark:prose-invert text-pretty")
    .children(
      h.p.class("text-brand text-lg font-mono").children("life-os"),
      h.p
        .class("leading-relaxed max-w-[65ch]")
        .children(
          `A local-first personal data OS I built — a Bun collector daemon that syncs ${system.sources} sources into one SQLite store, exposed through an MCP server, a designed dashboard, and a native Mac app. Runs entirely on my own machine.`,
        ),
      h.div
        .class("grid grid-cols-2 gap-4 not-prose font-mono sm:grid-cols-4")
        .children(
          stats.map((s) =>
            h.div
              .key(s.label)
              .children(
                h.div.class("text-xl text-brand").children(s.value),
                h.div.class("text-sm text-muted-foreground").children(s.label),
              ),
          ),
        ),
    );
};
