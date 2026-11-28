import { layerHttp } from "@effect/ui/html/HtmlServerHttp";
import { document } from "virtual:@effect/ui/document";
import { deepDives, posts, work } from "@/.velite";
import { App } from "./App.ts";
import { AppRoute } from "./routes.ts";
import { STATIC_PATHS } from "./static-paths.ts";

// Rendered per request in `vite dev`, and once per path in `vite build`. The
// build writes each page to dist/client/<path>.html for the assets binding.
export default layerHttp(App, { routes: AppRoute, document, static: import.meta.env.PROD });

// Drafts are prerendered too (a post's draft banner says so), but case
// studies aren't: a half-written account of client work reads worse than none.
export const prerender = [
  ...STATIC_PATHS,
  ...posts.map(({ slug }) => AppRoute.print(AppRoute.Post({ params: { slug } }))),
  ...deepDives.map(({ slug }) => AppRoute.print(AppRoute.DeepDive({ params: { slug } }))),
  ...work
    .filter(({ draft }) => !draft)
    .map(({ slug }) => AppRoute.print(AppRoute.UseCase({ params: { slug } }))),
  "/404",
];
