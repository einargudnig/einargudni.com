import { cn } from "@/lib/utils";
import React from "react";

interface SpacerProps {
  size?: "small" | "medium" | "large" | "xl";
  className?: string;
}

export function Spacer({ size = "medium", className }: SpacerProps) {
  const sizeClasses = {
    small: "h-4", // 1rem / 16px
    medium: "h-8", // 2rem / 32px
    large: "h-12", // 3rem / 48px
    xl: "h-16", // 4rem / 64px
  };

  return <div className={cn(sizeClasses[size], className)} aria-hidden="true" />;
}
