import type { View } from "@effect/ui";
import type { Html } from "@effect/ui/html";
import {
  ArrowDown,
  ArrowRight,
  Check,
  Circle,
  CircleAlert,
  ExternalLink as ExternalLinkIcon,
  Info,
  Lightbulb,
  Quote,
  TriangleAlert,
  type IconNode,
} from "lucide";
import { Icon } from "../components/Icon.ts";
import { Image } from "../components/Image.ts";
import type { ContentIslands } from "./islands.ts";
import { AccordionItem } from "./islands/AccordionItem.ts";
import { FileTree } from "./islands/FileTree.ts";
import { TableOfContents, type TocHeading } from "./islands/TableOfContents.ts";
import { Tabs } from "./islands/Tabs.ts";

type Attrs<K extends keyof typeof ContentIslands> = (typeof ContentIslands)[K]["Type"];
type Inner<M> = ReadonlyArray<View.Content<M, never>>;

// An island returns one node; a container whose prose is already one node
// (StylishList's list) passes it through. Typed as an Element because
// IslandRequirements reads a Text or Outlet member as `unknown` requirements.
const single = <M>(h: Html.H<M>, inner: Inner<M>): View.Element<M, never> =>
  (inner[0] ?? h.div.children()) as View.Element<M, never>;

export type ListIcon = "check" | "circle" | "number" | "none";
export type ListType = NonNullable<Attrs<"StylishList">["type"]>;
export type ListGap = NonNullable<Attrs<"StylishList">["gap"]>;

const LIST_GAP: Record<ListGap, string> = {
  tight: "space-y-1",
  normal: "space-y-2",
  loose: "space-y-4",
};

const LIST_ICON: Record<ListType, ListIcon> = {
  check: "check",
  circle: "circle",
  number: "number",
  disc: "circle",
  none: "none",
};

const ListItemIcon = <M>(h: Html.H<M>, icon: ListIcon, index: number) => {
  switch (icon) {
    case "check":
      return h.span
        .class(
          "mr-2 flex h-5 w-5 items-center justify-center rounded-full bg-primary/10 text-primary",
        )
        .children(Icon(h, Check, "h-3.5 w-3.5"));
    case "circle":
      return h.span
        .class("mr-2 flex h-5 w-5 items-center justify-center")
        .children(Icon(h, Circle, "h-1.5 w-1.5 fill-current"));
    case "number":
      return h.span
        .class(
          "mr-2 flex h-5 w-5 items-center justify-center rounded-full bg-primary/10 text-xs font-medium text-primary",
        )
        .children(String(index));
    case "none":
      return null;
  }
};

// Every list in the prose, Markdown or StylishList: each item gets the list
// type's marker, numbered from one. `items` are the items' bodies.
export const StylishList = <M, C extends View.Children<M, never>>(
  h: Html.H<M>,
  options: { readonly type: ListType; readonly gap: ListGap; readonly items: C },
) =>
  h.ul
    .class(
      ["my-6", LIST_GAP[options.gap], options.type === "none" ? "list-none" : ""]
        .filter(Boolean)
        .join(" "),
    )
    .children(
      options.items.map((item, index) =>
        h.li
          .key(String(index))
          .class("flex items-start")
          .children(ListItemIcon(h, LIST_ICON[options.type], index + 1), item),
      ),
    );

export const Blockquote = <M, C extends View.Children<M, never>>(
  h: Html.H<M>,
  options: { readonly author?: string; readonly citation?: string; readonly children: C },
) =>
  h.figure
    .class("my-8 relative")
    .children(
      h.div
        .class("absolute -left-6 top-0 text-muted-foreground")
        .children(Icon(h, Quote, "h-6 w-6")),
      h.blockquote
        .class("border-l-4 pl-6 italic")
        .children(h.div.class("text-lg").children(options.children)),
      (options.author || options.citation) &&
        h.figcaption
          .class("mt-2 text-right text-sm text-muted-foreground")
          .children(
            options.author && h.span.class("font-medium").children(`— ${options.author}`),
            options.author && options.citation && h.span.children(", "),
            options.citation && h.cite.children(options.citation),
          ),
    );

