# einar-os

My personal site — [einargudni.com](https://einargudni.com).

Bun 1.4 + Vite 8 + [TanStack Start](https://tanstack.com/start) (Router and
Query) on React 19, deployed to Cloudflare Workers. Content is Markdown and MDX
processed by [Velite](https://velite.js.org); styling is Tailwind v4 with Radix
primitives.

## Getting started

```bash
bun install
bun run dev      # velite --watch alongside vite, on http://localhost:5173
```

| Script            | What it does                                              |
| ----------------- | --------------------------------------------------------- |
| `bun run dev`     | Dev server, with velite watching `content/`               |
| `bun run build`   | velite → OG images → `vite build` (prerenders every page) |
| `bun run preview` | Serve the built worker locally                            |
| `bun run deploy`  | Build, then `wrangler deploy`                             |
| `bun run check`   | oxlint + `tsc --noEmit`                                   |
| `bun run format`  | oxfmt                                                     |

## How it fits together

**Content.** Each directory under `content/` is a collection, validated by
`velite.config.ts` into typed data under `.velite/` and importable as
`@/.velite`:

| Directory             | Rendered at                      |
| --------------------- | -------------------------------- |
| `content/posts/`      | `/blog`, `/blog/$slug`           |
| `content/deep-dives/` | `/deep-dive/$slug`               |
| `content/work/`       | `/use-cases`, `/use-cases/$slug` |
| `content/learnings/`  | `/learnings`, `/notes`           |
| `content/links/`      | `/notes`                         |
| `content/quotes/`     | `/quotes`                        |

Velite runs at build time, so `.velite/` has to
exist before `vite build` — both `dev` and `build` invoke it.

MDX compiles to real ES modules via `@mdx-js/rollup`, and `components/mdx-content.tsx`
resolves each one from an `import.meta.glob` map keyed by velite's `path`.
Velite's own `s.mdx()` is deliberately unused: it emits a JS string that has to
be `eval`'d, and workerd forbids code generation from strings.

**Routing.** File-based under `src/routes/`, with the route tree generated into
`src/routeTree.gen.ts` (gitignored). `src/routes/__root.tsx` holds the document
shell; `src/start.ts` holds request middleware for `Accept: text/markdown`
content negotiation. A `[.]` in a filename escapes a literal dot, so
`src/routes/[.]well-known/api-catalog.ts` serves `/.well-known/api-catalog`.

**Prerendering.** Every page is listed explicitly in `vite.config.ts` rather
than crawled. Link-crawling misses unlinked entries and fails the build on a
dead link inside post content. Adding a static route means adding its path to
`STATIC_PATHS` there.

**OG images** are generated at build time by `scripts/generate-og.mjs` (satori +
resvg) into `public/og/`. They can't be made per-request: `@resvg/resvg-js` is a
native addon that won't load in workerd.

## Deployment

Cloudflare Workers, configured in `wrangler.jsonc`. Pages prerender to
`dist/client` and are served by the assets binding. `assets.run_worker_first`
covers `/`, `/blog/*`, `/deep-dive/*` and `/use-cases/*` so the markdown-negotiation middleware
sees those requests — keep that list and the matcher in `src/start.ts` in sync.

`autoSubfolderIndex: false` keeps URLs slash-free (`/blog/tmux`, not
`/blog/tmux/`), matching the sitemap and existing inbound links.

DNS lives in `infra/` — `DNS-CUTOVER.md` is the runbook, `einargudni.com.zone`
the importable record set, and `scripts/verify-dns.sh` checks the zone before or
after a nameserver flip.

## Environment variables

Two kinds, set in different places. Every one degrades gracefully — none will
fail a build or a request.

**Build-time** (`VITE_`-prefixed, inlined into the bundle, so they must be set
when `vite build` runs):

| Variable          | If missing                                                                                                                         |
| ----------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| `VITE_CONVEX_URL` | `/baby` renders without live vote data                                                                                             |
| `VITE_CF_IMAGES`  | Images served untransformed. Set to `1` only after enabling Image Transformations on the zone, or every `/cdn-cgi/image/` URL 404s |

**Runtime** (Worker secrets — `wrangler secret put NAME`; locally, `.env` from
`.env.example`, or `.dev.vars`, which wins when both exist):

| Variable                             | If missing                                           |
| ------------------------------------ | ---------------------------------------------------- |
| `RESEND_API_KEY`                     | Contact form returns 503 pointing at the mailto link |
| `LIFEOS_API_URL`, `LIFEOS_WEB_TOKEN` | Whoop numbers fall back to `data/whoop/latest.json`  |
| `CONTACT_TO_EMAIL`                   | Defaults to `einargudnig@gmail.com`                  |
| `CONTACT_FROM_EMAIL`                 | Defaults to `onboarding@resend.dev`                  |

The contact form on the home page posts to `src/routes/api/contact.ts`, which
relays over [Resend](https://resend.com). Resend's default sender only delivers
to the address owning the account, which is enough to receive enquiries; verify
a domain and point `CONTACT_FROM_EMAIL` at it for real deliverability.
