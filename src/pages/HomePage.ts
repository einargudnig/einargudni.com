import { Html, HtmlHead } from "@effect/ui/html";
import { Schema } from "effect";
import { ArrowRight, ArrowUpRight } from "lucide";
import { deepDives, posts } from "virtual:content";
import { formatShortDate } from "@/lib/utils";
import { whoopSnapshot } from "@/lib/whoop";
import { orderWork, publishedWork } from "@/lib/work";
import { GitHubContributions } from "../components/GitHubContributions.ts";
import { HireMe } from "../components/HireMe.ts";
import { Icon } from "../components/Icon.ts";
import { Ledger, LedgerEmpty } from "../components/Ledger.ts";
import { LifeOsHealth } from "../components/LifeOsHealth.ts";
import { WhoopStats } from "../components/WhoopStats.ts";
import { WorkList } from "../components/WorkList.ts";
import { AppRoute } from "../routes.ts";

const CONTACT = `${AppRoute.print(AppRoute.Home())}#contact`;
const USE_CASES = AppRoute.print(AppRoute.UseCases());

const projects: ReadonlyArray<{
  readonly title: string;
  readonly description: string;
  readonly href: string;
  readonly tags: ReadonlyArray<string>;
  readonly external?: false;
}> = [
  {
    title: "posture",
    description:
      "A macOS app that reads your AirPods' motion sensors and tells you when you've been slouching, from a live strip beside the notch.",
    href: "https://posture.einargudni.com",
    tags: ["Swift", "macOS", "AirPods"],
  },
  {
    title: "pdl",
    description:
      "Tracks a weekly padel group's matches, standings and streaks. Mobile-first, on Cloudflare Workers and D1.",
    href: "https://pdl.einargudni.workers.dev",
    tags: ["React", "Hono", "D1"],
  },
  {
    title: "eggo",
    description:
      "The Icelandic landing site for Eggo, a small software and tech consultancy, with a working contact form.",
    href: "https://www.eggo.is",
    tags: ["Astro", "Cloudflare"],
  },
  {
    title: "team tally",
    description:
      "An offline, no-account mobile app for tracking player fines in team sports, with a waitlist landing page.",
    href: "https://team-tally-psi.vercel.app",
    tags: ["Expo", "SQLite", "Astro"],
  },
  {
    title: "les",
    description:
      "A native macOS RSS and read-it-later app: OPML import, bookmarks, Readability article text and full-text search.",
    href: "https://github.com/einargudnig/les",
    tags: ["Swift", "AppKit", "SQLite"],
  },
  {
    title: "jstop",
    description:
      "A macOS menu bar app that monitors node processes. Like htop, but for your Node.js toolkit.",
    href: "https://github.com/einargudnig/jstop",
    tags: ["Swift", "macOS"],
  },
  {
    title: "ts-mini",
    description:
      "Interactive visualization of the TypeScript compiler pipeline. Explore how code gets scanned, parsed, and emitted.",
    href: AppRoute.print(AppRoute.TsMini()),
    tags: ["TypeScript", "React", "Shiki"],
    external: false,
  },
  {
    title: "dotfiles",
    description:
      "My personal development environment. Neovim, tmux, zsh, and macOS configuration managed with care.",
    href: "https://github.com/einargudnig/dotfiles",
    tags: ["Neovim", "Zsh", "macOS"],
  },
  {
    title: "einargudni.com",
    description:
      "This site. Built with TanStack Start, Velite for MDX content, and Tailwind v4. Deployed on Cloudflare Workers.",
    href: "https://github.com/einargudnig/einargudni.com",
    tags: ["TanStack", "MDX", "Tailwind"],
  },
  {
    title: "todo-system",
    description:
      "A CLI-powered task management system with Taskwarrior, syncing to Things 3 and Asana.",
    href: "https://github.com/einargudnig/todo-system",
    tags: ["CLI", "Taskwarrior", "Productivity"],
  },
  {
    title: "baby",
    description: "A countdown and tracker for the newest member of the family.",
    href: AppRoute.print(AppRoute.Baby()),
    tags: ["convex"],
    external: false,
  },
  {
    title: "sól og bjór",
    description:
      "Ranks Reykjavík bars by the cheapest beer and the most sun right now. Mobile-first, with a sun-aware shade map.",
    href: "https://sologbjor.einargudni.com",
    tags: ["React", "Cloudflare", "Bun"],
  },
  {
    title: "nido",
    description:
      "A private little app for remembering who gave you what when a baby arrives — so the kindness gets thanked and the loans get returned.",
    href: "https://nido.einargudni.com",
    tags: ["Family", "Privacy-first"],
  },
];

