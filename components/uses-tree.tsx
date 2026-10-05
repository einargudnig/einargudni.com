import type { UsesEntry, UsesFolder } from "@/lib/uses";

// Box-drawing prefix for one line of the tree. `ancestorsLast` holds, for each
// enclosing level, whether that level was the last child (no more `│`).
const branch = (ancestorsLast: boolean[], isLast: boolean) =>
  ancestorsLast.map((last) => (last ? "    " : "│   ")).join("") + (isLast ? "└── " : "├── ");

const Glyphs = ({ children }: { children: string }) => (
  <span aria-hidden="true" className="shrink-0 whitespace-pre text-muted-foreground/60">
    {children}
  </span>
);

const isExternal = (href: string) => href.startsWith("http");

function Entry({ entry, prefix }: { entry: UsesEntry; prefix: string }) {
  const label = entry.href ? (
    <a
      href={entry.href}
      {...(isExternal(entry.href) ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className="underline-offset-4 decoration-1 hover:underline"
    >
      {entry.name}
    </a>
  ) : (
    <span>{entry.name}</span>
  );

  return (
    <li className="flex min-w-0">
      <Glyphs>{prefix}</Glyphs>
      <span className="min-w-0 truncate">
        {label}
        {entry.description && (
          <span className="ml-3 hidden font-sans text-muted-foreground sm:inline">
            {entry.description}
          </span>
        )}
      </span>
    </li>
  );
}

function Folder({
  folder,
  isLast,
  defaultOpen,
}: {
  folder: UsesFolder;
  isLast: boolean;
  defaultOpen: boolean;
}) {
  const children = folder.entries.length + (folder.readme ? 1 : 0);

  return (
    <li>
      <details open={defaultOpen} className="group/folder">
        <summary className="flex cursor-pointer list-none rounded-sm [&::-webkit-details-marker]:hidden">
          <Glyphs>{branch([], isLast)}</Glyphs>
          <span className="font-medium underline-offset-4 decoration-1 hover:underline">
            {folder.slug}/
          </span>
          <span className="ml-3 text-muted-foreground tabular-nums">
            <span className="group-open/folder:hidden">{children} items</span>
          </span>
        </summary>
        <ul>
          {folder.entries.map((entry, i) => (
            <Entry
              key={entry.name}
              entry={entry}
              prefix={branch([isLast], !folder.readme && i === folder.entries.length - 1)}
            />
          ))}
          {folder.readme && (
            <li>
              <div className="flex">
                <Glyphs>{branch([isLast], true)}</Glyphs>
                <span>README</span>
              </div>
              <div className="space-y-2 py-1 pl-[8ch]">
                {folder.readme.map((line) => (
                  <p
                    key={line}
                    className="max-w-[60ch] font-sans text-muted-foreground leading-relaxed"
                  >
                    {line}
                  </p>
                ))}
              </div>
            </li>
          )}
        </ul>
      </details>
    </li>
  );
}

// The uses page as a dotfiles tree. Each folder is a native <details>, so it
// collapses without JavaScript and every entry is in the prerendered HTML.
export function UsesTree({ folders, open }: { folders: UsesFolder[]; open?: string }) {
  return (
    <div className="font-mono text-sm leading-7">
      <p className="text-muted-foreground">~/uses</p>
      <ul>
        {folders.map((folder, i) => (
          <Folder
            key={folder.slug}
            folder={folder}
            isLast={i === folders.length - 1}
            defaultOpen={open === folder.slug}
          />
        ))}
      </ul>
    </div>
  );
}
