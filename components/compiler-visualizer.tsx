import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { highlight } from "@/lib/highlighter";
import { ChevronLeft, ChevronRight, Play, RotateCcw, Pause } from "lucide-react";

interface CompilerStage {
  id: number;
  name: string;
  description: string;
  highlights: Array<{ start: number; end: number; label?: string }>;
  output?: string;
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

// Helper to find token positions in code
const findToken = (code: string, token: string, occurrence = 1): { start: number; end: number } => {
  let count = 0;
  let index = -1;

  while (count < occurrence) {
    index = code.indexOf(token, index + 1);
    if (index === -1) {
      return { start: 0, end: 0 };
    }
    count++;
  }

  return { start: index, end: index + token.length };
};

const stages: CompilerStage[] = [
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
    output: `function greet(user) {
  return \`Hello, \${user.name}!\`;
}

const person = {
  name: "Alice",
  age: 30
};

greet(person);`,
  },
  {
    id: 6,
    name: "Emitter",
    description:
      "The emitter generates the final JavaScript output. All TypeScript-specific syntax is gone. The code is ready to run in any JavaScript environment.",
    highlights: [],
    output: `function greet(user) {
  return \`Hello, \${user.name}!\`;
}

const person = {
  name: "Alice",
  age: 30
};

greet(person);`,
  },
];

export function CompilerVisualizer() {
  const [currentStage, setCurrentStage] = useState(0);
  const [highlightedCode, setHighlightedCode] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);

  const stage = stages[currentStage];
  const displayCode = stage.output || sampleCode;

  useEffect(() => {
    const highlightCode = async () => {
      try {
        // Convert character offset to line/column position
        const getPosition = (offset: number) => {
          const lines = displayCode.split("\n");
          let currentOffset = 0;

          for (let lineIndex = 0; lineIndex < lines.length; lineIndex++) {
            const lineLength = lines[lineIndex].length;
            const lineEndOffset = currentOffset + lineLength;

            if (offset <= lineEndOffset) {
              return {
                line: lineIndex,
                character: offset - currentOffset,
              };
            }

            // +1 for the newline character
            currentOffset = lineEndOffset + 1;
          }

          // If we get here, return the last position
          return {
            line: lines.length - 1,
            character: lines[lines.length - 1].length,
          };
        };

        const decorations = stage.highlights.map((range) => {
          const start = getPosition(range.start);
          const end = getPosition(range.end);

          return {
            start,
            end,
            properties: {
              class: "compiler-highlight",
              "data-label": range.label || "",
            },
          };
        });

        const html = await highlight(displayCode, stage.output ? "javascript" : "typescript", {
          decorations,
        });
        setHighlightedCode(html);
      } catch (error) {
        console.error("Failed to highlight code:", error);
        setHighlightedCode(`<pre><code>${displayCode}</code></pre>`);
      }
    };

    highlightCode();
  }, [displayCode, stage.highlights, stage.output]);

  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setCurrentStage((prev) => {
        if (prev >= stages.length - 1) {
          setIsPlaying(false);
          return prev;
        }
        return prev + 1;
      });
    }, 2500);

    return () => clearInterval(interval);
  }, [isPlaying]);

  const handleNext = () => {
    if (currentStage < stages.length - 1) {
      setCurrentStage(currentStage + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStage > 0) {
      setCurrentStage(currentStage - 1);
    }
  };

  const handleReset = () => {
    setCurrentStage(0);
    setIsPlaying(false);
  };

  const handlePlayPause = () => {
    if (currentStage >= stages.length - 1) {
      setCurrentStage(0);
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="space-y-6">
      {/* Stage Selector */}
      <div className="flex flex-wrap gap-2">
        {stages.map((s, idx) => (
          <Button
            key={s.id}
            variant={currentStage === idx ? "default" : "outline"}
            size="sm"
            onClick={() => {
              setCurrentStage(idx);
              setIsPlaying(false);
            }}
            className={cn("text-xs", currentStage === idx && "ring-2 ring-blue-500")}
          >
            {idx}. {s.name}
          </Button>
        ))}
      </div>

      {/* Stage Description */}
      <div className="rounded-lg border border-border bg-muted/30 p-6">
        <h3 className="font-bold text-xl mb-2">{stage.name}</h3>
        <p className="text-muted-foreground">{stage.description}</p>
      </div>

      {/* Code Display */}
      <div className="relative overflow-hidden rounded-lg border border-[#313244]">
        <style
          dangerouslySetInnerHTML={{
            __html: `
            .compiler-highlight {
              background-color: rgba(59, 130, 246, 0.25);
              border-bottom: 2px solid rgba(59, 130, 246, 0.6);
              border-radius: 2px;
              padding: 1px 2px;
              position: relative;
              transition: all 0.2s ease;
            }
            .compiler-highlight:hover {
              background-color: rgba(59, 130, 246, 0.35);
              border-bottom-color: rgba(59, 130, 246, 0.8);
            }
            .compiler-highlight::after {
              content: attr(data-label);
              position: absolute;
              bottom: 100%;
              left: 0;
              background: #1e1e2e;
              color: #60a5fa;
              font-size: 10px;
              padding: 2px 6px;
              border-radius: 3px;
              white-space: nowrap;
              opacity: 0;
              pointer-events: none;
              transform: translateY(4px);
              transition: all 0.2s ease;
              border: 1px solid rgba(59, 130, 246, 0.4);
              z-index: 10;
            }
            .compiler-highlight:hover::after {
              opacity: 1;
              transform: translateY(-4px);
            }
            .compiler-highlight[data-label=""]::after {
              display: none;
            }
          `,
          }}
        />
        <div className="absolute top-2 left-2 z-10 text-xs font-medium text-[#7f849c] bg-[#1e1e2e]/80 px-2 py-1 rounded">
          {stage.output ? "JavaScript Output" : "TypeScript Source"}
        </div>

        <div className="relative mt-8">
          <div
            className="overflow-x-auto text-sm [&_pre]:p-4 [&_pre]:m-0"
            dangerouslySetInnerHTML={{ __html: highlightedCode }}
          />
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={handlePrevious}
            disabled={currentStage === 0}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" onClick={handlePlayPause}>
            {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={handleNext}
            disabled={currentStage === stages.length - 1}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" onClick={handleReset}>
            <RotateCcw className="h-4 w-4" />
          </Button>
        </div>

        <div className="text-sm text-muted-foreground">
          Stage {currentStage + 1} of {stages.length}
        </div>
      </div>
    </div>
  );
}
