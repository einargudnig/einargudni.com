import { Link } from "@/components/ui/link";
import { useRouterState } from "@tanstack/react-router";
import { cn } from "@/lib/utils";
import { KeyboardHint } from "@/components/keyboard-hint";
import { EditionToggle, SunTimes } from "@/components/edition";

const navItems = [
  { path: "/work", name: "work" },
  { path: "/blog", name: "blog" },
  { path: "/uses", name: "uses" },
];

// The masthead: name and sections on a full-weight rule, today's Reykjavík
// sun and the edition beneath it.
export function Navbar() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <header className="mb-14 md:mb-20 print:mb-8">
      <div className="flex items-baseline justify-between gap-4 border-b border-foreground pb-2.5">
        <Link
          href="/"
          aria-current={pathname === "/" ? "page" : undefined}
          className="font-semibold tracking-tight transition-colors hover:text-brand"
        >
          Einar Gudni
        </Link>
        <nav aria-label="Main" id="nav" className="flex items-baseline gap-3 text-sm sm:gap-5">
          {navItems.map(({ path, name }) => {
            const isActive = pathname?.startsWith(path) ?? false;
            return (
              <Link
                key={path}
                href={path}
                aria-current={isActive ? "page" : undefined}
                className={cn(
                  "underline-offset-[6px] transition-colors",
                  isActive
                    ? "text-foreground underline decoration-1"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                {name}
              </Link>
            );
          })}
          <Link
            href="/#contact"
            className="hidden text-brand underline-offset-[6px] hover:underline sm:inline"
          >
            work with me
          </Link>
        </nav>
      </div>
      <div className="flex items-center justify-between gap-4 pt-2">
        <SunTimes />
        <div className="flex items-center gap-4">
          <Link
            href="/#contact"
            className="text-sm text-brand underline-offset-[6px] hover:underline sm:hidden"
          >
            hire
          </Link>
          <EditionToggle />
          <KeyboardHint />
        </div>
      </div>
    </header>
  );
}
