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
import { Cause, Config, Console, Data, Effect, Exit, Option, Redacted, Schema } from "effect";

// Shape checks against the endpoint, not against TypeScript: this data crosses a network
// boundary, and a key that silently disappears would render a missing ring rather than
// fail a build. Decoding strips keys these schemas don't name, so they only gate the
// write — the raw payload is what lands on disk.
const WhoopSnapshot = Schema.Struct({
  date: Schema.String,
  recovery: Schema.Struct({ score: Schema.Number }),
  trends: Schema.Struct({
    days: Schema.Number.check(Schema.isGreaterThan(0)),
    workouts: Schema.Number,
  }),
  insight: Schema.Struct({ enough: Schema.Boolean }),
});
type WhoopSnapshot = typeof WhoopSnapshot.Type;

const PortfolioOverview = Schema.Struct({
  generatedAt: Schema.String,
  system: Schema.Struct({
    sources: Schema.Number,
    daysCovered: Schema.Number,
    dataPoints: Schema.Number,
  }),
  sources: Schema.Array(Schema.String),
  activity: Schema.Struct({ workouts: Schema.Number }),
});

const CommittedSnapshot = Schema.fromJsonString(Schema.Struct({ date: Schema.String }));

class MissingEnv extends Data.TaggedError("MissingEnv")<{ name: string; hint: string }> {}
class LifeOsRequestFailed extends Data.TaggedError("LifeOsRequestFailed")<{
  path: string;
  detail: string;
}> {}
class FileFailed extends Data.TaggedError("FileFailed")<{ path: string; cause: unknown }> {}
class StoreBehind extends Data.TaggedError("StoreBehind")<{ fetched: string; committed: string }> {}
class ReadingTooOld extends Data.TaggedError("ReadingTooOld")<{ date: string; ageDays: number }> {}

const ROOT = join(import.meta.dir, "..");
const WHOOP = join(ROOT, "data/whoop/latest.json");
const OVERVIEW = join(ROOT, "data/life-os-overview.json");
const DAY_MS = 86_400_000;

const required = <A>(config: Config.Config<A>, name: string, hint: string) =>
  config.pipe(Effect.mapError(() => new MissingEnv({ name, hint })));

const LifeOsConfig = Effect.all({
  base: required(
    Config.String("LIFEOS_API_URL").pipe(Config.map((url) => url.replace(/\/+$/, ""))),
    "LIFEOS_API_URL",
    "a repository variable: the life-os edge Worker's URL,\n" +
      "e.g. https://life-os-api-prod-….workers.dev — no trailing slash.",
  ),
  token: required(
    Config.Redacted("LIFEOS_WEB_TOKEN"),
    "LIFEOS_WEB_TOKEN",
    "a repository secret: the read key life-os issues for\n" +
      "this site (bun run secret:set life-os-web-token in the life-os repo, then\n" +
      "wrangler secret put LIFEOS_WEB_TOKEN on the life-os Worker).",
  ),
});

// A 401 here is the whole point of failing loudly: the site would keep serving yesterday's
// numbers and nothing would look wrong.
const get = <S extends Schema.Decoder<unknown>>(path: string, schema: S) =>
  Effect.gen(function* () {
    const { base, token } = yield* LifeOsConfig;
    const failed = (detail: string) => new LifeOsRequestFailed({ path, detail });

    const response = yield* Effect.tryPromise({
      try: (signal) =>
        fetch(`${base}${path}`, {
          headers: { authorization: `Bearer ${Redacted.value(token)}` },
          signal,
        }),
      catch: (cause) => failed(String(cause)),
    });
    if (!response.ok) {
      const body = yield* Effect.promise(() => response.text());
      return yield* failed(`${response.status} ${body.slice(0, 200)}`);
    }
    const { data } = yield* Effect.tryPromise({
      try: () => response.json() as Promise<{ data: unknown }>,
      catch: () => failed("response is not JSON"),
    });
    const parsed = yield* Schema.decodeUnknownEffect(schema)(data).pipe(
      Effect.mapError((issue) => failed(`incomplete payload: ${issue.message}`)),
    );
    return { parsed, raw: data };
  });

