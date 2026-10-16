/**
 * js/main.js — Central Application Entry Point & Module Orchestrator
 *
 * Sequence of Execution:
 *  1. Critical Core Systems (Device Profiling, Scroll Engine, Lenis/ScrollTrigger sync)
 *  2. Instant Above-the-fold Animations (Systems Check, Hero Reveal)
 *  3. Deferred Below-the-fold Modules (Loaded on viewport approach via core/lazy.js)
 *  4. Idle-time Telemetry & UI Interactions (Altimeter, Navbar, ActiveNav, Back-to-Top)
 */

import { safeInit } from './core/logger.js';
import { initScrollEngine } from './core/scroll.js';
import { lazyInit } from './core/lazy.js';

// Above-the-fold Critical Animations (instant paint)
import { initSystemsCheck } from './animations/systemsCheck.js';
import { initHeroReveal } from './animations/heroReveal.js';
import { initFlyButtons } from './ui/flyButton.js';

function bootstrapApp() {
  // 1. Critical Core Systems
  safeInit('ScrollEngine', initScrollEngine);

  // 2. Instant Above-the-fold Animations & UI Interactions
  safeInit('SystemsCheck', initSystemsCheck);
  safeInit('HeroReveal', initHeroReveal);
  safeInit('FlyButtons', initFlyButtons);

  // 3. Below-the-fold Modules (Strictly lazy-loaded via core/lazy.js dynamic imports)
  lazyInit('#stats', async () => {
    const [render, counters, backgrounds] = await Promise.all([
      import('./render/renderStats.js'),
      import('./animations/counters.js'),
      import('./animations/backgrounds.js'),
    ]);
    safeInit('RenderStats', render.default);
    safeInit('Counters', counters.default);
    safeInit('Backgrounds', backgrounds.default);
    return { init: () => {} };
  });

  lazyInit('#about', async () => {
    const render = await import('./render/renderAbout.js');
    safeInit('RenderAbout', render.default);
    return { init: () => {} };
  });

  lazyInit('#what-we-do', async () => {
    const render = await import('./render/renderWhatWeDo.js');
    safeInit('RenderWhatWeDo', render.default);
    return { init: () => {} };
  });

  lazyInit('#fleet', async () => {
    const [render, filter] = await Promise.all([
      import('./render/renderFleet.js'),
      import('./ui/fleetFilter.js'),
    ]);
    safeInit('RenderFleet', render.default);
    safeInit('FleetFilter', filter.default);
    return { init: () => {} };
  });

  lazyInit('#achievements, #milestones', async () => {
    const [render, filter, flightPath] = await Promise.all([
      import('./render/renderAchievements.js'),
      import('./ui/yearFilter.js'),
      import('./render/renderFlightPath.js'),
    ]);
    safeInit('RenderAchievements', render.default);
    safeInit('YearFilter', filter.default);
    safeInit('FlightPath', flightPath.default);
    return { init: () => {} };
  });

  lazyInit('#previous-events', async () => {
    const render = await import('./render/renderPastEvents.js');
    safeInit('RenderPastEvents', render.default);
    return { init: () => {} };
  });

  lazyInit('#footer', async () => {
    const render = await import('./render/renderFooter.js');
    safeInit('RenderFooter', render.default);
    return { init: () => {} };
  });

  // 4. Idle-time Telemetry & Global UI Interactions
  const loadDeferredSystems = async () => {
    const [
      sectionReveal,
      navbarBehavior,
      altimeter,
      parallaxTilt,
      mobileMenu,
      activeSection,
      backToTop,
      clock,
    ] = await Promise.all([
      import('./animations/sectionReveal.js'),
      import('./animations/navbarBehavior.js'),
      import('./animations/altimeter.js'),
      import('./animations/parallaxTilt.js'),
      import('./ui/mobileMenu.js'),
      import('./ui/activeSection.js'),
      import('./ui/backToTop.js'),
      import('./ui/clock.js'),
    ]);

    safeInit('SectionReveal', sectionReveal.default);
    safeInit('NavbarBehavior', navbarBehavior.default);
    safeInit('Altimeter', altimeter.default);
    safeInit('ParallaxTilt', parallaxTilt.default);
    safeInit('MobileMenu', mobileMenu.default);
    safeInit('ActiveSection', activeSection.default);
    safeInit('BackToTop', backToTop.default);
    safeInit('Clock', clock.default);
  };

  if ('requestIdleCallback' in window) {
    window.requestIdleCallback(() => {
      loadDeferredSystems();
    }, { timeout: 800 });
  } else {
    setTimeout(loadDeferredSystems, 50);
  }
}

// Execute bootstrap when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', bootstrapApp);
} else {
  bootstrapApp();
}
