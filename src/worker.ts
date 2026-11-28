import { Effect } from "effect";
import { Assets, negotiate } from "@/lib/negotiation";
import { endpoint } from "./server/endpoints.ts";

// Pages are prerendered into dist/client and served by the assets binding.
// The Worker runs for two things only: the paths in `assets.run_worker_first`,
// so markdown negotiation sees them, and any request no asset matched, which
// is where the endpoints in ./server/endpoints.ts live.
export default {
  fetch: async (request, env) => {
    const pathname = new URL(request.url).pathname;
    const fixed = endpoint(pathname);
    if (fixed) return fixed;

    const outcome = await Effect.runPromise(
      negotiate(request).pipe(
        Effect.provideService(
          Assets,
          Assets.of({ fetch: (req) => Effect.promise(() => env.ASSETS.fetch(req)) }),
        ),
      ),
    );
    if (outcome._tag === "Respond") return outcome.response;

    const asset = await env.ASSETS.fetch(request);
    if (asset.status !== 404) return asset;
    const page = await env.ASSETS.fetch(new URL("/404", request.url));
    return new Response(page.body, {
      status: 404,
      headers: { "content-type": page.headers.get("content-type") ?? "text/html; charset=utf-8" },
    });
  },
} satisfies ExportedHandler<Env>;
