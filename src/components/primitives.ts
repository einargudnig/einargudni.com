import type { Html } from "@effect/ui/html";
import { cn } from "@/lib/utils";

// The shadcn/ui button, badge and card classes, as view functions. `cn`
// merges a caller's classes over the variant's, as the React primitives did.

const BUTTON_BASE =
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-[transform,background-color,color] duration-150 ease-[var(--ease-out)] active:scale-[0.97] disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive";

const BUTTON_VARIANT = {
  default: "bg-primary text-primary-foreground hover:bg-primary/90",
  outline:
    "border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
};

const BUTTON_SIZE = {
  default: "h-9 px-4 py-2 has-[>svg]:px-3",
  sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
  lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
  icon: "size-9",
};

export const Button = <M>(
  h: Html.H<M>,
  options: {
    readonly variant?: keyof typeof BUTTON_VARIANT;
    readonly size?: keyof typeof BUTTON_SIZE;
    readonly className?: string;
  } = {},
) =>
  h.button
    .attr("data-slot", "button")
    .class(
      cn(
        BUTTON_BASE,
        BUTTON_VARIANT[options.variant ?? "default"],
        BUTTON_SIZE[options.size ?? "default"],
        options.className,
      ),
    );

const BADGE_BASE =
  "inline-flex items-center justify-center rounded-md border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden";

export const SecondaryBadge = <M>(h: Html.H<M>, className?: string) =>
  h.span
    .attr("data-slot", "badge")
    .class(
      cn(
        BADGE_BASE,
        "border-transparent bg-secondary text-secondary-foreground [a&]:hover:bg-secondary/90",
        className,
      ),
    );

export const Card = <M>(h: Html.H<M>, className?: string) =>
  h.div
    .attr("data-slot", "card")
    .class(
      cn(
        "bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm",
        className,
      ),
    );

export const CardHeader = <M>(h: Html.H<M>, className?: string) =>
  h.div
    .attr("data-slot", "card-header")
    .class(
      cn(
        "@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-2 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6",
        className,
      ),
    );

export const CardTitle = <M>(h: Html.H<M>, className?: string) =>
  h.div.attr("data-slot", "card-title").class(cn("leading-none font-semibold", className));

export const CardContent = <M>(h: Html.H<M>, className?: string) =>
  h.div.attr("data-slot", "card-content").class(cn("px-6", className));
