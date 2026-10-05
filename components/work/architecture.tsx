import { Fragment } from "react";
import { ArrowDown, ArrowRight } from "lucide-react";

interface Node {
  label: string;
  detail?: string;
}

interface ArchitectureProps {
  nodes: Node[];
  caption?: string;
}

// The request path through a case study's system, drawn left to right. It is
// the one recurring visual on the site: every case study is "an agent inside a
// system that already exists", and this is that system. Stacks on phones.
export function Architecture({ nodes, caption }: ArchitectureProps) {
  return (
    <figure className="not-prose my-10 border-y border-foreground py-5">
      <ol className="flex flex-col items-stretch gap-1 md:flex-row md:items-stretch md:gap-0">
        {nodes.map((node, index) => (
          <Fragment key={node.label}>
            {index > 0 && (
              <li
                aria-hidden="true"
                className="flex items-center justify-center text-muted-foreground md:px-1.5"
              >
                <ArrowDown className="h-4 w-4 md:hidden" strokeWidth={1.75} />
                <ArrowRight className="hidden h-4 w-4 md:block" strokeWidth={1.75} />
              </li>
            )}
            <li className="flex-1 rounded-sm border border-border px-3 py-2.5">
              <p className="flex items-center gap-2 font-mono text-[13px] font-medium leading-tight">
                <span
                  aria-hidden="true"
                  className={
                    index === 0 || index === nodes.length - 1
                      ? "h-1.5 w-1.5 shrink-0 rounded-full bg-foreground"
                      : "h-1.5 w-1.5 shrink-0 rounded-full border border-foreground"
                  }
                />
                {node.label}
              </p>
              {node.detail && (
                <p className="mt-1 text-xs text-muted-foreground leading-snug">{node.detail}</p>
              )}
            </li>
          </Fragment>
        ))}
      </ol>
      {caption && (
        <figcaption className="mt-4 max-w-[60ch] text-xs text-muted-foreground leading-relaxed">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
