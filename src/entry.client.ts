import { Router } from "@effect/ui";
import { BrowserRouter, HtmlHydrate } from "@effect/ui/html";
import { Effect, Layer } from "effect";
import { App, preloadPage } from "./App.ts";
import { AppRoute } from "./routes.ts";

void preloadPage(location.pathname).then(() =>
  HtmlHydrate.hydrate(
    App,
    Router.props(AppRoute),
    document.getElementById("app")!,
    JSON.parse(document.getElementById("state")!.textContent!),
  ).pipe(Layer.provide(BrowserRouter.layer({ routes: AppRoute })), Layer.launch, Effect.runFork),
);
