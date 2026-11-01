# Cramio

**Cram less. Know more.**

Cramio is the study space that keeps you reading instead of tab-hopping — your notes, PDFs, AI study chat, quizzes, and flashcards in one focused place. Open it anywhere: native on Android, in the browser on iPhone and desktop.

- **Web app (iPhone, iPad, desktop):** https://app.cramio.site
- **Public site:** https://cramio.site

## This repo

The landing page for Cramio. Plain HTML + CSS + vanilla JS.

- No framework, no bundler, no dependencies
- No build step. `public/` is the deliverable — hand-authored source, deploy it as-is
- `public/main.js` is progressive enhancement only (scroll reveal, mobile-nav close, footer year); the page renders fully without JavaScript
- Design: neo-brutalist — thick ink borders, hard offset shadows, flat accent colors. Motion respects `prefers-reduced-motion`

## Development

Serve the `public/` folder with any static file server:

```bash
python -m http.server 8931 --directory public
```

Then open http://localhost:8931.

## Deploy

Cloudflare Pages — build command: **none**, output directory: **`public`**. Production deploys from `main`.

Brand imagery (`banner.jpg`, `icon.png`) is served from this repo's `public/` folder. If a filename changes, update every reference: HTML `src`/`href`, the meta tags (filenames must match metadata exactly), and `site.webmanifest`.

## Platform notes

- Every call to action points to the **web app** (`https://app.cramio.site`) — it works in any browser
- Cramio is **Android-first**: the Android app ships through a restricted release channel. Its source repo is private, so release APK URLs return 404 to anonymous visitors — never put a public APK link on the landing page until a verified public distribution target exists

## History

Landed here from the old React/Vite version of the site (see `CHANGELOG.md` for the whole ride).
