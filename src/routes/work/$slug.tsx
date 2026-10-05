import { createFileRoute, notFound } from "@tanstack/react-router";
import { Balancer } from "react-wrap-balancer";
import { MDXContent } from "@/components/mdx-content";
import { Link } from "@/components/ui/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { ENGAGEMENT_LABEL, findWork, formatPeriod, relatedTitle } from "@/lib/work";

export const Route = createFileRoute("/work/$slug")({
  loader: ({ params }) => {
    if (!findWork(params.slug)) throw notFound();
  },
  head: ({ params }) => {
    const entry = findWork(params.slug);
    if (!entry) return {};
    const image = `/og/work-${entry.slug}.png`;
    return {
      meta: [
        { title: `${entry.title} — Einar Gudni` },
        { name: "description", content: entry.summary },
        { property: "og:title", content: entry.title },
        { property: "og:description", content: entry.summary },
        { property: "og:image", content: image },
        { property: "og:type", content: "article" },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:image", content: image },
      ],
    };
  },
  component: CaseStudy,
});

const Fact = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <div>
    <dt className="font-mono text-xs text-muted-foreground">{label}</dt>
    <dd className="mt-0.5 text-sm">{children}</dd>
  </div>
);

function CaseStudy() {
  const { slug } = Route.useParams();
  const entry = findWork(slug);
  if (!entry) throw notFound();

  return (
    <section className="w-full max-w-2xl space-y-8 print:space-y-6">
      <div>
        <Link
          href="/work"
          className="inline-flex items-center gap-1 font-mono text-xs text-muted-foreground hover:text-brand transition-colors"
        >
          <ArrowLeft className="h-3 w-3" aria-hidden="true" />
          All work
        </Link>
        <h1 className="mt-4 text-4xl md:text-5xl font-semibold tracking-[-0.035em] leading-[1.05] max-w-[22ch]">
          <Balancer>{entry.title}</Balancer>
        </h1>
        <p className="mt-4 max-w-[58ch] text-lg text-muted-foreground leading-relaxed text-pretty">
          {entry.summary}
        </p>

        <dl className="mt-8 grid grid-cols-2 gap-x-4 gap-y-4 rounded-lg border border-border/60 bg-card/60 p-4 md:p-5 sm:grid-cols-4">
          <Fact label="Client">
            {entry.clientUrl ? (
              <a href={entry.clientUrl} className="hover:text-brand transition-colors">
                {entry.client}
              </a>
            ) : (
              entry.client
            )}
          </Fact>
          <Fact label="Engagement">{ENGAGEMENT_LABEL[entry.engagement]}</Fact>
          <Fact label="Role">{entry.role}</Fact>
          <Fact label="Period">
            <span className="font-mono tabular-nums">{formatPeriod(entry)}</span>
          </Fact>
          <div className="col-span-2 sm:col-span-4 border-t border-border/50 pt-4">
            <dt className="font-mono text-xs text-brand">Outcome</dt>
            <dd className="mt-1 text-base font-medium leading-snug text-pretty">{entry.outcome}</dd>
          </div>
          <div className="col-span-2 sm:col-span-4">
            <dt className="sr-only">Stack</dt>
            <dd className="font-mono text-xs text-muted-foreground">{entry.stack.join(" · ")}</dd>
          </div>
        </dl>
      </div>

      <article className="prose dark:prose-invert max-w-[65ch] leading-relaxed">
        <MDXContent path={entry.path} draft={entry.draft} />
      </article>

      <aside className="rounded-lg border border-border/60 p-5 md:p-6">
        <p className="text-lg font-semibold tracking-tight">Building something like this?</p>
        <p className="mt-1 max-w-[52ch] text-muted-foreground leading-relaxed">
          If you have a system that could use an agent, or an agent that needs to be trusted in
          production, tell me about it.
        </p>
        <Link
          href="/#contact"
          className="mt-4 inline-flex items-center gap-1.5 rounded-md bg-foreground px-4 py-2 text-sm font-medium text-background transition-[background-color,transform] duration-200 ease-[var(--ease-out)] hover:bg-brand active:scale-[0.98]"
        >
          Get in touch
          <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
        </Link>
      </aside>

      {entry.related.length > 0 && (
        <aside className="border-t border-border/50 pt-6">
          <h2 className="font-mono text-xs text-muted-foreground">Related writing</h2>
          <ul className="mt-2 space-y-1">
            {entry.related.map((path) => (
              <li key={path}>
                <Link href={path} className="text-sm hover:text-brand transition-colors">
                  {relatedTitle(path)}
                </Link>
              </li>
            ))}
          </ul>
        </aside>
      )}
    </section>
  );
}
