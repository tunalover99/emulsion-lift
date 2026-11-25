# Emulsion Lift site

Static site (GitHub Pages, `main` branch root). Everything lives in `index.html`; `surfaces/` holds object photos used as lift surfaces, `examples/` holds the example works shown when a visitor has none. Korean and English strings are in the `I18N` object in `index.html`.

## Design source: Figma "park project"

The site's design is being made in Figma by the owner. When asked to redesign or "follow the Figma design", read it from there instead of guessing.

- File: https://www.figma.com/design/cITmjM7w3nF8YhLsruPwnz/park-project
- File key: `cITmjM7w3nF8YhLsruPwnz`
- Page for the website: `web` (node `27:9`). Other pages (`Research`, `presentation`, `Design`) are background material.
- Read the current state with the Figma connector each time (`get_metadata` on `27:9`, then `get_design_context` / `get_screenshot` on frames); the file is still in progress, so the notes below may be out of date.

Notes from the `web` page (as of 2026-11-25):
- Desktop frames are 1920×1080 ("MacBook Pro 16"").
- Top navigation is three symbols: `?` (left), `+` (center), `@` (right).
  - `?` = explanation of emulsion lift (about page).
  - `+` = make a new emulsion lift (studio).
  - `@` = log in and keep an archive, plus an artist statement.
- "MacBook Pro 16" - 1": a large single image centered under the nav (likely the landing view).
- "MacBook Pro 16" - 2/3/6": works laid out as a loose cluster of images with left/right chevrons and an "add image" control.
- "MacBook Pro 16" - 4": about page, text column on the left, an image on the right with a caption.
- Section "reference" holds mood images; section "기능 구분" holds the owner's notes on what each page does.

A login + archive (`@`) needs a backend; the current site keeps works only in the visitor's browser (IndexedDB). Raise this with the owner before building it.
