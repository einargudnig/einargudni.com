import type { Html } from "@effect/ui/html";
import type { UsesEntry, UsesFolder } from "@/lib/uses";

// Box-drawing prefix for one line of the tree. `ancestorsLast` holds, for each
// enclosing level, whether that level was the last child (no more `│`).
const branch = (ancestorsLast: ReadonlyArray<boolean>, isLast: boolean) =>
  ancestorsLast.map((last) => (last ? "    " : "│   ")).join("") + (isLast ? "└── " : "├── ");

const Glyphs = <M>(h: Html.H<M>, glyphs: string) =>
  h.span
    .attr("aria-hidden", "true")
    .class("shrink-0 whitespace-pre text-muted-foreground/60")
    .children(glyphs);

const isExternal = (href: string) => href.startsWith("http");

const Entry = <M>(h: Html.H<M>, entry: UsesEntry, prefix: string) => {
  const label = entry.href
    ? h.a
        .attr("href", entry.href)
        .attr("target", isExternal(entry.href) ? "_blank" : undefined)
        .attr("rel", isExternal(entry.href) ? "noopener noreferrer" : undefined)
        .class("underline-offset-4 decoration-1 hover:underline")
        .children(entry.name)
    : h.span.children(entry.name);

  return h.li
    .key(entry.name)
    .class("flex min-w-0")
    .children(
      Glyphs(h, prefix),
      h.span
        .class("min-w-0 truncate")
        .children(
          label,
          entry.description
            ? h.span
                .class("ml-3 hidden font-sans text-muted-foreground sm:inline")
                .children(entry.description)
            : null,
        ),
    );
};

// `open` is an attribute, not the controlled `.open(...)` property: the folder
// stays a plain <details> the reader opens and closes without a message, and
// the URL only decides how it starts.
const Folder = <M>(h: Html.H<M>, folder: UsesFolder, isLast: boolean, defaultOpen: boolean) => {
  const readme = folder.readme;
  const children = folder.entries.length + (readme ? 1 : 0);

  return h.li.key(folder.slug).children(
    h.details
      .attr("open", defaultOpen ? "" : undefined)
      .class("group/folder")
      .children(
        h.summary
          .class("flex cursor-pointer list-none rounded-sm [&::-webkit-details-marker]:hidden")
          .children(
            Glyphs(h, branch([], isLast)),
            h.span
              .class("font-medium underline-offset-4 decoration-1 hover:underline")
              .children(`${folder.slug}/`),
            h.span
              .class("ml-3 text-muted-foreground tabular-nums")
              .children(h.span.class("group-open/folder:hidden").children(`${children} items`)),
          ),
        h.ul.children(
          folder.entries.map((entry, i) =>
            Entry(h, entry, branch([isLast], !readme && i === folder.entries.length - 1)),
          ),
          readme
            ? h.li
                .key("README")
                .children(
                  h.div
                    .class("flex")
                    .children(Glyphs(h, branch([isLast], true)), h.span.children("README")),
                  h.div
                    .class("space-y-2 py-1 pl-[8ch]")
                    .children(
                      readme.map((line) =>
                        h.p
                          .key(line)
                          .class("max-w-[60ch] font-sans text-muted-foreground leading-relaxed")
                          .children(line),
                      ),
                    ),
                )
            : null,
        ),
      ),
  );
};

// The uses page as a dotfiles tree. Each folder is a native <details>, so it
// collapses without JavaScript and every entry is in the prerendered HTML.
export const UsesTree = <M>(
  h: Html.H<M>,
  options: { readonly folders: ReadonlyArray<UsesFolder>; readonly open: string | null },
) =>
  h.div
    .class("font-mono text-sm leading-7")
    .children(
      h.p.class("text-muted-foreground").children("~/uses"),
      h.ul.children(
        options.folders.map((folder, i) =>
          Folder(h, folder, i === options.folders.length - 1, options.open === folder.slug),
        ),
      ),
    );
