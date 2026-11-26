import { Schema } from "effect";

// The components a post may place in its prose, as `::Name{...}` or
// `:::Name{...}` ... `:::`. The Vite config checks every content file against
// these at build time, and `ContentView` decodes the attributes through them.
// Attributes are strings in the source, so structured ones are JSON.

const Json = <S extends Schema.Top>(schema: S) => Schema.fromJsonString(schema);
const Flag = Schema.Literals(["true", "false"]);

const ArchitectureNode = Schema.Struct({
  label: Schema.String,
  detail: Schema.optionalKey(Schema.String),
});

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

export const ContentIslands = {
  Architecture: Schema.Struct({
    nodes: Json(Schema.Array(ArchitectureNode)),
    caption: Schema.optionalKey(Schema.String),
  }),
  Callout: Schema.Struct({
    type: Schema.optionalKey(Schema.Literals(["info", "warning", "error", "tip"])),
    title: Schema.optionalKey(Schema.String),
  }),
  Blockquote: Schema.Struct({
    author: Schema.optionalKey(Schema.String),
    citation: Schema.optionalKey(Schema.String),
  }),
  Accordion: Schema.Struct({}),
  AccordionItem: Schema.Struct({ title: Schema.String }),
  StylishList: Schema.Struct({
    type: Schema.optionalKey(Schema.Literals(["disc", "circle", "check", "number", "none"])),
    gap: Schema.optionalKey(Schema.Literals(["tight", "normal", "loose"])),
  }),
  CaptionedImage: Schema.Struct({
    src: Schema.String,
    alt: Schema.String,
    width: Schema.optionalKey(Schema.NumberFromString),
    height: Schema.optionalKey(Schema.NumberFromString),
    caption: Schema.optionalKey(Schema.String),
  }),
  KeyboardShortcut: Schema.Struct({
    keys: Json(Schema.Array(Schema.String)),
    description: Schema.optionalKey(Schema.String),
  }),
  VideoEmbed: Schema.Struct({
    src: Schema.String,
    title: Schema.optionalKey(Schema.String),
    caption: Schema.optionalKey(Schema.String),
    aspectRatio: Schema.optionalKey(Schema.Literals(["16:9", "4:3", "1:1", "vertical", "custom"])),
  }),
  YouTubeEmbed: Schema.Struct({
    videoId: Schema.String,
    title: Schema.optionalKey(Schema.String),
    caption: Schema.optionalKey(Schema.String),
    start: Schema.optionalKey(Schema.NumberFromString),
    aspectRatio: Schema.optionalKey(Schema.Literals(["16:9", "4:3", "21:9"])),
    loop: Schema.optionalKey(Flag),
  }),
  Tabs: Schema.Struct({
    items: Json(Schema.Array(Schema.Struct({ label: Schema.String, content: Schema.String }))),
  }),
  TableOfContents: Schema.Struct({}),
  CardLink: Schema.Struct({
    href: Schema.String,
    title: Schema.String,
    description: Schema.optionalKey(Schema.String),
    external: Schema.optionalKey(Flag),
  }),
  FileTree: Schema.Struct({ data: Json(Schema.Array(FileTreeEntry)) }),
  ColorSwatch: Schema.Struct({
    colors: Json(
      Schema.Array(
        Schema.Struct({
          color: Schema.String,
          label: Schema.optionalKey(Schema.String),
          value: Schema.optionalKey(Schema.String),
        }),
      ),
    ),
  }),
  Timeline: Schema.Struct({
    items: Json(
      Schema.Array(
        Schema.Struct({
          date: Schema.String,
          title: Schema.String,
          description: Schema.optionalKey(Schema.String),
        }),
      ),
    ),
  }),
};
