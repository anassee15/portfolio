import { useId } from "react";
import { arrowHead } from "../geometry";
import { InkDiagram } from "../InkDiagram";

/** The tutor, step by step: a base model, SFT, DPO, retrieval, then QLoRA halves it. */

const Y = 84;
const STEPS = [
  { x: 36, name: "base", note: "Qwen3-0.6B" },
  { x: 122, name: "SFT", note: "24k questions" },
  { x: 208, name: "DPO", note: "preferences" },
  { x: 294, name: "RAG", note: "62k documents" },
];

export function TutorSteps() {
  const id = useId();
  const tone = `${id}-tone`;

  return (
    <InkDiagram
      viewBox="0 0 420 150"
      label="The tutor step by step: Qwen3-0.6B as a base, fine-tuned with SFT on 24k questions, then DPO on preferences, then retrieval over 62k documents; QLoRA in 4-bit halves it from 1.1 to 0.5 GB."
      defs={
        <pattern id={tone} width={4} height={4} patternUnits="userSpaceOnUse">
          <circle cx={2} cy={2} r={1} fill="currentColor" />
        </pattern>
      }
      ink={
        <>
          {STEPS.slice(0, -1).map(({ x }) => (
            <g key={x} strokeWidth={2.2}>
              <path d={`M${x + 22} ${Y} H${x + 58}`} />
              <path d={arrowHead([x + 61, Y], "right")} />
            </g>
          ))}
          <path d={`M316 ${Y} H360`} strokeWidth={2.2} className="stroke-ball" />
          <path d={arrowHead([363, Y], "right")} strokeWidth={2.2} className="stroke-ball" />

          {/* documents for retrieval */}
          <rect x={282} y={22} width={24} height={20} className="stroke-muted" strokeWidth={1} />
          <rect x={278} y={26} width={24} height={20} fill="var(--paper)" strokeWidth={1.6} />
          <path d={`M290 48 V58`} strokeWidth={1.6} />
          <path d={arrowHead([290, 61], "down", 4)} strokeWidth={1.6} />

          {STEPS.map(({ x }, i) => (
            <circle key={x} cx={x} cy={Y} r={20} strokeWidth={2.6} fill={i ? `url(#${tone})` : "var(--paper)"} />
          ))}
          <circle cx={384} cy={Y} r={13} strokeWidth={2.6} className="stroke-ball" fill={`url(#${tone})`} />
        </>
      }
      text={
        <>
          {STEPS.map(({ x, name, note }) => (
            <g key={x}>
              <text x={x} y={Y + 40} textAnchor="middle" className="fill-ink font-bold">
                {name}
              </text>
              <text x={x} y={Y + 56} textAnchor="middle">
                {note}
              </text>
            </g>
          ))}
          <text x={384} y={Y + 40} textAnchor="middle" className="fill-ink font-bold">
            QLoRA
          </text>
          <text x={384} y={Y + 56} textAnchor="middle" className="fill-ball-text">
            0.5 GB
          </text>
        </>
      }
    />
  );
}
