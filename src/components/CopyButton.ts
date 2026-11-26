import { Command, UiSchema } from "@effect/ui";
import { Html } from "@effect/ui/html";
import { Check, Clipboard } from "lucide";
import { Effect, Schema } from "effect";
import { Icon } from "./Icon.ts";

const CopyButtonMessage = UiSchema.TaggedEnum({
  ClickedCopy: {},
  CompletedCopy: {},
  CompletedReset: {},
});

const CopyText = Command.make("CopyText", { args: { text: Schema.String } }, ({ text }) =>
  Effect.promise(() => navigator.clipboard.writeText(text)).pipe(
    Effect.ignore,
    Effect.as(CopyButtonMessage.CompletedCopy()),
  ),
);

const WaitBeforeReset = Command.make("WaitBeforeReset", {}, () =>
  Effect.sleep("2 seconds").pipe(Effect.as(CopyButtonMessage.CompletedReset())),
);

export const CopyButton = Html.component({
  name: "CopyButton",
  props: Schema.Struct({ text: Schema.String }),
  model: Schema.Struct({ copied: Schema.Boolean }),
  message: CopyButtonMessage,
  restore: false,
}).make({
  init: () => ({ copied: false }),
  update: ($, message) =>
    CopyButtonMessage.match(message, {
      ClickedCopy: () => $.set($.model).run(CopyText.make({ text: $.props.text })),
      CompletedCopy: () => $.set({ copied: true }).run(WaitBeforeReset.make()),
      CompletedReset: () => ({ copied: false }),
    }),
  view: (h, { copied }) =>
    h.button
      .attr("type", "button")
      .attr("aria-label", "Copy code to clipboard")
      .class(
        "absolute bottom-2 right-2 rounded bg-muted p-1.5 text-muted-foreground hover:bg-muted/80 hover:text-foreground transition-colors active:scale-[0.95]",
      )
      .on("click", CopyButtonMessage.ClickedCopy())
      .children(copied ? Icon(h, Check, "h-4 w-4 text-brand") : Icon(h, Clipboard)),
});
