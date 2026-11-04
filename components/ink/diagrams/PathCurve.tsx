import { injuryNote, milestones, type MilestoneId } from "@/data/path";
import { smoothThrough, type Point } from "../geometry";
import { InkDiagram } from "../InkDiagram";

/**
 * The career path drawn as a training-loss curve: it starts high, spikes at the injury,
 * then keeps going down through school and work until February 2027, and beyond (dashed).
 * Two hand-placed layouts: a wide one, and a narrow one with fewer, larger labels.
 */

type Label = { at: Point; text?: string; anchor?: "start" | "middle" | "end" };

type Layout = {
  viewBox: string;
  fontSize: number;
  /** Smooth descent from the first point to the foot of the spike. */
  descent: Point[];
  spike: Point;
  rebound: Point;
  /** One dot per milestone after the injury, in order; the last one is February 2027. */
  dots: Point[];
  beyond: Point;
  labels: Partial<Record<MilestoneId, Label>>;
  note: { at: Point; lines: string[]; size: number };
};

const WIDE: Layout = {
  viewBox: "0 0 860 210",
  fontSize: 13,
  descent: [
    [20, 54],
    [170, 114],
    [200, 118],
  ],
  spike: [220, 40],
  rebound: [242, 92],
  dots: [
    [320, 129],
    [440, 150],
    [530, 163],
    [610, 171],
    [700, 179],
    [800, 185],
  ],
  beyond: [850, 188],
  labels: {
    captain: { at: [26, 140] },
    injury: { at: [236, 16] },
    hesso: { at: [282, 112] },
    epfl: { at: [410, 176] },
    idiap: { at: [500, 192] },
    sv: { at: [560, 150] },
    gm: { at: [640, 204] },
    available: { at: [760, 166] },
  },
  note: { at: [236, 38], lines: [injuryNote], size: 19 },
};

const NARROW: Layout = {
  viewBox: "0 0 400 232",
  fontSize: 15,
  descent: [
    [10, 92],
    [70, 126],
    [86, 130],
  ],
  spike: [100, 58],
  rebound: [114, 112],
  dots: [
    [154, 140],
    [212, 162],
    [254, 174],
    [290, 182],
    [326, 189],
    [362, 195],
  ],
  beyond: [394, 198],
  labels: {
    captain: { at: [10, 164], text: "Captain" },
    injury: { at: [10, 18] },
    hesso: { at: [148, 122], text: "HES-SO 2020" },
    epfl: { at: [212, 190], text: "EPFL 2023", anchor: "middle" },
    gm: { at: [326, 220], text: "Groupe Mutuel", anchor: "middle" },
    available: { at: [392, 176], text: "Feb 2027", anchor: "end" },
  },
  note: { at: [10, 40], lines: [injuryNote], size: 20 },
};

const label = (id: MilestoneId) => milestones.find((m) => m.id === id)!.label;

const ALT =
  "My path drawn as a loss curve: club basketball captain, a spike at a back injury and covid, then HES-SO (2020), EPFL (2023), Idiap (2024), Scientific Visual (2025) and Groupe Mutuel (2025), going down until February 2027.";

function Curve({ layout, className }: { layout: Layout; className?: string }) {
  const { descent, spike, rebound, dots, beyond } = layout;
  const end = dots[dots.length - 1];
  const curve =
    `M${descent[0].join(" ")}` +
    smoothThrough(descent) +
    ` L${spike.join(" ")} L${rebound.join(" ")}` +
    smoothThrough([rebound, ...dots]);

  return (
    <InkDiagram
      viewBox={layout.viewBox}
      label={ALT}
      className={className}
      ink={
        <>
          <path d={curve} strokeWidth={3} />
          <path d={`M${end.join(" ")} L${beyond.join(" ")}`} strokeWidth={3} strokeDasharray="3 9" />
          {dots.slice(0, -1).map(([x, y]) => (
            <circle key={x} cx={x} cy={y} r={4.5} fill="currentColor" stroke="none" />
          ))}
          <circle cx={end[0]} cy={end[1]} r={6} className="fill-ball" stroke="none" />
        </>
      }
      text={
        <g style={{ fontSize: layout.fontSize }}>
          {Object.entries(layout.labels).map(([id, { at, text, anchor }]) => (
            <text key={id} x={at[0]} y={at[1]} textAnchor={anchor} className={id === "available" ? "fill-ink font-medium" : undefined}>
              {text ?? label(id as MilestoneId)}
            </text>
          ))}
          <text x={layout.note.at[0]} y={layout.note.at[1]} className="fill-ball-text font-hand" style={{ fontSize: layout.note.size }}>
            {layout.note.lines.map((line, i) => (
              <tspan key={line} x={layout.note.at[0]} dy={i === 0 ? 0 : "1.1em"}>
                {line}
              </tspan>
            ))}
          </text>
        </g>
      }
    />
  );
}

export function PathCurve() {
  return (
    <>
      <div className="hidden lg:block">
        <Curve layout={WIDE} />
      </div>
      <div className="max-w-[520px] lg:hidden">
        <Curve layout={NARROW} />
      </div>
    </>
  );
}
