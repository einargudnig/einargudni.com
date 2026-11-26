import { Router } from "@effect/ui";
import { BrowserRouter, HtmlHydrate } from "@effect/ui/html";
import { Effect, Layer } from "effect";
import { App } from "./App.ts";
import { AppRoute } from "./routes.ts";

HtmlHydrate.hydrate(
  App,
  Router.props(AppRoute),
  document.getElementById("app")!,
  JSON.parse(document.getElementById("state")!.textContent!),
).pipe(Layer.provide(BrowserRouter.layer({ routes: AppRoute })), Layer.launch, Effect.runFork);
