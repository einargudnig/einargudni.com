import type { View } from "@effect/ui";
import type { Html } from "@effect/ui/html";
import feeds from "@/data/life-os-feeds.json";

// A few more life-os feeds beyond Whoop — code, music, focus time. Same deal as the
// overview: aggregates generated on my Mac (`bun run feeds` in the life-os repo) and
// committed here. Nothing raw leaves the machine.

const Sparkline = <M>(h: Html.H<M>, data: ReadonlyArray<{ day: string; pushes: number }>) => {
  const max = Math.max(1, ...data.map((d) => d.pushes));
  return h.div
    .class("flex h-6 items-end gap-px")
    .attr("aria-hidden", "true")
    .children(
      data.map((d) =>
        h.div
          .key(d.day)
          .class("flex-1 rounded-sm bg-brand/70")
          .style({ height: `${Math.max(8, (d.pushes / max) * 100)}%` })
          .attr("title", `${d.day}: ${d.pushes} pushes`),
      ),
    );
};

const Card = <M, C extends View.Children<M, never>>(
  h: Html.H<M>,
  options: {
    readonly label: string;
    readonly value: string;
    readonly sub: string;
    readonly children: C;
  },
) =>
  h.div
    .class("space-y-2 rounded-lg border border-border/50 p-4 font-mono")
    .children(
      h.div.class("text-xs text-muted-foreground").children(options.label),
      h.div.class("text-2xl text-brand tabular-nums").children(options.value),
      h.div.class("text-xs text-muted-foreground").children(options.sub),
      options.children,
    );

export const LifeOsFeeds = <M>(h: Html.H<M>) => {
  const { days, github, spotify, toggl } = feeds;
  return h.div.class("not-prose space-y-3").children(
    h.p.class("font-mono text-xs text-muted-foreground").children(`last ${days} days`),
    h.div.class("grid grid-cols-1 gap-3 sm:grid-cols-3").children(
      Card(h, {
        label: "code",
        value: `${github.pushes} pushes`,
        sub: `${github.prs} PRs · ${github.activeDays} active days`,
        children: [Sparkline(h, github.daily)],
      }),
      Card(h, {
        label: "music",
        value: `${spotify.plays} plays`,
        sub: `${spotify.hours}h · ${spotify.artists} artists`,
        children: [
          h.div
            .class("text-xs text-muted-foreground")
            .children(
              "♪ ",
              h.span.class("text-brand").children(spotify.topArtist.name),
              ` ×${spotify.topArtist.plays}`,
            ),
        ],
      }),
      Card(h, {
        label: "focus",
        value: `${toggl.hours}h`,
        sub: `${toggl.last7Hours}h last 7 days`,
        children: [
          h.div
            .class("text-xs text-muted-foreground")
            .children(
              h.span.class("text-brand").children(toggl.topProject.name),
              ` ${toggl.topProject.hours}h`,
            ),
        ],
      }),
    ),
  );
};
