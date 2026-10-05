import { createFileRoute } from "@tanstack/react-router";
import { Checkbox } from "@/components/ui/checkbox";

function ResolutionsPage() {
  return (
    <section className="w-full max-w-2xl space-y-8 print:space-y-6 mb-8">
      <h1 className="text-4xl md:text-5xl font-semibold tracking-[-0.04em] leading-[1.05] text-balance">
        Resolutions
      </h1>

      <div className="prose prose-neutral dark:prose-invert">
        <p className="text-brand text-lg font-mono">2026</p>
        <ul className="mt-4">
          <li className="flex items-center gap-2">
            <Checkbox disabled />
            <p className="">Become a dad!</p>
          </li>
          <li className="flex items-center gap-2">
            <Checkbox disabled />
            <p className="">sub 75 minute pro single HYROX </p>
          </li>
          <li className="flex items-center gap-2">
            <Checkbox disabled />
            <p className="">Create a native app</p>
          </li>
          <li className="flex items-center gap-2">
            <Checkbox disabled />
            <p className="">Publish an app (app store, play store)</p>
          </li>
          <li className="flex items-center gap-2">
            <Checkbox disabled />
            <p className="">Create a simple web service in hono</p>
          </li>
          <li className="flex items-center gap-2">
            <Checkbox disabled />
            <p className="">Re-write the simple web service in effect</p>
          </li>
          <li className="flex items-center gap-2">
            <Checkbox disabled />
            <p className="">Finish Total TypeScript Pro courses</p>
          </li>
          <li className="flex items-center gap-2">
            <Checkbox disabled />
            <p className="">Finish the uses page</p>
          </li>
        </ul>
      </div>
    </section>
  );
}

export const Route = createFileRoute("/resolutions/")({
  component: ResolutionsPage,
});
