import { Command, Router, UiSchema } from "@effect/ui";
import { Html, HtmlSubscription } from "@effect/ui/html";
import { Effect, Schema } from "effect";
import { AppRoute } from "../routes.ts";

const CHORD_TIMEOUT = 1500;

const routes: Record<string, { readonly route: AppRoute; readonly label: string }> = {
  h: { route: AppRoute.Home(), label: "home" },
  b: { route: AppRoute.Blog(), label: "blog" },
  u: { route: AppRoute.Uses(), label: "uses" },
  a: { route: AppRoute.About(), label: "about" },
  s: { route: AppRoute.Someday(), label: "someday" },
  w: { route: AppRoute.Now(), label: "now" },
  q: { route: AppRoute.Quotes(), label: "quotes" },
};

const Scroll = Schema.Literals(["line-down", "line-up", "half-down", "half-up", "bottom", "top"]);
type Scroll = typeof Scroll.Type;

export const ScrollPage = Command.make("ScrollPage", { args: { scroll: Scroll } }, ({ scroll }) =>
  Effect.sync(() => {
    const scrollAmount = 80;
    const halfPage = window.innerHeight / 2;
    switch (scroll) {
      case "line-down":
        return window.scrollBy({ top: scrollAmount });
      case "line-up":
        return window.scrollBy({ top: -scrollAmount });
      case "half-down":
        return window.scrollBy({ top: halfPage });
      case "half-up":
        return window.scrollBy({ top: -halfPage });
      case "bottom":
        return window.scrollTo({ top: document.body.scrollHeight });
      case "top":
        return window.scrollTo({ top: 0 });
    }
  }),
);

export const KeyboardNavMessage = UiSchema.TaggedEnum({
  PressedKey: { key: Schema.String },
  CompletedWait: { seq: Schema.Number },
});

// Each wait carries the sequence number of the display it should clear, so a
// wait that a later key outlived clears nothing.
export const Wait = Command.make(
  "Wait",
  { args: { seq: Schema.Number, millis: Schema.Number } },
  ({ seq, millis }) =>
    Effect.sleep(millis).pipe(Effect.as(KeyboardNavMessage.CompletedWait({ seq }))),
);

const scrollFor = (key: string): Scroll | undefined => {
  switch (key) {
    case "j":
      return "line-down";
    case "k":
      return "line-up";
    case "d":
      return "half-down";
    case "u":
      return "half-up";
    case "G":
      return "bottom";
  }
  return undefined;
};

// Vim-style motions and `g` chords for the site's sections. "idle" hides the
// toast, "pending" waits for the chord's second key, and a label shows where
// a chord went.
export const KeyboardNav = Html.component({
  name: "KeyboardNav",
  model: Schema.Struct({ display: Schema.String, seq: Schema.Number }),
  message: KeyboardNavMessage,
  restore: false,
}).make({
  init: () => ({ display: "idle", seq: 0 }),
  update: ($, message) =>
    KeyboardNavMessage.match(message, {
      CompletedWait: ({ seq }) => (seq === $.model.seq ? { display: "idle", seq } : $.model),
      PressedKey: ({ key }) => {
        const seq = $.model.seq + 1;
        if ($.model.display !== "pending") {
          const scroll = scrollFor(key);
          if (scroll) return $.set($.model).run(ScrollPage.make({ scroll }).pipe(Command.asNoop));
          if (key !== "g") return $.model;
          return $.set({ display: "pending", seq }).run(Wait.make({ seq, millis: CHORD_TIMEOUT }));
        }
        // gg → scroll to top
        if (key === "g") {
          return $.set({ display: "idle", seq }).run(
            ScrollPage.make({ scroll: "top" }).pipe(Command.asNoop),
          );
        }
        const target = routes[key];
        if (!target) return { display: "idle", seq };
        return $.set({ display: target.label, seq }).run(
          Router.push(AppRoute, target.route).pipe(Command.asNoop),
          Wait.make({ seq, millis: 800 }),
        );
      },
    }),
  subscriptions: () => [
    HtmlSubscription.onDocument("keydown", ({ key, editable, ctrl, alt, meta }) =>
      // `?` belongs to KeyboardHint's cheat sheet.
      editable || ctrl || alt || meta || key === "?"
        ? undefined
        : KeyboardNavMessage.PressedKey({ key }),
    ),
  ],
  view: (h, { display }) => {
    const show = display !== "idle";
    const chosen = Object.entries(routes).find(([, r]) => r.label === display)?.[0];
    return h.div
      .class(
        "fixed bottom-6 left-1/2 -translate-x-1/2 z-50 pointer-events-none transition-all duration-200",
        show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2",
      )
      .children(
        h.div
          .class("rounded-lg border border-border bg-card px-4 py-2.5 shadow-lg")
          .children(
            display !== "pending" && display !== "idle"
              ? h.p
                  .class("text-sm text-foreground font-mono")
                  .children(
                    h.kbd.class("text-brand font-semibold").children(`g ${chosen ?? ""}`),
                    h.span.class("text-muted-foreground ml-2").children(`→ ${display}`),
                  )
              : h.div
                  .class("flex items-center gap-4")
                  .children(
                    h.p
                      .class("text-sm text-muted-foreground font-mono")
                      .children(
                        h.kbd.class("text-brand font-semibold").children("g"),
                        h.span.class("ml-1.5").children("+"),
                      ),
                    h.div
                      .class("flex gap-3 text-xs font-mono text-muted-foreground")
                      .children(
                        Object.entries(routes).map(([key, { label }]) =>
                          h.span
                            .key(key)
                            .children(h.kbd.class("text-foreground").children(key), ` ${label}`),
                        ),
                      ),
                  ),
          ),
      );
  },
});
