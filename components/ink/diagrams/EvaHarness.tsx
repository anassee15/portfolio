import { Annotation, InkDiagram } from "../InkDiagram";

/** The harness loop: a simulated policyholder talks to EVA, judges classify each claim, code computes the score. */
export function EvaHarness() {
  return (
    <InkDiagram
      viewBox="0 0 480 300"
      className="max-w-[560px]"
      label="The harness: a simulated policyholder talks with EVA; judges classify every claim of the conversation; code turns the verdicts into a score."
      ink={
        <g strokeWidth={2.6}>
          <circle cx={70} cy={90} r={34} />
          <path d="M106 78 Q 162 54 218 78" />
          <path d="M218 104 Q 162 128 106 104" />
          <rect x={220} y={58} width={140} height={64} />
          <path d="M290 124 L 290 194" />
          <path d="M282 184 L 290 194 L 298 184" />
          <rect x={220} y={196} width={140} height={64} />
          <path d="M362 228 L 404 228" />
          <circle cx={430} cy={228} r={24} className="fill-ball" />
        </g>
      }
      text={
        <>
          <text x={70} y={148} textAnchor="middle">
            simulated
          </text>
          <text x={70} y={166} textAnchor="middle">
            policyholder
          </text>
          <text x={290} y={95} textAnchor="middle" className="fill-ink text-[15px]">
            EVA
          </text>
          <text x={290} y={233} textAnchor="middle" className="fill-ink text-[15px]">
            judges
          </text>
          <text x={430} y={276} textAnchor="middle">
            score
          </text>
          <Annotation x={302} y={152}>
            re-judge without
          </Annotation>
          <Annotation x={302} y={172}>
            re-simulating
          </Annotation>
          <Annotation x={14} y={226}>
            the LLM classifies,
          </Annotation>
          <Annotation x={14} y={248}>
            the code scores
          </Annotation>
        </>
      }
    />
  );
}
