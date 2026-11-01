# Cramio Landing

Standalone public marketing website for Cramio. Plain HTML + CSS + vanilla JS — no build step.

- Public site: https://cramio.site
- Application: https://app.cramio.site
- Stack: vanilla HTML/CSS/JS (no framework, no bundler, no dependencies)
- Deployment: Cloudflare Pages (recommended)

## Development

No install or build needed — just serve the `public/` folder:

```bash
python -m http.server 8931 --directory public
```

(or any static file server pointed at `public/`).

## Deploy

Set the Cloudflare Pages build command to **none** and the output directory to **`public`**. The page renders fully without JavaScript; `public/main.js` is progressive enhancement only (scroll reveal, mobile-nav close, footer year).

Brand imagery (`banner.jpg`, `icon.png`) is served from this repo's `public/` folder.

## Distribution notes

The Android app's source repository is private, so its GitHub release assets are not publicly downloadable to anonymous visitors. Keep the public landing page's primary calls to action pointed at the web app until a public APK distribution target (for example, a dedicated public release repository or public object-storage URL) is configured and verified. Do not link visitors to private release assets.
