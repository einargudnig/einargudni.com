---
title: "Middleware - React router"
slug: middleware-rr7
date: 2025-12-20
topic: React
tags: [react, react-router, middleware]
draft: false
---

### Middleware in general

Middleware is a pattern that acts a layer between different parts of an
application, processing requests and responses as they flow through the system.

Middleware typically has access to the **request**
and **response** objects as long as the **next** function.

Each middleware can execute code, modify request/response objects, end the
request-response cycle or call the next middleware.

Common use cases for middleware: Authentication, logging, error handling,
CORS, validation and more.

**Key advantage is you can use middleware, remove, or reorder them without
modifying the core logic.**

### React router middleware

Middleware runs in a nested chain, executing from parent to child routes on the
way "down" to your route handlers, then from your child routes back to parent
routes on the way "up" after a response is generated.

```
- Root middleware start
  - Parent middleware start
    - Child middleware start
      - Run loaders, generate HTML Response
    - Child middleware end
  - Parent middleware end
- Root middleware end
```

It's very important to understand when your middleware will run to make sure
your application is behaving as you intended.

The steps needed to create a middleware in Framework mode:

**1. Create a Context**

Middleware uses a `context` provider instance to provide data down the middleware
chain. You can create type-safe context objects using `createContext`

```tsx
import { createContext } from "react-router";
import type { User } from "~/types";

export const userContext = createContext<User | null>(null);
```

**2. Export middleware from your routes**

```tsx
import { redirect } from "react-router";
import { userContext } from "~/context";

// Server-side Authentication Middleware
async function authMiddleware({ request, context }) {
  const user = await getUserFromSession(request);
  if (!user) {
    throw redirect("/login");
  }
  context.set(userContext, user);
}
```

**3. Update `getLoadContext` function&#x20;**

If you're using a custom server and a `getLoadContext` function, you will need
to update your implementation to return an instance of `RouterContextProvider`,
instead of a JavaScript object.

### Server side middleware

Server middleware runs in the server in framework mode for HTML Document requests
and `.data` requests for subsequent navigations and fetcher calls.

```tsx
async function serverMiddleware({ request }, next) {
  console.log(request.method, request.url);
  let response = await next();
  console.log(response.status, request.method, request.url);
  return response;
}

// Framework mode only
export const middleware: Route.MiddlewareFunction[] = [serverMiddleware];
```

In a hydrated Framework Mode app, server middleware is designed in such that it
prioritizes SPA behaviour and does not create a new network activity by default.

### Client side middleware

Client middleware runs in the browser in framework mode and data mode for
client-side navigations and fetcher calls. Client middleware differs from server
middleware because there's no HTTP requests,
so it doesn't have a response bubbling up.

```tsx
async function clientMiddleware({ request }, next) {
  console.log(request.method, request.url);
  await next();
  console.log("Navigation completed", request.method, request.url);
}

// Framework mode
export const clientMiddleware: Route.ClientMiddlewareFunction[] = [
  clientMiddleware,
];

// Or, Data mode
const route = {
  path: "/",
  middleware: [clientMiddleware],
  loader: rootLoader,
  Component: Root,
};
```

Client middleware is simpler because since we are already on the client and are
always making a "request" to the router when navigating. Client middleware will
run on every client navigation, regardless of whether there are `loader`s to run.

### Error handling in middleware

Middleware error handling follows the same principles as regular route
loaders and actions. When an error occurs in middleware, it bubbles
up the chain and can be caught by error boundaries.

```tsx
async function errorHandlingMiddleware({ request }, next) {
  try {
    return await next();
  } catch (error) {
    console.error("Middleware error:", error);
    // You can throw a new error or re-throw the original
    throw new Response("Authentication failed", { status: 401 });
  }
}
```

Errors in middleware follow the normal React Router error flow
they'll be caught by the nearest ErrorBoundary component,
allowing you to display user-friendly error messages.

### Middleware ordering and dependencies

The order of middleware in your export array matters because they execute
sequentially. First middleware runs first, and each can modify the context or
request before the next one.

```tsx
export const middleware = [
  loggingMiddleware, // Runs first, logs all requests
  authMiddleware, // Runs second, checks authentication
  localeMiddleware, // Runs third, sets up localization
];
```

Dependencies between middleware should be handled carefully.
If one middleware depends on context set by another, ensure they're
ordered correctly and handle missing context gracefully.

### Performance considerations

Middleware adds execution overhead to every request, so keep it lightweight.
Avoid expensive operations like heavy database queries
or complex computations in middleware.

Good practices for performance:

Use caching for repeated operations, minimize I/O operations in middleware chains.
Consider conditional middleware execution based on routes, profile middleware performance in production

```tsx
// Bad - expensive operation in middleware
async function heavyMiddleware({ request }, next) {
  const expensiveData = await heavyComputation();
  return await next();
}

// Good - cached or conditional operation
async function optimizedMiddleware({ request }, next) {
  if (!request.url.includes("/admin")) {
    return await next();
  }
  // Only run for admin routes
  return await next();
}
```

### Testing middleware

Middleware functions can be unit tested like any other async function.
Mock the request, context, and next function to verify behavior.

```tsx
import { describe, it, expect, vi } from "vitest";

describe("authMiddleware", () => {
  it("should redirect unauthenticated users", async () => {
    const mockContext = { set: vi.fn() };
    const mockNext = vi.fn();
    const mockRequest = new Request("http://localhost/test");

    // Mock getUserFromSession to return null
    vi.mock("~/session", () => ({
      getUserFromSession: vi.fn().mockResolvedValue(null),
    }));

    await expect(
      authMiddleware({ request: mockRequest, context: mockContext }, mockNext),
    ).rejects.toThrow();

    expect(mockNext).not.toHaveBeenCalled();
  });
});
```

Integration testing can verify the entire middleware chain works together
with actual route loaders and components.

### Conclusion

React Router middleware provides a powerful, composable way to handle cross-cutting
concerns in your applications. By understanding the execution model,
proper error handling, and performance implications, you can build robust middleware
chains that enhance your application without compromising maintainability.
