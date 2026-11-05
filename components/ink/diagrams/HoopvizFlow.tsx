import { useId } from "react";
import { arrowHead, type Point } from "../geometry";
import { InkDiagram } from "../InkDiagram";

/** From play-by-play rows to the three views of the site: the map through time, the court, the dashboards. */

const PYTHON: Point = [128, 100];
const VIEW_X = 196;
const VIEW_W = 72;

/** Scattered dots of a map; one team in orange. */
const MAP_DOTS: Point[] = [
  [206, 34], [220, 46], [234, 28], [248, 40], [258, 52], [214, 56], [242, 58], [226, 36],
];

export function HoopvizFlow() {
  const id = useId();
  const tone = `${id}-tone`;
  const lines = [44, 30, 50, 38, 46, 26, 42, 34];

  return (
    <InkDiagram
      viewBox="0 0 420 210"
      label="From play-by-play rows, 6.1 million shots, processed in Python, to the three views of the site: a map of teams and players moved through time with a slider, an interactive court, and team and player dashboards."
      defs={
        <pattern id={tone} width={4} height={4} patternUnits="userSpaceOnUse">
          <circle cx={2} cy={2} r={1} fill="currentColor" />
        </pattern>
      }
      ink={
        <>
          {/* play-by-play rows */}
          {lines.map((w, i) => (
            <path key={i} d={`M12 ${66 + i * 9} H${12 + w}`} strokeWidth={1.6} />
          ))}
          <path d={`M70 ${PYTHON[1]} H102`} strokeWidth={2.4} />
          <path d={arrowHead([105, PYTHON[1]], "right")} strokeWidth={2.4} />

          {/* fan out to the views */}
          {[40, 110, 176].map((y) => (
            <g key={y} strokeWidth={1.8}>
              <path d={`M146 ${PYTHON[1]} C168 ${PYTHON[1]} 166 ${y} ${VIEW_X - 8} ${y}`} />
              <path d={arrowHead([VIEW_X - 5, y], "right", 5)} />
            </g>
          ))}

          {/* the map, and its time slider */}
          <rect x={VIEW_X} y={18} width={VIEW_W} height={46} strokeWidth={2.2} fill="var(--paper)" />
          {MAP_DOTS.map(([x, y], i) => (
            <circle key={i} cx={x} cy={y} r={i === 3 ? 4 : 2.6} className={i === 3 ? "fill-ball stroke-ball" : "fill-ink"} strokeWidth={1} />
          ))}
          <path d={`M${VIEW_X} 74 H${VIEW_X + VIEW_W}`} strokeWidth={1.6} />
          <circle cx={VIEW_X + 50} cy={74} r={5} className="fill-ball stroke-ball" />

          {/* the court */}
          <rect x={VIEW_X} y={90} width={VIEW_W} height={42} strokeWidth={2.2} fill="var(--paper)" />
          <rect x={VIEW_X + 26} y={90} width={20} height={18} strokeWidth={1.2} />
          <path d={`M${VIEW_X + 8} 90 V100 A28 28 0 0 0 ${VIEW_X + VIEW_W - 8} 100 V90`} strokeWidth={1.2} />
          <rect x={VIEW_X + 48} y={106} width={20} height={22} fill={`url(#${tone})`} stroke="none" />

          {/* a dashboard radar */}
          <path d={hexagon([VIEW_X + VIEW_W / 2, 176], 22)} strokeWidth={1.6} />
          <path d={hexagon([VIEW_X + VIEW_W / 2, 176], 22, [0.9, 0.5, 0.75, 0.4, 0.8, 0.6])} strokeWidth={2} fill={`url(#${tone})`} />

          <circle cx={PYTHON[0]} cy={PYTHON[1]} r={18} strokeWidth={2.8} fill={`url(#${tone})`} />
        </>
      }
      text={
        <>
          <text x={12} y={50} className="fill-ink font-bold">
            play-by-play
          </text>
          <text x={12} y={152}>
            6.1M shots
          </text>
          <text x={PYTHON[0]} y={134} textAnchor="middle" className="fill-ink font-bold">
            Python
          </text>
          <text x={VIEW_X + VIEW_W + 12} y={38} className="fill-ink font-bold">
            the map
          </text>
          <text x={VIEW_X + VIEW_W + 12} y={54}>
            teams, players
          </text>
          <text x={VIEW_X + VIEW_W + 12} y={78} className="fill-ball-text">
            through time
          </text>
          <text x={VIEW_X + VIEW_W + 12} y={114} className="fill-ink font-bold">
            the court
          </text>
          <text x={VIEW_X + VIEW_W + 12} y={180} className="fill-ink font-bold">
            dashboards
          </text>
        </>
      }
    />
  );
}

/** A hexagon around `center`; `scale` shrinks each corner, for a radar's data polygon. */
function hexagon([cx, cy]: Point, r: number, scale = [1, 1, 1, 1, 1, 1]) {
  return (
    scale
      .map((k, i) => {
        const angle = (Math.PI / 3) * i - Math.PI / 2;
        return `${i ? "L" : "M"}${cx + Math.cos(angle) * r * k} ${cy + Math.sin(angle) * r * k}`;
      })
      .join(" ") + " Z"
  );
}
