import feeds from "@/data/life-os-feeds.json";

// A few more life-os feeds beyond Whoop — code, music, focus time. Same deal as the
// overview: aggregates generated on my Mac (`bun run feeds` in the life-os repo) and
// committed here. Nothing raw leaves the machine.

function Sparkline({ data }: { data: { day: string; pushes: number }[] }) {
  const max = Math.max(1, ...data.map((d) => d.pushes));
  return (
    <div className="flex h-6 items-end gap-px" aria-hidden>
      {data.map((d) => (
        <div
          key={d.day}
          className="flex-1 rounded-sm bg-brand/70"
          style={{ height: `${Math.max(8, (d.pushes / max) * 100)}%` }}
          title={`${d.day}: ${d.pushes} pushes`}
        />
      ))}
    </div>
  );
}

function Card({
  label,
  value,
  sub,
  children,
}: {
  label: string;
  value: string;
  sub: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="space-y-2 rounded-lg border border-border/50 p-4 font-mono">
      <div className="text-xs text-muted-foreground">{label}</div>
      <div className="text-2xl text-brand tabular-nums">{value}</div>
      <div className="text-xs text-muted-foreground">{sub}</div>
      {children}
    </div>
  );
}

export function LifeOsFeeds() {
  const { days, github, spotify, toggl } = feeds;
  return (
    <div className="not-prose space-y-3">
      <p className="font-mono text-xs text-muted-foreground">last {days} days</p>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        <Card
          label="code"
          value={`${github.pushes} pushes`}
          sub={`${github.prs} PRs · ${github.activeDays} active days`}
        >
          <Sparkline data={github.daily} />
        </Card>
        <Card
          label="music"
          value={`${spotify.plays} plays`}
          sub={`${spotify.hours}h · ${spotify.artists} artists`}
        >
          <div className="text-xs text-muted-foreground">
            ♪ <span className="text-brand">{spotify.topArtist.name}</span> ×
            {spotify.topArtist.plays}
          </div>
        </Card>
        <Card label="focus" value={`${toggl.hours}h`} sub={`${toggl.last7Hours}h last 7 days`}>
          <div className="text-xs text-muted-foreground">
            <span className="text-brand">{toggl.topProject.name}</span> {toggl.topProject.hours}h
          </div>
        </Card>
      </div>
    </div>
  );
}
