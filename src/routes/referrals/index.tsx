import { createFileRoute } from "@tanstack/react-router";
import { ExternalLink } from "@/components/blog/external-link";
import { ArrowLeft } from "lucide-react";
import { Link } from "@/components/ui/link";

const referrals = [
  {
    name: "Raycast",
    description: "The best macOS productivity app.",
    url: "https://raycast.com/?via=einar",
  },
  {
    name: "WHOOP",
    description: "Get a free WHOOP and one month free when you join with my link.",
    url: "https://join.whoop.com/11514F27",
  },
];

function RouteComponent() {
  return (
    <section className="w-full max-w-2xl space-y-8 print:space-y-6 mb-8">
      <h1 className="text-4xl md:text-5xl font-semibold tracking-[-0.04em] leading-[1.05] text-balance">
        Referrals
      </h1>
      <p className="-mt-4 text-muted-foreground">
        Products and services I use and recommend. Use these links to get a discount (and I might
        get one too).
      </p>
      <div className="prose prose-neutral dark:prose-invert space-y-6">
        {referrals.map((referral) => (
          <div key={referral.name}>
            <p className="text-brand text-lg font-mono">{referral.name}</p>
            <p>{referral.description}</p>
            <ExternalLink href={referral.url}>Get started &rarr;</ExternalLink>
          </div>
        ))}
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

export const Route = createFileRoute("/referrals/")({
  component: RouteComponent,
});
