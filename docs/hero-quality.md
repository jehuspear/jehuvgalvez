# Hero quality and narrative

The sizes and encoding settings below describe the original quality milestone, whose assets remain as reference. The active deployable set is now documented in [media performance](media-performance.md); its source dimensions, frame mapping, and phase timing are unchanged.

## Active source

The active sequence is generated directly from the owner's `jehu-galvez-transition.mp4`: **1280×720, 24fps, 145 frames, 6.041667 seconds**. The video remains outside the public directory. `manifest.json` records its SHA-256, dimensions, timing, encoding settings, and source-frame indices.

The previous workflow started with compressed extracted images and upscaled them. Fresh video decoding avoids that generation loss. Native detail remains limited to 720p; this does not create 1080p/4K detail or redraw Jehu's appearance. WebP encoding is high-quality **lossy**, rather than a lossless reproduction of decoded video pixels.

## Assets and rendering

- Desktop: all **145** native 1280×720 frames, WebP quality 98, **38,064,500 bytes** for the complete set.
- Smaller screens / Save-Data / 2G: **73** frames at 960×540, WebP quality 94, **9,034,832 bytes**. Every other source frame is sampled, including both endpoints.
- Three posters copied from matching desktop outputs: source indices 0, 40, and 144.
- New URLs under `public/hero/jehu-hero-sequence-native/` avoid reusing cached old assets. Both earlier asset sets remain unchanged as reference.
- The centered desktop composition remains capped at 1280×720 CSS pixels and 80svh. Canvas backing pixels never exceed decoded frame dimensions. High-DPR displays cannot reveal detail absent from the source.
- Arrival warms at most four frames; subsequent requests follow a five-frame sliding window. Three concurrent requests and six desktop/eight mobile cache entries remain. Decoded cache pixels occupy approximately 21.1 MiB desktop / 15.8 MiB mobile, excluding in-flight decoding, canvas, and browser overhead. The complete sequence is never preloaded on arrival.

Regenerate with `python scripts/extract-hero-video.py --source path/to/jehu-galvez-transition.mp4`. FFmpeg, FFprobe, and Pillow are offline generation requirements; no application dependency was added. The script validates the approved source dimensions/count and reopens every generated frame.

## Phase introductions

`data/hero-story.ts` separates factual copy from rendering. `HeroStory` renders all three beats in normal reading order. During enhancement, a reserved grid crossfades between visible paragraphs without shifting the CTA:

1. **Student** — source frames 0–35: IT education and foundations.
2. **Professional** — frames 36–95 (starting at 1.5s): development / IT support internships and the FPA leave workflow.
3. **Human + AI** — frames 96–144 (starting at 4s): owner-confirmed AI tools and an explicitly creative vision.

`heroPhaseAtFrame` receives the **actually painted source frame index**, not the requested scroll target. This keeps copy consistent during slow decoding and reverse scrolling, including the sparse mobile sequence. Screen readers receive all three descriptions without repeated live announcements. The final hold and existing Hero-to-Intro fade/blur remain unchanged.

## Fallbacks

Reduced motion, no JavaScript, unsupported canvas decoding, failed initial requests, short landscape windows, and overflowing high-zoom layouts show the three introductions as a readable static stack. Reduced motion requests no sequence and uses the professional poster. The fit safeguard measures the compact story first and retries overflow only after viewport changes to avoid observer loops. Existing skeleton/poster loading behavior remains.

## File inventory

Created:
- `components/sections/hero-story.tsx`
- `data/hero-story.ts`
- `lib/hero-phase.ts`
- `tests/hero-phase.test.mjs`
- `scripts/extract-hero-video.py`
- `public/hero/jehu-hero-sequence-native/sequence/frame-0001.webp` through `frame-0145.webp` (145 files)
- `public/hero/jehu-hero-sequence-native/sequence-mobile/frame-0001.webp` through `frame-0073.webp` (73 files)
- `public/hero/jehu-hero-sequence-native/poster-{start,professional,final}.webp` (3 files)
- `public/hero/jehu-hero-sequence-native/{manifest.json,README.md}` (2 files)

Changed:
- `components/sections/hero.tsx`
- `components/motion/hero-sequence.tsx`
- `data/hero-sequence.ts`
- `hooks/use-scroll-sequence.ts`
- `styles/hero-sequence.css`
- `README.md`
- `docs/hero-animation.md`
- `docs/hero-quality.md`

No files removed. Intro styles, FPA chapter, navigation, Resume control, profile, and skills data remain unchanged. No commits or deployment performed.


## Validation

- `npm test`: all nine tests passed, including source-phase boundaries and responsive timing.
- `npm run typecheck`, `npm run lint`, and `npm run build`: passed.
- All 223 installed asset files match generated hashes; all 221 WebP files decoded successfully. The raw source video hash is unchanged.
- Production Chromium checks passed at 1024×768, 1440×900, 1920×1080 (2× DPR), 2560×1440, and 390×844 (3× DPR): three phases, endpoints, reverse scrolling, bounded four-frame arrival, native raster caps, no overflow, CTA fit, and Intro navigation.
- Delayed future frames preserve the previous matching caption; live reduced-motion changes reveal the full static story and can restore animation.
- Reduced motion, no JavaScript, short landscape, overflowing windows, and failed initial-frame requests use readable static fallbacks. No browser exceptions were reported.
- Protected Intro, FPA, navigation, Resume, profile, and skills file hashes are unchanged. `git diff --check` passed.

Browser checks used emulated viewports in desktop Chromium; physical-device/Safari and field Core Web Vitals remain unmeasured.
