# Development tools in Technical Skills

Added ChatGPT, OpenAI Codex, Antigravity, Gemini, and Visual Studio Code based on Jehu's explicit request. Descriptions state tool usage without introducing project associations, responsibilities, or proficiency claims.

The existing Development row is now Development / AI Tools, with tools listed first. Desktop retains three rows; mobile retains two rows grouped by subject instead of an index cutoff. Longer development rows move at a slower cycle to maintain a comfortable pace. All 31 skills use the existing hover, pause/resume, keyboard-focus, reduced-motion, and no-JavaScript behavior. Monochrome OpenAI logos remain visible against the dark background on hover and focus.

## Files created

- `public/icons/technology/chatgpt.svg`
- `public/icons/technology/codex.svg`
- `public/icons/technology/antigravity.svg`
- `public/icons/technology/gemini.svg`
- `public/icons/technology/vscode.svg`
- `public/icons/technology/LICENSE-lobe-icons.txt`
- `docs/tools-skills.md`

## Files changed

- `README.md`
- `data/skills.ts`
- `components/sections/skills-marquees.tsx`
- `styles/intro.css`
- `public/icons/technology/README.md`

No files removed or dependencies added. Logo sources and licenses are recorded in `public/icons/technology/README.md`. Hero, Selected Work, and project data remain unchanged by this addition.

The keyboard-focus list now explicitly fits its row width so longer skill groups wrap within narrow screens.

## Validation

- `npm run lint`: passed with zero warnings.
- `npm run build`: passed, including TypeScript and static production output.
- Chromium at 1440px, 390px, and 320px: all 31 skills and the five local logos present; three desktop/two mobile rows; logo decoding, tool descriptions, dark-background contrast handling, moving tracks, hover pause, pause/resume, keyboard wrapping, and no horizontal overflow passed.
- Reduced motion and JavaScript disabled: all tools readable in static lists.
- No browser exceptions. Selected Work and project-data hashes match their previous versions. `git diff --check` passed.
