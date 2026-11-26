---
title: "Union destructuring"
date: 2025-11-04
topic: typescript
tags: [typescript, union]
---

### Destructuring Union in TypeScript

It can be hard to work with union in TypeScript.
Especially when destructuring types to do type narrowing.

```ts
type Circle = {
  kind: "circle";
  radius: number;
};

type Square = {
  kind: "square";
  sideLength: number;
};

type Shape = Circle | Square;

function calculateArea({ kind, radius, sideLength }: Shape) {
  if (kind === "circle") {
    return Math.PI * radius * radius;
  } else {
    return sideLength * sideLength;
  }
}
```

This will show typescript errors. TypeScript can only confirm the `kind` property.

Instead we should not destructure it in the function parameters.
We should do it inside the conditional branches:

```ts
function calculateArea(shape: Shape) {
  if (shape.kind === "circle") {
    const { radius } = shape;
    return Math.PI * radius * radius;
  } else {
    const { sideLength } = shape;
    return sideLength * sideLength;
  }
}
```

Destructuring is best used closer to where it's needed.
Here we a see that works, no typescript errors!
