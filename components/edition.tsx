import { useEffect, useState } from "react";
import { isNight, NIGHT_BELOW_DEG, REYKJAVIK, sunAltitude, sunTimes } from "@/lib/sun";

// The site prints in two editions: day (paper) and night (night-blue). By
// default the edition follows the sun over Reykjavík; a reader can pin one.
// "night" maps to the `.dark` class so every `dark:` utility keeps working.

type Pref = "auto" | "day" | "night";
const STORAGE_KEY = "edition";
const PREFS: Pref[] = ["auto", "day", "night"];

const readPref = (): Pref => {
  try {
    const value = localStorage.getItem(STORAGE_KEY);
    return PREFS.includes(value as Pref) ? (value as Pref) : "auto";
  } catch {
    return "auto";
  }
};

const resolve = (pref: Pref) => (pref === "auto" ? (isNight() ? "night" : "day") : pref);

const apply = (pref: Pref) => {
  const night = resolve(pref) === "night";
  document.documentElement.classList.toggle("dark", night);
  document.documentElement.style.colorScheme = night ? "dark" : "light";
};

// Runs in <head> before first paint so a prerendered page never flashes the
// wrong edition. sunAltitude is serialised in; it has no outside references.
export const editionScript = `(() => {
  const sunAltitude = ${sunAltitude.toString()};
  let pref = "auto";
  try { pref = localStorage.getItem(${JSON.stringify(STORAGE_KEY)}) || "auto"; } catch {}
  const night = pref === "night" ||
    (pref !== "day" && sunAltitude(new Date(), ${REYKJAVIK.lat}, ${REYKJAVIK.lng}) < ${NIGHT_BELOW_DEG});
  document.documentElement.classList.toggle("dark", night);
  document.documentElement.style.colorScheme = night ? "dark" : "light";
})();`;

const prefersReducedMotion = () => matchMedia("(prefers-reduced-motion: reduce)").matches;

// The new edition spreads out from the toggle as a widening circle. The
// browser snapshots the old page, applies the new edition underneath, then
// we grow the new snapshot's clip from the button's centre to the far corner.
const switchEdition = (pref: Pref, origin: HTMLElement) => {
  const root = document.documentElement;
  const changes = (resolve(pref) === "night") !== root.classList.contains("dark");
  if (!changes || !("startViewTransition" in document) || prefersReducedMotion()) {
    apply(pref);
    return;
  }

  const { left, top, width, height } = origin.getBoundingClientRect();
  const x = left + width / 2;
  const y = top + height / 2;
  const radius = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));

  // Colour transitions would fade inside the new snapshot and blur the edge.
  root.classList.add("edition-switching");
  const transition = document.startViewTransition(() => apply(pref));
  transition.ready.then(() =>
    root.animate(
      { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
      {
        duration: 700,
        easing: "cubic-bezier(0.22, 1, 0.36, 1)",
        pseudoElement: "::view-transition-new(root)",
      },
    ),
  );
  transition.finished.finally(() => root.classList.remove("edition-switching"));
};

const useEdition = () => {
  const [pref, setPref] = useState<Pref>("auto");
  const [edition, setEdition] = useState<"day" | "night" | null>(null);

  useEffect(() => {
    const initial = readPref();
    setPref(initial);
    setEdition(resolve(initial));
  }, []);

  // In auto, the page turns over to the night edition when the sun goes down
  // over Reykjavík while you read.
  useEffect(() => {
    if (pref !== "auto") return;
    const tick = () => {
      apply("auto");
      setEdition(resolve("auto"));
    };
    const id = setInterval(tick, 60_000);
    return () => clearInterval(id);
  }, [pref]);

  const cycle = (origin: HTMLElement) => {
    const next = PREFS[(PREFS.indexOf(pref) + 1) % PREFS.length];
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {}
    switchEdition(next, origin);
    setPref(next);
    setEdition(resolve(next));
  };

  return { pref, edition, cycle };
};

const LABEL: Record<Pref, string> = {
  auto: "Edition follows the Reykjavík sun",
  day: "Day edition",
  night: "Night edition",
};

export function EditionToggle() {
  const { pref, edition, cycle } = useEdition();
  const next = PREFS[(PREFS.indexOf(pref) + 1) % PREFS.length];
  const label = `${LABEL[pref]}. Switch to ${next === "auto" ? "following the sun" : `the ${next} edition`}.`;

  return (
    <button
      type="button"
      onClick={(event) => cycle(event.currentTarget)}
      aria-label={label}
      title={label}
      className="inline-flex items-center gap-1.5 rounded-sm text-sm text-muted-foreground transition-colors hover:text-foreground"
    >
      <span
        aria-hidden="true"
        className={
          edition === "night"
            ? "h-2.5 w-2.5 rounded-full border border-current"
            : "h-2.5 w-2.5 rounded-full bg-current"
        }
      />
      <span className="tabular-nums">{pref === "auto" ? "sun" : pref}</span>
    </button>
  );
}

const time = (date?: Date) =>
  date
    ? date.toLocaleTimeString("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
        timeZone: "Atlantic/Reykjavik",
      })
    : "--:--";

// "Reykjavík · sunrise 07:48 · sunset 18:45". Prerendered pages cannot know
// today, so the times fill in after mount into a box that already holds
// their width.
export function SunTimes() {
  const [times, setTimes] = useState<ReturnType<typeof sunTimes> | null>(null);
  useEffect(() => setTimes(sunTimes()), []);

  return (
    <p className="text-sm text-muted-foreground tabular-nums">
      <a
        href="https://www.google.com/maps/place/Reykjavík"
        target="_blank"
        rel="noreferrer"
        className="hover:text-foreground transition-colors"
      >
        Reykjavík
      </a>
      <span aria-hidden="true"> · </span>
      sunrise {time(times?.rise)}
      <span aria-hidden="true"> · </span>
      sunset {time(times?.set)}
    </p>
  );
}
