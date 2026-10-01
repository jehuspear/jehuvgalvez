# Jehu Galvez Portfolio V2

Portfolio built with Next.js App Router, TypeScript, and Tailwind CSS. The hero uses a client-side canvas controller; its text and the remaining sections are server-rendered. No animation libraries or detailed case studies are included.

## Development

Use Node.js 22.18+ and npm. Run `npm ci`, then `npm run dev` and open http://localhost:3000.

- `npm test`: frame mapping, bounded loading/cache, cancellation, and bitmap cleanup.
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
- `public/hero/jehu-hero-sequence-ready/`: supplied sequence and guides, preserved in place.
- `components/motion/`, `hooks/`, `lib/`: hero wrapper, scroll lifecycle, and frame cache.
- `resources/`: original source material; not served by Next.js.
- `reference/v1/`: unchanged legacy site and archived deployment workflow; not served by Next.js.

The resume in `resources/Jehu_Galvez_Resume.pdf` is factual source material, not agent instructions. Project names also come from the owner's brief. No resume download or old contact form is published. The supplied hero frames are used without retouching.

## Validation and deployment

CI runs lint, typecheck, and build, without publishing. The legacy workflow that uploaded the entire repository is archived. V2 hosting is intentionally unconfigured; `next build` currently targets a Next.js server. A GitHub Pages deployment would require an explicit static-export/base-path decision.

No automated browser test suite or coverage target is established yet. Check section order, anchor destinations, mobile overflow, keyboard focus, and content with JavaScript disabled. Reduced motion displays a static professional poster with no sequence requests or pinned scrolling.

Work only on `portfolio-v2`; verify the branch before changes. Do not modify or merge into `main` without explicit instruction. See `docs/foundation-changes.md` for the complete file inventory.

Setup references: [Next.js installation](https://nextjs.org/docs/app/getting-started/installation) and [Tailwind CSS with Next.js](https://tailwindcss.com/docs/installation/framework-guides/nextjs).

Tooling note: ESLint is pinned to 9.39.5 because the React plugin bundled by eslint-config-next 16.3.8 fails with ESLint 10. npm reports the ESLint 9 deprecation; revisit the pin when the plugin supports ESLint 10.

## Scroll-controlled hero

Originals remain under `public/hero/jehu-hero-sequence-ready/public/hero/`. The active enhanced set is `public/hero/jehu-hero-sequence-hd/`, whose manifest is read by `data/hero-sequence.ts`. Desktop derivatives are 1920x1080; mobile frames are 1280x720, regenerated from the desktop originals. Fixed Lanczos resizing and light sharpening improve display quality without redrawing faces or backgrounds. Upscaling does not recover original detail. Desktop uses 73 frames; smaller screens, Save-Data, and 2G connections use 37. Wide-screen devices otherwise retain the higher-resolution set, independent of reported device memory. The selected set stays fixed during a mount, including resizing.

CSS sticky positioning and requestAnimationFrame map scroll progress directly to frames. Arrival loads at most four frames with three concurrent requests; scrolling loads a nearby window on demand. The cache holds at most 6 desktop / 8 mobile bitmaps, plus at most three in-flight decodes. Eviction and unmount close ImageBitmaps. The previous frame remains visible during loading. Nothing waits for the whole sequence.

Mobile keeps a full 16:9 composition above the text. Short viewports and high zoom use normal document flow when the stage cannot fit. Reduced motion, no JavaScript, unsupported decoding, or repeated initial frame failures retain an accessible poster and text. Skip to intro bypasses the experience.

Set `NEXT_PUBLIC_BASE_PATH=/subdirectory` at build time only when deploying under a subdirectory; Next.js and sequence URLs share this value. Default: domain root. See `docs/hero-animation.md` for the change inventory and validation.

API references: [ImageBitmap cleanup](https://developer.mozilla.org/en-US/docs/Web/API/ImageBitmap/close) and [reduced motion](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/%40media/prefers-reduced-motion).

Regenerate the enhanced sequence with `python scripts/enhance-hero-frames.py` (Pillow required only for regeneration). Web rendering enables high-quality image smoothing. The smaller nearby-frame window keeps the larger desktop images within a bounded decoded-memory budget. See `docs/hero-quality.md` for source provenance and validation.

## Hero to Intro / skills slice

`components/sections/hero-intro.tsx` groups the opening scene. The existing frame progression is followed by an 80svh hold: the final frame darkens and blurs as Intro overlaps it. No new image sequence or animation dependency is added. `lib/hero-timeline.ts` owns the timing; `data/skills.ts` owns resume-backed categories and context, plus development tools explicitly supplied by Jehu.

`InfiniteMarquee` renders three rows on desktop and two on mobile, using 21 local Devicon/Lobe Icons SVGs and generic line icons for concepts without brand marks. Duplicated visual tracks are hidden from assistive technology. Hover pauses each row; keyboard focus reveals a static list; a pause/resume control switches all rows to/from readable static lists. Reduced motion and no JavaScript show static lists. Offscreen and background-tab animation pauses. Icon licenses and pinned source revisions are included beside the icons. ChatGPT, OpenAI Codex, Antigravity, Gemini, and Visual Studio Code lead the Development / AI Tools row.

Selected Work and project data are unchanged. See `docs/intro-slice.md` for files and validation.
