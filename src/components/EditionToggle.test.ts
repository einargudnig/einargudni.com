import { Story } from "@effect/ui/testing";
import { assert, describe, it } from "@effect/vitest";
import { Effect } from "effect";
import { resolveEdition } from "@/lib/edition";
import { EditionToggle, EditionToggleMessage, FollowSun, SwitchEdition } from "./EditionToggle.ts";

const click = EditionToggleMessage.ClickedToggle({ x: 10, y: 20 });

describe("EditionToggle", () => {
  it.effect("cycles auto → day → night → auto, switching from where it was clicked", () =>
    Effect.gen(function* () {
      const s = yield* Story.make(EditionToggle, {});
      assert.strictEqual(s.model.pref, "auto");

      for (const pref of ["day", "night", "auto"] as const) {
        s.send(click).expectExact(SwitchEdition.make({ pref, x: 10, y: 20 }));
        s.resolve(SwitchEdition, undefined);
        assert.strictEqual(s.model.pref, pref);
        assert.strictEqual(s.model.edition, resolveEdition(pref));
      }
    }),
  );

  it.effect("reads the stored preference once the browser can", () =>
    Effect.gen(function* () {
      const s = yield* Story.make(EditionToggle, {});
      // The server renders "auto" with no edition; the client corrects it.
      assert.isNull(s.model.edition);
      s.send(EditionToggleMessage.ReadPref({ pref: "night" }));
      assert.deepStrictEqual(s.model, { pref: "night", edition: "night" });
    }),
  );

  it.effect("follows the sun only while the preference is auto", () =>
    Effect.gen(function* () {
      const s = yield* Story.make(EditionToggle, {});
      assert.deepStrictEqual(s.subscriptions, ["read-pref", "follow-sun"]);

      s.send(EditionToggleMessage.Ticked()).expectExact(FollowSun);
      s.resolve(FollowSun, undefined);

      s.send(EditionToggleMessage.ReadPref({ pref: "day" }));
      assert.deepStrictEqual(s.subscriptions, ["read-pref"]);
    }),
  );
});
