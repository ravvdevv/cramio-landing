# Changelog

## 2026-11-01

### Keyword-first titles + perf pass (SEO course follow-up)

- `<title>`, `og:title`, and `twitter:title` swapped from the brand slogan (`Cramio | Cram less. Learn more.`) to the keyword-bearing variant `Cramio — Study App for Notes, Quizzes & Flashcards`. The slogan lives on in the H1 and JSON-LD `slogan`, so the brand voice stays on-page; the search/social titles now describe what the product is instead of only what it promises.
- Removed the render-blocking Google Fonts `@import` from the top of `styles.css`; fonts now load via `preconnect` hints + `<link rel="stylesheet">` in the HTML head.
- `icon.png` resized 1024×1024 → 512×512 (418 KB → 172 KB). Largest real display is the 290px Android mockup, so retina still covered; JSON-LD org-logo and nav/footer uses unaffected.
- Closing-card and footer mascot `<img>` now `loading="lazy"` + `decoding="async"`; the nav icon stays eager.
- HTTP 200 verified across `/`, `robots.txt`, `sitemap.xml`, `llms.txt`, `icon.png`, `banner.jpg`, favicon, webmanifest on the local dev server; JSON-LD still parses.

### SEO foundation

- New `public/robots.txt` (sitemap ref), `public/sitemap.xml`, and `public/llms.txt` (LLM-friendly site summary)
- JSON-LD structured data in `index.html` head: Organization, WebSite, WebApplication, and FAQPage mirroring the on-page FAQ verbatim

### Headline wording revert

- Headline is back to "Cram less. **Learn more.**" in all four spots (H1, `<title>`, `og:title`, `twitter:title`).

### Platform story "Android-first, web app for everyone"

