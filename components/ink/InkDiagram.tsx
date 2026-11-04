import { useId } from "react";
import { Denoise } from "./Denoise";

type InkDiagramProps = {
  viewBox: string;
  label: string;
  className?: string;
  /** Strokes, drawn through the rough-ink filter. */
  ink: React.ReactNode;
  /** Labels and annotations, kept crisp (no filter). */
  text?: React.ReactNode;
};

/**
 * Frame for the hand-inked project diagrams: a slight turbulence displacement breaks
 * the perfect vector lines, and the whole drawing is revealed from noise.
 * Strokes use currentColor (ink); the ball orange comes from the CSS tokens.
 */
export function InkDiagram({ viewBox, label, className, ink, text }: InkDiagramProps) {
  const filterId = useId();
  return (
    <Denoise>
      <svg viewBox={viewBox} role="img" aria-label={label} className={`h-auto w-full text-ink ${className ?? ""}`}>
        <defs>
          <filter id={filterId} x="-10%" y="-10%" width="120%" height="120%">
            <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves={2} seed={7} />
            <feDisplacementMap in="SourceGraphic" scale={2.4} />
          </filter>
        </defs>
        <g filter={`url(#${filterId})`} fill="none" stroke="currentColor" strokeLinecap="round">
          {ink}
        </g>
        <g className="fill-ink-2 text-[13px]">{text}</g>
      </svg>
    </Denoise>
  );
}

/** A handwritten note in the margin of a diagram (orange, Caveat Brush). Use rarely. */
export function Annotation({ x, y, children }: { x: number; y: number; children: React.ReactNode }) {
  return (
    <text x={x} y={y} className="fill-ball-text font-hand text-[19px]">
      {children}
    </text>
  );
}
