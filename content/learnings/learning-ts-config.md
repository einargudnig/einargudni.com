---
title: "tsconfig extra strictness"
date: 2025-10-11
topic: TypeScript
tags: [typescript]
---

### TypeScript strictness

TypeScript `strict` mode enables a set of stricter type checking options.
However there are additional flags that can help improve code quality, here are
few of them.

:::StylishList{type="disc" gap="loose"}
- `noImplicitReturns`: Ensures all code paths in a function
  explicitly return a value
- `noUnusedLocals`: Flags unused local variables
- `noUnusedPararmetes`: Flags unused function parameters
- `noUncheckedIndexedAccess`: Makes indexed access return `T |
      undefined` instead of `T`
- `exactOptionalPropertyTypes`: Distinguishes between `undefined`
  and missing properties
:::
