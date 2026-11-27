import { Command, Component, Subscription, UiSchema } from "@effect/ui";
import { Html } from "@effect/ui/html";
import { ConvexClient } from "convex/browser";
import { Context, Effect, Layer, Queue, Schema, Stream } from "effect";
import { Baby, Calendar, type IconNode, Loader2, Scale, TrendingUp } from "lucide";
import { api } from "@/convex/_generated/api";
import { Icon } from "../../components/Icon.ts";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  SecondaryBadge,
} from "../../components/primitives.ts";

const DUE_DATE = new Date("2026-06-21T00:00:00");

const Market = Schema.Literals(["gender", "arrival", "weight"]);
type Market = typeof Market.Type;

const Prediction = Schema.Literals(["boy", "girl", "before", "after", "over", "under"]);
type Prediction = typeof Prediction.Type;

const MARKET_OF: Record<Prediction, Market> = {
  boy: "gender",
  girl: "gender",
  before: "arrival",
  after: "arrival",
  over: "weight",
  under: "weight",
};

const GenderTotals = Schema.Struct({ boy: Schema.Number, girl: Schema.Number });
const ArrivalTotals = Schema.Struct({ before: Schema.Number, after: Schema.Number });
const WeightTotals = Schema.Struct({ over: Schema.Number, under: Schema.Number });

const BabyPageMessage = UiSchema.TaggedEnum({
  Ticked: { now: Schema.Number },
  ReceivedGenderTotals: { totals: GenderTotals },
  ReceivedArrivalTotals: { totals: ArrivalTotals },
  ReceivedWeightTotals: { totals: WeightTotals },
  ClickedVote: { prediction: Prediction },
  SucceededRecordVote: { market: Market },
  FailedRecordVote: { market: Market },
});
type BabyPageMessage = typeof BabyPageMessage.Type;

class VoteFailed extends Schema.TaggedError<VoteFailed>()("VoteFailed", {
  cause: Schema.Unknown,
}) {}

// The live vote store. Without `VITE_CONVEX_URL` there is no client: the
// markets stay in their loading state and a vote fails.
class BabyVotes extends Context.Service<
  BabyVotes,
  {
    readonly gender: Stream.Stream<typeof GenderTotals.Type>;
    readonly arrival: Stream.Stream<typeof ArrivalTotals.Type>;
    readonly weight: Stream.Stream<typeof WeightTotals.Type>;
    readonly record: (prediction: Prediction) => Effect.Effect<void, VoteFailed>;
  }
>()("baby/BabyVotes") {
  static readonly layer = Layer.effect(
    BabyVotes,
    Effect.gen(function* () {
      const url = import.meta.env.VITE_CONVEX_URL as string | undefined;
      const convex = url
        ? yield* Effect.acquireRelease(
            Effect.sync(() => new ConvexClient(url)),
            (client) => Effect.promise(() => client.close()),
          )
        : undefined;

      const watch = <A>(
        subscribe: (client: ConvexClient, push: (value: A) => void) => () => void,
      ): Stream.Stream<A> =>
        convex
          ? Stream.callback<A>((queue) =>
              Effect.acquireRelease(
                Effect.sync(() => subscribe(convex, (value) => Queue.offerUnsafe(queue, value))),
                (unsubscribe) => Effect.sync(unsubscribe),
              ),
            )
          : Stream.never;

      const mutate = (run: (client: ConvexClient) => Promise<unknown>) =>
        Effect.tryPromise({
          try: () => {
            if (!convex) throw new Error("VITE_CONVEX_URL is not set");
            return run(convex);
          },
          catch: (cause) => new VoteFailed({ cause }),
        }).pipe(Effect.asVoid);

      return {
        gender: watch((client, push) => client.onUpdate(api.votes.getCurrentTotals, {}, push)),
        arrival: watch((client, push) => client.onUpdate(api.votes.getArrivalTotals, {}, push)),
        weight: watch((client, push) => client.onUpdate(api.votes.getWeightTotals, {}, push)),
        record: (prediction) => {
          switch (prediction) {
            case "boy":
            case "girl":
              return mutate((client) => client.mutation(api.votes.recordVote, { prediction }));
            case "before":
            case "after":
              return mutate((client) =>
                client.mutation(api.votes.recordArrivalVote, { prediction }),
              );
            case "over":
            case "under":
              return mutate((client) =>
                client.mutation(api.votes.recordWeightVote, { prediction }),
              );
          }
        },
      };
    }),
  );
}

class RecordVote extends Command.Service<RecordVote>()("baby/RecordVote", {
  args: { prediction: Prediction },
  success: BabyPageMessage,
  mode: "concurrent",
}) {
  static readonly layer = this.toLayer(
    Effect.gen(function* () {
      const votes = yield* BabyVotes;
      return ({ prediction }) => {
        const market = MARKET_OF[prediction];
        return votes.record(prediction).pipe(
          Effect.match({
            onSuccess: () => BabyPageMessage.SucceededRecordVote({ market }),
            onFailure: (error) => {
              console.error("Error recording vote:", error.cause);
              alert("Failed to record vote. Please try again.");
              return BabyPageMessage.FailedRecordVote({ market });
            },
          }),
        );
      };
    }),
  );
}

