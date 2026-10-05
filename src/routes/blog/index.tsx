import { createFileRoute } from "@tanstack/react-router";
import { posts } from "@/.velite";
import { Link } from "@/components/ui/link";
import { formatShortDate } from "@/lib/utils";
import { Ledger, LedgerEmpty } from "@/components/ledger";

function RouteComponent() {
  // Drafts stay reachable by URL (they render with an "under construction"
  // banner) but are not listed.
  const sortedPosts = posts
    .filter((post) => !post.draft)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <section className="w-full space-y-12 mb-8">
      <h1 className="text-4xl md:text-5xl font-semibold tracking-[-0.04em] leading-[1.05] text-balance">
        Blog
      </h1>

      <Ledger title="Posts" aside={sortedPosts.length}>
        {sortedPosts.length === 0 && <LedgerEmpty>No posts yet.</LedgerEmpty>}
        <ol>
          {sortedPosts.map((post) => (
            <li key={post.slug} className="border-t border-border first:border-t-0">
              <Link
                href={`/blog/${post.slug}`}
                className="group grid gap-x-6 gap-y-0.5 py-3 sm:grid-cols-[7rem_1fr]"
              >
                <span className="text-sm text-muted-foreground tabular-nums sm:pt-0.5">
                  {formatShortDate(post.date)}
                </span>
                <span className="font-medium underline-offset-4 decoration-1 group-hover:text-brand group-hover:underline">
                  {post.title}
                </span>
              </Link>
            </li>
          ))}
        </ol>
        <LedgerEmpty>Older posts are still being migrated from the previous site.</LedgerEmpty>
      </Ledger>
    </section>
  );
}

export const Route = createFileRoute("/blog/")({
  head: () => ({
    meta: [
      { title: "Blog — Einar Gudni" },
      { name: "description", content: "Thoughts on software, tech, and building things" },
      { property: "og:title", content: "Blog" },
      { property: "og:description", content: "Thoughts on software, tech, and building things" },
      { property: "og:image", content: "/og/blog.png" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: "/og/blog.png" },
    ],
  }),
  component: RouteComponent,
});
