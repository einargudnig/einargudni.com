// Compares every page in the live sitemap against a local build, to check a
// rewrite changed how the site is built and not what it says.
//
//   bun run build && bunx wrangler dev --port 8799 &
//   bun scripts/parity.ts [base=http://localhost:8799] [reference=https://einargudni.com]
//
// Exits non-zero when a page's status, title, description, og:image, h1 or
// set of outbound links differs, or its visible text falls below 90% overlap.

const [base = "http://localhost:8799", reference = "https://einargudni.com"] = process.argv.slice(2);

interface Page {
  status: number;
  title: string;
  description: string;
  ogImage: string;
  h1: string;
  links: Set<string>;
  words: Array<string>;
}

const decode = (text: string) =>
  text
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#x27;|&#39;/g, "'")
    .replace(/&#x([0-9a-f]+);/gi, (_, hex) => String.fromCodePoint(parseInt(hex, 16)));

// Whitespace is collapsed: a meta description that differs only in line
// breaks reads the same everywhere it is shown.
const first = (html: string, pattern: RegExp) =>
  decode(pattern.exec(html)?.[1] ?? "").replace(/\s+/g, " ").trim();

const meta = (html: string, key: string) =>
  first(html, new RegExp(`<meta[^>]+(?:name|property)="${key}"[^>]+content="([^"]*)"`, "i"));

// Visible text of <main>: scripts, styles, the hydration state and tags out.
const words = (html: string) =>
  decode(
    (/<main[\s\S]*<\/main>/i.exec(html)?.[0] ?? html)
      .replace(/<(script|style|template)[\s\S]*?<\/\1>/gi, " ")
      .replace(/<[^>]+>/g, " "),
  )
    .toLowerCase()
    .split(/\s+/)
    .filter((word) => /[\p{L}\p{N}]/u.test(word));

const read = async (origin: string, path: string): Promise<Page> => {
  const response = await fetch(origin + path, { redirect: "manual" });
  const html = await response.text();
  const main = /<main[\s\S]*<\/main>/i.exec(html)?.[0] ?? html;
  return {
    status: response.status,
    title: first(html, /<title[^>]*>([^<]*)<\/title>/i),
    description: meta(html, "description"),
    ogImage: meta(html, "og:image"),
    h1: first(main, /<h1[^>]*>([\s\S]*?)<\/h1>/i)
      .replace(/<script[\s\S]*?<\/script>/gi, "")
      .replace(/<[^>]+>/g, "")
      .trim(),
    links: new Set(
      [...main.matchAll(/href="(https?:[^"]+)"/g)].map((match) => decode(match[1] ?? "")),
    ),
    words: words(html),
  };
};

// Share of the reference's words (as a multiset) the candidate also has.
const overlap = (reference: Array<string>, candidate: Array<string>) => {
  if (reference.length === 0) return 1;
  const counts = new Map<string, number>();
  for (const word of candidate) counts.set(word, (counts.get(word) ?? 0) + 1);
  let shared = 0;
  for (const word of reference) {
    const left = counts.get(word) ?? 0;
    if (left > 0) {
      shared++;
      counts.set(word, left - 1);
    }
  }
  return shared / reference.length;
};

const sitemap = await (await fetch(`${reference}/sitemap.xml`)).text();
const paths = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => new URL(match[1] ?? "").pathname);

let failures = 0;
for (const path of paths) {
  const [want, got] = await Promise.all([read(reference, path), read(base, path)]);
  const problems: Array<string> = [];
  for (const key of ["status", "title", "description", "ogImage", "h1"] as const) {
    if (want[key] !== got[key]) problems.push(`${key}: ${JSON.stringify(want[key])} → ${JSON.stringify(got[key])}`);
  }
  const missing = [...want.links].filter((link) => !got.links.has(link));
  const added = [...got.links].filter((link) => !want.links.has(link));
  if (missing.length > 0) problems.push(`links missing: ${missing.join(" ")}`);
  if (added.length > 0) problems.push(`links added: ${added.join(" ")}`);
  const score = overlap(want.words, got.words);
  if (score < 0.9) problems.push(`text overlap ${(score * 100).toFixed(0)}%`);

  if (problems.length === 0) {
    console.log(`ok    ${path}  (text ${(score * 100).toFixed(0)}%)`);
  } else {
    failures++;
    console.log(`DIFF  ${path}\n      ${problems.join("\n      ")}`);
  }
}

console.log(`\n${paths.length - failures}/${paths.length} pages match`);
process.exit(failures > 0 ? 1 : 0);