const work = [
  {
    company: "Maul",
    link: "https://maul.is",
    badges: [],
    title: "Software Developer",
    start: "2020",
    end: "Present",
  },
  {
    company: "Tiffin",
    link: "https://tiffin.dk",
    badges: ["Remote"],
    title: "Software Developer",
    start: "2022",
    end: "2024",
  },
  {
    company: "Freelance",
    link: USE_CASES,
    badges: ["Remote"],
    title: "Software Developer",
    start: "2022",
    end: "Present",
  },
] satisfies ReadonlyArray<{
  company: string;
  link: string;
  badges: ReadonlyArray<string>;
  title: string;
  start: string;
  end: string;
}>;

// Three is what fits a first read; /use-cases has the rest.
const selectedWork = orderWork(publishedWork.filter((entry) => entry.featured)).slice(0, 3);

const latestWriting = [
  ...posts.filter((post) => !post.draft).map((post) => ({ ...post, kind: "Post" })),
  ...deepDives.filter((dive) => !dive.draft).map((dive) => ({ ...dive, kind: "Deep dive" })),
]
  .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  .slice(0, 5);

const ELSEWHERE = [
  { href: AppRoute.print(AppRoute.About()), title: "About", blurb: "Who, what, why" },
  { href: AppRoute.print(AppRoute.Now()), title: "Now", blurb: "Short-term focus" },
  { href: AppRoute.print(AppRoute.Someday()), title: "Someday", blurb: "Long-term focus" },
];

const rowLink =
  "group grid gap-x-6 gap-y-0.5 border-t border-border py-3 first:border-t-0 sm:grid-cols-[7rem_1fr_auto]";
const rowTitle = "underline-offset-4 decoration-1 group-hover:text-brand group-hover:underline";

const DESCRIPTION =
  "Einar Gudni builds solutions that fit your systems: products, integrations and AI agents. Use cases, writing and projects.";

const Hero = <M>(h: Html.H<M>) =>
  h.section
    .class("space-y-8")
    .children(
      h.h1
        .class(
          "max-w-[18ch] text-[2.75rem] font-semibold leading-[1.02] tracking-[-0.04em] text-balance md:text-7xl",
        )
        .children("I build solutions that fit your systems."),
      h.div
        .class("grid gap-6 md:grid-cols-[1fr_auto] md:items-end md:gap-10")
        .children(
          h.div
            .class(
              "max-w-[54ch] space-y-3 text-lg leading-relaxed text-muted-foreground text-pretty",
            )
            .children(
              h.p.children(
                "Product features, internal tools, integrations and, lately, AI agents, with the evals and guardrails that make them safe to ship. Software developer at Maul and independent contractor.",
              ),
              h.p
                .class("text-base")
                .children(
                  h.span.class("font-medium text-foreground").children("Builder."),
                  " Curious, tinkerer, late bloomer & nerd.",
                ),
            ),
          h.div
            .class("flex items-center gap-5")
            .children(
              h.a
                .attr("href", CONTACT)
                .class(
                  "rounded-sm bg-brand px-4 py-2 font-medium text-brand-foreground transition-[filter,transform] duration-200 ease-[var(--ease-out)] hover:brightness-110 active:scale-[0.98]",
                )
                .children("Work with me"),
              h.a
                .attr("href", USE_CASES)
                .class(
                  "underline decoration-1 underline-offset-4 transition-colors hover:text-brand",
                )
                .children("Use cases"),
            ),
        ),
    );

const SelectedWork = <M>(h: Html.H<M>) =>
  selectedWork.length > 0
    ? WorkList(h, selectedWork)
    : LedgerEmpty(h).children(
        "The first use cases are being written up. ",
        h.a
          .attr("href", CONTACT)
          .class("text-brand underline-offset-4 hover:underline")
          .children("Ask me about them"),
        ".",
      );

const Project = <M>(h: Html.H<M>, project: (typeof projects)[number]) => {
  const external = project.external !== false;
  const link = h.a.attr("href", project.href);
  return h.li
    .key(project.title)
    .children(
      (external ? link.attr("target", "_blank").attr("rel", "noopener noreferrer") : link)
        .class(
          "group grid gap-x-6 gap-y-1 border-t border-border py-3 sm:grid-cols-[10rem_1fr_auto] first:border-t-0",
        )
        .children(
          h.span.class("font-medium").children(h.span.class(rowTitle).children(project.title)),
          h.span
            .class(
              "max-w-[62ch] text-sm text-muted-foreground leading-relaxed text-pretty sm:pt-0.5",
            )
            .children(project.description),
          h.span
            .class("hidden text-muted-foreground sm:block sm:pt-0.5")
            .children(
              external
                ? Icon(h, ArrowUpRight, "h-4 w-4")
                    .attr("aria-hidden", undefined)
                    .attr("aria-label", "Opens in a new tab")
                : Icon(h, ArrowRight, "h-4 w-4"),
            ),
        ),
    );
};

