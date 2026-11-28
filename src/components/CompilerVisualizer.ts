import { Component, Query, Subscription, UiSchema } from "@effect/ui";
import { Html } from "@effect/ui/html";
import { Effect, Schema, Stream } from "effect";
import { AsyncResult } from "effect/reactivity";
import { ChevronLeft, ChevronRight, Pause, Play, RotateCcw } from "lucide";
import { Icon } from "./Icon.ts";
import { Button } from "./primitives.ts";

interface Highlight {
  readonly start: number;
  readonly end: number;
  readonly label?: string;
}

interface CompilerStage {
  readonly id: number;
  readonly name: string;
  readonly description: string;
  readonly highlights: ReadonlyArray<Highlight>;
  readonly output?: string;
}

const sampleCode = `interface User {
  name: string;
  age: number;
}

function greet(user: User): string {
  return \`Hello, \${user.name}!\`;
}

const person: User = {
  name: "Alice",
  age: 30
};

greet(person);`;

const outputCode = `function greet(user) {
  return \`Hello, \${user.name}!\`;
}

const person = {
  name: "Alice",
  age: 30
};

greet(person);`;

// Helper to find token positions in code
const findToken = (code: string, token: string, occurrence = 1): { start: number; end: number } => {
  let count = 0;
  let index = -1;
  while (count < occurrence) {
    index = code.indexOf(token, index + 1);
    if (index === -1) return { start: 0, end: 0 };
    count++;
  }
  return { start: index, end: index + token.length };
};

const stages: ReadonlyArray<CompilerStage> = [
  {
    id: 0,
    name: "Source Code",
    description:
      "This is the original TypeScript source code. Click 'Next' to see how the compiler processes it.",
    highlights: [],
  },
  {
    id: 1,
    name: "Scanner (Lexical Analysis)",
    description:
      "The scanner breaks the code into tokens: keywords (interface, function), identifiers (User, greet), literals (strings, numbers), and operators. Each meaningful piece becomes a token.",
    highlights: [
      { ...findToken(sampleCode, "interface"), label: "keyword" },
      { ...findToken(sampleCode, "User"), label: "identifier" },
      { ...findToken(sampleCode, "name"), label: "identifier" },
      { ...findToken(sampleCode, "string"), label: "keyword" },
      { ...findToken(sampleCode, "function"), label: "keyword" },
      { ...findToken(sampleCode, "greet"), label: "identifier" },
      { ...findToken(sampleCode, "const"), label: "keyword" },
      { ...findToken(sampleCode, "person"), label: "identifier" },
    ],
  },
  {
    id: 2,
    name: "Parser (Syntactic Analysis)",
    description:
      "The parser builds an Abstract Syntax Tree (AST) from tokens. It recognizes language constructs: interface declarations, function declarations, variable declarations, and expressions.",
    highlights: [
      { start: 0, end: sampleCode.indexOf("\n\nfunction"), label: "InterfaceDeclaration" },
      {
        start: sampleCode.indexOf("function"),
        end: sampleCode.indexOf("\n\nconst"),
        label: "FunctionDeclaration",
      },
      {
        start: sampleCode.indexOf("const person"),
        end: sampleCode.indexOf("};\n\ngreet") + 2,
        label: "VariableDeclaration",
      },
      { ...findToken(sampleCode, "greet(person)"), label: "CallExpression" },
    ],
  },
  {
    id: 3,
    name: "Binder",
    description:
      "The binder creates a symbol table, connecting each name to its declaration. It tracks 'User' interface, 'greet' function, and 'person' variable across different scopes.",
    highlights: [
      { ...findToken(sampleCode, "User", 1), label: "Symbol: User" },
      { ...findToken(sampleCode, "greet", 1), label: "Symbol: greet" },
      { ...findToken(sampleCode, "User", 2), label: "Reference: User" },
      { ...findToken(sampleCode, "person", 1), label: "Symbol: person" },
      { ...findToken(sampleCode, "User", 3), label: "Reference: User" },
      { ...findToken(sampleCode, "greet", 2), label: "Reference: greet" },
      { ...findToken(sampleCode, "person", 2), label: "Reference: person" },
    ],
  },
  {
    id: 4,
    name: "Type Checker",
    description:
      "The type checker validates types. It infers that the object literal matches User interface, checks that greet receives correct arguments, and verifies the return type matches the annotation.",
    highlights: [
      { ...findToken(sampleCode, "User", 2), label: "Parameter type" },
      { ...findToken(sampleCode, "string"), label: "Return type" },
      { ...findToken(sampleCode, "User", 3), label: "Type annotation" },
      {
        start: sampleCode.indexOf('{\n  name: "Alice"'),
        end: sampleCode.indexOf("30\n}") + 2,
        label: "Type check: matches User",
      },
      { ...findToken(sampleCode, "greet(person)"), label: "Type check: valid call" },
    ],
  },
  {
    id: 5,
    name: "Transformer",
    description:
      "The transformer converts TypeScript-specific syntax to JavaScript. It removes type annotations, transforms interfaces (which don't exist at runtime), and may transpile modern syntax.",
    highlights: [],
    output: outputCode,
  },
  {
    id: 6,
    name: "Emitter",
    description:
      "The emitter generates the final JavaScript output. All TypeScript-specific syntax is gone. The code is ready to run in any JavaScript environment.",
    highlights: [],
    output: outputCode,
  },
];

