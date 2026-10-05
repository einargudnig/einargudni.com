import { deepDives, posts, work } from "@/.velite";

export type WorkEntry = (typeof work)[number];

// Drafts render in dev so they can be previewed; vite.config.ts keeps them
// out of the prerendered build, and this keeps them out of every list.
export const isPublished = (entry: WorkEntry) => import.meta.env.DEV || !entry.draft;

export const publishedWork = work.filter(isPublished);

export const findWork = (slug: string) => publishedWork.find((entry) => entry.slug === slug);

export const ENGAGEMENT_LABEL: Record<WorkEntry["engagement"], string> = {
  freelance: "Freelance",
  "in-house": "In-house at Maul",
  personal: "Personal",
};

const writingTitles = new Map<string, string>(
  [...posts, ...deepDives].map((entry) => [entry.permalink, entry.title]),
);

// `related` is validated at build time, so the path fallback is only reached in dev.
export const relatedTitle = (path: string) => writingTitles.get(path) ?? path;

// "Sep 2026": the month the work started. UTC, so an ISO date never slips a month.
export const formatMonth = ({ start }: Pick<WorkEntry, "start">) =>
  new Date(start).toLocaleDateString("en-US", { month: "short", year: "numeric", timeZone: "UTC" });

// Newest first. `start` is an ISO date, so string order is date order.
export const orderWork = (entries: WorkEntry[]): WorkEntry[] =>
  entries.toSorted((a, b) => b.start.localeCompare(a.start));
