// @vitest-environment happy-dom
import { Router } from "@effect/ui";
import { ssr } from "@effect/ui/html/testing";
import { TestHost } from "@effect/ui/testing";
import { assert, describe, it } from "@effect/vitest";
import { Effect, Layer } from "effect";
import { deepDives, posts } from "virtual:content";
import { publishedWork } from "@/lib/work";
import { App, preloadPage } from "./App.ts";
import { AppRoute } from "./routes.ts";
import { STATIC_PATHS } from "./static-paths.ts";

// Renders the app on the server at `url` and hydrates it in a fresh document,
// as a visitor's browser does with a prerendered page, lazy page preloaded
// first as entry.client.ts does. `ssr` fails with an SsrError when the
// client's first render disagrees with the server's.
const render = (url: string) =>
  Effect.promise(() => preloadPage(new URL(url, "http://localhost").pathname)).pipe(
    Effect.andThen(ssr(App, Router.props(AppRoute))),
    Effect.provide(Layer.mergeAll(Router.memory({ routes: AppRoute, url }), TestHost.layer())),
    Effect.scoped,
  );

const h1 = (html: string) =>
  /<h1[^>]*>([\s\S]*?)<\/h1>/
    .exec(html)?.[1]
    ?.replace(/<[^>]+>/g, "")
    .trim();

const [post] = posts;
const [dive] = deepDives;
const [caseStudy] = publishedWork;

// Every path the prerender writes, plus one of each kind of entry page.
const PATHS = [
  ...STATIC_PATHS,
  `/blog/${post?.slug}`,
  `/deep-dive/${dive?.slug}`,
  `/use-cases/${caseStudy?.slug}`,
];

describe("App", () => {
  it.effect.each(PATHS)("renders and hydrates %s", (url) =>
    Effect.gen(function* () {
      const result = yield* render(url);
      assert.isDefined(h1(result.html), `no <h1> on ${url}`);
      assert.notInclude(
        h1(result.html) ?? "",
        "Not in the almanac",
        `${url} rendered the 404 page`,
      );
    }),
  );

  it.effect.each(["/blog/no-such-post", "/deep-dive/no-such-dive", "/use-cases/no-such-case"])(
    "renders the 404 page for an unknown slug at %s",
    (url) =>
      Effect.gen(function* () {
        const result = yield* render(url);
        assert.strictEqual(h1(result.html), "Not in the almanac.");
      }),
  );
});
