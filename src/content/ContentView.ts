import { Html, Markdown } from "@effect/ui/html";
import type { Content } from "../queries/GetContent.ts";
import { CopyButton } from "../components/CopyButton.ts";
import { ArrowUpRight } from "lucide";
import { Icon } from "../components/Icon.ts";
import { ContentIslands } from "./islands.ts";
import {
  Blockquote,
  CaptionedImage,
  islandViews,
  type ListGap,
  type ListType,
  StylishList,
} from "./island-views.ts";
import type { TocHeading } from "./islands/TableOfContents.ts";

const isExternal = (url: string) => url.startsWith("http") || url.startsWith("mailto:");

// A heading's id is its text, slugged, so the table of contents and shared
// links can point at it.
export const slugify = (text: string) =>
  text
    .toLowerCase()
    .trim()
    .replace(/[^\p{L}\p{N}\s-]/gu, "")
    .replace(/\s+/g, "-");

const plainText = (inlines: ReadonlyArray<Markdown.Inline>): string =>
  inlines
    .map((node) => {
      switch (node._tag) {
        case "Text":
        case "InlineCode":
          return node.value;
        case "HardBreak":
        case "Image":
          return "";
        default:
          return plainText(node.content);
      }
    })
    .join("");

// The posts wrote their headings as <Heading> and <Subheading>.
const HEADING_CLASS: Record<number, string> = {
  2: "mt-10 scroll-m-20 text-3xl font-bold tracking-tight",
  3: "mt-8 scroll-m-20 text-2xl font-semibold tracking-tight text-muted-foreground",
};

const LIST_TYPES: ReadonlyArray<string> = ["disc", "circle", "check", "number", "none"];
const LIST_GAPS: ReadonlyArray<string> = ["tight", "normal", "loose"];

interface Outline {
  readonly headings: Array<TocHeading>;
  // Lists drawn by a StylishList island take its type and gap.
  readonly listStyles: Map<Markdown.List, { readonly type: ListType; readonly gap: ListGap }>;
  // A list item's lone paragraph, which MDX printed without a <p>.
  readonly tight: Set<Markdown.Paragraph>;
}

const outline = (document: Markdown.Document): Outline => {
  const result: Outline = { headings: [], listStyles: new Map(), tight: new Set() };
  const walk = (blocks: ReadonlyArray<Markdown.Block>) => {
    for (const block of blocks) {
      switch (block._tag) {
        case "Heading":
          if (block.level <= 3) {
            const title = plainText(block.content);
            result.headings.push({ id: slugify(title), title, level: block.level });
          }
          break;
        case "Blockquote":
          walk(block.blocks);
          break;
        case "Island":
          if (block.name === "StylishList") {
            const { type = "disc", gap = "normal" } = block.attributes;
            for (const inner of block.blocks) {
              if (inner._tag !== "List") continue;
              result.listStyles.set(inner, {
                type: (LIST_TYPES.includes(type) ? type : "disc") as ListType,
                gap: (LIST_GAPS.includes(gap) ? gap : "normal") as ListGap,
              });
            }
          }
          walk(block.blocks);
          break;
        case "List":
          for (const item of block.items) {
            const [first, ...rest] = item.blocks;
            if (first?._tag === "Paragraph" && rest.every((next) => next._tag === "List")) {
              result.tight.add(first);
            }
            walk(item.blocks);
          }
          break;
        default:
          break;
      }
    }
  };
  walk(document.blocks);
  return result;
};

// Shown in the code block's head row; anything else prints as the fence says.
const LANGUAGE_NAME: Record<string, string> = {
  ts: "TypeScript",
  typescript: "TypeScript",
  tsx: "TSX",
  js: "JavaScript",
  javascript: "JavaScript",
  jsx: "JSX",
  css: "CSS",
  bash: "Shell",
  sh: "Shell",
  shell: "Shell",
  zsh: "Shell",
  json: "JSON",
  md: "Markdown",
  text: "Text",
};

