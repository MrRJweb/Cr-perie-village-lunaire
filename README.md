# Music, Records &amp; Luthiers

A modern, single-page marketing site for a fictional record shop, instrument
store, and luthier's workbench — styled as warm, grainy **vintage analog**
(cream + burnt-umber palette, 70s-inspired display type).

Everything is placeholder content and hand-drawn SVG art, so the site runs with
**no build step, no dependencies, and no external images** — just open it.

## Run it

Open `index.html` in any modern browser, or serve the folder:

```bash
python3 -m http.server 8000   # then visit http://localhost:8000
```

## Files

| File | Purpose |
| --- | --- |
| `index.html` | Markup and inline SVG illustrations (hero scene, workbench, map, cover art) |
| `styles.css` | Design system, responsive layout, and the CSS-generated retro album covers |
| `script.js`  | Sticky/scrolled navbar, mobile menu, scroll-reveal, active-link spy, demo booking form, today's-hours highlight |

## Sections

Sticky navbar · Hero · Records (8 covers, genre tags) · Instruments · Luthier &amp;
Repairs (with a front-end-only booking form) · Events · Testimonials · Hours &amp;
Location · Footer.

## Notes

- Fully responsive down to small phones; hamburger menu under 880px.
- Honors `prefers-reduced-motion` (disables animation and scroll-reveal).
- Fonts (Fraunces + Karla) load from Google Fonts; the page degrades gracefully
  to system serif/sans if offline.
- The "Book a Repair" form is a front-end demo — it validates and shows a
  confirmation, but sends nothing anywhere.
