# AeroBMSCE — Web Platform

The official competitive aerospace, aeromodelling, and unmanned systems innovation portal for **AeroBMSCE**, operating from Propel Lab-3, BMS College of Engineering, Bangalore.

---

## Architecture Overview

This project is built using a clean, human-readable, multi-file modular architecture:
- **HTML**: Semantic skeleton with accessibility landmarks and hook IDs (`index.html`).
- **Styles**: Modular CSS split per section in `css/sections/`, with design tokens in `css/base.css`, layout in `css/layout.css`, and reusable rectangular components in `css/components.css`.
- **Scripts**: ES Modules orchestrated by `js/main.js` using `safeInit` and dynamic viewport-triggered lazy loading (`js/core/lazy.js`).
- **Telemetry & Motion**: GSAP 3 + ScrollTrigger with smooth desktop scrolling via Lenis. Mobile uses 100% native touch scrolling.
- **Documentation**: See `docs/STRUCTURE.md` for a complete file-by-file map, module execution order, and troubleshooting matrix.

---

## Local Development

Serve using any standard static file server:

```bash
# Python
python -m http.server 8080

# Node.js (npx)
npx serve .
```

Open `http://localhost:8080` in your browser.

---

## Key Design Constants

- **Palette**: `#0B0F19` base · `#131D31` surfaces · `#5FA8D3` steel-cyan accent · `#E5E9F0` text · `#94A3B8` muted. All CSS uses `var(--color-*)` tokens from `css/base.css`.
- **Typography**: Barlow Condensed (Headings), IBM Plex Sans (Body), IBM Plex Mono (Telemetry & Specs).
- **Page Sections (01–07)**: Hero · Who We Are · What We Do · Stats · Our Fleet · Milestones · Past Events · Contact & Community.
- **Extension Hooks**: `#home`, `#about`, `#what-we-do`, `#fleet`, `#calculator`, `#achievements`, `#previous-events`, `#contact`, `#timeline`, `.blueprint-slot`, `#jump-btn`, `#clearance-form`.
