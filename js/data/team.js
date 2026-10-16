/**
 * js/data/team.js — Sub-team roster, engineering divisions, and leadership
 * Depends on: js/config.js (INSTAGRAM_LINK, EMAIL_CONTACT)
 * Touches: #team, #contact, #join
 */

import { INSTAGRAM_LINK, EMAIL_CONTACT } from '../config.js';

export const TEAM = {
  divisions: [
    {
      name: 'Team Yaksha',
      focus: 'International Heavy-Lift Competitions (SAE Aero Design West)',
      established: 2012,
    },
    {
      name: 'Team Blue Impulse',
      focus: 'Aeromodelling, Airframe Fabrication & Flight Dynamics',
      established: 2014,
    },
    {
      name: 'Team Flying Phantoms',
      focus: 'Autonomous UAV Systems, Computer Vision & Multirotors',
      established: 2018,
    },
    {
      name: 'Team Vectors',
      focus: 'High-Speed FPV Drone Racing & Rapid Response Systems',
      established: 2022,
    },
  ],
  leadership: {
    contactPerson: 'Rajesh',
    role: 'Team Lead',
    email: EMAIL_CONTACT,
    instagram: INSTAGRAM_LINK,
    location: 'Propel Lab-3, BMS College of Engineering, Bangalore',
  },
};

export default TEAM;
