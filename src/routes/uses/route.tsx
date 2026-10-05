import { createFileRoute, useRouterState } from "@tanstack/react-router";
import { UsesTree } from "@/components/uses-tree";
import { usesFolders } from "@/lib/uses";

// /uses starts with every folder collapsed; /uses/<folder> opens that one, so the
// old section URLs still land somewhere sensible.
function UsesLayout() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const open = pathname.split("/")[2] || undefined;

  return (
    <section className="w-full max-w-3xl space-y-10 mb-8">
      <div className="space-y-4">
        <h1 className="text-4xl md:text-5xl font-semibold tracking-[-0.04em] leading-[1.05] text-balance">
          Uses
        </h1>
        <p className="max-w-[54ch] text-lg text-muted-foreground leading-relaxed text-pretty">
          The hardware and software I build with, laid out like my dotfiles.
        </p>
      </div>
      <UsesTree folders={usesFolders} open={open} />
    </section>
  );
}

export const Route = createFileRoute("/uses")({
  component: UsesLayout,
});
