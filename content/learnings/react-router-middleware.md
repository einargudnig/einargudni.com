---
title: "react-router middleware"
date: 2025-10-22
topic: react-router
tags: [react-router, middleware]
deepDiveSlug: middleware-rr7
---

### React router middleware

Framework mode has "default" mode and SPA mode. In SPA mode server side
rendering is disabled and genrates `index.html` at build time.

There are difference in these two modes, but let's focus on middleware usage.

**Server Middleware**

Runs on the server for every request. Because it runs on the server it returns
an HTTP Response back up the middleware chain via the `next` function.

Server middleware is disagned such that it prioritzes SPA behavior and doe not
create new network activity by default. Middleware wraps existing requests and only
runs when you need to hit the server.

**Client Middleware**

Runs in the browser for client-side navigation and fetcher calls. It does not
have a Response to bubble up the middleware chain.

Since we are already in the client and are alwasy making a "request" to the router when
navigating. Client middleware will run on every client navigation, regardless of whether
there are `loader`s to run.
