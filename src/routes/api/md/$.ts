import { createFileRoute } from "@tanstack/react-router";
import { deepDives, posts, work } from "@/.velite";

const lookup = (type?: string, slug?: string): string | undefined => {
  if (!type || !slug) return undefined;
  if (type === "blog") return posts.find((p) => p.slug === slug && !p.draft)?.body;
  if (type === "deep-dive") return deepDives.find((d) => d.slug === slug && !d.draft)?.body;
  if (type === "work") return work.find((w) => w.slug === slug && !w.draft)?.body;
  return undefined;
};

export const Route = createFileRoute("/api/md/$")({
  server: {
    handlers: {
      GET: ({ params }) => {
        const [type, slug] = (params._splat ?? "").split("/");
        const body = lookup(type, slug);
        if (!body) return new Response("Not found", { status: 404 });

        return new Response(body, {
          headers: { "Content-Type": "text/markdown; charset=utf-8" },
        });
      },
    },
  },
});
