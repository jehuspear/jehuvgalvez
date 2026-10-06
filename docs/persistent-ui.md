# Persistent portfolio controls

## Navigation

The fixed header retains its 73px desktop space. On mobile, an 80px safe-area-aware gutter inside the Hero stage keeps its sticky image below the navbar. Desktop interpolates from the wide identity/text layout to a 392px pill over the Hero-to-Intro interval; tablet uses the compact seven-icon layout. Mobile below 640px displays all seven direct links in one row: Home, Work, Experience, Capabilities, About, Recognition, and Contact. The normal pill is up to 352px wide and 52px tall, with 18px icons. Downward scrolling beyond the existing threshold reduces it to up to 324px wide and 48px tall, with 16px icons. The row accommodates 320px-and-larger viewports while retaining seven targets at least 44px wide and tall. Upward scrolling restores the normal size. Active dots and document progress remain visible in both states. There is no three-dot control or navigation dropdown. Accessible names, keyboard focus, and hover/focus tooltips are retained; edge tooltips stay inside the mobile viewport. Existing CSS transitions last 260ms, reduced motion switches immediately, and all seven links remain available without JavaScript.

IntersectionObserver watches Hero, Intro, Selected Work, Experience, Capabilities, About, Recognition, and Contact in a viewport-height-based reading band. Later overlapping sections take priority; this handles the Hero/Intro handoff. Intro maps to Home, Capabilities to Experience, and Recognition to About. At the document bottom, Contact takes priority because its short section cannot reach the upper reading band. Active links expose `aria-current="location"`; icon names are separate from hover/focus tooltips.

A passive scroll listener schedules at most one animation frame. It writes morph and normalized document progress to CSS variables without React updates on every scroll. ResizeObserver invalidates cached Hero/Intro offsets and document height after layout changes; geometry is read before style writes. The bottom-edge progress line scales from 0 to 1 without numeric text. Listeners, observers, and pending frames are cleaned up on unmount.

## Resume

The existing `public/resume/Jehu_Galvez_Resume.pdf` is served at `/resume/Jehu_Galvez_Resume.pdf`, honoring a configured base path. The 56px desktop control expands to 352px on hover/focus; the 48px mobile trigger opens an action panel above it. Native details/summary supports tap and keyboard operation even without JavaScript. Desktop enhancement adds hover/focus opening, outside-click dismissal, and Escape with focus returned to the trigger. View uses `target="_blank"`, `noopener noreferrer`, and a new-tab accessible description. Download specifies `Jehu_Galvez_Resume.pdf`.

Safe-area offsets protect the fixed controls. The closed mobile control clears Contact links. Focus indicators remain visible, and the existing Skip to Content link stays above the header. Anchor offsets clear the navigation. The Resume border/halo is static; reduced motion removes action/tooltip transitions and switches desktop nav states without interpolation.

## Files

Created:
- `app/icon.svg`: JG browser icon; prevents the missing-favicon request.
- `components/layout/resume-control.tsx`
- `hooks/use-portfolio-navigation.ts`
- `styles/persistent-ui.css`
- `docs/persistent-ui.md`

Changed:
- `components/layout/site-header.tsx`: replace static header with progressive semantic navigation and Lucide icons.
- `data/navigation.ts`: accessible labels, section list, and active-item mapping.
- `app/layout.tsx`: mount Resume control.
- `app/globals.css`: import scoped control styles.
- `package.json`, `package-lock.json`: add Lucide React.
- `README.md`: document navigation and the published Resume.

No files removed. Existing PDF, section components, Hero/Intro/FPA controllers, media, data, and styles are preserved.

## Validation

- `npm run typecheck`, `npm run lint`, and `npm run build`: passed.
- Production browser checks at 320, 390, 768, 1024, 1440, and 1920px: no horizontal overflow; navigation targets at least 44px.
- Wide/top, intermediate morph, compact navigation, hover tooltips, section mappings, and full document progress: passed. Contact takes precedence at the document bottom.
- PDF response/mimetype, View new-tab destination, and actual Download filename: passed.
- Keyboard action access, Escape focus return, and Skip to Content: passed.
- Touch tap to open/close, safe positioning, and closed control clear of Contact links: passed.
- Reduced motion and mobile JavaScript-disabled functionality: passed; no browser console/page errors.
- SHA-256 comparison: all 29 previously recorded section/controller/style/data/PDF files unchanged.
- Existing preview refreshed at http://127.0.0.1:3003/ on `portfolio-v2`; no commit or merge performed.

## Mobile Hero overlap fix

Changed `components/layout/site-header.tsx`, `hooks/use-portfolio-navigation.ts`, `styles/persistent-ui.css`, and this guide. No files created or removed. Hero frame/canvas logic, other sections, and the Resume control are unchanged.

Typecheck, lint, nine existing tests, and production build pass. Browser checks at 320, 375, 430, and 639px verify initial Hero clearance, smaller icon pill, scroll thresholds, keyboard access, anchor links, and no horizontal overflow. Reduced-motion and no-JavaScript fallbacks pass. Desktop wide-to-pill morph still passes at 1440px; no browser exceptions were observed in the completed checks.

## Persistent smaller mobile pill update

The menu-button collapse has been removed. Downward scrolling reduces the centered navbar from 272x56px to 248x48px; upward scrolling restores it. All five links, active-section dots, and scroll-progress line stay visible throughout. Targets remain at least 44px. CSS transitions last 260ms; reduced motion switches immediately. The Hero clearance gutter is retained.

Updated the header component, navigation hook, persistent UI styles, and this guide. No files created or removed. Typecheck, lint, and production build pass. Browser checks at 320, 375, 430, and 639px verify size changes, scroll thresholds, keyboard access, active Contact indicator, progress near 100%, visible icons, and no overflow. Reduced-motion, no-JavaScript, and desktop morph checks pass with no browser exceptions.

## Seven direct mobile links (current)

Removed the three-dot More control, dropdown markup and dismissal listeners, unused secondary-link flags, and corresponding styles. Equal-width mobile links use smaller artwork rather than reducing the tap areas. The existing navigation hook, active-section observer, scroll progress, direction thresholds, Hero gutter, and Resume control remain unchanged.

Changed `components/layout/site-header.tsx`, `data/navigation.ts`, `styles/persistent-ui.css`, and this guide. No files created or removed.

Typecheck, lint, eleven regression tests, and production build pass. Production browser checks at 320, 375, 430, 639, 768, and 1440px confirm seven visible links, no dropdown, minimum 44px targets, and no horizontal overflow. Mobile checks verify direct section links, keyboard activation, active-section highlighting, visible progress, and restored normal sizing after upward navigation. Reduced-motion and no-JavaScript behavior retain the existing CSS/native-anchor fallbacks. No animation library, commit, push, or deployment is included.
