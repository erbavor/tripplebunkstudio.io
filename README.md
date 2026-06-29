# Tripple Bunk Studios — Website

Marketing site for **Tripple Bunk Studios** and its two games, **Lord of the Halo**
and **Re in AAA Video Game**. Static HTML/CSS/JS — no build step — designed to be
served from **GitHub Pages** behind a **Cloudflare** custom domain.

## Structure

```
.
├── index.html              # Studio landing page (the "Studio" tab)
├── lord-of-the-halo.html   # Lord of the Halo (the game's tab)
├── re-in-aaa.html          # Re in AAA Video Game (the game's tab)
├── 404.html                # Custom not-found page
├── CNAME                   # Custom domain for GitHub Pages → tripplebunkstudios.com
├── .nojekyll               # Tell Pages to serve files as-is (no Jekyll processing)
├── robots.txt, sitemap.xml
├── favicon.svg
└── assets/
    ├── css/   base.css (shared) · studio.css · loth.css · re.css
    ├── js/    main.js (shared) · loth.js
    ├── fonts/ Cinzel.ttf · Jost.ttf            (shared with the actual game UI)
    ├── vendor/rpg-awesome/                     (fantasy icon font, from the game)
    └── img/   loth/ (SVG crest) · re/ (real in-game screenshots) · studio/
```

### Theming
Every page loads `base.css` first (reset + nav + footer + design tokens), then a
page theme that overrides the `--token` values, so the shared nav/footer recolour
automatically:

| Page                 | Theme class    | Accent        |
|----------------------|----------------|---------------|
| Studio landing       | `.theme-studio`| violet `#8067ff` |
| Lord of the Halo     | `.theme-loth`  | gold `#c8a951`   |
| Re in AAA Video Game | `.theme-re`    | ember `#c9762f`  |

The "separate tab per game" is delivered as the persistent top-nav: **Studio ·
Lord of the Halo · Re in AAA Video Game**.

## Local preview

```bash
cd tripplebunkstudios-website
python3 -m http.server 8080
# open http://localhost:8080
```

## Deploy: GitHub Pages + Cloudflare

1. **Create the repo and push** (the site must be at the repo root):
   ```bash
   git init && git add -A && git commit -m "Initial site"
   git branch -M main
   git remote add origin git@github.com:<you>/<repo>.git
   git push -u origin main
   ```
2. **Enable Pages:** GitHub repo → *Settings → Pages* → Source = *Deploy from a
   branch* → Branch = `main` / `/ (root)` → Save.
3. **Custom domain:** the `CNAME` file already sets `tripplebunkstudios.com`. In
   *Settings → Pages → Custom domain* confirm it shows `tripplebunkstudios.com`.
4. **Cloudflare DNS** (for the apex domain) — in your Cloudflare zone add:
   - `A   @  185.199.108.153`
   - `A   @  185.199.109.153`
   - `A   @  185.199.110.153`
   - `A   @  185.199.111.153`
   - `CNAME  www  <you>.github.io`
   Set these records to **DNS only (grey cloud)** first so GitHub can issue its TLS
   cert; once *Enforce HTTPS* is available in Pages settings, you may re-enable the
   orange proxy. Use Cloudflare SSL mode **Full**.
5. Wait for DNS + the Pages HTTPS cert, then tick **Enforce HTTPS**.

## Assets & content notes

- **Re in AAA Video Game** uses real screenshots exported from the UE5 project
  (`keyart`, `street`, derived detail crops, splash). Replace any in `assets/img/re/`
  with newer captures using the same filenames — no markup changes needed.
- **Lord of the Halo** has no rendered marketing art yet, so its visuals are
  CSS/SVG built in the game's own gold aesthetic, using the game's `rpg-awesome`
  icon font and `Cinzel`/`Jost` fonts. Drop real screenshots into
  `assets/img/loth/` and wire them into the hero / map tiles when available.
- Copy was written to avoid any third-party franchise IP. Map names and feature
  text are original.

## TODO before launch
- Replace placeholder social links (`href="#"`) in the footers with real URLs.
- Point the **Wishlist** buttons at the real Steam pages when live.
- Add an Open Graph share image (1200×630) per page for nicer link unfurls.
