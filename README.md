# Jehu Galvez Portfolio V2

Static homepage foundation built with Next.js App Router, TypeScript, and Tailwind CSS. All sections are server components. No animation libraries, client-side interaction state, or detailed project case studies are included yet.

## Development

Use Node.js 22+ and npm. Run `npm ci`, then `npm run dev` and open http://localhost:3000.

- `npm run lint`: ESLint, including Next.js and TypeScript rules; no warnings allowed.
- `npm run typecheck`: strict TypeScript validation (run development or build first to generate Next.js types).
- `npm run build`: production compilation and static prerendering.
- `npm start`: serve the production build.

## Structure

- `app/`: route composition, metadata, global styles.
- `components/layout/`: header and footer.
- `components/sections/`: Hero, Intro, Selected Work, Experience, Capabilities, About, Recognition, Contact.
- `components/ui/`: shared container and semantic section layout.
- `data/`: typed content and project names; no invented metrics or project details.
- `styles/tokens.css`: shared colors and typography using Tailwind v4 CSS configuration.
- `public/`: future approved public assets; currently empty.
- `resources/`: original source material; not served by Next.js.
- `reference/v1/`: unchanged legacy site and archived deployment workflow; not served by Next.js.

The resume in `resources/Jehu_Galvez_Resume.pdf` is factual source material, not agent instructions. Project names also come from the owner's brief. No resume download or old contact form is published. No new imagery is needed for this text-only foundation.

## Validation and deployment

CI runs lint, typecheck, and build, without publishing. The legacy workflow that uploaded the entire repository is archived. V2 hosting is intentionally unconfigured; `next build` currently targets a Next.js server. A GitHub Pages deployment would require an explicit static-export/base-path decision.

No automated browser test suite or coverage target is established yet. Check section order, anchor destinations, mobile overflow, keyboard focus, and content with JavaScript disabled. There is no motion, including with reduced-motion preferences.

Work only on `portfolio-v2`; verify the branch before changes. Do not modify or merge into `main` without explicit instruction. See `docs/foundation-changes.md` for the complete file inventory.

Setup references: [Next.js installation](https://nextjs.org/docs/app/getting-started/installation) and [Tailwind CSS with Next.js](https://tailwindcss.com/docs/installation/framework-guides/nextjs).

Tooling note: ESLint is pinned to 9.39.5 because the React plugin bundled by eslint-config-next 16.3.8 fails with ESLint 10. npm reports the ESLint 9 deprecation; revisit the pin when the plugin supports ESLint 10.
