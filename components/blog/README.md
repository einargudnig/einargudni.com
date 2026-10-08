# Blog Components

This directory contains custom React components for enhancing MDX blog posts. These components provide advanced styling, interactive elements, and specialized features beyond what standard Markdown offers.

## Component Overview

### Content Components

- `Blockquote` - Enhanced blockquotes with optional author and citation
- `Callout` - Info, warning, error, and tip callouts with titles
- `CaptionedImage` - Images with optional captions
- `CodeBlock` - Syntax highlighted code with line numbers and filename
- `StylishList` - Enhanced lists with multiple styling options

### Interactive Components

- `Accordion` - Expandable sections for hiding/showing content
- `Tabs` - Tabbed interface for organizing related content
- `VideoEmbed` - YouTube and other video embeds with optional captions

### Navigation Components

- `TableOfContents` - Automatic table of contents from document headings
- `ExternalLink` - External links with proper attributes and icon
- `CardLink`, `ResourceLink`, `ReadMoreLink` - Styled link variants for different contexts

### Layout Components

- `Spacer` - Vertical spacing with predefined sizes
- `FileTree` - Interactive file/directory tree visualization
- `Timeline` - Chronological events display
- `KeyboardShortcut` - Display keyboard shortcuts with styling
- `ColorSwatch` - Display color palettes with optional labels

## Usage

All components are automatically available in MDX blog posts through the `mdx-content.tsx` wrapper component. There's no need to import them in your MDX files.

### Example

```mdx
# My Blog Post

<Callout type="info" title="Note">
  This is an important note for readers.
</Callout>

<CodeBlock language="typescript">
  function example() {
    return 'Hello world';
  }
</CodeBlock>
```

## Documentation

- See `/app/component-docs/page.tsx` for detailed usage documentation
- View live examples in `/app/components-demo/page.tsx`
- Read the example blog post in `/content/posts/blog-components.mdx`

## Adding New Components

To add a new component:

1. Create a new file in `/components/blog/`
2. Export your component
3. Import and register it in `/components/mdx-content.tsx`
4. Add it to the shared components object
5. Update the documentation and demo page

## Styling

Components use Tailwind CSS for styling. Consistent design patterns:

- Dark mode optimized
- Spacing consistent with the blog's typography
- Proper color contrast for accessibility
- Responsive design for all screen sizes
