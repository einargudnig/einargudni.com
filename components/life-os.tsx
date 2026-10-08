import overview from "@/data/life-os-overview.json";

// Public-safe snapshot of my personal data system. The numbers are generated on my
// Mac by `bun run overview` in the life-os repo and committed here — only aggregates,
// no health/sleep/screen data ever leaves the machine.
export function LifeOs() {
  const { system, activity } = overview;
  const stats = [
    { label: "days tracked", value: system.daysCovered.toLocaleString() },
    { label: "data points", value: system.dataPoints.toLocaleString() },
    { label: "workouts", value: activity.workouts.toLocaleString() },
    { label: "git pushes", value: activity.githubPushes.toLocaleString() },
  ];
  return (
    <div className="prose prose-neutral dark:prose-invert text-pretty">
      <p className="text-brand text-lg font-mono">life-os</p>
      <p className="leading-relaxed max-w-[65ch]">
        A local-first personal data OS I built — a Bun collector daemon that syncs {system.sources}{" "}
        sources into one SQLite store, exposed through an MCP server, a designed dashboard, and a
        native Mac app. Runs entirely on my own machine.
      </p>
      <div className="grid grid-cols-2 gap-4 not-prose font-mono sm:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label}>
            <div className="text-xl text-brand">{s.value}</div>
            <div className="text-sm text-muted-foreground">{s.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
