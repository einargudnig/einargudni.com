import { UiSchema } from "@effect/ui";
import { Html } from "@effect/ui/html";
import { ChevronDown } from "lucide";
import { Schema } from "effect";
import { Icon } from "../../components/Icon.ts";

const AccordionItemMessage = UiSchema.TaggedEnum({ ClickedToggle: {} });

// The item owns whether it's open; the prose inside is the parent's, passed
// in the `body` slot.
export const AccordionItem = Html.component({
  name: "AccordionItem",
  props: Schema.Struct({ title: Schema.String }),
  model: Schema.Struct({ open: Schema.Boolean }),
  message: AccordionItemMessage,
  slots: ["body"],
}).make({
  init: () => ({ open: false }),
  update: ($) => ({ open: !$.model.open }),
  view: (h, { open }) =>
    h.div.class("border-b").children(
      h.button
        .attr("type", "button")
        .attr("aria-expanded", open ? "true" : "false")
        .class("flex w-full items-center justify-between py-4 text-left font-medium")
        .on("click", AccordionItemMessage.ClickedToggle())
        .children(
          h.span.children(h.props.title),
          Icon(
            h,
            ChevronDown,
            open
              ? "h-4 w-4 text-muted-foreground transition-transform duration-200 rotate-180"
              : "h-4 w-4 text-muted-foreground transition-transform duration-200",
          ),
        ),
      open && h.div.class("pb-4 pt-2").children(h.slots.body),
    ),
});
