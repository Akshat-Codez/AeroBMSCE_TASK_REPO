/**
 * js/data/fleet.js — Aircraft and UAV fleet specifications
 * Real repo aircraft data only: Yaksha Micro-24 and Phantom Autonomous Hexacopter
 * Depends on: None
 * Touches: #fleet, .blueprint-slot, data-span-mm, data-chord-mm, data-mass-g
 */

export const FLEET = [
  {
    id: 'yaksha-micro-24',
    name: 'Yaksha Micro-24',
    category: 'Fixed-wing',
    image: 'images/photo2.jpg',
    webp: 'images/photo2.webp',
    imageAlt: 'AeroBMSCE fixed-wing aircraft displayed by the team',
    secondaryImage: 'images/cad-plane.png',
    secondaryWebp: 'images/cad-plane.webp',
    secondaryAlt: 'Yaksha Micro-24 CAD render',
    wingspan: '1200 mm',
    motor: 'Brushless Electric Outrunner',
    weight: '1850 g',
    role: 'SAE Aero Design Micro Class',
    spanMm: 1200,
    chordMm: 220,
    massG: 1850,
    phase: 'Cruise',
    propulsion: 'Brushless Electric Outrunner',
    designation: 'SAE Aero Design Micro Class',
    competition: 'SAE International Aero Design West (Texas, USA)',
    status: 'Flight Proven',
  },
  {
    id: 'phantom-hex',
    name: 'Phantom Autonomous Hexacopter',
    category: 'Multirotor',
    image: 'images/photo7.jpg',
    webp: 'images/photo7.webp',
    imageAlt: 'AeroBMSCE hexacopter displayed at the SAE Aerothon 2025',
    wingspan: '850 mm',
    motor: '6x High-Efficiency Brushless',
    weight: '2400 g',
    role: 'Autonomous Survey & Delivery UAV',
    spanMm: 850,
    chordMm: 0,
    massG: 2400,
    phase: 'Takeoff',
    propulsion: '6x High-Efficiency Brushless',
    designation: 'Autonomous Survey & Delivery UAV',
    competition: 'SAE Drone Design Challenge & SAE Aerothon',
    status: 'Active',
  },
];

export default FLEET;
