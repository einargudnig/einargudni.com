import { Command, Subscription, UiSchema } from "@effect/ui";
import { Html } from "@effect/ui/html";
import { Effect, Schema, Stream } from "effect";
import { EDITION_KEY, type Pref, PREFS, resolveEdition } from "@/lib/edition";

const PrefSchema = Schema.Literals(["auto", "day", "night"]);
const Edition = Schema.Literals(["day", "night"]);

const readPref = (): Pref => {
  try {
    const value = localStorage.getItem(EDITION_KEY);
    return PREFS.includes(value as Pref) ? (value as Pref) : "auto";
  } catch {
    return "auto";
  }
};

const apply = (pref: Pref) => {
  const night = resolveEdition(pref) === "night";
  document.documentElement.classList.toggle("dark", night);
  document.documentElement.style.colorScheme = night ? "dark" : "light";
};

const prefersReducedMotion = () => matchMedia("(prefers-reduced-motion: reduce)").matches;

// The new edition spreads out from the click as a widening circle. The
// browser snapshots the old page, applies the new edition underneath, then
// the new snapshot's clip grows from the click to the far corner.
export const SwitchEdition = Command.make(
  "SwitchEdition",
  { args: { pref: PrefSchema, x: Schema.Number, y: Schema.Number } },
  ({ pref, x, y }) =>
    Effect.sync(() => {
      try {
        localStorage.setItem(EDITION_KEY, pref);
      } catch {}
      const root = document.documentElement;
      const changes = (resolveEdition(pref) === "night") !== root.classList.contains("dark");
      if (!changes || !("startViewTransition" in document) || prefersReducedMotion()) {
        apply(pref);
        return;
      }
      const radius = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));
      // Colour transitions would fade inside the new snapshot and blur the edge.
      root.classList.add("edition-switching");
      const transition = document.startViewTransition(() => apply(pref));
      void transition.ready.then(() =>
        root.animate(
          { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
          {
            duration: 700,
            easing: "cubic-bezier(0.22, 1, 0.36, 1)",
            pseudoElement: "::view-transition-new(root)",
          },
        ),
      );
      void transition.finished.finally(() => root.classList.remove("edition-switching"));
    }),
);

export const FollowSun = Command.make("FollowSun", {}, () => Effect.sync(() => apply("auto")));

export const EditionToggleMessage = UiSchema.TaggedEnum({
  ReadPref: { pref: PrefSchema },
  Ticked: {},
  ClickedToggle: { x: Schema.Number, y: Schema.Number },
});

const LABEL: Record<Pref, string> = {
  auto: "Edition follows the Reykjavík sun",
  day: "Day edition",
  night: "Night edition",
};

const nextPref = (pref: Pref) => PREFS[(PREFS.indexOf(pref) + 1) % PREFS.length] ?? "auto";

// The pre-paint script in index.html has already applied the edition; this
// only learns which one, so the server renders "sun" and the client corrects
// it once localStorage is readable.
export const EditionToggle = Html.component({
  name: "EditionToggle",
  model: Schema.Struct({ pref: PrefSchema, edition: Schema.NullOr(Edition) }),
  message: EditionToggleMessage,
  restore: false,
}).make({
  init: () => ({ pref: "auto" as Pref, edition: null }),
  update: ($, message) =>
    EditionToggleMessage.match(message, {
      ReadPref: ({ pref }) => ({ pref, edition: resolveEdition(pref) }),
      // In auto, the page turns over to the night edition when the sun goes
      // down over Reykjavík while you read.
      Ticked: () =>
        $.set({ pref: $.model.pref, edition: resolveEdition("auto") }).run(
          FollowSun.make().pipe(Command.asNoop),
        ),
      ClickedToggle: ({ x, y }) => {
        const pref = nextPref($.model.pref);
        return $.set({ pref, edition: resolveEdition(pref) }).run(
          SwitchEdition.make({ pref, x, y }).pipe(Command.asNoop),
        );
      },
    }),
  subscriptions: ({ model }) => [
    Subscription.make(
      "read-pref",
      Stream.fromEffect(Effect.sync(() => EditionToggleMessage.ReadPref({ pref: readPref() }))),
    ),
    model.pref === "auto" &&
      Subscription.make(
        "follow-sun",
        Stream.tick("1 minute").pipe(Stream.map(() => EditionToggleMessage.Ticked())),
      ),
  ],
  view: (h, { pref, edition }) => {
    const next = nextPref(pref);
    const label = `${LABEL[pref]}. Switch to ${next === "auto" ? "following the sun" : `the ${next} edition`}.`;
    return h.button
      .attr("type", "button")
      .attr("aria-label", label)
      .attr("title", label)
      .class(
        "inline-flex items-center gap-1.5 rounded-sm text-sm text-muted-foreground transition-colors hover:text-foreground",
      )
      .on("click", ({ x, y }) => EditionToggleMessage.ClickedToggle({ x, y }))
      .children(
        h.span
          .attr("aria-hidden", "true")
          .class(
            edition === "night"
              ? "h-2.5 w-2.5 rounded-full border border-current"
              : "h-2.5 w-2.5 rounded-full bg-current",
          ),
        h.span.class("tabular-nums").children(pref === "auto" ? "sun" : pref),
      );
  },
});
