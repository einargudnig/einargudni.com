import { Html } from "@effect/ui/html";
import { Schema } from "effect";
import { ENGAGEMENT_LABEL, orderWork, publishedWork, type WorkEntry } from "@/lib/work";
import { pageHead } from "../../components/head.ts";
import { Ledger, LedgerEmpty } from "../../components/Ledger.ts";
import { WorkList } from "../../components/WorkList.ts";

const GROUPS: ReadonlyArray<{ engagement: WorkEntry["engagement"]; blurb: string }> = [
  { engagement: "freelance", blurb: "Client work I've taken on as a contractor." },
  { engagement: "in-house", blurb: "Things I've built as an engineer at Maul." },
  { engagement: "personal", blurb: "Tools I built for my own use." },
];

const DESCRIPTION = "Use cases: products, integrations, AI agents and personal tools";

export const UseCasesPage = Html.component({
  name: "UseCasesPage",
  model: Schema.Struct({}),
  message: Schema.Never,
}).make({
  init: () => ({}),
  update: ($) => $.model,
  head: () =>
    pageHead({ title: "Use cases", description: DESCRIPTION, image: "/og/use-cases.png" }),
  view: (h) =>
    h.section.class("w-full space-y-16 mb-8").children(
      h.div
        .class("max-w-2xl space-y-4")
        .children(
          h.h1
            .class(
              "text-4xl md:text-5xl font-semibold tracking-[-0.04em] leading-[1.05] text-balance",
            )
            .children("Use cases"),
          h.p
            .class("text-lg text-muted-foreground leading-relaxed text-pretty")
            .children(
              "Write-ups of solutions I've built: products, integrations and, more and more, agents inside systems that already exist. Each one covers the problem, the constraints, the architecture, what shipped and what I'd do differently.",
            ),
        ),
      publishedWork.length === 0
        ? LedgerEmpty(h).children("The first use cases are being written up.")
        : null,
      GROUPS.map(({ engagement, blurb }) => {
        const entries = orderWork(publishedWork.filter((entry) => entry.engagement === engagement));
        if (entries.length === 0) return null;
        return Ledger(h, {
          title: ENGAGEMENT_LABEL[engagement],
          aside: blurb,
          children: [WorkList(h, entries)],
        }).key(engagement);
      }),
    ),
});