export const CaptionedImage = <M>(
  h: Html.H<M>,
  options: {
    readonly src: string;
    readonly alt: string;
    readonly width?: number;
    readonly height?: number;
    readonly caption?: string;
  },
) =>
  h.figure.class("my-8").children(
    h.div.class("overflow-hidden rounded-md").children(
      Image(h, {
        src: options.src,
        alt: options.alt,
        width: options.width || 800,
        height: options.height || 450,
        unoptimized: options.src.startsWith("http"),
      }).class("w-full object-cover"),
    ),
    options.caption &&
      h.figcaption
        .class("mt-2 text-center text-sm text-muted-foreground")
        .children(options.caption),
  );

const CALLOUT_ICON: Record<NonNullable<Attrs<"Callout">["type"]>, IconNode> = {
  info: Info,
  warning: TriangleAlert,
  error: CircleAlert,
  tip: Lightbulb,
};

const CALLOUT_STYLE: Record<NonNullable<Attrs<"Callout">["type"]>, string> = {
  info: "bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800 text-blue-800 dark:text-blue-300",
  warning:
    "bg-yellow-50 dark:bg-yellow-950 border-yellow-200 dark:border-yellow-800 text-yellow-800 dark:text-yellow-300",
  error:
    "bg-red-50 dark:bg-red-950 border-red-200 dark:border-red-800 text-red-800 dark:text-red-300",
  tip: "bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-800 text-green-800 dark:text-green-300",
};

