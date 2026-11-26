import { Subscription, UiSchema } from "@effect/ui";
import { Html } from "@effect/ui/html";
import { Effect, Schema, Stream } from "effect";
import { sunTimes } from "@/lib/sun";

const time = (iso: string | null) =>
  iso
    ? new Date(iso).toLocaleTimeString("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
        timeZone: "Atlantic/Reykjavik",
      })
    : "--:--";

const SunTimesMessage = UiSchema.TaggedEnum({
  ComputedTimes: { rise: Schema.NullOr(Schema.String), set: Schema.NullOr(Schema.String) },
});

// "Reykjavík · sunrise 07:48 · sunset 18:45". A prerendered page can't know
// today, so the server prints --:-- in a box that already holds the width and
// the client fills it in.
export const SunTimes = Html.component({
  name: "SunTimes",
  model: Schema.Struct({ rise: Schema.NullOr(Schema.String), set: Schema.NullOr(Schema.String) }),
  message: SunTimesMessage,
  restore: false,
}).make({
  init: () => ({ rise: null, set: null }),
  update: (_, { rise, set }) => ({ rise, set }),
  subscriptions: () => [
    Subscription.make(
      "today",
      Stream.fromEffect(
        Effect.sync(() => {
          const { rise, set } = sunTimes();
          return SunTimesMessage.ComputedTimes({
            rise: rise?.toISOString() ?? null,
            set: set?.toISOString() ?? null,
          });
        }),
      ),
    ),
  ],
  view: (h, { rise, set }) =>
    h.p
      .class("text-sm text-muted-foreground tabular-nums")
      .children(
        h.a
          .attr("href", "https://www.google.com/maps/place/Reykjavík")
          .attr("target", "_blank")
          .attr("rel", "noreferrer")
          .class("hover:text-foreground transition-colors")
          .children("Reykjavík"),
        h.span.attr("aria-hidden", "true").children(" · "),
        `sunrise ${time(rise)}`,
        h.span.attr("aria-hidden", "true").children(" · "),
        `sunset ${time(set)}`,
      ),
});
