import { cn } from "@/lib/utils";
import { ArrowRightIcon, ExternalLinkIcon, LinkIcon } from "lucide-react";
import { Link } from "@/components/ui/link";
import { ExternalLink } from "./external-link";

interface CardLinkProps {
  href: string;
  title: string;
  description?: string;
  icon?: React.ReactNode;
  className?: string;
  external?: boolean;
}

export function CardLink({
  href,
  title,
  description,
  icon,
  className,
  external = false,
}: CardLinkProps) {
  const LinkComponent = external
    ? ({ children }: { children: React.ReactNode }) => (
        <a href={href} target="_blank" rel="noopener noreferrer">
          {children}
        </a>
      )
    : ({ children }: { children: React.ReactNode }) => <Link href={href}>{children}</Link>;

  return (
    <LinkComponent>
      <div
        className={cn(
          "group flex items-start gap-3 rounded-lg border p-4 hover:bg-muted transition-colors",
          className,
        )}
      >
        {icon && <div className="mt-1 text-muted-foreground">{icon}</div>}
        <div className="space-y-1">
          <div className="font-medium group-hover:underline flex items-center gap-1.5">
            {title}
            {external ? <ExternalLinkIcon className="h-3.5 w-3.5 opacity-70" /> : null}
          </div>
          {description && <div className="text-sm text-muted-foreground">{description}</div>}
        </div>
      </div>
    </LinkComponent>
  );
}

interface InlineResourceLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

export function ResourceLink({ href, children, className }: InlineResourceLinkProps) {
  const isExternal = href.startsWith("http");

  if (isExternal) {
    return <ExternalLink href={href}>{children}</ExternalLink>;
  }

  return (
    <Link
      href={href}
      className={cn(
        "inline-flex items-center gap-1 font-medium text-primary hover:underline",
        className,
      )}
    >
      <LinkIcon className="h-4 w-4" />
      {children}
    </Link>
  );
}

interface ReadMoreLinkProps {
  href: string;
  children?: React.ReactNode;
  className?: string;
  external?: boolean;
}

export function ReadMoreLink({
  href,
  children = "Read more",
  className,
  external = false,
}: ReadMoreLinkProps) {
  if (external) {
    return (
      <ExternalLink href={href}>
        <span className={cn("inline-flex items-center gap-1.5 hover:underline", className)}>
          {children}
        </span>
      </ExternalLink>
    );
  }

  return (
    <Link
      href={href}
      className={cn(
        "inline-flex items-center gap-1.5 font-medium text-primary hover:underline",
        className,
      )}
    >
      <span>{children}</span>
      <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
    </Link>
  );
}