const LAST = stages.length - 1;

const Token = Schema.Struct({ text: Schema.String, color: Schema.optional(Schema.String) });
const Lines = Schema.Array(Schema.Array(Token));
type Lines = typeof Lines.Type;

// Both samples are highlighted once, by the prerender. staleTime Infinity
// keeps the browser on the shipped tokens, so the highlighter's chunk only
// loads if the prerender's result is missing.
class HighlightSamples extends Query.Service<HighlightSamples>()("ts-mini/HighlightSamples", {
  success: Schema.Struct({ source: Lines, output: Lines }),
  staleTime: "Infinity",
}) {
  static readonly layer = this.toLayer(
    Effect.succeed(() =>
      Effect.promise(async () => {
        const { tokenize } = await import("@/lib/highlighter");
        const [source, output] = await Promise.all([
          tokenize(sampleCode, "typescript"),
          tokenize(outputCode, "javascript"),
        ]);
        return { source, output };
      }),
    ),
  );
}

interface Piece {
  readonly text: string;
  readonly color: string | undefined;
  readonly highlight: number;
}

// Splits each line's tokens at the highlight edges, so a highlight can wrap
// part of a token, and groups the pieces under the highlight they fall in
// (-1 for none). A highlight across lines wraps its part of each line.
const decorate = (lines: Lines, highlights: ReadonlyArray<Highlight>) => {
  let offset = 0;
  return lines.map((tokens) => {
    const pieces: Array<Piece> = [];
    for (const token of tokens) {
      const start = offset;
      const end = start + token.text.length;
      offset = end;
      const cuts = new Set([start, end]);
      for (const { start: from, end: to } of highlights) {
        if (from > start && from < end) cuts.add(from);
        if (to > start && to < end) cuts.add(to);
      }
      const points = [...cuts].sort((a, b) => a - b);
      for (let i = 0; i < points.length - 1; i++) {
        const from = points[i]!;
        const to = points[i + 1]!;
        pieces.push({
          text: token.text.slice(from - start, to - start),
          color: token.color,
          highlight: highlights.findIndex(
            (range) => range.start <= from && to <= range.end && range.start < range.end,
          ),
        });
      }
    }
    offset += 1;
    return pieces.reduce<Array<{ highlight: number; pieces: Array<Piece> }>>((groups, piece) => {
      const last = groups.at(-1);
      if (last && last.highlight === piece.highlight) last.pieces.push(piece);
      else groups.push({ highlight: piece.highlight, pieces: [piece] });
      return groups;
    }, []);
  });
};

const plainLines = (code: string): Lines => code.split("\n").map((text) => [{ text }]);

// The highlight and its hover label, as Tailwind classes rather than a
// stylesheet: an empty label shows no tooltip.
const HIGHLIGHT_CLASS =
  "compiler-highlight relative rounded-[2px] border-b-2 border-[rgb(59_130_246/0.6)] bg-[rgb(59_130_246/0.25)] px-[2px] py-px transition-all duration-200 ease-[ease] hover:border-[rgb(59_130_246/0.8)] hover:bg-[rgb(59_130_246/0.35)]";
const LABEL_CLASS =
  "after:pointer-events-none after:absolute after:bottom-full after:left-0 after:z-10 after:translate-y-1 after:whitespace-nowrap after:rounded-[3px] after:border after:border-[rgb(59_130_246/0.4)] after:bg-[#1e1e2e] after:px-1.5 after:py-0.5 after:text-[10px] after:text-[#60a5fa] after:opacity-0 after:transition-all after:duration-200 after:ease-[ease] after:content-[attr(data-label)] hover:after:-translate-y-1 hover:after:opacity-100";

const CompilerVisualizerMessage = UiSchema.TaggedEnum({
  ClickedStage: { stage: Schema.Number },
  ClickedPrevious: {},
  ClickedNext: {},
  ClickedPlayPause: {},
  ClickedReset: {},
  Ticked: {},
});
type CompilerVisualizerMessage = typeof CompilerVisualizerMessage.Type;

const CompilerVisualizerModel = Schema.Struct({ stage: Schema.Number, playing: Schema.Boolean });
type CompilerVisualizerModel = typeof CompilerVisualizerModel.Type;

const CodeView = (
  h: Html.H<CompilerVisualizerMessage>,
  lines: Lines,
  highlights: ReadonlyArray<Highlight>,
) =>
  h.pre
    .class("shiki catppuccin-mocha")
    .style({ backgroundColor: "#1e1e2e", color: "#cdd6f4" })
    .attr("tabindex", "0")
    .children(
      h.code.children(
        decorate(lines, highlights).flatMap((groups, line) => [
          line > 0 ? "\n" : null,
          h.span
            .key(String(line))
            .class("line")
            .children(
              groups.map(({ highlight, pieces }, group) => {
                const text = pieces.map((piece, i) =>
                  piece.color
                    ? h.span.key(String(i)).style({ color: piece.color }).children(piece.text)
                    : piece.text,
                );
                if (highlight === -1) return h.span.key(String(group)).children(text);
                const label = highlights[highlight]?.label ?? "";
                return h.span
                  .key(String(group))
                  .class(label ? `${HIGHLIGHT_CLASS} ${LABEL_CLASS}` : HIGHLIGHT_CLASS)
                  .attr("data-label", label)
                  .children(text);
              }),
            ),
        ]),
      ),
    );

