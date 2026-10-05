# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

- **Prospective clients and hiring leads** (CTOs, founders, engineering managers) evaluating Einar as a contractor to build a solution inside an existing system: a product feature, an internal tool, an integration or an AI agent. They arrive cold, usually from a link, and decide within a screen or two whether to read a case study or get in touch.
- **Readers** of his writing: developers who come for a specific post (tmux, keyboards, React Router middleware, RSC) and may stay for more.
- **People who know him** checking what he is up to (/now, projects, health).

## Product Purpose

Einar Gudni's personal site (einargudni.com): a place to share his thinking and to show, in detail, the solutions he has built for systems that already exist. AI agents are a growing share of that work, not the whole of it. Success is a qualified visitor reading a case study and using the contact form, and readers returning for writing.

## Positioning

**A builder of solutions that fit your systems** (user-pinned 2026-10-05). The headline is the solution, not the technology: product engineering, internal tools and integrations, and lately AI agents inside real, running systems (an embedded assistant in Gigover, a self-hosted harness over Maul's production MCP server, verification harnesses, Cowork plugins). Agents are the sharpest current evidence, never the only offer; sometimes the right answer is plain, careful engineering. He writes candidly about the constraints, architecture and what he'd do differently. The site is itself a working example: markdown negotiation, llms.txt, agent-discovery endpoints.

## Operating Context

Software developer at Maul (food delivery, Reykjavík) since 2020 and independent contractor since 2022. Lives in Reykjavík, Iceland. Personal data feeds the site: Whoop recovery/sleep, GitHub activity, a "life-os" store.

## Capabilities and Constraints

- TanStack Start on Cloudflare Workers, fully prerendered; MDX content via Velite.
- Content types: blog posts, deep dives, learnings/notes, links, quotes, use cases (/use-cases; content in content/work/), static pages (about, now, someday, uses, referrals, resolutions).
- Contact form posts to /api/contact (Resend).
- Every page must also work as markdown for agents (Accept: text/markdown).

## Brand Commitments

- Name: Einar Gudni. Identity line "Builder. Curious, tinkerer, late bloomer & nerd." Footer motto "Don't half ass it."
- Visual world is the Almanak (see DESIGN.md): day/night editions by the Reykjavík sun, ruled tables, no accent colour (actions marked by form). It replaced the emerald dark theme and the hand-drawn project icons on the homepage.
- **User-pinned (2026-10-05): keep it minimal.** Anything else, including light vs dark and a complete visual change, is open.

## Evidence on Hand

- Use-case drafts in content/work/: seven client/in-house (Gigover x3, Sterkir pabbar, Maul x3) and four personal tools (life-os, jstop, les, pdl), all `draft: true` with CHECK notes pending.
- Blog posts and deep dives in content/.
- No testimonials, client logos, rates or metrics beyond those in the case studies. Do not invent any.

## Product Principles

1. Show the work, not adjectives about it: outcomes, architecture, honest trade-offs.
2. Writing is a first-class citizen, not a blog tab.
3. Minimal: every element earns its place.
4. Personal, not corporate: the human details (health data, sun times, motto) stay.
5. Builder first: lead with the problem solved, then the technology used.
