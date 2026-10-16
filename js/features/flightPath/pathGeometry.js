/**
 * js/features/flightPath/pathGeometry.js — SVG path and waypoint geometry from HISTORY data
 * Purpose: Pure geometry logic — no DOM reads, just returns path data for drawOnScroll.js
 * Dependencies: js/data/history.js
 * Touches: #timeline (read only)
 */

/**
 * Generate an SVG cubic bezier path string through vertical waypoints.
 * Returns a smooth S-curve that weaves left/right for visual interest.
 * @param {Array<{year:number, season:string, items:Array}>} milestones - sorted oldest→newest
 * @param {number} svgWidth
 * @param {number} svgHeight
 * @returns {{ pathD: string, waypoints: Array<{x:number, y:number, season:string, label:string}> }}
 */
export function buildPathGeometry(milestones, svgWidth, svgHeight) {
  const count = milestones.length;
  if (count < 2) return { pathD: '', waypoints: [] };

  const margin  = { top: 60, bottom: 60, left: svgWidth * 0.2, right: svgWidth * 0.2 };
  const usableH = svgHeight - margin.top - margin.bottom;

  // Waypoints snake left-right for organic flight path feel
  const waypoints = milestones.map((m, i) => {
    const progress = i / (count - 1);
    const y = margin.top + progress * usableH;
    // Alternate sides: even→right-of-center, odd→left-of-center
    const xOffset = i % 2 === 0
      ? svgWidth * 0.62
      : svgWidth * 0.38;
    return {
      x: xOffset,
      y,
      season: m.season,
      label: m.items[0]?.title ?? m.season,
      year:  m.year,
    };
  });

  // Build smooth cubic bezier path through waypoints
  let d = `M ${waypoints[0].x} ${waypoints[0].y}`;
  for (let i = 1; i < waypoints.length; i++) {
    const prev = waypoints[i - 1];
    const cur  = waypoints[i];
    const midY = (prev.y + cur.y) / 2;
    // Control points go straight down from each point for a smooth organic curve
    d += ` C ${prev.x} ${midY}, ${cur.x} ${midY}, ${cur.x} ${cur.y}`;
  }

  return { pathD: d, waypoints };
}


