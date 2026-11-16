# Responsive Web Design // GROUP 2

A static, GitHub Pages-ready teaching site.

## Open locally
Open `index.html` in a browser. The playground loads `playground/lessons.json` with `fetch`, so run the folder through a local static server (for example VS Code Live Server) for the CodeMirror playground to load correctly. GitHub Pages serves it correctly.

## Files
- `index.html`: homepage with embedded mini-demo previews.
- `style.css`, `site.js`: shared visual theme and navigation.
- `viewport.html`, `gridview.html`, `mediaqueries.html`, `images.html`, `videos.html`, `frameworks.html`, `templates.html`: lesson pages.
- `*-example.html`: separate mini demos embedded on the homepage.
- `playground/`: CodeMirror editor, lesson starter code, and live iframe preview.
- `references.html`: learning references.
- `activity.html`: placeholder for the class quiz link.

## Customize
- Change the colors in `:root` at the top of `style.css`.
- Change navigation links in the header markup on each page.
- Edit lesson explanations in the relevant lesson HTML.
- Edit playground starter code and solution notes in `playground/lessons.json`.
- Edit the mini demos in the matching `*-example.html` files.
- Responsive breakpoints are near the bottom of `style.css` and in each demo's own CSS.
- The ambient background animation is controlled by `@keyframes ambient` and `@keyframes gridmove`.

## Notes
The CodeMirror editor and web fonts load from CDNs, so an internet connection is needed for those features. The preview runs in a sandboxed iframe. A full page navigation reload may restart CSS background animations; view-transition support varies by browser.