const Writing = <M>(h: Html.H<M>) =>
  h.ol.children(
    latestWriting.map((entry) =>
      h.li.key(entry.permalink).children(
        h.a
          .attr("href", entry.permalink)
          .class(rowLink)
          .children(
            h.time
              .attr("datetime", entry.date)
              .class("text-sm text-muted-foreground tabular-nums")
              .children(formatShortDate(entry.date)),
            h.span.class(rowTitle).children(entry.title),
            h.span.class("text-sm text-muted-foreground").children(entry.kind),
          ),
      ),
    ),
  );

const Experience = <M>(h: Html.H<M>) =>
  h.ol.children(
    work.map((job) =>
      h.li
        .key(job.company)
        .class("grid grid-cols-[7rem_1fr] gap-x-6 border-t border-border py-3 first:border-t-0")
        .children(
          h.span
            .class("text-sm text-muted-foreground tabular-nums")
            .children(`${job.start}–${job.end === "Present" ? "" : job.end}`),
          h.span.children(
            h.a
              .attr("href", job.link)
              .class("font-medium underline-offset-4 hover:text-brand hover:underline")
              .children(job.company),
            h.span
              .class("block text-sm text-muted-foreground")
              .children(
                job.title,
                job.badges.length > 0 ? `, ${job.badges.join(", ").toLowerCase()}` : "",
              ),
          ),
        ),
    ),
  );

const Elsewhere = <M>(h: Html.H<M>) =>
  h.ol.children(
    ELSEWHERE.map(({ href, title, blurb }) =>
      h.li.key(href).children(
        h.a
          .attr("href", href)
          .class(
            "group grid grid-cols-[7rem_1fr] gap-x-6 border-t border-border py-3 first:border-t-0",
          )
          .children(
            h.span.class(`font-medium ${rowTitle}`).children(title),
            h.span.class("text-sm text-muted-foreground sm:pt-0.5").children(blurb),
          ),
      ),
    ),
  );

// Committed data, so there is nothing to await: this renders into the prerendered HTML
// and never re-renders. The old version suspended on a query and drew the rings in after
// hydration — a visible pop, for numbers that only change once a day.
const Health = <M>(h: Html.H<M>) =>
  h.div.class("space-y-6").children(WhoopStats(h, whoopSnapshot), LifeOsHealth(h, whoopSnapshot));

export const HomePage = Html.component({
  name: "HomePage",
  model: Schema.Struct({}),
  message: Schema.Never,
}).make({
  init: () => ({}),
  update: ($) => $.model,
  // No page title: the root's own "Einar Gudni" is the home page's, and a
  // title set here would go through the root's " — Einar Gudni" template.
  head: () => [
    HtmlHead.meta({ name: "description", content: DESCRIPTION }),
    HtmlHead.meta({ property: "og:title", content: "Einar Gudni" }),
    HtmlHead.meta({ property: "og:description", content: DESCRIPTION }),
    HtmlHead.meta({ property: "og:image", content: "/og/home.png" }),
    HtmlHead.meta({ name: "twitter:card", content: "summary_large_image" }),
    HtmlHead.meta({ name: "twitter:image", content: "/og/home.png" }),
  ],
  view: (h) =>
    h.div.class("space-y-20 md:space-y-24").children(
      Hero(h),
      Ledger(h, {
        title: "Use cases",
        href: USE_CASES,
        aside: "All use cases",
        children: [SelectedWork(h)],
      }),
      Ledger(h, {
        title: "Things I've built",
        aside: String(projects.length),
        children: [h.ol.children(projects.map((project) => Project(h, project)))],
      }),
      Ledger(h, {
        title: "Writing",
        href: AppRoute.print(AppRoute.Blog()),
        aside: "All writing",
        children: [Writing(h)],
      }),
      h.div
        .class("grid gap-20 md:grid-cols-2 md:gap-10")
        .children(
          Ledger(h, { title: "Experience", id: "work", children: [Experience(h)] }),
          Ledger(h, { title: "Elsewhere", children: [Elsewhere(h)] }),
        ),
      Ledger(h, {
        title: "Health",
        aside: "Whoop",
        children: [h.div.class("pt-4").children(Health(h))],
      }),
      Ledger(h, {
        title: "Activity",
        aside: "GitHub",
        children: [
          h.div.class("pt-4").children(
            GitHubContributions(h, {
              props: { username: "einargudnig" },
              fallback: () =>
                h.p
                  .class("border-t border-border py-3 text-sm text-muted-foreground")
                  .children("The contribution graph couldn't load right now."),
            }),
          ),
        ],
      }),
      Ledger(h, {
        title: "Work with me",
        id: "contact",
        children: [h.div.class("pt-4").children(HireMe(h))],
      }),
    ),
});
