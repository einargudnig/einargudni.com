import { Link } from "@/components/ui/link";
import { formatPeriod, type WorkEntry } from "@/lib/work";

// Case studies as almanac rows: period, entry, client. Under the title sits
// the outcome, because someone deciding whether to hire reads results first;
// the stack waits on the case study itself.
export function WorkList({ entries }: { entries: WorkEntry[] }) {
  return (
    <ol>
      {entries.map((entry) => (
        <li key={entry.slug} className="border-t border-border first:border-t-0">
          <Link
            href={entry.permalink}
            className="group grid gap-x-6 gap-y-1 py-4 sm:grid-cols-[7rem_1fr_12rem]"
          >
            <span className="text-sm text-muted-foreground tabular-nums sm:pt-0.5">
              {formatPeriod(entry)}
            </span>
            <span className="min-w-0">
              <span className="block font-medium underline-offset-4 decoration-1 group-hover:text-brand group-hover:underline">
                {entry.title}
              </span>
              <span className="mt-1 block max-w-[60ch] text-sm text-muted-foreground leading-relaxed text-pretty">
                {entry.outcome}
              </span>
            </span>
            <span className="text-sm text-muted-foreground sm:pt-0.5 sm:text-right">
              {entry.client}
              {entry.kind === "agent" && (
                <span className="whitespace-nowrap text-foreground"> · agents</span>
              )}
              {entry.draft && <span className="whitespace-nowrap"> · draft</span>}
            </span>
          </Link>
        </li>
      ))}
    </ol>
  );
}
