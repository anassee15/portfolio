import { useId } from "react";
import { arrowHead } from "../geometry";
import { InkDiagram } from "../InkDiagram";

/**
 * The whole harness on two rows. Top, left to right: a situation is checked, crossed
 * with the products, then played between the simulated policyholder and the real EVA.
 * Bottom, right to left: the saved conversation is checked, judged claim by claim,
 * scored by code, and the run is written down. A person can correct a verdict.
 */

const TOP = 92;
const BOTTOM = 238;

function Doc({ x, y, w = 38, h = 48 }: { x: number; y: number; w?: number; h?: number }) {
  // A sheet with a folded corner and three lines of text, centred on (x, y).
  const left = x - w / 2;
  const top = y - h / 2;
  return (
    <>
      <path
        d={`M${left} ${top} H${left + w - 10} L${left + w} ${top + 10} V${top + h} H${left} Z`}
        fill="var(--paper)"
        strokeWidth={2}
      />
      {[14, 22, 30].map((dy) => (
        <path key={dy} d={`M${left + 7} ${top + dy} H${left + w - 9}`} strokeWidth={1.2} />
      ))}
    </>
  );
}

export function HarnessPipeline() {
  const id = useId();
  const tone = `${id}-tone`;

  return (
    <InkDiagram
      viewBox="0 0 680 320"
      label="The harness, step by step. A situation written in YAML is checked before any paid call, then crossed with the products: one situation becomes several policyholders. Each one is played n times: a simulated policyholder talks with the real EVA, and a goal agent says when to stop. The saved conversation is checked: if the simulated policyholder invented a fact, it is excluded. Otherwise LLM judges give a verdict per claim, and code turns the verdicts into a score, a decision, and pass@k and pass^k. Every run is written to a folder with the commit, a fingerprint of EVA and the dataset hash. In the Evaluation Lab, a person can correct a verdict and the score is recomputed without an LLM."
      defs={
        <pattern id={tone} width={4} height={4} patternUnits="userSpaceOnUse">
          <circle cx={2} cy={2} r={1} fill="currentColor" />
        </pattern>
      }
      ink={
        <>
          {/* 1. situation → precheck → crossing */}
          <Doc x={46} y={TOP} />
          <path d={`M70 ${TOP} H120`} strokeWidth={1.8} />
          <path d={arrowHead([123, TOP], "right", 5)} strokeWidth={1.8} />
          <circle cx={142} cy={TOP} r={15} strokeWidth={2.2} fill="var(--paper)" />
          <path d={`M135 ${TOP} L140 ${TOP + 6} L150 ${TOP - 6}`} strokeWidth={2} />
          <path d={`M157 ${TOP} H196`} strokeWidth={1.8} />
          {/* one line fans out into several policyholders, who all go to the simulation */}
          {[-24, -8, 8, 24].map((dy) => (
            <g key={dy}>
              <path d={`M196 ${TOP} C210 ${TOP} 210 ${TOP + dy} 224 ${TOP + dy}`} strokeWidth={1.6} />
              <circle cx={229} cy={TOP + dy} r={4.5} strokeWidth={1.6} fill={`url(#${tone})`} />
              <path d={`M234 ${TOP + dy} C246 ${TOP + dy} 246 ${TOP} 256 ${TOP}`} strokeWidth={1.2} />
            </g>
          ))}
          <path d={`M256 ${TOP} H263`} strokeWidth={1.8} />
          <path d={arrowHead([266, TOP], "right", 5)} strokeWidth={1.8} />

          {/* 2. the simulation, played n times */}
          <rect x={276} y={26} width={250} height={142} className="stroke-muted" strokeWidth={1} />
          <rect x={270} y={32} width={250} height={142} fill="var(--paper)" strokeWidth={2.2} />
          <circle cx={326} cy={TOP} r={20} strokeWidth={2.6} fill={`url(#${tone})`} />
          <circle cx={462} cy={TOP} r={20} strokeWidth={3} fill="var(--paper)" />
          <path d={`M350 ${TOP - 7} H432`} strokeWidth={2} />
          <path d={arrowHead([436, TOP - 7], "right", 5)} strokeWidth={2} />
          <path d={`M352 ${TOP + 7} H438`} strokeWidth={2} />
          <path d={arrowHead([348, TOP + 7], "left", 5)} strokeWidth={2} />
          <circle cx={394} cy={146} r={12} strokeWidth={2.2} fill={`url(#${tone})`} />
          <path d="M394 122 V134" strokeWidth={1.4} strokeDasharray="3 3" />

          {/* 3. the saved conversation */}
          <path d={`M520 ${TOP} H612 V${BOTTOM - 30}`} strokeWidth={1.8} />
          <path d={arrowHead([612, BOTTOM - 27], "down", 5)} strokeWidth={1.8} />
          <Doc x={612} y={BOTTOM} />

          {/* 4. bottom row, right to left: faithful? → judges → code → result */}
          <path d={`M592 ${BOTTOM} H536`} strokeWidth={1.8} />
          <path d={arrowHead([533, BOTTOM], "left", 5)} strokeWidth={1.8} />
          <circle cx={518} cy={BOTTOM} r={14} strokeWidth={2.2} fill={`url(#${tone})`} />
          <path d={`M518 ${BOTTOM + 14} V${BOTTOM + 44}`} strokeWidth={1.4} strokeDasharray="3 3" />
          <circle cx={518} cy={BOTTOM + 52} r={6} strokeWidth={1.6} className="stroke-muted" />

          <path d={`M504 ${BOTTOM} H448`} strokeWidth={1.8} />
          <path d={arrowHead([445, BOTTOM], "left", 5)} strokeWidth={1.8} />
          <circle cx={424} cy={BOTTOM} r={20} strokeWidth={2.6} fill={`url(#${tone})`} />

          <path d={`M404 ${BOTTOM} H334`} strokeWidth={1.8} />
          <path d={arrowHead([331, BOTTOM], "left", 5)} strokeWidth={1.8} />
          <circle cx={310} cy={BOTTOM} r={20} strokeWidth={2.6} fill="var(--paper)" />
          {/* a person corrects a verdict; the code scores again */}
          <path d={`M310 ${BOTTOM + 58} V${BOTTOM + 26}`} strokeWidth={1.6} strokeDasharray="4 3" />
          <path d={arrowHead([310, BOTTOM + 23], "up", 5)} strokeWidth={1.6} />
          <circle cx={310} cy={BOTTOM + 66} r={6} strokeWidth={1.8} />

          <path d={`M290 ${BOTTOM} H222`} className="stroke-ball" strokeWidth={2} />
          <path d={arrowHead([219, BOTTOM], "left", 5)} className="stroke-ball" strokeWidth={2} />
          <circle cx={204} cy={BOTTOM} r={11} className="fill-ball stroke-ball" />

          {/* 5. the run, written down */}
          <path d={`M190 ${BOTTOM} H92`} strokeWidth={1.4} strokeDasharray="3 3" />
          <path d={arrowHead([89, BOTTOM], "left", 5)} strokeWidth={1.4} />
          <Doc x={60} y={BOTTOM} />
        </>
      }
      text={
        <>
          <text x={46} y={TOP + 42} textAnchor="middle" className="fill-ink font-bold">
            situation
          </text>
          <text x={46} y={TOP + 57} textAnchor="middle">
            YAML
          </text>
          <text x={142} y={TOP + 34} textAnchor="middle" className="fill-ink font-bold">
            precheck
          </text>
          <text x={142} y={TOP + 49} textAnchor="middle">
            before any
          </text>
          <text x={142} y={TOP + 63} textAnchor="middle">
            paid call
          </text>
          <text x={222} y={TOP - 38} textAnchor="middle" className="fill-ink font-bold">
            × products
          </text>
          <text x={222} y={TOP + 46} textAnchor="middle">
            one situation,
          </text>
          <text x={222} y={TOP + 60} textAnchor="middle">
            several
          </text>
          <text x={222} y={TOP + 74} textAnchor="middle">
            policyholders
          </text>

          <text x={530} y={22} textAnchor="end" className="fill-ball-text">
            × n runs
          </text>
          <text x={394} y={TOP - 14} textAnchor="middle">
            asks
          </text>
          <text x={394} y={TOP + 24} textAnchor="middle">
            answers
          </text>
          <text x={326} y={TOP + 36} textAnchor="middle" className="fill-ink font-bold">
            simulated
          </text>
          <text x={326} y={TOP + 50} textAnchor="middle" className="fill-ink font-bold">
            policyholder
          </text>
          <text x={462} y={TOP + 5} textAnchor="middle" className="fill-ink font-bold">
            EVA
          </text>
          <text x={462} y={TOP + 36} textAnchor="middle">
            the real one
          </text>
          <text x={412} y={150} className="fill-ink font-bold">
            goal agent
          </text>
          <text x={412} y={164}>
            when to stop
          </text>

          <text x={612} y={BOTTOM + 40} textAnchor="middle" className="fill-ink font-bold">
            saved
          </text>
          <text x={612} y={BOTTOM + 54} textAnchor="middle" className="fill-ink font-bold">
            conversation
          </text>
          <text x={518} y={BOTTOM - 29} textAnchor="middle" className="fill-ink font-bold">
            faithful?
          </text>
          <text x={508} y={BOTTOM + 56} textAnchor="end">
            excluded
          </text>
          <text x={424} y={BOTTOM - 44} textAnchor="middle" className="fill-ink font-bold">
            LLM judges
          </text>
          <text x={424} y={BOTTOM - 29} textAnchor="middle">
            a verdict per claim
          </text>
          <text x={310} y={BOTTOM - 44} textAnchor="middle" className="fill-ink font-bold">
            code
          </text>
          <text x={310} y={BOTTOM - 29} textAnchor="middle">
            score, decision
          </text>
          <text x={322} y={BOTTOM + 70}>
            a person corrects a verdict
          </text>
          <text x={204} y={BOTTOM - 29} textAnchor="middle" className="fill-ball-text font-bold">
            pass@k · pass^k
          </text>
          <text x={204} y={BOTTOM + 30} textAnchor="middle">
            per use case
          </text>
          <text x={60} y={BOTTOM + 42} textAnchor="middle" className="fill-ink font-bold">
            run folder
          </text>
          <text x={60} y={BOTTOM + 56} textAnchor="middle">
            commit, EVA
          </text>
          <text x={60} y={BOTTOM + 70} textAnchor="middle">
            fingerprint, hash
          </text>
        </>
      }
    />
  );
}
