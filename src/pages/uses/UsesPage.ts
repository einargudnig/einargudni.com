import { Html } from "@effect/ui/html";
import { Schema } from "effect";
import { usesFolders } from "@/lib/uses";
import { pageHead } from "../../components/head.ts";
import { pageTitle } from "../../components/ProseSection.ts";
import { UsesTree } from "../../components/UsesTree.ts";
import { UsesFolderSlug } from "../../routes.ts";

// /uses starts with every folder collapsed; /uses/<folder> opens that one, so the
// old section URLs still land somewhere sensible.
export const UsesPage = Html.component({
  name: "UsesPage",
  props: Schema.Struct({ folder: Schema.NullOr(UsesFolderSlug) }),
  model: Schema.Struct({}),
  message: Schema.Never,
}).make({
  init: () => ({}),
  update: ($) => $.model,
  head: () =>
    pageHead({
      title: "Uses",
      description: "My tools, setup, and tech stack",
      image: "/og/uses.png",
    }),
  view: (h) =>
    h.section
      .class("w-full max-w-3xl space-y-10 mb-8")
      .children(
        h.div
          .class("space-y-4")
          .children(
            h.h1.class(pageTitle).children("Uses"),
            h.p
              .class("max-w-[54ch] text-lg text-muted-foreground leading-relaxed text-pretty")
              .children("The hardware and software I build with, laid out like my dotfiles."),
          ),
        UsesTree(h, { folders: usesFolders, open: h.props.folder }),
      ),
});
