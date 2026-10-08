import { Badge } from "@/components/ui/badge";
import { projectIcons } from "@/components/project-icons";
import { ArrowTopRightIcon } from "@radix-ui/react-icons";
import { Link } from "@/components/ui/link";

export interface Project {
  title: string;
  description: string;
  href: string;
  tags: string[];
  external?: boolean;
}

export function ProjectCard({ title, description, href, tags, external = true }: Project) {
  const Wrapper = external ? "a" : Link;
  const linkProps = external
    ? { href, target: "_blank" as const, rel: "noopener noreferrer" }
    : { href };

  const Icon = projectIcons[title];

  return (
    <Wrapper
      {...linkProps}
      className="group relative flex flex-col justify-between rounded-lg border border-border/50 p-5 transition-[border-color,background-color,transform] duration-200 ease-[var(--ease-out)] hover:border-brand/30 hover:bg-muted/30 hover-lift"
    >
      <div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            {Icon && <Icon />}
            <h3 className="font-semibold group-hover:text-brand transition-colors">{title}</h3>
          </div>
          <ArrowTopRightIcon className="h-4 w-4 text-muted-foreground opacity-0 -translate-y-0.5 translate-x-0.5 transition-[opacity,transform] duration-200 ease-[var(--ease-out)] group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0" />
        </div>
        <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{description}</p>
      </div>
      <div className="mt-4 flex flex-wrap gap-1.5">
        {tags.map((tag) => (
          <Badge key={tag} variant="outline" className="text-xs font-normal">
            {tag}
          </Badge>
        ))}
      </div>
    </Wrapper>
  );
}
