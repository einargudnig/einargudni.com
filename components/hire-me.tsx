const EGGO_URL = "https://www.eggo.is";

export function HireMe() {
  return (
    <div className="grid gap-8 md:grid-cols-[1fr_1.4fr] md:gap-10">
      <div className="space-y-3">
        <p className="inline-flex items-center gap-x-2 text-sm">
          <span aria-hidden="true" className="h-2 w-2 rounded-full bg-foreground" />
          Open for opportunities
        </p>
        <p className="max-w-[44ch] text-muted-foreground leading-relaxed text-pretty">
          Tell me about the problem and the system it lives in. Sometimes the answer is an agent;
          often it is plain, careful engineering.
        </p>
      </div>

      <div className="space-y-4 self-start">
        <p className="max-w-[52ch] leading-relaxed text-pretty">
          I take on contract and consulting work through{" "}
          <a
            href={EGGO_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="underline decoration-1 underline-offset-4 transition-colors hover:text-brand"
          >
            Eggo
          </a>
          , my consultancy. Get in touch there to start a project.
        </p>
        <a
          href={EGGO_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block rounded-sm bg-brand px-4 py-2 font-medium text-brand-foreground transition-[filter,transform] duration-200 ease-[var(--ease-out)] hover:brightness-110 active:scale-[0.98]"
        >
          Go to eggo.is
        </a>
      </div>
    </div>
  );
}
