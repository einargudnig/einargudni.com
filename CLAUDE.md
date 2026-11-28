# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a personal website built with Effect UI (`@effect/ui`, pinned snapshot
vendored in `vendor/`) and Effect 4 on Bun, built with Vite 8. Velite processes
frontmatter and metadata; a Vite plugin compiles each content file to a parsed
Markdown document. Every page is prerendered and served by a Cloudflare Worker.

Effect UI ships its own docs in `node_modules/@effect/ui/CLAUDE.md` and
`ai-docs/`. Read them before guessing at an API: it is a public preview and
nothing about it is in training data.

## Development Commands

```bash
# Dev server (velite --watch alongside vite)
bun run dev

# Build: velite -> OG images -> vite build (client, server, prerender)
bun run build

# Serve the built site through the real Worker (wrangler dev)
bun run preview

# Deploy to Cloudflare Workers
bun run deploy

# Lint (oxlint, warnings fail) + format check (oxfmt) + typecheck (tsc)
bun run check

# Format with oxfmt
bun run format

# Compare every sitemap page of a local build against the live site
bun scripts/parity.ts [base] [reference]
```

## Architecture

### Effect UI in one paragraph

Components are `Html.component({ name, props, model, message, queries }).make({
init, update, view, head, subscriptions })`. Views are pure functions over the
`h` builder (`h.div.class("…").children(…)`), not JSX. Side effects are
Commands and Subscriptions; data comes from `Query.Service` queries. A page
that needs domain Layers provides them in its own file with
`Component.provide` and also exports the unprovided `…NoDeps` version.
`tsconfig.json` must keep `exactOptionalPropertyTypes`: without it component
types infer too widely and mounting fails to typecheck.

### Content

1. **Collections** (`velite.config.ts`): `posts`, `learnings`, `deepDives`,
   `work`, `links`, `quotes`. Only `.md` files are read.
2. **Metadata**: Velite writes typed output to `.velite/`. The client never
   imports it directly: `virtual:content` (a plugin in `vite.config.ts`)
   serves the same collections without `body`, so raw bodies stay out of the
   bundle. Server-only code (`src/entry.server.ts`, `src/server/`) may import
   `@/.velite`.
3. **Bodies**: the `content` plugin in `vite.config.ts` turns each
   `content/**/*.md` into a module exporting `{ document, code }`: the parsed
   Markdown document and Shiki tokens for each code block, highlighted at
   build time so Shiki never reaches the browser.
   `src/queries/GetContent.ts` loads that module through `import.meta.glob`,
   one chunk per entry.
4. **Rendering**: `src/content/ContentView.ts` renders a document with the
   site's element styles. Islands (components inside prose) are declared with
   their attribute Schemas in `src/content/islands.ts` and rendered by
   `src/content/island-views.ts`; the stateful ones live in
   `src/content/islands/`.

### Writing content

Content is Markdown with directives, not MDX. The parser rejects raw HTML,
inline directives, reference links, footnotes and task lists, and frontmatter
must be flat strings.

- Leaf island: `::YouTubeEmbed{videoId="…" title="…"}`
- Container island: `:::Callout{type="info"}` … `:::`. Nest with more colons
  on the outer one (`::::Accordion` around `:::AccordionItem`).
- Attributes are strings. Structured ones are JSON in single quotes:
  `::Tabs{items='[{"label":"A","content":"…"}]'}`.

Required frontmatter:

- Posts: `title`, `slug`, `date`, `description` (optional, the dek under the title), `draft` (optional)
- Learnings: `title`, `date`, `topic`, `link` (optional), `tags` (optional)
- Deep Dives: `title`, `slug`, `date`, `description` (optional), `topic` (optional), `tags` (optional), `draft` (optional)

### Adding an island

1. Add its attribute Schema to `ContentIslands` in `src/content/islands.ts`.
2. Add its view to `islandViews` in `src/content/island-views.ts`
   (`islandsFor` refuses a missing one). A stateful island is a component in
   `src/content/islands/`.
3. Keep view helpers free of service requirements: constrain children with
   `View.Children<M, never>`. `IslandRequirements` reads an `any` or a bare
   `Text` member as `unknown`, which surfaces as a type error in
   `src/entry.client.ts`, far from the cause.

### Application structure

- `src/routes.ts`: every route as a typed `AppRoute` union.
- `src/App.ts`: the root component. It holds the route in its Model, maps each
  route to a page, and renders the masthead, footer and site-wide widgets.
  `/baby` and `/ts-mini` are `Component.lazy` chunks; everything else is
  eager, because a lazy page replaces its prerendered HTML with the fallback
  until its chunk loads.
- `src/pages/`: one file per route, folders mirroring the URL.
- `src/components/`: shared components and view functions.
- `src/entry.client.ts`: hydrates the prerendered HTML with `BrowserRouter`.
- `src/entry.server.ts`: the render entry and the list of paths to prerender.
- `src/worker.ts`: the Worker. Agent-discovery endpoints
  (`src/server/endpoints.ts`), then markdown negotiation (`lib/negotiation.ts`),
  then the assets binding; unknown paths get the prerendered 404 page.
- `src/static-paths.ts`: the static paths, listed and unlisted, shared by the
  prerender and the sitemap.

### Styling

- Tailwind CSS v4 via `@tailwindcss/vite`; `src/styles.css`.
- Day and night editions follow the Reykjavík sun (`lib/edition.ts`,
  `lib/sun.ts`). An inline script in `index.html` sets the edition before
  first paint.
- Icons are lucide's vanilla `IconNode`s drawn by `src/components/Icon.ts`.

### Code quality

- **oxlint** for linting and **oxfmt** for formatting (from the oxc project)
- `bun run check` fails on lint warnings and unformatted files; CI
  (`.github/workflows/check.yml`) runs `build` then `check` on every push and PR