const Voting = Schema.Struct({
  gender: Schema.Boolean,
  arrival: Schema.Boolean,
  weight: Schema.Boolean,
});

const BabyPageModel = Schema.Struct({
  now: Schema.NullOr(Schema.Number),
  gender: Schema.NullOr(GenderTotals),
  arrival: Schema.NullOr(ArrivalTotals),
  weight: Schema.NullOr(WeightTotals),
  voting: Voting,
});
type BabyPageModel = typeof BabyPageModel.Type;

const countdownOf = (now: number) => {
  const diff = DUE_DATE.getTime() - now;
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0, arrived: true };
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
    arrived: false,
  };
};

const percentage = (part: number, total: number) =>
  total > 0 ? Math.round((part / total) * 100) : 0;

const Spinner = <M>(h: Html.H<M>, padding: string, size: string) =>
  h.div
    .class(`flex justify-center ${padding}`)
    .children(Icon(h, Loader2, `${size} animate-spin text-muted-foreground`));

const Countdown = <M>(h: Html.H<M>, now: number | null) => {
  if (now === null) return Spinner(h, "py-4", "size-6");
  const countdown = countdownOf(now);
  if (countdown.arrived) {
    return h.p.class("text-center text-2xl font-bold tracking-tight").children("The baby is here!");
  }
  return h.div.class("flex justify-around text-center").children(
    [
      { value: countdown.days, label: "days" },
      { value: countdown.hours, label: "hours" },
      { value: countdown.minutes, label: "min" },
      { value: countdown.seconds, label: "sec" },
    ].map(({ value, label }) =>
      h.div
        .key(label)
        .class("space-y-1")
        .children(
          h.div
            .class("text-4xl font-bold font-mono tabular-nums tracking-tight")
            .children(String(value).padStart(2, "0")),
          h.div.class("text-xs text-muted-foreground uppercase tracking-wider").children(label),
        ),
    ),
  );
};

interface Side {
  readonly prediction: Prediction;
  readonly label: string;
  readonly votes: number;
  readonly text: string;
  readonly button: string;
}

const MarketCard = (
  h: Html.H<BabyPageMessage>,
  options: {
    readonly icon: IconNode;
    readonly title: string;
    readonly note?: string;
    readonly loading: boolean;
    readonly voting: boolean;
    readonly sides: readonly [Side, Side];
  },
) => {
  const total = options.sides[0].votes + options.sides[1].votes;
  return Card(h).children(
    CardHeader(h).children(
      CardTitle(h, "flex items-center justify-between").children(
        h.div
          .class("flex items-center gap-2")
          .children(Icon(h, options.icon, "size-4"), h.span.children(options.title)),
        SecondaryBadge(h, "flex items-center gap-1").children(
          Icon(h, TrendingUp, "size-3"),
          "Live",
        ),
      ),
    ),
    CardContent(h, "space-y-4").children(
      options.loading
        ? Spinner(h, "py-8", "size-8")
        : [
            options.note
              ? h.p.class("text-xs text-muted-foreground text-center").children(options.note)
              : null,
            h.div.class("flex justify-around text-center").children(
              options.sides.map((side) =>
                h.div
                  .key(side.prediction)
                  .class("space-y-1")
                  .children(
                    h.div
                      .class(`text-4xl font-bold ${side.text}`)
                      .children(`${percentage(side.votes, total)}%`),
                    h.div.class("text-sm text-muted-foreground").children(side.label),
                    h.div.class("text-xs text-muted-foreground/60").children(`${side.votes} votes`),
                  ),
              ),
            ),
            h.div.class("flex gap-3 justify-center pt-2").children(
              options.sides.map((side) =>
                Button(h, {
                  size: "lg",
                  className: `flex-1 max-w-xs ${side.button} disabled:opacity-50`,
                })
                  .key(side.prediction)
                  .disabled(options.voting)
                  .on("click", BabyPageMessage.ClickedVote({ prediction: side.prediction }))
                  .children(
                    options.voting
                      ? Icon(h, Loader2, "mr-2 size-4 animate-spin")
                      : Icon(h, options.icon, "mr-2 size-4"),
                    `Vote ${side.label}`,
                  ),
              ),
            ),
          ],
    ),
  );
};

