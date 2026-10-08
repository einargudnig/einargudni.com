import { cn } from "@/lib/utils";
import { ChevronDownIcon } from "lucide-react";
import { useState } from "react";

// Tabs Component
interface TabItem {
  label: string;
  content: React.ReactNode;
}

interface TabsProps {
  items: TabItem[];
  defaultIndex?: number;
  className?: string;
}

export function Tabs({ items, defaultIndex = 0, className }: TabsProps) {
  const [activeTab, setActiveTab] = useState(defaultIndex);

  return (
    <div className={cn("my-6", className)}>
      <div className="flex border-b overflow-x-auto">
        {items.map((item, idx) => (
          <button
            key={item.label}
            className={cn(
              "px-4 py-2 text-sm font-medium whitespace-nowrap",
              activeTab === idx
                ? "border-b-2 border-primary text-primary"
                : "text-muted-foreground hover:text-foreground",
            )}
            onClick={() => setActiveTab(idx)}
          >
            {item.label}
          </button>
        ))}
      </div>
      <div className="mt-4">{items[activeTab]?.content}</div>
    </div>
  );
}

// Accordion Component
interface AccordionItemProps {
  title: React.ReactNode;
  children: React.ReactNode;
  defaultOpen?: boolean;
  className?: string;
}

export function AccordionItem({
  title,
  children,
  defaultOpen = false,
  className,
}: AccordionItemProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className={cn("border-b", className)}>
      <button
        className="flex w-full items-center justify-between py-4 text-left font-medium"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{title}</span>
        <ChevronDownIcon
          className={cn(
            "h-4 w-4 text-muted-foreground transition-transform duration-200",
            isOpen && "rotate-180",
          )}
        />
      </button>
      {isOpen && <div className="pb-4 pt-2">{children}</div>}
    </div>
  );
}

interface AccordionProps {
  children: React.ReactNode;
  className?: string;
}

export function Accordion({ children, className }: AccordionProps) {
  return <div className={cn("my-6 divide-y rounded-lg border", className)}>{children}</div>;
}
