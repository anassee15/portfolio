import { useId } from "react";
import { InkDiagram } from "../InkDiagram";

/**
 * EVA's core, read left to right: the router fans out to the agents it needs
 * (here two of seven, in parallel), the synthesis agent fans them back in and answers.
 * Laid out so that no line crosses another or a label.
 */

type Point = [number, number];

const ROUTER: Point = [78, 80];
const SYNTHESIS: Point = [290, 80];
const AGENTS: { label: string; at: Point; called: boolean; labelAt: Point }[] = [
  { label: "coverage", at: [184, 32], called: true, labelAt: [184, 14] },
  { label: "therapists", at: [184, 80], called: true, labelAt: [184, 62] },
  { label: "+ 5 more", at: [184, 128], called: false, labelAt: [184, 156] },
];

/** A straight segment from a to b, trimmed so it starts and ends at the circles' edges. */
function link([x1, y1]: Point, [x2, y2]: Point, r1: number, r2: number) {
  const length = Math.hypot(x2 - x1, y2 - y1);
  const dx = (x2 - x1) / length;
  const dy = (y2 - y1) / length;
  return `M${x1 + dx * r1} ${y1 + dy * r1} L${x2 - dx * r2} ${y2 - dy * r2}`;
}

export function EvaBrain() {
  const id = useId();
  const tone = `${id}-tone`;

  return (
    <InkDiagram
      viewBox="0 0 380 166"
      label="EVA's core: a question goes to the router, which calls the agents it needs in parallel (here coverage and therapists, out of seven). The synthesis agent merges their work into one answer."
      defs={
        <pattern id={tone} width={4} height={4} patternUnits="userSpaceOnUse">
          <circle cx={2} cy={2} r={1} fill="currentColor" />
        </pattern>
      }
      ink={
        <>
          <path d="M6 80 H54" strokeWidth={2.6} />
          <path d="M46 73 L56 80 L46 87" strokeWidth={2.6} />

          {AGENTS.map(({ label, at, called }) => (
            <g key={label} strokeWidth={called ? 2.4 : 1.4} strokeDasharray={called ? undefined : "2 5"} className={called ? undefined : "stroke-muted"}>
              <path d={link(ROUTER, at, 24, 16)} />
              <path d={link(at, SYNTHESIS, 16, 22)} />
            </g>
          ))}

          <path d="M314 80 H352" strokeWidth={2.6} className="stroke-ball" />
          <circle cx={362} cy={80} r={9} className="fill-ball stroke-ball" />

          {AGENTS.map(({ label, at, called }) => (
            <circle
              key={label}
              cx={at[0]}
              cy={at[1]}
              r={12}
              strokeWidth={called ? 2.6 : 1.6}
              fill={called ? `url(#${tone})` : "var(--paper)"}
              className={called ? undefined : "stroke-muted"}
            />
          ))}
          <circle cx={ROUTER[0]} cy={ROUTER[1]} r={20} strokeWidth={3} fill={`url(#${tone})`} />
          <circle cx={SYNTHESIS[0]} cy={SYNTHESIS[1]} r={18} strokeWidth={3} fill={`url(#${tone})`} />
        </>
      }
      text={
        <>
          <text x={6} y={66}>
            question
          </text>
          <text x={ROUTER[0]} y={ROUTER[1] + 40} textAnchor="middle" className="fill-ink font-bold">
            router
          </text>
          {AGENTS.map(({ label, labelAt, called }) => (
            <text key={label} x={labelAt[0]} y={labelAt[1]} textAnchor="middle" className={called ? "fill-ink font-medium" : undefined}>
              {label}
            </text>
          ))}
          <text x={SYNTHESIS[0]} y={SYNTHESIS[1] + 38} textAnchor="middle" className="fill-ink font-bold">
            synthesis
          </text>
          <text x={362} y={110} textAnchor="middle">
            answer
          </text>
        </>
      }
    />
  );
}
