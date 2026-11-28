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
import { TableOfContents, type TocHeading } from "./islands/TableOfContents.ts";

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

// Shiki's catppuccin-mocha, which the highlighter in lib/highlighter.ts uses.
const SHIKI_PRE_STYLE = "background-color:#1e1e2e;color:#cdd6f4;counter-reset:line";

// The table of contents the old MDX renderer put above every post and deep
// dive. It shows only when the entry has two or more headings.
export const ContentTableOfContents = <M>(h: Html.H<M>, content: Content, key = "page") => {
  const { headings } = outline(content.document);
  return headings.length < 2 ? null : TableOfContents(h, { key, props: { headings } });
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
          return h.div
            .class("relative my-6 overflow-hidden rounded-lg border border-border bg-muted/30")
            .children(
              h.div.class("relative").children(
                h.div
                  .class("overflow-x-auto text-sm [&_pre]:p-4 [&_pre]:m-0 code-with-lines")
                  .children(
                    h.pre
                      .class("shiki catppuccin-mocha")
                      .attr("style", SHIKI_PRE_STYLE)
                      .attr("tabindex", "0")
                      .children(
                        h.code.children(
                          lines.flatMap((tokens, line) => [
                            line > 0 ? "\n" : null,
                            h.span
                              .key(String(line))
                              .class("line")
                              .attr("data-line", String(line + 1))
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
                  ),
                h.div
                  .class("absolute right-2 top-2 text-xs font-medium text-muted-foreground/60")
                  .children(language.toUpperCase()),
                CopyButton(h, { key: `${key}code-${index}`, props: { text: block.value } }),
              ),
            );
        },
      },
      islands: Markdown.islandsFor(ContentIslands, islandViews<M>({ key, headings })),
    }),
  );
};
