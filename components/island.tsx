import { Component, type ReactNode, Suspense } from "react";

type IslandProps = { name: string; fallback?: ReactNode; children: ReactNode };

// Fences off one part of a page so a failure there doesn't take the page
// down: the Whoop rings, the GitHub graph, an MDX body. The fallback is a
// muted ruled line, the same shape as an empty table. A class because React
// still only catches render errors in class boundaries.
export class Island extends Component<IslandProps, { failed: boolean }> {
  state = { failed: false };

  static getDerivedStateFromError = () => ({ failed: true });

  componentDidCatch(error: unknown) {
    console.error(`[${this.props.name}]`, error);
  }

  render() {
    const { name, fallback, children } = this.props;
    if (this.state.failed) {
      return (
        <p className="border-t border-border py-3 text-sm text-muted-foreground">
          {fallback ?? `The ${name} couldn't load right now.`}
        </p>
      );
    }
    return <Suspense fallback={null}>{children}</Suspense>;
  }
}
