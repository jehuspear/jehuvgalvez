# Media delivery and caching

## Findings

Read-only checks of the live Vercel site found CDN `HIT` responses for the desktop frame, FPA teaser, and restored certificate. They used `Cache-Control: public, max-age=0, must-revalidate`, so a browser needed revalidation on repeat visits. The mobile frame sampled was a CDN miss. Individual HEAD responses took about 0.16–0.55 seconds; these are observations from this session, not field Core Web Vitals.

The previous complete Hero frame sets were 38,064,500 bytes desktop and 9,034,832 bytes mobile. High WebP quality settings (98/94) made transfer sizes large. Continuous retargeting also canceled in-flight target requests. Native lazy loading requested Intro's decorative final-frame image during initial Hero loading.

## Changes

| Frame set | Previous bytes | New bytes | Reduction |
| --- | ---: | ---: | ---: |
| Desktop | 38,064,500 | 16,008,950 | 57.9% |
| Mobile | 9,034,832 | 5,042,094 | 44.2% |

These are complete set sizes, not initial-page downloads. Desktop retains all 145 frames at 1280×720; mobile retains 73 frames at 960×540. Source indices, endpoints, phase boundaries, source-video SHA-256, canvas composition, and scroll timing are unchanged. New images are encoded directly from the approved video using WebP method 6, quality 86 desktop / 84 mobile. Encoding is lossy; representative faces and transition frames were visually reviewed. Originals remain intact.

`scripts/optimize-hero-assets.py` generates the frames and `data/hero-web-manifest.json`. It hashes encoded file names and bytes into `/hero/jehu-hero-sequence-web-0488020e9bc4/`. Regenerate from the repository root:

```powershell
python scripts/optimize-hero-assets.py --source "C:/path/to/jehu-galvez-transition.mp4"
```

FFmpeg and Pillow are needed only for asset generation. Commit the resulting manifest and frame directory together. Never edit images inside an existing versioned directory; regenerate to obtain a new URL when pixels change.

## Cache policy

- Versioned Hero frames: browser/CDN `public, max-age=31536000, immutable`.
- Project media, certificates, portrait, and icons: browser one hour, CDN one day. Use a new filename when replacing media that must appear immediately.
- Resume: browser five minutes, CDN one hour, allowing more frequent replacement.
- HTML, Next.js chunks/fonts, and the Next Image optimizer keep framework-managed policies. The public manifest is not marked immutable; only hashed frame files are.

The fetch cache uses `force-cache` with versioned frame URLs. Three requests and six desktop/eight mobile decoded frames remain the limits. Explicitly requested frames finish during retargeting; obsolete speculative work is canceled. A decoded neighbor within three frame indices can temporarily supply pixels, and captions follow those displayed pixels. Pause/dispose still abort outstanding requests and release bitmaps. No global sequence preload is added.

Responsive picture sources load mobile-sized initial and reduced-motion posters. Poster URLs reuse corresponding frame files. Desktop clients reporting Save-Data, 2G/3G, or downlink below 1.5 Mbps use the mobile frame set for that mount. Browsers without connection hints retain the viewport-based choice.

Intro and Contact decorative portraits mount within 300px of their sections using IntersectionObserver. Their text, layouts, and existing animation controllers remain intact. Reduced motion and forced colors skip those decorative downloads; without JavaScript, content remains complete with the Hero's static poster.

## Validation and deployment

Typecheck, lint, eleven tests, and production build pass. Production Chromium checks cover mobile/desktop phases, reverse scrolling, first-four-frame loading, deferred lower media, correct poster dimensions, and zero network transfer for warm cached frames. An emulated 0.7 Mbps connection with 150ms latency reached the first canvas frame in about 5.2 seconds and successfully retargeted; this local emulation is not a live-site performance score. Reduced-motion/no-JavaScript fallbacks, FPA phases, and original asset hashes pass with no browser exceptions.

Push `portfolio-v2` and redeploy Vercel to activate these changes. Then inspect the deployed versioned frame:

```powershell
curl.exe -I "https://jehuvgalvez.vercel.app/hero/jehu-hero-sequence-web-0488020e9bc4/sequence/frame-0001.webp"
```

Expect HTTP 200 and `Cache-Control` containing `max-age=31536000, immutable`. Check a normal return visit with browser caching enabled; a hard refresh or DevTools “Disable cache” bypasses that benefit. Recheck mobile rendering and assess field Core Web Vitals after deployment.

## File inventory

Created:

- `scripts/optimize-hero-assets.py`
- `data/hero-web-manifest.json`
- `components/motion/deferred-hero-portrait.tsx`
- `docs/media-performance.md`
- `public/hero/jehu-hero-sequence-web-0488020e9bc4/sequence/`: 145 WebP frames
- `public/hero/jehu-hero-sequence-web-0488020e9bc4/sequence-mobile/`: 73 WebP frames
- `public/hero/jehu-hero-sequence-web-0488020e9bc4/manifest.json`

Changed: `next.config.ts`, `data/hero-sequence.ts`, `components/motion/hero-sequence.tsx`, `hooks/use-scroll-sequence.ts`, `lib/frame-sequence.ts`, `components/sections/intro.tsx`, `components/sections/contact.tsx`, `tests/frame-sequence.test.mjs`, `tests/hero-phase.test.mjs`, `README.md`, and `docs/hero-quality.md`.

No pre-existing files removed. No dependency, service worker, or animation library added. Branch remains `portfolio-v2`; no commit, push, or deployment was performed.

Policy references: [Vercel cache headers](https://vercel.com/docs/caching/cache-control-headers), [Next.js headers](https://nextjs.org/docs/app/api-reference/config/next-config-js/headers), [Next Image caching](https://nextjs.org/docs/app/api-reference/components/image#minimumcachettl).
