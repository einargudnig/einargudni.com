import { Component } from "@effect/ui";
import { Html } from "@effect/ui/html";
import { Schema } from "effect";
import { AsyncResult } from "effect/reactivity";
import type { ContributionData, ContributionDay } from "@/lib/github.server";
import { GetContributions } from "../queries/GetContributions.ts";

// Contribution dates are bare "YYYY-MM-DD" strings. Parse and read them in UTC
// everywhere so week grouping, month labels, and hover labels are identical no
// matter the server or client timezone.
const parseDay = (date: string) => new Date(`${date}T00:00:00Z`);

const LEVEL_CLASSES = [
  "bg-muted/50",
  "bg-foreground/15",
  "bg-foreground/35",
  "bg-foreground/60",
  "bg-foreground",
] as const;

type Week = ReadonlyArray<ContributionDay>;

const groupByWeeks = (contributions: ReadonlyArray<ContributionDay>) => {
  const weeks: ContributionDay[][] = [];
  let currentWeek: ContributionDay[] = [];
  for (const day of contributions) {
    if (parseDay(day.date).getUTCDay() === 0 && currentWeek.length > 0) {
      weeks.push(currentWeek);
      currentWeek = [];
    }
    currentWeek.push(day);
  }
  if (currentWeek.length > 0) weeks.push(currentWeek);
  return weeks;
};

const monthLabels = (weeks: ReadonlyArray<Week>) => {
  const labels = new Map<number, string>();
  let lastMonth = -1;
  weeks.forEach((week, i) => {
    const first = week[0];
    if (!first) return;
    const date = parseDay(first.date);
    const month = date.getUTCMonth();
    if (month === lastMonth) return;
    labels.set(i, date.toLocaleString("en", { month: "short", timeZone: "UTC" }));
    lastMonth = month;
  });
  return labels;
};

const dayTitle = (day: ContributionDay) => {
  const label = parseDay(day.date).toLocaleDateString("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });
  return `${day.count} contribution${day.count !== 1 ? "s" : ""} on ${label}`;
};

const weekKey = (week: Week, i: number) => week[0]?.date ?? String(i);

const Graph = <M>(h: Html.H<M>, data: ContributionData) => {
  const weeks = groupByWeeks(data.contributions);
  const labels = monthLabels(weeks);
  const totalWeeks = weeks.length;
  const columns = { gridTemplateColumns: `repeat(${totalWeeks}, minmax(10px, 1fr))`, gap: "2px" };

  return h.div.class("space-y-3").children(
    h.div.class("flex items-baseline justify-between").children(
      h.p
        .class("text-sm text-muted-foreground")
        .children(
          h.span
            .class("tabular-nums text-foreground")
            .children(data.total.lastYear.toLocaleString()),
          " contributions in the last year",
        ),
      h.div.class("flex items-center gap-1.5 text-xs text-muted-foreground").children(
        h.span.children("Less"),
        LEVEL_CLASSES.map((cls) => h.div.key(cls).class(`h-[11px] w-[11px] rounded-[2px] ${cls}`)),
        h.span.children("More"),
      ),
    ),
    h.div.class("w-full overflow-x-auto").children(
      h.div
        .class("grid text-xs text-muted-foreground mb-1.5")
        .style(columns)
        .children(
          weeks.map((week, i) => {
            const label = i <= totalWeeks - 3 ? labels.get(i) : undefined;
            return h.div
              .key(weekKey(week, i))
              .class("min-w-0")
              .children(label ? h.span.children(label) : null);
          }),
        ),
      h.div
        .class("grid w-full")
        .style(columns)
        .children(
          weeks.map((week, i) =>
            h.div
              .key(weekKey(week, i))
              .class("grid")
              .style({ gridTemplateRows: "repeat(7, 1fr)", gap: "2px" })
              .children(
                week.map((day) =>
                  h.div
                    .key(day.date)
                    .attr("title", dayTitle(day))
                    .class(
                      `aspect-square w-full rounded-[2px] ${LEVEL_CLASSES[day.level] ?? LEVEL_CLASSES[0]}`,
                    ),
                ),
              ),
          ),
        ),
    ),
  );
};

export const GitHubContributionsNoDeps = Html.component({
  name: "GitHubContributions",
  props: Schema.Struct({ username: Schema.String }),
  model: Schema.Struct({}),
  message: Schema.Never,
  queries: {
    contributions: { query: GetContributions, args: ({ props }) => ({ username: props.username }) },
  },
}).make({
  init: () => ({}),
  update: ($) => $.model,
  view: (h) =>
    AsyncResult.match(h.queries.contributions, {
      onInitial: () => h.text(""),
      onFailure: () =>
        h.p
          .class("border-t border-border py-3 text-sm text-muted-foreground")
          .children("The contribution graph couldn't load right now."),
      onSuccess: ({ value }) => Graph(h, value),
    }),
});

export const GitHubContributions = GitHubContributionsNoDeps.pipe(
  Component.provide(GetContributions.layer),
);
