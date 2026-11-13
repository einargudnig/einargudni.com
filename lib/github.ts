import { queryOptions } from "@tanstack/react-query";
import { createServerFn } from "@tanstack/react-start";
import { Effect } from "effect";
import { contributions } from "@/lib/github.server";

export type { ContributionData, ContributionDay } from "@/lib/github.server";

const CACHE_SECONDS = 3600;

const fetchContributions = createServerFn()
  .inputValidator((username: string) => username)
  .handler(({ data: username }) => Effect.runPromise(contributions(username)));

export const contributionsQueryOptions = (username: string) =>
  queryOptions({
    queryKey: ["github-contributions", username],
    queryFn: () => fetchContributions({ data: username }),
    staleTime: CACHE_SECONDS * 1000,
  });
