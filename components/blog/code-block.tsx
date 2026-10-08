import { cn } from "@/lib/utils";
import { CheckIcon, ClipboardIcon } from "lucide-react";
import { useState, useEffect } from "react";
import { highlight } from "@/lib/highlighter";

interface CodeBlockProps {
  children: string;
  className?: string;
  language?: string;
  filename?: string;
  showLineNumbers?: boolean;
}

export function CodeBlock({
  children,
  className,
  language = "text",
  filename,
  showLineNumbers = false,
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false);
  const [highlightedCode, setHighlightedCode] = useState<string>("");

  useEffect(() => {
    const highlightCode = async () => {
      try {
        const html = await highlight(children, language, {
          transformers: showLineNumbers
            ? [
                {
                  line(node, line) {
                    node.properties["data-line"] = line;
                    this.addClassToHast(node, "line");
                  },
                  pre(node) {
                    // Preserve existing background and add counter-reset
                    const existingStyle = node.properties.style || "";
                    node.properties.style = `${existingStyle}${existingStyle ? ";" : ""} counter-reset: line;`;
                  },
                },
              ]
            : [],
        });
        setHighlightedCode(html);
      } catch (error) {
        console.error("Failed to highlight code:", error);
        setHighlightedCode(`<pre><code>${children}</code></pre>`);
      }
    };

    highlightCode();
  }, [children, language, showLineNumbers]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(children);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative my-6 overflow-hidden rounded-lg border border-border bg-muted/30">
      {filename && (
        <div className="border-b border-border bg-muted px-4 py-2 text-sm font-medium text-muted-foreground">
          {filename}
        </div>
      )}
      <div className="relative">
        <style
          dangerouslySetInnerHTML={{
            __html: `
            .code-with-lines .line {
              display: inline-block;
              width: 100%;
            }
            .code-with-lines .line::before {
              counter-increment: line;
              content: counter(line);
              display: inline-block;
              width: 2.5rem;
              margin-right: 1.5rem;
              text-align: right;
              color: rgba(127, 132, 156, 0.6);
              user-select: none;
              border-right: 1px solid rgba(127, 132, 156, 0.3);
              padding-right: 0.75rem;
            }
          `,
          }}
        />
        <div
          className={cn(
            "overflow-x-auto text-sm [&_pre]:p-4 [&_pre]:m-0",
            showLineNumbers && "code-with-lines",
            className,
          )}
          dangerouslySetInnerHTML={{ __html: highlightedCode }}
        />
        {language && (
          <div className="absolute right-2 top-2 text-xs font-medium text-muted-foreground/60">
            {language.toUpperCase()}
          </div>
        )}
        <button
          onClick={copyToClipboard}
          className="absolute bottom-2 right-2 rounded bg-muted p-1.5 text-muted-foreground hover:bg-muted/80 hover:text-foreground transition-colors active:scale-[0.95]"
          aria-label="Copy code to clipboard"
        >
          {copied ? (
            <CheckIcon className="h-4 w-4 text-brand" />
          ) : (
            <ClipboardIcon className="h-4 w-4" />
          )}
        </button>
      </div>
    </div>
  );
}
