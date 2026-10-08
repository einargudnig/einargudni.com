import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

interface TOCItem {
  id: string;
  title: string;
  level: number;
}

interface TableOfContentsProps {
  className?: string;
  maxDepth?: number; // Maximum heading level to include (h1-h6)
  minItems?: number; // Minimum number of items required to show TOC
}

export function TableOfContents({
  className,
  maxDepth = 3, // Default to h1, h2, h3
  minItems = 2, // Default to showing TOC only if 2+ headings
}: TableOfContentsProps) {
  const [headings, setHeadings] = useState<TOCItem[]>([]);
  const [activeId, setActiveId] = useState<string>("");

  // Extract headings from the content
  useEffect(() => {
    const selectors = Array.from({ length: maxDepth }, (_, i) => `article h${i + 1}[id]`).join(
      ", ",
    );

    const elements = document.querySelectorAll(selectors);
    const items: TOCItem[] = Array.from(elements).map((element) => ({
      id: element.id,
      title: element.textContent || "",
      level: parseInt(element.tagName.charAt(1)),
    }));

    setHeadings(items);
  }, [maxDepth]);

  // Handle scroll to highlight current section
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "-80px 0px -80% 0px" },
    );

    const elements = document.querySelectorAll("article h1[id], article h2[id], article h3[id]");
    elements.forEach((element) => observer.observe(element));

    return () => {
      elements.forEach((element) => observer.unobserve(element));
    };
  }, [headings]);

  // Don't render if too few items
  if (headings.length < minItems) {
    return null;
  }

  return (
    <div className={cn("my-8", className)}>
      <h2 className="text-lg font-medium">Table of Contents</h2>
      <nav className="mt-2">
        <ul className="space-y-2">
          {headings.map((heading) => (
            <li
              key={heading.id}
              style={{
                paddingLeft: `${(heading.level - 1) * 1}rem`,
              }}
            >
              <a
                href={`#${heading.id}`}
                className={cn(
                  "text-sm inline-block hover:underline",
                  activeId === heading.id ? "font-medium text-primary" : "text-muted-foreground",
                )}
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector(`#${heading.id}`)?.scrollIntoView({
                    behavior: "smooth",
                  });
                  setActiveId(heading.id);
                }}
              >
                {heading.title}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
