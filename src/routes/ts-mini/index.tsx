import { createFileRoute } from "@tanstack/react-router";
import { CompilerVisualizer } from "@/components/compiler-visualizer";
import { Balancer } from "react-wrap-balancer";

function TypeScriptMiniPage() {
  return (
    <section className="mx-auto w-full max-w-4xl space-y-8 print:space-y-6">
      <div className="space-y-4">
        <h1 className="text-4xl md:text-5xl font-semibold tracking-[-0.04em] leading-[1.05] text-balance">
          <Balancer>How the TypeScript Compiler Works</Balancer>
        </h1>
        <p className="text-muted-foreground text-lg">
          An interactive exploration of the TypeScript compilation pipeline, inspired by{" "}
          <a
            href="https://github.com/sandersn/mini-typescript"
            className="text-brand hover:text-brand/80 underline underline-offset-2"
            target="_blank"
            rel="noopener noreferrer"
          >
            mini-typescript
          </a>
          .
        </p>
      </div>

      <div className="prose dark:prose-invert max-w-none">
        <p>
          The TypeScript compiler is a sophisticated piece of software that transforms TypeScript
          code into JavaScript while checking for type errors. Understanding how it works gives you
          deeper insight into the language and helps you write better TypeScript code.
        </p>

        <p>
          The compilation process happens in several distinct stages, each building on the previous
          one. Let's explore each stage interactively:
        </p>
      </div>

      <CompilerVisualizer />

      <div className="prose dark:prose-invert max-w-none">
        <h2>The Compilation Pipeline</h2>

        <h3>1. Scanner (Lexical Analysis)</h3>
        <p>
          The scanner breaks down the source code into tokens - the smallest meaningful units like
          keywords, identifiers, operators, and punctuation. Think of it like breaking a sentence
          into individual words and punctuation marks.
        </p>

        <h3>2. Parser (Syntactic Analysis)</h3>
        <p>
          The parser takes the stream of tokens and builds an Abstract Syntax Tree (AST) - a tree
          representation of the code's structure. It ensures the code follows TypeScript's grammar
          rules.
        </p>

        <h3>3. Binder</h3>
        <p>
          The binder creates symbols for declarations and establishes relationships between them. It
          builds a symbol table that connects names to their declarations across different scopes.
        </p>

        <h3>4. Type Checker</h3>
        <p>
          This is where the magic happens. The type checker walks through the AST, infers types
          where they're not explicitly stated, and validates that types are used correctly
          throughout the code.
        </p>

        <h3>5. Transformer</h3>
        <p>
          The transformer converts TypeScript-specific syntax into JavaScript. It handles things
          like type erasure, enum transpilation, and modern syntax downleveling.
        </p>

        <h3>6. Emitter</h3>
        <p>
          Finally, the emitter generates the actual JavaScript output files, along with source maps
          and declaration files if requested.
        </p>

        <h2>Learn More</h2>
        <p>
          Check out{" "}
          <a
            href="https://github.com/sandersn/mini-typescript"
            target="_blank"
            rel="noopener noreferrer"
          >
            mini-typescript
          </a>{" "}
          by Nathan Shively-Sanders for a minimal TypeScript compiler implementation that
          demonstrates these concepts in about 1000 lines of code.
        </p>
      </div>
    </section>
  );
}

export const Route = createFileRoute("/ts-mini/")({
  component: TypeScriptMiniPage,
});
