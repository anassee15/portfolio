import { useId } from "react";
import { arrowHead, link, type Point } from "../geometry";
import { InkDiagram } from "../InkDiagram";

/**
 * How one conversation is judged, after the thesis deck: a faithfulness control,
 * then the use case's evaluators (code checks, and LLM judges whose verdicts are
 * scored by code), then pass or fail. Human review re-scores without the LLM.
 */

const CONTROL: Point = [112, 80];
const CHECKS: Point = [205, 40];
const JUDGE: Point = [205, 120];
const CODE: Point = [290, 120];
const SCORE: Point = [370, 80];
const VERDICT: Point = [448, 80];

export function HarnessJudging() {
  const id = useId();
  const tone = `${id}-tone`;

  return (
    <InkDiagram
      viewBox="0 0 560 200"
      label="How a conversation is judged: a control first checks that the simulated policyholder stayed faithful, otherwise the conversation is excluded. Then code checks and LLM judges run; the judges give verdicts, and code turns them into a score. The run passes or fails; over k runs this gives pass@k and pass^k. A human review can change a verdict and the score is recomputed without the LLM."
      defs={
        <pattern id={tone} width={4} height={4} patternUnits="userSpaceOnUse">
          <circle cx={2} cy={2} r={1} fill="currentColor" />
        </pattern>
      }
      ink={
        <>
          <path d="M6 80 H88" strokeWidth={2.2} />
          <path d={arrowHead([91, 80], "right", 5)} strokeWidth={2.2} />

          {/* not faithful: excluded */}
          <g className="stroke-muted" strokeWidth={1.4} strokeDasharray="2 5">
            <path d="M112 98 V156" />
          </g>
          <circle cx={112} cy={166} r={8} className="stroke-muted" strokeWidth={1.6} fill="var(--paper)" />

          {/* the use case's evaluators */}
          <g strokeWidth={2.2}>
            <path d={link(CONTROL, CHECKS, 18, 12)} />
            <path d={link(CONTROL, JUDGE, 18, 14)} />
            <path d={link(CHECKS, SCORE, 12, 20)} />
            <path d={link(CODE, SCORE, 14, 20)} />
          </g>
          <path d="M221 120 H272" strokeWidth={2.2} className="stroke-ball" />
          <path d={arrowHead([275, 120], "right", 5)} strokeWidth={2.2} className="stroke-ball" />

          {/* human review re-scores without calling the LLM again */}
          <g className="stroke-muted" strokeWidth={1.4} strokeDasharray="4 4">
            <path d="M370 100 V164 H290 V140" />
          </g>
          <path d={arrowHead([290, 137], "up", 5)} strokeWidth={1.4} className="stroke-muted" />

          <path d="M392 80 H434" strokeWidth={2.4} />
          <path d={arrowHead([437, 80], "right", 5)} strokeWidth={2.4} />

          <circle cx={CONTROL[0]} cy={CONTROL[1]} r={18} strokeWidth={2.6} fill={`url(#${tone})`} />
          <circle cx={CHECKS[0]} cy={CHECKS[1]} r={12} strokeWidth={2.4} fill={`url(#${tone})`} />
          <circle cx={JUDGE[0]} cy={JUDGE[1]} r={14} strokeWidth={2.4} fill={`url(#${tone})`} />
          <circle cx={CODE[0]} cy={CODE[1]} r={14} strokeWidth={2.4} fill="var(--paper)" />
          <circle cx={SCORE[0]} cy={SCORE[1]} r={20} strokeWidth={3} fill="var(--paper)" />
          <circle cx={VERDICT[0]} cy={VERDICT[1]} r={9} className="fill-ball stroke-ball" />
        </>
      }
      text={
        <>
          <text x={6} y={70}>
            conversation
          </text>
          <text x={CONTROL[0]} y={52} textAnchor="middle" className="fill-ink font-bold">
            faithful?
          </text>
          <text x={122} y={136}>
            no
          </text>
          <text x={126} y={170}>
            excluded
          </text>

          <text x={CHECKS[0]} y={20} textAnchor="middle" className="fill-ink font-bold">
            code checks
          </text>
          <text x={JUDGE[0]} y={98} textAnchor="middle" className="fill-ink font-bold">
            LLM judge
          </text>
          <text x={248} y={140} textAnchor="middle" className="fill-ball-text">
            verdicts
          </text>
          <text x={CODE[0]} y={98} textAnchor="middle" className="fill-ink font-bold">
            code
          </text>
          <text x={SCORE[0]} y={52} textAnchor="middle" className="fill-ink font-bold">
            score
          </text>
          <text x={330} y={184} textAnchor="middle">
            human review
          </text>

          <text x={VERDICT[0]} y={108} textAnchor="middle">
            pass / fail
          </text>
          <text x={466} y={76}>
            × k runs
          </text>
          <text x={466} y={94} className="fill-ink font-bold">
            pass^k
          </text>
        </>
      }
    />
  );
}
