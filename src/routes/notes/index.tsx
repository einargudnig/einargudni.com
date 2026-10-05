import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@/components/ui/link";
import { learnings, links } from "@/.velite";
import { MDXContent } from "@/components/mdx-content";
import { formatBlogDate } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ArrowTopRightIcon } from "@radix-ui/react-icons";
import { NotesTabs } from "@/components/notes-tabs";

function RouteComponent() {
  const sortedLearnings = [...learnings].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );

  const sortedLinks = [...links].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );

  return (
    <section className="w-full max-w-2xl space-y-10 print:space-y-8 mb-8">
      <h1 className="text-4xl md:text-5xl font-semibold tracking-[-0.04em] leading-[1.05] text-balance mb-6">
        Notes
      </h1>

      <NotesTabs
        notes={
          <div className="divide-y divide-border/50 stagger-list">
            {sortedLearnings.map((item) => (
              <div key={`${item.topic}-${item.date}`} className="py-8 first:pt-0">
                <article className="prose dark:prose-invert mb-3">
                  <header className="mb-4">
                    <h2 className="text-xl font-semibold">{item.title}</h2>
                    <div className="text-sm text-muted-foreground flex items-center gap-2">
                      <span className="text-brand font-mono">{item.topic}</span>
                      <span>·</span>
                      <time className="font-mono tabular-nums" dateTime={item.date}>
                        {formatBlogDate(item.date)}
                      </time>
                      {item.deepDiveSlug && (
                        <Link href={`/deep-dive/${item.deepDiveSlug}`} className="no-underline">
                          <Button size="sm" variant="outline">
                            Deep Dive
                          </Button>
                        </Link>
                      )}
                    </div>
                  </header>
                  {item.path ? <MDXContent path={item.path} enableTableOfContents={false} /> : null}
                </article>
              </div>
            ))}
          </div>
        }
        links={
          <div className="divide-y divide-border/50 stagger-list">
            {sortedLinks.map((item) => (
              <div key={item.url} className="py-6 first:pt-0">
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="space-y-1.5">
                      <h2 className="text-base font-semibold group-hover:text-brand transition-colors">
                        {item.title}
                        <ArrowTopRightIcon className="inline-block ml-1.5 h-3.5 w-3.5 opacity-0 -translate-y-0.5 group-hover:opacity-60 group-hover:translate-y-0 transition-[opacity,transform] duration-150" />
                      </h2>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {item.description}
                      </p>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground/70">
                        <time className="font-mono tabular-nums" dateTime={item.date}>
                          {formatBlogDate(item.date)}
                        </time>
                        {item.tags && item.tags.length > 0 && (
                          <>
                            <span>·</span>
                            {item.tags.map((tag) => (
                              <span key={tag} className="text-brand/70 font-mono">
                                {tag}
                              </span>
                            ))}
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </a>
              </div>
            ))}
            {sortedLinks.length === 0 && (
              <p className="text-muted-foreground text-sm py-8">No links yet.</p>
            )}
          </div>
        }
      />
    </section>
  );
}

export const Route = createFileRoute("/notes/")({
  head: () => ({
    meta: [
      { title: "Notes — Einar Gudni" },
      { name: "description", content: "Quick thoughts and ideas" },
      { property: "og:title", content: "Notes" },
      { property: "og:description", content: "Quick thoughts and ideas" },
      { property: "og:image", content: "/og/notes.png" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: "/og/notes.png" },
    ],
  }),
  component: RouteComponent,
});
