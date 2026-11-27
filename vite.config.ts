import { DevToolsVite } from "@effect/ui-devtools/node";
import { plugin as htmlServer } from "@effect/ui/html/HtmlServerVite";
import { Markdown, MarkdownParser } from "@effect/ui/html";
import tailwindcss from "@tailwindcss/vite";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { defineConfig, type Plugin } from "vite";
import { editionScript } from "./lib/edition.ts";
import { tokenize } from "./lib/highlighter.ts";
import { ContentIslands } from "./src/content/islands.ts";
import { STATIC_PATHS } from "./src/static-paths.ts";

// Velite runs before vite in the build script, so its output is on disk here.
const readCollection = <T extends { slug: string }>(collection: string) =>
  JSON.parse(readFileSync(new URL(`./.velite/${collection}.json`, import.meta.url), "utf8")) as T[];

const slugs = (collection: string) => readCollection(collection).map(({ slug }) => slug);

// Unlike posts, unfinished case studies are not published at all: a half-written
// account of client work reads worse than none.
const workEntries = readCollection<{
  slug: string;
  draft: boolean;
  related: string[];
  body: string;
}>("work").filter((entry) => !entry.draft);

// Drafts carry CHECK: notes for facts still to verify. The raw body is served
// verbatim to Accept: text/markdown, so one left behind would publish.
const unchecked = workEntries.filter(({ body }) => body.includes("CHECK:")).map(({ slug }) => slug);
if (unchecked.length > 0) {
  throw new Error(`Unresolved CHECK notes in published case studies: ${unchecked.join(", ")}`);
}

const knownPaths = new Set([
  ...STATIC_PATHS,
  ...slugs("posts").map((slug) => `/blog/${slug}`),
  ...slugs("deepDives").map((slug) => `/deep-dive/${slug}`),
  ...workEntries.map(({ slug }) => `/use-cases/${slug}`),
]);
const deadLinks = workEntries.flatMap(({ slug, related }) =>
  related.filter((path) => !knownPaths.has(path)).map((path) => `${slug} -> ${path}`),
);
if (deadLinks.length > 0) {
  throw new Error(`Unknown \`related\` paths in content/work:\n  ${deadLinks.join("\n  ")}`);
}

// Compiles each content file to `{ document, code }`: the Effect UI document,
// and every code block's highlighted tokens in document order. Highlighting
// here means no page ever ships a highlighter. Frontmatter belongs to velite,
// which reads lists and dates the Effect UI parser deliberately doesn't, so
// it's stripped first. Source outside the island vocabulary fails the build.
const codeBlocks = (blocks: ReadonlyArray<Markdown.Block>): ReadonlyArray<Markdown.CodeBlock> =>
  blocks.flatMap((block) => {
    switch (block._tag) {
      case "CodeBlock":
        return [block];
      case "Blockquote":
      case "Island":
        return codeBlocks(block.blocks);
      case "List":
        return block.items.flatMap((item) => codeBlocks(item.blocks));
      default:
        return [];
    }
  });

const FRONTMATTER = /^---\r?\n([\s\S]*?)\r?\n---\r?\n/;

// A draft case study isn't published (lib/work.ts), but GetContent's glob
// still bundles every content file. In a build its module is an empty document,
// so neither its prose nor its CHECK notes reach dist/client.
const isDraftWork = (id: string, frontmatter: string) =>
  id.includes("/content/work/") && /^draft:\s*true\s*$/m.test(frontmatter);

let building = false;
const content: Plugin = {
  name: "content",
  enforce: "pre",
  configResolved(config) {
    building = config.command === "build";
  },
  async transform(source, id) {
    if (!id.endsWith(".md") || !id.includes("/content/")) return;
    const frontmatter = FRONTMATTER.exec(source)?.[1] ?? "";
    const body = building && isDraftWork(id, frontmatter) ? "" : source.replace(FRONTMATTER, "");
    const document = MarkdownParser.parseMarkdown(body, { islands: ContentIslands });
    const code = await Promise.all(
      codeBlocks(document.blocks).map(({ value, language }) =>
        tokenize(value, language._tag === "Some" ? language.value : undefined),
      ),
    );
    const encoded = { document: Markdown.encodeDocument(document), code };
    return { code: `export default ${JSON.stringify(encoded)};`, map: null };
  },
};

// Prerendered pages can't know today's sun, so the edition is picked by an
// inline script before first paint. The prerender uses the transformed
// index.html as its template, so every page gets it.
const inlineEditionScript: Plugin = {
  name: "inline-edition-script",
  transformIndexHtml: (html) =>
    html.replace("<!--edition-script-->", `<script>${editionScript}</script>`),
};

// Pages read velite's collections through `virtual:content`, which leaves out
// each entry's raw `body`. Importing `@/.velite` from a page would ship every
// post's source to every visitor.
const COLLECTIONS = ["posts", "deepDives", "work", "learnings", "links", "quotes"];
const contentIndex: Plugin = {
  name: "content-index",
  resolveId: (id) => (id === "virtual:content" ? "\0virtual:content" : undefined),
  load(id) {
    if (id !== "\0virtual:content") return;
    return COLLECTIONS.map((name) => {
      const file = fileURLToPath(new URL(`./.velite/${name}.json`, import.meta.url));
      this.addWatchFile(file);
      const entries = (
        JSON.parse(readFileSync(file, "utf8")) as Array<Record<string, unknown>>
      ).map(({ body: _body, ...entry }) => entry);
      return `export const ${name} = ${JSON.stringify(entries)};`;
    }).join("\n");
  },
};

export default defineConfig({
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./", import.meta.url)),
    },
  },
  build: { outDir: "dist/client" },
  plugins: [
    tailwindcss(),
    inlineEditionScript,
    contentIndex,
    content,
    htmlServer({ entry: "/src/entry.server.ts", origin: "https://einargudni.com" }),
    // `vite dev` only: the inspector overlay, and an MCP server agents connect to
    // at http://127.0.0.1:4774/mcp. `dispatch` lets them send messages to the app.
    DevToolsVite.plugin({ dispatch: true }),
  ],
});
