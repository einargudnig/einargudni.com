import { type ErrorComponentProps, useRouter, useRouterState } from "@tanstack/react-router";
import { useEffect } from "react";
import { Ledger } from "@/components/ledger";
import { Link } from "@/components/ui/link";

const heading =
  "max-w-[18ch] text-4xl font-semibold leading-[1.05] tracking-[-0.04em] text-balance md:text-5xl";
const action =
  "rounded-sm bg-brand px-4 py-2 font-medium text-brand-foreground transition-[filter,transform] duration-200 ease-[var(--ease-out)] hover:brightness-110 active:scale-[0.98]";
const plainLink = "underline decoration-1 underline-offset-4";

const ELSEWHERE = [
  { href: "/", label: "Home" },
  { href: "/use-cases", label: "Use cases" },
  { href: "/blog", label: "Blog" },
  { href: "/uses", label: "Uses" },
];

// Every way out, printed as the almanac's own table so a dead end still looks
// like part of the site.
const WayOut = () => (
  <Ledger title="Try instead">
    <ol>
      {ELSEWHERE.map(({ href, label }) => (
        <li key={href} className="border-t border-border first:border-t-0">
          <Link href={href} className="group block py-3">
            <span className="font-medium underline-offset-4 decoration-1 group-hover:underline">
              {label}
            </span>
          </Link>
        </li>
      ))}
    </ol>
  </Ledger>
);

export function NotFound() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <section className="space-y-16">
      <div className="space-y-4">
        <p className="text-sm text-muted-foreground tabular-nums">404</p>
        <h1 className={heading}>Not in the almanac.</h1>
        <p className="max-w-[54ch] text-lg text-muted-foreground leading-relaxed text-pretty">
          There's nothing at <code className="font-mono text-base text-foreground">{pathname}</code>
          . It may have moved, or it was never written.
        </p>
      </div>
      <WayOut />
    </section>
  );
}

// Shown in place of any route that throws while loading or rendering. "Try
// again" re-runs the loaders; invalidating the router also resets this boundary.
export function RouteError({ error }: ErrorComponentProps) {
  const router = useRouter();

  useEffect(() => {
    console.error("[route error]", error);
  }, [error]);

  return (
    <section className="space-y-16">
      <div className="space-y-4">
        <p className="text-sm text-muted-foreground">Error</p>
        <h1 className={heading}>This page didn't load.</h1>
        <p className="max-w-[54ch] text-lg text-muted-foreground leading-relaxed text-pretty">
          Something broke on my side while putting it together. Trying again usually works; if it
          keeps happening, I'd like to hear about it.
        </p>
        {import.meta.env.DEV && (
          <pre className="max-w-full overflow-x-auto border-y border-border py-3 font-mono text-xs text-destructive">
            {error instanceof Error ? (error.stack ?? error.message) : String(error)}
          </pre>
        )}
        <div className="flex items-center gap-5 pt-2">
          <button type="button" onClick={() => router.invalidate()} className={action}>
            Try again
          </button>
          <a href="mailto:einargudnig@gmail.com" className={plainLink}>
            Tell me
          </a>
        </div>
      </div>
      <WayOut />
    </section>
  );
}
