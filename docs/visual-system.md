# Portfolio visual system

This milestone establishes typography and shared editorial styling. It does not add project chapters, career timelines, systems maps, certificate galleries, or cinematic Contact scenes.

## Fonts and hierarchy

`app/layout.tsx` configures `next/font/google` at the root:

| Role | Font / CSS variable | Usage |
| --- | --- | --- |
| Display | Space Grotesk 500 / `--font-display` | Major headings, existing Hero/Intro/project headings, experience role titles |
| Body and interface | Geist variable / `--font-body` | Copy, navigation, buttons; weights 400, 500, and 600 used |
| Technical metadata | Geist Mono 400 / `--font-mono` | Section labels, project numbers, periods, technology tags, marquee labels |

Only Latin is marked for preload. Body/display fonts appear above the fold; Mono uses `preload: false` and loads when used. There are no italic assets or browser requests to Google. Next.js downloads fonts at build time and serves optimized WOFF2 files from the application's domain. Builds need access to the font source or a populated Next.js cache. All fonts use `display: swap` and the loader's default adjusted fallbacks.

`styles/tokens.css` maps Tailwind's `font-sans` to `--font-body` with `@theme inline`. Font variables are provided by the root HTML classes. Existing cinematic sizes and line heights stay in their original stylesheets; `--text-hero` is reserved for future compositions rather than forced onto the Hero.

| Size token | Fluid range |
| --- | --- |
| `--text-xs` | 0.70–0.78rem |
| `--text-sm` | 0.82–0.92rem |
| `--text-body` | 1.00–1.08rem |
| `--text-lead` | 1.15–1.45rem |
| `--text-h4` | 1.125–1.50rem |
| `--text-h3` | 1.70–2.60rem |
| `--text-h2` | 2.50–5.00rem |
| `--text-display` | 3.50–8.00rem |
| `--text-hero` | 4.00–9.00rem |

Use the scale and role classes instead of introducing arbitrary new sizes. Body copy uses approximately 1.7 line height; display headings use tighter leading and tracking. Intro and FPA copy keep their existing sizes.

## Spacing and containers

`--space-1` through `--space-8` are 4, 8, 12, 16, 24, 32, 48, and 64px at the default root size. Chapter padding uses `--space-section` (6–10rem); quiet About and Contact use `--space-section-large` (8–14rem). New spacing is token-based.

`Container` retains its children-only API and uses `.page-container`: `--content-max: 75rem`, with `--page-gutter: clamp(1.5rem, 3vw, 3rem)`. `--content-wide: 96rem` is available for future media layouts, while `--copy-max: 60ch` limits prose. `--section-gap` scales from 2–5rem. Shared sections split heading/content at 1024px and stack below that width; Capabilities uses two columns from 640px.

No container changes are forced into the custom FPA stage. Hero/FPA section heights, positioning, media bounds, and scroll distances remain bespoke.

## Palette, borders, and surfaces

The existing canvas `#111210`, surface `#191b17`, ink `#f3f0e7`, muted `#b1b4a9`, line `#383c33`, and acid-lime accent `#c4db95` remain.

Additional semantic colors:

- `canvas-elevated: #151612`, `surface-soft: #1c1e18`: quiet surface rhythm.
- `dim: #8a8e81`: secondary technical metadata.
- `line-strong: #626858`: clearer interactive borders and link underlines.
- `accent-soft`: 8% accent; `accent-muted: #a3ba78`: restrained technical labels.

`--border-subtle` and `--border-strong` define 1px rules. Radius tokens are 8/12/16px; the existing navigation and Resume shapes remain unchanged. Avoid applying cards to every content group. Experience/Recognition use a slightly elevated canvas; About stays quiet; Contact has the single low-opacity ambient radial treatment added in this milestone.

## Section identity and dividers

`SectionLabel` renders real, accessible text and an optional decorative divider:

```tsx
<SectionLabel index="02" label="Experience" />
<SectionLabel label="The technology behind the builder" divider={false} />
```

The convention is **01 Selected Work, 02 Experience, 03 Capabilities, 04 About, 05 Recognition, 06 Contact**. Intro is intentionally unnumbered; FPA's existing project number remains separate. The rule uses a low-contrast 1px line with a small terminal accent marker, outside cinematic sticky layers.

`Section` retains required `id`, `title`, and `children`. Optional `index`, `label`, `intro`, `divider`, and `layout` let future ordinary sections reuse the same heading, copy measure, gutters, and spacing. Default layout is split; Contact uses stacked. Do not migrate FPA into this wrapper.

