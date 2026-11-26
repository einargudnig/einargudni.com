---
title: "CSS Variables In-Depth"
slug: css-variables-in-depth
date: 2025-09-25
topic: CSS
tags: [css, theming]
---

# CSS Variables In-Depth

Covers scoping, fallbacks, cascading behavior, performance, and dynamic themes.

## Cascading and Fallbacks

`var(--token, fallback)` allows safe usage across themes and component scopes.

```css
:root { --brand: oklch(70% 0.2 260) }
.card { background: var(--brand, rebeccapurple) }
```
