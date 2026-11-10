// Pull the life-os snapshots that this site publishes and write them into data/.
//
// The site renders `data/whoop/latest.json` and `data/life-os-overview.json` at build time,
// so the pages are static HTML and a visitor pays nothing to see them. This script is what
// keeps those two files a day old instead of a month old: it asks my life-os store for the
// precomputed values (GET /v1/portfolio/{whoop,overview}) and rewrites them.
//
// Run by .github/workflows/daily-snapshot.yml, and safe to run by hand:
//
//   LIFEOS_API_URL=https://life-os-api-….workers.dev LIFEOS_WEB_TOKEN=… bun scripts/refresh-life-os.ts
//
// Writes `changed=true|false` to $GITHUB_OUTPUT when it is set, so the workflow can skip a
// deploy on the days the numbers did not move.
//
// Every rule here exists because the previous publisher failed quietly: it wrote into a
// directory that had been renamed, exited 0, and the site showed a five-week-old score that
// looked perfectly normal.
import { appendFile, readFile } from "node:fs/promises";
import { join } from "node:path";

interface WhoopSnapshot {
  date: string;
  recovery?: { score: number };
  trends: { days: number; workouts: number };
  insight: { enough: boolean };
}

interface PortfolioOverview {
  generatedAt: string;
  system: { sources: number; daysCovered: number; dataPoints: number };
  sources: string[];
  activity: { workouts: number };
}

const ROOT = join(import.meta.dir, "..");
const WHOOP = join(ROOT, "data/whoop/latest.json");
const OVERVIEW = join(ROOT, "data/life-os-overview.json");
const DAY_MS = 86_400_000;

const base = process.env.LIFEOS_API_URL?.replace(/\/+$/, "");
const token = process.env.LIFEOS_WEB_TOKEN;

if (!base) {
  console.error(
    "LIFEOS_API_URL is not set. It is a repository variable: the life-os edge Worker's URL,\n" +
      "e.g. https://life-os-api-prod-….workers.dev — no trailing slash.",
  );
  process.exit(1);
}
if (!token) {
  console.error(
    "LIFEOS_WEB_TOKEN is not set. It is a repository secret: the read key life-os issues for\n" +
      "this site (bun run secret:set life-os-web-token in the life-os repo, then\n" +
      "wrangler secret put LIFEOS_WEB_TOKEN on the life-os Worker).",
  );
  process.exit(1);
}

// A 401 here is the whole point of failing loudly: the site would keep serving yesterday's
// numbers and nothing would look wrong.
const get = async <T>(path: string): Promise<T> => {
  const response = await fetch(`${base}${path}`, {
    headers: { authorization: `Bearer ${token}` },
  });
  if (!response.ok) {
    const body = await response.text();
    throw new Error(`life-os ${path} → ${response.status} ${body.slice(0, 200)}`);
  }
  const { data } = (await response.json()) as { data: T };
  return data;
};

const readJson = async <T>(path: string): Promise<T> =>
  JSON.parse(await readFile(path, "utf8")) as T;

const [whoop, overview] = await Promise.all([
  get<WhoopSnapshot>("/v1/portfolio/whoop"),
  get<PortfolioOverview>("/v1/portfolio/overview"),
]);

// Shape checks against the endpoint, not against TypeScript: this data crosses a network
// boundary, and a key that silently disappears would render a missing ring rather than
// fail a build.
if (!whoop.date || !whoop.recovery || !whoop.trends || !whoop.insight) {
  throw new Error(`whoop snapshot is incomplete: ${JSON.stringify(whoop)}`);
}
if (!overview.system || !Array.isArray(overview.sources) || !overview.activity) {
  throw new Error(`overview is incomplete: ${JSON.stringify(overview)}`);
}
if (whoop.trends.days <= 0) throw new Error("whoop trends window is not positive");

// The replica can lag the collector. Publishing an older score over a newer one would move
// the site backwards, so refuse and let the job go red — the committed file stays as the
// last good value.
const committed = await readJson<WhoopSnapshot>(WHOOP);
if (whoop.date < committed.date) {
  throw new Error(
    `refusing to publish ${whoop.date}: the committed snapshot is ${committed.date} and the store looks behind`,
  );
}

// The reading itself has to be recent-ish or this is a stale replica in disguise. Three
// days is generous enough for a Whoop outage and tight enough to notice a dead collector.
const ageDays = Math.floor((Date.now() - Date.parse(`${whoop.date}T00:00:00Z`)) / DAY_MS);
if (!Number.isFinite(ageDays) || ageDays > 3) {
  throw new Error(
    `latest whoop reading is ${ageDays} days old (${whoop.date}) — store or collector is behind`,
  );
}

const write = async (path: string, value: unknown): Promise<boolean> => {
  const next = `${JSON.stringify(value, null, 2)}\n`;
  const current = await readFile(path, "utf8").catch(() => "");
  if (current === next) return false;
  await Bun.write(path, next);
  return true;
};

const whoopChanged = await write(WHOOP, whoop);
const overviewChanged = await write(OVERVIEW, overview);
const changed = whoopChanged || overviewChanged;

console.log(
  `whoop ${whoop.date}: recovery ${whoop.recovery.score}, ${whoop.trends.workouts} workouts in ${whoop.trends.days}d` +
    ` · ${overview.system.sources} sources, ${overview.system.dataPoints} points`,
);
console.log(changed ? "changed" : "no change");

if (process.env.GITHUB_OUTPUT) {
  await appendFile(process.env.GITHUB_OUTPUT, `changed=${changed}\n`);
}
