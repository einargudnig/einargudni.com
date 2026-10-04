import { createFileRoute } from "@tanstack/react-router";
import { Section } from "@/components/section";
import { Badge } from "@/components/ui/badge";
import { ProjectCard } from "@/components/project-card";
import { GitHubContributions } from "@/components/github-contributions";
import { WhoopStats } from "@/components/whoop-stats";
import { LifeOsHealth } from "@/components/life-os-health";
import { HireMe } from "@/components/hire-me";
import { GlobeIcon } from "lucide-react";
import { Link } from "@/components/ui/link";
import { useSuspenseQuery } from "@tanstack/react-query";
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
      "A macOs menu bar app that monitors node processes. Like htop, but for your Node.js toolkit.",
    href: "https://github.com/einargudnig/jstop",
    tags: ["Swift", "macOs"],
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
      company: "Contractor",
      link: "https://einargudni.com",
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
        "Chakra-Ui",
        "Node.js",
        "AWS",
      ],
    },
  ];

  return (
    <section className="mx-auto w-full space-y-8">
      <div className="grid md:grid-cols-[2fr_1fr] gap-8 items-end">
        <div className="space-y-3">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tighter leading-none">
            Einar Gudni
          </h1>
          <p className="max-w-[65ch] text-lg text-muted-foreground leading-relaxed">
            <span className="italic font-semibold text-foreground">Curious</span>, Tinkerer, Late
            bloomer & Nerd
          </p>
          <p className="items-center text-pretty font-mono text-xs text-muted-foreground">
            <a
              className="inline-flex gap-x-1.5 align-baseline leading-none hover:text-brand transition-colors"
              href="https://www.google.com/maps/place/Reykjavík"
              target="_blank"
              rel="noreferrer"
            >
              <GlobeIcon className="h-3 w-3" />
              Reykjavík, Iceland
            </a>
          </p>
        </div>
      </div>
      <Section className="mt-4">
        <div className="flex items-center justify-between">
          <Link
            href="/about"
            className="group rounded-md px-4 py-3 -mx-4 transition-colors hover:bg-muted/50"
          >
            <p className="text-lg font-medium group-hover:text-brand transition-colors">About</p>
            <p className="text-sm text-muted-foreground">Who, What, Why</p>
          </Link>
          <Link
            href="/now"
            className="group rounded-md px-4 py-3 -mx-4 transition-colors hover:bg-muted/50"
          >
            <p className="text-lg font-medium group-hover:text-brand transition-colors">Now</p>
            <p className="text-sm text-muted-foreground">Short-term focus</p>
          </Link>
          <Link
            href="/someday"
            className="group rounded-md px-4 py-3 -mx-4 transition-colors hover:bg-muted/50"
          >
            <p className="text-lg font-medium group-hover:text-brand transition-colors">Someday</p>
            <p className="text-sm text-muted-foreground">Long-term focus</p>
          </Link>
        </div>
      </Section>

      <Section className="mt-4">
        <h2 className="text-xl font-bold">Projects</h2>
        <div className="grid md:grid-cols-2 gap-3 stagger-list">
          {projects.map((project) => (
            <ProjectCard key={project.title} {...project} />
          ))}
        </div>
      </Section>

      <Section className="mt-4">
        <h2 className="text-xl font-bold">
          Health <span className="text-base font-normal text-muted-foreground">· Whoop</span>
        </h2>
        <WhoopStats data={whoop} />
        <LifeOsHealth data={whoop} />
      </Section>

      <Section className="mt-4">
        <h2 className="text-xl font-bold">Activity</h2>
        <GitHubContributions username="einargudnig" />
      </Section>

      <Section className="mt-4" id="work">
        <h2 className="text-xl font-bold">Work Experience</h2>
        <div className="divide-y divide-border/50">
          {work.map((job) => (
            <div key={job.company} className="py-4 first:pt-0">
              <div className="flex items-center justify-between gap-x-2 text-base">
                <h3 className="inline-flex items-center gap-x-2 font-semibold leading-none">
                  <a className="hover:text-brand transition-colors" href={job.link}>
                    {job.company}
                  </a>
                  {job.badges.map((badge) => (
                    <Badge variant="secondary" className="text-xs" key={badge}>
                      {badge}
                    </Badge>
                  ))}
                </h3>
                <div className="text-sm font-mono tabular-nums text-muted-foreground">
                  {job.start} - {job.end}
                </div>
              </div>
              <p className="font-mono text-sm text-muted-foreground mt-1">{job.title}</p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {job.stack.map((tag) => (
                  <Badge key={tag} variant="outline">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section className="mt-4 scroll-mt-8" id="contact">
        <h2 className="text-xl font-bold">Work with me</h2>
        <HireMe />
      </Section>
    </section>
  );
}

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Einar Gudni" },
      { name: "description", content: "My home on the web" },
      { property: "og:title", content: "Einar Gudni" },
      { property: "og:description", content: "My home on the web" },
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
