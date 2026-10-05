import { createFileRoute } from "@tanstack/react-router";
import { ExternalLink } from "@/components/blog/external-link";
import { ArrowLeft } from "lucide-react";
import { Image } from "@/components/ui/image";
import { Link } from "@/components/ui/link";

function RouteComponent() {
  return (
    <section className="w-full max-w-2xl space-y-8 print:space-y-6 mb-8">
      <div className="flex items-start justify-between gap-6">
        <h1 className="text-4xl md:text-5xl font-semibold tracking-[-0.04em] leading-[1.05] text-balance">
          About
        </h1>
        <Image
          src="/images/avatar.jpeg"
          alt="Einar Gudni"
          width={96}
          height={96}
          className="rounded-full grayscale hover:grayscale-0 transition-[filter] duration-500 ease-[var(--ease-in-out)] shrink-0"
        />
      </div>
      <div className="prose prose-neutral dark:prose-invert text-pretty">
        <p className="text-brand text-lg font-mono">Who</p>
        <p className="leading-relaxed max-w-[65ch]">
          I am Einar Gudni, usually called Einar, a software developer born and raised in Iceland. I
          am a triplet, and I have two great sisters. My parents are some of my biggest role models.
        </p>

        <p className="leading-relaxed max-w-[65ch]">
          I am curious by nature but didn&apos;t start coding until I started computer science at
          the University of Iceland. I graduated in 2020 and I think few things have been as
          rewarding as learning to code.
        </p>

        <p className="leading-relaxed max-w-[65ch]">
          A big part of my identity revolves around sports and being active. I trained football and
          handball when growing up, and I have been doing CrossFit for the last 9 years. &quot;If
          you don&#39;t use it, you lose it.&quot; So I try to use it as much I can.{" "}
        </p>
      </div>
      <div className="h-px bg-border/50" />
      <div className="prose prose-neutral dark:prose-invert text-pretty">
        <p className="text-brand text-lg font-mono">What</p>
        <p className="leading-relaxed max-w-[65ch]">
          I love to wander around the web and see what other people are building it inspires me a
          lot. If I had all the time in the world I would spend it tinkering on things.
        </p>
        <p className="leading-relaxed max-w-[65ch]">
          I work as a developer for <ExternalLink href="https://maul.is">Maul</ExternalLink>, a
          small company that wants to change how you experience your work lunch. It is so much fun
          to be a part of a small team with great people. High agency and a lot of responsibility.
          Your voice is heard and lot of opportunities to learn from others.
        </p>
        <p className="leading-relaxed max-w-[65ch]">
          I do some freelance work on the side, and have been adding features and rebuilding the
          system for <ExternalLink href="https://gigover.com">gigover</ExternalLink>
        </p>
      </div>
      <div className="h-px bg-border/50" />
      <div className="prose prose-neutral dark:prose-invert text-pretty">
        <p className="text-brand text-lg font-mono">Why</p>
        <p className="leading-relaxed max-w-[65ch]">
          I remember that I loved building LEGO when I was small, at some point I loved to draw
          houses, like an architecture, being the only boy it came naturally to me to play alone and
          I think that is where my love for building things started.
        </p>
        <p className="leading-relaxed max-w-[65ch]">
          Over the last years I&apos;ve started to realize more and more how important it is to have
          a long-term mindset. I believe that given time and effort I am capable of doing anything I
          set my mind to. That still means that I have to work hard and continue to improve.
        </p>

        <p className="leading-relaxed max-w-[65ch]">
          My current inspiration is minimalistic and simple design, well crafted software that makes
          sense to use.
        </p>
      </div>
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

export const Route = createFileRoute("/about/")({
  head: () => ({
    meta: [
      { title: "About Me — Einar Gudni" },
      { name: "description", content: "Software engineer, builder, and lifelong learner" },
      { property: "og:title", content: "About Me" },
      { property: "og:description", content: "Software engineer, builder, and lifelong learner" },
      { property: "og:image", content: "/og/about.png" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: "/og/about.png" },
    ],
  }),
  component: RouteComponent,
});
