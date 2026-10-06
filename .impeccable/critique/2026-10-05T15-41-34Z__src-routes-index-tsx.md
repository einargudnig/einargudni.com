---
target: whole einar-os site
total_score: 24
max_score: 32
na_heuristics: 9,10
p0_count: 2
p1_count: 2
timestamp: 2026-10-05T15-41-34Z
slug: src-routes-index-tsx
---

# Critique: einar-os whole site (2026-10-05)

Method: dual-agent (A: design review · B: detector + browser)

## Heuristics (24/32, Good-, 2 n/a: 9 error recovery untested, 10 help n/a for portfolio)

1 Status 3 · 2 Real world 2 (raw YAML on pages, jargon chips) · 3 Control 3 · 4 Consistency 2 (max-w-4xl vs 2xl column jump; post vs case-study headings differ) · 5 Error prevention 2 (drafts/test posts published) · 6 Recognition 3 (/notes orphaned) · 7 Flexibility 3 · 8 Aesthetic 2 (chip walls, 8-section homepage)

## Priority issues

- P0 Frontmatter rendered as visible <h2> on every MDX page in prod (vite.config.ts mdx() has no remark-frontmatter). Pre-existing.
- P0 `prose` is a no-op: @tailwindcss/typography never installed; MDX h2 = 16px/400/0 margin, p margin 0.
- P1 Homepage doesn't choose its audience: offer sentence buried in HireMe at the bottom; hero tagline says nothing about the work; 8 equal-weight sections.
- P1 Unfinished content published: /blog lists draft test posts (blog index doesn't filter draft), stale /now (Jan 2026).
- P2 Stock shadcn neutral palette + one emerald; identity (Whoop rings, icons, life-os) sits under a template. Not too dark; too cold and too flat.

## Detector

CLI: 2 warnings, both false positives (baby violet data color; blockquote border-l-4).
Browser: line-length on full-width card descriptions (/ ~119ch, /work ~96ch), heading-rhythm on case-study h2s (real, same root cause as prose P0), tight-leading on h1>script (false positive, Balancer script).
Contrast: all AA+, muted 7.66:1. No theme toggle exists.

## Minor

Icon-only GitHub/X links lack accessible names; focus ring faint on dark; nested nav; About/Now/Someday row cramped at 390px; "macOs"; "free lance" typo on /about; case study ends with no CTA; /work lists stack not outcomes.
