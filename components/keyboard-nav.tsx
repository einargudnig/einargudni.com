import { useNavigate } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

const CHORD_TIMEOUT = 1500;

const routes: Record<string, { path: string; label: string }> = {
  h: { path: "/", label: "home" },
  b: { path: "/blog", label: "blog" },
  u: { path: "/uses", label: "uses" },
  a: { path: "/about", label: "about" },
  s: { path: "/someday", label: "someday" },
  w: { path: "/now", label: "now" },
  q: { path: "/quotes", label: "quotes" },
};

export function KeyboardNav() {
  const navigate = useNavigate();
  const pendingRef = useRef(false);
  const timerRef = useRef<ReturnType<typeof setTimeout>>(null);
  const [display, setDisplay] = useState<"idle" | "pending" | string>("idle");

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      const target = e.target as HTMLElement;
      if (
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.isContentEditable
      ) {
        return;
      }

      if (e.metaKey || e.ctrlKey || e.altKey) return;

      // ? to toggle keyboard shortcuts cheat sheet
      if (e.key === "?") {
        window.dispatchEvent(new CustomEvent("toggle-keyboard-hints"));
        return;
      }

      // Vim scroll motions (only when not in chord mode)
      if (!pendingRef.current) {
        const scrollAmount = 80;
        const halfPage = window.innerHeight / 2;

        switch (e.key) {
          case "j":
            window.scrollBy({ top: scrollAmount });
            return;
          case "k":
            window.scrollBy({ top: -scrollAmount });
            return;
          case "d":
            window.scrollBy({ top: halfPage });
            return;
          case "u":
            window.scrollBy({ top: -halfPage });
            return;
          case "G":
            window.scrollTo({ top: document.body.scrollHeight });
            return;
        }
      }

      if (!pendingRef.current && e.key === "g") {
        pendingRef.current = true;
        setDisplay("pending");

        if (timerRef.current) clearTimeout(timerRef.current);
        timerRef.current = setTimeout(() => {
          pendingRef.current = false;
          setDisplay("idle");
        }, CHORD_TIMEOUT);
        return;
      }

      if (pendingRef.current) {
        pendingRef.current = false;
        if (timerRef.current) clearTimeout(timerRef.current);

        // gg → scroll to top
        if (e.key === "g") {
          e.preventDefault();
          window.scrollTo({ top: 0 });
          setDisplay("idle");
          return;
        }

        const route = routes[e.key];
        if (route) {
          e.preventDefault();
          setDisplay(route.label);
          navigate({ to: route.path });
          setTimeout(() => setDisplay("idle"), 800);
        } else {
          setDisplay("idle");
        }
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [navigate]);

  const show = display !== "idle";

  return (
    <div
      className={cn(
        "fixed bottom-6 left-1/2 -translate-x-1/2 z-50 pointer-events-none transition-all duration-200",
        show
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-2",
      )}
    >
      <div className="rounded-lg border border-border bg-card px-4 py-2.5 shadow-lg">
        {display !== "pending" && display !== "idle" ? (
          <p className="text-sm text-foreground font-mono">
            <kbd className="text-brand font-semibold">
              g {Object.entries(routes).find(([, r]) => r.label === display)?.[0]}
            </kbd>
            <span className="text-muted-foreground ml-2">&rarr; {display}</span>
          </p>
        ) : (
          <div className="flex items-center gap-4">
            <p className="text-sm text-muted-foreground font-mono">
              <kbd className="text-brand font-semibold">g</kbd>
              <span className="ml-1.5">+</span>
            </p>
            <div className="flex gap-3 text-xs font-mono text-muted-foreground">
              {Object.entries(routes).map(([key, { label }]) => (
                <span key={key}>
                  <kbd className="text-foreground">{key}</kbd> {label}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
