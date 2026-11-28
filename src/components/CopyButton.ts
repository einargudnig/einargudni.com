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
      .class(
        "inline-flex items-center gap-1.5 text-muted-foreground transition-colors hover:text-foreground active:scale-[0.97]",
      )
      .on("click", CopyButtonMessage.ClickedCopy())
      .children(
        copied
          ? Icon(h, Check, "h-3.5 w-3.5 text-foreground").attr("stroke-width", "1.75")
          : Icon(h, Clipboard, "h-3.5 w-3.5").attr("stroke-width", "1.75"),
        h.span.attr("aria-live", "polite").children(copied ? "Copied" : "Copy"),
      ),
});
