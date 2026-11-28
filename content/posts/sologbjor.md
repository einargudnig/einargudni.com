---
title: "sól og bjór"
slug: sologbjor
date: "2026-06-10"
draft: false
---

Reykjavík gets sun like other cities get snow days. Rarely, suddenly, and
everyone drops what they're doing.

When it happens, the whole city asks the same two questions: where is the sun
actually hitting right now, and where is the beer not 1.800 krónur? Downtown
Reykjavík is a maze of low buildings that throw long shadows even in June, so a
terrace that was glorious at three is in the shade by five. You can be sitting
twenty meters from sunshine and not know it.

So I built [sologbjor.einargudni.com](https://sologbjor.einargudni.com) — a
small app that ranks Reykjavík bars by exactly those two things: most sun and
cheapest beer, right now.

### _the sun is a geometry problem_

The interesting part is figuring out whether the sun is actually hitting a
specific terrace, not just whether it's up.

The sun's position is pure math — [SunCalc](https://github.com/mourner/suncalc)
gives you azimuth and altitude for any coordinate at any moment, accurate to a
fraction of a degree. The hard part is what's in the way. For that I pulled
building footprints and heights from OpenStreetMap and precomputed a 360°
horizon profile for each bar's terrace: for every compass direction, how high
does the skyline reach from that exact spot?

Then the runtime check is almost embarrassingly simple. Where is the sun? Is it
above the skyline in that direction? That's it. No 3D rendering, no ray
casting, no shadow simulation. All the expensive work happens offline in a
script; the app ships a static JSON file and does a lookup.

Clouds get a say too. Open-Meteo provides hourly cloud cover for free, with no
API key, and Reykjavík conveniently lives on UTC year-round so the timestamps
just line up. But I don't apply cloud cover linearly — 50% cloud in Reykjavík
still _feels_ sunny, so the attenuation curve is convex and floored at 0.3.
A geometric model corrected by lived experience.

### _the beer is a data problem_

There's no API for happy hours. I scraped what I could from visitorsguide.is,
which covered about half the bars, and hand-researched the rest — calling on
memory, websites, and one very useful thread on X. The result is a static
`bars.json` with 25 bars, each with price data and happy-hour windows.

Happy hours drift, so a GitHub Actions workflow re-scrapes weekly and commits
the refreshed data straight to main. The data maintains itself, mostly. There's
also a "fix happy hour" button in the app for when it doesn't.

### _static core, thin edge_

My favorite decision in the whole project is what the backend _doesn't_ do.

Everything deterministic — building heights, horizon profiles, bar data — is
precomputed and shipped as static files. The frontend is a Vite React SPA that
weighs 69 KB gzipped and runs entirely client-side: it knows where the sun is,
it knows the skylines, it fetches the weather itself. The only live server code
is a single Hono endpoint on Cloudflare Workers that relays feedback to Slack,
because that's the one thing that needs a secret.

The first version had more ambition: a crowd layer where people could vote on
sun and prices, backed by Turso. I built it, then paused it before launch. Cut
to static, ship, see if anyone cares. The code is still there, dormant, waiting
for users to deserve it.

### _the map_

There's a shade map, because of course there is. MapLibre GL renders the
downtown buildings as 3D extrusions, lit according to the actual sun position,
with the shadow union computed via polygon-clipping so overlapping shadows
don't double-darken.

The map chunk is four times the size of the rest of the app, so it lazy-loads
behind a toggle, and the toggle remembers your choice in localStorage. If you
opened the map last time, the chunk preloads quietly while the browser is idle.

Two bugs from this part earned their place in my notes. First: flat polygon
fills disappear when 3D extrusions are on the map and the camera is pitched —
the depth buffer hides them. The fix is rendering "flat" shapes as extrusions
with near-zero height. Second: React's `lazy()` caches a rejected import
forever, so an error boundary around a lazy chunk must offer _reload_, not
_retry_ — retry will re-throw the same cached rejection until the heat death of
the universe.

### _the stack, plainly_

- **Bun** monorepo, TypeScript everywhere
- **Vite + React** SPA on Cloudflare Pages
- **Hono** on Cloudflare Workers for the one live endpoint
- **SunCalc** for solar position, **OpenStreetMap** for building heights
- **Open-Meteo** for cloud cover
- **MapLibre GL** for the shade map
- **GitHub Actions** for CI and the weekly data refresh

Built in three days, mostly evenings. The trick wasn't the geometry — it was
deleting the backend until only the necessary part remained.

If you're ever in Reykjavík and the sun comes out, you now know where to sit:
[sologbjor.einargudni.com](https://sologbjor.einargudni.com).
