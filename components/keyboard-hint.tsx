import { Keyboard } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const STORAGE_KEY = "keyboard-hint-dismissed";

const bindings = [
  { keys: "g h", label: "Home" },
  { keys: "g b", label: "Blog" },
  { keys: "g u", label: "Uses" },
  { keys: "g a", label: "About" },
  { keys: "g w", label: "Now" },
  { keys: "g q", label: "Quotes" },
  { keys: "g s", label: "Someday" },
  { divider: true, label: "Scroll" },
  { keys: "j / k", label: "Scroll down / up" },
  { keys: "d / u", label: "Half-page down / up" },
  { keys: "G", label: "Bottom" },
  { keys: "g g", label: "Top" },
] as const;

export function KeyboardHint() {
  const [open, setOpen] = useState(false);
  const [showFirstVisit, setShowFirstVisit] = useState(false);

  useEffect(() => {
    try {
      if (!localStorage.getItem(STORAGE_KEY)) {
        const timer = setTimeout(() => setShowFirstVisit(true), 2000);
        return () => clearTimeout(timer);
      }
    } catch {
      // localStorage unavailable
    }
  }, []);

  // Listen for ? key toggle from keyboard-nav
  useEffect(() => {
    function handleToggleEvent() {
      if (showFirstVisit) dismissFirstVisit();
      setOpen((prev) => !prev);
    }
    window.addEventListener("toggle-keyboard-hints", handleToggleEvent);
    return () => window.removeEventListener("toggle-keyboard-hints", handleToggleEvent);
  }, [showFirstVisit]);

  function dismissFirstVisit() {
    setShowFirstVisit(false);
    try {
      localStorage.setItem(STORAGE_KEY, "1");
    } catch {
      // localStorage unavailable
    }
  }

  function handleToggle() {
    if (showFirstVisit) dismissFirstVisit();
    setOpen((prev) => !prev);
  }

  return (
    <div className="relative hidden md:block">
      {/* Trigger button */}
      <button
        onClick={handleToggle}
        className={cn(
          "flex items-center justify-center text-muted-foreground hover:text-brand transition-colors",
          open && "text-brand",
        )}
        aria-label="Keyboard shortcuts"
      >
        <Keyboard size={16} strokeWidth={1.5} />
      </button>

      {/* First visit hint */}
      {showFirstVisit && !open && (
        <div className="absolute -bottom-12 right-0 animate-fade-in-up">
          <button
            onClick={() => {
              dismissFirstVisit();
              setOpen(true);
            }}
            className="whitespace-nowrap rounded-md border border-border bg-card px-3 py-1.5 text-xs font-mono text-muted-foreground shadow-lg hover:text-foreground transition-colors"
          >
            Keyboard shortcuts available
          </button>
        </div>
      )}

      {/* Cheat sheet popover */}
      {open && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setOpen(false)}
          />
          <div className="absolute right-0 top-full mt-3 z-50 w-64 rounded-lg border border-border bg-card p-4 shadow-lg animate-fade-in-up">
            <div className="flex items-center justify-between mb-3">
              <p className="text-sm font-semibold">Keyboard shortcuts</p>
              <kbd className="text-xs text-muted-foreground font-mono">?</kbd>
            </div>
            <div className="space-y-1">
              {bindings.map((b) =>
                "divider" in b ? (
                  <p
                    key={b.label}
                    className="text-xs text-muted-foreground font-semibold pt-2 pb-1 border-t border-border/50 mt-2"
                  >
                    {b.label}
                  </p>
                ) : (
                  <div
                    key={b.label}
                    className="flex items-center justify-between py-0.5"
                  >
                    <span className="text-xs text-muted-foreground">
                      {b.label}
                    </span>
                    <kbd className="text-xs font-mono text-brand">
                      {b.keys}
                    </kbd>
                  </div>
                ),
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
