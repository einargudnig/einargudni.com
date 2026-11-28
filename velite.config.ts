import { defineConfig, s } from "velite";

// About the first 260 characters of an entry's prose, cut at a word, for its
// meta description and its line on /blog. Built from the raw source rather
// than with s.excerpt(): island directives (`::CaptionedImage{...}`) are
// markup, not prose, and s.excerpt() printed them. Headings are left out, so
// an entry that opens with one starts at its first sentence.
const EXCERPT_LENGTH = 260;
const clip = (text: string) =>
  text.length <= EXCERPT_LENGTH
    ? text
    : `${text.slice(0, text.lastIndexOf(" ", EXCERPT_LENGTH)).replace(/[\s,;:.]+$/, "")}…`;
const excerptOf = (body: string) =>
  clip(
    body
      .replace(/^```[\s\S]*?^```[^\n]*$/gm, "")
      .replace(/^(:{3,})[^\n]*\n[\s\S]*?^\1\s*$/gm, "")
      .split(/\n{2,}/)
      .filter((block) => !/^\s*(:{2,}|```|<|#{1,6}\s)/.test(block))
      .map((block) => block.replace(/!?\[([^\]]*)\]\([^)]*\)/g, "$1").replace(/[*_`~]/g, ""))
      .join(" ")
      .replace(/\s+/g, " ")
      .trim(),
  );

// `s` is extended from Zod with some custom schemas,
// you can also import re-exported `z` from `velite` if you don't need these extension schemas.

export default defineConfig({
  collections: {
    posts: {
      name: "Post", // collection type name
      pattern: "posts/**/*.md",
      schema: s
        .object({
          title: s.string().max(99), // Zod primitive type
          slug: s.slug("posts"), // validate format, unique in posts collection
          // A one-sentence dek under the title, and the meta description.
          description: s.string().max(300).optional(),
          image: s.image().optional(),
          date: s.isodate(), // input Date-like string, output ISO Date string.
          // cover: s.image().optional(), // input image relative path, output image object with blurImage.
          metadata: s.metadata(), // extract markdown reading-time, word-count, etc.
          draft: s.boolean().optional().default(false),
          path: s.path(), // used to resolve the compiled MDX module
          body: s.raw(), // raw markdown body (served via Accept: text/markdown)
        })
        .transform((data) => ({
          ...data,
          excerpt: excerptOf(data.body),
          permalink: `/blog/${data.slug}`,
        })),
    },
    // collection for learnings
    learnings: {
      name: "Learning",
      pattern: "learnings/**/*.md",
      schema: s
        .object({
          title: s.string().max(99),
          date: s.isodate(),
          topic: s.string().max(50),
          link: s.string().optional(),
          tags: s.array(s.string()).optional(),
          deepDiveSlug: s.slug().optional(),
          path: s.path(),
          metadata: s.metadata(),
        })
        .transform((data) => ({ ...data })),
    },

    // collection for deep dives
    deepDives: {
      name: "DeepDive",
      pattern: "deep-dives/**/*.md",
      schema: s
        .object({
          title: s.string().max(120),
          slug: s.slug("deep-dives"),
          description: s.string().max(300).optional(),
          date: s.isodate(),
          topic: s.string().max(50).optional(),
          tags: s.array(s.string()).optional(),
          metadata: s.metadata(),
          draft: s.boolean().optional().default(false),
          path: s.path(),
          body: s.raw(), // raw markdown body (served via Accept: text/markdown)
        })
        .transform((data) => ({
          ...data,
          excerpt: excerptOf(data.body),
          permalink: `/deep-dive/${data.slug}`,
        })),
    },

    // collection for use cases: freelance, in-house and personal work, served at /use-cases
    work: {
      name: "Work",
      pattern: "work/**/*.md",
      schema: s
        .object({
          title: s.string().max(120),
          slug: s.slug("work"),
          client: s.string().max(60),
          clientUrl: s.string().url().optional(),
          engagement: s.enum(["freelance", "in-house", "personal"]),
          kind: s.enum(["agent", "product", "web"]),
          role: s.string().max(80),
          start: s.isodate(),
          end: s.isodate().optional(), // omitted while ongoing
          stack: s.array(s.string()),
          summary: s.string().max(220),
          outcome: s.string().max(220),
          // Site paths (/blog/x, /deep-dive/y); vite.config.ts fails the build on unknown ones
          related: s.array(s.string()).default([]),
          featured: s.boolean().default(false),
          draft: s.boolean().optional().default(false),
          metadata: s.metadata(),
          path: s.path(),
          body: s.raw(),
        })
        .transform((data) => ({ ...data, permalink: `/use-cases/${data.slug}` })),
    },

    // collection for shared links / bookmarks
    links: {
      name: "Link",
      pattern: "links/**/*.md",
      schema: s
        .object({
          title: s.string().max(120),
          url: s.string(),
          description: s.string().max(300),
          date: s.isodate(),
          tags: s.array(s.string()).optional(),
        })
        .transform((data) => ({ ...data })),
    },

    // collection for quotes
    quotes: {
      name: "Quote",
      pattern: "quotes/**/*.md",
      schema: s.object({
        text: s.string().max(500),
        author: s.string().max(100),
        source: s.string().optional(),
        date: s.isodate(),
        path: s.path(),
        metadata: s.metadata(),
      }),
    },
  },
});
