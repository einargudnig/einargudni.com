import { createFileRoute, notFound } from "@tanstack/react-router";
import { Balancer } from "react-wrap-balancer";
import { deepDives } from "@/.velite";
import { MDXContent } from "@/components/mdx-content";
import { formatBlogDate } from "@/lib/utils";

export const Route = createFileRoute("/deep-dive/$slug")({
  loader: ({ params }) => {
    if (!deepDives.some((d) => d.slug === params.slug)) throw notFound();
  },
  head: ({ params }) => {
    const dive = deepDives.find((d) => d.slug === params.slug);
    if (!dive) return {};
    const image = `/og/deep-dive-${dive.slug}.png`;
    return {
      meta: [
        { title: `${dive.title} — Einar Gudni` },
        { property: "og:title", content: dive.title },
        { property: "og:image", content: image },
        { property: "og:type", content: "article" },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:image", content: image },
      ],
    };
  },
  component: DeepDive,
});

function DeepDive() {
  const { slug } = Route.useParams();
  const dive = deepDives.find((d) => d.slug === slug);
  if (!dive) throw notFound();

  return (
    <section className="w-full max-w-2xl space-y-8 print:space-y-6">
      <div>
        <h1 className="text-4xl md:text-5xl font-semibold tracking-[-0.035em] leading-[1.05] max-w-[22ch]">
          <Balancer>{dive.title}</Balancer>
        </h1>
        <div className="flex items-center gap-3 mt-4 mb-8">
          <div className="font-mono text-sm text-muted-foreground tabular-nums tracking-tighter">
            {formatBlogDate(dive.date)}
          </div>
          <div className="h-px flex-1 bg-border/50" />
        </div>
      </div>
      <article className="prose dark:prose-invert max-w-[65ch] leading-relaxed">
        <MDXContent path={dive.path} draft={dive.draft} />
      </article>
    </section>
  );
}
