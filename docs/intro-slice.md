# Hero to Intro + technical skills

Scope: the next slice from Portfolio Redesign Critique. Selected Work and all later sections are unchanged. Work stays on portfolio-v2.

## Added

- `components/motion/infinite-marquee.tsx`
- `components/sections/hero-intro.tsx`
- `components/sections/skills-marquees.tsx`
- `components/ui/skill-icon.tsx`
- `data/skills.ts`
- `hooks/use-reduced-motion.ts`
- `lib/hero-timeline.ts`
- `public/icons/technology/LICENSE-devicon.txt`
- `public/icons/technology/README.md`
- `public/icons/technology/arduino.svg`
- `public/icons/technology/azure.svg`
- `public/icons/technology/bootstrap.svg`
- `public/icons/technology/cplusplus.svg`
- `public/icons/technology/csharp.svg`
- `public/icons/technology/css3.svg`
- `public/icons/technology/git.svg`
- `public/icons/technology/github.svg`
- `public/icons/technology/html5.svg`
- `public/icons/technology/java.svg`
- `public/icons/technology/javascript.svg`
- `public/icons/technology/jquery.svg`
- `public/icons/technology/mysql.svg`
- `public/icons/technology/oracle.svg`
- `public/icons/technology/php.svg`
- `public/icons/technology/python.svg`
- `styles/intro.css`
- `tests/hero-timeline.test.mjs`
- `docs/intro-slice.md`

## Changed

- `components/sections/intro.tsx`
- `app/page.tsx`
- `app/globals.css`
- `data/hero-sequence.ts`
- `hooks/use-scroll-sequence.ts`
- `AGENTS.md`
- `README.md`

## Content and accessibility

Skills are taken from the supplied resume. Specific project associations appear only where supported there. No skill percentages, new credentials, or new project claims were added. Three differently paced marquee rows become two on mobile. Hover pauses motion; keyboard focus reveals a static list. A persistent pause/resume control and reduced-motion/static fallbacks are provided.

The 80vh final-frame hold reuses the existing sequence, and Intro uses the existing final poster with a subtle grid/network. No additional animation dependencies or image sequences.

## Protected files

- `components/sections/selected-work.tsx` SHA-256: `47ec4208534c11280c002ca340bb2b6f07eee34849b2c4c0982c7c2d89b37e56`
- `data/projects.ts` SHA-256: `2dc5a60631b09ed5b59bda0c9088b10210e78714f4ae584591ca5371a2dc5bdd`

Sources: [Devicon](https://github.com/devicons/devicon) and [W3C pause/stop/hide guidance](https://www.w3.org/WAI/WCAG22/Understanding/pause-stop-hide).

## Removed

None. Existing sequence assets and V1 reference files are preserved.

## Validation

- `npm test`: all five tests passed (frame/cache lifecycle and final-frame hold timing).
- `npm run lint`: passed with zero warnings.
- `npm run build`: successful static production build.
- Chromium at 1440 x 900 and 390 x 844 (3x DPR): first/middle/final/reverse frames, 80svh hold, Intro anchor, correct row counts, all 26 skills, animated drift, hover/global pause, keyboard static layout, context details, and local SVG decoding passed.
- Reduced motion and JavaScript disabled: no sequence-frame requests; all skills remain visible in static lists.
- Direct `/#intro` navigation and eight-section order passed; no horizontal overflow or browser exceptions.
- Selected Work component and project-data hashes match the pre-slice versions above.

Browser checks use headless Chromium with mobile viewport emulation; physical-device testing was not performed. No new dependencies were added.
