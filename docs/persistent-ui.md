# Persistent portfolio controls

## Navigation

The fixed header retains the previous header’s 73px desktop / 117px mobile space, so existing section geometry is preserved. Desktop and tablet interpolate from the wide identity/text layout to a 288px pill over the Hero-to-Intro interval. Width, spacing, label/icon opacity, vertical position, border, background, and backdrop blur use scoped CSS variables. Icons overlap the text fade to avoid a blank intermediate state. Mobile below 640px uses a 272px icon pill with five targets at least 44px tall/wide.

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
