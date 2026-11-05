import { useId } from "react";
import { arrowHead, type Point } from "../geometry";
import { InkDiagram } from "../InkDiagram";

/**
 * The two-stage pipeline: a VLM detects and plans, a diffusion model rewrites the image,
 * then the result is scored. The memes are abstract frames: no image from the dataset.
 */

const CY = 84;
const VLM: Point = [132, CY];
const FLUX: Point = [244, CY];
const JUDGE: Point = [392, CY];
const SIZE = 52;

/** A meme as a frame: caption lines on top, a picture below. */
function Meme({ x, picture }: { x: number; picture: (x: number, y: number) => React.ReactNode }) {
  const y = CY - SIZE / 2;
  return (
    <g>
      <rect x={x} y={y} width={SIZE} height={SIZE} fill="var(--paper)" strokeWidth={2.2} />
      <path d={`M${x + 8} ${y + 9} H${x + 44} M${x + 13} ${y + 16} H${x + 39}`} strokeWidth={1.4} />
      {picture(x + 8, y + 23)}
    </g>
  );
}

export function UnhatememePipeline() {
  const id = useId();
  const tone = `${id}-tone`;
  const picture = (x: number, y: number) => <rect x={x} y={y} width={36} height={22} fill={`url(#${tone})`} strokeWidth={1.2} />;

  return (
    <InkDiagram
      viewBox="0 0 420 170"
      label="The pipeline: a vision-language model reads the meme. If it is not hateful, the meme passes unchanged. If it is, the model plans an edit, a diffusion model rewrites the image, and the repaired meme is scored for toxicity and for how much of the original it keeps."
      defs={
        <pattern id={tone} width={4} height={4} patternUnits="userSpaceOnUse">
          <circle cx={2} cy={2} r={1} fill="currentColor" />
        </pattern>
      }
      ink={
        <>
          <Meme x={6} picture={picture} />
          <path d={`M62 ${CY} H104`} strokeWidth={2.4} />
          <path d={arrowHead([107, CY], "right")} strokeWidth={2.4} />

          {/* not hateful: passed as is */}
          <path d={`M${VLM[0]} 108 V140 H168`} strokeWidth={1.4} strokeDasharray="2 5" className="stroke-muted" />
          <path d={arrowHead([171, 140], "right", 5)} strokeWidth={1.4} className="stroke-muted" />

          <path d={`M156 ${CY} H216`} strokeWidth={2.4} />
          <path d={arrowHead([219, CY], "right")} strokeWidth={2.4} />

          <path d={`M268 ${CY} H294`} strokeWidth={2.4} className="stroke-ball" />
          <path d={arrowHead([297, CY], "right")} strokeWidth={2.4} className="stroke-ball" />
          <Meme
            x={302}
            picture={(x, y) => (
              <>
                {picture(x, y)}
                <circle cx={x + 18} cy={y + 11} r={7} className="fill-ball stroke-ball" strokeWidth={1.2} />
              </>
            )}
          />
          <path d={`M358 ${CY} H370`} strokeWidth={2} />
          <path d={arrowHead([373, CY], "right", 5)} strokeWidth={2} />

          <circle cx={VLM[0]} cy={VLM[1]} r={24} strokeWidth={2.8} fill={`url(#${tone})`} />
          <circle cx={FLUX[0]} cy={FLUX[1]} r={24} strokeWidth={2.8} className="stroke-ball" fill="var(--paper)" />
          <circle cx={JUDGE[0]} cy={JUDGE[1]} r={16} strokeWidth={2.4} fill="var(--paper)" />
        </>
      }
      text={
        <>
          <text x={32} y={128} textAnchor="middle">
            meme
          </text>
          <text x={VLM[0]} y={30} textAnchor="middle" className="fill-ink font-bold">
            VLM
          </text>
          <text x={VLM[0]} y={46} textAnchor="middle">
            detects, plans
          </text>
          <text x={188} y={76} textAnchor="middle">
            edit
          </text>
          <text x={178} y={144}>
            not hateful: unchanged
          </text>
          <text x={FLUX[0]} y={30} textAnchor="middle" className="fill-ink font-bold">
            diffusion
          </text>
          <text x={FLUX[0]} y={46} textAnchor="middle">
            rewrites
          </text>
          <text x={328} y={128} textAnchor="middle" className="fill-ball-text">
            repaired
          </text>
          <text x={JUDGE[0]} y={30} textAnchor="middle" className="fill-ink font-bold">
            scored
          </text>
          <text x={JUDGE[0]} y={118} textAnchor="middle">
            toxicity,
          </text>
          <text x={JUDGE[0]} y={133} textAnchor="middle">
            similarity
          </text>
        </>
      }
    />
  );
}
