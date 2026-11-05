import { InkDiagram } from "../InkDiagram";

/** A parallel reduction: each step halves the values still in play, until one is left. */

const LEAVES = 8;
const GAP = 40;
const X0 = 30;
const LEVEL_Y = [140, 98, 56, 18];
const SIZE = 20;

export function ReductionTree() {
  const levels = LEVEL_Y.map((y, level) => {
    const count = LEAVES >> level;
    const span = GAP * (1 << level);
    return Array.from({ length: count }, (_, i) => ({ x: X0 + span * i + (span - GAP) / 2, y }));
  });

  return (
    <InkDiagram
      viewBox="0 0 420 196"
      label="A parallel reduction: eight threads each hold a value, and every step combines them two by two, so one value is left after three steps. The online softmax uses it to keep a running maximum and sum in one pass."
      ink={
        <>
          {levels.slice(1).map((nodes, level) =>
            nodes.map(({ x, y }, i) =>
              [levels[level][2 * i], levels[level][2 * i + 1]].map((child) => (
                <path key={`${level}-${i}-${child.x}`} d={`M${child.x} ${child.y - SIZE / 2} L${x} ${y + SIZE / 2}`} strokeWidth={1.6} className={level === 2 ? "stroke-ball" : undefined} />
              )),
            ),
          )}
          {levels.map((nodes, level) =>
            nodes.map(({ x, y }) => (
              <rect
                key={`${level}-${x}`}
                x={x - SIZE / 2}
                y={y - SIZE / 2}
                width={SIZE}
                height={SIZE}
                strokeWidth={level === 3 ? 2.8 : 2}
                fill={level === 3 ? "var(--ball)" : "var(--paper)"}
                className={level === 3 ? "stroke-ball" : undefined}
              />
            )),
          )}
        </>
      }
      text={
        <>
          <text x={X0 - 14} y={LEVEL_Y[0] + 36}>
            one value per thread
          </text>
          <text x={levels[3][0].x + 22} y={LEVEL_Y[3] + 5} className="fill-ball-text">
            max and sum, in one pass
          </text>
          <text x={320} y={LEVEL_Y[1] + 5}>
            log₂ n steps
          </text>
        </>
      }
    />
  );
}