// The countdown and the totals are live, so the prerender shows every
// spinner and the client fills them in once the Convex client connects.
export const BabyPageNoDeps = Html.component({
  name: "BabyPage",
  model: BabyPageModel,
  message: BabyPageMessage,
  restore: false,
}).make({
  init: (): BabyPageModel => ({
    now: null,
    gender: null,
    arrival: null,
    weight: null,
    voting: { gender: false, arrival: false, weight: false },
  }),
  update: ($, message) =>
    BabyPageMessage.match(message, {
      Ticked: ({ now }) => $.evolve({ now }),
      ReceivedGenderTotals: ({ totals }) => $.evolve({ gender: totals }),
      ReceivedArrivalTotals: ({ totals }) => $.evolve({ arrival: totals }),
      ReceivedWeightTotals: ({ totals }) => $.evolve({ weight: totals }),
      ClickedVote: ({ prediction }) => {
        const market = MARKET_OF[prediction];
        if ($.model.voting[market]) return $.model;
        return $.evolve({ voting: (voting) => ({ ...voting, [market]: true }) }).run(
          RecordVote.make({ prediction }),
        );
      },
      SucceededRecordVote: ({ market }) =>
        $.evolve({ voting: (voting) => ({ ...voting, [market]: false }) }),
      FailedRecordVote: ({ market }) =>
        $.evolve({ voting: (voting) => ({ ...voting, [market]: false }) }),
    }),
  subscriptions: () => [
    Subscription.make(
      "countdown",
      Stream.tick("1 second").pipe(
        Stream.mapEffect(() => Effect.sync(() => BabyPageMessage.Ticked({ now: Date.now() }))),
      ),
    ),
    Subscription.make(
      "gender",
      Stream.unwrap(
        Effect.map(BabyVotes, (votes) =>
          votes.gender.pipe(
            Stream.map((totals) => BabyPageMessage.ReceivedGenderTotals({ totals })),
          ),
        ),
      ),
    ),
    Subscription.make(
      "arrival",
      Stream.unwrap(
        Effect.map(BabyVotes, (votes) =>
          votes.arrival.pipe(
            Stream.map((totals) => BabyPageMessage.ReceivedArrivalTotals({ totals })),
          ),
        ),
      ),
    ),
    Subscription.make(
      "weight",
      Stream.unwrap(
        Effect.map(BabyVotes, (votes) =>
          votes.weight.pipe(
            Stream.map((totals) => BabyPageMessage.ReceivedWeightTotals({ totals })),
          ),
        ),
      ),
    ),
  ],
  view: (h, model) => {
    const loading = !model.gender || !model.arrival || !model.weight;
    return h.section.class("w-full max-w-2xl space-y-8 mb-8").children(
      h.div
        .class("flex items-center gap-3")
        .children(
          Icon(h, Baby, "size-8 text-muted-foreground"),
          h.h1
            .class(
              "text-4xl md:text-5xl font-semibold tracking-[-0.04em] leading-[1.05] text-balance",
            )
            .children("Baby Prediction Market"),
        ),
      Card(h).children(CardContent(h, "py-6").children(Countdown(h, model.now))),
      h.div.class("space-y-6").children(
        MarketCard(h, {
          icon: Baby,
          title: "Boy or Girl?",
          loading,
          voting: model.voting.gender,
          sides: [
            {
              prediction: "boy",
              label: "Boy",
              votes: model.gender?.boy ?? 0,
              text: "text-blue-500",
              button: "bg-blue-600 hover:bg-blue-700",
            },
            {
              prediction: "girl",
              label: "Girl",
              votes: model.gender?.girl ?? 0,
              text: "text-pink-500",
              button: "bg-pink-600 hover:bg-pink-700",
            },
          ],
        }).key("gender"),
        MarketCard(h, {
          icon: Calendar,
          title: "Before or After Due Date?",
          loading,
          voting: model.voting.arrival,
          sides: [
            {
              prediction: "before",
              label: "Before",
              votes: model.arrival?.before ?? 0,
              text: "text-amber-500",
              button: "bg-amber-600 hover:bg-amber-700",
            },
            {
              prediction: "after",
              label: "After",
              votes: model.arrival?.after ?? 0,
              text: "text-emerald-500",
              button: "bg-emerald-600 hover:bg-emerald-700",
            },
          ],
        }).key("arrival"),
        MarketCard(h, {
          icon: Scale,
          title: "Over or Under Average Weight?",
          note: "Average newborn weight: ~3.5 kg (7.7 lbs)",
          loading,
          voting: model.voting.weight,
          sides: [
            {
              prediction: "over",
              label: "Over",
              votes: model.weight?.over ?? 0,
              text: "text-violet-500",
              button: "bg-violet-600 hover:bg-violet-700",
            },
            {
              prediction: "under",
              label: "Under",
              votes: model.weight?.under ?? 0,
              text: "text-orange-500",
              button: "bg-orange-600 hover:bg-orange-700",
            },
          ],
        }).key("weight"),
      ),
    );
  },
});

// The Convex client is a live connection, so it never builds on the server.
export const BabyPage = BabyPageNoDeps.pipe(
  Component.provide(RecordVote.layer.pipe(Layer.provideMerge(BabyVotes.layer)), {
    server: false,
  }),
);
