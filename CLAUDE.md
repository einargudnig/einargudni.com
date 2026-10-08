# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a personal website built with TanStack Start (Vite 8, React 19, TanStack Router + Query) on Bun 1.4. Velite processes frontmatter and metadata; MDX compiles to real modules via `@mdx-js/rollup`. It is deployed to Cloudflare Workers.

## Development Commands

```bash
# Dev server (velite --watch alongside vite)
bun run dev

# Build: velite -> OG images -> vite build (includes prerendering)
bun run build

# Preview the built worker locally
bun run preview

# Deploy to Cloudflare Workers
bun run deploy

# Lint (oxlint, warnings fail) + format check (oxfmt) + typecheck (tsc, TypeScript 7)
bun run check

# Format with oxfmt
bun run format
```

## Architecture

### Content Management System

The project uses **Velite** as a content processing pipeline that transforms Markdown/MDX files into type-safe data:

1. **Content Collections** (defined in `velite.config.ts`):
   - `posts` - Blog posts in `content/posts/` directory
   - `learnings` - Short-form learning notes in `content/learnings/`
   - `deepDives` - In-depth technical articles in `content/deep-dives/`

2. **Velite Build Process**:
   - Run explicitly by the `dev` and `build` scripts
   - Validates frontmatter and generates typed output in `.velite/`
   - Creates `@/.velite` module with typed exports for content collections
   - Emits `path` (via `s.path()`) so a route can find the file's compiled module

3. **MDX Content Rendering**:
   - `@mdx-js/rollup` compiles each `.md`/`.mdx` file into a real ES module
   - `components/mdx-content.tsx` resolves it from an `import.meta.glob` map
     keyed by velite's `path`, wrapped in `React.lazy` so Rollup code-splits
     per post and the SSR stream still awaits it
   - Custom components are injected via the `sharedComponents` object
   - Velite's `s.mdx()` is deliberately **not** used: it emits a JS string that
     has to be `eval`'d, and workerd forbids code generation from strings

### Styling and UI

- **Tailwind CSS v4** via `@tailwindcss/vite`
- **Radix UI** primitives for accessible components
- **next-themes** for dark mode support (default: dark theme) — despite the
  name it has no Next dependency and works fine here
- Custom blog components in `components/blog/` for rich content (callouts, code blocks, video embeds, etc.)
- UI components in `components/ui/` follow shadcn/ui patterns

### Code Quality

- **oxlint** for linting and **oxfmt** for formatting (from the oxc project)
- `bun run check` fails on lint warnings and unformatted files; CI
  (`.github/workflows/check.yml`) runs `build` then `check` on every push and PR
- Generated files (`convex/_generated`, `.velite`, `src/routeTree.gen.ts`) are
  excluded from formatting; don't hand-format them
- **TypeScript** with strict mode enabled
- Path alias `@/*` maps to project root

### Application Structure

- **File-based routing** under `src/routes/`, route tree generated into
  `src/routeTree.gen.ts` (gitignored)
- **Route Structure**:
  - `/` - Homepage with work experience and latest post
  - `/blog` - List of all blog posts
  - `/blog/$slug` - Individual blog posts (prerendered)
  - `/deep-dive/$slug` - In-depth articles (prerendered)
  - `/learnings` - Learning notes collection
  - `/notes` - Notes page
  - `/about`, `/now`, `/someday` - Static pages
  - `/uses/*` - Tech stack and setup pages
  - `/api/*` and `/.well-known/*` - server routes (agent discovery, contact,
    markdown source). The `[.]` in a filename escapes a literal dot, so
    `src/routes/[.]well-known/api-catalog.ts` serves `/.well-known/api-catalog`.

- **Layout Hierarchy**:
  - `src/routes/__root.tsx` provides the document shell, navbar and theme provider
  - `src/routes/uses/route.tsx` is a layout route wrapping the `/uses` section
  - `src/start.ts` holds global request middleware (`Accept: text/markdown`
    content negotiation)

### Dynamic Pages

Blog posts and deep dives use:

- An explicit `pages` list in `vite.config.ts`, built from the velite output.
  This replaces `generateStaticParams()`. Link-crawling is deliberately off:
  it misses unlinked entries and fails the build on dead links inside content.
- Content fetched from Velite-processed collections
- MDX rendered via `<MDXContent path={post.path} />` component

## Important Implementation Details

### Adding New Blog Posts

1. Create `.mdx` file in appropriate directory:
   - `content/posts/` for blog posts
   - `content/learnings/` for learning notes
   - `content/deep-dives/` for technical deep dives

2. Include required frontmatter:
   - Posts: `title`, `slug`, `date`, `draft` (optional)
   - Learnings: `title`, `date`, `topic`, `link` (optional), `tags` (optional)
   - Deep Dives: `title`, `slug`, `date`, `topic` (optional), `tags` (optional), `draft` (optional)

3. Velite automatically processes on next dev/build

### Custom MDX Components

To add new custom components for use in MDX:

1. Create component in `components/blog/`
2. Import and add to `sharedComponents` object in `components/mdx-content.tsx`
3. Component will be available in all MDX files

### Type Safety with Velite

- Velite generates TypeScript types in `.velite/index.d.ts`
- Import collections: `import { posts, learnings, deepDives } from '@/.velite'`
- All content is fully typed with metadata, slugs, dates, etc.

## Deployment Notes

- Deployed to Cloudflare Workers (`wrangler.jsonc`, `bun run deploy`)
- All 35 pages are prerendered to `dist/client` and served by the assets binding
- `assets.run_worker_first` covers `/`, `/blog/*` and `/deep-dive/*` so the
  markdown-negotiation middleware sees those requests. Anything matching runs
  the Worker first, and `src/start.ts` hands non-markdown requests straight
  back to `env.ASSETS` — keep that list and the middleware's matcher in sync.
- `autoSubfolderIndex: false` keeps canonical URLs slash-free (`/blog/tmux`,
  not `/blog/tmux/`), matching the sitemap and existing inbound links
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
| `VITE_CONVEX_URL` | `/baby` renders without live vote data                                                                                                        |
| `VITE_CF_IMAGES`  | Images served untransformed. Set to `1` **only after** enabling Image Transformations on the zone, otherwise every `/cdn-cgi/image/` URL 404s |

**Runtime** (Worker secrets — `wrangler secret put NAME`):

| Variable                                 | Effect if missing                                                             |
| ---------------------------------------- | ----------------------------------------------------------------------------- |
| `RESEND_API_KEY`                         | Contact form returns 503 with a "email me directly" message                   |
| `LIFEOS_API_URL`, `LIFEOS_WEB_TOKEN`     | Whoop numbers fall back to the committed snapshot in `data/whoop/latest.json` |
| `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL` | Defaults in `src/routes/api/contact.ts` are used                              |

Every one of these degrades gracefully; none will fail a build or a request.

## Agent skills

### Issue tracker

Issues live in GitHub Issues at `einargudnig/einar-os` via the `gh` CLI. See `docs/agents/issue-tracker.md`.

### Triage labels

Default canonical labels (`needs-triage`, `needs-info`, `ready-for-agent`, `ready-for-human`, `wontfix`). See `docs/agents/triage-labels.md`.

### Domain docs

Single-context: `CONTEXT.md` + `docs/adr/` at the repo root. See `docs/agents/domain.md`.
