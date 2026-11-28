import type { Html } from "@effect/ui/html";

// Radix's ArrowTopRightIcon, drawn inline so it renders on the server.
const ARROW_TOP_RIGHT =
  "M3.64645 11.3536C3.45118 11.1583 3.45118 10.8417 3.64645 10.6465L10.2929 4L6 4C5.72386 4 5.5 3.77614 5.5 3.5C5.5 3.22386 5.72386 3 6 3L11.5 3C11.6326 3 11.7598 3.05268 11.8536 3.14645C11.9473 3.24022 12 3.36739 12 3.5L12 9.00001C12 9.27615 11.7761 9.50001 11.5 9.50001C11.2239 9.50001 11 9.27615 11 9.00001V4.70711L4.35355 11.3536C4.15829 11.5488 3.84171 11.5488 3.64645 11.3536Z";

// A link that leaves the site in a new tab. Children land on the underlined
// label: `ExternalLink(h, "https://maul.is").children("Maul")`.
export const ExternalLink = <M>(h: Html.H<M>, href: string) =>
  h.span
    .class(
      "underline underline-offset-2 decoration-border hover:decoration-brand transition-colors",
    )
    .forward((label) =>
      h.a
        .attr("href", href)
        .attr("target", "_blank")
        .attr("rel", "noopener noreferrer")
        .class(
          "inline-flex items-center text-muted-foreground hover:text-brand transition-colors group",
        )
        .children(
          label,
          h.svg
            .attr("width", "15")
            .attr("height", "15")
            .attr("viewBox", "0 0 15 15")
            .attr("fill", "none")
            .attr("xmlns", "http://www.w3.org/2000/svg")
            .class(
              "ml-1 h-3 w-3 opacity-60 group-hover:opacity-100 group-hover:scale-110 transition-[opacity,transform] duration-150 ease-[var(--ease-out)]",
            )
            .children(
              h.path
                .attr("d", ARROW_TOP_RIGHT)
                .attr("fill", "currentColor")
                .attr("fill-rule", "evenodd")
                .attr("clip-rule", "evenodd"),
            ),
        ),
    );
