# Lucasilverentand.com Design System

Use this file as the concrete reference for matching the existing site.

## Source Files

- `src/layouts/Layout.astro`: global color tokens, fonts, base reset, scrollbar styling
- `src/pages/index.astro`: homepage structure, hero, featured card, project cards, writing list, motion
- `src/pages/blog/index.astro`: archive list layout and tag treatment
- `src/pages/blog/[slug].astro`: article width, metadata row, prose styling
- `src/pages/404.astro`: utility-page tone and spacing
- `src/pages/experiment.astro`: experiment container and interactive overlay styling
- `src/components/Footer.astro`: footer density and navigation treatment

## Visual Identity

- Mood: dark, editorial, technical, understated
- Overall feel: personal studio site, not product landing page, dashboard, or glossy agency template
- Contrast strategy: bright foreground text on black, muted grays for secondary text, orange used sparingly for emphasis
- Surface treatment: mostly flat fills with thin borders, not glassmorphism, shadows, or gradients

## Global Tokens

Defined in `src/layouts/Layout.astro`.

- Backgrounds:
  - `--bg: #080808`
  - `--bg-2: #0e0e0e`
  - `--bg-3: #141414`
- Borders:
  - `--border: #1e1e1e`
  - `--border-2: #2a2a2a`
- Text:
  - `--text-1: #ededed`
  - `--text-2: #999999`
  - `--text-3: #555555`
- Accent:
  - `--accent: #ff5c1a`
  - `--accent-dim: rgba(255, 92, 26, 0.12)`
  - `--accent-glow: rgba(255, 92, 26, 0.25)`
- Typography:
  - Display: `DM Serif Display`
  - Mono: `DM Mono`
  - Body: system sans stack

## Typography Rules

- Use `DM Serif Display` for primary headings and major section titles.
- Use `DM Mono` for metadata, tags, badges, small navigation, dates, technology labels, and buttons.
- Use the body stack for paragraphs and supporting copy.
- Keep heading weights light. Most headings use `font-weight: 400`.
- Tighten large headings slightly with negative letter spacing.
- Keep paragraph color mostly on `--text-2`; reserve `--text-1` for emphasis and links.

## Layout and Spacing

- Common content width: `max-width: 960px`
- Reading width for articles: `max-width: 720px`
- Horizontal padding inside wraps: `24px`
- Section spacing is generous and vertical-first.
- Cards are compact and crisp rather than oversized.
- Radii stay restrained:
  - cards: `10px` to `14px`
  - buttons: `8px`
  - badges/tags: `4px` to `6px`

## Repeated UI Patterns

### Links

- Default links inherit text color.
- Inline rich-text links use underlines with muted underline color and a subtle hover shift.
- Utility links use mono text, small size, muted color, and brighten on hover.

### Badges and Tags

- Use mono text.
- Use orange text on `--accent-dim`.
- Keep them small and rectangular with modest radius.
- Use for labels like categories, tags, or status chips, not as loud marketing pills.

### Cards

- Use thin borders and near-black surfaces.
- Hover states usually change border color, background, or opacity slightly.
- Avoid drop shadows.
- Keep internal spacing disciplined and content-dense.

### Lists and Dividers

- Separate rows with `1px` borders in `--border`.
- Archive and writing lists are simple rows, not heavy cards.
- Use spacing and typography for hierarchy before adding extra decoration.

### Buttons

- Primary buttons invert to a light fill with dark text.
- Secondary actions stay subtle with borders and muted text.
- Both use mono type and compact sizing.

## Motion

- Motion is restrained and purposeful.
- Existing patterns:
  - hero entrance animation with upward fade
  - intersection-based fade-ins using `translateY`
  - short hover transitions around `0.15s`
- Use easing that feels smooth and deliberate, not springy or playful.
- Do not introduce constant ambient motion unless the page is explicitly experimental.

## Responsive Behavior

- Existing breakpoints:
  - `768px` for major layout collapse
  - `520px` for narrow single-column fallback
- On smaller screens:
  - stacked hero layout
  - centered hero copy and links
  - grid collapses from 3 columns to 2, then 1
  - secondary descriptions may disappear before primary content does

## Content Tone

- Voice is direct, personal, and technical.
- Keep copy specific and low-hype.
- Avoid generic startup copy, oversized claims, and decorative filler text.

## Anti-Patterns

- Do not add additional accent colors unless the user asks for a new direction.
- Do not switch to rounded, soft SaaS styling with large shadows or glass panels.
- Do not replace serif headlines with geometric sans display type.
- Do not introduce loud gradients, neon glows, or oversized CTA sections.
- Do not over-componentize simple page-specific styles.
- Do not add Tailwind or another styling layer for isolated design changes.