const YOUTUBE_ID = [
  /youtu\.be\/([^?&#]+)/,
  /[?&]v=([^&#]+)/,
  /youtube\.com\/embed\/([^?&#]+)/,
  /youtube\.com\/v\/([^?&#]+)/,
];

const youTubeId = (input: string) => {
  if (/^[\w-]{11}$/.test(input)) return input;
  for (const pattern of YOUTUBE_ID) {
    const match = pattern.exec(input)?.[1];
    if (match) return match;
  }
  return input;
};

const isYouTube = (url: string) => url.includes("youtube.com") || url.includes("youtu.be");

const youTubeEmbedUrl = (url: string) => {
  if (url.includes("youtu.be/"))
    return `https://www.youtube.com/embed/${url.split("youtu.be/")[1]?.split("?")[0] ?? ""}`;
  if (url.includes("watch?v="))
    return `https://www.youtube.com/embed/${url.split("v=")[1]?.split("&")[0] ?? ""}`;
  return url;
};

const VIDEO_ASPECT: Record<NonNullable<Attrs<"VideoEmbed">["aspectRatio"]>, string> = {
  "16:9": "aspect-w-16 aspect-h-9",
  "4:3": "aspect-w-4 aspect-h-3",
  "1:1": "aspect-w-1 aspect-h-1",
  vertical: "aspect-w-9 aspect-h-16",
  custom: "",
};

const YOUTUBE_ASPECT: Record<NonNullable<Attrs<"YouTubeEmbed">["aspectRatio"]>, string> = {
  "16:9": "pb-[56.25%]",
  "4:3": "pb-[75%]",
  "21:9": "pb-[42.86%]",
};

const Caption = <M>(h: Html.H<M>, caption: string | undefined) =>
  caption && h.figcaption.class("mt-2 text-center text-sm text-muted-foreground").children(caption);

// One view per island in ./islands.ts. `islandsFor` refuses a missing one.
// `key` tells one entry's islands from another's when a page shows several;
// `headings` are the entry's h1–h3, for the table of contents.
export const islandViews = <M>(context: {
  readonly key: string;
  readonly headings: ReadonlyArray<TocHeading>;
}) => ({
  // The request path through a case study's system, drawn left to right. It is
  // the one recurring visual on the site: every case study is "an agent inside a
  // system that already exists", and this is that system. Stacks on phones.
  Architecture: (h: Html.H<M>, { nodes, caption }: Attrs<"Architecture">) =>
    h.figure.class("not-prose my-10 border-y border-foreground py-5").children(
      h.ol
        .class("flex flex-col items-stretch gap-1 md:flex-row md:items-stretch md:gap-0")
        .children(
          nodes.flatMap((node, index) => [
            index > 0 &&
              h.li
                .key(`arrow-${index}`)
                .attr("aria-hidden", "true")
                .class("flex items-center justify-center text-muted-foreground md:px-1.5")
                .children(
                  Icon(h, ArrowDown, "h-4 w-4 md:hidden").attr("stroke-width", "1.75"),
                  Icon(h, ArrowRight, "hidden h-4 w-4 md:block").attr("stroke-width", "1.75"),
                ),
            h.li
              .key(`node-${index}`)
              .class("flex-1 rounded-sm border border-border px-3 py-2.5")
              .children(
                h.p
                  .class("flex items-center gap-2 font-mono text-[13px] font-medium leading-tight")
                  .children(
                    h.span
                      .attr("aria-hidden", "true")
                      .class(
                        index === 0 || index === nodes.length - 1
                          ? "h-1.5 w-1.5 shrink-0 rounded-full bg-foreground"
                          : "h-1.5 w-1.5 shrink-0 rounded-full border border-foreground",
                      ),
                    node.label,
                  ),
                node.detail &&
                  h.p
                    .class("mt-1 text-xs text-muted-foreground leading-snug")
                    .children(node.detail),
              ),
          ]),
        ),
      caption &&
        h.figcaption
          .class("mt-4 max-w-[60ch] text-xs text-muted-foreground leading-relaxed")
          .children(caption),
    ),
  Callout: (h: Html.H<M>, { type = "info", title }: Attrs<"Callout">, inner: Inner<M>) =>
    h.div
      .class(`my-6 rounded-lg border p-4 ${CALLOUT_STYLE[type]}`)
      .children(
        h.div
          .class("flex items-center gap-3")
          .children(
            Icon(h, CALLOUT_ICON[type], "h-5 w-5"),
            title && h.p.class("font-medium").children(title),
          ),
        h.div.class("mt-2 prose-sm").children(inner),
      ),
  Blockquote: (h: Html.H<M>, { author, citation }: Attrs<"Blockquote">, inner: Inner<M>) =>
    Blockquote(h, {
      ...(author === undefined ? {} : { author }),
      ...(citation === undefined ? {} : { citation }),
      children: inner,
    }),
  Accordion: (h: Html.H<M>, _: Attrs<"Accordion">, inner: Inner<M>) =>
    h.div.class("my-6 divide-y rounded-lg border").children(inner),
  AccordionItem: (
    h: Html.H<M>,
    { title }: Attrs<"AccordionItem">,
    inner: Inner<M>,
    index: number,
  ) =>
    AccordionItem(h, { key: `${context.key}${index}`, props: { title }, slots: { body: inner } }),
  // The list inside is drawn by ContentView's List view, which reads this
  // island's type and gap.
  StylishList: (h: Html.H<M>, _: Attrs<"StylishList">, inner: Inner<M>) => single(h, inner),
  CaptionedImage: (h: Html.H<M>, { src, alt, width, height, caption }: Attrs<"CaptionedImage">) =>
    CaptionedImage(h, {
      src,
      alt,
      ...(width === undefined ? {} : { width }),
      ...(height === undefined ? {} : { height }),
      ...(caption === undefined ? {} : { caption }),
    }),
  KeyboardShortcut: (h: Html.H<M>, { keys, description }: Attrs<"KeyboardShortcut">) =>
    h.div
      .class("flex items-center text-sm my-2")
      .children(
        h.div
          .class("flex items-center gap-1")
          .children(
            keys.flatMap((key, index) => [
              h.kbd
                .key(`key-${index}`)
                .class(
                  "px-2 py-1 font-mono text-xs font-semibold text-foreground bg-muted border border-border rounded shadow-sm",
                )
                .children(key),
              index < keys.length - 1 && h.span.key(`plus-${index}`).class("mx-1").children("+"),
            ]),
          ),
        description && h.span.class("ml-3 text-muted-foreground").children(description),
      ),
  VideoEmbed: (h: Html.H<M>, { src, title, caption, aspectRatio = "16:9" }: Attrs<"VideoEmbed">) =>
    h.figure.class("my-8").children(
      h.div
        .class(`overflow-hidden rounded-lg bg-muted ${VIDEO_ASPECT[aspectRatio]}`.trim())
        .children(
          isYouTube(src)
            ? h.iframe
                .attr("src", youTubeEmbedUrl(src))
                .attr("title", title || "YouTube video player")
                .attr(
                  "allow",
                  "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture",
                )
                .attr("allowfullscreen", "")
                .attr("sandbox", "allow-scripts allow-popups allow-presentation")
                .class("w-full h-full")
            : h.video
                .attr("src", src)
                .attr("controls", "")
                .attr("title", title)
                .class("w-full h-full"),
        ),
      Caption(h, caption),
    ),
  YouTubeEmbed: (
    h: Html.H<M>,
    {
      videoId,
      title = "YouTube video player",
      caption,
      start,
      aspectRatio = "16:9",
      loop,
    }: Attrs<"YouTubeEmbed">,
  ) => {
    const id = youTubeId(videoId);
    const params = new URLSearchParams();
    if (start) params.set("start", String(start));
    if (loop === "true") {
      params.set("loop", "1");
      params.set("playlist", id);
    }
    params.set("modestbranding", "1");
    params.set("rel", "0");
    return h.figure
      .class("my-8")
      .children(
        h.div
          .class(
            `relative w-full overflow-hidden rounded-lg bg-muted ${YOUTUBE_ASPECT[aspectRatio]}`,
          )
          .children(
            h.iframe
              .attr("src", `https://www.youtube-nocookie.com/embed/${id}?${params.toString()}`)
              .attr("title", title)
              .attr(
                "allow",
                "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share",
              )
              .attr("allowfullscreen", "")
              .attr("sandbox", "allow-scripts allow-popups allow-presentation")
              .attr("loading", "lazy")
              .class("absolute inset-0 h-full w-full"),
          ),
        Caption(h, caption),
      );
  },
  Tabs: (h: Html.H<M>, { items }: Attrs<"Tabs">, _: Inner<M>, index: number) =>
    Tabs(h, { key: `${context.key}${index}`, props: { items } }),
  TableOfContents: (h: Html.H<M>, _: Attrs<"TableOfContents">, __: Inner<M>, index: number) =>
    context.headings.length < 2
      ? h.div.class("hidden")
      : TableOfContents(h, {
          key: `${context.key}${index}`,
          props: { headings: context.headings },
        }),
  CardLink: (h: Html.H<M>, { href, title, description, external }: Attrs<"CardLink">) =>
    h.a
      .attr("href", href)
      .attr("target", external === "true" ? "_blank" : undefined)
      .attr("rel", external === "true" ? "noopener noreferrer" : undefined)
      .children(
        h.div
          .class(
            "group flex items-start gap-3 rounded-lg border p-4 hover:bg-muted transition-colors",
          )
          .children(
            h.div
              .class("space-y-1")
              .children(
                h.div
                  .class("font-medium group-hover:underline flex items-center gap-1.5")
                  .children(
                    title,
                    external === "true" && Icon(h, ExternalLinkIcon, "h-3.5 w-3.5 opacity-70"),
                  ),
                description && h.div.class("text-sm text-muted-foreground").children(description),
              ),
          ),
      ),
  FileTree: (h: Html.H<M>, { data }: Attrs<"FileTree">, _: Inner<M>, index: number) =>
    FileTree(h, { key: `${context.key}${index}`, props: { data } }),
  ColorSwatch: (h: Html.H<M>, { colors }: Attrs<"ColorSwatch">) =>
    h.div.class("flex flex-wrap gap-4 my-4").children(
      colors.map((color, index) =>
        h.div
          .key(String(index))
          .class("flex flex-col items-center")
          .children(
            h.div
              .class("rounded-md shadow-md border border-border h-12 w-12")
              .style({ backgroundColor: color.color })
              .attr("title", color.value || color.color),
            (color.label || color.value) &&
              h.div
                .class("mt-2 text-xs text-center")
                .children(
                  color.label && h.div.class("font-medium").children(color.label),
                  color.value && h.div.class("text-muted-foreground").children(color.value),
                ),
          ),
      ),
    ),
  Timeline: (h: Html.H<M>, { items }: Attrs<"Timeline">) =>
    h.div.class("my-4").children(
      items.map((item, index) =>
        h.div
          .key(String(index))
          .class("flex gap-4 relative")
          .children(
            h.div
              .class("flex flex-col items-center")
              .children(
                h.div
                  .class(
                    "flex items-center justify-center rounded-full bg-muted w-8 h-8 shrink-0 z-10",
                  )
                  .children(h.div.class("w-3 h-3 rounded-full bg-brand")),
                index < items.length - 1 && h.div.class("w-px h-full bg-border mt-2"),
              ),
            h.div
              .class("pb-8")
              .children(
                h.p.class("text-sm font-medium text-muted-foreground mb-1").children(item.date),
                h.h3.class("text-base font-semibold mb-2").children(item.title),
                item.description &&
                  h.p.class("text-muted-foreground text-sm").children(item.description),
              ),
          ),
      ),
    ),
});
