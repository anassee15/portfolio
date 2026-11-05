import { useId } from "react";
import { arrowHead } from "../geometry";
import { InkDiagram } from "../InkDiagram";

/**
 * The robot's camera feeds a model on the Jetson; part one decides to stop
 * on a target, part two finds the mildew on a vine leaf.
 */

const leaf = (x: number, y: number, s = 1) =>
  `M${x} ${y - 18 * s} C${x + 16 * s} ${y - 14 * s} ${x + 18 * s} ${y + 2 * s} ${x} ${y + 18 * s} C${x - 18 * s} ${y + 2 * s} ${x - 16 * s} ${y - 14 * s} ${x} ${y - 18 * s} Z M${x} ${y - 12 * s} V${y + 14 * s}`;

export function RobotVision() {
  const id = useId();
  const tone = `${id}-tone`;
  const chip = { x: 196, y: 70, size: 40 };

  return (
    <InkDiagram
      viewBox="0 0 420 190"
      label="The robot's camera sends each frame to a model running on its Jetson Nano, with TensorRT or ONNX. Part one: when the target is seen, the robot stops. Part two: the model segments mildew on a vine leaf, at 142 frames per second."
      defs={
        <pattern id={tone} width={4} height={4} patternUnits="userSpaceOnUse">
          <circle cx={2} cy={2} r={1} fill="currentColor" />
        </pattern>
      }
      ink={
        <>
          {/* the robot, side view */}
          <rect x={12} y={92} width={74} height={22} strokeWidth={2.6} fill={`url(#${tone})`} />
          <circle cx={30} cy={120} r={10} strokeWidth={2.6} fill="var(--paper)" />
          <circle cx={68} cy={120} r={10} strokeWidth={2.6} fill="var(--paper)" />
          <path d="M70 92 V72" strokeWidth={2.2} />
          <rect x={64} y={60} width={16} height={12} strokeWidth={2.2} fill="var(--paper)" />

          {/* what the camera sees */}
          <path d="M82 62 L110 48 M82 70 L110 112" strokeWidth={1.2} strokeDasharray="2 4" className="stroke-muted" />
          <rect x={110} y={48} width={60} height={64} strokeWidth={2} fill="var(--paper)" />
          <path d={leaf(140, 80, 0.9)} strokeWidth={1.6} />
          <path d="M174 90 H186" strokeWidth={2.2} />
          <path d={arrowHead([189, 90], "right", 5)} strokeWidth={2.2} />

          {/* the Jetson */}
          <rect x={chip.x} y={chip.y} width={chip.size} height={chip.size} strokeWidth={2.6} fill={`url(#${tone})`} />
          <path
            d={[0, 1, 2, 3]
              .flatMap((i) => {
                const p = chip.y + 8 + i * 8;
                const q = chip.x + 8 + i * 8;
                return [`M${chip.x - 6} ${p} H${chip.x}`, `M${chip.x + chip.size} ${p} H${chip.x + chip.size + 6}`, `M${q} ${chip.y - 6} V${chip.y}`, `M${q} ${chip.y + chip.size} V${chip.y + chip.size + 6}`];
              })
              .join(" ")}
            strokeWidth={1.4}
          />

          {/* the two decisions */}
          <path d="M244 84 C266 84 268 50 290 50" strokeWidth={2} />
          <path d={arrowHead([293, 50], "right", 5)} strokeWidth={2} />
          <path d="M244 96 C266 96 268 130 290 130" strokeWidth={2} className="stroke-ball" />
          <path d={arrowHead([293, 130], "right", 5)} strokeWidth={2} className="stroke-ball" />

          <path d={octagon(316, 50, 15)} strokeWidth={2.4} />
          <path d={leaf(316, 130)} strokeWidth={2} />
          <circle cx={309} cy={124} r={5} className="fill-ball stroke-ball" />
          <circle cx={322} cy={138} r={4} className="fill-ball stroke-ball" />
        </>
      }
      text={
        <>
          <text x={12} y={154} className="fill-ink font-bold">
            JetRacer
          </text>
          <text x={140} y={36} textAnchor="middle">
            camera frame
          </text>
          <text x={chip.x + chip.size / 2} y={56} textAnchor="middle" className="fill-ink font-bold">
            Jetson Nano
          </text>
          <text x={chip.x + chip.size / 2} y={140} textAnchor="middle">
            TensorRT, ONNX
          </text>
          <text x={340} y={46} className="fill-ink font-bold">
            stop
          </text>
          <text x={340} y={62}>
            target seen
          </text>
          <text x={340} y={126} className="fill-ink font-bold">
            mildew
          </text>
          <text x={340} y={142} className="fill-ball-text">
            142 FPS
          </text>
        </>
      }
    />
  );
}

function octagon(cx: number, cy: number, r: number) {
  return (
    Array.from({ length: 8 }, (_, i) => {
      const angle = (Math.PI / 4) * i + Math.PI / 8;
      return `${i ? "L" : "M"}${cx + Math.cos(angle) * r} ${cy + Math.sin(angle) * r}`;
    }).join(" ") + " Z"
  );
}
