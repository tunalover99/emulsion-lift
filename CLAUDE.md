# Emulsion Lift site

Static site (GitHub Pages, `main` branch root). Everything lives in `index.html`; `surfaces/` holds object photos used as lift surfaces, `examples/` holds the example works shown when a visitor has none. Korean and English strings are in the `I18N` object in `index.html`.

## Design source: Figma "park project"

The site's design is being made in Figma by the owner. When asked to redesign or "follow the Figma design", read it from there instead of guessing.

- File: https://www.figma.com/design/cITmjM7w3nF8YhLsruPwnz/park-project
- File key: `cITmjM7w3nF8YhLsruPwnz`
- Page for the website: `web` (node `27:9`). Other pages (`Research`, `presentation`, `Design`) are background material.
- Read the current state with the Figma connector each time (`get_metadata` on `27:9`, then `get_design_context` / `get_screenshot` on frames); the file is still in progress, so the notes below may be out of date.

Notes from the `web` page (as of 2026-11-25; the site was rebuilt to this layout that day):
- Desktop frames are 1920×1080 ("MacBook Pro 16"").
- Top navigation is three symbols: `?` (left), `+` (center), `@` (right).
  - `?` = explanation of emulsion lift (about page).
  - `+` = make a new emulsion lift (studio).
  - `@` = log in and keep an archive, plus an artist statement.
- Frames: `메인페이지` (works with small grey captions), `? 눌렀을 때 나오는 페이지` (text left, picture + caption right), `+눌렀을 때 나오는 첫번째 이미지` (print centred, "+ change image", chevron bottom right), `+누르고 두번째 단계` (metal tray top view), `옮길 곳_돌` / `옮길 곳_종이` / `옮길 곳_나무` (objects scattered on white, chevrons left/right, "+ add image").
- Type (owner's choice, overrides Figma's Inter): Latin in Arial Regular, Hangul in Pretendard Regular (self-hosted in `fonts/`), all text weight 400.
- Tokens: white ground; nav ? 36px / + 45px / @ 27px, inactive #bababa, active #514f4f (+ is black); about text Inter Bold 16px #6d6d6d.
- Figma asset URLs download with curl once `www.figma.com` is allowed; the `emulsion-lift` cloud environment allows it.
- The owner wants photographic material, not drawn illustration: tray, papers and sample photos come from the Figma file (`surfaces/tray.jpg`, `surfaces/paper/*.webp`, `photos/*.jpg`). Do not replace them with procedural drawings.
- Section "reference" holds mood images; section "기능 구분" holds the owner's notes on what each page does.

A login + archive (`@`) needs a backend; the current site keeps works only in the visitor's browser (IndexedDB). Raise this with the owner before building it.
