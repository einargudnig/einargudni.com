import type { ReactNode } from "react";
import { Link } from "@/components/ui/link";

// The almanac's table head: a full-weight rule, the table's name, and either
// how many entries follow or where the rest of them are.
export function LedgerHead({
  title,
  id,
  aside,
  href,
}: {
  title: ReactNode;
  id?: string;
  aside?: ReactNode;
  href?: string;
}) {
  return (
    <div className="flex items-baseline justify-between gap-4 border-t border-foreground pt-2.5 pb-1">
      <h2 id={id} className="font-semibold tracking-tight">
        {title}
      </h2>
      {href ? (
        <Link
          href={href}
          className="text-sm text-muted-foreground underline-offset-4 transition-colors hover:text-brand hover:underline"
        >
          {aside}
        </Link>
      ) : (
        aside && <span className="text-sm text-muted-foreground tabular-nums">{aside}</span>
      )}
    </div>
  );
}

// A table section. `scroll-mt` keeps an anchored heading clear of the top.
export function Ledger({
  title,
  aside,
  href,
  id,
  children,
}: {
  title: ReactNode;
  aside?: ReactNode;
  href?: string;
  id?: string;
  children: ReactNode;
}) {
  return (
    <section aria-labelledby={id ? `${id}-title` : undefined} id={id} className="scroll-mt-8">
      <LedgerHead title={title} aside={aside} href={href} id={id ? `${id}-title` : undefined} />
      {children}
    </section>
  );
}

// An empty table still prints its ruling, so absence reads as designed.
export function LedgerEmpty({ children }: { children: ReactNode }) {
  return <p className="border-t border-border py-3 text-sm text-muted-foreground">{children}</p>;
}
