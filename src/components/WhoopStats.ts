import { Subscription, UiSchema } from "@effect/ui";
import { Html } from "@effect/ui/html";
import { Effect, Schema, Stream } from "effect";
import { snapshotAgeDays, type WhoopSnapshot } from "@/lib/whoop";
import { WhoopRing } from "./WhoopRing.ts";

const STRAIN_MAX = 21;

// Every ring is drawn in ink, as the Ink Rule asks: the fill and the figure
// say how good the night was, and a traffic-light hue failed contrast on paper.
const RING_INK = "text-foreground";

const recoverySubtitle = (r: NonNullable<WhoopSnapshot["recovery"]>) => {
  const parts: string[] = [];
  if (r.hrv != null) parts.push(`HRV ${r.hrv}ms`);
  if (r.rhr != null) parts.push(`RHR ${r.rhr}`);
  return parts.length ? parts.join(" · ") : undefined;
};

// Parsed as UTC so the label cannot drift by a day depending on where the HTML was
// prerendered — the publisher writes UTC dates.
const dateLabel = (date: string) =>
  new Date(`${date}T00:00:00Z`).toLocaleDateString("en", {
    weekday: "short",
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  });

const WhoopStatsDateMessage = UiSchema.TaggedEnum({
  MeasuredAge: { ageDays: Schema.Number },
});

// The page is prerendered once a day, so how old the reading is depends on
// the visit: the server prints only the date and the client adds the age.
const WhoopStatsDate = Html.component({
  name: "WhoopStatsDate",
  props: Schema.Struct({ date: Schema.String }),
  model: Schema.Struct({ ageDays: Schema.Number }),
  message: WhoopStatsDateMessage,
  restore: false,
}).make({
  init: () => ({ ageDays: 0 }),
  update: (_, { ageDays }) => ({ ageDays }),
  subscriptions: ({ props }) => [
    Subscription.make(
      "age",
      Stream.fromEffect(
        Effect.sync(() =>
          WhoopStatsDateMessage.MeasuredAge({ ageDays: snapshotAgeDays(props.date) }),
        ),
      ),
    ),
  ],
  // Only mentioned when it is true: a score that is a day old is the normal state of a
  // once-a-day snapshot, and saying so every day would be noise.
  view: (h, { ageDays }) =>
    h.p
      .class("text-xs text-muted-foreground")
      .children(
        `Stats from ${dateLabel(h.props.date)}`,
        ageDays > 1 ? ` · ${ageDays} days old, sync is behind` : "",
      ),
});

const sleepRing = <M>(h: Html.H<M>, sleep: NonNullable<WhoopSnapshot["sleep"]>) =>
  WhoopRing(h, {
    label: "Sleep",
    displayValue: `${Math.round(sleep.performance)}%`,
    fill: sleep.performance / 100,
    colorClass: RING_INK,
    ...(sleep.hours ? { subtitle: `${sleep.hours.toFixed(1)} hrs` } : {}),
  });

const recoveryRing = <M>(h: Html.H<M>, recovery: NonNullable<WhoopSnapshot["recovery"]>) => {
  const subtitle = recoverySubtitle(recovery);
  return WhoopRing(h, {
    label: "Recovery",
    displayValue: `${recovery.score}%`,
    fill: recovery.score / 100,
    colorClass: RING_INK,
    ...(subtitle ? { subtitle } : {}),
  });
};

export const WhoopStats = <M>(h: Html.H<M>, data: WhoopSnapshot) =>
  h.div.class("space-y-4").children(
    h.div.class("grid grid-cols-3 gap-4").children(
      data.sleep ? sleepRing(h, data.sleep) : null,
      data.recovery ? recoveryRing(h, data.recovery) : null,
      data.strain != null
        ? WhoopRing(h, {
            label: "Strain",
            displayValue: data.strain.toFixed(1),
            fill: data.strain / STRAIN_MAX,
            colorClass: RING_INK,
          })
        : null,
    ),
    WhoopStatsDate(h, { props: { date: data.date } }),
  );
