import { cn } from "@/lib/utils";
import { QuoteIcon } from "lucide-react";

interface BlockquoteProps {
  children: React.ReactNode;
  className?: string;
  citation?: string;
  author?: string;
}

export function Blockquote({ children, className, citation, author }: BlockquoteProps) {
  return (
    <figure className={cn("my-8 relative", className)}>
      <div className="absolute -left-6 top-0 text-muted-foreground">
        <QuoteIcon className="h-6 w-6" />
      </div>
      <blockquote className="border-l-4 pl-6 italic">
        <div className="text-lg">{children}</div>
      </blockquote>
      {(author || citation) && (
        <figcaption className="mt-2 text-right text-sm text-muted-foreground">
          {author && <span className="font-medium">— {author}</span>}
          {author && citation && <span>, </span>}
          {citation && <cite>{citation}</cite>}
        </figcaption>
      )}
    </figure>
  );
}
