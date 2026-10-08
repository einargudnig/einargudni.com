import { cn } from "@/lib/utils";
import React from "react";

interface TimelineItemProps {
  date: string;
  title: string;
  description?: string;
  icon?: React.ReactNode;
  isLast?: boolean;
  className?: string;
}

function TimelineItem({ date, title, description, icon, isLast, className }: TimelineItemProps) {
  return (
    <div className={cn("flex gap-4 relative", className)}>
      {/* Icon and line */}
      <div className="flex flex-col items-center">
        <div className="flex items-center justify-center rounded-full bg-muted w-8 h-8 shrink-0 z-10">
          {icon || <div className="w-3 h-3 rounded-full bg-brand" />}
        </div>
        {!isLast && <div className="w-px h-full bg-border mt-2" />}
      </div>

      {/* Content */}
      <div className="pb-8">
        <p className="text-sm font-medium text-muted-foreground mb-1">{date}</p>
        <h3 className="text-base font-semibold mb-2">{title}</h3>
        {description && <p className="text-muted-foreground text-sm">{description}</p>}
      </div>
    </div>
  );
}

interface TimelineProps {
  items: Array<{
    date: string;
    title: string;
    description?: string;
    icon?: React.ReactNode;
  }>;
  className?: string;
}

export function Timeline({ items, className }: TimelineProps) {
  return (
    <div className={cn("my-4", className)}>
      {items.map((item, index) => (
        <TimelineItem
          key={`${item.date}-${item.title}`}
          date={item.date}
          title={item.title}
          description={item.description}
          icon={item.icon}
          isLast={index === items.length - 1}
        />
      ))}
    </div>
  );
}
