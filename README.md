# Havenwest Closets & Storage Solutions — Official Website

Official source code repository for the **Havenwest Closets & Storage Solutions** website ([havenwestclosets.com](https://havenwestclosets.com/)). Havenwest designs and installs custom closets and storage — walk-ins, reach-ins, and mudrooms — for homes across Ontario.

Brand identity and site built by [York Region Web Studio](https://yorkregionwebstudio.com).

---

## Tech Stack & Infrastructure

- **Front-End:** HTML5, CSS3, vanilla JavaScript — no framework, no CMS
- **Hosting:** GitHub Pages (custom domain via `CNAME`)
- **Images:** WebP only, with `-sm` small variants for cards/thumbnails (see `assets/`)
- **Contact:** The homepage quote form delivers via FormSubmit (`formsubmit.co` AJAX endpoint in `script.js`) to `marksong0000@gmail.com`; the site also links `mailto:marksong0000@gmail.com` and `tel:+12895005666`

## Project Structure

```text
├── index.html            # Homepage
├── walk-ins.html         # Walk-in closets service page
├── reach-ins.html        # Reach-in closets service page
├── mudrooms.html         # Mudrooms service page
├── warranty.html         # Product warranty page
├── terms.html            # Website Terms of Use
├── privacy.html          # Privacy policy
├── accessibility.html    # Accessibility statement (AODA)
├── disclaimer.html       # Website disclaimer
├── 404.html              # Branded not-found page
├── styles.css            # Stylesheet source — edit this one
├── styles.min.css        # Minified production build — pages load this
├── script.js             # JavaScript source — edit this one
├── script.min.js         # Production build — pages load this
├── assets/               # WebP photos (full + -sm variants), logo
├── favicon-32.png        # Favicon
├── apple-touch-icon.png  # iOS home-screen icon
├── sitemap.xml           # XML sitemap (matches the page list above)
├── robots.txt            # Crawler rules
├── CNAME                 # Custom domain configuration (havenwestclosets.com)
└── README.md             # This file
```

## Making Changes

Edit the source files (`styles.css`, `script.js`), then regenerate the minified builds before pushing — every page loads the `.min` versions, so source edits alone won't show up live:

```bash
npx clean-css-cli -o styles.min.css styles.css
npx terser script.js -o script.min.js --compress --mangle
```

Pushing to `main` deploys automatically via GitHub Pages (live within a minute or two).

## Legal Pages

Separate pages, each with a distinct scope — don't merge them:

- **`warranty.html`** — the product warranty on closets/storage we build and install
- **`terms.html`** — website Terms of Use
- **`privacy.html`** — what data the site collects and what happens to it
- **`accessibility.html`** — accessibility statement and feedback/alternate formats (AODA)
- **`disclaimer.html`** — general-information disclaimer; pricing only by written quote
