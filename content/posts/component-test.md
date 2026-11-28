---
title: Testing Blog Components
slug: component-test
date: 1992-03-24
draft: true
---

# Testing All Blog Components

This post demonstrates all the custom components we've created for the blog.

## Table of Contents

::TableOfContents

## Code Block

Here's a syntax-highlighted code block:

```typescript
// A simple function in TypeScript
function greet(name: string): string {
  return `Hello, ${name}!`;
}

const user = "Reader";
console.log(greet(user));
```

## Blockquote

Here's a blockquote with attribution:

:::Blockquote{author="Albert Einstein" citation="Address to the Physical Society, Berlin, 1918"}
The most beautiful thing we can experience is the mysterious. It is the source
of all true art and science.
:::

And a regular markdown blockquote:

> This is a regular markdown blockquote
> that should also use our styling

## Callouts

:::Callout{type="info" title="Information"}
This is an informational callout. Use it for providing additional context or
details.
:::

:::Callout{type="warning" title="Warning"}
This is a warning callout. Use it to alert readers about potential issues or
things to consider.
:::

:::Callout{type="error" title="Error"}
This is an error callout. Use it to highlight critical issues or problems.
:::

:::Callout{type="tip" title="Tip"}
This is a tip callout. Use it to provide helpful suggestions or best
practices.
:::

## Link Components

### Card Link

::CardLink{href="https://nextjs.org" title="Next.js" description="The React framework for production" external="true"}

### Resource Link

Check out [my About page](/about) for more information.

### Read More Link

[See all blog posts](/blog)

## Video Embed

::VideoEmbed{src="https://www.youtube.com/watch?v=dQw4w9WgXcQ" caption="A very interesting video"}

## Interactive Elements

### Tabs

::Tabs{items='[{"label":"First Tab","content":"This is the content of the first tab."},{"label":"Second Tab","content":"This is the content of the second tab."},{"label":"Third Tab","content":"This is the content of the third tab."}]'}

### Accordion

::::Accordion
:::AccordionItem{title="How do I use these components?"}
Simply import them in your MDX file and use them as JSX components.
:::

:::AccordionItem{title="Can I customize these components?"}
Yes! You can modify the component source code to change styling.
:::

:::AccordionItem{title="Are these components accessible?"}
The components are built with basic accessibility features.
:::
::::

## Conclusion

If all components above render correctly, then our implementation is successful!
