import { isNight, NIGHT_BELOW_DEG, REYKJAVIK, sunAltitude } from "./sun.ts";

// The site prints in two editions: day (paper) and night (night-blue). By
// default the edition follows the sun over Reykjavík; a reader can pin one.
// "night" maps to the `.dark` class so every `dark:` utility keeps working.

export type Pref = "auto" | "day" | "night";
export const EDITION_KEY = "edition";
export const PREFS: ReadonlyArray<Pref> = ["auto", "day", "night"];

export const resolveEdition = (pref: Pref) => (pref === "auto" ? (isNight() ? "night" : "day") : pref);

// Runs in <head> before first paint so a prerendered page never flashes the
// wrong edition. sunAltitude is serialised in; it has no outside references.
export const editionScript = `(() => {
  const sunAltitude = ${sunAltitude.toString()};
  let pref = "auto";
  try { pref = localStorage.getItem(${JSON.stringify(EDITION_KEY)}) || "auto"; } catch {}
  const night = pref === "night" ||
    (pref !== "day" && sunAltitude(new Date(), ${REYKJAVIK.lat}, ${REYKJAVIK.lng}) < ${NIGHT_BELOW_DEG});
  document.documentElement.classList.toggle("dark", night);
  document.documentElement.style.colorScheme = night ? "dark" : "light";
})();`;
