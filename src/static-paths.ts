// Every page that isn't generated from content. The build prerenders all of
// them; the sitemap lists all but /baby, a family page it declines to
// advertise (robots.txt still allows it). No imports, so vite.config.ts can
// read it before the app's aliases exist.
export const UNLISTED_PATHS = ["/baby", "/chroncal/privacy", "/chroncal/terms"];

export const LISTED_PATHS = [
  "/",
  "/about",
  "/blog",
  "/learnings",
  "/notes",
  "/now",
  "/quotes",
  "/referrals",
  "/resolutions",
  "/someday",
  "/tldr/en",
  "/tldr/is",
  "/ts-mini",
  "/uses",
  "/uses/agents",
  "/uses/command-line",
  "/uses/desk",
  "/uses/devices",
  "/uses/infrastructure",
  "/uses/keyboard",
  "/uses/personal-software",
  "/use-cases",
];

export const STATIC_PATHS = [...LISTED_PATHS, ...UNLISTED_PATHS];
