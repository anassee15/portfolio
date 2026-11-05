import { useId } from "react";

/**
 * A made-up, harmless meme to illustrate the pipeline (not a real output, nothing from the dataset):
 * the caption stays, and only the picture changes, from an empty room to a full one.
 */

const W = 320;
const H = 240;

function Person({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
  return (
    <g strokeWidth={2.2}>
      <circle cx={x} cy={y - 34 * s} r={8 * s} fill="var(--paper)" />
      <path d={`M${x} ${y - 26 * s} V${y - 6 * s} M${x - 11 * s} ${y - 20 * s} L${x} ${y - 14 * s} L${x + 11 * s} ${y - 22 * s} M${x - 8 * s} ${y + 10 * s} L${x} ${y - 6 * s} L${x + 8 * s} ${y + 10 * s}`} />
    </g>
  );
}

function Balloon({ x, y, ball }: { x: number; y: number; ball?: boolean }) {
  return (
    <g strokeWidth={1.8}>
      <ellipse cx={x} cy={y} rx={9} ry={11} className={ball ? "fill-ball stroke-ball" : undefined} fill={ball ? undefined : "var(--paper)"} />
      <path d={`M${x} ${y + 11} q-4 10 2 18 q4 8 -1 16`} strokeWidth={1.2} />
    </g>
  );
}

export function PartyMeme({ full }: { full: boolean }) {
  const id = useId();
  const tone = `${id}-tone`;
  const filter = `${id}-ink`;

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      role="img"
      aria-label={
        full
          ? "After: the same caption, “Everyone came to your party”, over a room full of people and balloons."
          : "Before: the caption “Everyone came to your party” over an empty room with a single balloon, a mocking joke."
      }
      className="h-full w-full bg-paper text-ink"
    >
      <defs>
        <pattern id={tone} width={4} height={4} patternUnits="userSpaceOnUse">
          <circle cx={2} cy={2} r={1} fill="currentColor" />
        </pattern>
        <filter id={filter} x="-5%" y="-5%" width="110%" height="110%">
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves={2} seed={3} />
          <feDisplacementMap in="SourceGraphic" scale={2.2} />
        </filter>
      </defs>

      <g filter={`url(#${filter})`} fill="none" stroke="currentColor" strokeLinecap="round">
        {/* the room */}
        <path d={`M24 196 H${W - 24} M70 196 L70 70 M${W - 70} 196 L${W - 70} 70 M70 70 H${W - 70}`} strokeWidth={1.4} className="stroke-muted" />
        <rect x={130} y={92} width={60} height={42} strokeWidth={1.6} fill={`url(#${tone})`} />
        <path d="M24 214 H296" strokeWidth={1} strokeDasharray="2 5" className="stroke-muted" />

        {full ? (
          <>
            <Person x={96} y={186} />
            <Person x={128} y={190} s={1.1} />
            <Person x={160} y={186} />
            <Person x={192} y={190} s={1.1} />
            <Person x={224} y={186} />
            <Person x={112} y={204} s={0.9} />
            <Person x={208} y={204} s={0.9} />
            <Balloon x={86} y={98} ball />
            <Balloon x={234} y={92} ball />
            <Balloon x={160} y={70} ball />
          </>
        ) : (
          <>
            <Balloon x={226} y={132} />
            <path d="M120 188 q10 -14 22 -4 q8 -10 18 0 q-6 12 -20 8 q-12 6 -20 -4 z" strokeWidth={1.4} />
          </>
        )}
      </g>

      <text x={W / 2} y={36} textAnchor="middle" className="fill-ink font-display text-[22px] font-black uppercase" stroke="none">
        Everyone came to your party
      </text>
    </svg>
  );
}
