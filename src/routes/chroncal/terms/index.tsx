import { createFileRoute } from "@tanstack/react-router";
import { ExternalLink } from "@/components/blog/external-link";
import { ArrowLeft } from "lucide-react";
import { Link } from "@/components/ui/link";

function RouteComponent() {
  return (
    <section className="w-full max-w-2xl space-y-8 print:space-y-6 mb-8">
      <div>
        <h1 className="text-4xl md:text-5xl font-semibold tracking-[-0.04em] leading-[1.05] text-balance">
          Chroncal — Terms of Service
        </h1>
        <p className="mt-1 text-sm font-mono text-muted-foreground">Updated 9. Sep, 2026</p>
      </div>

      <div className="prose prose-neutral dark:prose-invert text-pretty">
        <p className="text-brand text-lg font-mono">Scope</p>
        <p className="leading-relaxed max-w-[65ch]">
          These terms cover the Google OAuth client named <strong>Chroncal</strong>, which I
          registered and operate personally so that my own installation of{" "}
          <ExternalLink href="https://github.com/DouglasdeMoura/chroncal">chroncal</ExternalLink>{" "}
          can reach my own Google Calendars. It is a personal registration, not a product, not a
          service offered to the public, and not a commercial offering.
        </p>
      </div>

      <div className="h-px bg-border/50" />

      <div className="prose prose-neutral dark:prose-invert text-pretty">
        <p className="text-brand text-lg font-mono">The software itself</p>
        <p className="leading-relaxed max-w-[65ch]">
          chroncal is third-party open-source software written by Douglas de Moura. It is not mine,
          I do not distribute it, and your use of it is governed by its own license and terms in its
          repository — not by this page. This page concerns only the OAuth client registration that
          lets a local copy of it authenticate against Google.
        </p>
      </div>

      <div className="h-px bg-border/50" />

      <div className="prose prose-neutral dark:prose-invert text-pretty">
        <p className="text-brand text-lg font-mono">No warranty</p>
        <p className="leading-relaxed max-w-[65ch]">
          The OAuth client is provided as-is, with no warranty of any kind, express or implied.
          There is no uptime commitment and no support obligation. I may change, suspend or delete
          the registration at any time without notice, which would stop any authorized installation
          from syncing.
        </p>
        <p className="leading-relaxed max-w-[65ch]">
          To the extent permitted by law, I accept no liability for any loss or damage arising from
          use of the client, including lost, duplicated or corrupted calendar data. Calendar sync
          writes to live calendars; keep your own backups.
        </p>
      </div>

      <div className="h-px bg-border/50" />

      <div className="prose prose-neutral dark:prose-invert text-pretty">
        <p className="text-brand text-lg font-mono">Your data</p>
        <p className="leading-relaxed max-w-[65ch]">
          Calendar data stays on the machine running the software and is never transmitted to me.
          See the <Link href="/chroncal/privacy">privacy policy</Link> for detail. Access can be
          revoked at any time from{" "}
          <ExternalLink href="https://myaccount.google.com/permissions">
            Google Account permissions
          </ExternalLink>
          .
        </p>
      </div>

      <div className="h-px bg-border/50" />

      <div className="prose prose-neutral dark:prose-invert text-pretty">
        <p className="text-brand text-lg font-mono">Governing law and contact</p>
        <p className="leading-relaxed max-w-[65ch]">
          These terms are governed by the laws of Iceland. Questions go to{" "}
          <ExternalLink href="mailto:einargudnig@gmail.com">einargudnig@gmail.com</ExternalLink>.
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

export const Route = createFileRoute("/chroncal/terms/")({
  head: () => ({
    meta: [
      { title: "Chroncal — Terms of Service" },
      {
        name: "description",
        content:
          "Terms for the Chroncal Google OAuth client, a personal-use registration with no warranty.",
      },
    ],
  }),
  component: RouteComponent,
});
