import { useId } from "react";
import { arrowHead, type Point } from "../geometry";
import { InkDiagram } from "../InkDiagram";

/**
 * One simulated run, after the thesis deck: the inputs feed a conversation between
 * the simulated policyholder and the real EVA; after each turn the goal agent says
 * whether to go on. The run ends as a trace.
 */

const CY = 100; // the conversation's centre line
const USER: Point = [205, CY];
const EVA: Point = [345, CY];
const GOAL: Point = [275, 214];
const TRACE: Point = [492, CY];
const INPUTS = [
  { label: "goal", y: 68 },
  { label: "contract", y: CY },
  { label: "persona", y: 132 },
];

export function HarnessSimulation() {
  const id = useId();
  const tone = `${id}-tone`;

  return (
    <InkDiagram
      viewBox="0 0 560 256"
      label="One simulated run: a goal, a contract and a persona feed a conversation, repeated k times. The simulated policyholder asks, the real EVA answers. After each turn the goal agent decides whether to continue; when the goal is achieved or failed, the run ends as a trace."
      defs={
        <pattern id={tone} width={4} height={4} patternUnits="userSpaceOnUse">
          <circle cx={2} cy={2} r={1} fill="currentColor" />
        </pattern>
      }
      ink={
        <>
          {/* inputs, gathered into the conversation */}
          {INPUTS.map(({ label, y }) => (
            <path key={label} d={`M76 ${y} H104`} strokeWidth={1.6} />
          ))}
          <path d="M104 68 V132 M104 100 H126" strokeWidth={1.6} />
          <path d={arrowHead([128, CY], "right", 5)} strokeWidth={1.6} />

          {/* the conversation, played k times */}
          <rect x={142} y={22} width={290} height={132} className="stroke-muted" strokeWidth={1} />
          <rect x={136} y={28} width={290} height={132} className="stroke-muted" strokeWidth={1} />
          <rect x={130} y={34} width={290} height={132} fill="var(--paper)" strokeWidth={2.2} />

          <path d="M230 92 H318" strokeWidth={2.2} />
          <path d={arrowHead([321, 92], "right")} strokeWidth={2.2} />
          <path d="M232 108 H320" strokeWidth={2.2} />
          <path d={arrowHead([229, 108], "left")} strokeWidth={2.2} />
          <circle cx={USER[0]} cy={USER[1]} r={22} strokeWidth={2.6} fill={`url(#${tone})`} />
          <circle cx={EVA[0]} cy={EVA[1]} r={22} strokeWidth={3} fill="var(--paper)" />

          {/* the goal agent, consulted after every turn */}
          <path d="M266 166 V196" strokeWidth={1.8} />
          <path d={arrowHead([266, 199], "down", 5)} strokeWidth={1.8} />
          <path d="M284 198 V170" strokeWidth={1.8} />
          <path d={arrowHead([284, 167], "up", 5)} strokeWidth={1.8} />
          <circle cx={GOAL[0]} cy={GOAL[1]} r={16} strokeWidth={2.4} fill={`url(#${tone})`} />

          {/* end of the run */}
          <path d={`M291 ${GOAL[1]} H${TRACE[0]} V112`} strokeWidth={1.8} className="stroke-ball" />
          <path d={arrowHead([TRACE[0], 111], "up", 5)} strokeWidth={1.8} className="stroke-ball" />
          <path d={`M420 ${CY} H${TRACE[0] - 14}`} strokeWidth={1.8} className="stroke-ball" />
          <path d={arrowHead([TRACE[0] - 12, CY], "right", 5)} strokeWidth={1.8} className="stroke-ball" />
          <circle cx={TRACE[0]} cy={TRACE[1]} r={9} className="fill-ball stroke-ball" />
        </>
      }
      text={
        <>
          {INPUTS.map(({ label, y }) => (
            <text key={label} x={70} y={y + 4} textAnchor="end">
              {label}
            </text>
          ))}
          <text x={146} y={56}>
            conversation, turn after turn
          </text>
          <text x={442} y={30} className="fill-ball-text">
            × k runs
          </text>

          <text x={275} y={84} textAnchor="middle">
            question
          </text>
          <text x={275} y={126} textAnchor="middle">
            answer
          </text>
          <text x={USER[0]} y={138} textAnchor="middle" className="fill-ink font-bold">
            simulated
          </text>
          <text x={USER[0]} y={153} textAnchor="middle" className="fill-ink font-bold">
            policyholder
          </text>
          <text x={EVA[0]} y={CY + 5} textAnchor="middle" className="fill-ink font-bold">
            EVA
          </text>
          <text x={EVA[0]} y={140} textAnchor="middle">
            the real one
          </text>

          <text x={258} y={190} textAnchor="end">
            end of turn
          </text>
          <text x={292} y={190}>
            continue
          </text>
          <text x={GOAL[0]} y={248} textAnchor="middle" className="fill-ink font-bold">
            goal agent
          </text>

          <text x={392} y={206} textAnchor="middle" className="fill-ball-text">
            achieved · failed
          </text>
          <text x={506} y={CY + 4}>
            trace
          </text>
        </>
      }
    />
  );
}
