---
title: Moving this site to Effect UI
slug: effect-ui
date: 2026-11-27
---

This site used to be TanStack Start and React. It is now built with
[Effect UI](https://ui.effect.website), a UI framework from the Effect team that
is still in public preview. You are reading the result.

The old version had 90 `.tsx` files, 46 file-based routes and 45 MDX posts. It
prerendered every page and served them from a Cloudflare Worker. The new version
does the same job with no React in it at all.

## Why move a site that worked?

The main reason was MDX. Every post was a module that could render any React
component, and the content and the code had grown into each other. I wanted
posts to be content again.

## What a component looks like

There is no JSX. A component declares its props, model and messages as Schemas,
and its view is a function over an `h` builder:

```ts
export const Tabs = Html.component({
  name: "Tabs",
  props: Schema.Struct({
    items: Schema.Array(Schema.Struct({ label: Schema.String, content: Schema.String })),
  }),
  model: Schema.Struct({ active: Schema.String }),
  message: TabsMessage,
}).make({
  init: () => ({ active: "0" }),
  update: (_, { value }) => ({ active: value }),
  view: (h, { active }) => /* h.div.class("my-6").children(...) */,
});
```

If you have written Elm, or used Foldkit, this will look familiar. State lives
in the model, the only way to change it is a message, and side effects are
Commands the runtime runs for you.

The view is a plain function, and TypeScript checks every element and attribute
in it.

## Content without MDX

Posts are Markdown now. Velite still reads the frontmatter, and a small Vite
plugin parses each file into a document and highlights the code blocks with
Shiki at build time, so Shiki never ships to the browser.

The components that used to live inside MDX became directives:

```md
::YouTubeEmbed{videoId="…" title="…"}

:::Callout{type="info"}
Some prose.
:::
```

Each directive is declared once with a Schema for its attributes. A post that
uses a directive nobody declared, or passes the wrong attributes, fails the
build instead of rendering something broken.

## The parts that bit me

The router warned on every bad link. The 404 page is prerendered once, and the
Worker serves it for any unknown path. The router parsed `/blog/nope` as a post
with the slug `nope`, while the page it hydrated had been rendered for the 404
route. I fixed it by making the route accept only slugs that exist, so an
unknown one is a 404 before any page code runs.

Lazy pages lost their HTML on first load. `/baby` is a lazy chunk, and if its
code hadn't loaded when hydration started, the framework swapped the prerendered
page for the loading fallback. Preloading that page's chunk before hydrating
fixed it.

Types sometimes failed far from the cause. A view helper typed loosely enough
made a whole component's requirements `unknown`, and the error showed up in
`entry.client.ts`. Annotating the helper's children with `never` fixed it, but
finding which helper took a while.

## Proving nothing changed

I didn't want a rewrite that looked fine on the pages I clicked through, so I
wrote a parity script. It reads every page in the live sitemap, fetches the same
path from the new build, and compares status, title, description, `og:image`,
the `h1`, the outbound links and how much of the visible text overlaps.

37 of 48 pages match. The 11 that differ are fixes: the `/uses` pages now have
their own titles, and two post excerpts no longer leak JSX.

Every pull request now uploads a preview version of the Worker, and a preview of
the branch it targets, and runs the same comparison between them. A content
change will always show a diff. The point is that I read it before merging.

The tests are a mix of two kinds. One renders every prerendered page on the
server, hydrates it in a fresh document and fails if the client disagrees with
the server. The other is Effect UI's `Story`, which drives a component with
messages and checks which Commands it asked for, without running them:

```ts
s.send(press("g")).expectExact(Wait).keepPending(Wait);
s.send(press("b"));
assert.strictEqual(s.model.display, "blog");
```

That one checks the `g` then `b` shortcut that takes you to the blog. The
chord's timeout is a Command too, so the test holds it pending and resolves it
by hand instead of waiting for a real timer.

## Was it faster?

About the same. On a throttled mobile run in Lighthouse the home page lands at
around 2.0 seconds LCP on both versions, and both score in the high 90s. The new
site ships slightly less JavaScript (191 kB against 204 kB on the home page) and
spends a little more time booting it.

I didn't do this for speed, and it didn't cost any.

## Living on a preview

Effect UI is a preview and its API will change. The site pins one snapshot, and
`bun run bump-effect-ui <sha>` moves it to a newer commit and reruns the build,
the tests, the checks and parity. The package ships its own docs, written for
agents as much as people, and they covered most of what I needed.

In development there is an inspector overlay, and an MCP server that lets an
agent read the component tree and send it messages.
