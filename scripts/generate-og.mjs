// Replaces the nine next/og opengraph-image routes.
//
// This runs in Node before `vite build` rather than as a server route, because
// prerendering happens inside workerd and @resvg/resvg-js is a native addon
// that cannot load there. satori + resvg is the same engine next/og used, so
// the output matches the old design.
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { Resvg } from "@resvg/resvg-js";
import satori from "satori";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const outDir = join(root, "public", "og");

const WIDTH = 1200;
const HEIGHT = 630;

const fonts = [
  {
    name: "Geist",
    data: await readFile(join(root, "src/assets/fonts/Geist-Regular.ttf")),
    weight: 400,
    style: "normal",
  },
  {
    name: "Geist",
    data: await readFile(join(root, "src/assets/fonts/Geist-Bold.ttf")),
    weight: 700,
    style: "normal",
  },
];

const formatBlogDate = (date) =>
  new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });

// satori takes React-element-shaped objects; building them by hand keeps this
// script plain .mjs with no JSX transform.
const h = (type, props, ...children) => ({
  type,
  props: {
    ...props,
    // satori refuses any div without an explicit display; next/og applied
    // this default internally.
    style: { display: "flex", ...props?.style },
    children: children.flat().filter(Boolean),
  },
});

const badgeStyle = {
  display: "flex",
  alignItems: "center",
  backgroundColor: "#262626",
  padding: "12px 24px",
  borderRadius: "8px",
  fontSize: 24,
  color: "#a3a3a3",
  textTransform: "uppercase",
  letterSpacing: "0.1em",
  fontWeight: 600,
};

const template = ({ title, description, date, type }) =>
  h(
    "div",
    {
      style: {
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "space-between",
        backgroundColor: "#0a0a0a",
        padding: 80,
        fontFamily: "Geist",
      },
    },
    type &&
      h(
        "div",
        { style: badgeStyle },
        type === "blog"
          ? "Blog Post"
          : type === "deep-dive"
            ? "Deep Dive"
            : type === "use-case"
              ? "Use Case"
              : "",
      ),
    h(
      "div",
      {
        style: {
          display: "flex",
          flexDirection: "column",
          gap: 24,
          flex: 1,
          justifyContent: "center",
          width: "100%",
        },
      },
      h(
        "div",
        {
          style: {
            fontSize: 72,
            fontWeight: 700,
            color: "#ffffff",
            lineHeight: 1.1,
            maxWidth: "90%",
          },
        },
        title,
      ),
      description &&
        h(
          "div",
          {
            style: {
              fontSize: 32,
              color: "#a3a3a3",
              lineHeight: 1.4,
              maxWidth: "85%",
            },
          },
          description,
        ),
      date &&
        h(
          "div",
          {
            style: {
              display: "flex",
              alignItems: "center",
              backgroundColor: "#262626",
              padding: "8px 20px",
              borderRadius: 6,
              fontSize: 24,
              color: "#a3a3a3",
              // The column parent stretches children; the original relied on
              // width:auto to keep the pill hugging its text.
              alignSelf: "flex-start",
            },
          },
          date,
        ),
    ),
    h(
      "div",
      {
        style: {
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
        },
      },
      h("div", { style: { fontSize: 32, fontWeight: 600, color: "#ffffff" } }, "Einar Gudni"),
      h("div", { style: { fontSize: 24, color: "#737373" } }, "einargudni.com"),
    ),
  );

const render = async (name, options) => {
  const svg = await satori(template(options), { width: WIDTH, height: HEIGHT, fonts });
  const png = new Resvg(svg, { fitTo: { mode: "width", value: WIDTH } }).render().asPng();
  await writeFile(join(outDir, `${name}.png`), png);
  return name;
};

const STATIC_PAGES = [
  { name: "home", title: "Einar Gudni", description: "My home on the web" },
  {
    name: "about",
    title: "About Me",
    description: "Software engineer, builder, and lifelong learner",
    type: "page",
  },
  {
    name: "blog",
    title: "Blog",
    description: "Thoughts on software, tech, and building things",
    type: "page",
  },
  {
    name: "learnings",
    title: "Learnings",
    description: "Things I've learned along the way",
    type: "page",
  },
  { name: "notes", title: "Notes", description: "Quick thoughts and ideas", type: "page" },
  {
    name: "now",
    title: "What I'm doing now",
    description: "Current projects, interests, and focus areas",
    type: "page",
  },
  { name: "uses", title: "Uses", description: "My tools, setup, and tech stack", type: "page" },
  {
    name: "use-cases",
    title: "Use cases",
    description: "Products, integrations, AI agents and personal tools",
    type: "page",
  },
];

await mkdir(outDir, { recursive: true });

// Velite has already parsed and validated the frontmatter by this point, so
// this reads its output rather than re-parsing the MDX.
const readCollection = async (name) =>
  JSON.parse(await readFile(join(root, ".velite", `${name}.json`), "utf8"));

const [posts, deepDives, work] = await Promise.all([
  readCollection("posts"),
  readCollection("deepDives"),
  readCollection("work"),
]);

const generated = await Promise.all([
  ...STATIC_PAGES.map(({ name, ...options }) => render(name, options)),
  ...posts.map((post) =>
    render(`blog-${post.slug}`, {
      title: post.title,
      date: formatBlogDate(post.date),
      type: "blog",
    }),
  ),
  ...deepDives.map((dive) =>
    render(`deep-dive-${dive.slug}`, {
      title: dive.title,
      date: formatBlogDate(dive.date),
      type: "deep-dive",
    }),
  ),
  ...work
    .filter((entry) => !entry.draft)
    .map((entry) =>
      render(`use-cases-${entry.slug}`, {
        title: entry.title,
        date: entry.client,
        type: "use-case",
      }),
    ),
]);

console.log(`[og] generated ${generated.length} images into public/og/`);
