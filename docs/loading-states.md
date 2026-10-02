# Portfolio loading states

## Behavior

- The homepage stays server-rendered and prerendered. Real text, navigation, and Resume controls remain available while media loads. There is no timer, full-screen overlay, blocking route fallback, or artificial loading delay.
- Hero shows a portrait skeleton while its first visual is unavailable. A loaded poster or painted canvas frame immediately clears it. Cached posters are checked after hydration. Desktop loading text sits above the Hero shading and clear of the Resume control. Failed posters show a static unavailable message; readable Hero content remains present.
- FPA screenshot placeholders become loading skeletons only when existing near-viewport/scroll gates allow the image request. Loaded images replace them without changing dimensions. Error cards stop the pulse, clear `aria-busy`, and count as a renderable beat so the chapter can continue.
- The teaser has a skeleton until its poster or first video frame is available. A usable poster remains visible while video loads or fails. Existing muted, inline playback and lazy video behavior are preserved.
- Skeleton shapes are decorative. Route and project-image status text is accessible, and image loading marks only its media region busy. Reduced motion uses static blocks. JavaScript-disabled pages hide media skeletons and retain the original poster/noscript screenshot fallbacks.

## Limits

A loader can display only after HTML/CSS reaches the browser. The first local development compilation can still delay that initial response; production serving avoids that development compilation step. Media skeletons handle the actual image-loading gaps without making the page wait for hydration or the full image sequence.

## File inventory

Created:
- `components/ui/skeleton.tsx`
- `styles/skeleton.css`
- `docs/loading-states.md`

Changed:
- `app/globals.css`: import loading styles.
- `app/layout.tsx`: hide media-only skeletons without JavaScript.
- `components/motion/hero-sequence.tsx`: cached poster detection, skeleton, and loading/error labels.
- `components/motion/fpa-screenshot.tsx`: loading/error readiness, accessible status, and skeleton replacement.
- `components/motion/fpa-teaser.tsx`: preview loading/failure state.

No files removed; no dependencies or artificial loading delays added. Existing content data, section markup, scroll timelines, frame cache, media files, and base section styles are preserved. The Next.js-generated addition to `AGENTS.md` was already present before this work.

## Validation

- Typecheck, ESLint, and production build passed.
- Controlled slow-network checks: Hero skeleton clears when the poster arrives while frames are still blocked; FPA teaser/screenshots display placeholders and remove them after their media loads.
- Mobile image dimensions remain stable before/after loading; cached reloads clear placeholders correctly; navbar remains functional.
- Controlled image failures: static unavailable messages, stopped skeleton animation, cleared busy state, and continuing FPA scroll phases.
- Reduced-motion placeholders have no animation. JavaScript-disabled pages display the original poster and real noscript screenshots without skeleton overlays.
- The static entry remains server-rendered without a blocking route fallback.
- All 22 protected content/section/controller/style files match their initial hashes. No browser page errors in the passing checks.
- Existing development preview at http://127.0.0.1:3003/ responds with HTTP 200.
