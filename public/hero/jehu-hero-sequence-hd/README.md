# Enhanced hero sequence

Derived from the unchanged `jehu-hero-sequence-ready/public/hero` asset pack.

- Desktop: 73 frames at 1920 x 1080, WebP quality 92.
- Mobile: 37 frames at 1280 x 720, sampled from the original desktop frames, WebP quality 90.
- Three posters: 1920 x 1080, WebP quality 94.
- Identical Lanczos resize and restrained sharpening settings preserve sequence continuity, colors, identity, and composition.
- These are enhanced/upscaled derivatives, not native 1080p footage or recovered source detail.

Regenerate from the repository root with `python scripts/enhance-hero-frames.py` (requires Pillow). Every encoded output is reopened and decoded during generation. `manifest.json` records exact byte totals and source mappings.
