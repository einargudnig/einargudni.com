import { createFileRoute } from "@tanstack/react-router";
import { WorkList } from "@/components/work/work-list";
import { ENGAGEMENT_LABEL, orderWork, publishedWork, type WorkEntry } from "@/lib/work";

const GROUPS: Array<{ engagement: WorkEntry["engagement"]; blurb: string }> = [
  { engagement: "freelance", blurb: "Client work I've taken on as a contractor." },
  { engagement: "in-house", blurb: "Things I've built as an engineer at Maul." },
];

function RouteComponent() {
  return (
    <section className="w-full max-w-2xl space-y-10 mb-8">
      <div className="space-y-3">
        <h1 className="text-4xl md:text-5xl font-semibold tracking-[-0.04em] leading-[1.05] text-balance">
          Work
        </h1>
        <p className="text-muted-foreground leading-relaxed">
          Case studies, mostly about putting agents into systems that already exist and making them
          trustworthy there. Each one covers the problem, the constraints, the architecture, what
          shipped and what I'd do differently.
        </p>
      </div>

      {GROUPS.map(({ engagement, blurb }) => {
        const entries = orderWork(publishedWork.filter((entry) => entry.engagement === engagement));
        if (entries.length === 0) return null;
        return (
          <div key={engagement} className="space-y-3">
            <div>
              <h2 className="text-xl font-bold">{ENGAGEMENT_LABEL[engagement]}</h2>
              <p className="text-sm text-muted-foreground">{blurb}</p>
            </div>
            <WorkList entries={entries} />
          </div>
        );
      })}
    </section>
  );
}

const DESCRIPTION = "Case studies: freelance work and agent integrations";

export const Route = createFileRoute("/work/")({
  head: () => ({
    meta: [
      { title: "Work — Einar Gudni" },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: "Work" },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:image", content: "/og/work.png" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: "/og/work.png" },
    ],
  }),
  component: RouteComponent,
});