const readText = (path: string) =>
  Effect.tryPromise({
    try: () => readFile(path, "utf8"),
    catch: (cause) => new FileFailed({ path, cause }),
  });

// The rules that keep a lagging store from moving the site backwards. Both must fail the
// job rather than publish: the committed file stays as the last good value.
//
// 1. The replica can lag the collector — refuse a `date` older than what is committed.
// 2. The reading has to be recent-ish or it is a stale replica in disguise — refuse one
//    more than three days old. Mind an unparseable date: `Date.parse` gives NaN.
export const checkFreshness = (
  whoop: WhoopSnapshot,
  committedDate: string,
  now: number,
): Effect.Effect<void, StoreBehind | ReadingTooOld> =>
  Effect.gen(function* () {
    // ISO dates compare correctly as strings because they are zero-padded.
    if (whoop.date < committedDate) {
      return yield* new StoreBehind({ fetched: whoop.date, committed: committedDate });
    }

    const ageDays = Math.floor((now - Date.parse(`${whoop.date}T00:00:00Z`)) / DAY_MS);
    if (!Number.isFinite(ageDays) || ageDays > 3) {
      return yield* new ReadingTooOld({ date: whoop.date, ageDays });
    }
  });

const write = (path: string, value: unknown) =>
  Effect.gen(function* () {
    const next = `${JSON.stringify(value, null, 2)}\n`;
    const current = yield* readText(path).pipe(Effect.orElseSucceed(() => ""));
    if (current === next) return false;
    yield* Effect.tryPromise({
      try: () => Bun.write(path, next),
      catch: (cause) => new FileFailed({ path, cause }),
    });
    return true;
  });

const program = Effect.gen(function* () {
  const [whoop, overview] = yield* Effect.all(
    [get("/v1/portfolio/whoop", WhoopSnapshot), get("/v1/portfolio/overview", PortfolioOverview)],
    { concurrency: "unbounded" },
  );

  const committed = yield* readText(WHOOP).pipe(
    Effect.flatMap(Schema.decodeUnknownEffect(CommittedSnapshot)),
    Effect.mapError((cause) => new FileFailed({ path: WHOOP, cause })),
  );
  yield* checkFreshness(whoop.parsed, committed.date, Date.now());

  const whoopChanged = yield* write(WHOOP, whoop.raw);
  const overviewChanged = yield* write(OVERVIEW, overview.raw);
  const changed = whoopChanged || overviewChanged;

  const { recovery, trends } = whoop.parsed;
  const { system } = overview.parsed;
  yield* Console.log(
    `whoop ${whoop.parsed.date}: recovery ${recovery.score}, ${trends.workouts} workouts in ${trends.days}d` +
      ` · ${system.sources} sources, ${system.dataPoints} points`,
  );
  yield* Console.log(changed ? "changed" : "no change");

  const output = yield* Config.option(Config.String("GITHUB_OUTPUT")).pipe(
    Effect.orElseSucceed(() => Option.none()),
  );
  if (Option.isSome(output)) {
    yield* Effect.tryPromise({
      try: () => appendFile(output.value, `changed=${changed}\n`),
      catch: (cause) => new FileFailed({ path: output.value, cause }),
    });
  }
});

const describe = (error: Effect.Error<typeof program>): string => {
  switch (error._tag) {
    case "MissingEnv":
      return `${error.name} is not set. It is ${error.hint}`;
    case "LifeOsRequestFailed":
      return `life-os ${error.path} → ${error.detail}`;
    case "FileFailed":
      return `could not read or write ${error.path}: ${String(error.cause)}`;
    case "StoreBehind":
      return `refusing to publish ${error.fetched}: the committed snapshot is ${error.committed} and the store looks behind`;
    case "ReadingTooOld":
      return `latest whoop reading is ${error.ageDays} days old (${error.date}) — store or collector is behind`;
  }
};

const exit = await Effect.runPromiseExit(program);
if (Exit.isFailure(exit)) {
  const failure = Cause.findErrorOption(exit.cause);
  console.error(Option.isSome(failure) ? describe(failure.value) : Cause.pretty(exit.cause));
  process.exit(1);
}
