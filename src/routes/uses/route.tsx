import { createFileRoute, Outlet } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import { Link } from "@/components/ui/link";

function UsesLayout() {
  return (
    <section className="w-full max-w-2xl space-y-8 print:space-y-6 mb-8">
      <Link href="/uses">
        <h1 className="text-4xl md:text-5xl font-semibold tracking-[-0.04em] leading-[1.05] text-balance mb-6">
          Uses
        </h1>
      </Link>
      <div className="flex-col items-center justify-center">
        <UsesNav />
        <div className="mt-8">
          <Outlet />
        </div>
      </div>
    </section>
  );
}

function UsesNav() {
  return (
    <div className="flex items-center justify-center">
      <ButtonGroup>
        <Button variant="outline" asChild>
          <Link href="/uses/desk">Desk</Link>
        </Button>
        <Button variant="outline" asChild>
          <Link href="/uses/devices">Devices</Link>
        </Button>
        <Button variant="outline" asChild>
          <Link href="/uses/keyboard">Keyboard</Link>
        </Button>
        <Button variant="outline" asChild>
          <Link href="/uses/command-line">Command line</Link>
        </Button>
        <Button variant="outline" asChild>
          <Link href="/uses/infrastructure">Infrastructure</Link>
        </Button>
      </ButtonGroup>
    </div>
  );
}

export const Route = createFileRoute("/uses")({
  component: UsesLayout,
});
