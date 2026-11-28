import { UiSchema } from "@effect/ui";
import { Html } from "@effect/ui/html";
import { Tabs as KitTabs } from "@effect/ui-kit";
import { Schema } from "effect";

const TabsMessage = UiSchema.TaggedEnum({
  SelectedTab: { value: Schema.String },
});

const TAB_CLASS =
  "px-4 py-2 text-sm font-medium whitespace-nowrap text-muted-foreground hover:text-foreground " +
  "data-active:border-b-2 data-active:border-primary data-active:text-primary data-active:hover:text-primary";

// The island owns which tab is open; ui-kit's Tabs adds the tab roles, the
// ids that tie each tab to its panel, and arrow-key focus between the tabs.
// Tab values are the items' indexes, since labels may repeat.
export const Tabs = Html.component({
  name: "Tabs",
  props: Schema.Struct({
    items: Schema.Array(Schema.Struct({ label: Schema.String, content: Schema.String })),
  }),
  model: Schema.Struct({ active: Schema.String }),
  message: TabsMessage,
}).make({
  init: () => ({ active: "0" }),
  update: (_, { value }) => ({ active: value }),
  view: (h, { active }) =>
    KitTabs(h, {
      props: {
        value: active,
        tabs: h.props.items.map((_, index) => ({ value: String(index) })),
      },
      onEmit: { Selected: ({ value }) => TabsMessage.SelectedTab({ value }) },
      view: (tabs) =>
        tabs.root(h.div.class("my-6")).children(
          tabs.list(h.div.class("flex border-b overflow-x-auto")).children(
            h.props.items.map((item, index) =>
              tabs
                .tab({
                  element: h.button.key(String(index)).class(TAB_CLASS),
                  value: String(index),
                })
                .children(item.label),
            ),
          ),
          h.props.items.map(
            (item, index) =>
              tabs
                .panel({ element: h.div.key(String(index)).class("mt-4"), value: String(index) })
                ?.children(item.content) ?? null,
          ),
        ),
    }),
});
