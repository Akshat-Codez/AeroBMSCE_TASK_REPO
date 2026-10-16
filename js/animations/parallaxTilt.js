/**
 * js/animations/parallaxTilt.js — Cursor-aware 3D tilt and hero scroll parallax
 * Depends on: js/core/device.js, window.gsap, window.ScrollTrigger
 * Touches: #heroPhoto, .team-photo-frame, .hero-section
 */

import { prefersReducedMotion } from '../core/device.js';
import { qs } from '../core/dom.js';

export function initParallaxTilt() {
  if (prefersReducedMotion || !window.gsap) {
    return;
  }

  const { gsap } = window;

  // 1. Hero Photo Scroll Parallax
  const heroPhoto = qs('#heroPhoto');
  const heroSection = qs('.hero-section');
  if (heroPhoto && heroSection && window.ScrollTrigger) {
    gsap.to(heroPhoto, {
      yPercent: 8,
      ease: 'none',
      scrollTrigger: {
        trigger: heroSection,
        start: 'top top',
        end: 'bottom top',
        scrub: 1.0,
      },
    });
  }

  // 2. Cursor-Aware Subtle 3D Tilt on Photo Frame
  const photoFrame = qs('.team-photo-frame');
  if (photoFrame) {
    let cx = window.innerWidth / 2;
    let cy = window.innerHeight / 2;
    let targetRx = 0;
    let targetRy = 0;
    let tiltRaf = null;

    window.addEventListener('resize', () => {
      cx = window.innerWidth / 2;
      cy = window.innerHeight / 2;
    }, { passive: true });

    document.addEventListener('mousemove', (e) => {
      targetRx = ((e.clientY - cy) / cy) * 2;
      targetRy = ((e.clientX - cx) / cx) * -2;

      if (!tiltRaf) {
        tiltRaf = requestAnimationFrame(() => {
          gsap.to(photoFrame, {
            rotateX: targetRx,
            rotateY: targetRy,
            duration: 0.5,
            ease: 'power2.out',
            transformPerspective: 900,
            overwrite: 'auto',
          });
          tiltRaf = null;
        });
      }
    }, { passive: true });

    document.addEventListener('mouseleave', () => {
      gsap.to(photoFrame, {
        rotateX: 0,
        rotateY: 0,
        duration: 0.5,
        ease: 'power2.out',
        overwrite: 'auto',
      });
    }, { passive: true });
  }
}

export default initParallaxTilt;
