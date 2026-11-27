import type { Html } from "@effect/ui/html";

// Only Cloudflare's edge answers /cdn-cgi/image/, and only once Image
// Transformations is enabled on the zone. Until then the rewritten URL 404s,
// so this stays opt-in: without the flag every image is served untransformed,
// which is slower but never broken. Set VITE_CF_IMAGES=1 once the zone setting
// is on. It is also off for `vite dev` and `vite preview`, where nothing is
// listening on /cdn-cgi at all.
const transformsEnabled = import.meta.env.PROD && import.meta.env.VITE_CF_IMAGES === "1";

const resolveSrc = (src: string, width?: number, unoptimized?: boolean) => {
  if (unoptimized || src.startsWith("http") || src.startsWith("data:")) return src;
  // SVG is already resolution-independent; there is nothing to gain.
  if (src.endsWith(".svg") || !transformsEnabled) return src;

  const opts = [`width=${width ?? 1200}`, "format=auto", "quality=85"];
  // Without this the transform returns only the first frame of a GIF.
  if (src.endsWith(".gif")) opts.push("anim=true");

  return `/cdn-cgi/image/${opts.join(",")}${src}`;
};

// An <img> that lazy-loads by default and goes through Cloudflare's image
// transform when it's enabled. `priority` loads it eagerly at high priority.
export const Image = <M>(
  h: Html.H<M>,
  options: {
    readonly src: string;
    readonly alt: string;
    readonly width?: number;
    readonly height?: number;
    readonly priority?: boolean;
    readonly unoptimized?: boolean;
  },
) => {
  const eager = options.priority === true;
  return h.img
    .attr("src", resolveSrc(options.src, options.width, options.unoptimized))
    .attr("alt", options.alt)
    .attr("width", options.width === undefined ? undefined : String(options.width))
    .attr("height", options.height === undefined ? undefined : String(options.height))
    .attr("loading", eager ? "eager" : "lazy")
    .attr("fetchpriority", eager ? "high" : undefined)
    .attr("decoding", eager ? "sync" : "async");
};
