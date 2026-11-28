import { Head } from "@effect/ui";
import { HtmlHead } from "@effect/ui/html";

// The title, description and social card every page sets. The root's title
// template appends " — Einar Gudni".
export const pageHead = (options: {
  readonly title: string;
  readonly description: string;
  readonly image?: string;
  readonly type?: "article" | "website";
}) => [
  Head.title(options.title),
  HtmlHead.meta({ name: "description", content: options.description }),
  HtmlHead.meta({ property: "og:title", content: options.title }),
  HtmlHead.meta({ property: "og:description", content: options.description }),
  ...(options.type ? [HtmlHead.meta({ property: "og:type", content: options.type })] : []),
  ...(options.image
    ? [
        HtmlHead.meta({ property: "og:image", content: options.image }),
        HtmlHead.meta({ name: "twitter:card", content: "summary_large_image" }),
        HtmlHead.meta({ name: "twitter:image", content: options.image }),
      ]
    : []),
];
