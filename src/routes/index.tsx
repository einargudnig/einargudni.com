import { createFileRoute } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { Section } from "@/components/section";
import { Badge } from "@/components/ui/badge";
import { ProjectCard } from "@/components/project-card";
import { GitHubContributions } from "@/components/github-contributions";
import { WhoopStats } from "@/components/whoop-stats";
import { LifeOsHealth } from "@/components/life-os-health";
import { HireMe } from "@/components/hire-me";
import { WorkList } from "@/components/work/work-list";
import { orderWork, publishedWork } from "@/lib/work";
import { ArrowRight, GlobeIcon } from "lucide-react";
import { Link } from "@/components/ui/link";
import { useSuspenseQuery } from "@tanstack/react-query";
import { deepDives, posts } from "@/.velite";
import { formatBlogDate } from "@/lib/utils";
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
  ...posts.filter((post) => !post.draft),
  ...deepDives.filter((dive) => !dive.draft),
]
  .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  .slice(0, 4);

const INTRO_LINKS = [
  { href: "/about", title: "About", blurb: "Who, what, why" },
  { href: "/now", title: "Now", blurb: "Short-term focus" },
  { href: "/someday", title: "Someday", blurb: "Long-term focus" },
];

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
    <div className="w-full space-y-20">
      <section className="space-y-6">
        <h1 className="text-5xl md:text-7xl font-semibold tracking-[-0.045em] leading-[0.9]">
          Einar Gudni
        </h1>
        <p className="max-w-[24ch] text-2xl md:text-3xl font-medium tracking-tight leading-[1.15] text-balance">
          I integrate AI agents into systems that already exist
          <span className="text-brand">.</span>
        </p>
        <p className="max-w-[58ch] text-muted-foreground leading-relaxed text-pretty">
          Assistants inside products, tool-calling over your own APIs, and the evals and guardrails
          that make them safe to ship. Software developer at Maul and independent contractor.
        </p>
        <div className="flex flex-wrap items-center gap-3 pt-1">
          <Link
            href="/work"
            className="inline-flex items-center gap-1.5 rounded-md bg-foreground px-4 py-2 text-sm font-medium text-background transition-[background-color,transform] duration-200 ease-[var(--ease-out)] hover:bg-brand active:scale-[0.98]"
          >
            See the case studies
            <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
          </Link>
          <Link
            href="/#contact"
            className="inline-flex items-center rounded-md border border-border px-4 py-2 text-sm font-medium transition-colors hover:border-brand/50 hover:text-brand"
          >
            Work with me
          </Link>
        </div>
        <p className="flex flex-wrap items-center gap-x-3 gap-y-1 pt-2 font-mono text-xs text-muted-foreground">
          <span>
            <span className="italic font-semibold text-foreground">Curious</span>, Tinkerer, Late
            bloomer & Nerd
          </span>
          <a
            className="inline-flex items-center gap-x-1.5 hover:text-brand transition-colors"
            href="https://www.google.com/maps/place/Reykjavík"
            target="_blank"
            rel="noreferrer"
          >
            <GlobeIcon className="h-3 w-3" aria-hidden="true" />
            Reykjavík, Iceland
          </a>
        </p>
        <nav aria-label="About me" className="grid grid-cols-3 gap-2 pt-4 sm:gap-4">
          {INTRO_LINKS.map(({ href, title, blurb }) => (
            <Link
              key={href}
              href={href}
              className="group rounded-md border border-border/60 px-3 py-2.5 transition-colors hover:border-brand/40 hover:bg-muted/40"
            >
              <span className="block font-medium group-hover:text-brand transition-colors">
                {title}
              </span>
              <span className="block text-xs text-muted-foreground sm:text-sm">{blurb}</span>
            </Link>
          ))}
        </nav>
      </section>

      {selectedWork.length > 0 && (
        <Section>
          <SectionHeading href="/work" more="all case studies">
            Selected work
          </SectionHeading>
          <WorkList entries={selectedWork} />
        </Section>
      )}

      {latestWriting.length > 0 && (
        <Section>
          <SectionHeading href="/blog" more="all posts">
            Writing
          </SectionHeading>
          <ul className="divide-y divide-border/50">
            {latestWriting.map((entry) => (
              <li key={entry.permalink}>
                <Link
                  href={entry.permalink}
                  className="group flex items-baseline justify-between gap-4 py-3 px-2 -mx-2 rounded-md transition-colors hover:bg-muted/40"
                >
                  <span className="group-hover:text-brand transition-colors">{entry.title}</span>
                  <span className="shrink-0 font-mono text-xs tabular-nums text-muted-foreground">
                    {formatBlogDate(entry.date)}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </Section>
      )}

      <Section>
        <SectionHeading>Projects</SectionHeading>
        <div className="grid md:grid-cols-2 gap-3 stagger-list">
          {projects.map((project) => (
            <ProjectCard key={project.title} {...project} />
          ))}
        </div>
      </Section>

      <Section id="work">
        <SectionHeading>Experience</SectionHeading>
        <div className="divide-y divide-border/50">
          {work.map((job) => (
            <div key={job.company} className="py-4 first:pt-0">
              <div className="flex items-center justify-between gap-x-2 text-base">
                <h3 className="inline-flex items-center gap-x-2 font-semibold leading-none">
                  <Link className="hover:text-brand transition-colors" href={job.link}>
                    {job.company}
                  </Link>
                  {job.badges.map((badge) => (
                    <Badge variant="secondary" className="text-xs" key={badge}>
                      {badge}
                    </Badge>
                  ))}
                </h3>
                <div className="text-sm font-mono tabular-nums text-muted-foreground">
                  {job.start} – {job.end}
                </div>
              </div>
              <p className="text-sm text-muted-foreground mt-1">{job.title}</p>
              <p className="mt-2 font-mono text-xs text-muted-foreground">
                {job.stack.join(" · ")}
              </p>
            </div>
          ))}
        </div>
      </Section>

      <Section>
        <SectionHeading>
          Health <span className="font-normal text-muted-foreground">· Whoop</span>
        </SectionHeading>
        <WhoopStats data={whoop} />
        <LifeOsHealth data={whoop} />
      </Section>

      <Section>
        <SectionHeading>Activity</SectionHeading>
        <GitHubContributions username="einargudnig" />
      </Section>

      <Section className="scroll-mt-8" id="contact">
        <SectionHeading>Work with me</SectionHeading>
        <HireMe />
      </Section>
    </div>
  );
}

const SectionHeading = ({
  children,
  href,
  more,
}: {
  children: ReactNode;
  href?: string;
  more?: string;
}) => (
  <div className="flex items-baseline justify-between gap-4 border-b border-border/50 pb-3 mb-1">
    <h2 className="text-2xl font-semibold tracking-tight">{children}</h2>
    {href && more && (
      <Link
        href={href}
        className="inline-flex items-center gap-1 font-mono text-xs text-muted-foreground hover:text-brand transition-colors"
      >
        {more}
        <ArrowRight className="h-3 w-3" aria-hidden="true" />
      </Link>
    )}
  </div>
);

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
