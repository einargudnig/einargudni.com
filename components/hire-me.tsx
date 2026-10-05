import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Link } from "@/components/ui/link";

const EMAIL = "einargudnig@gmail.com";

type Status = "idle" | "sending" | "sent" | "error";

export function HireMe() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form));

    setStatus("sending");
    setError("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const { error: message } = (await response.json().catch(() => ({}))) as { error?: string };
        throw new Error(message ?? "Something went wrong. Try again?");
      }

      form.reset();
      setStatus("sent");
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Something went wrong. Try again?");
      setStatus("error");
    }
  }

  return (
    <div className="rounded-lg border border-border/50 p-5 md:p-6">
      <span className="inline-flex items-center gap-x-2 font-mono text-xs text-muted-foreground">
        <span className="relative flex h-1.5 w-1.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand opacity-60 motion-reduce:hidden" />
          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-brand" />
        </span>
        Open for opportunities
      </span>

      <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
        I integrate AI agents into systems that already exist: assistants inside products,
        tool-calling over your own APIs, and the evals and guardrails that make them safe to ship.
        Plus the plain product engineering around it.{" "}
        <Link
          href="/work"
          className="underline underline-offset-4 hover:text-brand transition-colors"
        >
          See the case studies
        </Link>
        .
      </p>

      {status === "sent" ? (
        <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm text-brand">Thanks — that landed in my inbox. I'll reply soon.</p>
          <Button variant="ghost" size="sm" onClick={() => setStatus("idle")}>
            Send another
          </Button>
        </div>
      ) : (
        <form onSubmit={onSubmit} className="mt-5 space-y-3">
          <div className="grid gap-3 sm:grid-cols-2">
            <label className="space-y-1.5">
              <span className="font-mono text-xs text-muted-foreground">Name</span>
              <Input
                name="name"
                required
                maxLength={100}
                autoComplete="name"
                placeholder="Ada Lovelace"
              />
            </label>
            <label className="space-y-1.5">
              <span className="font-mono text-xs text-muted-foreground">Email</span>
              <Input
                name="email"
                type="email"
                required
                maxLength={200}
                autoComplete="email"
                placeholder="ada@example.com"
              />
            </label>
          </div>

          <label className="block space-y-1.5">
            <span className="font-mono text-xs text-muted-foreground">Message</span>
            <Textarea
              name="message"
              required
              minLength={10}
              maxLength={5000}
              rows={4}
              placeholder="What you're working on, and where you could use a hand."
            />
          </label>

          {/* Honeypot — hidden from people, catnip for bots. */}
          <input
            type="text"
            name="company"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
            className="sr-only"
          />

          <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
            <p className="font-mono text-xs text-muted-foreground">
              or{" "}
              <a
                href={`mailto:${EMAIL}`}
                className="hover:text-brand transition-colors underline underline-offset-4"
              >
                {EMAIL}
              </a>
            </p>
            <Button type="submit" size="sm" disabled={status === "sending"}>
              {status === "sending" ? "Sending…" : "Send"}
            </Button>
          </div>

          <p aria-live="polite" className="text-xs text-destructive empty:hidden">
            {status === "error" ? error : ""}
          </p>
        </form>
      )}
    </div>
  );
}
