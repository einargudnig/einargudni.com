---
title: "React Server Components: A Deep Dive"
slug: react-server-components-deep-dive
date: 2025-10-02
topic: React
tags: [react, nextjs, rsc, streaming]
---

# React Server Components: A Deep Dive

This explainer covers server and client boundaries, flight protocol basics, and streaming.

## Server/Client Boundaries

- Server Components render on the server and can fetch data directly
- Client Components run in the browser; use `"use client"` and can have state/effects

```tsx
// app/page.tsx (Server Component)
import ClientThing from "./client-thing";

export default async function Page() {
  const data = await getData();
  return <ClientThing data={data} />;
}
```

## Streaming

RSC enables incremental delivery of UI which reduces TTFB for data-heavy pages.
