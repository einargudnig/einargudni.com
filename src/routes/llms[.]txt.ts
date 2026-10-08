import { createFileRoute } from "@tanstack/react-router";
import { CACHE_HEADERS, llmsBody } from "@/lib/discovery";

export const Route = createFileRoute("/llms.txt")({
  server: {
    handlers: {
      GET: () =>
        new Response(llmsBody, {
          headers: { "Content-Type": "text/plain; charset=utf-8", ...CACHE_HEADERS },
        }),
    },
  },
});
