import latest from "@/data/whoop/latest.json";

// The Whoop numbers are a file in this repo, not a request.
//
// `data/whoop/latest.json` is refreshed once a day by
// `.github/workflows/daily-snapshot.yml`, which pulls it from my life-os edge API
// (`GET /v1/portfolio/whoop`) and redeploys. The page is prerendered into static HTML, so
// a visitor gets the numbers in the first byte: no client round-trip, no loading state, no
// worker secret, and nothing that can be slow or down.
//
// That is the whole trade: the numbers are up to a day old, and in exchange they are
// always there. Do not reintroduce a runtime fetch — the previous version asked the store
// on mount and, because the worker had no credentials for it, always drew the same stale
// file anyway, a second later.

export interface WhoopSnapshot {
  date: string;
  recovery?: { score: number; hrv?: number; rhr?: number };
  sleep?: { performance: number; hours?: number };
  strain?: number;
  trends: {
    days: number;
    avgRecovery: number | null;
    avgSleep: number | null;
    workouts: number;
  };
  insight: {
    afterGood: number | null;
    afterShort: number | null;
    sleepDelta: number | null;
    enough: boolean;
  };
}

// Typed at the boundary on purpose: the shape is also declared in life-os
// (src/data/portfolio.ts), and this assignment is what fails the build if the publisher
// starts writing a different one.
export const whoopSnapshot: WhoopSnapshot = latest;

const DAY_MS = 86_400_000;

/**
 * How many whole days between the reading's date and now.
 *
 * The page states its own staleness, because the failure this widget had was silent: it
 * kept rendering a five-week-old score and looked fine. A number that says how old it is
 * turns a broken publish pipeline into something a visitor (and I) can see.
 */
export const snapshotAgeDays = (date: string, now = Date.now()): number => {
  const then = new Date(`${date}T00:00:00Z`).getTime();
  if (Number.isNaN(then)) return 0;
  return Math.max(0, Math.floor((now - then) / DAY_MS));
};
