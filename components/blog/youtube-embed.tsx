import { cn } from "@/lib/utils";

interface YouTubeEmbedProps {
  /** YouTube video ID or full URL (youtube.com/watch?v=..., youtu.be/..., or just the ID) */
  videoId: string;
  /** Video title for accessibility */
  title?: string;
  /** Additional CSS classes */
  className?: string;
  /** Aspect ratio of the video */
  aspectRatio?: "16:9" | "4:3" | "21:9";
  /** Start time in seconds */
  start?: number;
  /** Use privacy-enhanced mode (youtube-nocookie.com) */
  privacyMode?: boolean;
  /** Show player controls */
  controls?: boolean;
  /** Caption text below the video */
  caption?: string;
  /** Allow fullscreen */
  allowFullscreen?: boolean;
  /** Autoplay the video (muted by default when autoplay is enabled) */
  autoplay?: boolean;
  /** Loop the video */
  loop?: boolean;
}

/**
 * Extracts the YouTube video ID from various URL formats or returns the ID if already provided
 */
function extractVideoId(input: string): string {
  // Already a video ID (11 characters, alphanumeric with - and _)
  if (/^[\w-]{11}$/.test(input)) {
    return input;
  }

  // Handle youtu.be/VIDEO_ID
  const shortMatch = input.match(/youtu\.be\/([^?&#]+)/);
  if (shortMatch) {
    return shortMatch[1];
  }

  // Handle youtube.com/watch?v=VIDEO_ID
  const watchMatch = input.match(/[?&]v=([^&#]+)/);
  if (watchMatch) {
    return watchMatch[1];
  }

  // Handle youtube.com/embed/VIDEO_ID
  const embedMatch = input.match(/youtube\.com\/embed\/([^?&#]+)/);
  if (embedMatch) {
    return embedMatch[1];
  }

  // Handle youtube.com/v/VIDEO_ID
  const vMatch = input.match(/youtube\.com\/v\/([^?&#]+)/);
  if (vMatch) {
    return vMatch[1];
  }

  // Return as-is if no pattern matches (assume it's an ID)
  return input;
}

export function YouTubeEmbed({
  videoId,
  title = "YouTube video player",
  className,
  aspectRatio = "16:9",
  start,
  privacyMode = true,
  controls = true,
  caption,
  allowFullscreen = true,
  autoplay = false,
  loop = false,
}: YouTubeEmbedProps) {
  const id = extractVideoId(videoId);

  // Build the embed URL
  const domain = privacyMode ? "https://www.youtube-nocookie.com" : "https://www.youtube.com";

  const params = new URLSearchParams();

  if (start) {
    params.set("start", start.toString());
  }

  if (!controls) {
    params.set("controls", "0");
  }

  if (autoplay) {
    params.set("autoplay", "1");
    params.set("mute", "1"); // Browsers require mute for autoplay
  }

  if (loop) {
    params.set("loop", "1");
    params.set("playlist", id); // Required for loop to work
  }

  // Enable modest branding
  params.set("modestbranding", "1");
  params.set("rel", "0"); // Don't show related videos from other channels

  const queryString = params.toString();
  const embedUrl = `${domain}/embed/${id}${queryString ? `?${queryString}` : ""}`;

  // Aspect ratio styles using padding-bottom trick for consistent sizing
  const aspectRatioStyles: Record<string, string> = {
    "16:9": "pb-[56.25%]", // 9/16 = 0.5625
    "4:3": "pb-[75%]", // 3/4 = 0.75
    "21:9": "pb-[42.86%]", // 9/21 ≈ 0.4286
  };

  return (
    <figure className={cn("my-8", className)}>
      <div
        className={cn(
          "relative w-full overflow-hidden rounded-lg bg-muted",
          aspectRatioStyles[aspectRatio],
        )}
      >
        <iframe
          src={embedUrl}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen={allowFullscreen}
          sandbox="allow-scripts allow-popups allow-presentation"
          className="absolute inset-0 h-full w-full"
          loading="lazy"
        />
      </div>
      {caption && (
        <figcaption className="mt-2 text-center text-sm text-muted-foreground">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
