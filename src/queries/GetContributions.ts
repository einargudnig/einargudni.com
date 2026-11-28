import { Query } from "@effect/ui";
import { Effect, Schema } from "effect";
import { ContributionData, contributions } from "@/lib/github.server";

export class ContributionsUnavailable extends Schema.TaggedError<ContributionsUnavailable>()(
  "ContributionsUnavailable",
  { username: Schema.String },
) {}

// The upstream API sends `access-control-allow-origin: *`, so the browser asks
// it directly. The prerender bakes in the graph as it was at build time, and
// a visit more than an hour later fetches a fresh one.
export class GetContributions extends Query.Service<GetContributions>()("github/GetContributions", {
  args: { username: Schema.String },
  success: ContributionData,
  error: ContributionsUnavailable,
  staleTime: "1 hour",
}) {
  static readonly layer = this.toLayer(
    Effect.succeed(({ username }) =>
      contributions(username).pipe(
        Effect.flatMap((data) =>
          data ? Effect.succeed(data) : Effect.fail(new ContributionsUnavailable({ username })),
        ),
      ),
    ),
  );
}
