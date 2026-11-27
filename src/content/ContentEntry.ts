import type { Component } from "@effect/ui";
import type { Html } from "@effect/ui/html";
import { Option } from "effect";
import { AsyncResult } from "effect/reactivity";
import type { GetContent } from "../queries/GetContent.ts";
import { ContentView } from "./ContentView.ts";

// One entry of a page that lists several, from the page's `queryMany` of
// GetContent. Each entry's islands are keyed by its path.
export const ContentEntry = <M>(
  h: Html.H<M>,
  entries: Component.KeyedResults<typeof GetContent>,
  path: string,
) =>
  Option.match(entries.get({ path }), {
    onNone: () => null,
    onSome: ({ result }) =>
      AsyncResult.match(result, {
        onInitial: () => null,
        // A body chunk can fail to load after a deploy replaces it; keep the
        // title and facts on screen and say how to recover.
        onFailure: () =>
          h.p.children("This piece didn't load. Reloading the page usually fixes it."),
        onSuccess: ({ value }) => ContentView(h, value, { key: `${path}:` }),
      }),
  });
