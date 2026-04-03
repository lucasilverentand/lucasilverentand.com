---
name: lucasilverentand-site-design
description: Preserve and extend the visual language of lucasilverentand.com. Use when working in this repository on page design, component styling, layout changes, new sections, content presentation, or redesigns that should match the site's existing dark editorial aesthetic, Astro structure, typography, palette, spacing, motion, and interaction patterns.
---

# Lucasilverentand Site Design

## Overview

Design additions to feel native to this website, not like a generic template. Treat the current codebase as the source of truth and extend it with the fewest new primitives possible.

## Workflow

1. Inspect the target page or component and then inspect the shared tokens in `src/layouts/Layout.astro`.
2. Read `references/design-system.md` before making visual decisions.
3. Reuse the existing typography, spacing, card, divider, and hover patterns unless the user explicitly asks for a new direction.
4. For visual work, capture the rendered result with `npm run design:screenshot -- <route> <output-path>` and inspect the image before deciding whether the styling is correct.
5. Keep implementation local and simple: prefer Astro components plus page-level `<style>` blocks over introducing a styling framework or a large abstraction layer.
6. If a change introduces a reusable visual pattern, add it in the same style family and update `references/design-system.md`.

## Implementation Rules

- Reuse CSS custom properties from `src/layouts/Layout.astro`; only add new global tokens when the value is clearly shared across multiple surfaces.
- Keep the base mood dark, quiet, and editorial: near-black surfaces, muted gray text, one orange accent, serif headlines, and mono metadata.
- Preserve the current density: generous vertical rhythm, compact cards, thin borders, restrained radii, and low-noise hover states.
- Prefer hand-written CSS inside the relevant Astro file. Do not introduce Tailwind, utility frameworks, or animation libraries unless the user asks for them.
- Keep interactions restrained. Use fades, slight `translateY` reveals, subtle border changes, and opacity shifts instead of flashy motion.
- Keep copy concise and matter-of-fact. Avoid startup-marketing phrasing.

## Page Guidance

- For landing and index-style pages, favor a clear hero, optional featured module, then grouped lists or grids.
- For editorial pages, keep a narrower reading column, mono metadata, serif headings, muted body copy, and unobtrusive dividers.
- For utility or experiment pages, keep the same typography and token palette even if the layout becomes more interactive.

## Validation

- Compare the new work against nearby pages for rhythm, contrast, and type hierarchy.
- Use a fresh screenshot for visual comparison instead of judging color, spacing, or prominence from code alone.
- Check mobile collapse against the site's existing breakpoints before finishing.
- Avoid adding extra accent colors or decorative effects that compete with the orange accent or the dithered portrait treatment.
- Run the relevant preview or build step when a task changes layout, client-side behavior, or generated page structure.

## References

- Read `references/design-system.md` for the concrete token values, repeated UI patterns, and source files that define the current look.
