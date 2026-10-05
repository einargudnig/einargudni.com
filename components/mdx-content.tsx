import * as React from "react";
import { Image } from "@/components/ui/image";
import { Link } from "@/components/ui/link";
import { ExternalLink } from "./blog/external-link";
import { CodeBlock } from "./blog/code-block";
import { Blockquote } from "./blog/blockquote";
import { Callout } from "./blog/callout";
import { TableOfContents } from "./blog/table-of-contents";
import { CardLink, ReadMoreLink, ResourceLink } from "./blog/link-components";
import { VideoEmbed } from "./blog/video-embed";
import { YouTubeEmbed } from "./blog/youtube-embed";
import { Accordion, AccordionItem, Tabs } from "./blog/interactive-elements";
import { StylishList, StylishListItem } from "./blog/stylish-list";
import { CaptionedImage } from "./blog/captioned-image";
import { Spacer } from "./blog/spacer";
import { KeyboardShortcut } from "./blog/keyboard-shortcut";
import { ColorSwatch } from "./blog/color-swatch";
import { FileTree } from "./blog/file-tree";
import { Timeline } from "./blog/timeline";
import { Heading, Subheading } from "./blog/heading";
import { Architecture } from "./work/architecture";
import { lazy } from "react";
import { Island } from "./island";
import type { ComponentPropsWithoutRef, ComponentType, ReactNode } from "react";

// A minimal type describing the MDX component we render
type MDXComponent = ComponentType<{ components?: Record<string, unknown> }>;

const sharedComponents: Record<string, ComponentType<any>> = {
  // Basic Next.js components
  Image,
  Link,
  img: ({ src: rawSrc, alt, width, height, className }: ComponentPropsWithoutRef<"img">) => {
    const src = typeof rawSrc === "string" ? rawSrc : undefined;
    if (!src) return null;
    const w =
      typeof width === "number"
        ? width
        : typeof width === "string"
          ? parseInt(width, 10)
          : undefined;
    const h =
      typeof height === "number"
        ? height
        : typeof height === "string"
          ? parseInt(height, 10)
          : undefined;
    return <CaptionedImage src={src} alt={alt ?? ""} width={w} height={h} className={className} />;
  },
  a: ({ href, children, ...props }: ComponentPropsWithoutRef<"a">) => {
    if (href && (href.startsWith("http") || href.startsWith("mailto:"))) {
      return <ExternalLink href={href}>{children}</ExternalLink>;
    }
    return href ? (
      <Link href={href} {...props}>
        {children}
      </Link>
    ) : (
      <a {...props}>{children}</a>
    );
  },

  // Code components
  pre: ({ children, className, ...props }: ComponentPropsWithoutRef<"pre">) => {
    // Extract language and code content from code element
    let language = "";
    let codeContent = "";

    // Check if children is a code element with className
    if (React.isValidElement(children)) {
      const codeProps = children.props as {
        className?: string;
        children?: ReactNode;
      };

      // Extract language from code element's className (format: "language-js")
      if (typeof codeProps.className === "string") {
        const match = codeProps.className.match(/language-(\w+)/);
        if (match) {
          language = match[1];
        }
      }

      // Extract code content
      if (typeof codeProps.children === "string") {
        codeContent = codeProps.children;
      }
    } else if (typeof children === "string") {
      // Fallback for direct string children
      codeContent = children;
    }

    return (
      <CodeBlock
        language={language || undefined}
        showLineNumbers={true}
        className={className}
        {...props}
      >
        {codeContent}
      </CodeBlock>
    );
  },

  code: (props: ComponentPropsWithoutRef<"code">) => (
    <code className="bg-muted px-1.5 py-0.5 rounded text-sm" {...props} />
  ),

  // Custom quote components
  blockquote: ({ children, ...props }: ComponentPropsWithoutRef<"blockquote">) => (
    <Blockquote {...props}>{children}</Blockquote>
  ),

  // Custom list components
  ul: ({ children, ...props }: ComponentPropsWithoutRef<"ul">) => (
    <StylishList type="disc" {...props}>
      {children}
    </StylishList>
  ),

  // Passed as-is, not wrapped: StylishList recognises its items by identity.
  li: StylishListItem,

  ol: (props: ComponentPropsWithoutRef<"ol">) => {
    const { children, ...rest } = props;
    // Remove native <ol> type attribute to avoid conflict with StylishList's type prop
    const { type: _olType, ...clean } = rest as any;
    return (
      <StylishList type="number" {...(clean as any)}>
        {children}
      </StylishList>
    );
  },

  // Custom quote components
  Blockquote,

  // Custom note components
  Callout,

  // Navigation components
  TableOfContents,

  // Link components
  ExternalLink,
  CardLink,
  ResourceLink,
  ReadMoreLink,

  // Media components
  VideoEmbed,
  YouTubeEmbed,
  CaptionedImage,

  // Interactive components
  Tabs,
  Accordion,
  AccordionItem,

  // List components
  StylishList,
  StylishListItem,

  // Layout components
  Spacer,
  KeyboardShortcut,
  ColorSwatch,
  FileTree,
  Timeline,
  Heading,
  Subheading,

  // Case study components
  Architecture,
};

// Every MDX file under content/ becomes a real module. The map is lazy so
// Rollup still code-splits each post into its own chunk, and React.lazy lets
// the SSR stream await the import rather than falling back to the client.
const modules = import.meta.glob<{ default: MDXComponent }>("/content/**/*.{md,mdx}");

const cache = new Map<string, MDXComponent>();

// `path` is velite's s.path(), e.g. "posts/aeropress" — no extension, because
// the collections mix .md and .mdx.
const resolve = (path: string): MDXComponent => {
  const cached = cache.get(path);
  if (cached) return cached;

  const key = [`/content/${path}.mdx`, `/content/${path}.md`].find(
    (candidate) => candidate in modules,
  );
  if (!key) {
    throw new Error(`No MDX module for "${path}"`);
  }

  const Component = lazy(modules[key]) as unknown as MDXComponent;
  cache.set(path, Component);
  return Component;
};

interface MDXProps {
  path: string;
  components?: Record<string, unknown>;
  enableTableOfContents?: boolean;
  draft?: boolean;
}

export const MDXContent = ({
  path,
  components,
  enableTableOfContents = true,
  draft = false,
}: MDXProps) => {
  const Component = resolve(path);
  return (
    <>
      {enableTableOfContents && <TableOfContents />}
      {draft && (
        <p className="mb-6 border-y border-border py-2.5 text-sm text-muted-foreground">
          Draft. This piece is not finished yet.
        </p>
      )}
      <article className="mdx-content">
        {/* A body chunk can fail to load after a deploy replaces it; keep the
            title and facts on screen and say how to recover. */}
        <Island
          name={`mdx:${path}`}
          fallback="This piece didn't load. Reloading the page usually fixes it."
        >
          <Component components={{ ...sharedComponents, ...components }} />
        </Island>
      </article>
    </>
  );
};
