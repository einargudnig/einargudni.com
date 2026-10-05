import { createMiddleware, createStart } from "@tanstack/react-start";
import { env } from "cloudflare:workers";
import { deepDives, posts, work } from "@/.velite";
import { CACHE_HEADERS, llmsBody } from "@/lib/discovery";

// Replaces the Next middleware.ts. Rather than rewriting to /api/md*, this
// answers directly — on Workers a rewrite would be a second trip through the
// router for a body we already have in hand.
const MARKDOWN_ROUTES: Array<[RegExp, (slug: string) => string | undefined]> = [
  [/^\/blog\/([^/]+)$/, (slug) => posts.find((p) => p.slug === slug && !p.draft)?.body],
  [/^\/deep-dive\/([^/]+)$/, (slug) => deepDives.find((d) => d.slug === slug && !d.draft)?.body],
  [/^\/use-cases\/([^/]+)$/, (slug) => work.find((w) => w.slug === slug && !w.draft)?.body],
];

const markdown = (body: string) =>
  new Response(body, {
    headers: { "Content-Type": "text/markdown; charset=utf-8", ...CACHE_HEADERS },
  });

// Must stay in sync with `assets.run_worker_first` in wrangler.jsonc: those
// are the only paths where the Worker sees the request before the asset
// server, and the only ones this middleware may serve assets for.
const runsWorkerFirst = (pathname: string) =>
  pathname === "/" ||
  pathname.startsWith("/blog/") ||
  pathname.startsWith("/deep-dive/") ||
  pathname.startsWith("/use-cases/");

const markdownNegotiation = createMiddleware().server(async ({ next, request }) => {
  const { pathname } = new URL(request.url);
  // Anything else reaches Start on its own terms — touching the request here
  // would consume the body before a server route could read it.
  if (request.method !== "GET" || !runsWorkerFirst(pathname)) return next();

  const accept = request.headers.get("accept") ?? "";
  if (!accept.includes("text/markdown")) {
    // Hand back the prerendered HTML rather than re-rendering it.
    const asset = await env.ASSETS.fetch(request);
    return asset.status === 404 ? next() : asset;
  }

  if (pathname === "/") return markdown(llmsBody);

  for (const [pattern, lookup] of MARKDOWN_ROUTES) {
    const match = pattern.exec(pathname);
    if (!match) continue;
    const body = lookup(match[1]);
    if (body) return markdown(body);
  }

  // No MDX source: hand back the prerendered HTML, lenient by design, so an
  // agent that asked for markdown still gets something useful. Never fall
  // through to next(): Start's SSR handler rejects a non-HTML Accept with a
  // 500, which turned every missing or draft slug into a server error.
  const asset = await env.ASSETS.fetch(request);
  if (asset.status !== 404) return asset;
  return new Response("Not found", {
    status: 404,
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
});

export const startInstance = createStart(() => ({
  requestMiddleware: [markdownNegotiation],
}));
