import { Route } from "@effect/ui";
import { Schema } from "effect";
import { deepDives, posts } from "virtual:content";
import { publishedWork } from "@/lib/work";

// Every page of the site. Build links with `AppRoute.print`, never by hand.
// The server endpoints (sitemap, /api/*, /.well-known/*) aren't pages and
// live in src/server/endpoints.ts.
export const UsesFolderSlug = Schema.Literals([
  "personal-software",
  "agents",
  "desk",
  "devices",
  "keyboard",
  "command-line",
  "infrastructure",
]);
export type UsesFolderSlug = typeof UsesFolderSlug.Type;

// Entry routes only parse slugs that exist, so an unknown one is the
// catch-all NotFound route, the same route the prerendered 404 page holds.
const slugOf = (entries: ReadonlyArray<{ readonly slug: string }>) => ({
  params: { slug: Schema.Literals(entries.map((entry) => entry.slug)) },
});

export const AppRoute = Route.union({
  Home: Route.make("/"),
  About: Route.make("/about"),
  Baby: Route.make("/baby"),
  Blog: Route.make("/blog"),
  Post: Route.make("/blog/:slug", slugOf(posts)),
  DeepDive: Route.make("/deep-dive/:slug", slugOf(deepDives)),
  Learnings: Route.make("/learnings"),
  Notes: Route.make("/notes"),
  Now: Route.make("/now"),
  Quotes: Route.make("/quotes"),
  Referrals: Route.make("/referrals"),
  Resolutions: Route.make("/resolutions"),
  Someday: Route.make("/someday"),
  TldrEn: Route.make("/tldr/en"),
  TldrIs: Route.make("/tldr/is"),
  TsMini: Route.make("/ts-mini"),
  ChroncalPrivacy: Route.make("/chroncal/privacy"),
  ChroncalTerms: Route.make("/chroncal/terms"),
  UseCases: Route.make("/use-cases"),
  UseCase: Route.make("/use-cases/:slug", slugOf(publishedWork)),
  Uses: Route.make("/uses"),
  UsesFolder: Route.make("/uses/:folder", { params: { folder: UsesFolderSlug } }),
  NotFound: Route.make("/*"),
});
export type AppRoute = typeof AppRoute.Type;
