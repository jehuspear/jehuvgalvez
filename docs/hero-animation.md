# Hero scroll animation

Implemented on `portfolio-v2` using the supplied asset pack. No dependencies added, no asset edits, no main-branch changes.

## Created

- `components/motion/hero-sequence.tsx`
- `data/hero-sequence.ts`
- `hooks/use-scroll-sequence.ts`
- `lib/frame-sequence.ts`
- `styles/hero-sequence.css`
- `tests/frame-sequence.test.mjs`
- `docs/hero-animation.md`

## Changed

- `components/sections/hero.tsx`
- `app/globals.css`
- `next.config.ts`
- `package.json`
- `package-lock.json`
- `.github/workflows/ci.yml`
- `AGENTS.md`
- `README.md`

## Assets

The supplied `public/hero/jehu-hero-sequence-ready/` directory remains unchanged and was already untracked before this work. The separate untracked image in `reference/v1/images/` remains untouched. No files were removed.

## Validation

- npm test: three passing tests covering endpoint mapping, load windows, concurrency, cache eviction, cancellation, and cleanup.
- npm run lint: passed with zero warnings.
- npm run build: passed, including TypeScript and static prerendering.
- Production Chrome: first/middle/final frames and reverse scrolling passed at 1440x900 and 390x844.
- Initial load: four sequence frames maximum; desktop/mobile set stays fixed across resize.
- Delayed target frame: previous decoded frame remains visible.
- Reduced motion: zero sequence requests, professional poster, no pin; live preference changes also passed.
- Save-Data selects the smaller set. Short landscape, no JavaScript, and initial network failures use static normal-flow fallback.
- No horizontal overflow or page errors; skip-to-intro links passed; desktop/mobile screenshots reviewed.
- git diff --check: passed.

No changes were committed or deployed. Real-device Safari testing and field performance measurements remain follow-up validation.
