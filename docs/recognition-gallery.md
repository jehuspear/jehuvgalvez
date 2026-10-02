# Recognition certificate gallery

The restored AutoPet award is selected initially. Five native radio options update the corresponding image preview: TOPCIT, Oracle OCI, AutoPet, FPA-LMS Recognition (replacing Dean's List), and Salesforce Agentblazer Champion. The Salesforce file's printed title is **Agentblazer Workshop Completion Certificate**; the UI identifies it as workshop completion, not a Salesforce certification.

## Sources and published images

| Image in `public/recognition/` | Verified source | Dimensions |
| --- | --- | --- |
| `best-in-iot-restored.webp` | User-supplied `Downloads/Restored Certificate of Recognition.png` | 1470×1070 |
| `topcit.webp` | [TOPCIT certificate](https://drive.google.com/file/d/1qsVm4rlM_6I1TyXg7K5_ZNKVG_qjL9-X/view) | 1765×1266 |
| `oracle-oci.webp` | [Oracle certificate PDF](https://drive.google.com/file/d/1u6uU0kYWKOSHNxr1duZ8SQGVyfgGmDf-/view) | 1800×1391 |
| `fpa-lms-recognition.webp` | [FPA recognition certificate](https://drive.google.com/file/d/1rKKQ1ey67Zb8JChWO5o9D41qX_DU2X5L/view) | 1646×1205 |
| `salesforce-agentblazer.webp` | [Agentblazer workshop PDF](https://drive.google.com/file/d/1oeA0_cVvcdnA5KcZ5fwhK0Bu4y0gLiNQ/view) | 1800×1013 |

The PDF pages were rendered and visually checked before conversion. Images retain their source dimensions and contents; WebP encoding uses quality 95. No additional restoration, generated text, crop, or retouching is applied. The old `best-in-iot.webp` remains as reference and is no longer used by the gallery.

## Behavior and accessibility

Native radio selection and CSS `:has()` show one preview. Keyboard users can use arrow keys within the credential group; visible focus and a check mark identify the chosen item. Every image has factual alt text and a full-size link labeled as opening a new tab. This selection works before hydration and with JavaScript disabled.

On narrow screens, pointer selection brings an off-screen preview into view. Keyboard selection does not move focus or scroll automatically. Reduced motion uses an immediate scroll and disables the label transition. The small client wrapper implements only this mobile convenience; it does not control selection.

The preview reserves a 4:3 media frame and fits each entire certificate inside it. Hidden previews use `display: none` and lazy images, so they are requested when selected. Certificate images are served directly to avoid another lossy optimization pass. No dependency, global preload, or animation library is added.

## Files

Created: `data/recognition.ts`, `components/ui/recognition-gallery.tsx`, `styles/recognition.css`, this guide, and the five images above.

Changed: `components/sections/recognition.tsx`, `data/profile.ts` (removes the old duplicate credential array), `app/globals.css` (imports scoped gallery styles), and `docs/portfolio-chapters.md` (points to this update).

No files removed. Hero, Intro, project chapters, navigation, resume controls, and other section behavior are preserved.

## Validation

Typecheck, lint (zero warnings), nine existing regression tests, and production build pass. Production Chromium checks cover 320, 375, 768, 1024, 1440, and 1920px, plus reduced motion, no JavaScript, and forced colors. All five previews, full-size links, radio keyboard focus, mobile preview scrolling, and stable media framing pass; no horizontal overflow or browser exceptions were observed. Only the default certificate loads when the gallery first approaches the viewport; other images load on selection. All 494 protected source/asset hashes match the existing baseline, and FPA scroll phases still work forward and backward.
