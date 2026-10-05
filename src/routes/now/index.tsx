import { createFileRoute } from "@tanstack/react-router";
import { ExternalLink } from "@/components/blog/external-link";
import { LifeOs } from "@/components/life-os";
import { LifeOsFeeds } from "@/components/life-os-feeds";
import { ArrowLeft } from "lucide-react";
import { Link } from "@/components/ui/link";

function RouteComponent() {
  return (
    <section className="w-full max-w-2xl space-y-8 print:space-y-6 mb-8">
      <div>
        <h1 className="text-4xl md:text-5xl font-semibold tracking-[-0.04em] leading-[1.05] text-balance">
          Now
        </h1>
        <p className="mt-1 text-sm font-mono text-muted-foreground">Updated 12. Jan, 2026</p>
      </div>
      <div className="prose prose-neutral dark:prose-invert text-pretty">
        <p className="text-brand text-lg font-mono">Baby</p>
        <p className="leading-relaxed max-w-[65ch]">
          Expecting our first baby this June! Super exciting and scary at the same time. One of
          things you can't get a lot of practice with beforehand.
        </p>
      </div>
      <div className="h-px bg-border/50" />
      <div className="prose prose-neutral dark:prose-invert text-pretty">
        <p className="text-brand text-lg font-mono">HYROX</p>
        <p className="leading-relaxed max-w-[65ch]">
          Back training for a HYROX competition in March 2026. This time it will be Pro Singles. The
          goal is to finish under 1:15:00. We just started a six weeks peak training block.
        </p>
      </div>
      <div className="h-px bg-border/50" />
      <div className="prose prose-neutral dark:prose-invert text-pretty">
        <p className="text-brand text-lg font-mono">Reading</p>
        <p className="leading-relaxed max-w-[65ch]">
          I am listening to{" "}
          <ExternalLink href="https://www.goodreads.com/book/show/204567.The_Expectant_Father?from_search=true&from_srp=true&qid=mAwSnMYB4F&rank=1">
            The Expectant Father: Facts, Tips and Advices for Dads-to-be
          </ExternalLink>{" "}
          It's time to prepare!
        </p>
      </div>
      <div className="h-px bg-border/50" />
      <LifeOs />
      <LifeOsFeeds />
      <div className="flex justify-start">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 p-2 -m-2 font-mono text-xs text-muted-foreground hover:text-brand transition-colors"
        >
          <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
          Home
        </Link>
      </div>
    </section>
  );
}

export const Route = createFileRoute("/now/")({
  head: () => ({
    meta: [
      { title: "What I'm doing now — Einar Gudni" },
      { name: "description", content: "Current projects, interests, and focus areas" },
      { property: "og:title", content: "What I'm doing now" },
      { property: "og:description", content: "Current projects, interests, and focus areas" },
      { property: "og:image", content: "/og/now.png" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: "/og/now.png" },
    ],
  }),
  component: RouteComponent,
});
