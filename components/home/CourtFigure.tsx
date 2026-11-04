"use client";

import { useRef, useState } from "react";
import dynamic from "next/dynamic";
import { useCssVariables, useInView, useMediaQuery, usePrefersReducedMotion, useWebGL } from "@/lib/hooks";

// three.js is only downloaded when the court gets close to the viewport.
const CourtScene = dynamic(() => import("@/components/three/CourtScene"), { ssr: false });

const COLOR_TOKENS = ["paper", "ink", "ball"] as const;
const DESCRIPTION =
  "A half basketball court drawn in ink and screentone. EVA's router plays point guard: it passes the ball to specialised agents, who pass it to the synthesis, who scores.";

export function CourtFigure() {
  const frame = useRef<HTMLDivElement>(null);
  const near = useInView(frame, { rootMargin: "200px", once: true });
  const visible = useInView(frame);
  const reducedMotion = usePrefersReducedMotion();
  const webgl = useWebGL();
  const touch = useMediaQuery("(pointer: coarse)");
  const colors = useCssVariables(COLOR_TOKENS);
  const [sample, setSample] = useState(0);

  const animated = webgl && !reducedMotion;

  return (
    <figure className="min-w-0">
      <div ref={frame} role="img" aria-label={DESCRIPTION} className="relative aspect-[4/3] w-full bg-paper">
        {animated && near && colors ? (
          <CourtScene colors={colors} sample={sample} active={visible} maxDpr={touch ? 1 : 1.5} />
        ) : (
          !animated && <StillCourt />
        )}
      </div>
      <figcaption className="meta mt-2 flex flex-wrap items-center justify-between gap-3 text-[11px]">
        <span>question → router (point guard) → 0 to n agents → synthesis → answer</span>
        {animated && (
          <button
            type="button"
            onClick={() => setSample((n) => n + 1)}
            className="cursor-pointer border border-ink px-2.5 py-1.5 text-ink"
          >
            Sample again
          </button>
        )}
      </figcaption>
    </figure>
  );
}

/** Frame rendered from the 3D scene, for reduced motion or when WebGL is missing. */
function StillCourt() {
  return (
    <picture>
      <source srcSet="/court/court-dark.webp" media="(prefers-color-scheme: dark)" />
      <img src="/court/court-light.webp" alt="" width={1200} height={900} className="h-full w-full" />
    </picture>
  );
}
