import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

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
    <div className="grid gap-8 md:grid-cols-[1fr_1.4fr] md:gap-10">
      <div className="space-y-3">
        <p className="inline-flex items-center gap-x-2 text-sm">
          <span aria-hidden="true" className="h-2 w-2 rounded-full bg-foreground" />
          Open for opportunities
        </p>
        <p className="max-w-[44ch] text-muted-foreground leading-relaxed text-pretty">
          Tell me about the system and where an agent could help. I also take on the plain product
          engineering around it.
        </p>
        <p className="text-sm text-muted-foreground">
          Or write to{" "}
          <a
            href={`mailto:${EMAIL}`}
            className="text-foreground underline decoration-1 underline-offset-4 transition-colors hover:text-brand"
          >
            {EMAIL}
          </a>
        </p>
      </div>

      {status === "sent" ? (
        <div className="flex flex-wrap items-center justify-between gap-3 self-start">
          <p className="text-sm">Thanks — that landed in my inbox. I'll reply soon.</p>
          <Button variant="ghost" size="sm" onClick={() => setStatus("idle")}>
            Send another
          </Button>
        </div>
      ) : (
        <form onSubmit={onSubmit} className="space-y-3">
          <div className="grid gap-3 sm:grid-cols-2">
            <label className="space-y-1.5">
              <span className="text-sm text-muted-foreground">Name</span>
              <Input
                name="name"
                required
                maxLength={100}
                autoComplete="name"
                placeholder="Ada Lovelace"
              />
            </label>
            <label className="space-y-1.5">
              <span className="text-sm text-muted-foreground">Email</span>
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
            <span className="text-sm text-muted-foreground">Message</span>
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

          <div className="flex items-center justify-end pt-1">
            <Button
              type="submit"
              disabled={status === "sending"}
              className="rounded-sm bg-brand text-brand-foreground hover:bg-brand hover:brightness-110"
            >
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
