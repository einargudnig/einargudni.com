import { Data, Effect, Schedule, Schema } from "effect";

const ContributionDay = Schema.Struct({
  date: Schema.String,
  count: Schema.Number,
  level: Schema.Number,
});
export type ContributionDay = typeof ContributionDay.Type;

const ContributionData = Schema.Struct({
  total: Schema.Struct({ lastYear: Schema.Number }),
  contributions: Schema.Array(ContributionDay),
});
export type ContributionData = typeof ContributionData.Type;

class UpstreamFailed extends Data.TaggedError("UpstreamFailed")<{ detail: string }> {}

export const contributions = (username: string) =>
  Effect.tryPromise({
    try: (signal) =>
      fetch(`https://github-contributions-api.jogruber.de/v4/${username}?y=last`, {
        signal,
        cf: { cacheTtl: 3600, cacheEverything: true },
      } as RequestInit & { cf: Record<string, unknown> }),
    catch: (cause) => new UpstreamFailed({ detail: String(cause) }),
  }).pipe(
    Effect.filterOrFail(
      (res) => res.ok,
      (res) => new UpstreamFailed({ detail: `status ${res.status}` }),
    ),
    Effect.flatMap((res) =>
      Effect.tryPromise({
        try: () => res.json(),
        catch: () => new UpstreamFailed({ detail: "response is not JSON" }),
      }),
    ),
    Effect.flatMap(Schema.decodeUnknownEffect(ContributionData)),
    Effect.timeout("3 seconds"),
    Effect.retry({ times: 1, schedule: Schedule.exponential("200 millis") }),
    Effect.tapError((error) => Effect.logWarning("github contributions unavailable", error)),
    // The graph is decorative; a dead upstream should not fail the homepage.
    Effect.orElseSucceed(() => null),
  );