export const CompilerVisualizerNoDeps = Html.component({
  name: "CompilerVisualizer",
  model: CompilerVisualizerModel,
  message: CompilerVisualizerMessage,
  queries: { samples: { query: HighlightSamples, args: () => ({}) } },
  restore: (model) => ({ ...model, playing: false }),
}).make({
  init: (): CompilerVisualizerModel => ({ stage: 0, playing: false }),
  update: ($, message) =>
    CompilerVisualizerMessage.match(message, {
      ClickedStage: ({ stage }) => ({ stage, playing: false }),
      ClickedPrevious: () => $.evolve({ stage: (stage) => Math.max(0, stage - 1) }),
      ClickedNext: () => $.evolve({ stage: (stage) => Math.min(LAST, stage + 1) }),
      ClickedPlayPause: () =>
        $.evolve({
          stage: (stage) => (stage >= LAST ? 0 : stage),
          playing: (playing) => !playing,
        }),
      ClickedReset: () => ({ stage: 0, playing: false }),
      Ticked: () =>
        $.model.stage >= LAST
          ? $.evolve({ playing: false })
          : $.evolve({ stage: (stage) => stage + 1 }),
    }),
  subscriptions: ({ model }) => [
    model.playing &&
      Subscription.make(
        "autoplay",
        Stream.tick("2500 millis").pipe(
          Stream.drop(1),
          Stream.map(() => CompilerVisualizerMessage.Ticked()),
        ),
      ),
  ],
  view: (h, { stage: current, playing }) => {
    const stage = stages[current] ?? stages[0]!;
    const code = stage.output ?? sampleCode;
    const lines = AsyncResult.match(h.queries.samples, {
      onInitial: () => plainLines(code),
      onFailure: () => plainLines(code),
      onSuccess: ({ value }) => (stage.output ? value.output : value.source),
    });
    return h.div.class("space-y-6").children(
      h.div.class("flex flex-wrap gap-2").children(
        stages.map((s, idx) =>
          Button(h, {
            variant: current === idx ? "default" : "outline",
            size: "sm",
            className: current === idx ? "text-xs ring-2 ring-blue-500" : "text-xs",
          })
            .key(String(s.id))
            .on("click", CompilerVisualizerMessage.ClickedStage({ stage: idx }))
            .children(`${idx}. ${s.name}`),
        ),
      ),
      h.div
        .class("rounded-lg border border-border bg-muted/30 p-6")
        .children(
          h.h3.class("font-bold text-xl mb-2").children(stage.name),
          h.p.class("text-muted-foreground").children(stage.description),
        ),
      h.div
        .class("relative overflow-hidden rounded-lg border border-[#313244]")
        .children(
          h.div
            .class(
              "absolute top-2 left-2 z-10 text-xs font-medium text-[#7f849c] bg-[#1e1e2e]/80 px-2 py-1 rounded",
            )
            .children(stage.output ? "JavaScript Output" : "TypeScript Source"),
          h.div
            .class("relative mt-8")
            .children(
              h.div
                .class("overflow-x-auto text-sm [&_pre]:p-4 [&_pre]:m-0")
                .children(CodeView(h, lines, stage.highlights)),
            ),
        ),
      h.div.class("flex items-center justify-between gap-4").children(
        h.div.class("flex gap-2").children(
          Button(h, { variant: "outline", size: "icon" })
            .attr("aria-label", "Previous stage")
            .disabled(current === 0)
            .on("click", CompilerVisualizerMessage.ClickedPrevious())
            .children(Icon(h, ChevronLeft)),
          Button(h, { variant: "outline", size: "icon" })
            .attr("aria-label", playing ? "Pause" : "Play")
            .on("click", CompilerVisualizerMessage.ClickedPlayPause())
            .children(playing ? Icon(h, Pause) : Icon(h, Play)),
          Button(h, { variant: "outline", size: "icon" })
            .attr("aria-label", "Next stage")
            .disabled(current === LAST)
            .on("click", CompilerVisualizerMessage.ClickedNext())
            .children(Icon(h, ChevronRight)),
          Button(h, { variant: "outline", size: "icon" })
            .attr("aria-label", "Reset")
            .on("click", CompilerVisualizerMessage.ClickedReset())
            .children(Icon(h, RotateCcw)),
        ),
        h.div
          .class("text-sm text-muted-foreground")
          .children(`Stage ${current + 1} of ${stages.length}`),
      ),
    );
  },
});

export const CompilerVisualizer = CompilerVisualizerNoDeps.pipe(
  Component.provide(HighlightSamples.layer),
);
