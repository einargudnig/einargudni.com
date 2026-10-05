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
};

const writingTitles = new Map<string, string>(
  [...posts, ...deepDives].map((entry) => [entry.permalink, entry.title]),
);

// `related` is validated at build time, so the path fallback is only reached in dev.
export const relatedTitle = (path: string) => writingTitles.get(path) ?? path;

const year = (iso: string) => new Date(iso).getFullYear();

export const formatPeriod = ({ start, end }: Pick<WorkEntry, "start" | "end">) => {
  const from = year(start);
  if (!end) return `${from} – Present`;
  const to = year(end);
  return from === to ? `${from}` : `${from} – ${to}`;
};

// Decides what a visitor reads first on /work and in "Selected work" on the
// homepage, so it is a positioning call as much as a sort. Applied within each
// engagement group, so it never mixes freelance and in-house entries.
//
// Fields available: start, end (undefined = ongoing), kind ("agent" |
// "product" | "web"), featured, title.
export const orderWork = (entries: WorkEntry[]): WorkEntry[] => {
  // TODO(einar): choose the ordering. Return a new array, don't sort in place.
  return [...entries];
};
