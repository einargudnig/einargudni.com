import { createFileRoute, notFound } from "@tanstack/react-router";
import { Balancer } from "react-wrap-balancer";
import { posts } from "@/.velite";
import { MDXContent } from "@/components/mdx-content";
import { formatBlogDate } from "@/lib/utils";

export const Route = createFileRoute("/blog/$slug")({
  // Existence is checked here so a bad slug 404s instead of rendering; the
  // post itself is read from the build-time import rather than returned, to
  // keep the compiled MDX out of the serialized loader payload.
  loader: ({ params }) => {
    if (!posts.some((p) => p.slug === params.slug)) throw notFound();
  },
  head: ({ params }) => {
    const post = posts.find((p) => p.slug === params.slug);
    if (!post) return {};
    const image = `/og/blog-${post.slug}.png`;
    return {
      meta: [
        { title: `${post.title} — Einar Gudni` },
        { name: "description", content: post.excerpt },
        { property: "og:title", content: post.title },
        { property: "og:description", content: post.excerpt },
        { property: "og:image", content: image },
        { property: "og:type", content: "article" },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:image", content: image },
      ],
    };
  },
  component: BlogPost,
});

function BlogPost() {
  const { slug } = Route.useParams();
  const post = posts.find((p) => p.slug === slug);
  if (!post) throw notFound();

  return (
    <section className="w-full max-w-2xl space-y-8 print:space-y-6">
      <div>
        <h1 className="text-4xl md:text-5xl font-semibold tracking-[-0.035em] leading-[1.05] max-w-[22ch]">
          <Balancer>{post.title}</Balancer>
        </h1>
        <div className="flex items-center gap-3 mt-4 mb-8">
          <div className="font-mono text-sm text-muted-foreground tabular-nums tracking-tighter">
            {formatBlogDate(post.date)}
          </div>
          <div className="h-px flex-1 bg-border/50" />
        </div>
      </div>
      <article className="prose dark:prose-invert max-w-[65ch] leading-relaxed">
        <MDXContent path={post.path} draft={post.draft} />
      </article>
    </section>
  );
}
