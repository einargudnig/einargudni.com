import { Head, Router, UiSchema } from "@effect/ui";
import { Html, HtmlHead } from "@effect/ui/html";
import { Schema } from "effect";
import { Masthead } from "./components/Masthead.ts";
import { PostPage } from "./pages/blog/PostPage.ts";
import { NotFoundPage } from "./pages/NotFoundPage.ts";
import { AppRoute } from "./routes.ts";

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
        Masthead(h, AppRoute.printPath(route)),
        h.div.class("flex-1").children(page(h, route)),
        h.footer
          .class(
            "mt-24 mb-8 grid grid-cols-[1fr_auto] gap-4 border-t border-foreground pt-3 text-sm text-muted-foreground",
          )
          .children(
            h.span.children("Don't half ass it."),
            h.span.class("flex items-center gap-4 tabular-nums").children(
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
      ),
});

// Each page is keyed by its path, so a new path mounts a fresh page.
const page = <M>(h: Html.H<M>, route: AppRoute) => {
  const key = AppRoute.printPath(route);
  return AppRoute.match(route, {
    Post: ({ params }) => PostPage(h, { key, props: { slug: params.slug } }),
    NotFound: () => NotFoundPage(h, { key }),
    Home: () => NotFoundPage(h, { key }),
    About: () => NotFoundPage(h, { key }),
    Baby: () => NotFoundPage(h, { key }),
    Blog: () => NotFoundPage(h, { key }),
    DeepDive: () => NotFoundPage(h, { key }),
    Learnings: () => NotFoundPage(h, { key }),
    Notes: () => NotFoundPage(h, { key }),
    Now: () => NotFoundPage(h, { key }),
    Quotes: () => NotFoundPage(h, { key }),
    Referrals: () => NotFoundPage(h, { key }),
    Resolutions: () => NotFoundPage(h, { key }),
    Someday: () => NotFoundPage(h, { key }),
    TldrEn: () => NotFoundPage(h, { key }),
    TldrIs: () => NotFoundPage(h, { key }),
    TsMini: () => NotFoundPage(h, { key }),
    ChroncalPrivacy: () => NotFoundPage(h, { key }),
    ChroncalTerms: () => NotFoundPage(h, { key }),
    UseCases: () => NotFoundPage(h, { key }),
    UseCase: () => NotFoundPage(h, { key }),
    Uses: () => NotFoundPage(h, { key }),
    UsesFolder: () => NotFoundPage(h, { key }),
  });
};
