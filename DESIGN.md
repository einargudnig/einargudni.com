---
name: Einar Gudni
description: An almanac of one person's work, ruled into tables and printed in a day or night edition by the Reykjavík sun.
colors:
  action: "oklch(0.2 0.008 70)"
  action-night: "oklch(0.92 0.008 85)"
  paper: "oklch(0.975 0.006 85)"
  ink: "oklch(0.2 0.008 70)"
  ink-muted: "oklch(0.48 0.012 70)"
  rule-hairline: "oklch(0.2 0.008 70 / 14%)"
  field-stroke: "oklch(0.2 0.008 70 / 22%)"
  night-ground: "oklch(0.2 0.006 70)"
  night-ink: "oklch(0.92 0.008 85)"
  night-ink-muted: "oklch(0.72 0.012 80)"
  night-rule-hairline: "oklch(0.92 0.008 85 / 13%)"
typography:
  display:
    fontFamily: "Geist Variable, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(2.75rem, 7vw, 4.5rem)"
    fontWeight: 600
    lineHeight: 1.02
    letterSpacing: "-0.04em"
  headline:
    fontFamily: "Geist Variable, ui-sans-serif, system-ui, sans-serif"
    fontSize: "3rem"
    fontWeight: 600
    lineHeight: 1.05
    letterSpacing: "-0.035em"
  title:
    fontFamily: "Geist Variable, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 600
    letterSpacing: "-0.025em"
  body:
    fontFamily: "Geist Variable, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.625
  article:
    fontFamily: "Geist Variable, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.7
    fontFeature: "tnum"
  label:
    fontFamily: "Geist Variable, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.43
    fontFeature: "tnum"
  code:
    fontFamily: "Geist Mono Variable, ui-monospace, monospace"
    fontSize: "0.85em"
    fontWeight: 450
rounded:
  sm: "6px"
  md: "8px"
spacing:
  row: "12px"
  row-work: "16px"
  gutter: "24px"
  section: "80px"
  section-md: "96px"
components:
  button-action:
    backgroundColor: "{colors.action}"
    textColor: "{colors.paper}"
    rounded: "{rounded.sm}"
    padding: "8px 16px"
    typography: "{typography.body}"
  link-action:
    textColor: "{colors.action}"
    typography: "{typography.label}"
  ledger-head:
    textColor: "{colors.ink}"
    typography: "{typography.title}"
    padding: "10px 0 4px"
  ledger-row:
    textColor: "{colors.ink}"
    typography: "{typography.body}"
    padding: "12px 0"
  ledger-row-date:
    textColor: "{colors.ink-muted}"
    typography: "{typography.label}"
    width: "7rem"
  input:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    rounded: "{rounded.md}"
    padding: "4px 12px"
    height: "36px"
---

# Design System: Einar Gudni

## Overview

**Creative North Star: "The Almanak"**

The site is an almanac of one person's work, after the Icelandic almanac tables: entries ruled into tables, dated, counted, and printed in one of two editions. The day edition is warm paper with warm black ink; the night edition is a charcoal ground with pale ink. Which edition you get is decided by the real sun over Reykjavík: below -6° altitude (civil dusk) the page prints at night, and it turns over while you read. A reader can pin day or night; the toggle cycles sun → day → night.

Density is that of a reference table, not a brochure. Everything sits in one narrow column (max 56rem), every list is a ruled table under a full-weight rule, and there is no accent colour at all: what you can act on is marked by form, a solid ink button or an underline. The system refuses the dark developer portfolio: no cards, no chips, no glow. It is deliberately minimal (user-pinned); every element earns its place.

**Key Characteristics:**
- Two editions (day/night) chosen by Reykjavík sun altitude, user-pinnable.
- Tables, never cards: full-weight rule over each table, hairlines between rows.
- No accent colour. Actions are marked by a solid ink button and underlines; everything is ink.
- One family (Geist) with tabular numerals; mono only for code.
- Flat paper: no shadows, no fills behind content.

## Colors

Two inks on two grounds, and nothing else. Action is shown by form, never by hue.

### Primary
- **Action Ink** (`action` day, `action-night` night): the same value as the edition's ink, kept as its own role (`--brand`) so actions can be recoloured in one place. Fills the "Work with me" and Send buttons, focus rings, caret and selection tint.

### Neutral
- **Warm Paper** (`paper`): day-edition ground.
- **Warm Black Ink** (`ink`): day-edition text, headings, data, and the full-weight table rule.
- **Faded Ink** (`ink-muted`): dates, row metadata, outcomes, form labels, masthead sun times.
- **Hairline** (`rule-hairline`): ink at 14%. The rule between table rows and the default border everywhere.
- **Field Stroke** (`field-stroke`): ink at 22%, input borders.
- **Night Charcoal** (`night-ground`), **Pale Ink** (`night-ink`), **Faded Pale Ink** (`night-ink-muted`), **Night Hairline** (`night-rule-hairline`): the same roles in the night edition. `primary` mirrors ink in both editions; it is not an accent.

### Named Rules
**The Ink Rule.** There is no accent colour. What you can act on is marked by form: a solid ink button, an underline, a focus ring. Never introduce a hue for actions, data, status or decoration. Error text is the one exception and stays red.

**The Two Editions Rule.** Every colour exists twice, as a day and a night value of the same role. Never write a colour for one edition only; define the role on `:root` and `.dark`. Edition switches cross-fade the ground and ink over 600ms.

## Typography

