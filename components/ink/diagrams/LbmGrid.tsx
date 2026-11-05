import { useId } from "react";
import { arrowHead } from "../geometry";
import { InkDiagram } from "../InkDiagram";

/**
 * The lattice, split two ways: MPI cuts it into vertical slabs that trade a halo,
 * CUDA gives each cell a thread. On the right, one D2Q9 cell: only the three
 * directions pointing right (or left) ever cross a slab edge.
 */

const CELL = 16;
const COLS = 3; // per slab
const ROWS = 6;
const SLABS = 4;
const GAP = 10;
const X0 = 10;
const Y0 = 40;
const SLAB_W = COLS * CELL;
const slabX = (s: number) => X0 + s * (SLAB_W + GAP);

const STAR = { x: 344, y: 88, r: 30 };
const DIRECTIONS = [-1, 0, 1].flatMap((dx) => [-1, 0, 1].map((dy) => [dx, dy] as const)).filter(([dx, dy]) => dx || dy);

export function LbmGrid() {
  const id = useId();
  const tone = `${id}-tone`;

  return (
    <InkDiagram
      viewBox="0 0 420 186"
      label="The lattice split two ways. MPI cuts it into vertical slabs, one per rank, which exchange a halo of 3 of the 9 directions. CUDA gives each cell its own thread, and a warp reads one row. On the right, one D2Q9 cell with its 9 directions; the 3 pointing right are the ones that cross a slab edge."
      defs={
        <pattern id={tone} width={4} height={4} patternUnits="userSpaceOnUse">
          <circle cx={2} cy={2} r={1} fill="currentColor" />
        </pattern>
      }
      ink={
        <>
          {Array.from({ length: SLABS }, (_, s) => {
            const x = slabX(s);
            return (
              <g key={s}>
                {/* the row one warp reads */}
                <rect x={x} y={Y0 + 2 * CELL} width={SLAB_W} height={CELL} fill={`url(#${tone})`} stroke="none" />
                <path
                  d={[
                    ...Array.from({ length: COLS - 1 }, (_, c) => `M${x + (c + 1) * CELL} ${Y0} V${Y0 + ROWS * CELL}`),
                    ...Array.from({ length: ROWS - 1 }, (_, r) => `M${x} ${Y0 + (r + 1) * CELL} H${x + SLAB_W}`),
                  ].join(" ")}
                  strokeWidth={0.9}
                />
                <rect x={x} y={Y0} width={SLAB_W} height={ROWS * CELL} strokeWidth={2.4} />
              </g>
            );
          })}

          {/* the halo, traded across each cut */}
          {Array.from({ length: SLABS - 1 }, (_, s) => {
            const mid = slabX(s) + SLAB_W + GAP / 2;
            return (
              <g key={s} className="stroke-ball" strokeWidth={1.8}>
                <path d={`M${mid} ${Y0 + 8} V${Y0 + ROWS * CELL - 8}`} strokeDasharray="3 3" />
              </g>
            );
          })}

          {/* one D2Q9 cell */}
          <rect x={STAR.x - 12} y={STAR.y - 12} width={24} height={24} strokeWidth={1} className="stroke-muted" />
          {DIRECTIONS.map(([dx, dy]) => {
            const length = dx && dy ? STAR.r * 0.85 : STAR.r;
            const norm = Math.hypot(dx, dy);
            const tip: [number, number] = [STAR.x + (dx / norm) * length, STAR.y + (dy / norm) * length];
            return (
              <path
                key={`${dx},${dy}`}
                d={`M${STAR.x} ${STAR.y} L${tip[0]} ${tip[1]}`}
                strokeWidth={dx === 1 ? 2.4 : 1.6}
                className={dx === 1 ? "stroke-ball" : undefined}
              />
            );
          })}
          {DIRECTIONS.filter(([dx]) => dx === 1).map(([dx, dy]) => {
            const length = dy ? STAR.r * 0.85 : STAR.r;
            const norm = Math.hypot(dx, dy);
            const tip: [number, number] = [STAR.x + (dx / norm) * length, STAR.y + (dy / norm) * length];
            return dy ? (
              <circle key={dy} cx={tip[0]} cy={tip[1]} r={2.6} className="fill-ball stroke-ball" />
            ) : (
              <path key={dy} d={arrowHead(tip, "right", 5)} strokeWidth={2.4} className="stroke-ball" />
            );
          })}
          <circle cx={STAR.x} cy={STAR.y} r={4} className="fill-ink" stroke="none" />
        </>
      }
      text={
        <>
          <text x={X0} y={26} className="fill-ink font-bold">
            MPI: a slab per rank
          </text>
          <text x={X0} y={Y0 + ROWS * CELL + 20} className="fill-ball-text">
            halo: 3 of 9 directions
          </text>
          <text x={X0} y={Y0 + ROWS * CELL + 38}>
            CUDA: a thread per cell, a warp per row
          </text>
          <text x={STAR.x} y={26} textAnchor="middle" className="fill-ink font-bold">
            one cell
          </text>
          <text x={STAR.x} y={Y0 + ROWS * CELL + 20} textAnchor="middle">
            9 directions
          </text>
          <text x={STAR.x} y={Y0 + ROWS * CELL + 38} textAnchor="middle" className="fill-ball-text">
            3 cross an edge
          </text>
        </>
      }
    />
  );
}
