import { useId } from "react";
import { InkDiagram } from "../InkDiagram";

/** A gaze cone, modelled as a Gaussian: a hand box inside it counts as "looking at a hand". Redrawn, no video frame. */

const HEAD = { x: 46, y: 88 };

export function GazeCone() {
  const id = useId();
  const tone = `${id}-tone`;

  return (
    <InkDiagram
      viewBox="0 0 420 176"
      label="A person's gaze drawn as a cone that widens with distance, modelled as an elliptic Gaussian. A hand box inside the cone means the person is looking at a hand; a hand outside it does not count."
      defs={
        <pattern id={tone} width={4} height={4} patternUnits="userSpaceOnUse">
          <circle cx={2} cy={2} r={1} fill="currentColor" />
        </pattern>
      }
      ink={
        <>
          {/* the cone and its Gaussian levels */}
          <path d={`M${HEAD.x + 18} ${HEAD.y - 6} L360 34 M${HEAD.x + 18} ${HEAD.y + 6} L360 142`} strokeWidth={1.4} strokeDasharray="3 4" />
          <ellipse cx={230} cy={HEAD.y} rx={124} ry={44} strokeWidth={1} className="stroke-muted" />
          <ellipse cx={230} cy={HEAD.y} rx={84} ry={28} strokeWidth={1.2} className="stroke-muted" />
          <ellipse cx={230} cy={HEAD.y} rx={44} ry={14} strokeWidth={1.4} fill={`url(#${tone})`} />
          <path d={`M${HEAD.x + 20} ${HEAD.y} H260`} strokeWidth={2.2} />

          {/* hands */}
          <path d="M278 22 V68" strokeWidth={1.2} className="stroke-ball" />
          <rect x={262} y={70} width={32} height={30} strokeWidth={2.6} className="stroke-ball" fill="var(--paper)" />
          <rect x={150} y={134} width={30} height={26} strokeWidth={1.6} className="stroke-muted" fill="var(--paper)" />

          {/* the head, looking right */}
          <circle cx={HEAD.x} cy={HEAD.y} r={20} strokeWidth={2.8} fill={`url(#${tone})`} />
          <circle cx={HEAD.x + 9} cy={HEAD.y - 4} r={3} className="fill-ink" stroke="none" />
        </>
      }
      text={
        <>
          <text x={HEAD.x} y={HEAD.y + 40} textAnchor="middle" className="fill-ink font-bold">
            gaze
          </text>
          <text x={278} y={16} textAnchor="middle" className="fill-ball-text">
            hand: looked at
          </text>
          <text x={190} y={152}>
            hand: not looked at
          </text>
        </>
      }
    />
  );
}
