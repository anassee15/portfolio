import { useId } from "react";
import { arrowHead } from "../geometry";
import { InkDiagram } from "../InkDiagram";

/**
 * One situation, crossed with the product sheets, becomes four policyholders,
 * each with what EVA should do: answer, or refuse. Refusals are in orange.
 */

const CROSS: [number, number] = [190, 130];
const ROWS = [
  { y: 46, who: "product A, lowest level", why: "that covers it", expect: "answer", refusal: false },
  { y: 102, who: "product A, a level", why: "that doesn't cover it", expect: "refusal", refusal: true },
  { y: 158, who: "product B", why: "covers nothing", expect: "refusal", refusal: true },
  { y: 214, who: "basic insurance only", why: "its own rule", expect: "its rule", refusal: false },
];

export function SituationCrossing() {
  const id = useId();
  const tone = `${id}-tone`;

  return (
    <InkDiagram
      viewBox="0 0 600 260"
      label="One situation, tagged by topic, is crossed with the product sheets. It becomes four policyholders: product A at its lowest level that covers the topic, where EVA should answer; product A at a level that doesn't cover it, where EVA should refuse; product B, which covers nothing, where EVA should refuse; and basic insurance only, which follows its own rule."
      defs={
        <pattern id={tone} width={4} height={4} patternUnits="userSpaceOnUse">
          <circle cx={2} cy={2} r={1} fill="currentColor" />
        </pattern>
      }
      ink={
        <>
          {/* the situation */}
          <path d="M36 106 H76 L88 118 V160 H36 Z" fill="var(--paper)" strokeWidth={2} />
          {[122, 131, 140].map((y) => (
            <path key={y} d={`M44 ${y} H78`} strokeWidth={1.2} />
          ))}
          <path d={`M90 ${CROSS[1]} H170`} strokeWidth={1.8} />
          <path d={arrowHead([173, CROSS[1]], "right", 5)} strokeWidth={1.8} />

          {/* the product sheets, stacked above */}
          <path d="M176 22 H206 L214 30 V62 H176 Z" className="stroke-muted" strokeWidth={1} />
          <path d="M170 28 H200 L208 36 V68 H170 Z" fill="var(--paper)" strokeWidth={2} />
          <path d={`M${CROSS[0]} 70 V${CROSS[1] - 22}`} strokeWidth={1.8} />
          <path d={arrowHead([CROSS[0], CROSS[1] - 19], "down", 5)} strokeWidth={1.8} />

          {/* the crossing, then four policyholders */}
          <circle cx={CROSS[0]} cy={CROSS[1]} r={16} strokeWidth={2.4} fill="var(--paper)" />
          <path d={`M${CROSS[0] - 6} ${CROSS[1] - 6} L${CROSS[0] + 6} ${CROSS[1] + 6} M${CROSS[0] + 6} ${CROSS[1] - 6} L${CROSS[0] - 6} ${CROSS[1] + 6}`} strokeWidth={2} />
          {ROWS.map(({ y, refusal }) => (
            <g key={y}>
              <path
                d={`M${CROSS[0] + 16} ${CROSS[1]} C250 ${CROSS[1]} 230 ${y} 266 ${y}`}
                strokeWidth={1.6}
              />
              <circle cx={280} cy={y} r={13} strokeWidth={2.2} fill={`url(#${tone})`} />
              <path d={`M450 ${y} H500`} strokeWidth={1.4} strokeDasharray="3 3" className={refusal ? "stroke-ball" : undefined} />
              <path d={arrowHead([503, y], "right", 4)} strokeWidth={1.4} className={refusal ? "stroke-ball" : undefined} />
            </g>
          ))}
        </>
      }
      text={
        <>
          <text x={62} y={182} textAnchor="middle" className="fill-ink font-bold">
            situation
          </text>
          <text x={62} y={197} textAnchor="middle">
            tagged by topic
          </text>
          <text x={160} y={44} textAnchor="end" className="fill-ink font-bold">
            product sheets
          </text>
          <text x={160} y={59} textAnchor="end">
            conditions by topic
          </text>
          {ROWS.map(({ y, who, why, expect, refusal }) => (
            <g key={y}>
              <text x={302} y={y - 2} className="fill-ink font-bold">
                {who}
              </text>
              <text x={302} y={y + 13}>
                {why}
              </text>
              <text x={512} y={y + 4} className={refusal ? "fill-ball-text font-bold" : "fill-ink font-bold"}>
                {expect}
              </text>
            </g>
          ))}
          <text x={512} y={18} className="fill-ink-2">
            EVA should
          </text>
        </>
      }
    />
  );
}
