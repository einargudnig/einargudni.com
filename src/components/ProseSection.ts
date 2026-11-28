import type { Html } from "@effect/ui/html";

// A titled block of prose on the static pages (About, Now, Chroncal). Chain
// `.children(...)` to add paragraphs after the title.
export const ProseSection = <M>(h: Html.H<M>, title: string) =>
  h.div
    .class("prose prose-neutral dark:prose-invert text-pretty")
    .children(h.p.class("text-brand text-lg font-mono").children(title));

export const ProseParagraph = <M>(h: Html.H<M>) => h.p.class("leading-relaxed max-w-[65ch]");

export const ProseRule = <M>(h: Html.H<M>) => h.div.class("h-px bg-border/50");

export const pageTitle =
  "text-4xl md:text-5xl font-semibold tracking-[-0.04em] leading-[1.05] text-balance";
