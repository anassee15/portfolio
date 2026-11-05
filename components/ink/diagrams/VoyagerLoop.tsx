import { useId } from "react";
import { arrowHead, type Point } from "../geometry";
import { InkDiagram } from "../InkDiagram";

/**
 * Voyager's loop: the curriculum picks a task, the action agent writes a skill,
 * the skill runs in Minecraft, the critic checks it. In orange, what I added:
 * the bot's first-person view, fed to the curriculum and to the critic.
 */

const CURRICULUM: Point = [60, 110];
const ACTION: Point = [200, 110];
const CRITIC: Point = [200, 210];
const WORLD = { x: 310, y: 80, size: 60 };

export function VoyagerLoop() {
  const id = useId();
  const tone = `${id}-tone`;
  const { x, y, size } = WORLD;

  return (
    <InkDiagram
      viewBox="0 0 420 280"
      label="Voyager's loop: the curriculum picks the next task, the action agent writes a skill in JavaScript, which runs in Minecraft. The critic checks the new state and sends the next task, and skills that work go to a library the action agent reuses. My addition: the bot's first-person view, fed to the curriculum and to the critic."
      defs={
        <pattern id={tone} width={4} height={4} patternUnits="userSpaceOnUse">
          <circle cx={2} cy={2} r={1} fill="currentColor" />
        </pattern>
      }
      ink={
        <>
          {/* the loop */}
          <path d="M82 110 H174" strokeWidth={2.4} />
          <path d={arrowHead([177, 110], "right")} strokeWidth={2.4} />
          <path d={`M222 110 H${x - 6}`} strokeWidth={2.4} />
          <path d={arrowHead([x - 3, 110], "right")} strokeWidth={2.4} />
          <path d={`M330 ${y + size} V210 H224`} strokeWidth={2} />
          <path d={arrowHead([221, 210], "left")} strokeWidth={2} />
          <path d="M182 210 H76 V136" strokeWidth={2} />
          <path d={arrowHead([76, 133], "up")} strokeWidth={2} />

          {/* the skill library, above the action agent */}
          <rect x={174} y={20} width={52} height={30} className="stroke-muted" strokeWidth={1} />
          <rect x={170} y={24} width={52} height={30} fill="var(--paper)" strokeWidth={2} />
          <path d="M193 86 V62" strokeWidth={1.6} />
          <path d={arrowHead([193, 59], "up", 5)} strokeWidth={1.6} />
          <path d="M207 59 V83" strokeWidth={1.6} />
          <path d={arrowHead([207, 86], "down", 5)} strokeWidth={1.6} />

          {/* Minecraft: a block */}
          <rect x={x} y={y} width={size} height={size} strokeWidth={2.6} fill="var(--paper)" />
          <path d={`M${x + 20} ${y} V${y + size} M${x + 40} ${y} V${y + size} M${x} ${y + 20} H${x + size} M${x} ${y + 40} H${x + size}`} strokeWidth={1} />
          <rect x={x + 20} y={y + 20} width={20} height={20} fill={`url(#${tone})`} strokeWidth={1} />

          {/* my addition: the first-person view */}
          <path d={`M356 ${y + size} V250 H44 V126`} strokeWidth={2.2} className="stroke-ball" />
          <path d={arrowHead([44, 123], "up", 5)} strokeWidth={2.2} className="stroke-ball" />
          <path d="M200 250 V234" strokeWidth={2.2} className="stroke-ball" />
          <path d={arrowHead([200, 231], "up", 5)} strokeWidth={2.2} className="stroke-ball" />

          <circle cx={CURRICULUM[0]} cy={CURRICULUM[1]} r={20} strokeWidth={2.8} fill={`url(#${tone})`} />
          <circle cx={ACTION[0]} cy={ACTION[1]} r={20} strokeWidth={2.8} fill={`url(#${tone})`} />
          <circle cx={CRITIC[0]} cy={CRITIC[1]} r={18} strokeWidth={2.6} fill="var(--paper)" />
        </>
      }
      text={
        <>
          <text x={CURRICULUM[0]} y={78} textAnchor="middle" className="fill-ink font-bold">
            curriculum
          </text>
          <text x={128} y={102} textAnchor="middle">
            task
          </text>
          <text x={264} y={102} textAnchor="middle">
            skill code
          </text>
          <text x={ACTION[0]} y={150} textAnchor="middle" className="fill-ink font-bold">
            action agent
          </text>
          <text x={ACTION[0]} y={166} textAnchor="middle">
            writes JavaScript
          </text>
          <text x={234} y={36}>
            skill library
          </text>
          <text x={187} y={76} textAnchor="end">
            reuse
          </text>
          <text x={213} y={76}>
            store
          </text>
          <text x={x + size / 2} y={y - 10} textAnchor="middle" className="fill-ink font-bold">
            Minecraft
          </text>
          <text x={324} y={186} textAnchor="end">
            state
          </text>
          <text x={176} y={198} textAnchor="end" className="fill-ink font-bold">
            critic
          </text>
          <text x={128} y={228} textAnchor="middle">
            done? next task
          </text>
          <text x={200} y={270} textAnchor="middle" className="fill-ball-text">
            first-person view, my addition
          </text>
        </>
      }
    />
  );
}
