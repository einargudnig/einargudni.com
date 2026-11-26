import type { View } from "@effect/ui";
import type { Html } from "@effect/ui/html";
import type { ContentIslands } from "./islands.ts";

type Attrs<K extends keyof typeof ContentIslands> = (typeof ContentIslands)[K]["Type"];
type Inner<M> = ReadonlyArray<View.Content<M>>;

// One view per island in ./islands.ts. `islandsFor` refuses a missing one.
export const islandViews = <M>() => ({
  Architecture: (h: Html.H<M>, { nodes, caption }: Attrs<"Architecture">) =>
    h.figure.class("my-8").children(
      h.ol.class("flex flex-col gap-2 md:flex-row").children(
        nodes.map((node, i) =>
          h.li
            .key(String(i))
            .class("flex-1 border-t border-foreground pt-2")
            .children(
              h.p.class("font-medium").children(node.label),
              node.detail ? h.p.class("text-sm text-muted-foreground").children(node.detail) : null,
            ),
        ),
      ),
      caption ? h.figcaption.class("mt-3 text-sm text-muted-foreground").children(caption) : null,
    ),
  Callout: (h: Html.H<M>, { type = "info", title }: Attrs<"Callout">, inner: Inner<M>) =>
    h.aside
      .attr("data-type", type)
      .class("my-6 border-l-2 border-foreground pl-4")
      .children(title ? h.p.class("font-semibold").children(title) : null, inner),
  Blockquote: (h: Html.H<M>, { author, citation }: Attrs<"Blockquote">, inner: Inner<M>) =>
    h.figure.class("my-6").children(
      h.blockquote.class("border-l-2 border-foreground pl-4 italic").children(inner),
      author
        ? h.figcaption
            .class("mt-2 text-sm text-muted-foreground")
            .children(`— ${author}${citation ? `, ${citation}` : ""}`)
        : null,
    ),
  Accordion: (h: Html.H<M>, _: Attrs<"Accordion">, inner: Inner<M>) =>
    h.div.class("my-6 divide-y rounded-lg border").children(inner),
  AccordionItem: (h: Html.H<M>, { title }: Attrs<"AccordionItem">, inner: Inner<M>) =>
    h.details.class("px-4 py-3").children(h.summary.class("cursor-pointer font-medium").children(title), inner),
  StylishList: (h: Html.H<M>, { type = "disc", gap = "normal" }: Attrs<"StylishList">, inner: Inner<M>) =>
    h.div.attr("data-list", type).attr("data-gap", gap).class("stylish-list").children(inner),
  CaptionedImage: (h: Html.H<M>, { src, alt, width, height, caption }: Attrs<"CaptionedImage">) =>
    h.figure.class("my-8").children(
      h.img
        .attr("src", src)
        .attr("alt", alt)
        .attr("loading", "lazy")
        .attr("width", width === undefined ? undefined : String(width))
        .attr("height", height === undefined ? undefined : String(height))
        .class("rounded-md"),
      caption ? h.figcaption.class("mt-2 text-sm text-muted-foreground").children(caption) : null,
    ),
  KeyboardShortcut: (h: Html.H<M>, { keys, description }: Attrs<"KeyboardShortcut">) =>
    h.p.class("my-2 flex items-center gap-2").children(
      keys.map((key, i) => h.kbd.key(String(i)).class("rounded border px-1.5 py-0.5 text-xs").children(key)),
      description ? h.span.class("text-sm text-muted-foreground").children(description) : null,
    ),
  VideoEmbed: (h: Html.H<M>, { src, title, caption }: Attrs<"VideoEmbed">) =>
    h.figure.class("my-8").children(
      h.video.attr("src", src).attr("controls", "").attr("title", title).class("w-full rounded-md"),
      caption ? h.figcaption.class("mt-2 text-sm text-muted-foreground").children(caption) : null,
    ),
  YouTubeEmbed: (h: Html.H<M>, { videoId, title, caption, start }: Attrs<"YouTubeEmbed">) => {
    const id = /(?:v=|youtu\.be\/)([\w-]{11})/.exec(videoId)?.[1] ?? videoId;
    return h.figure.class("my-8").children(
      h.iframe
        .attr("src", `https://www.youtube-nocookie.com/embed/${id}${start ? `?start=${start}` : ""}`)
        .attr("title", title ?? "YouTube video")
        .attr("loading", "lazy")
        .attr("allowfullscreen", "")
        .class("aspect-video w-full rounded-md"),
      caption ? h.figcaption.class("mt-2 text-sm text-muted-foreground").children(caption) : null,
    );
  },
  Tabs: (h: Html.H<M>, { items }: Attrs<"Tabs">) =>
    h.div.class("my-6").children(
      items.map((item, i) =>
        h.details
          .key(String(i))
          .attr("open", i === 0 ? "" : undefined)
          .children(h.summary.children(item.label), h.p.children(item.content)),
      ),
    ),
  TableOfContents: (h: Html.H<M>) => h.nav.attr("aria-label", "Table of contents").class("toc"),
  CardLink: (h: Html.H<M>, { href, title, description, external }: Attrs<"CardLink">) =>
    h.a
      .attr("href", href)
      .attr("target", external === "true" ? "_blank" : undefined)
      .attr("rel", external === "true" ? "noreferrer" : undefined)
      .class("my-6 block border-t border-foreground pt-3")
      .children(
        h.span.class("block font-medium").children(title),
        description ? h.span.class("block text-sm text-muted-foreground").children(description) : null,
      ),
  FileTree: (h: Html.H<M>, { data }: Attrs<"FileTree">) => {
    const tree = (entries: Attrs<"FileTree">["data"]): View.Content<M> =>
      h.ul.class("pl-4 font-mono text-sm").children(
        entries.map((entry, i) =>
          h.li.key(`${entry.name}-${i}`).children(entry.name, entry.children ? tree(entry.children) : null),
        ),
      );
    return h.div.class("my-6 rounded-lg border p-4").children(tree(data));
  },
  ColorSwatch: (h: Html.H<M>, { colors }: Attrs<"ColorSwatch">) =>
    h.ul.class("my-6 grid grid-cols-2 gap-4 sm:grid-cols-4").children(
      colors.map((c, i) =>
        h.li.key(String(i)).children(
          h.div.class("h-12 rounded-md border").style({ background: c.color }),
          c.label ? h.p.class("mt-1 text-sm").children(c.label) : null,
          c.value ? h.p.class("text-xs text-muted-foreground").children(c.value) : null,
        ),
      ),
    ),
  Timeline: (h: Html.H<M>, { items }: Attrs<"Timeline">) =>
    h.ol.class("my-6 border-l pl-4").children(
      items.map((item, i) =>
        h.li.key(String(i)).class("mb-4").children(
          h.p.class("text-sm text-muted-foreground tabular-nums").children(item.date),
          h.p.class("font-medium").children(item.title),
          item.description ? h.p.class("text-sm").children(item.description) : null,
        ),
      ),
    ),
});