## Texture and contrast

`body::before` repeats a 160px monochrome SVG turbulence tile embedded directly in `styles/editorial.css`. It is static, fixed, has 3% opacity, and introduces no asset request, layout space, or JavaScript. `pointer-events: none` prevents input interception. Its z-index is 20, below existing navigation/Resume (40) and the skip link (50). Empty decorative pseudo-elements add no accessibility-tree text.

The grain is disabled for `prefers-contrast: more` and forced colors. Native scrollbars remain visible; fine-pointer devices use a dark track and muted thumb. Selection and the global accent focus outline are retained.

## Motion and interaction

- Durations: fast 160ms, base 280ms, slow 600ms, section 900ms.
- Eases: standard `cubic-bezier(.2,.7,.2,1)`, out `cubic-bezier(.16,1,.3,1)`, expo `cubic-bezier(.19,1,.22,1)`.
- Group reveal distance: 20px.

`SectionReveal` observes each ordinary chapter once, then applies a 600ms opacity/translate reveal. Server-rendered content is visible by default; content already in view at mount is left immediate. Keyboard focus cancels the reveal. Reduced motion and no JavaScript keep all content visible without animation. No scroll listener or animation dependency is added. Hero, Intro, and FPA are not wrapped in this reveal.

New `.editorial-link` and `.editorial-button` styles define hover, focus-visible, and active states. Links keep underlines, buttons have at least 48px height, and arrows move only 2px when motion is allowed. Primary buttons use acid lime; secondary buttons use a restrained border/surface. All new transitions are scoped to ordinary editorial controls. Existing bespoke cinematic timing and persistent-control interactions are untouched.

## Rules for future components

Use semantic headings, the existing palette, role fonts, spacing tokens, measured copy, and meaningful grouped reveals. Keep controls named and keyboard accessible; provide immediate content for reduced motion/no JavaScript. Avoid loading extra fonts, arbitrary effects, large animated filters, and new dependencies. Verify sticky-layout fit after any typography change. Keep user/project facts in data files and do not invent details while polishing presentation.

## File inventory

Created:

- `components/ui/section-label.tsx`
- `components/motion/section-reveal.tsx`
- `styles/editorial.css`
- `docs/visual-system.md`

Modified:

- `app/layout.tsx`
- `app/globals.css`
- `styles/tokens.css`
- `components/ui/container.tsx`
- `components/ui/section.tsx`
- `components/sections/intro.tsx` (eyebrow only)
- `components/sections/selected-work.tsx` (chapter label only)
- `components/sections/experience.tsx`
- `components/sections/capabilities.tsx`
- `components/sections/about.tsx`
- `components/sections/recognition.tsx`
- `components/sections/contact.tsx`

No files removed. No existing project facts, Hero/FPA controllers, assets, animation stylesheets, frame settings, navigation logic, Resume logic, or dependencies changed. All work remains on `portfolio-v2`.

## Validation

- `npm run typecheck`, `npm run lint`, `npm run test` (9 tests), and `npm run build` passed.
- Production Chromium checks passed at 375×812, 430×932, 768×1024, 1024×768, 1440×900, and 1920×1080 (2× DPR). Verified loaded font roles, section numbering, gutters, title wrapping, no horizontal overflow, and clear focus indicators.
- Hero scroll height and enhancement eligibility match the captured baseline at all six sizes. Initial loading remains limited to four frames; professional/AI phases and reverse scrolling passed. The Intro handoff and marquee pause controls remain functional.
- FPA desktop height and sticky-stage eligibility match the baseline. Teaser, workflow, CSC document, ledger, and reverse phase navigation passed. Mobile remains stacked; small text-height differences reflect the font change rather than altered sequencing.
- Resume hover/touch expansion, focused Escape dismissal, PDF actions, and active-section navigation passed. Existing semantics and 44px navigation targets are retained.
- Reduced motion, no JavaScript, and forced colors show readable content. Grain disappears in forced colors. Direct links to Experience, About, and Contact skip entry animation; focus cancels the grouped reveal.
- Only two Latin font files are preloaded (body/display). Three local font files are requested for the rendered page. No external font requests or browser exceptions were observed.
- All 519 protected-file hashes match the pre-edit snapshot, covering the existing assets, data, controllers, cinematic styles, marquee code, persistent controls, and package files. `git diff --check` passed.

These are emulated desktop-Chromium checks. Physical-device/Safari behavior and field Core Web Vitals were not measured. No commit, push, deployment, or later project milestone was performed.
