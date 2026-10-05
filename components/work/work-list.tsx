import { Link } from "@/components/ui/link";
import { formatPeriod, type WorkEntry } from "@/lib/work";

// Outcome before stack: someone deciding whether to hire reads results first,
// so the stack is a single quiet line rather than a wall of chips.
export function WorkList({ entries }: { entries: WorkEntry[] }) {
  return (
    <div className="divide-y divide-border/50 stagger-list">
      {entries.map((entry) => (
        <Link
          key={entry.slug}
          href={entry.permalink}
          className="group block py-5 px-3 -mx-3 rounded-md transition-colors hover:bg-muted/40"
        >
          <div className="flex items-baseline justify-between gap-x-3">
            <h3 className="text-lg font-semibold tracking-tight group-hover:text-brand transition-colors">
              {entry.title}
            </h3>
            <span className="shrink-0 font-mono text-xs tabular-nums text-muted-foreground">
              {formatPeriod(entry)}
            </span>
          </div>
          <p className="mt-1 font-mono text-xs text-muted-foreground">
            {entry.client}
            {entry.kind === "agent" && <span className="text-brand"> · agents</span>}
            {entry.draft && <span> · draft</span>}
          </p>
          <p className="mt-3 max-w-[62ch] text-muted-foreground leading-relaxed text-pretty">
            {entry.summary}
          </p>
          <p className="mt-3 max-w-[62ch] border-l border-brand/60 pl-3 text-sm leading-relaxed">
            {entry.outcome}
          </p>
          <p className="mt-3 font-mono text-xs text-muted-foreground/80">
            {entry.stack.join(" · ")}
          </p>
        </Link>
      ))}
    </div>
  );
}
