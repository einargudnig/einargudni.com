import { Component, Head, Router, UiSchema } from "@effect/ui";
import { Html, HtmlHead } from "@effect/ui/html";
import { Schema } from "effect";
import { BirthdayConfetti } from "./components/BirthdayConfetti.ts";
import { KeyboardNav } from "./components/KeyboardNav.ts";
import { Masthead } from "./components/Masthead.ts";
import { WebMCP } from "./components/WebMCP.ts";
import { AboutPage } from "./pages/about/AboutPage.ts";
import { BlogPage } from "./pages/blog/BlogPage.ts";
import { PostPage } from "./pages/blog/PostPage.ts";
import { ChroncalPrivacyPage } from "./pages/chroncal/privacy/ChroncalPrivacyPage.ts";
import { ChroncalTermsPage } from "./pages/chroncal/terms/ChroncalTermsPage.ts";
import { DeepDivePage } from "./pages/deep-dive/DeepDivePage.ts";
import { HomePage } from "./pages/HomePage.ts";
import { LearningsPage } from "./pages/learnings/LearningsPage.ts";
import { NotesPage } from "./pages/notes/NotesPage.ts";
import { NotFoundPage } from "./pages/NotFoundPage.ts";
import { NowPage } from "./pages/now/NowPage.ts";
import { QuotesPage } from "./pages/quotes/QuotesPage.ts";
import { ReferralsPage } from "./pages/referrals/ReferralsPage.ts";
import { ResolutionsPage } from "./pages/resolutions/ResolutionsPage.ts";
import { SomedayPage } from "./pages/someday/SomedayPage.ts";
import { TldrEnPage } from "./pages/tldr/en/TldrEnPage.ts";
import { TldrIsPage } from "./pages/tldr/is/TldrIsPage.ts";
import { UseCasePage } from "./pages/use-cases/UseCasePage.ts";
import { UseCasesPage } from "./pages/use-cases/UseCasesPage.ts";
import { UsesPage } from "./pages/uses/UsesPage.ts";
import { AppRoute } from "./routes.ts";

// Rarely visited and heavy (Convex; the compiler visualizer), so they load in
// their own chunks. A lazy page shows its fallback until the chunk arrives,
// even over prerendered HTML, so the rest of the site stays eager.
const BabyPage = Component.lazy("BabyPage", () =>
  import("./pages/baby/BabyPage.ts").then((module) => module.BabyPage),
);
const TsMiniPage = Component.lazy("TsMiniPage", () =>
  import("./pages/ts-mini/TsMiniPage.ts").then((module) => module.TsMiniPage),
);

// Hydration adopts a lazy page's prerendered HTML only when its module has
// already loaded; otherwise the fallback replaces it until the chunk arrives.
// The client entry awaits this before hydrating, so a visitor landing on one
// of these pages never sees "Loading…" over a page that was already there.
const LAZY_PAGES: Record<string, { readonly preload: () => Promise<void> }> = {
  [AppRoute.print(AppRoute.Baby())]: BabyPage,
  [AppRoute.print(AppRoute.TsMini())]: TsMiniPage,
};
export const preloadPage = (pathname: string): Promise<void> =>
  LAZY_PAGES[pathname]?.preload() ?? Promise.resolve();

const pageFallback =
  <M>(h: Html.H<M>) =>
  (result: { readonly _tag: string }) =>
    h.p
      .class("text-muted-foreground")
      .children(
        result._tag === "Failure"
          ? "This page didn't load. Reloading usually fixes it."
          : "Loading…",
      );

const AppMessage = UiSchema.TaggedEnum({
  ChangedRoute: { route: AppRoute },
});

const YEAR = new Date().getFullYear();

export const App = Html.component({
  name: "App",
  props: Schema.Struct({ route: AppRoute }),
  model: Schema.Struct({ route: AppRoute }),
  message: AppMessage,
}).make({
  init: ($) => ({ route: $.props.route }),
  update: (_, message) => AppMessage.match(message, { ChangedRoute: ({ route }) => ({ route }) }),
  subscriptions: ({ model }) => [
    Router.subscription(AppRoute, model.route, (route) => AppMessage.ChangedRoute({ route })),
  ],
  head: () => [
    Head.title("Einar Gudni"),
    Head.titleTemplate((title) => `${title} — Einar Gudni`),
    HtmlHead.lang("en"),
    HtmlHead.meta({ name: "description", content: "My home on the web 🏡" }),
  ],
  view: (h, { route }) =>
    h.main
      .class("relative mx-auto flex min-h-dvh max-w-4xl flex-col px-5 pt-6 md:px-8 md:pt-10")
      .children(
        WebMCP(h, {}),
        BirthdayConfetti(h, {}),
        Masthead(h, AppRoute.printPath(route)),
        h.div.class("flex-1").children(page(h, route)),
        h.footer
          .class(
            "mt-24 mb-8 grid grid-cols-[1fr_auto] gap-4 border-t border-foreground pt-3 text-sm text-muted-foreground",
          )
          .children(
            h.span.children("Don't half ass it."),
            h.span
              .class("flex items-center gap-4 tabular-nums")
              .children(
                h.a
                  .attr("href", "https://github.com/einargudnig")
                  .class("hover:text-foreground transition-colors")
                  .children("GitHub"),
                h.a
                  .attr("href", "https://x.com/einargudni")
                  .class("hover:text-foreground transition-colors")
                  .children("X"),
                h.span.children(String(YEAR)),
              ),
          ),
        KeyboardNav(h, {}),
      ),
});

// Each page is keyed by its path, so a new path mounts a fresh page.
const page = <M>(h: Html.H<M>, route: AppRoute) => {
  const key = AppRoute.printPath(route);
  return AppRoute.match(route, {
    Home: () => HomePage(h, { key }),
    About: () => AboutPage(h, { key }),
    Baby: () => BabyPage(h, { key, fallback: pageFallback(h) }),
    Blog: () => BlogPage(h, { key }),
    Post: ({ params }) => PostPage(h, { key, props: { slug: params.slug } }),
    DeepDive: ({ params }) => DeepDivePage(h, { key, props: { slug: params.slug } }),
    Learnings: () => LearningsPage(h, { key }),
    Notes: () => NotesPage(h, { key }),
    Now: () => NowPage(h, { key }),
    Quotes: () => QuotesPage(h, { key }),
    Referrals: () => ReferralsPage(h, { key }),
    Resolutions: () => ResolutionsPage(h, { key }),
    Someday: () => SomedayPage(h, { key }),
    TldrEn: () => TldrEnPage(h, { key }),
    TldrIs: () => TldrIsPage(h, { key }),
    TsMini: () => TsMiniPage(h, { key, fallback: pageFallback(h) }),
    ChroncalPrivacy: () => ChroncalPrivacyPage(h, { key }),
    ChroncalTerms: () => ChroncalTermsPage(h, { key }),
    UseCases: () => UseCasesPage(h, { key }),
    UseCase: ({ params }) => UseCasePage(h, { key, props: { slug: params.slug } }),
    Uses: () => UsesPage(h, { key, props: { folder: null } }),
    UsesFolder: ({ params }) => UsesPage(h, { key, props: { folder: params.folder } }),
    NotFound: () => NotFoundPage(h, { key }),
  });
};
