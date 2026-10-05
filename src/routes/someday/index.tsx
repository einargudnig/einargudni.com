import { createFileRoute } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { Link } from "@/components/ui/link";

function RouteComponent() {
  return (
    <section className="w-full max-w-2xl space-y-8 print:space-y-6 mb-8">
      <h1 className="text-4xl md:text-5xl font-semibold tracking-[-0.04em] leading-[1.05] text-balance mb-6">
        Someday
      </h1>
      <div className="divide-y divide-border/50 stagger-list">
        <div className="pb-8">
          <p className="text-brand text-lg font-mono mb-3">
            Someday, I want to work at my dream company
          </p>
          <p className="leading-relaxed max-w-[65ch] text-muted-foreground text-pretty">
            I really don&apos;t know what my dream company is, but I want to work at a place where I
            can learn a lot, have fun and be surrounded by great people. I want to be in a place
            where I can grow and be challenged. In someways my current company matches all of these
            things, but I still early in my career and there are lot of great companies out there.
          </p>
        </div>
        <div className="py-8">
          <p className="text-brand text-lg font-mono mb-3">Someday, I want to live abroad</p>
          <p className="leading-relaxed max-w-[65ch] text-muted-foreground text-pretty">
            Iceland is great, has it pros and it&apos;s cons, like all places. But I would like to
            try to live abroad sometime, preferably somewhere warmer
          </p>
        </div>
        <div className="py-8">
          <p className="text-brand text-lg font-mono mb-3">
            Someday, I want to speak a tech conference
          </p>
          <p className="leading-relaxed max-w-[65ch] text-muted-foreground text-pretty">
            I have been to a few conferences, and I think it would be fun challenge to speak at one.
            I have to prepare, practice and do uncomfortable things to get there. It also means I
            need to know the stuff I will be talking about!
          </p>
        </div>
        <div className="py-8">
          <p className="text-brand text-lg font-mono mb-3">Someday, I want to learn to fly</p>
          <p className="leading-relaxed max-w-[65ch] text-muted-foreground text-pretty">
            Not that I want to become a pilot and work as one. Airplanes, flight and the sky has
            always fascinated me. I think it would be fun to learn to fly.
          </p>
        </div>
        <div className="pt-8">
          <p className="text-brand text-lg font-mono mb-3">
            Someday, I want to work because I want to
          </p>
          <p className="leading-relaxed max-w-[65ch] text-muted-foreground text-pretty">
            I want to be at the place where I work because I do it for fun, not because it pays the
            salary. Of course the &quot;salary&quot; has to come way, but I want to be in the
            situation where I can choose where and if I work because I want to, not because I have
            to.
          </p>
        </div>
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

export const Route = createFileRoute("/someday/")({
  component: RouteComponent,
});
