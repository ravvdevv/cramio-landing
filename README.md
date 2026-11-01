<div align="center">
  <img src="public/icon.png" width="120" alt="Cramio mascot icon" />
</div>

# Cramio

**Cram less. Learn more.**

![Cramio banner: notes, PDFs, AI study chat, quizzes, and flashcards in one focused study space](public/banner.jpg)

Cramio is the study space that keeps you reading instead of tab-hopping: notes, PDFs, AI study chat, quizzes, and flashcards in one focused place. Open it anywhere: native on Android, in the browser on iPhone and desktop.

This repository holds Cramio's public landing page: a single static site built with plain HTML, CSS, and vanilla JavaScript. No framework, no bundler, no dependencies, and no build step: `public/` is hand-authored source served as-is.

## Where to use Cramio

- **Web app (iPhone, iPad, desktop):** https://app.cramio.site, works in any browser, same account everywhere
- **Landing page and Android web-update host:** https://cramio.site
- **Android:** the native app is Android-first and ships through a restricted release channel, not an open download; that's by design

## How it's made

- Neo-brutalist design: thick ink borders, hard offset shadows, flat accent colors
- Fully functional without JavaScript; `public/main.js` only adds scroll reveal, mobile-nav polish, and the footer year
- Animation respects `prefers-reduced-motion`
