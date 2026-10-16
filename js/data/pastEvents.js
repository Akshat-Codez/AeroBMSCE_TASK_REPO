/**
 * js/data/pastEvents.js — Gallery data for past competitions and flight trials
 * Depends on: None
 * Touches: #previous-events, .gallery, .gallery-item
 */

export const PAST_EVENTS = [
  {
    id: 'flight-trial-1',
    title: 'SAE International Aero Design Flight Trials',
    competition: 'SAE Aero Design West',
    image: 'images/photo5.jpg',
    webp: 'images/photo5.webp',
    srcsetWebp: 'images/photo5-480w.webp 480w, images/photo5-800w.webp 800w, images/photo5.webp 1178w',
    width: 1178,
    height: 833,
    alt: 'AeroBMSCE competition aircraft pre-flight preparation',
  },
  {
    id: 'flight-trial-2',
    title: 'National Aeromodelling Symposium & Airframe Inspection',
    competition: 'SAE Aerothon',
    image: 'images/photo6.jpg',
    webp: 'images/photo6.webp',
    srcsetWebp: 'images/photo6-480w.webp 480w, images/photo6-800w.webp 800w, images/photo6-1280w.webp 1280w',
    width: 1556,
    height: 1037,
    alt: 'AeroBMSCE flight crew assembling payload bay',
  },
  {
    id: 'flight-trial-3',
    title: 'Technical Presentation & Aerodynamic Evaluation',
    competition: 'SAEINDIA DDC',
    image: 'images/photo7.jpg',
    webp: 'images/photo7.webp',
    srcsetWebp: 'images/photo7-480w.webp 480w, images/photo7-800w.webp 800w, images/photo7.webp 900w',
    width: 900,
    height: 1200,
    alt: 'AeroBMSCE telemetry review and aircraft inspection',
  },
  {
    id: 'flight-trial-4',
    title: 'Autonomous UAV High-Speed Field Trials',
    competition: 'Autonomous Drone Design Challenge',
    image: 'images/photo8.jpg',
    webp: 'images/photo8.webp',
    srcsetWebp: 'images/photo8-480w.webp 480w, images/photo8-800w.webp 800w, images/photo8.webp 3000w',
    width: 3000,
    height: 2000,
    alt: 'AeroBMSCE autonomous UAV flight testing over terrain',
  },
];

export default PAST_EVENTS;
