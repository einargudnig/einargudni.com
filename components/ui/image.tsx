import type { ComponentPropsWithoutRef } from "react";

type ImageProps = Omit<ComponentPropsWithoutRef<"img">, "src"> & {
  src: string;
  /** Renders eagerly and hints high fetch priority. Was `priority` in next/image. */
  priority?: boolean;
  /** Alias kept for call sites that used `preload`. */
  preload?: boolean;
  /** Opt out of any resizing/format transform. Remote images set this. */
  unoptimized?: boolean;
};

/**
 * Replacement for `next/image`. There is no image server on Workers, so the
 * transform strategy is decided in `resolveSrc` below — everything else here
 * is just the loading/priority plumbing next/image used to handle.
 *
 * Assets under public/ are referenced by their served URL rather than
 * imported, so the bundler does not emit a second copy of each one.
 */
// Only Cloudflare's edge answers /cdn-cgi/image/, and only once Image
// Transformations is enabled on the zone. Until then the rewritten URL 404s,
// so this stays opt-in: without the flag every image is served untransformed,
// which is slower but never broken. Set VITE_CF_IMAGES=1 once the zone setting
// is on. It is also off for `vite dev` and `vite preview`, where nothing is
// listening on /cdn-cgi at all.
const transformsEnabled = import.meta.env.PROD && import.meta.env.VITE_CF_IMAGES === "1";

const resolveSrc = (src: string, width?: number, unoptimized?: boolean) => {
  if (unoptimized || src.startsWith("http") || src.startsWith("data:")) {
    return src;
  }
  // SVG is already resolution-independent; there is nothing to gain.
  if (src.endsWith(".svg") || !transformsEnabled) return src;

  const opts = [`width=${width ?? 1200}`, "format=auto", "quality=85"];
  // Without this the transform returns only the first frame of a GIF.
  if (src.endsWith(".gif")) opts.push("anim=true");

  return `/cdn-cgi/image/${opts.join(",")}${src}`;
};

export const Image = ({
  src,
  width,
  height,
  priority,
  preload,
  unoptimized,
  ...props
}: ImageProps) => {
  const eager = priority || preload;
  const w = typeof width === "number" ? width : undefined;

  return (
    <img
      src={resolveSrc(src, w, unoptimized)}
      width={width}
      height={height}
      loading={eager ? "eager" : "lazy"}
      fetchPriority={eager ? "high" : undefined}
      decoding={eager ? "sync" : "async"}
      {...props}
    />
  );
};
