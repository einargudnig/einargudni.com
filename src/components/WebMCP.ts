import { Subscription } from "@effect/ui";
import { Html } from "@effect/ui/html";
import { Effect, Schedule, Schema, Stream } from "effect";

type WebMCPTool = {
  name: string;
  description: string;
  inputSchema: Record<string, unknown>;
  execute: (input: unknown) => unknown | Promise<unknown>;
};

type ModelContext = {
  provideContext?: (context: { tools: WebMCPTool[] }) => void;
};

const tools: WebMCPTool[] = [
  {
    name: "get_site_overview",
    description:
      "Return the llms.txt overview of einargudni.com: site map, agent guidance, and preferred citation targets. Use this first when asked about the site.",
    inputSchema: { type: "object", properties: {}, additionalProperties: false },
    execute: async () => {
      const res = await fetch("/llms.txt");
      return await res.text();
    },
  },
  {
    name: "get_blog_post_markdown",
    description:
      "Fetch the raw markdown source of a blog post by its slug (e.g. 'aeropress'). Prefer this over scraping HTML.",
    inputSchema: {
      type: "object",
      properties: { slug: { type: "string", description: "Post slug, e.g. 'aeropress'" } },
      required: ["slug"],
      additionalProperties: false,
    },
    execute: async (input: unknown) => {
      const slug = (input as { slug?: string })?.slug;
      if (!slug) throw new Error("slug is required");
      const res = await fetch(`/blog/${encodeURIComponent(slug)}`, {
        headers: { Accept: "text/markdown" },
      });
      if (!res.ok) throw new Error(`post not found: ${slug}`);
      return await res.text();
    },
  },
  {
    name: "get_deep_dive_markdown",
    description:
      "Fetch the raw markdown source of a deep-dive article by its slug (e.g. 'middleware').",
    inputSchema: {
      type: "object",
      properties: { slug: { type: "string", description: "Deep-dive slug" } },
      required: ["slug"],
      additionalProperties: false,
    },
    execute: async (input: unknown) => {
      const slug = (input as { slug?: string })?.slug;
      if (!slug) throw new Error("slug is required");
      const res = await fetch(`/deep-dive/${encodeURIComponent(slug)}`, {
        headers: { Accept: "text/markdown" },
      });
      if (!res.ok) throw new Error(`deep dive not found: ${slug}`);
      return await res.text();
    },
  },
];

const register = () => {
  const modelContext = (navigator as Navigator & { modelContext?: ModelContext }).modelContext;
  if (!modelContext?.provideContext) return false;
  try {
    modelContext.provideContext({ tools });
    return true;
  } catch {
    return false;
  }
};

// Spec is young and validators/polyfills sometimes inject after hydration.
// Try now, then every 100ms for ~5 seconds, then stop.
const registration = Stream.fromEffect(Effect.sync(register)).pipe(
  Stream.repeat(Schedule.spaced("100 millis")),
  Stream.takeUntil((registered) => registered),
  Stream.take(51),
  Stream.drain,
);

// Offers the site's tools to an in-browser agent through WebMCP. Renders
// nothing.
export const WebMCP = Html.component({
  name: "WebMCP",
  model: Schema.Struct({}),
  message: Schema.Never,
  restore: false,
}).make({
  init: () => ({}),
  update: ($) => $.model,
  subscriptions: () => [Subscription.make("register", registration)],
  view: (h) => h.text(""),
});