- Rewrote the platform copy to match the real distribution: Cramio is Android-first (native app ships through a restricted release channel), and everyone else — iPhone, iPad, desktop — uses the web app in the browser. Wording threaded through four touchpoints: hero footnote ("BUILT ANDROID-FIRST · NOT ON ANDROID? THE WEB APP WORKS EVERYWHERE"), the Android section eyebrow ("BUILT ANDROID-FIRST"), the availability note (explicit web-app coverage for iPhone/iPad/desktop with the same account), and two FAQ answers ("Can I use Cramio on the web?" is now framed as the way in on non-Android devices; the Android download FAQ keeps the restricted-channel wording, no public APK claims).
- Android fact chips renamed to mirror the split: "Android app · restricted channel" and "Web app · every browser".
- Fixed a CSS selector leak that had been hiding the chip icons since the rewrite: `.android-facts span` (descendant) also matched the nested `<span class="icon">`, stamping a pill border/padding onto every icon glyph. Now `.android-facts > span` — check and sync icons render inside the chips again.
- Mobile (≤640px) hero banner no longer zooms: removed the forced `aspect-ratio: 4 / 3` crop (which cut ~25% of the 16/9 banner's width to stretch it); the banner now shows at its natural 16/9 — full mascot, both phone mockups, and title text visible, edge-to-edge with the ink frame.
- Verified via headless Chrome captures at 1440px and 500px plus native-resolution crops: chips render correctly, banner fits without zoom, server log shows all asset references returning HTTP 200.

## 2026-10-31

### Hook section + headline + hero polish

- Added a hook statement section between the tool-strip marquee and the features grid: eyebrow "REAL TALK", display line "Studying shouldn't feel like **drowning in tabs.**" with an amber `<mark>` accent (2.5px ink border, hard offset shadow, slight rotation), plus a supporting sub-line. Section is reduced-motion safe via the shared `.reveal` observer.
- Rewrote the headline from "Cram less. Learn more." to "Cram less. **Know more.**" everywhere it appears (H1, `<title>`, `og:title`, `twitter:title`; 4 replacements).
- Fixed the hero spark placement bug at the root: spark glyphs inside the hero grid resolved their absolute offsets against the grid's first cell instead of the padding box. `spark-two` now lives inside `.hero-copy` and `spark-one` inside `.hero-visual`, both anchored to their intended corners; `.hero-spark` got `pointer-events: none`.
- Improved the mobile (≤640px) hero banner: it now bleeds to 8px from the viewport edge (so the 6px hard shadow fits without clipping), the redundant decorative label row is hidden, the caption is larger in a tighter margin, and the "Learn actively" float card hugs the frame edge.
- Tightened the features grid's top padding to `calc(var(--section-y) * .6)` so the flow from hook → features keeps its rhythm; hook responsive paddings added for ≤960px and ≤640px.
- Verified with headless Chrome captures at 1440px and 500px: headline, sparks, hook, and mobile banner all render correctly without JavaScript.

### Design pass "pro max" (craft upgrade)

- Replaced all unicode glyph icon stand-ins with an authored inline SVG sprite (14 symbols, consistent 2px stroke, round caps/joins) — consistent across platforms and scalable, in line with the craft standard that icons must be drawn, not typed.
- Converted the tool strip into a true infinite CSS marquee (duplicated aria-hidden track, pauses on hover, disabled under `prefers-reduced-motion`).
- Removed decorative "01 / 05" feature counters (they carried no information); kept the workflow step numbers 01→03 since they mark a real sequence.
- Raised the type scale and spacing rhythm: H1 up to 90px cap, H2 up to 62px, section padding now fluid up to 156px, display tracking relaxed from -0.085em to -0.045em, hero body copy bumped to 15px.
- Added authored motion: spinning hero/closing spark accents, floating hero card and Android orbit dots, pulsing status dot, banner zoom-on-hover, arrow nudge on buttons/links — all behind a `prefers-reduced-motion` guard.
- Upgraded to responsive checks: roundified float-icon chip to a circle, buttons to 56px with spring press physics, feature cards lift with deeper offset shadows on hover.
- Added decorative hero spark glyphs and fixed two CSS slips (duplicate declaration, leftover selector).

### Vanilla rewrite (no framework, no build step)

- Rebuilt the entire landing page in plain HTML/CSS/JS — removed the React 19 + TypeScript + Vite toolchain, `node_modules`, and all build config. Deploy is now a static folder: Cloudflare Pages build command is "none", output directory `public`.
- Refreshed the design in a cleaner neo-brutalist direction: thick ink borders, hard offset shadows, flat solid accent colors, and dotted-paper hero texture.
- Removed the pastel/lavender tint and `mix-blend-mode` treatment that previously made the hero banner look washed out — the banner now shows at full color with a plain white frame.
- Rounded the brand icon in the closing call-to-action into a full circle.
- Converted Lucide icon SVGs to lightweight unicode glyphs (✎ ❝ ✦ ⚡ etc.) styled inline.
- Kept all SEO metadata (canonical, robots, OG, Twitter, favicons) 1:1 from the previous page, with hardcoded absolute `https://cramio.site/…` URLs.
- Replaced the missing `/home-ui.jpg` reference in the Android section with the official brand mascot (`/icon.png`) — the home-screen screenshot had not existed in `public/` since a previous imagery cleanup, so the old page shipped a broken image there.
- Page now renders fully without JavaScript; `main.js` is enhancement only (scroll reveal, mobile-nav close, footer year) and keeps its `prefers-reduced-motion` branch.
- Substituted the Android section FAQ imagery/wording check: the app stays described as available through a restricted release channel; all CTAs still point to the web app only.

### Verification

- Served `public/` locally and confirmed `index.html`, `styles.css`, `main.js`, `banner.jpg`, and `icon.png` all return HTTP 200.
- Visual screenshot review deferred — headless browser tooling is not set up on this machine.

### Landing page imagery cleanup

- Restricted photographic product imagery to the hero banner and the home UI screenshot.
- Removed secondary screen captures from feature and workflow sections; replaced them with lightweight Lucide icon treatments.
- Reused the official brand icon for identity and removed the extra Android screen image.

### Landing page refinement

- Refined the hero messaging and clarified that the web app is available now.
- Tightened typography, spacing, contrast, borders, and component depth while retaining the existing neo-brutalist direction.
- Improved desktop and mobile screenshot sizing, section rhythm, and hover behavior.
- Added a sticky header and retained the compact mobile navigation.


## 2026-10-31

### Improved public landing experience

- Added a compact mobile navigation menu so feature, Android, and FAQ sections remain discoverable on small screens.
- Added a concise FAQ covering web access, offline limitations, Android distribution availability, and core study workflows.
- Improved keyboard accessibility with a skip link, visible focus styles, and native disclosure controls.
- Added canonical URL, robots, Open Graph image metadata, Twitter summary metadata, and an asset-host preconnect.
- Repointed primary calls to action to the working public web app. Removed public-facing APK download links because the current Android release lives in a private repository and is not anonymously downloadable.
- Clarified Android availability rather than presenting a private release link as a public download.

### Verification

- `bun run build` passed (TypeScript and Vite production build).
- Confirmed the public web app host and mascot/icon assets respond successfully.
- Confirmed the current direct APK URL returns HTTP 404 to unauthenticated visitors; do not restore that link until a public distribution endpoint is available.
