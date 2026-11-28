import { Command, Subscription, UiSchema } from "@effect/ui";
import { Html, HtmlSubscription } from "@effect/ui/html";
import { Effect, Schema, Stream } from "effect";
import { Keyboard } from "lucide";
import { Icon } from "./Icon.ts";

const STORAGE_KEY = "keyboard-hint-dismissed";

const bindings = [
  { keys: "g h", label: "Home" },
  { keys: "g b", label: "Blog" },
  { keys: "g u", label: "Uses" },
  { keys: "g a", label: "About" },
  { keys: "g w", label: "Now" },
  { keys: "g q", label: "Quotes" },
  { keys: "g s", label: "Someday" },
  { divider: true, label: "Scroll" },
  { keys: "j / k", label: "Scroll down / up" },
  { keys: "d / u", label: "Half-page down / up" },
  { keys: "G", label: "Bottom" },
  { keys: "g g", label: "Top" },
] as const;

const wasDismissed = () => {
  try {
    return localStorage.getItem(STORAGE_KEY) !== null;
  } catch {
    // localStorage unavailable
    return true;
  }
};

const RememberDismissal = Command.make("RememberDismissal", {}, () =>
  Effect.sync(() => {
    try {
      localStorage.setItem(STORAGE_KEY, "1");
    } catch {
      // localStorage unavailable
    }
  }),
);

const KeyboardHintMessage = UiSchema.TaggedEnum({
  ClickedToggle: {},
  ClickedFirstVisitHint: {},
  ClickedBackdrop: {},
  PressedQuestionMark: {},
  ElapsedFirstVisitDelay: {},
});

const KeyboardHintModel = Schema.Struct({ open: Schema.Boolean, showFirstVisit: Schema.Boolean });
type KeyboardHintModel = typeof KeyboardHintModel.Type;

// A first visit gets a nudge after two seconds, until the cheat sheet is
// opened once.
export const KeyboardHint = Html.component({
  name: "KeyboardHint",
  model: KeyboardHintModel,
  message: KeyboardHintMessage,
  restore: false,
}).make({
  init: (): KeyboardHintModel => ({ open: false, showFirstVisit: false }),
  update: ($, message) => {
    const dismiss = RememberDismissal.make().pipe(Command.asNoop);
    const toggle = () =>
      $.model.showFirstVisit
        ? $.evolve({ open: (open) => !open, showFirstVisit: false }).run(dismiss)
        : $.evolve({ open: (open) => !open });
    return KeyboardHintMessage.match(message, {
      ClickedToggle: toggle,
      PressedQuestionMark: toggle,
      ClickedFirstVisitHint: () => $.evolve({ open: true, showFirstVisit: false }).run(dismiss),
      ClickedBackdrop: () => $.evolve({ open: false }),
      ElapsedFirstVisitDelay: () => $.evolve({ showFirstVisit: true }),
    });
  },
  subscriptions: () => [
    HtmlSubscription.shortcuts(
      [{ key: "?", message: KeyboardHintMessage.PressedQuestionMark(), repeat: true }],
      { preventDefault: false },
    ),
    Subscription.make(
      "first-visit",
      Stream.unwrap(
        Effect.sync(() =>
          wasDismissed()
            ? Stream.empty
            : Stream.fromEffect(
                Effect.sleep("2 seconds").pipe(
                  Effect.as(KeyboardHintMessage.ElapsedFirstVisitDelay()),
                ),
              ),
        ),
      ),
    ),
  ],
  view: (h, { open, showFirstVisit }) =>
    h.div.class("relative hidden md:block").children(
      h.button
        .class(
          "flex items-center justify-center text-muted-foreground hover:text-brand transition-colors",
          open ? "text-brand" : "",
        )
        .attr("aria-label", "Keyboard shortcuts")
        .on("click", KeyboardHintMessage.ClickedToggle())
        .children(Icon(h, Keyboard, "h-4 w-4").attr("stroke-width", "1.5")),
      showFirstVisit && !open
        ? h.div
            .class("absolute -bottom-12 right-0 animate-fade-in-up")
            .children(
              h.button
                .class(
                  "whitespace-nowrap border-t border-foreground bg-background px-0 pt-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors",
                )
                .on("click", KeyboardHintMessage.ClickedFirstVisitHint())
                .children("Keyboard shortcuts available"),
            )
        : null,
      open
        ? [
            h.div.class("fixed inset-0 z-40").on("click", KeyboardHintMessage.ClickedBackdrop()),
            h.div
              .class(
                "absolute right-0 top-full mt-3 z-50 w-64 border-t border-foreground border-b border-b-border bg-background py-3 animate-fade-in-up",
              )
              .children(
                h.div
                  .class("flex items-center justify-between mb-3")
                  .children(
                    h.p.class("text-sm font-semibold").children("Keyboard shortcuts"),
                    h.kbd.class("font-mono text-xs text-muted-foreground").children("?"),
                  ),
                h.div
                  .class("space-y-1")
                  .children(
                    bindings.map((b) =>
                      "divider" in b
                        ? h.p
                            .key(b.label)
                            .class(
                              "text-xs text-muted-foreground font-semibold pt-2 pb-1 border-t border-border/50 mt-2",
                            )
                            .children(b.label)
                        : h.div
                            .key(b.label)
                            .class("flex items-center justify-between py-0.5")
                            .children(
                              h.span.class("text-xs text-muted-foreground").children(b.label),
                              h.kbd.class("text-xs font-mono text-brand").children(b.keys),
                            ),
                    ),
                  ),
              ),
          ]
        : null,
    ),
});
