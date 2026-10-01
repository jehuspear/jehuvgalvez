# Hero image-quality upgrade

Implemented on `portfolio-v2`. The user selected consistent batch enhancement instead of AI redrawing.

## Processing

- Original 73-frame sequence: 1280x720. Originals are unchanged.
- Desktop derivatives: 73 frames at 1920x1080; Lanczos scaling and fixed, light sharpening; WebP quality 92.
- Mobile derivatives: 37 frames at 1280x720, sampled from the desktop originals rather than the old 768x432 files; WebP quality 90.
- Three enhanced posters at 1920x1080, WebP quality 94.
- Every output is reopened and decoded after encoding. Colors, composition, frame order, source mapping, and facial appearance are preserved through deterministic processing.
- These are upscaled/enhanced assets, not native 1080p footage or recovered source detail.

## Rendering and memory

The canvas uses high-quality scaling. Desktop no longer selects the lower-resolution set based on reported RAM or a 3G connection alone. Save-Data and 2G remain bandwidth-sensitive fallbacks. The window is now five nearby frames with six desktop/eight mobile cache entries, retaining the initial four-frame warmup and three-request concurrency limit. Desktop cache pixels occupy about 47.5 MiB, excluding in-flight decodes, canvas, and browser overhead.

## Files

Created:
- `scripts/enhance-hero-frames.py`
- `docs/hero-quality.md`
- `public/hero/jehu-hero-sequence-hd/sequence/frame-0001.webp` through `frame-0073.webp` (73 files)
- `public/hero/jehu-hero-sequence-hd/sequence-mobile/frame-0001.webp` through `frame-0037.webp` (37 files)
- `public/hero/jehu-hero-sequence-hd/poster-start.webp`
- `public/hero/jehu-hero-sequence-hd/poster-professional.webp`
- `public/hero/jehu-hero-sequence-hd/poster-final.webp`
- `public/hero/jehu-hero-sequence-hd/manifest.json`
- `public/hero/jehu-hero-sequence-hd/README.md`

Changed:
- `components/motion/hero-sequence.tsx`
- `data/hero-sequence.ts`
- `hooks/use-scroll-sequence.ts`
- `lib/frame-sequence.ts`
- `tests/frame-sequence.test.mjs`
- `README.md`

No originals removed or overwritten; no dependencies added; no commits or deployment.

## Transfer size

Desktop total: 14,654,844 bytes. Mobile total: 3,756,332 bytes. Only nearby frames are requested; neither set downloads in full on arrival.

## Validation

- All 113 enhanced frames/posters reopened and decoded successfully after encoding.
- npm test: all three frame/cache tests passed after reducing the loading window.
- npm run lint: passed with zero warnings.
- npm run build: passed, including TypeScript and static prerendering.
- Production browser checks passed at desktop and mobile widths, including a 3x mobile canvas (1170 physical pixels for a 390px viewport).
- Confirmed requests use the enhanced directory and high-quality canvas smoothing.
- First/middle/final/reverse frames, initial four-frame request limit, fixed frame set across resize, no overflow, skip link, delayed-frame retention, Save-Data, reduced motion, no JavaScript, and failed-load fallbacks all passed.
- Representative raw frames and production screenshots visually reviewed. No new generative detail was introduced.
- git diff --check: passed.

## Desktop display sizing

The desktop hero now displays the existing HD frames inside a centered 16:9 area capped at 1280 x 720 CSS pixels and 80svh. This reduces visible enlargement of the original 720p detail on large monitors. Subtle edge masks blend the smaller composition into the page; the text shade uses the same bounds. The full-height stage, scroll timing, mobile layout, and Intro handoff remain in place.

Canvas backing pixels use untransformed layout dimensions and never exceed the decoded frame dimensions. This avoids resizing the canvas throughout the handoff scale effect or allocating oversized rasters on high-DPR screens. The deliberate blur during the Hero-to-Intro handoff remains.

Files changed for this adjustment: `styles/hero-sequence.css`, `hooks/use-scroll-sequence.ts`, and this document. No image assets were recompressed, created, or removed.

Desktop sizing validation: all five automated tests, lint, and the production build passed. Chromium checks passed at 1024x768, 1440x900, 1920x1080 (2x DPR), 2560x1440, 3840x2160, and 390x844 (3x DPR). Verified display/raster caps, aligned shade, first/middle/final/reverse playback, a stable raster through the final-frame hold, Intro navigation, no overflow, bounded initial loading, Save-Data, reduced motion, no JavaScript, and zero browser exceptions. Selected Work and project-data hashes are unchanged. Checks used emulated viewports, not physical devices.
