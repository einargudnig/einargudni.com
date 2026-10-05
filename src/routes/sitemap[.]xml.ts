import { createFileRoute } from "@tanstack/react-router";
import { deepDives, posts, work } from "@/.velite";
import { CACHE_HEADERS, SITE_URL } from "@/lib/discovery";

interface Entry {
  url: string;
  lastModified?: string;
}

// Every static route except /baby, which is a family page: excluding it here
// declines to advertise it, it does not block indexing (that is robots.txt).
const staticPaths: string[] = [
  "/",
  "/about",
  "/blog",
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
  "/uses/command-line",
  "/uses/desk",
  "/uses/devices",
  "/uses/infrastructure",
  "/uses/keyboard",
  "/uses/personal-software",
  "/use-cases",
];

// No lastmod on static pages: the only honest value would be hand-maintained,
// and a build date would claim every page changed on every deploy. Posts and
// deep dives carry a real date from their frontmatter, so they keep theirs.
//
// No changefreq or priority either. Google has ignored both since 2023, and
// inventing values for the crawlers that still read them is noise, not signal.

const entries = (): Entry[] => [
  ...posts
    .filter((post) => !post.draft)
    .map((post) => ({ url: `${SITE_URL}/blog/${post.slug}`, lastModified: post.date })),
  ...deepDives
    .filter((entry) => !entry.draft)
    .map((entry) => ({ url: `${SITE_URL}/deep-dive/${entry.slug}`, lastModified: entry.date })),
  ...work
    .filter((entry) => !entry.draft)
    .map((entry) => ({ url: `${SITE_URL}${entry.permalink}` })),
  ...staticPaths.map((path) => ({ url: `${SITE_URL}${path}` })),
];

const toXml = (list: Entry[]) =>
  [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...list.map(({ url, lastModified }) =>
      [
        "  <url>",
        `    <loc>${url}</loc>`,
        ...(lastModified ? [`    <lastmod>${lastModified}</lastmod>`] : []),
        "  </url>",
      ].join("\n"),
    ),
    "</urlset>",
    "",
  ].join("\n");

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: () =>
        new Response(toXml(entries()), {
          headers: { "Content-Type": "application/xml; charset=utf-8", ...CACHE_HEADERS },
        }),
    },
  },
});
