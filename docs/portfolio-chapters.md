# Remaining Portfolio V2 chapters

Implemented on `portfolio-v2` after the typography milestone. No new dependency, case-study route, video, or image sequence is introduced. The previous FPA Facebook-link changes remain in place.

## Content and assets

Project descriptions, roles, dates, capability associations, and career details are grounded in `resources/Jehu_Galvez_Resume.pdf`. No new metrics or unsupported architecture are presented. The About cloud-learning copy comes from Jehu's explicit instruction. Native HTML/CSS/SVG visuals represent conceptual flows, not actual application interfaces.

| Published asset | Source | Dimensions / bytes |
| --- | --- | --- |
| `public/about/jehu-formal.webp` | `PORTFOLIO-v2 References Photo/Galvez_Formal.png` | 960×1200 / 123,768 |
| `public/projects/autopet/concept-sketch.webp` | `PORTFOLIO-v2 References Photo/SKETCH-IoT Pet Feeder Prototype.png` | 724×725 / 46,258 |
| `public/recognition/best-in-iot.webp` | [IoT certificate in Jehu's supplied Drive folder](https://drive.google.com/file/d/1dcvYpQa29GVWUdideO1LNZQXkyny8mmz/view) | 1757×1285 / 274,362 |

The original (now reference-only) Drive certificate matches the local `Downloads/GALVEZ_Best-IOT.jpg` exactly (MD5 `40502fb5eda050fe2308af8c808412a1`). Its visible text identifies AutoPet, Jehu Vincent F. Galvez, Best in IoT-Device, NU Fairview, and October 7, 2025. Source images are preserved; WebP derivatives use quality 92 without retouching. The AutoPet concept sketch is explicitly labeled as a design reference rather than a hardware photograph.

## Project chapters

- **iBaryo:** grid-based inventory/resource diagram, documented modules and MySQL, plus role and deployment context.
- **AutoPet:** the supplied sketch and a connecting capability strip for mobile web control, ESP32, schedules, and camera/voice; links to the separate Recognition section.
- **White House Café:** a shorter conceptual flow showing customer access, web ordering, and ticket logging. No unsupported menu/cart/payment/pickup stages are invented.

`ChapterProgress` updates a scoped CSS variable through requestAnimationFrame. IntersectionObserver attaches passive scroll listeners only for nearby chapters. Lines draw with scrolling; text and diagrams remain understandable without animation. The existing grouped reveal is reused. No long pinned project sections are added.

## Experience and capabilities

The career rail orders the three verified internships chronologically, preserving the overlap between DA support and the FPA cross-assignment. Desktop enhancement uses 240svh and a sticky stage below the navbar. Vertical scroll maps to the rail's measured horizontal travel; End/Home and arrow keys provide keyboard navigation when the region has focus. ResizeObserver verifies stage fit. Mobile, short windows, reduced motion, and no JavaScript show a stacked timeline.

Capabilities is a six-node systems map with tools, explanations, and verified project/experience links. Native `details/summary` provides keyboard, touch, and no-JavaScript disclosure; the `name` attribute makes selection exclusive in supporting browsers. CSS highlights the selected connection. Desktop explanations sit beside the map; tablet uses a panel below; mobile uses a vertical disclosure list. All controls retain the global focus outline.

## About, Recognition, Contact

About is a quiet portrait-and-text composition with verified education and location. Recognition now uses the restored AutoPet certificate and a selectable five-certificate gallery. FPA-LMS Recognition replaces Dean's List, and Salesforce Agentblazer workshop completion is added. See [the recognition gallery guide](recognition-gallery.md) for current assets and behavior. Contact closes with large typography, email, LinkedIn, and explicit résumé View/Download actions. Its subtle decorative image reuses the final Hero poster; reduced motion and forced colors hide that backdrop.

Next Image lazily serves the three new assets with intrinsic dimensions and responsive sizes. No project/portrait/certificate image is preloaded globally. Existing Hero/Intro/FPA/nav/Resume source and media, tokens, fonts, and dependencies remain unchanged.

## Files created

- `data/project-chapters.ts`
- `components/ui/project-heading.tsx`
- `hooks/use-chapter-progress.ts`
- `components/motion/chapter-progress.tsx`
- `components/sections/ibaryo-chapter.tsx`
- `components/sections/autopet-chapter.tsx`
- `components/sections/cafe-chapter.tsx`
- `styles/project-chapters.css`
- `data/section-content.ts`
- `hooks/use-experience-timeline.ts`
- `components/motion/experience-timeline.tsx`
- `styles/portfolio-sections.css`
- `public/about/jehu-formal.webp`
- `public/projects/autopet/concept-sketch.webp`
- `public/recognition/best-in-iot.webp`
- `docs/portfolio-chapters.md`

## Files modified

- `AGENTS.md`
- `README.md`
- `app/globals.css`
- `components/sections/selected-work.tsx`
- `components/sections/experience.tsx`
- `components/sections/capabilities.tsx`
- `components/sections/about.tsx`
- `components/sections/recognition.tsx`
- `components/sections/contact.tsx`

No files removed. The previously edited FPA component/data/styles/documentation and editorial source selector are preserved; they are not changes introduced by this milestone.

## Validation

- Typecheck, lint (zero warnings), nine existing tests, and production build pass.
- Production Chromium checks cover 320, 375, 430, 768, 1024, 1440, and 1920px; no horizontal page overflow or browser exceptions.
- Keyboard disclosures, timeline End/Home/reverse travel, certificate links, résumé filename, lazy assets, and direct section anchors checked.
- Reduced motion, no JavaScript, and forced colors checked.
- 494 protected file hashes match; Hero geometry and FPA scroll distances match the prior baseline. All four FPA phases still work forward and backward.

Checks use browser emulation; physical devices, screen-reader behavior, and field Core Web Vitals have not been measured.

