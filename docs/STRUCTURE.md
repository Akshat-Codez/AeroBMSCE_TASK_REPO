# AeroBMSCE — Architecture & File Structure

This document provides a comprehensive mapping of every file in the AeroBMSCE codebase, detailing its purpose, dependencies, load order, instructions for adding new sections, and a debugging guide.

---

## 1. Directory Tree & Purpose Map

```
/
├── index.html                    Page skeleton: head, navbar, section wrappers with headings, footer
├── README.md                     Repository overview and local development instructions
├── images/                       Original production assets and optimized WebP images
├── docs/
│   └── STRUCTURE.md              Architecture map, module load order, and troubleshooting table
│
│ NOTE: _backup/, motion.css, motion.js, journey.html, partners.html, partners.js,
│ renderPartners.js, partners.css, and all Lighthouse JSON reports were removed.
│
├── css/
│   ├── base.css                  Color tokens, CSS reset, typography, focus states, no-js fallback
│   ├── layout.css                Layout containers (.wrap), section headers, grid helpers, breakpoints
│   ├── components.css            Rectangular buttons, altimeter gauge, tabs, spec tables, form fields
│   ├── backgrounds.css           Pre-rendered grain, blueprint grid, topo contours, radar sweep
│   └── sections/
│       ├── navbar.css            Sticky glassmorphic navbar, notice bar, nav links
│       ├── hero.css              Hero typography, systems check readout, team photo showcase frame
│       ├── stats.css             Stats grid, counter cards, and telemetry labels
│       ├── about.css             Who We Are, Why It Matters, vision block
│       ├── what-we-do.css        Technical domains, core capabilities, and student impact
│       ├── fleet.css             Aircraft cards, blueprint slot specifications, spec tables
│       ├── achievements.css      Season milestones, podium honors, awards grid
│       ├── previous-events.css   Flight trials photo gallery with clip-path reveals
│       ├── contact.css           Contact Us, Community block, and enquiry clearance form
│       └── footer.css            Footer horizon line, CAD aircraft icon, copyright, back-to-top
│
└── js/
    ├── main.js                   Entry point: imports modules, executes them in strict safe order
    ├── config.js                 Global constants (INSTAGRAM_LINK, DEBUG, NAVBAR_HEIGHT)
    │
    ├── core/
    │   ├── dom.js                Lightweight DOM helpers: qs, qsa, create, on
    │   ├── device.js             Device capabilities: isTouch, isFinePointer, isLowEnd, prefersReducedMotion
    │   ├── scroll.js             Lenis smooth scroll (desktop fine-pointer only) + ScrollTrigger sync
    │   ├── lazy.js               lazyInit(selector, importFn): loads below-fold modules on viewport approach
    │   └── logger.js             safeInit(name, fn) wrapper and debug logger
    │
    ├── data/
    │   ├── index.js              Aggregates and exports CLUB_DATA master object and individual slices
    │   ├── stats.js              Verified numerical metrics and telemetry counters
    │   ├── about.js              Club history, lab location (Propel Lab-3), vision, and credibility
    │   ├── whatWeDo.js           Engineering domains and student development points
    │   ├── history.js            Season-by-season competition milestones (2018–2026)
    │   ├── fleet.js              Aircraft specs (wingspan, chord, mass, propulsion, phase)
    │   ├── achievements.js       Podium finishes, cash prizes, and technical awards
    │   ├── pastEvents.js         Previous flight trials and gallery imagery metadata
    │   ├── team.js               Specialized divisions (Yaksha, Blue Impulse, Phantoms, Vectors)
    │   └── faq.js                Frequently Asked Questions for recruitment and sponsorships
    │
    ├── render/
    │   ├── renderStats.js        Renders stats grid cards and counter target attributes
    │   ├── renderAbout.js        Renders club overview, history, and vision
    │   ├── renderWhatWeDo.js     Renders technical domains and impact highlights
    │   ├── renderFleet.js        Renders aircraft cards with .blueprint-slot and data attributes
    │   ├── renderAchievements.js Renders timeline milestone cards by season
    │   ├── renderPastEvents.js   Renders previous events gallery photos with responsive <picture>
    │   ├── renderFaq.js          Renders accessible FAQ accordion items
    │   └── renderFooter.js       Validates and populates footer copyright metadata
    │
    ├── animations/
    │   ├── heroReveal.js         Reveals hero headline, tagline, and CTA
    │   ├── sectionReveal.js      Batched ScrollTrigger reveals for headers, body blocks, gallery
    │   ├── counters.js           Scroll-triggered numeric counter animations
    │   ├── parallaxTilt.js       Cursor-aware 3D tilt on team photo and hero scroll parallax
    │   ├── backgrounds.js        Pauses off-screen CSS animations and suspends ticker on tab hide
    │   ├── navbarBehavior.js     Smart auto-hiding navbar on scroll via passive RAF
    │   ├── altimeter.js          Single GPU transform writes for altimeter gauge & progress bar
    │   └── systemsCheck.js       Terminal-style pre-flight systems check sequence
    │
    └── ui/
        ├── mobileMenu.js         Mobile drawer toggle with ARIA expanded and escape key handling
        ├── fleetFilter.js        Category filter for aircraft cards with ScrollTrigger refresh
        ├── yearFilter.js         Milestone timeline filter by season/year
        ├── faqAccordion.js       Accessible FAQ accordion toggle with keyboard support
        ├── activeSection.js      Zero-layout-read active nav highlighting via IntersectionObserver
        ├── backToTop.js          Smooth scroll for back-to-top button and internal anchor links
        ├── flyButton.js          Interactive takeoff flight animation for .fly-btn elements with smooth scroll
        └── clock.js              Live UTC flight telemetry HUD clock (HH:MM:SS UTC)

    New files (untracked / in-progress):

    ├── js/core/focusTrap.js      Keyboard focus trap (tab/shift+tab) for modal overlays; used by lightbox and command palette
    ├── js/core/modalLock.js      Pauses/resumes Lenis and freezes body scroll while a modal overlay is open
    └── js/features/
        └── flightPath/
            ├── pathGeometry.js   Pure geometry: builds cubic-bezier SVG path string + waypoints from HISTORY data
            ├── drawOnScroll.js   Animates stroke-dashoffset via GSAP ScrollTrigger scrub; exposes getDrawProgress()
            └── planeFollower.js  RAF tick: moves #fp-plane SVG icon along the drawn path using getPointAtLength
```

