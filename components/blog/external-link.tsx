import { ArrowTopRightIcon } from "@radix-ui/react-icons";
import { Link } from "@/components/ui/link";

export function ExternalLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center text-muted-foreground hover:text-brand transition-colors group"
    >
      <span className="underline underline-offset-2 decoration-border hover:decoration-brand transition-colors">
        {children}
      </span>
      <ArrowTopRightIcon className="ml-1 h-3 w-3 opacity-60 group-hover:opacity-100 group-hover:scale-110 transition-[opacity,transform] duration-150 ease-[var(--ease-out)]" />
    </Link>
  );
}
