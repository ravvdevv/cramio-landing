# AGENTS.md

Standalone single-page marketing site for Cramio in **vanilla HTML/CSS/JS**. Deploy root is `public/`: `public/index.html` + `public/styles.css` + `public/main.js`. No build step, no dependencies, no tests, no CI.

## Commands

- No install, no build. Verify by serving: `python -m http.server 8931 --directory public` and loading http://localhost:8931.
- Before calling work done: all local asset references in `public/index.html` (`/banner.jpg`, `/icon.png`, favicons) must return HTTP 200, and the page must render correctly without JavaScript.

## Deployment (Cloudflare Pages)

- Build command: **none**. Output directory: **`public`**.
- Never generate or treat `public/` as build output — it's hand-authored source.

## Hard constraints (from README + CHANGELOG)

- The APK is publicly downloadable from the latest GitHub Release. All site CTAs use the stable `/download` route, implemented as a Cloudflare Pages static redirect in `public/_redirects` to the exact APK asset URL. The Android Release workflow in `ravvdevv/Cramio` updates this redirect after publishing each release. Never hardcode release versions or asset filenames in page content.
- Hero/banner and brand/mascot images live in this repo's `public/` folder and are referenced with root-absolute paths (`/banner.jpg`, `/icon.png`).

## Site conventions

- `public/index.html` contains canonical, robots, OG, and Twitter metadata with **hardcoded absolute URLs** (`https://cramio.site/…`). If the hero image or domain changes, update those meta tags too — filenames must match metadata exactly.
- Design direction is deliberately neo-brutalist (thick ink borders, hard offset shadows, flat solid accent colors — **no pastel tints or blend modes on photography**).
- Scroll-reveal animations come from an IntersectionObserver in `public/main.js` (`.reveal` / `.is-visible` classes). `main.js` is progressive enhancement only — the page must render fully without it, and motion must keep its `prefers-reduced-motion` branch (both in JS and CSS).
- Mobile navigation is a native `<details>` element; the JS only closes it after a link is followed.
- Fonts are loaded from Google Fonts via the `@import` at the top of `styles.css` (DM Sans, Manrope) with a system-font fallback.
- If you add or rename files in `public/`, update every reference (HTML `src`/`href`, `index.html` meta tags, `site.webmanifest`).