---

## 2. Module Load Order in `js/main.js`

Modules are executed in a deterministic order using `safeInit(name, fn)` to guarantee that an error in any one module never breaks the others:

1. **Core Systems (`safeInit`)**:
   - `initScrollEngine`: Profiles pointer device, enables Lenis on fine-pointer desktop, configures native touch scrolling, registers ScrollTrigger.
2. **Above-the-Fold Renderers (`safeInit`)**:
   - `initRenderStats`: Prepares counter cards.
   - `initRenderAbout`: Prepares overview text.
   - `initRenderWhatWeDo`: Prepares domain listings.
   - `initRenderFooter`: Prepares copyright metadata.
3. **Deferred Below-the-Fold Renderers (`lazyInit`)**:
   - `#fleet` ➔ `renderFleet.js`
   - `#achievements, #milestones` ➔ `renderAchievements.js`
   - `#previous-events, .gallery` ➔ `renderPastEvents.js`
   - `#faq` ➔ `renderFaq.js`
4. **Critical Above-the-Fold Animations (`safeInit`)**:
   - `initSystemsCheck`: Terminal readout.
   - `initHeroReveal`: Typography slide-ins.
   - `initParallaxTilt`: Mousemove 3D perspective tilt (desktop only).
5. **Scroll & Telemetry Animations (`safeInit`)**:
   - `initSectionReveal`: Header and block reveals.
   - `initCounters`: Number ticker increments.
   - `initBackgrounds`: IntersectionObserver pause for radar & topo.
   - `initNavbarBehavior`: Scroll-direction header show/hide.
   - `initAltimeter`: Progress bar scaleX & altimeter scaleY GPU writes.
6. **UI Controls & Interactivity (`safeInit`)**:
   - `initMobileMenu`: Navigation drawer.
   - `initActiveSection`: IntersectionObserver nav highlights.
   - `initBackToTop`: Anchor link smooth scrolling.
   - `initClock`: UTC HUD clock.
   - `initFleetFilter`: Aircraft category tab filtering.
   - `initYearFilter`: Milestone season filtering.
   - `initFaqAccordion`: FAQ panel accordion expansion.

---

## 3. How to Add a New Section

To add a new section (e.g., `#hangar` or `#simulator`) cleanly into this architecture:

1. **Data**: Add data objects in `js/data/<newSection>.js` and export through `js/data/index.js`.
2. **CSS**: Create `css/sections/<newSection>.css` using standard CSS variables from `css/base.css`.
3. **Renderer**: Create `js/render/render<NewSection>.js` exporting `initRender<NewSection>()`.
4. **HTML Skeleton**: In `index.html`, add `<section id="<newSection>" data-phase="<Phase>">` with `<div class="section-header">` and content container.
5. **Styles Link**: Add `<link rel="stylesheet" href="css/sections/<newSection>.css">` in `<head>`.
6. **Bootstrap in `js/main.js`**: Add `lazyInit('#<newSection>', () => import('./render/render<NewSection>.js'));`.

---

## 4. "Something Broke, Where Do I Look?" Troubleshooting Table

| Symptom / Failure | Primary File to Inspect | Secondary File |
| :--- | :--- | :--- |
| **Stat counters show 0 or don't animate** | `js/animations/counters.js` | `js/data/stats.js` |
| **Navbar doesn't hide on scroll or overlaps** | `js/animations/navbarBehavior.js` | `css/sections/navbar.css` |
| **Active nav link doesn't highlight correctly** | `js/ui/activeSection.js` | `index.html` (check `data-nav` & `id`) |
| **Smooth scrolling jittery or broken** | `js/core/scroll.js` | `js/ui/backToTop.js` |
| **Hero headline / subhead not appearing** | `js/animations/heroReveal.js` | `css/sections/hero.css` |
| **Altimeter gauge not updating or stuck** | `js/animations/altimeter.js` | `css/components.css` (`.altimeter`) |
| **Aircraft specs or blueprint slot broken** | `js/render/renderFleet.js` | `js/data/fleet.js` |
| **Milestone timeline missing years or cards** | `js/render/renderAchievements.js` | `js/data/history.js` |
| **Gallery images not loading or clipping** | `js/render/renderPastEvents.js` | `css/sections/previous-events.css` |
| **Mobile drawer menu won't open / close** | `js/ui/mobileMenu.js` | `css/sections/navbar.css` |
| **FAQ accordion won't toggle** | `js/ui/faqAccordion.js` | `js/render/renderFaq.js` |
| **Color or typography looks off** | `css/base.css` | `css/layout.css` |
| **Performance regression / dropped frames** | `js/core/device.js` | `js/animations/backgrounds.js` |