**Display Font:** Geist Variable (with ui-sans-serif, system-ui)
**Body Font:** Geist Variable
**Mono Font:** Geist Mono Variable, for code only

**Character:** One grotesque doing every job, tightened hard at display sizes and left at its natural width in tables. Hierarchy comes from size, weight and the rule above a table, not from a second family.

### Hierarchy
- **Display** (600, 2.75rem → 4.5rem at md, line-height 1.02, -0.04em): the homepage statement only, left-aligned, about 18–20ch.
- **Headline** (600, 2.25rem → 3rem at md, line-height 1.05, -0.035em): page titles such as a case study, max 22ch.
- **Title** (600, 1rem, tight tracking): table names in the ledger head and the masthead name. Small on purpose; the rule above carries the weight.
- **Body** (400, 1rem, relaxed): row titles (500 weight), lead paragraphs at 1.125rem in faded ink, max 54–60ch.
- **Article** (400, 1.0625rem, line-height 1.7, tabular-nums): long-form prose, max 65ch; h2 at 1.375em/600/-0.02em, h3 at 1.1em/600.
- **Label** (400, 0.875rem, tabular-nums): dates, periods, counts, row metadata, form labels, nav.

### Named Rules
**The Tabular Rule.** Every date, period, count and figure is set with tabular numerals so columns align down the table.

**The Mono-Is-Code Rule.** Geist Mono is for code and component names only. Labels, figures and section names stay in Geist sans.

## Layout

A single centred column (max-width 56rem, 20px side padding, 32px from md). Case studies narrow to 42rem with 65ch prose. The masthead sits on top with 56px below it (80px at md); homepage tables stack with 80px between them (96px at md); two short tables may sit side by side at md.

Table rows are a CSS grid: a fixed 7rem first column for the date or label, a flexible middle column for the entry, and an optional right column (10rem or auto) for client or kind. Column gap 24px. Rows pad 12px vertically (16px for work rows, which carry an outcome line). On mobile the grid collapses to a single stack; the right column falls under the entry.

**The Above-The-Fold Rule.** On desktop the first table (Work) starts inside the first viewport, under the statement.

## Elevation & Depth

None. The system is flat paper: no shadows, no tinted panels, no surface layering. Structure comes from rules alone: a full-weight ink rule opens a table, hairlines separate its rows, and the footer and masthead are rules too.

**The Ruled-Not-Raised Rule.** Group by drawing a rule, never by lifting a box. If you reach for a shadow, a background fill, or a bordered card, draw a rule instead.

## Shapes

Square and printed. Rules are 1px and run the full width of the column. The only rounding is small and functional: the action button (6px), form fields (8px), the focus outline (2px). Tiny round marks (the edition dot, filled for day and outlined for night) are the only circles.

## Components

### Buttons
Quiet and solid; there is one kind that matters.
- **Shape:** slightly softened corners (6px).
- **Action:** solid ink ground, paper text, 500 weight, 8px × 16px. "Work with me" and "Send".
- **Hover / Active:** brightness 110% and scale 0.98 on press, 200ms on the `--ease-out` curve.
- **Secondary:** not a button. A plain ink link with a 1px underline at 4px offset that underlines on hover ("Use cases").

### Ledger (signature)
The almanac table, the site's reusable unit.
- **Head:** full-weight ink rule on top, table name as Title on the left, and on the right either a count ("9 entries", tabular) or a faded link to the rest ("All use cases") that underlines on hover.
- **Rows:** hairline between rows (none above the first; the head rule does that job). Date/label column in faded Label type; entry title in ink at 500 that underlines on row hover; metadata in faded ink.
- **Empty:** an empty table still prints its hairline and a faded sentence, so absence reads as designed.

### Facts table
The case-study header: a definition list opened by a full-weight ink rule, each row a 7rem faded label and an ink value, hairline under every row. Period is tabular; Outcome is set at 1rem/500 as the row that matters.

### Inputs / Fields
- **Style:** transparent ground, field-stroke border, 8px radius, 36px tall, 0.875rem text, faded placeholder. Labels sit above in faded Label type.
- **Focus:** border shifts toward ink with a soft 3px ink ring.
- **Error / Disabled:** error border and message use the destructive role; disabled at 50% opacity.

### Navigation (masthead)
A full-weight ink rule under the name and sections: "Einar Gudni" as Title on the left, lower-case section links in faded Label type on the right, the current one in ink with a 1px underline at 6px offset, and "work with me" in full ink, set apart from the faded section links. Beneath the rule: today's Reykjavík sunrise and sunset (tabular, filled in after mount into reserved width) on the left, the edition toggle on the right. The footer mirrors it: a full-weight rule, the motto, links and the year.

## Do's and Don'ts

### Do:
- **Do** open every table with a full-weight `foreground` rule and separate rows with `border` hairlines.
- **Do** mark actions by form: a solid ink button, an underline, a focus ring.
- **Do** set dates, periods, counts and figures with tabular numerals in Geist sans.
- **Do** define every new colour role for both editions (`:root` and `.dark`).
- **Do** use the 7rem / 1fr / auto row grid so columns align across tables.
- **Do** keep it minimal: a new element must earn its place in the table.

### Don't:
- **Don't** use cards, chips, tag walls, glows or shadows to group content.
- **Don't** add an accent hue for actions, data, status or decoration.
- **Don't** set labels, figures or headings in Geist Mono; mono is for code and component names.
- **Don't** add a second accent colour or a second type family.
- **Don't** hard-code an edition; the edition comes from the sun or the reader's pin.
