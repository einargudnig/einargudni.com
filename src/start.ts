import { createMiddleware, createStart } from "@tanstack/react-start";
import { env } from "cloudflare:workers";
import { Effect } from "effect";
import { Assets, negotiate } from "@/lib/negotiation";

const WorkerAssets = Assets.of({
  fetch: (request) => Effect.promise(() => env.ASSETS.fetch(request)),
});

const markdownNegotiation = createMiddleware().server(async ({ next, request }) => {
  const outcome = await Effect.runPromise(
    negotiate(request).pipe(Effect.provideService(Assets, WorkerAssets)),
  );
  return outcome._tag === "Next" ? next() : outcome.response;
});

export const startInstance = createStart(() => ({
  requestMiddleware: [markdownNegotiation],
}));
