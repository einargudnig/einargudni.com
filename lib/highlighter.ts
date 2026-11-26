import type { HighlighterCore } from "shiki/core";
import { createHighlighterCore } from "shiki/core";
import { createOnigurumaEngine } from "shiki/engine/oniguruma";

/**
 * Importing `codeToHtml` from "shiki" pulls in every bundled grammar — around
 * 200 languages, 11 MB of lazy chunks, for the five this site actually uses.
 * This pins the set instead. Anything not listed falls back to plain text
 * rather than throwing.
 */
export const THEME = "catppuccin-mocha";

// Keys are what a fence or a `language=` prop can say; values are the grammar.
const ALIASES: Record<string, string> = {
  ts: "typescript",
  typescript: "typescript",
  tsx: "tsx",
  js: "javascript",
  javascript: "javascript",
  jsx: "jsx",
  css: "css",
  bash: "bash",
  sh: "bash",
  shell: "bash",
  zsh: "bash",
  json: "json",
};

let highlighter: Promise<HighlighterCore> | undefined;

const getHighlighter = () => {
  highlighter ??= createHighlighterCore({
    themes: [import("@shikijs/themes/catppuccin-mocha")],
    langs: [
      import("@shikijs/langs/typescript"),
      import("@shikijs/langs/tsx"),
      import("@shikijs/langs/javascript"),
      import("@shikijs/langs/jsx"),
      import("@shikijs/langs/css"),
      import("@shikijs/langs/bash"),
      import("@shikijs/langs/json"),
    ],
    engine: createOnigurumaEngine(import("shiki/wasm")),
  });
  return highlighter;
};

/** Resolves to a loaded grammar, or "text" for anything unrecognised. */
export const resolveLang = (lang: string | undefined) =>
  ALIASES[(lang ?? "").toLowerCase()] ?? "text";

export const highlight = async (
  code: string,
  lang: string | undefined,
  options: Parameters<HighlighterCore["codeToHtml"]>[1] extends infer O
    ? Omit<O & object, "lang" | "theme">
    : never,
) => {
  const shiki = await getHighlighter();
  return shiki.codeToHtml(code, {
    ...options,
    lang: resolveLang(lang),
    theme: THEME,
  });
};

export interface Token {
  readonly text: string;
  readonly color: string | undefined;
}

/** Lines of coloured tokens, for views that build their own elements. */
export const tokenize = async (
  code: string,
  lang: string | undefined,
): Promise<ReadonlyArray<ReadonlyArray<Token>>> => {
  const shiki = await getHighlighter();
  return shiki
    .codeToTokensBase(code, { lang: resolveLang(lang), theme: THEME })
    .map((line) => line.map(({ content, color }) => ({ text: content, color })));
};
