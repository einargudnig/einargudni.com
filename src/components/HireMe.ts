import type { Html } from "@effect/ui/html";

const EGGO_URL = "https://www.eggo.is";

const eggoLink = <M>(h: Html.H<M>) =>
  h.a.attr("href", EGGO_URL).attr("target", "_blank").attr("rel", "noopener noreferrer");

export const HireMe = <M>(h: Html.H<M>) =>
  h.div
    .class("grid gap-8 md:grid-cols-[1fr_1.4fr] md:gap-10")
    .children(
      h.div
        .class("space-y-3")
        .children(
          h.p
            .class("inline-flex items-center gap-x-2 text-sm")
            .children(
              h.span.attr("aria-hidden", "true").class("h-2 w-2 rounded-full bg-foreground"),
              "Open for opportunities",
            ),
          h.p
            .class("max-w-[44ch] text-muted-foreground leading-relaxed text-pretty")
            .children(
              "Tell me about the problem and the system it lives in. Sometimes the answer is an agent; often it is plain, careful engineering.",
            ),
        ),
      h.div
        .class("space-y-4 self-start")
        .children(
          h.p
            .class("max-w-[52ch] leading-relaxed text-pretty")
            .children(
              "I take on contract and consulting work through ",
              eggoLink(h)
                .class(
                  "underline decoration-1 underline-offset-4 transition-colors hover:text-brand",
                )
                .children("Eggo"),
              ", my consultancy. Get in touch there to start a project.",
            ),
          eggoLink(h)
            .class(
              "inline-block rounded-sm bg-brand px-4 py-2 font-medium text-brand-foreground transition-[filter,transform] duration-200 ease-[var(--ease-out)] hover:brightness-110 active:scale-[0.98]",
            )
            .children("Go to eggo.is"),
        ),
    );
