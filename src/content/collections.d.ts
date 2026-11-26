// `virtual:content` is velite's output without `body`, the raw source served
// to Accept: text/markdown. Pages read it; only the Worker needs the bodies,
// and it imports `@/.velite` directly.
declare module "virtual:content" {
  import type { DeepDive, Learning, Link, Post, Quote, Work } from "@/.velite";
  export const posts: ReadonlyArray<Omit<Post, "body">>;
  export const deepDives: ReadonlyArray<Omit<DeepDive, "body">>;
  export const work: ReadonlyArray<Omit<Work, "body">>;
  export const learnings: ReadonlyArray<Learning>;
  export const links: ReadonlyArray<Link>;
  export const quotes: ReadonlyArray<Quote>;
}
