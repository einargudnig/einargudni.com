import { cn } from "@/lib/utils";
import React from "react";

interface BaseHeadingProps {
  id?: string;
  className?: string;
  children: React.ReactNode;
}

export function Heading({ id, className, children }: BaseHeadingProps) {
  return (
    <h2 id={id} className={cn("mt-10 scroll-m-20 text-3xl font-bold tracking-tight", className)}>
      {children}
    </h2>
  );
}

export function Subheading({ id, className, children }: BaseHeadingProps) {
  return (
    <h3
      id={id}
      className={cn(
        "mt-8 scroll-m-20 text-2xl font-semibold tracking-tight text-muted-foreground",
        className,
      )}
    >
      {children}
    </h3>
  );
}
