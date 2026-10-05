import { createFileRoute } from "@tanstack/react-router";
import { GitHubContributions } from "@/components/github-contributions";
import { WhoopStats } from "@/components/whoop-stats";
import { LifeOsHealth } from "@/components/life-os-health";
import { HireMe } from "@/components/hire-me";
import { Ledger, LedgerEmpty } from "@/components/ledger";
import { WorkList } from "@/components/work/work-list";
import { orderWork, publishedWork } from "@/lib/work";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Link } from "@/components/ui/link";
import { useSuspenseQuery } from "@tanstack/react-query";
import { deepDives, posts } from "@/.velite";
import { formatShortDate } from "@/lib/utils";
import { contributionsQueryOptions } from "@/lib/github";
import { whoopQueryOptions } from "@/lib/whoop";

const projects = [
  {
    title: "posture",
    description:
      "A macOS app that reads your AirPods' motion sensors and tells you when you've been slouching, from a live strip beside the notch.",
    href: "https://posture.einargudni.com",
    tags: ["Swift", "macOS", "AirPods"],
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
    href: "/ts-mini",
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
    title: "einar-os",
    description:
      "This site. Built with TanStack Start, Velite for MDX content, and Tailwind v4. Deployed on Cloudflare Workers.",
    href: "https://github.com/einargudnig/einar-os",
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
    href: "/baby",
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

// Three is what fits a first read; /work has the rest.
const selectedWork = orderWork(publishedWork.filter((entry) => entry.featured)).slice(0, 3);

const latestWriting = [
  ...posts.filter((post) => !post.draft).map((post) => ({ ...post, kind: "Post" })),
  ...deepDives.filter((dive) => !dive.draft).map((dive) => ({ ...dive, kind: "Deep dive" })),
]
  .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  .slice(0, 5);

const ELSEWHERE = [
  { href: "/about", title: "About", blurb: "Who, what, why" },
  { href: "/now", title: "Now", blurb: "Short-term focus" },
  { href: "/someday", title: "Someday", blurb: "Long-term focus" },
];

const rowLink =
  "group grid gap-x-6 gap-y-0.5 border-t border-border py-3 first:border-t-0 sm:grid-cols-[7rem_1fr_auto]";
const rowTitle = "underline-offset-4 decoration-1 group-hover:text-brand group-hover:underline";

function RouteComponent() {
  const { data: whoop } = useSuspenseQuery(whoopQueryOptions);

  const work = [
    {
      company: "Maul",
      link: "https://maul.is",
      badges: [],
      title: "Software Developer",
      logo: "",
      start: "2020",
      end: "Present",
      stack: ["React", "Tailwind", "AWS"],
    },
    {
      company: "Tiffin",
      link: "https://tiffin.dk",
      badges: ["Remote"],
      title: "Software Developer",
      logo: "",
      start: "2022",
      end: "2024",
      stack: ["React", "Tailwind", "AWS"],
    },
    {
      company: "Freelance",
      link: "/work",
      badges: ["Remote"],
      title: "Software Developer",
      logo: "",
      start: "2022",
      end: "Present",
      stack: [
        "JavaScript",
        "TypeScript",
        "React/Next.js/Remix",
        "Tailwind",
        "Chakra UI",
        "Node.js",
        "AWS",
      ],
    },
  ];

  return (
    <div className="space-y-20 md:space-y-24">
      <section className="space-y-8">
        <h1 className="max-w-[18ch] text-[2.75rem] font-semibold leading-[1.02] tracking-[-0.04em] text-balance md:text-7xl">
          I integrate AI agents into systems that already exist.
        </h1>
        <div className="grid gap-6 md:grid-cols-[1fr_auto] md:items-end md:gap-10">
          <div className="max-w-[54ch] space-y-3 text-lg leading-relaxed text-muted-foreground text-pretty">
            <p>
              Assistants inside products, tool-calling over your own APIs, and the evals and
              guardrails that make them safe to ship. Software developer at Maul and independent
              contractor.
            </p>
            <p className="text-base">Curious, Tinkerer, Late bloomer & Nerd.</p>
          </div>
          <div className="flex items-center gap-5">
            <Link
              href="/#contact"
              className="rounded-sm bg-brand px-4 py-2 font-medium text-brand-foreground transition-[filter,transform] duration-200 ease-[var(--ease-out)] hover:brightness-110 active:scale-[0.98]"
            >
              Work with me
            </Link>
            <Link
              href="/work"
              className="underline decoration-1 underline-offset-4 transition-colors hover:text-brand"
            >
              Case studies
            </Link>
          </div>
        </div>
      </section>

      <Ledger title="Work" href="/work" aside="All case studies">
        {selectedWork.length > 0 ? (
          <WorkList entries={selectedWork} />
        ) : (
          <LedgerEmpty>
            The first case studies are being written up.{" "}
            <Link href="/#contact" className="text-brand underline-offset-4 hover:underline">
              Ask me about them
            </Link>
            .
          </LedgerEmpty>
        )}
      </Ledger>

      <Ledger title="Writing" href="/blog" aside="All writing">
        <ol>
          {latestWriting.map((entry) => (
            <li key={entry.permalink}>
              <Link href={entry.permalink} className={rowLink}>
                <time dateTime={entry.date} className="text-sm text-muted-foreground tabular-nums">
                  {formatShortDate(entry.date)}
                </time>
                <span className={rowTitle}>{entry.title}</span>
                <span className="text-sm text-muted-foreground">{entry.kind}</span>
              </Link>
            </li>
          ))}
        </ol>
      </Ledger>

      <Ledger title="Projects" aside={`${projects.length} entries`}>
        <ol>
          {projects.map((project) => {
            const external = project.external !== false;
            return (
              <li key={project.title}>
                <Link
                  href={project.href}
                  {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="group grid gap-x-6 gap-y-1 border-t border-border py-3 sm:grid-cols-[10rem_1fr_auto] first:border-t-0"
                >
                  <span className="font-medium">
                    <span className={rowTitle}>{project.title}</span>
                  </span>
                  <span className="max-w-[62ch] text-sm text-muted-foreground leading-relaxed text-pretty sm:pt-0.5">
                    {project.description}
                  </span>
                  <span className="hidden text-muted-foreground sm:block sm:pt-0.5">
                    {external ? (
                      <ArrowUpRight className="h-4 w-4" aria-label="Opens in a new tab" />
                    ) : (
                      <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    )}
                  </span>
                </Link>
              </li>
            );
          })}
        </ol>
      </Ledger>

      <div className="grid gap-20 md:grid-cols-2 md:gap-10">
        <Ledger title="Experience" id="work">
          <ol>
            {work.map((job) => (
              <li
                key={job.company}
                className="grid grid-cols-[7rem_1fr] gap-x-6 border-t border-border py-3 first:border-t-0"
              >
                <span className="text-sm text-muted-foreground tabular-nums">
                  {job.start}–{job.end === "Present" ? "" : job.end}
                </span>
                <span>
                  <Link
                    href={job.link}
                    className="font-medium underline-offset-4 hover:text-brand hover:underline"
                  >
                    {job.company}
                  </Link>
                  <span className="block text-sm text-muted-foreground">
                    {job.title}
                    {job.badges.length > 0 && `, ${job.badges.join(", ").toLowerCase()}`}
                  </span>
                </span>
              </li>
            ))}
          </ol>
        </Ledger>

        <Ledger title="Elsewhere">
          <ol>
            {ELSEWHERE.map(({ href, title, blurb }) => (
              <li key={href}>
                <Link
                  href={href}
                  className="group grid grid-cols-[7rem_1fr] gap-x-6 border-t border-border py-3 first:border-t-0"
                >
                  <span className={`font-medium ${rowTitle}`}>{title}</span>
                  <span className="text-sm text-muted-foreground sm:pt-0.5">{blurb}</span>
                </Link>
              </li>
            ))}
          </ol>
        </Ledger>
      </div>

      <Ledger title="Health" aside="Whoop">
        <div className="space-y-6 pt-4">
          <WhoopStats data={whoop} />
          <LifeOsHealth data={whoop} />
        </div>
      </Ledger>

      <Ledger title="Activity" aside="GitHub">
        <div className="pt-4">
          <GitHubContributions username="einargudnig" />
        </div>
      </Ledger>

      <Ledger title="Work with me" id="contact">
        <div className="pt-4">
          <HireMe />
        </div>
      </Ledger>
    </div>
  );
}

const DESCRIPTION =
  "Einar Gudni integrates AI agents into systems that already exist. Case studies, writing and projects.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Einar Gudni" },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: "Einar Gudni" },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:image", content: "/og/home.png" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: "/og/home.png" },
    ],
  }),
  loader: ({ context }) =>
    Promise.all([
      context.queryClient.ensureQueryData(whoopQueryOptions),
      context.queryClient.ensureQueryData(contributionsQueryOptions("einargudnig")),
    ]),
  component: RouteComponent,
});
