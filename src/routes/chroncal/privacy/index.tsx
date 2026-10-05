import { createFileRoute } from "@tanstack/react-router";
import { ExternalLink } from "@/components/blog/external-link";
import { ArrowLeft } from "lucide-react";
import { Link } from "@/components/ui/link";

function RouteComponent() {
  return (
    <section className="w-full max-w-2xl space-y-8 print:space-y-6 mb-8">
      <div>
        <h1 className="text-4xl md:text-5xl font-semibold tracking-[-0.04em] leading-[1.05] text-balance">
          Chroncal — Privacy Policy
        </h1>
        <p className="mt-1 text-sm font-mono text-muted-foreground">Updated 9. Sep, 2026</p>
      </div>

      <div className="prose prose-neutral dark:prose-invert text-pretty">
        <p className="text-brand text-lg font-mono">What this is</p>
        <p className="leading-relaxed max-w-[65ch]">
          This page describes how the Google OAuth client named <strong>Chroncal</strong> handles
          data. I registered and operate that client personally, for my own use. It is not operated
          by a company and it has no other users.
        </p>
        <p className="leading-relaxed max-w-[65ch]">
          <ExternalLink href="https://github.com/DouglasdeMoura/chroncal">chroncal</ExternalLink>{" "}
          itself is third-party open-source software: a terminal calendar, todo and journal manager
          that runs locally and talks to calendar servers over CalDAV. I registered this OAuth
          client so that my own copy of chroncal can reach my own Google Calendars.
        </p>
      </div>

      <div className="h-px bg-border/50" />

      <div className="prose prose-neutral dark:prose-invert text-pretty">
        <p className="text-brand text-lg font-mono">What it accesses</p>
        <p className="leading-relaxed max-w-[65ch]">
          One scope: <code>https://www.googleapis.com/auth/calendar</code>. With it, the application
          reads and writes calendar data for the Google Account that signs in — events and their
          titles, times, locations, descriptions, attendees, reminders and the calendars those
          events belong to.
        </p>
        <p className="leading-relaxed max-w-[65ch]">
          It requests nothing else. No mail, no contacts, no files, no profile data beyond what is
          needed to complete sign-in.
        </p>
      </div>

      <div className="h-px bg-border/50" />

      <div className="prose prose-neutral dark:prose-invert text-pretty">
        <p className="text-brand text-lg font-mono">Where the data goes</p>
        <p className="leading-relaxed max-w-[65ch]">
          Nowhere except the computer running the application. Calendar data is written to a local
          SQLite database — on macOS at{" "}
          <code>~/Library/Application Support/chroncal/chroncal.db</code>. OAuth tokens and the
          client secret are held in the operating system keychain.
        </p>
        <p className="leading-relaxed max-w-[65ch]">
          There is no server, no hosted backend, no database I control, no analytics and no
          third-party processor. Network traffic goes directly between the local machine and
          Google&apos;s CalDAV endpoints. I have no ability to see the calendar data of anyone who
          signs in, because none of it is transmitted to me.
        </p>
      </div>

      <div className="h-px bg-border/50" />

      <div className="prose prose-neutral dark:prose-invert text-pretty">
        <p className="text-brand text-lg font-mono">Sharing</p>
        <p className="leading-relaxed max-w-[65ch]">
          None. Calendar data is not sold, rented, shared, published or transferred to any third
          party. It is not used for advertising, profiling or training machine learning models.
        </p>
      </div>

      <div className="h-px bg-border/50" />

      <div className="prose prose-neutral dark:prose-invert text-pretty">
        <p className="text-brand text-lg font-mono">Retention and deletion</p>
        <p className="leading-relaxed max-w-[65ch]">
          Data lives on the local machine until it is deleted there. Removing the SQLite database
          file removes the stored copy of the calendar.
        </p>
        <p className="leading-relaxed max-w-[65ch]">
          Access can be withdrawn at any time from{" "}
          <ExternalLink href="https://myaccount.google.com/permissions">
            Google Account permissions
          </ExternalLink>
          . Revoking it invalidates the stored tokens immediately; the application can then no
          longer read or write anything.
        </p>
      </div>

      <div className="h-px bg-border/50" />

      <div className="prose prose-neutral dark:prose-invert text-pretty">
        <p className="text-brand text-lg font-mono">Limited use</p>
        <p className="leading-relaxed max-w-[65ch]">
          Use and transfer of information received from Google APIs adheres to the{" "}
          <ExternalLink href="https://developers.google.com/terms/api-services-user-data-policy">
            Google API Services User Data Policy
          </ExternalLink>
          , including its Limited Use requirements.
        </p>
      </div>

      <div className="h-px bg-border/50" />

      <div className="prose prose-neutral dark:prose-invert text-pretty">
        <p className="text-brand text-lg font-mono">Contact</p>
        <p className="leading-relaxed max-w-[65ch]">
          Questions about this policy go to{" "}
          <ExternalLink href="mailto:einargudnig@gmail.com">einargudnig@gmail.com</ExternalLink>.
          The terms for this client are on the{" "}
          <Link href="/chroncal/terms">terms of service page</Link>.
        </p>
      </div>

      <div className="flex justify-start">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 p-2 -m-2 font-mono text-xs text-muted-foreground hover:text-brand transition-colors"
        >
          <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
          Home
        </Link>
      </div>
    </section>
  );
}

export const Route = createFileRoute("/chroncal/privacy/")({
  head: () => ({
    meta: [
      { title: "Chroncal — Privacy Policy" },
      {
        name: "description",
        content:
          "How the Chroncal Google OAuth client handles calendar data. Everything stays on the local machine.",
      },
    ],
  }),
  component: RouteComponent,
});
