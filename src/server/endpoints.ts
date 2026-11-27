import { deepDives, posts, work } from "@/.velite";
import {
  agentSkills,
  apiCatalog,
  CACHE_HEADERS,
  llmsBody,
  mcpServerCard,
  oauthAuthorizationServer,
  oauthProtectedResource,
  SITE_URL,
} from "@/lib/discovery";
import { LISTED_PATHS } from "../static-paths.ts";

// The non-page routes. Each is published at an /api/* path and, where an RFC
// fixes one, its /.well-known/* path too.

const json = (body: unknown) => Response.json(body, { headers: CACHE_HEADERS });

const text = (body: string, type: string) =>
  new Response(body, { headers: { "Content-Type": `${type}; charset=utf-8`, ...CACHE_HEADERS } });

const linkset = () =>
  new Response(JSON.stringify(apiCatalog()), {
    headers: { "Content-Type": "application/linkset+json", ...CACHE_HEADERS },
  });

const robots = [
  "# Content Signals — https://contentsignals.org/",
  "# Opt-in to AI training, RAG/agent retrieval, and search indexing.",
  "Content-Signal: ai-train=yes, search=yes, ai-input=yes",
  "",
  "User-agent: *",
  "Allow: /",
  "",
  `Sitemap: ${SITE_URL}/sitemap.xml`,
  `Host: ${SITE_URL}`,
  "",
].join("\n");

// No lastmod on static pages: the only honest value would be hand-maintained,
// and a build date would claim every page changed on every deploy. Posts and
// deep dives carry a real date from their frontmatter, so they keep theirs.
// No changefreq or priority either: Google has ignored both since 2023.
const sitemap = () => {
  const entries = [
    ...posts
      .filter((p) => !p.draft)
      .map((p) => ({ url: `${SITE_URL}/blog/${p.slug}`, lastModified: p.date })),
    ...deepDives
      .filter((d) => !d.draft)
      .map((d) => ({ url: `${SITE_URL}/deep-dive/${d.slug}`, lastModified: d.date })),
    ...work
      .filter((w) => !w.draft)
      .map((w) => ({ url: `${SITE_URL}${w.permalink}`, lastModified: undefined })),
    ...LISTED_PATHS.map((path) => ({ url: `${SITE_URL}${path}`, lastModified: undefined })),
  ];
  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...entries.map(({ url, lastModified }) =>
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
};

const ENDPOINTS: Record<string, () => Response> = {
  "/robots.txt": () => text(robots, "text/plain"),
  "/sitemap.xml": () => text(sitemap(), "application/xml"),
  "/llms.txt": () => text(llmsBody, "text/plain"),
  "/api/md-root": () => text(llmsBody, "text/markdown"),
  "/api/api-catalog": linkset,
  "/.well-known/api-catalog": linkset,
  "/api/agent-skills": () => json(agentSkills()),
  "/.well-known/agent-skills/index.json": () => json(agentSkills()),
  "/api/mcp-server-card": () => json(mcpServerCard()),
  "/.well-known/mcp/server-card.json": () => json(mcpServerCard()),
  "/api/oauth-authorization-server": () => json(oauthAuthorizationServer()),
  "/.well-known/oauth-authorization-server": () => json(oauthAuthorizationServer()),
  "/.well-known/openid-configuration": () => json(oauthAuthorizationServer()),
  "/api/oauth-protected-resource": () => json(oauthProtectedResource()),
  "/.well-known/oauth-protected-resource": () => json(oauthProtectedResource()),
};

const SOURCES: Record<string, (slug: string) => string | undefined> = {
  blog: (slug) => posts.find((p) => p.slug === slug && !p.draft)?.body,
  "deep-dive": (slug) => deepDives.find((d) => d.slug === slug && !d.draft)?.body,
  "use-cases": (slug) => work.find((w) => w.slug === slug && !w.draft)?.body,
};

const markdownSource = (pathname: string) => {
  const [type, slug] = pathname.slice("/api/md/".length).split("/");
  const body = type && slug ? SOURCES[type]?.(slug) : undefined;
  return body
    ? new Response(body, { headers: { "Content-Type": "text/markdown; charset=utf-8" } })
    : new Response("Not found", { status: 404 });
};

export const endpoint = (pathname: string): Response | undefined => {
  if (pathname.startsWith("/api/md/")) return markdownSource(pathname);
  return ENDPOINTS[pathname]?.();
};
