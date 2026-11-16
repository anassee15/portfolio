import { useId } from "react";
import { arrowHead } from "../geometry";
import { InkDiagram } from "../InkDiagram";

/**
 * "The LLM classifies, the code scores": EVA's answer is cut into claims, a judge
 * gives each one a typed verdict against the product's documents, then code turns
 * the verdicts into a decision. A critical verdict fails the case on its own.
 * A person can change a verdict; the code scores again without the LLM.
 */

const JUDGE: [number, number] = [172, 128];
const CODE: [number, number] = [452, 128];
const CLAIMS = [
  { y: 62, verdict: "correct", kind: "ok" },
  { y: 102, verdict: "correct", kind: "ok" },
  { y: 142, verdict: "missing condition", kind: "minor" },
  { y: 182, verdict: "invented figure", kind: "critical" },
] as const;

export function ClaimScoring() {
  const id = useId();
  const tone = `${id}-tone`;

  return (
    <InkDiagram
      viewBox="0 0 620 270"
      label="EVA's answer is cut into claims. An LLM judge, reading the product's documents, gives each claim a verdict: here correct, correct, missing condition, and invented figure, which is critical. Code applies a penalty table: the critical verdict fails the case whatever the score. A person can change a verdict, and the score is recomputed without the LLM."
      defs={
        <pattern id={tone} width={4} height={4} patternUnits="userSpaceOnUse">
          <circle cx={2} cy={2} r={1} fill="currentColor" />
        </pattern>
      }
      ink={
        <>
          {/* EVA's answer, one line per claim */}
          <rect x={26} y={44} width={80} height={160} fill="var(--paper)" strokeWidth={2.2} />
          {CLAIMS.map(({ y }) => (
            <path key={y} d={`M36 ${y} H96`} strokeWidth={1.4} />
          ))}
          <path d={`M108 ${JUDGE[1]} H146`} strokeWidth={1.8} />
          <path d={arrowHead([149, JUDGE[1]], "right", 5)} strokeWidth={1.8} />

          {/* the judge, reading the documents */}
          <path d="M156 22 H182 L190 30 V60 H156 Z" fill="var(--paper)" strokeWidth={1.8} />
          <path d={`M${JUDGE[0]} 62 V${JUDGE[1] - 26}`} strokeWidth={1.6} />
          <path d={arrowHead([JUDGE[0], JUDGE[1] - 23], "down", 4)} strokeWidth={1.6} />
          <circle cx={JUDGE[0]} cy={JUDGE[1]} r={20} strokeWidth={2.6} fill={`url(#${tone})`} />

          {/* one verdict per claim */}
          {CLAIMS.map(({ y, kind }) => (
            <g key={y} className={kind === "critical" ? "stroke-ball" : undefined}>
              <path d={`M${JUDGE[0] + 20} ${JUDGE[1]} C224 ${JUDGE[1]} 214 ${y} 240 ${y}`} strokeWidth={1.4} />
              {kind === "ok" && <circle cx={250} cy={y} r={7} strokeWidth={1.8} fill="var(--paper)" />}
              {kind === "minor" && <circle cx={250} cy={y} r={7} strokeWidth={1.8} fill={`url(#${tone})`} />}
              {kind === "critical" && <circle cx={250} cy={y} r={7} strokeWidth={1.8} className="fill-ball" />}
              <path d={`M372 ${y} C400 ${y} 400 ${CODE[1]} 426 ${CODE[1]}`} strokeWidth={1.4} />
            </g>
          ))}

          {/* the code, then the decision */}
          <circle cx={CODE[0]} cy={CODE[1]} r={20} strokeWidth={2.6} fill="var(--paper)" />
          <path d={`M${CODE[0] + 20} ${CODE[1]} H532`} className="stroke-ball" strokeWidth={2} />
          <path d={arrowHead([535, CODE[1]], "right", 5)} className="stroke-ball" strokeWidth={2} />
          <circle cx={552} cy={CODE[1]} r={11} className="fill-ball stroke-ball" />

          {/* a person changes a verdict; the code scores again */}
          <path d="M300 246 H452 V154" strokeWidth={1.5} strokeDasharray="4 3" />
          <path d={arrowHead([CODE[0], 151], "up", 5)} strokeWidth={1.5} />
          <path d="M300 246 V204" strokeWidth={1.5} strokeDasharray="4 3" />
          <path d={arrowHead([300, 201], "up", 5)} strokeWidth={1.5} />
          <circle cx={286} cy={246} r={6} strokeWidth={1.8} />
        </>
      }
      text={
        <>
          <text x={66} y={224} textAnchor="middle" className="fill-ink font-bold">
            EVA&apos;s answer
          </text>
          <text x={66} y={239} textAnchor="middle">
            one line, one claim
          </text>
          <text x={198} y={42} className="fill-ink font-bold">
            product documents
          </text>
          <text x={JUDGE[0]} y={JUDGE[1] + 38} textAnchor="middle" className="fill-ink font-bold">
            LLM judge
          </text>
          <text x={JUDGE[0]} y={JUDGE[1] + 53} textAnchor="middle">
            classifies
          </text>
          {CLAIMS.map(({ y, verdict, kind }) => (
            <text key={y} x={264} y={y + 4} className={kind === "critical" ? "fill-ball-text font-bold" : "fill-ink"}>
              {verdict}
            </text>
          ))}
          <text x={CODE[0]} y={CODE[1] - 46} textAnchor="middle" className="fill-ink font-bold">
            code
          </text>
          <text x={CODE[0]} y={CODE[1] - 30} textAnchor="middle">
            penalty table
          </text>
          <text x={552} y={CODE[1] - 22} textAnchor="middle" className="fill-ball-text font-bold">
            fail
          </text>
          <text x={552} y={CODE[1] + 32} textAnchor="middle">
            critical error,
          </text>
          <text x={552} y={CODE[1] + 47} textAnchor="middle">
            whatever
          </text>
          <text x={552} y={CODE[1] + 62} textAnchor="middle">
            the score
          </text>
          <text x={312} y={262}>
            a person changes a verdict, the code scores again
          </text>
        </>
      }
    />
  );
}
