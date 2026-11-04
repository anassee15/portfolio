import { InkDiagram } from "../InkDiagram";

const AGENTS = [
  [64, 74],
  [118, 52],
  [172, 38],
  [224, 38],
  [270, 52],
  [322, 74],
  [344, 132],
];

/** EVA as a play: the question comes in, the router passes to the agents, the answer scores. */
export function EvaSystem() {
  return (
    <InkDiagram
      viewBox="0 0 380 250"
      label="EVA drawn as a basketball play: a question goes to a router, which can call seven specialised agents, whose work becomes the answer."
      ink={
        <>
          <path d="M16 236 Q 100 220 166 180" strokeWidth={3.4} />
          <circle cx={188} cy={168} r={20} strokeWidth={3} />
          {/* Possible passes from the router to each agent. */}
          <g strokeWidth={1.8} strokeDasharray="1 7">
            {AGENTS.map(([x, y]) => (
              <path key={x} d={`M188 168 L ${x} ${y}`} />
            ))}
          </g>
          <g strokeWidth={2.4} className="fill-paper">
            {AGENTS.map(([x, y]) => (
              <circle key={x} cx={x} cy={y} r={11} />
            ))}
          </g>
          <path d="M322 88 Q 352 168 300 206" strokeWidth={2.2} />
          <circle cx={290} cy={218} r={13} strokeWidth={2.6} className="fill-ball" />
        </>
      }
      text={
        <>
          <text x={10} y={226}>question</text>
          <text x={212} y={196}>router</text>
          <text x={128} y={16}>7 specialised agents</text>
          <text x={312} y={238}>answer</text>
        </>
      }
    />
  );
}
