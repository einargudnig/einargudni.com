import { Github, Mail, Twitter } from "lucide-react";
import { Link } from "@/components/ui/link";
import { useRouterState } from "@tanstack/react-router";
import { cn } from "@/lib/utils";
import { KeyboardHint } from "@/components/keyboard-hint";

const navItems = {
  "/": {
    name: "home",
  },
  "/uses": {
    name: "uses",
  },
  "/blog": {
    name: "blog",
  },
  "/work": {
    name: "work",
  },
};

export function Navbar() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <nav className="mx-auto w-full space-y-8 print:space-y-6">
      <aside className="mb-16 tracking-tight">
        <div className="lg:sticky lg:top-20">
          <nav className="pb-4 border-b border-border/50" id="nav">
            <div className="flex justify-between items-center">
              <div className="flex items-center flex-row-reverse md:flex-row">
                <div className="flex flex-row gap-x-1">
                  {Object.entries(navItems).map(([path, { name }]) => {
                    const isActive =
                      path === "/"
                        ? pathname === "/"
                        : (pathname?.startsWith(path) ?? false);

                    return (
                      <Link
                        key={path}
                        href={path}
                        className={cn(
                          "transition-colors duration-200 flex align-middle relative py-2 px-3 rounded-md",
                          "after:absolute after:bottom-0 after:left-3 after:right-3 after:h-px",
                          isActive
                            ? "text-foreground after:bg-foreground/60"
                            : "text-muted-foreground hover:text-brand hover:bg-muted/50 after:bg-transparent",
                        )}
                      >
                        {name}
                      </Link>
                    );
                  })}
                </div>
              </div>
              <div className="flex items-center gap-x-3">
                {/* Jumps to the contact form on the home page. The navbar is already at
                    its width limit on phones, so the label collapses to a mail icon
                    that sits with the social links. */}
                <Link
                  href="/#contact"
                  className={cn(
                    "hidden sm:inline-flex items-center gap-x-2 rounded-full border py-1.5 px-3",
                    "text-sm transition-colors",
                    "border-border/60 text-muted-foreground",
                    "hover:border-brand/40 hover:bg-muted/50 hover:text-brand",
                  )}
                >
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand opacity-60 motion-reduce:hidden" />
                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-brand" />
                  </span>
                  work with me
                </Link>
                <Link
                  href="/#contact"
                  aria-label="Work with me"
                  className="sm:hidden text-muted-foreground hover:text-brand transition-colors p-2 -m-1"
                >
                  <Mail size={20} strokeWidth={1.5} />
                </Link>
                <KeyboardHint />
                <Link
                  href="https://github.com/einargudnig"
                  className="text-muted-foreground hover:text-brand transition-colors p-2 -m-1"
                >
                  <Github size={20} strokeWidth={1.5} />
                </Link>
                <Link
                  href="https://x.com/einargudni"
                  className="text-muted-foreground hover:text-brand transition-colors p-2 -m-1"
                >
                  <Twitter size={20} strokeWidth={1.5} />
                </Link>
              </div>
            </div>
          </nav>
        </div>
      </aside>
    </nav>
  );
}
