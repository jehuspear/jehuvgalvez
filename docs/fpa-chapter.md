# FPA Selected Work chapter

Implemented on portfolio-v2 using the existing native scroll/canvas-era animation stack and visual tokens. Hero and Intro are unchanged. Project facts come from Jehu's supplied brief and verified resume context. Other project names remain as static foundations.

## Created

- `components/motion/fpa-screenshot.tsx`
- `components/motion/fpa-teaser.tsx`
- `components/sections/fpa-chapter.tsx`
- `data/fpa-project.ts`
- `hooks/use-fpa-chapter.ts`
- `lib/fpa-timeline.ts`
- `styles/fpa-chapter.css`
- `tests/fpa-timeline.test.mjs`
- `public/projects/fpa/fpa-teaser.mp4`
- `public/projects/fpa/fpa-poster.webp`
- `public/projects/fpa/application-tracking.webp`
- `public/projects/fpa/csc-form-approved.webp`
- `public/projects/fpa/leave-credit-ledger.webp`
- `docs/fpa-chapter.md`

## Changed

- `components/sections/selected-work.tsx`
- `app/globals.css`
- `AGENTS.md`
- `README.md`

No files removed or dependencies added. Source resources are preserved. Public teaser is the approved 21.8-second v3 cut (H.264, 1600x900, 1,245,643 bytes); the four WebP assets are 1600x900 and copied unchanged.

## Scroll implementation

Desktop enhancement uses a 360svh article and 100svh sticky stage. A requestAnimationFrame hook maps scroll distance to the pure timeline: teaser holds through 20%; tracking crossfades at 20–28%; CSC form at 43–51%, scaling from 0.9 to 1.0 through 70%; ledger at 74–82%; final summary at 84–96%. Numbered workflow labels and arrows communicate order independently of color. Connections draw through the workflow phase; surrounding chrome fades back during the document phase. Slow image loads retain the preceding decoded visual.

The video source is assigned only within 600px and playback occurs only while the teaser is active and visible. Images use a proximity observer and advance loading thresholds of 10%, 32%, and 62%. Neither video nor project media are globally preloaded.

## Accessible and responsive behavior

Below 1024px, below 700px viewport height, when content does not fit the sticky stage, under reduced motion, or without JavaScript, the chapter stays in normal flow: title, teaser, tracking/workflow, CSC form, ledger, then details. Reduced motion has no scroll crossfades, scale, or autoplay; native video controls allow deliberate playback. The teaser is muted, looped, and plays inline. A poster remains while loading or after an error. Screenshots include useful alt text and no-JavaScript images. Paused autoplay is user-controlled; video is inert outside the teaser phase. The final action links to the FPA recognition post supplied by Jehu on Facebook, opening in a new tab with an accessible announcement. Keyboard focus reveals the action even before the scroll finale; mobile, reduced-motion, and no-JavaScript layouts show it in normal flow. No case-study route or Facebook embed is added.

## Validation

- `npm test`: seven tests passed, including crossfade continuity, overscroll clamping, media-load thresholds, and final-summary timing.
- `npm run typecheck`, `npm run lint`, and `npm run build`: all passed after the final changes; zero lint warnings. Production output remains the homepage and not-found route only.
- Chromium at 1024x768, 1440x900, and 1920x1080: all four phases, full viewport fit, reverse scroll, bounded/progressive media loading, muted inline autoplay, user pause/resume persistence, offscreen pause, and no horizontal overflow passed.
- Mobile at 390px and 320px, 844x390 landscape, reduced motion at 1440px, and no JavaScript: normal-flow story and all images passed. Reduced motion allows manual video playback without autoplay.
- Direct FPA link defers future screenshot requests; keyboard focus has a visible outline; live reduced-motion preference changes disable the sticky stage and pause autoplay. No-JavaScript renders the actual screenshots without duplicate placeholders. A failed video request retains the loaded poster.
- Delayed document loading holds the preceding tracking visual. No browser exceptions occurred in the main browser suite.
- All eleven recorded Hero/Intro/skills/project-name file hashes match their pre-task versions. The five published FPA media files match their source hashes exactly. Source files are untouched.

Browser checks use viewport emulation, not physical-device or screen-reader certification. The source video and screenshots are used as supplied.
