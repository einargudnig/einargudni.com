import type { ReactNode } from "react";
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

// One ruled row of the facts table: label in the first column, value after.
const Fact = ({ label, children }: { label: string; children: ReactNode }) => (
  <div className="grid grid-cols-[7rem_1fr] gap-x-6 border-b border-border py-2.5">
    <dt className="text-muted-foreground">{label}</dt>
    <dd>{children}</dd>
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
          className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-brand transition-colors"
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

        <dl className="mt-10 border-t border-foreground text-sm">
          <Fact label="Client">
            {entry.clientUrl ? (
              <a
                href={entry.clientUrl}
                className="underline decoration-1 underline-offset-4 hover:text-brand transition-colors"
              >
                {entry.client}
              </a>
            ) : (
              entry.client
            )}
          </Fact>
          <Fact label="Engagement">{ENGAGEMENT_LABEL[entry.engagement]}</Fact>
          <Fact label="Role">{entry.role}</Fact>
          <Fact label="Period">
            <span className="tabular-nums">{formatPeriod(entry)}</span>
          </Fact>
          <Fact label="Stack">
            <span className="text-muted-foreground">{entry.stack.join(", ")}</span>
          </Fact>
          <Fact label="Outcome">
            <span className="text-base font-medium leading-snug text-pretty">{entry.outcome}</span>
          </Fact>
        </dl>
      </div>

      <article className="prose dark:prose-invert max-w-[65ch] leading-relaxed">
        <MDXContent path={entry.path} draft={entry.draft} />
      </article>

      <aside className="border-t border-foreground pt-3">
        <p className="font-semibold tracking-tight">Building something like this?</p>
        <p className="mt-1 max-w-[52ch] text-muted-foreground leading-relaxed">
          If you have a system that could use an agent, or an agent that needs to be trusted in
          production, tell me about it.
        </p>
        <Link
          href="/#contact"
          className="mt-4 inline-flex items-center gap-1.5 rounded-sm bg-brand px-4 py-2 font-medium text-brand-foreground transition-[filter,transform] duration-200 ease-[var(--ease-out)] hover:brightness-110 active:scale-[0.98]"
        >
          Work with me
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </aside>

      {entry.related.length > 0 && (
        <aside className="border-t border-border pt-3">
          <h2 className="text-sm text-muted-foreground">Related writing</h2>
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