// An entry's h2 and h3 sections, for its contents. A short piece reads
// better without one, so it takes four sections to earn it.
export const contentsOf = (content: Content): ReadonlyArray<TocHeading> => {
  const sections = outline(content.document).headings.filter(
    (heading) => heading.level === 2 || heading.level === 3,
  );
  return sections.length < 4 ? [] : sections;
};

// Renders one content entry: the prose with the site's element styles, code
// highlighted at build time, and the islands in ./islands.ts. A page that
// shows several entries gives each its own `key`, which keeps their islands'
// component keys apart.
export const ContentView = <M>(
  h: Html.H<M>,
  content: Content,
  options: { readonly key?: string } = {},
) => {
  const key = options.key ?? "";
  const { headings, listStyles, tight } = outline(content.document);
  return h.div.class("mdx-content").children(
    Markdown.view<M, never>(h, content.document, {
      views: {
        Heading: (_h, heading, inner) => {
          const tag = (["h1", "h2", "h3", "h4", "h5", "h6"] as const)[heading.level - 1] ?? "h6";
          return h[tag]
            .attr("id", slugify(plainText(heading.content)))
            .class(HEADING_CLASS[heading.level] ?? "")
            .children(inner);
        },
        Paragraph: (_h, paragraph, inner) => {
          const [figure] = inner;
          if (
            paragraph.content.length === 1 &&
            paragraph.content[0]?._tag === "Image" &&
            typeof figure === "object"
          ) {
            return figure;
          }
          return tight.has(paragraph) ? h.span.children(inner) : h.p.children(inner);
        },
        Link: (_h, link, inner) =>
          isExternal(link.url)
            ? h.a
                .attr("href", link.url)
                .attr("target", "_blank")
                .attr("rel", "noopener noreferrer")
                .children(
                  inner,
                  Icon(h, ArrowUpRight, "ml-0.5 inline h-3.5 w-3.5 align-[-0.1em] opacity-60")
                    .attr("aria-hidden", "true")
                    .attr("stroke-width", "1.75"),
                )
            : h.a.attr("href", link.url).children(inner),
        Image: (_h, image) => CaptionedImage(h, { src: image.url, alt: image.alt }),
        InlineCode: (_h, { value }) =>
          h.code.class("inline-code").children(value),
        Blockquote: (_h, _, blocks) => Blockquote(h, { children: blocks }),
        List: (_h, list, items) =>
          StylishList(h, {
            ...(listStyles.get(list) ?? {
              type: list.isOrdered ? "number" : "disc",
              gap: "normal",
            }),
            items,
          }),
        ListItem: (_h, _, blocks) => h.div.class("flex-1").children(blocks),
        CodeBlock: (_h, block, index) => {
          const language =
            block.language._tag === "Some"
              ? (/^\w+/.exec(block.language.value)?.[0] ?? "text")
              : "text";
          const lines = content.code[index] ?? block.value.split("\n").map((text) => [{ text }]);
          return h.figure
            .class("code-block not-prose my-8 border-t border-foreground border-b border-b-border")
            .children(
              h.figcaption
                .class(
                  "flex items-center justify-between border-b border-border py-2 text-xs text-muted-foreground",
                )
                .children(
                  h.span.children(LANGUAGE_NAME[language.toLowerCase()] ?? language),
                  CopyButton(h, { key: `${key}code-${index}`, props: { text: block.value } }),
                ),
              h.pre
                .class("overflow-x-auto py-4")
                .attr("tabindex", "0")
                .children(
                  h.code.children(
                    lines.flatMap((tokens, line) => [
                      line > 0 ? "\n" : null,
                      h.span
                        .key(String(line))
                        .class("line")
                        .children(
                          tokens.map((token, i) =>
                            token.color
                              ? h.span
                                  .key(String(i))
                                  .style({ color: token.color })
                                  .children(token.text)
                              : token.text,
                          ),
                        ),
                    ]),
                  ),
                ),
            );
        },
      },
      islands: Markdown.islandsFor(ContentIslands, islandViews<M>({ key, headings })),
    }),
  );
};
