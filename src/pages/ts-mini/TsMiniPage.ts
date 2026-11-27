import { Html } from "@effect/ui/html";
import { Schema } from "effect";
import { CompilerVisualizer } from "../../components/CompilerVisualizer.ts";

const MINI_TYPESCRIPT = "https://github.com/sandersn/mini-typescript";

const STAGES = [
  {
    title: "1. Scanner (Lexical Analysis)",
    body: "The scanner breaks down the source code into tokens - the smallest meaningful units like keywords, identifiers, operators, and punctuation. Think of it like breaking a sentence into individual words and punctuation marks.",
  },
  {
    title: "2. Parser (Syntactic Analysis)",
    body: "The parser takes the stream of tokens and builds an Abstract Syntax Tree (AST) - a tree representation of the code's structure. It ensures the code follows TypeScript's grammar rules.",
  },
  {
    title: "3. Binder",
    body: "The binder creates symbols for declarations and establishes relationships between them. It builds a symbol table that connects names to their declarations across different scopes.",
  },
  {
    title: "4. Type Checker",
    body: "This is where the magic happens. The type checker walks through the AST, infers types where they're not explicitly stated, and validates that types are used correctly throughout the code.",
  },
  {
    title: "5. Transformer",
    body: "The transformer converts TypeScript-specific syntax into JavaScript. It handles things like type erasure, enum transpilation, and modern syntax downleveling.",
  },
  {
    title: "6. Emitter",
    body: "Finally, the emitter generates the actual JavaScript output files, along with source maps and declaration files if requested.",
  },
];

export const TsMiniPage = Html.component({
  name: "TsMiniPage",
  model: Schema.Struct({}),
  message: Schema.Never,
}).make({
  init: () => ({}),
  update: ($) => $.model,
  view: (h) =>
    h.section.class("mx-auto w-full max-w-4xl space-y-8 print:space-y-6").children(
      h.div
        .class("space-y-4")
        .children(
          h.h1
            .class(
              "text-4xl md:text-5xl font-semibold tracking-[-0.04em] leading-[1.05] text-balance",
            )
            .children("How the TypeScript Compiler Works"),
          h.p
            .class("text-muted-foreground text-lg")
            .children(
              "An interactive exploration of the TypeScript compilation pipeline, inspired by ",
              h.a
                .attr("href", MINI_TYPESCRIPT)
                .class("text-brand hover:text-brand/80 underline underline-offset-2")
                .attr("target", "_blank")
                .attr("rel", "noopener noreferrer")
                .children("mini-typescript"),
              ".",
            ),
        ),
      h.div
        .class("prose dark:prose-invert max-w-none")
        .children(
          h.p.children(
            "The TypeScript compiler is a sophisticated piece of software that transforms TypeScript code into JavaScript while checking for type errors. Understanding how it works gives you deeper insight into the language and helps you write better TypeScript code.",
          ),
          h.p.children(
            "The compilation process happens in several distinct stages, each building on the previous one. Let's explore each stage interactively:",
          ),
        ),
      CompilerVisualizer(h, {}),
      h.div.class("prose dark:prose-invert max-w-none").children(
        h.h2.children("The Compilation Pipeline"),
        STAGES.flatMap(({ title, body }) => [
          h.h3.key(`${title}-h`).children(title),
          h.p.key(`${title}-p`).children(body),
        ]),
        h.h2.children("Learn More"),
        h.p.children(
          "Check out ",
          h.a
            .attr("href", MINI_TYPESCRIPT)
            .attr("target", "_blank")
            .attr("rel", "noopener noreferrer")
            .children("mini-typescript"),
          " by Nathan Shively-Sanders for a minimal TypeScript compiler implementation that demonstrates these concepts in about 1000 lines of code.",
        ),
      ),
    ),
});
