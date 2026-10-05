import mdx from "@mdx-js/rollup";
import remarkFrontmatter from "remark-frontmatter";
import { cloudflare } from "@cloudflare/vite-plugin";
import tailwindcss from "@tailwindcss/vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import react from "@vitejs/plugin-react";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";

// Velite runs before vite in the build script, so its output is on disk here.
// This is the replacement for Next's generateStaticParams: link-crawling alone
// misses any post or deep dive that no index page happens to link to.
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

// Drafts carry {/* CHECK: ... */} notes for facts still to verify. The raw body
// is served verbatim to Accept: text/markdown, so one left behind would publish.
const unchecked = workEntries.filter(({ body }) => body.includes("CHECK:")).map(({ slug }) => slug);
if (unchecked.length > 0) {
  throw new Error(`Unresolved CHECK notes in published case studies: ${unchecked.join(", ")}`);
}

// Next statically generated every file under app/. Link-crawling alone does
// not reach all of these, so the set is declared rather than discovered.
const STATIC_PATHS = [
  "/",
  "/about",
  "/baby",
  "/blog",
  "/chroncal/privacy",
  "/chroncal/terms",
  "/learnings",
  "/notes",
  "/now",
  "/quotes",
  "/referrals",
  "/resolutions",
  "/someday",
  "/tldr/en",
  "/tldr/is",
  "/ts-mini",
  "/uses",
  "/uses/agents",
  "/uses/command-line",
  "/uses/desk",
  "/uses/devices",
  "/uses/infrastructure",
  "/uses/keyboard",
  "/uses/personal-software",
  "/use-cases",
];

const contentPages = [
  ...STATIC_PATHS.map((path) => ({ path })),
  ...slugs("posts").map((slug) => ({ path: `/blog/${slug}` })),
  ...slugs("deepDives").map((slug) => ({ path: `/deep-dive/${slug}` })),
  ...workEntries.map(({ slug }) => ({ path: `/use-cases/${slug}` })),
];

// Crawling is off (see below), so nothing else would catch a case study
// pointing at a post that was renamed or never existed.
const knownPaths = new Set(contentPages.map(({ path }) => path));
const deadLinks = workEntries.flatMap(({ slug, related }) =>
  related.filter((path) => !knownPaths.has(path)).map((path) => `${slug} -> ${path}`),
);
if (deadLinks.length > 0) {
  throw new Error(`Unknown \`related\` paths in content/work:\n  ${deadLinks.join("\n  ")}`);
}

export default defineConfig({
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./", import.meta.url)),
    },
  },
  plugins: [
    cloudflare({ viteEnvironment: { name: "ssr" } }),
    tailwindcss(),
    // MDX compiles to real modules here. Velite's s.mdx() emits a code string
    // that mdx-content used to eval, and workerd forbids `new Function`, so
    // every post silently fell back to client rendering.
    //
    // remark-frontmatter claims the YAML block. Without it the closing `---`
    // reads as a setext underline and the frontmatter renders as an <h2>.
    {
      enforce: "pre",
      ...mdx({ providerImportSource: "@mdx-js/react", remarkPlugins: [remarkFrontmatter] }),
    },
    tanstackStart({
      pages: contentPages,
      prerender: {
        enabled: true,
        // Every page is listed above, so crawling adds nothing but risk: it
        // also follows links inside post content, and one dead link in an MDX
        // file would fail the build.
        crawlLinks: false,
        // Route ids for index routes carry a trailing slash (/about/), so
        // discovery would prerender a second copy of every page at a URL the
        // router otherwise redirects away from.
        autoStaticPathsDiscovery: false,
        // Emit /blog/tmux.html rather than /blog/tmux/index.html. The default
        // makes every non-slash URL 307 to a trailing-slash one, which would
        // invert the canonical shape the sitemap and every inbound link use.
        autoSubfolderIndex: false,
      },
    }),
    react(),
  ],
});
