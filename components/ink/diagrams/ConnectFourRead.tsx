import { useId } from "react";
import { arrowHead } from "../geometry";
import { InkDiagram } from "../InkDiagram";

/** The webcam reads the board (Hough circles, HSV colours), then alpha-beta picks a column. */

const COLS = 7;
const ROWS = 6;
const CELL = 18;
const BX = 64;
const BY = 44;
// Tokens on the board, by [column, row from the bottom, player].
const TOKENS: [number, number, 0 | 1][] = [
  [2, 0, 0], [3, 0, 1], [3, 1, 0], [4, 0, 0], [4, 1, 1], [2, 1, 1], [5, 0, 1],
];
const NEXT = 4;

export function ConnectFourRead() {
  const id = useId();
  const tone = `${id}-tone`;
  const cx = (c: number) => BX + c * CELL + CELL / 2;
  const cy = (r: number) => BY + (ROWS - 1 - r) * CELL + CELL / 2;
  const tree = { root: [330, 46], kids: [276, 330, 384], kidY: 96, leafY: 140 } as const;

  return (
    <InkDiagram
      viewBox="0 0 420 180"
      label="A webcam reads a real Connect Four board: Hough circles find the holes, HSV colour masks tell the tokens apart. An alpha-beta search, five moves deep, then picks the column to play."
      defs={
        <pattern id={tone} width={4} height={4} patternUnits="userSpaceOnUse">
          <circle cx={2} cy={2} r={1} fill="currentColor" />
        </pattern>
      }
      ink={
        <>
          {/* the webcam */}
          <rect x={8} y={84} width={30} height={22} strokeWidth={2.4} fill="var(--paper)" />
          <circle cx={23} cy={95} r={6} strokeWidth={1.6} />
          <path d="M40 95 L60 95" strokeWidth={1.2} strokeDasharray="2 4" className="stroke-muted" />

          {/* the board */}
          <rect x={BX} y={BY} width={COLS * CELL} height={ROWS * CELL} strokeWidth={2.6} fill="var(--paper)" />
          {Array.from({ length: COLS * ROWS }, (_, i) => (
            <circle key={i} cx={cx(i % COLS)} cy={cy(Math.floor(i / COLS))} r={6} strokeWidth={1} />
          ))}
          {TOKENS.map(([c, r, player]) => (
            <circle key={`${c},${r}`} cx={cx(c)} cy={cy(r)} r={6.5} strokeWidth={1.4} fill={player ? "currentColor" : `url(#${tone})`} />
          ))}
          <circle cx={cx(NEXT)} cy={BY - 14} r={6.5} className="fill-ball stroke-ball" />
          <path d={arrowHead([cx(NEXT), BY - 2], "down", 4)} strokeWidth={1.6} className="stroke-ball" />

          <path d={`M${BX + COLS * CELL + 8} 95 H244`} strokeWidth={2.2} />
          <path d={arrowHead([247, 95], "right")} strokeWidth={2.2} />

          {/* alpha-beta */}
          {tree.kids.map((x) => (
            <path key={x} d={`M${tree.root[0]} ${tree.root[1] + 9} L${x} ${tree.kidY - 8}`} strokeWidth={x === 384 ? 2.4 : 1.4} className={x === 384 ? "stroke-ball" : undefined} />
          ))}
          {tree.kids.flatMap((x) =>
            [-12, 12].map((dx) => (
              <path
                key={`${x}${dx}`}
                d={`M${x} ${tree.kidY + 8} L${x + dx} ${tree.leafY - 6}`}
                strokeWidth={x === 384 && dx < 0 ? 2.4 : 1.2}
                className={x === 384 && dx < 0 ? "stroke-ball" : x === 276 ? "stroke-muted" : undefined}
                strokeDasharray={x === 276 ? "2 4" : undefined}
              />
            )),
          )}
          <circle cx={tree.root[0]} cy={tree.root[1]} r={9} strokeWidth={2.4} fill={`url(#${tone})`} />
          {tree.kids.map((x) => (
            <circle key={x} cx={x} cy={tree.kidY} r={8} strokeWidth={2} fill="var(--paper)" />
          ))}
          {tree.kids.flatMap((x) =>
            [-12, 12].map((dx) => (
              <circle key={`${x}${dx}`} cx={x + dx} cy={tree.leafY} r={5} strokeWidth={1.6} fill={x === 384 && dx < 0 ? "var(--ball)" : "var(--paper)"} className={x === 384 && dx < 0 ? "stroke-ball" : undefined} />
            )),
          )}
        </>
      }
      text={
        <>
          <text x={23} y={124} textAnchor="middle">
            webcam
          </text>
          <text x={BX} y={BY + ROWS * CELL + 22} className="fill-ink font-bold">
            Hough + HSV
          </text>
          <text x={cx(NEXT) + 12} y={BY - 9} className="fill-ball-text">
            next move
          </text>
          <text x={tree.root[0]} y={24} textAnchor="middle" className="fill-ink font-bold">
            alpha-beta
          </text>
          <text x={tree.root[0]} y={168} textAnchor="middle">
            five moves deep
          </text>
        </>
      }
    />
  );
}
