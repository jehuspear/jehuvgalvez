# Recruiter Clarity + Portfolio Proof

Completed on `portfolio-v2`. This milestone changes messaging, project evidence, professional links, and metadata. No case-study routes, dependencies, or animation libraries were added.

## Files created

- `components/ui/project-proof.tsx`: reusable server-rendered proof definition list.
- `data/site.ts`: canonical public origin, sharing metadata, and Person data.
- `app/robots.ts`: public crawling rules and sitemap reference.
- `app/sitemap.ts`: canonical homepage only.
- `public/opengraph/portfolio.jpg`: static 1200 × 630 portrait card, 38,921 bytes.
- `docs/recruiter-clarity-milestone.md`: this report.

## Files changed

- `app/layout.tsx`: complete metadata and Person JSON-LD.
- `components/layout/site-header.tsx`, `data/navigation.ts`, `hooks/use-portfolio-navigation.ts`, `styles/persistent-ui.css`: seven desktop sections, mobile More disclosure, honest active mapping, and article anchor clearance.
- `components/layout/site-footer.tsx`: professional identity and GitHub, LinkedIn, résumé, and top links.
- `components/sections/hero.tsx`, `data/hero-story.ts`: approved copy and CTA edits only.
- `components/ui/project-heading.tsx`: technologies/practices available in the quick-scan heading.
- `components/sections/selected-work.tsx`: static FPA overview outside its measured animation stage.
- `components/sections/ibaryo-chapter.tsx`, `components/sections/autopet-chapter.tsx`, `components/sections/cafe-chapter.tsx`: project proof integration.
- `data/fpa-project.ts`, `data/project-chapters.ts`: canonical proof and reusable media references.
- `components/sections/about.tsx`, `data/section-content.ts`: networking clarity and a workflow-centered working philosophy.
- `components/sections/contact.tsx`, `data/profile.ts`: canonical GitHub link and descriptive professional title.
- `components/sections/recognition.tsx`, `data/recognition.ts`: selected AutoPet/FPA credential-to-project connections.
- `styles/project-chapters.css`: restrained proof rules and responsive columns.
- `styles/portfolio-sections.css`: quiet footer layout and 44px links.

No files were removed.

## Hero message

The eyebrow reads “Full-stack developer · Systems builder.” The final phase keeps “Exploring what comes next.” Its copy puts continuous learning and human responsibility first: AI assists research, prototyping, debugging, and iteration; Jehu remains responsible for design, decisions, implementation, and validation. Product names remain in the existing supporting toolkit.

Primary CTA remains “Explore selected work.” Secondary CTA is “Continue the journey ↓,” with a minimum 44px touch height. Student and Professional copy are unchanged.

## Project proof

`ProjectProof` uses a semantic definition list with Problem, My role, and Delivered fields. Content comes from canonical project data, the supplied résumé, and the existing screenshot/walkthrough notes. No percentages are used.

| Project | Problem | Individual contribution | Delivered capability |
| --- | --- | --- | --- |
| FPA | Manual leave processing and document routing | PHP/JavaScript features, MySQL leave-credit logic, responsive UI, UAT | Digital approval routing, leave records, CSC Form No. 6 |
| iBaryo | Manual inventory/resource records | Inventory/resource modules, MySQL design, intranet deployment | Centralized availability, transactions, resource movements |
| AutoPet | Remote feeding and monitoring | Mobile web and ESP32 prototype development, stakeholder feedback | Feeder/hydration prototype, schedules, monitoring, camera/voice |
| White House Café | Ordering, queues, ticket tracking | Front/back end, authentication, ticket logging, testing, feedback | Web ordering, numbered tickets, preparation-to-collection flow |

Proof is readable without hover or animation. At 1024px and above it uses three columns; smaller layouts stack. Existing project media remains lazy-loaded. FPA’s overview is a sibling before its original stage, so its stage measurement and phase formulas are unchanged.

## Navigation and professional actions

Desktop shows Home, Work, Experience, Capabilities, About, Recognition, and Contact. Tablet uses seven compact icons. Mobile keeps the existing downscroll minimization and five-target footprint; More exposes Capabilities, About, and Recognition. Targets remain at least 44px.

IntersectionObserver active-section detection and requestAnimationFrame progress remain. Capabilities and Recognition now map to themselves. More supports Escape, focus-out, and outside closing, with an active indicator for its current section. Anchors clear the floating header.

GitHub is canonical profile data and appears before LinkedIn in Contact, and in the footer. External actions retain new-tab labels and noopener/noreferrer. Email, View résumé, and descriptive Download PDF actions remain.

About now explicitly includes networking and a philosophy grounded in the projects’ operational workflows. AutoPet and FPA certificate previews link to their respective chapters; other certificates have no forced project mapping.

## SEO and social sharing

Canonical origin: https://jehuvgalvez.vercel.app/.

Metadata includes a default title/template, description, canonical URL, Open Graph website fields, and Twitter large-image fields. The static sharing card uses the supplied formal portrait and existing dark/lime visual identity. It does not add runtime image generation.

Person JSON-LD includes verified full name, public email, URL, descriptive professional title, GitHub, and LinkedIn. It excludes phone and street address. Serialization escapes less-than characters.

Build-generated robots and sitemap output were inspected. Sitemap includes only the existing homepage; chapters remain anchors.

## Validation and accessibility

Passed:

- `npm run typecheck`
- `npm run lint`
- `npm run test`: 11/11 regression tests
- `npm run build`
- `git diff --check`

Browser inspection at 375, 430, 768, 1024, and 1440px found no horizontal overflow. Proof columns, navigation targets, mobile More keyboard operation, Recognition highlighting, Contact actions, and Resume View/Download were checked. Existing iBaryo/Café dialogs load original images, close with Escape/button, and preserve focus restoration. The redacted Resource workflow image remains in use. Certificate selection and the contextual FPA link were checked.

Hero start/frame display and navbar wide/compact states were checked. FPA teaser, muted/inline attributes, workflow phase, document phase, and supplied images were checked. Browser console reported no application errors.

New static proof has no animation. Existing reduced-motion CSS/guards were preserved and reviewed; the browser session’s OS motion preference was not changed.

## Preservation and performance

Confirmed unchanged: Hero image-sequence mechanics, canvas/preload/frame count/timing, Hero Journey mechanics, FPA timeline/video/stage mechanics, Experience horizontal timeline, Capabilities interaction, certificate viewer behavior, and floating Resume interaction.

No project facts were invented, no unsupported metrics were added, and no new animation library or dependency was installed. The only new media is the 38.9KB social card; proof adds server-rendered HTML, not client state. Screenshot loading remains deferred.

Stopped at this milestone. Changes are local; no commit, push, or deployment was performed.
