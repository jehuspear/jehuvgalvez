# Jehu Galvez — hero sequence assets

## Install
Copy the included `public/hero` directory into your portfolio-v2 project's `public` directory. These are prepared assets; the website component has not been implemented or changed.

- Desktop: 73 WebP frames, 1280 × 720, `frame-0001.webp` through `frame-0073.webp`.
- Smaller-screen / low-bandwidth option: 37 WebP frames, 768 × 432, `frame-0001.webp` through `frame-0037.webp` in `sequence-mobile`.
- Static images: `poster-start.webp`, `poster-professional.webp`, `poster-final.webp`.
- `manifest.json` contains dimensions, counts, byte totals and mobile source mappings.
- `frame-map.csv` maps every desktop frame to its original filename.
- `contact-sheet.jpg` previews 16 frames from the encoded desktop sequence.

All 73 original frames are retained in chronological filename order. No cropping, retouching, generated frames or timing changes were applied to the desktop sequence. The mobile sequence samples every second source frame and includes both endpoints. Keep your original ZIP as the source archive.

## Integration guidance
Map normalized scroll progress to a frame:

```ts
const frameIndex = Math.round(Math.max(0, Math.min(1, progress)) * (frameCount - 1));
const filename = `frame-${String(frameIndex + 1).padStart(4, '0')}.webp`;
```

Choose ONE frame set for the session, rather than loading both. Use 73 as desktop frameCount and 37 for the smaller set. Prefix asset URLs with your configured deployment base path if the site is hosted in a GitHub Pages subdirectory.

Display poster-start immediately; begin loading early frames and then fetch remaining frames with bounded concurrency. Draw only decoded frames; retain the last successfully drawn frame while the target loads. Do not block the entire page on all frames downloading. Use requestAnimationFrame for canvas drawing. Release decoded images when the component unmounts.

Use an ordinary HTML heading and links over or alongside the canvas. Honor prefers-reduced-motion with a static professional or final poster and no pinned scroll experience. Keep the canvas decorative when the adjacent text conveys the same story.

Full desktop RGBA decoding of all frames would require roughly 257 MiB before browser overhead; the smaller set is roughly 47 MiB. Compressed download size is not decoded memory size. Consider a bounded decoded-frame cache for constrained devices.

## Composition and story
The supplied animation keeps the subject mostly on the right throughout. It does not include the previously discussed right-to-left-to-center travel. Avoid adding aggressive whole-canvas horizontal movement, which also shifts the background. The later backgrounds are bright and detailed; use a dark gradient behind left-hand text and verify contrast.

Approximate visual stages, based on sampled frames:
- Frames 1–12: student / early builder.
- Frames 13–28: outfit and environment evolve toward professional.
- Frames 29–45: established professional appearance.
- Frames 46–73: cybernetic accents develop and the final look settles.

Treat these as editorial starting points, not measured transition boundaries. A direct 0–100% frame mapping preserves the source progression. The ZIP has no reliable video timing metadata; exact FPS and duration cannot be verified from it.

On portrait screens, a full-height cover crop of these widescreen frames can cut off the right-positioned face. Start with a contained 16:9 visual and text below it, or validate a responsive crop across the whole sequence. The smaller set preserves the original composition; it is not a custom portrait crop.

## Validation performed
All source images decoded at 1280 × 720. All output WebP files were reopened and decoded successfully. Output filenames are sequential, and both endpoints are retained in each set. Representative frames were visually reviewed. Website behavior and device performance still need testing in the actual project.

## Compression note
The original JPG set is about 2.70 MB. The desktop WebP set is larger (about 4.3 MB); conversion to WebP does not guarantee a smaller download. These files provide the requested naming and format, not a bandwidth saving over the source JPGs. The smaller sequence is about 1.2 MB.
