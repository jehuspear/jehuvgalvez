# Repository Guidelines

## Project Goal & Current State

Rebuild Jehu Galvez’s portfolio as a cinematic, high-performance developer site covering full-stack development, databases, systems, IT support, networking, IoT/ESP32, automation, and business problem solving. The original site in `reference/v1/` is V1 reference material; do not preserve its visual architecture or fixed-panel navigation.

## Git Safety

Work only on `portfolio-v2`. Run `git branch --show-current` before significant work. Never commit directly to `main` or merge into it without explicit instructions.

## Stack & Organization

The current foundation uses Next.js App Router, TypeScript, and Tailwind CSS. The hero now uses native scroll and canvas animation; do not add GSAP, Motion, Lenis, or Three.js without a clear need. Add dependencies only for clear needs; defer icons until used.

Separate routes in `app/`, components in `components/{layout,sections,motion,ui}/`, content and project data in `data/`, hooks in `hooks/`, utilities in `lib/`, assets in `public/`, and tokens/styles in `styles/`. Avoid one large page component.

## Development & Validation

Inspect files, explain architecture, implement incrementally, run lint/build, fix errors, and summarize changes. Use Node.js 22.18+ and `npm ci`. Run `npm test` for frame mapping and cache lifecycle checks; no coverage threshold is established. Available scripts:

- `npm run dev`: local development.
- `npm run lint`: lint checks.
- `npm run build`: production validation.

Never declare implementation complete with a failing build. Manually check responsive layouts, keyboard navigation, reduced motion, links, and console errors.

## Coding Conventions

Use two-space indentation, ESLint Next.js/TypeScript rules, and focused functional React components and clear TypeScript names. Prefer PascalCase components and camelCase functions/hooks. Follow configured formatting; avoid unrelated reformatting and unnecessary abstraction. Isolate animation logic.

## Design, Motion & Accessibility

Use near-black backgrounds, warm-white large typography, restrained borders, generous spacing, technical labels, and one accent. Avoid excessive glassmorphism, gradients, particles, cursor blobs, neon, and skill-percentage bars.

Continuous scroll order: Hero, Intro, Selected Work, Experience, Capabilities, About, Recognition, Contact. The Hero-to-Intro handoff and skills marquees are now implemented. The FPA chapter in Selected Work uses native scroll progress and sticky media. Keep other projects and later sections as foundations until requested; no blocking loader. Preserve reduced-motion and no-JavaScript hero fallbacks.

For future animation work, use CSS for basic transitions, Motion for component interactions, and GSAP/ScrollTrigger for cinematic sequences only when authorized. Give motion a purpose; respect `prefers-reduced-motion` and keep content accessible without animation. Use semantic HTML, sufficient contrast, keyboard support, and visible focus. Never globally disable outlines.

## Performance & Content

Optimize responsive images with AVIF/WebP, lazy loading, stable layouts, and minimal JavaScript. Target good Core Web Vitals; never preload an entire image sequence initially.

Feature FPA Leave Management System, iBaryo Inventory and Resource Tracking System, AutoPet IoT System, and White House Cafe Ordering System. Never invent details, technologies, responsibilities, or metrics; explicitly label placeholders.

## Commits & Pull Requests

History mixes plain messages with `feat:`/`style:` prefixes. Prefer concise, imperative commits. PRs should describe changes, link relevant issues, report validation, and include screenshots for visual changes.
