import { createFileRoute } from "@tanstack/react-router";
export const Route = createFileRoute("/uses/")({
  head: () => ({
    meta: [
      { title: "Uses — Einar Gudni" },
      { name: "description", content: "My tools, setup, and tech stack" },
      { property: "og:title", content: "Uses" },
      { property: "og:description", content: "My tools, setup, and tech stack" },
      { property: "og:image", content: "/og/uses.png" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: "/og/uses.png" },
    ],
  }),
});
