import { useId } from "react";
import { arrowHead } from "../geometry";
import { InkDiagram } from "../InkDiagram";

/**
 * A saved conversation and the four ways to reuse it, from the cheapest (code only)
 * to the most expensive (simulating again, only against the same EVA).
 */

const LOG: [number, number] = [70, 130];
const WAYS = [
  { y: 40, title: "rescore", text: "new weights, no LLM", node: "code" },
  { y: 100, title: "judge again", text: "a new judge or prompt", node: "llm" },
  { y: 160, title: "resume", text: "only failed or missing judgements", node: "llm" },
  { y: 220, title: "simulate again", text: "only against the same EVA", node: "sim" },
] as const;

export function ConversationReuse() {
  const id = useId();
  const tone = `${id}-tone`;

  return (
    <InkDiagram
      viewBox="0 0 600 260"
      label="A saved conversation can be reused in four ways, from the cheapest to the most expensive: rescored by code with new weights, without an LLM; judged again by a new judge or prompt; resumed, judging only what failed or is missing; and simulated again, only against the same EVA."
      defs={
        <pattern id={tone} width={4} height={4} patternUnits="userSpaceOnUse">
          <circle cx={2} cy={2} r={1} fill="currentColor" />
        </pattern>
      }
      ink={
        <>
          {/* the saved conversation */}
          <path d="M44 98 H86 L98 110 V162 H44 Z" fill="var(--paper)" strokeWidth={2.2} />
          {[114, 124, 134, 144].map((y) => (
            <path key={y} d={`M52 ${y} H88`} strokeWidth={1.2} />
          ))}

          {WAYS.map(({ y, node }) => (
            <g key={y}>
              <path d={`M100 ${LOG[1]} C160 ${LOG[1]} 150 ${y} 210 ${y}`} strokeWidth={1.6} />
              <path d={arrowHead([214, y], "right", 4)} strokeWidth={1.6} />
              {node === "code" && <circle cx={234} cy={y} r={13} strokeWidth={2.2} fill="var(--paper)" />}
              {node === "llm" && <circle cx={234} cy={y} r={13} strokeWidth={2.2} fill={`url(#${tone})`} />}
              {node === "sim" && (
                <>
                  <circle cx={226} cy={y} r={11} strokeWidth={2.2} fill={`url(#${tone})`} />
                  <circle cx={252} cy={y} r={11} strokeWidth={2.6} fill="var(--paper)" />
                </>
              )}
            </g>
          ))}

          {/* cost grows downwards */}
          <path d="M560 34 V218" className="stroke-ball" strokeWidth={1.8} />
          <path d={arrowHead([560, 222], "down", 5)} className="stroke-ball" strokeWidth={1.8} />
        </>
      }
      text={
        <>
          <text x={71} y={184} textAnchor="middle" className="fill-ink font-bold">
            saved
          </text>
          <text x={71} y={199} textAnchor="middle" className="fill-ink font-bold">
            conversation
          </text>
          {WAYS.map(({ y, title, text, node }) => (
            <g key={y}>
              <text x={node === "sim" ? 276 : 260} y={y - 2} className="fill-ink font-bold">
                {title}
              </text>
              <text x={node === "sim" ? 276 : 260} y={y + 13}>
                {text}
              </text>
            </g>
          ))}
          <text x={548} y={28} textAnchor="end" className="fill-ball-text">
            cheap
          </text>
          <text x={548} y={240} textAnchor="end" className="fill-ball-text">
            expensive
          </text>
        </>
      }
    />
  );
}
