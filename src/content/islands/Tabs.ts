import { UiSchema } from "@effect/ui";
import { Html } from "@effect/ui/html";
import { Schema } from "effect";

const TabsMessage = UiSchema.TaggedEnum({
  ClickedTab: { index: Schema.Number },
});

export const Tabs = Html.component({
  name: "Tabs",
  props: Schema.Struct({
    items: Schema.Array(Schema.Struct({ label: Schema.String, content: Schema.String })),
  }),
  model: Schema.Struct({ active: Schema.Number }),
  message: TabsMessage,
}).make({
  init: () => ({ active: 0 }),
  update: (_, { index }) => ({ active: index }),
  view: (h, { active }) =>
    h.div.class("my-6").children(
      h.div.class("flex border-b overflow-x-auto").children(
        h.props.items.map((item, index) =>
          h.button
            .key(item.label)
            .attr("type", "button")
            .class(
              index === active
                ? "px-4 py-2 text-sm font-medium whitespace-nowrap border-b-2 border-primary text-primary"
                : "px-4 py-2 text-sm font-medium whitespace-nowrap text-muted-foreground hover:text-foreground",
            )
            .on("click", TabsMessage.ClickedTab({ index }))
            .children(item.label),
        ),
      ),
      h.div.class("mt-4").children(h.props.items[active]?.content ?? null),
    ),
});
