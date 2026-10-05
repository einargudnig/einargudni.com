import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Formats a date string into a reader-friendly format
 * @param dateString - ISO format date string (YYYY-MM-DD)
 * @returns Formatted date string (e.g., "October 11, 2024")
 */
// "10 Feb 2026": fits a ledger's date column without wrapping.
export const formatShortDate = (dateString: string) =>
  new Date(dateString).toLocaleDateString("en-GB", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

export function formatBlogDate(dateString: string): string {
  const date = new Date(dateString);

  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
