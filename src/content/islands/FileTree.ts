import type { View } from "@effect/ui";
import { UiSchema } from "@effect/ui";
import { Html } from "@effect/ui/html";
import { ChevronDown, ChevronRight, File, Folder } from "lucide";
import { Schema } from "effect";
import { Icon } from "../../components/Icon.ts";

interface FileTreeEntry {
  readonly name: string;
  readonly isOpen?: boolean;
  readonly children?: ReadonlyArray<FileTreeEntry>;
}
const FileTreeEntry: Schema.Codec<FileTreeEntry> = Schema.Struct({
  name: Schema.String,
  isOpen: Schema.optionalKey(Schema.Boolean),
  children: Schema.optionalKey(Schema.Array(Schema.suspend(() => FileTreeEntry))),
});

const FileTreeMessage = UiSchema.TaggedEnum({ ClickedFolder: { path: Schema.String } });

// Folders are keyed by their path. Only top-level folders read `isOpen`, as
// the original did.
export const FileTree = Html.component({
  name: "FileTree",
  props: Schema.Struct({ data: Schema.Array(FileTreeEntry) }),
  model: Schema.Struct({ expanded: Schema.Record(Schema.String, Schema.Boolean) }),
  message: FileTreeMessage,
}).make({
  init: ($) => ({
    expanded: Object.fromEntries(
      $.props.data.flatMap((item) => (item.children ? [[item.name, item.isOpen === true]] : [])),
    ),
  }),
  update: ($, { path }) =>
    $.evolve({ expanded: (expanded) => ({ ...expanded, [path]: !expanded[path] }) }),
  view: (h, { expanded }) => {
    const item = (
      entry: FileTreeEntry,
      level: number,
      path: string,
    ): View.Content<typeof FileTreeMessage.Type> => {
      const currentPath = path ? `${path}/${entry.name}` : entry.name;
      const children = entry.children;
      const isExpanded = children !== undefined && expanded[currentPath] === true;
      return h.div
        .key(currentPath)
        .style({ paddingLeft: `${level * 16}px` })
        .children(
          // A folder is a real button, so the keyboard reaches it and a screen
          // reader hears whether it's open.
          children
            ? h.button
                .attr("type", "button")
                .attr("aria-expanded", isExpanded ? "true" : "false")
                .class(
                  "flex w-full items-center py-1 text-left cursor-pointer underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground",
                )
                .on("click", FileTreeMessage.ClickedFolder({ path: currentPath }))
                .children(
                  Icon(
                    h,
                    isExpanded ? ChevronDown : ChevronRight,
                    "h-4 w-4 mr-1 text-muted-foreground",
                  ),
                  Icon(h, Folder, "h-4 w-4 mr-2 text-brand"),
                  h.span.class("text-sm").children(entry.name),
                )
            : h.div
                .class("flex items-center py-1")
                .children(
                  h.span.class("w-4 mr-1"),
                  Icon(h, File, "h-4 w-4 mr-2 text-muted-foreground"),
                  h.span.class("text-sm").children(entry.name),
                ),
          isExpanded &&
            h.div.children(children.map((child) => item(child, level + 1, currentPath))),
        );
    };
    return h.div
      .class("my-8 border-t border-foreground border-b border-b-border py-2")
      .children(h.props.data.map((entry) => item(entry, 0, "")));
  },
});
