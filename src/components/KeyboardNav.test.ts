import { Router } from "@effect/ui";
import { Story } from "@effect/ui/testing";
import { assert, describe, it } from "@effect/vitest";
import { Effect } from "effect";
import { AppRoute } from "../routes.ts";
import { KeyboardNav, KeyboardNavMessage, ScrollPage, Wait } from "./KeyboardNav.ts";

const press = (key: string) => KeyboardNavMessage.PressedKey({ key });

describe("KeyboardNav", () => {
  it.effect("g then b goes to the blog and shows where it went", () =>
    Effect.gen(function* () {
      const s = yield* Story.make(KeyboardNav, {});
      // The chord's timeout keeps running while the second key arrives.
      s.send(press("g")).expectExact(Wait).keepPending(Wait);
      assert.strictEqual(s.model.display, "pending");

      s.send(press("b"));
      assert.strictEqual(s.model.display, "blog");
      s.expectExact(Wait, Router.push(AppRoute, AppRoute.Blog()), Wait);
      s.resolve(Router.push(AppRoute, AppRoute.Blog()), "navigated");

      // The chord's own timeout fires after the second key: it must not clear
      // the "blog" label, which a newer wait owns.
      s.resolve(Wait, KeyboardNavMessage.CompletedWait({ seq: 1 }));
      assert.strictEqual(s.model.display, "blog");
      s.resolve(Wait, KeyboardNavMessage.CompletedWait({ seq: 2 }));
      assert.strictEqual(s.model.display, "idle");
    }),
  );

  it.effect("g g scrolls to the top instead of navigating", () =>
    Effect.gen(function* () {
      const s = yield* Story.make(KeyboardNav, {});
      s.send(press("g")).keepPending(Wait).send(press("g"));
      assert.strictEqual(s.model.display, "idle");
      s.expectExact(Wait, ScrollPage.make({ scroll: "top" }));
      s.resolve(ScrollPage, undefined).resolve(Wait, KeyboardNavMessage.CompletedWait({ seq: 1 }));
    }),
  );

  it.effect("a g chord with an unknown second key does nothing", () =>
    Effect.gen(function* () {
      const s = yield* Story.make(KeyboardNav, {});
      s.send(press("g")).keepPending(Wait).send(press("x"));
      assert.strictEqual(s.model.display, "idle");
      s.resolve(Wait, KeyboardNavMessage.CompletedWait({ seq: 1 }));
    }),
  );

  it.effect("j and k scroll by a line without starting a chord", () =>
    Effect.gen(function* () {
      const s = yield* Story.make(KeyboardNav, {});
      s.send(press("j")).expectExact(ScrollPage.make({ scroll: "line-down" }));
      s.resolve(ScrollPage, undefined);
      s.send(press("k")).expectExact(ScrollPage.make({ scroll: "line-up" }));
      s.resolve(ScrollPage, undefined);
      assert.strictEqual(s.model.display, "idle");
    }),
  );
});