- Generated files (`convex/_generated`, `.velite`) are excluded from
  formatting; don't hand-format them
- **TypeScript** strict, with `exactOptionalPropertyTypes`
- Path alias `@/*` maps to project root; `#components/*`, `#content/*` and
  `#pages/*` are subpath imports in `package.json`

## Deployment Notes

- Deployed to Cloudflare Workers (`wrangler.jsonc`, `bun run deploy`)
- `.github/workflows/daily-snapshot.yml` deploys once a day after refreshing the life-os
  snapshot (08:30 UTC, after Whoop publishes the night's recovery). `bun run deploy` by hand
  still works and is what you use for a content change.
- Every page is prerendered to `dist/client/<path>.html` and served by the
  assets binding
- `assets.run_worker_first` covers `/`, `/blog/*`, `/deep-dive/*` and
  `/use-cases/*` so markdown negotiation sees those requests. `src/worker.ts`
  hands non-markdown requests straight back to `env.ASSETS` — keep that list
  and `lib/negotiation.ts` in sync.
- `html_handling: "auto-trailing-slash"` serves `/blog/tmux` from
  `blog/tmux.html`, keeping canonical URLs slash-free, matching the sitemap
  and existing inbound links
- OG images are generated at build time by `scripts/generate-og.mjs`
  (satori + resvg) into `public/og/`. They cannot be generated at request time
  because `@resvg/resvg-js` is a native addon that will not load in workerd.
- Velite runs at build time, so `.velite/` must be generated before deployment

### Domains

Canonical host is the bare apex `einargudni.com`; `www` 301s to it via a
Cloudflare Redirect Rule. `SITE_URL` in `lib/discovery.ts` is the single source
of truth and must stay apex-form — the sitemap, OG tags and `llms.txt` all
derive from it.

The zone also carries `posture` and `nido` (still on Vercel until migrated) and
`sologbjor` (Cloudflare Pages). There is deliberately **no wildcard**: each
subdomain gets an explicit record, because they are separate projects that
resolve to different targets.

- `infra/DNS-CUTOVER.md` — the cutover runbook: phases, gates and rollback.
- `infra/einargudni.com.zone` — importable record set (Cloudflare DNS > Import).
  Proxy status is not expressible in a zone file: `posture` and `nido` must be
  grey-clouded so Vercel keeps terminating their TLS.
- `scripts/verify-dns.sh [nameserver]` — pass a Cloudflare nameserver to check
  the zone before flipping NS; pass nothing to check the live site after.

Worker Custom Domains require the zone to be active in the same Cloudflare
account, which is why the zone moves before any app does.

### Environment variables

Two kinds, and they are set in different places:

**Build-time** (`VITE_`-prefixed, inlined into the bundle — must be present
when `vite build` runs, not at request time):

| Variable          | Effect if missing                                                                                                                             |
| ----------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| `VITE_CONVEX_URL` | `/baby` shows its countdown, but the vote totals spin and voting fails                                                                        |
| `VITE_CF_IMAGES`  | Images served untransformed. Set to `1` **only after** enabling Image Transformations on the zone, otherwise every `/cdn-cgi/image/` URL 404s |

**Runtime** (Worker secrets — `wrangler secret put NAME`): none. The Worker holds no
credentials and makes no outbound data calls; the Whoop numbers are a committed file.

**CI only** (GitHub repository variables and secrets, read by
`.github/workflows/daily-snapshot.yml` — never by the Worker):

| Name                    | Kind     | What it is                                      |
| ----------------------- | -------- | ----------------------------------------------- |
| `LIFEOS_API_URL`        | variable | life-os edge Worker base URL, no trailing slash |
| `LIFEOS_WEB_TOKEN`      | secret   | read key life-os issues for this site           |
| `CLOUDFLARE_API_TOKEN`  | secret   | Workers edit permission, for the daily deploy   |
| `CLOUDFLARE_ACCOUNT_ID` | variable | the `einargudni` account                        |

Every one of these degrades gracefully; none will fail a build or a request.

### Whoop data: once a day, baked in

`data/whoop/latest.json` and `data/life-os-overview.json` are the site's only data files.
They are rendered at build time, so `/` ships the numbers inside the prerendered HTML: no
client fetch, no loading state, no runtime dependency. `scripts/refresh-life-os.ts` pulls
both from the life-os edge API (`/v1/portfolio/{whoop,overview}`), and the daily workflow
rebuilds, deploys, then commits them.

The rules that make it safe to leave unattended:

- The script refuses to write an older `date` than what is committed, and refuses a reading
  more than three days old — a lagging replica fails the job instead of quietly replacing
  good numbers with older ones.
- `WhoopStats` prints "N days old, sync is behind" when the committed snapshot lags. The old
  pipeline died in the `einar-os` → `einargudni.com` rename and the site showed a five-week-old
  score that looked normal; the label is there so that cannot happen silently again.
- Deploy runs before the commit: a failed deploy leaves the repo unchanged and the next run
  retries, rather than recording a refresh the live site never received.

The derivation itself lives in life-os (`src/data/portfolio.ts`) and is shared with the
endpoint, so this repo contains no Whoop arithmetic — only the shape in `lib/whoop.ts`.

## Agent skills

### Issue tracker

Issues live in GitHub Issues at `einargudnig/einargudni.com` via the `gh` CLI. See `docs/agents/issue-tracker.md`.

### Triage labels

Default canonical labels (`needs-triage`, `needs-info`, `ready-for-agent`, `ready-for-human`, `wontfix`). See `docs/agents/triage-labels.md`.

### Domain docs

Single-context: `CONTEXT.md` + `docs/adr/` at the repo root. See `docs/agents/domain.md`.
