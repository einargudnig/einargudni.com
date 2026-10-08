import { createMiddleware, createStart } from "@tanstack/react-start";
import { env } from "cloudflare:workers";
import { deepDives, posts, work } from "@/.velite";
import { CACHE_HEADERS, SITE_URL, llmsBody } from "@/lib/discovery";

// Replaces the Next middleware.ts. Rather than rewriting to /api/md*, this
// answers directly — on Workers a rewrite would be a second trip through the
// router for a body we already have in hand.
const MARKDOWN_ROUTES: Array<[RegExp, (slug: string) => string | undefined]> = [
  [/^\/blog\/([^/]+)$/, (slug) => posts.find((p) => p.slug === slug && !p.draft)?.body],
  [/^\/deep-dive\/([^/]+)$/, (slug) => deepDives.find((d) => d.slug === slug && !d.draft)?.body],
  [/^\/use-cases\/([^/]+)$/, (slug) => work.find((w) => w.slug === slug && !w.draft)?.body],
];

// Both representations live at one URL, so any shared cache must key on
// Accept or it will hand markdown to a browser (or HTML to an agent).
const VARY = { Vary: "Accept" };

const markdown = (body: string) =>
  new Response(body, {
    headers: { "Content-Type": "text/markdown; charset=utf-8", ...CACHE_HEADERS, ...VARY },
  });

const markdownSource = (pathname: string) => {
  if (pathname === "/") return llmsBody;
  for (const [pattern, lookup] of MARKDOWN_ROUTES) {
    const match = pattern.exec(pathname);
    if (match) return lookup(match[1]);
  }
};

// RFC 8288 Link headers let an agent find the markdown and the site's
// discovery documents from a plain HEAD, without parsing any HTML.
const discoveryLinks = (pathname: string) =>
  [
    `<${SITE_URL}${pathname === "/" ? "/llms.txt" : `${pathname}.md`}>; rel="alternate"; type="text/markdown"`,
    `<${SITE_URL}/llms.txt>; rel="describedby"; type="text/plain"`,
    `<${SITE_URL}/.well-known/api-catalog>; rel="api-catalog"`,
  ].join(", ");

const withHtmlHeaders = (asset: Response, pathname: string) => {
  const response = new Response(asset.body, asset);
  response.headers.append("Vary", "Accept");
  if (markdownSource(pathname)) response.headers.set("Link", discoveryLinks(pathname));
  return response;
};

// Must stay in sync with `assets.run_worker_first` in wrangler.jsonc: those
// are the only paths where the Worker sees the request before the asset
// server, and the only ones this middleware may serve assets for.
const runsWorkerFirst = (pathname: string) =>
  pathname === "/" ||
  pathname.startsWith("/blog/") ||
  pathname.startsWith("/deep-dive/") ||
  pathname.startsWith("/use-cases/");

const notFound = () =>
  new Response("Not found", {
    status: 404,
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });

const markdownNegotiation = createMiddleware().server(async ({ next, request }) => {
  const { pathname } = new URL(request.url);
  // Anything else reaches Start on its own terms — touching the request here
  // would consume the body before a server route could read it.
  // HEAD too: left to next(), a HEAD for markdown reached Start's SSR handler,
  // which 500s on a non-HTML Accept. The runtime drops the body for HEAD.
  const readOnly = request.method === "GET" || request.method === "HEAD";
  if (!readOnly || !runsWorkerFirst(pathname)) return next();

  // `/blog/tmux.md` is the form llms.txt links to: markdown regardless of
  // Accept, for agents that fetch URLs without negotiating.
  if (pathname.endsWith(".md")) {
    const body = markdownSource(pathname.slice(0, -".md".length));
    return body ? markdown(body) : notFound();
  }

  const accept = request.headers.get("accept") ?? "";
  if (!accept.includes("text/markdown")) {
    // Hand back the prerendered HTML rather than re-rendering it.
    const asset = await env.ASSETS.fetch(request);
    return asset.status === 404 ? next() : withHtmlHeaders(asset, pathname);
  }

  const body = markdownSource(pathname);
  if (body) return markdown(body);

  // No MDX source: hand back the prerendered HTML, lenient by design, so an
  // agent that asked for markdown still gets something useful. Never fall
  // through to next(): Start's SSR handler rejects a non-HTML Accept with a
  // 500, which turned every missing or draft slug into a server error.
  const asset = await env.ASSETS.fetch(request);
  return asset.status === 404 ? notFound() : withHtmlHeaders(asset, pathname);
});

export const startInstance = createStart(() => ({
  requestMiddleware: [markdownNegotiation],
}));
