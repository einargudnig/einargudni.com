import { UiSchema } from "@effect/ui";
import { Html } from "@effect/ui/html";
import { Collapsible } from "@effect/ui-kit";
import { ChevronDown } from "lucide";
import { Schema } from "effect";
import { Icon } from "../../components/Icon.ts";

const AccordionItemMessage = UiSchema.TaggedEnum({
  ToggledCollapsible: { open: Schema.Boolean },
});

// Items open independently, as the old accordion's did, so each is a
// ui-kit Collapsible: it wires the trigger's aria-expanded and aria-controls
// to the panel. Closed panels stay in the page as hidden="until-found", so
// find-in-page reaches the prose and opens the item. The prose is the
// parent's, passed in the `body` slot.
export const AccordionItem = Html.component({
  name: "AccordionItem",
  props: Schema.Struct({ title: Schema.String }),
  model: Schema.Struct({ open: Schema.Boolean }),
  message: AccordionItemMessage,
  slots: ["body"],
}).make({
  init: () => ({ open: false }),
  update: (_, { open }) => ({ open }),
  view: (h, { open }) =>
    Collapsible(h, {
      props: { open, hiddenUntilFound: true },
      onEmit: {
        Toggled: (event) => AccordionItemMessage.ToggledCollapsible({ open: event.open }),
        Settled: () => undefined,
      },
      view: (collapsible) =>
        collapsible
          .root(h.div.class("border-b"))
          .children(
            collapsible
              .trigger(
                h.button.class(
                  "flex w-full items-center justify-between py-4 text-left font-medium",
                ),
              )
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
            collapsible.panel(h.div.class("pb-4 pt-2"))?.children(h.slots.body) ?? null,
          ),
    }),
});
