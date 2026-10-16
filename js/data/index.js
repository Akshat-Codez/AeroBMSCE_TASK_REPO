/**
 * js/data/index.js — Aggregated club data master export
 * Depends on: All js/data/*.js modules
 * Touches: CLUB_DATA
 */

import { STATS } from './stats.js';
import { ABOUT } from './about.js';
import { WHAT_WE_DO } from './whatWeDo.js';
import { HISTORY } from './history.js';
import { FLEET } from './fleet.js';
import { ACHIEVEMENTS } from './achievements.js';
import { PAST_EVENTS } from './pastEvents.js';
import { TEAM } from './team.js';
import { FAQ } from './faq.js';

export const CLUB_DATA = {
  stats: STATS,
  about: ABOUT,
  whatWeDo: WHAT_WE_DO,
  history: HISTORY,
  fleet: FLEET,
  achievements: ACHIEVEMENTS,
  pastEvents: PAST_EVENTS,
  team: TEAM,
  faq: FAQ,
};

export {
  STATS,
  ABOUT,
  WHAT_WE_DO,
  HISTORY,
  FLEET,
  ACHIEVEMENTS,
  PAST_EVENTS,
  TEAM,
  FAQ,
};

export default CLUB_DATA;
