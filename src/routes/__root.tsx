import type { QueryClient } from "@tanstack/react-query";
import { createRootRouteWithContext, HeadContent, Outlet, Scripts } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { BirthdayConfetti } from "@/components/birthday-confetti";
import { KeyboardNav } from "@/components/keyboard-nav";
import { Navbar } from "@/components/navbar";
import { ThemeProvider } from "@/components/theme-provider";
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
  component: RootComponent,
});

function RootComponent() {
  return (
    <RootDocument>
      <Outlet />
    </RootDocument>
  );
}

function RootDocument({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body className="antialiased mb-10 lg:mx-auto">
        <ThemeProvider attribute="class" defaultTheme="dark">
          <WebMCP />
          <BirthdayConfetti />
          <main className="relative mx-auto mt-8 flex min-h-[calc(100dvh-4.5rem)] max-w-4xl flex-col overflow-auto px-6 md:px-8">
            <Navbar />
            <div className="flex-1">{children}</div>
            <footer className="mt-16 mb-8 border-t border-border/50 pt-6 flex items-center justify-between text-xs text-muted-foreground font-mono">
              <span>don't half ass it</span>
              <span className="flex items-center gap-4">
                <a href="https://github.com/einargudnig" className="hover:text-brand transition-colors">
                  github
                </a>
                <a href="https://x.com/einargudni" className="hover:text-brand transition-colors">
                  x
                </a>
                <span className="tabular-nums">{new Date().getFullYear()}</span>
              </span>
            </footer>
            <KeyboardNav />
          </main>
        </ThemeProvider>
        <Scripts />
      </body>
    </html>
  );
}
