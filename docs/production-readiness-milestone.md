# Loading reliability and persistent-control polish

## Scope

Completed on `portfolio-v2`. Hero sequencing, Intro marquee, FPA phases and media, project content, navigation morph/progress, and recognition selection are unchanged. No dependency, route, asset replacement, commit, push, or deployment is included.

## Changes

- iBaryo and White House Café full-screen screenshot dialogs now show the existing skeleton while the original image loads, with an accessible status and a busy media region. The original image still mounts only after the viewer opens.
- Failed screenshots show a static message and a 44px-minimum Retry image action. Only explicit retries use a fresh query URL; normal opens retain browser caching. Retry does not lock the close button or Escape. Successful keyboard retries move focus to Close before removing the retry control; closing returns focus to the original screenshot link and releases the body scroll lock.
- The floating Resume summary stays at the right edge while desktop actions expand left. Hover/focus reveal remains on desktop; the first click on a hover-open control pins it. Narrow screens use native click/keyboard disclosure, avoiding the hover gap above the button. PDF view/download attributes and Escape/outside/blur dismissal remain intact.
- About's `sizes` hint now reflects the portrait's 450px width cap at large desktop and tablet widths, preserving the existing layout and asset.
- Reduced motion uses the existing static skeleton and transition rules. Native screenshot links and Resume details remain usable without JavaScript.

## Validation

- `npm run typecheck`, `npm run lint`, `npm test` (11/11), and `npm run build` passed. The homepage remains prerendered.
- A temporary localhost-only proxy stalled one original screenshot, returned a controlled HTTP 503, then released a retry. Browser checks verified loading/error/ready states, cleared busy state, fresh retry URL, successful decoding, and zero popup images after closing.
- Keyboard checks covered Close-to-Retry tab order, Enter retry, Escape dismissal, and focus restoration. The normal Café viewer loads successfully.
- At 375px the viewer fills the viewport, Close is 48px, and the Resume action panel stays within the viewport with 44px links. No horizontal overflow was observed. This is a browser viewport check, not a physical-touch-device test.
- Desktop Resume summary position stayed unchanged during expansion; actions opened and Escape returned focus to the summary.
- Reduced-motion/no-JavaScript behavior was inspected in source; OS preferences were not changed. Live Vercel performance was not measured in this milestone.

## File inventory

Created: `docs/production-readiness-milestone.md`.

Changed:

- `components/ui/image-viewer.tsx`
- `styles/project-chapters.css`
- `components/layout/resume-control.tsx`
- `styles/persistent-ui.css`
- `components/sections/about.tsx`

No files removed. The temporary validation proxy and screenshots are outside the repository.
