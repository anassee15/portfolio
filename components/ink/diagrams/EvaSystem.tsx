import { useId } from "react";
import { Annotation, InkDiagram } from "../InkDiagram";

/**
 * EVA drawn as a coach's playbook. The router (point guard) can pass to any of the
 * seven specialised agents; for this question it calls two of them, in parallel.
 * They pass to the synthesis agent, who scores the answer.
 */

type Point = [number, number];

const ROUTER: Point = [240, 292];
const SYNTHESIS: Point = [290, 104];
const RIM: Point = [240, 50];

// Agents spread around the three-point line, left to right. Generic roles only.
type Side = "left" | "right" | "below";
const AGENTS: { role: string; at: Point; label: Side; called?: boolean }[] = [
  { role: "self-service", at: [60, 80], label: "below" },
  { role: "coverage", at: [96, 150], label: "left", called: true },
  { role: "info", at: [160, 200], label: "left" },
  { role: "contact", at: [240, 216], label: "left" },
  { role: "therapists", at: [320, 200], label: "right", called: true },
  { role: "premiums", at: [384, 150], label: "right" },
  { role: "offers", at: [420, 80], label: "below" },
];

const LABEL_OFFSET: Record<Side, { dx: number; dy: number; anchor: "start" | "middle" | "end" }> = {
  left: { dx: -19, dy: 4, anchor: "end" },
  right: { dx: 19, dy: 4, anchor: "start" },
  below: { dx: 0, dy: 31, anchor: "middle" },
};

const NODE = 13;

/** Endpoints of a pass from a to b, stopping `gap` short of each player. */
function trim([x1, y1]: Point, [x2, y2]: Point, gap = NODE + 6): [Point, Point] {
  const length = Math.hypot(x2 - x1, y2 - y1);
  const dx = (x2 - x1) / length;
  const dy = (y2 - y1) / length;
  return [
    [x1 + dx * gap, y1 + dy * gap],
    [x2 - dx * gap, y2 - dy * gap],
  ];
}

function Pass({ from, to, arrow }: { from: Point; to: Point; arrow: string }) {
  const [[x1, y1], [x2, y2]] = trim(from, to);
  return <path d={`M${x1} ${y1} L${x2} ${y2}`} strokeWidth={2.4} strokeDasharray="7 6" markerEnd={`url(#${arrow})`} />;
}

export function EvaSystem() {
  const id = useId();
  const tone = `${id}-tone`;
  const arrow = `${id}-arrow`;

  return (
    <InkDiagram
      viewBox="0 0 480 350"
      label="EVA drawn as a basketball play. A question reaches the router, the point guard. It can pass to seven specialised agents; here it calls coverage and therapists in parallel. Both pass to the synthesis agent, who scores the answer."
      defs={
        <>
          <pattern id={tone} width={4} height={4} patternUnits="userSpaceOnUse">
            <circle cx={2} cy={2} r={1} fill="currentColor" />
          </pattern>
          <marker id={arrow} viewBox="0 0 10 10" refX={7} refY={5} markerWidth={7} markerHeight={7} orient="auto">
            <path d="M0 0 L10 5 L0 10 z" fill="currentColor" stroke="none" />
          </marker>
        </>
      }
      ink={
        <>
          {/* The half court, light, as on a coach's board. */}
          <g className="stroke-rule" strokeWidth={1.6}>
            <path d="M16 24 H464" />
            <path d="M185 24 V174 H295 V24" />
            <circle cx={240} cy={174} r={55} />
            <path d="M40 24 V80 A210 210 0 0 0 440 80 V24" />
          </g>
          <path d="M215 36 H265" strokeWidth={2.6} />
          <circle cx={RIM[0]} cy={RIM[1]} r={9} strokeWidth={2.4} className="stroke-ball" />

          {/* The question comes in. */}
          <path d="M24 342 Q 120 336 214 306" strokeWidth={3} markerEnd={`url(#${arrow})`} />

          {/* Passes the router could make, then the ones it makes. */}
          <g className="stroke-muted" strokeWidth={1.3} strokeDasharray="1 6">
            {AGENTS.filter((a) => !a.called).map(({ role, at }) => {
              const [[x1, y1], [x2, y2]] = trim(ROUTER, at);
              return <path key={role} d={`M${x1} ${y1} L${x2} ${y2}`} />;
            })}
          </g>
          {AGENTS.filter((a) => a.called).map(({ role, at }) => (
            <g key={role}>
              <Pass from={ROUTER} to={at} arrow={arrow} />
              <Pass from={at} to={SYNTHESIS} arrow={arrow} />
            </g>
          ))}

          {/* The shot. */}
          <path d="M282 88 Q 268 46 252 50" strokeWidth={2.6} className="stroke-ball" />

          {/* Players: agents not called stay hollow. */}
          {AGENTS.map(({ role, at, called }) => (
            <circle
              key={role}
              cx={at[0]}
              cy={at[1]}
              r={NODE}
              strokeWidth={called ? 2.6 : 1.8}
              fill={called ? `url(#${tone})` : "var(--paper)"}
              className={called ? undefined : "stroke-muted"}
            />
          ))}
          <circle cx={ROUTER[0]} cy={ROUTER[1]} r={20} strokeWidth={3} fill={`url(#${tone})`} />
          <circle cx={SYNTHESIS[0]} cy={SYNTHESIS[1]} r={17} strokeWidth={3} fill={`url(#${tone})`} />
        </>
      }
      text={
        <>
          {AGENTS.map(({ role, at, label, called }) => {
            const { dx, dy, anchor } = LABEL_OFFSET[label];
            return (
              <text
                key={role}
                x={at[0] + dx}
                y={at[1] + dy}
                textAnchor={anchor}
                className={called ? "fill-ink font-medium" : undefined}
              >
                {role}
              </text>
            );
          })}
          <text x={ROUTER[0] + 30} y={ROUTER[1] + 2} className="fill-ink text-[15px] font-bold">
            router
          </text>
          <text x={ROUTER[0] + 30} y={ROUTER[1] + 18} className="fill-muted font-mono text-[10px]">
            point guard
          </text>
          <text x={SYNTHESIS[0] + 26} y={SYNTHESIS[1] + 2} className="fill-ink text-[15px] font-bold">
            synthesis
          </text>
          <text x={SYNTHESIS[0] + 26} y={SYNTHESIS[1] + 18} className="fill-muted font-mono text-[10px]">
            center
          </text>
          <text x={RIM[0] - 18} y={RIM[1] + 5} textAnchor="end" className="fill-ink font-medium">
            answer
          </text>
          <text x={24} y={330}>
            question
          </text>
          <Annotation x={344} y={258}>
            0 to n agents,
          </Annotation>
          <Annotation x={344} y={278}>
            in parallel
          </Annotation>
        </>
      }
    />
  );
}
