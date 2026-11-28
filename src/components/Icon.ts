import type { View } from "@effect/ui";
import type { Html } from "@effect/ui/html";
import type { IconNode } from "lucide";

// Draws a lucide icon (`import { Clipboard } from "lucide"`) with the SVG
// builders, so icons render on the server like any other markup.
export const Icon = <M>(h: Html.H<M>, icon: IconNode, className = "h-4 w-4") =>
  h.svg
    .attr("xmlns", "http://www.w3.org/2000/svg")
    .attr("viewBox", "0 0 24 24")
    .attr("fill", "none")
    .attr("stroke", "currentColor")
    .attr("stroke-width", "2")
    .attr("stroke-linecap", "round")
    .attr("stroke-linejoin", "round")
    .attr("aria-hidden", "true")
    .class(className)
    .children(
      icon.map(([tag, attrs], i) => {
        const shape = SHAPES[tag];
        if (!shape) return null;
        return Object.entries(attrs).reduce(
          (node, [name, value]) => node.attr(name as never, String(value) as never),
          shape(h).key(String(i)),
        );
      }),
    );

const SHAPES: Record<string, <M>(h: Html.H<M>) => View.ElementBuilder<M, never, any, any>> = {
  path: (h) => h.path,
  circle: (h) => h.circle,
  rect: (h) => h.rect,
  line: (h) => h.line,
  ellipse: (h) => h.ellipse,
  polyline: (h) => h.polyline,
  polygon: (h) => h.polygon,
};
