import { cn } from "@/lib/utils";
import { CheckIcon, CircleIcon } from "lucide-react";
import React, { type ComponentPropsWithoutRef, type ReactNode } from "react";

type ListIcon = "check" | "circle" | "number" | "none";

type ListItemProps = ComponentPropsWithoutRef<"li"> & {
  icon?: ListIcon;
  index?: number;
};

type ListStyleType = "disc" | "circle" | "check" | "number" | "none";

type StylishListProps = {
  children: ReactNode | ReactNode[];
  type?: ListStyleType;
  className?: string;
  gap?: "tight" | "normal" | "loose";
};

export function StylishListItem({
  children,
  icon = "none",
  index,
  className,
  ...props
}: ListItemProps) {
  const renderIcon = () => {
    switch (icon) {
      case "check":
        return (
          <span className="mr-2 flex h-5 w-5 items-center justify-center rounded-full bg-primary/10 text-primary">
            <CheckIcon className="h-3.5 w-3.5" />
          </span>
        );
      case "circle":
        return (
          <span className="mr-2 flex h-5 w-5 items-center justify-center">
            <CircleIcon className="h-1.5 w-1.5 fill-current" />
          </span>
        );
      case "number":
        return (
          <span className="mr-2 flex h-5 w-5 items-center justify-center rounded-full bg-primary/10 text-xs font-medium text-primary">
            {index}
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <li className={cn("flex items-start", className)} {...props}>
      {renderIcon()}
      <div className="flex-1">{children}</div>
    </li>
  );
}

export function StylishList({
  children,
  type = "disc",
  className,
  gap = "normal",
}: StylishListProps) {
  // MDX emits a "\n" text node between list items; wrapping those renders
  // as empty bullets.
  const childrenArray = React.Children.toArray(children).filter(
    (child) => !(typeof child === "string" && child.trim() === ""),
  );

  // Content-derived, deduped keys for children that need to be wrapped
  // (a plain index would misreconcile if the list is ever reordered/filtered)
  const keyCounts = new Map<string, number>();
  const keyFor = (child: ReactNode) => {
    const base =
      React.isValidElement(child) && child.key != null ? String(child.key) : String(child);
    const count = keyCounts.get(base) ?? 0;
    keyCounts.set(base, count + 1);
    return count === 0 ? base : `${base}-${count}`;
  };

  // Apply spacing based on the gap prop
  const gapClasses = {
    tight: "space-y-1",
    normal: "space-y-2",
    loose: "space-y-4",
  };

  // Apply the right list type
  const listTypeClasses = {
    disc: "", // We'll handle disc styling with the StylishListItem
    circle: "", // Same for circle
    check: "", // Same for check
    number: "", // Same for numbers
    none: "list-none", // Only "none" is applied directly to the ul
  };

  return (
    <ul className={cn("my-6", gapClasses[gap], listTypeClasses[type], className)}>
      {childrenArray.map((child, index) => {
        let icon: ListIcon = "none";
        switch (type) {
          case "check":
            icon = "check";
            break;
          case "circle":
            icon = "circle";
            break;
          case "number":
            icon = "number";
            break;
          case "disc":
            icon = "circle"; // Use circle for disc style for simplicity
            break;
          default:
            icon = "none";
        }

        // Already an item (including MDX's `li`): fill in what the list knows.
        // Wrapping it again would nest an <li> inside an <li>.
        if (React.isValidElement<ListItemProps>(child) && child.type === StylishListItem) {
          return React.cloneElement(child, {
            index: index + 1,
            icon: child.props.icon ?? icon,
          });
        }

        return (
          <StylishListItem key={keyFor(child)} icon={icon} index={index + 1}>
            {child}
          </StylishListItem>
        );
      })}
    </ul>
  );
}
