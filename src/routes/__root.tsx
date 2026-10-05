import type { QueryClient } from "@tanstack/react-query";
import { createRootRouteWithContext, HeadContent, Scripts } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { BirthdayConfetti } from "@/components/birthday-confetti";
import { KeyboardNav } from "@/components/keyboard-nav";
import { Navbar } from "@/components/navbar";
import { NotFound, RouteError } from "@/components/route-error";
import { editionScript } from "@/components/edition";
import { WebMCP } from "@/components/web-mcp";
import appCss from "../styles.css?url";

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Einar Gudni" },
      { name: "description", content: "My home on the web 🏡" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.ico" },
    ],
  }),
  // The shell renders around every outcome, so an error or 404 page keeps the
  // masthead, footer and edition script instead of replacing the document.
  shellComponent: RootDocument,
  errorComponent: RouteError,
  notFoundComponent: NotFound,
});

// Kept in the emitted markup so the build can be audited against it.
const DESIGN_CONTRACT = `THESIS: An almanac of one person's work. Entries are ruled into tables and printed in a day or night edition by the real Reykjavik sun. Refuses the dark developer portfolio of cards, chips and glow.
OWN-WORLD: Warm paper by day, charcoal by night, warm black ink, hairline rules, a full-weight rule over each table. No accent colour; actions are marked by a solid ink button and underlines. Geist with tabular numerals; tables, never cards.
STORY: A visitor learns he builds solutions that fit systems already running, agents among them, scans the work table, opens a case study, and writes to him.
FIRST VIEWPORT: Masthead rule with the name left and today's Reykjavik sunrise, sunset and edition right; the statement large and left-aligned at about 20ch; a solid ink "Work with me" and a plain link to the use cases; the use-case table starts above the fold on desktop.
FORM: Almanak tables, candidate 4 of 7, seed 4502003c.
FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance`;

function RootDocument({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <HeadContent />
        <script dangerouslySetInnerHTML={{ __html: editionScript }} />
      </head>
      <body className="antialiased">
        <div hidden dangerouslySetInnerHTML={{ __html: `<!--\n${DESIGN_CONTRACT}\n-->` }} />
        <WebMCP />
        <BirthdayConfetti />
        <main className="relative mx-auto flex min-h-dvh max-w-4xl flex-col px-5 pt-6 md:px-8 md:pt-10">
          <Navbar />
          <div className="flex-1">{children}</div>
          <footer className="mt-24 mb-8 grid grid-cols-[1fr_auto] gap-4 border-t border-foreground pt-3 text-sm text-muted-foreground">
            <span>Don't half ass it.</span>
            <span className="flex items-center gap-4 tabular-nums">
              <a
                href="https://github.com/einargudnig"
                className="hover:text-foreground transition-colors"
              >
                GitHub
              </a>
              <a
                href="https://x.com/einargudni"
                className="hover:text-foreground transition-colors"
              >
                X
              </a>
              <span>{new Date().getFullYear()}</span>
            </span>
          </footer>
          <KeyboardNav />
        </main>
        <Scripts />
      </body>
    </html>
  );
}
