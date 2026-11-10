"use client";

import { useCallback, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { PLAYS } from "@/components/three/play";
import { useCssVariables, useInView, useMediaQuery, usePageLoaded, usePrefersReducedMotion, useWebGL } from "@/lib/hooks";

// three.js is only downloaded once the page has loaded and the court is close to the viewport.
const CourtScene = dynamic(() => import("@/components/three/CourtScene"), { ssr: false });

const COLOR_TOKENS = ["paper", "ink", "ball"] as const;
// The still frame (public/court) shows the three-agent play, after the passes.
const STILL_PLAY = PLAYS[2];
const DESCRIPTION =
  "A half basketball court drawn in ink and screentone, where a multi-agent system answers a request as a team play: the router plays point guard and passes to the specialised agents it needs, who pass to the synthesis agent, who scores the answer.";

export function CourtFigure() {
  const frame = useRef<HTMLDivElement>(null);
  const near = useInView(frame, { rootMargin: "200px", once: true });
  const visible = useInView(frame);
  const reducedMotion = usePrefersReducedMotion();
  const webgl = useWebGL();
  const touch = useMediaQuery("(pointer: coarse)");
  const colors = useCssVariables(COLOR_TOKENS);
  const loaded = usePageLoaded();
  const [playIndex, setPlayIndex] = useState(0);
  const [sceneReady, setSceneReady] = useState(false);
  const markSceneReady = useCallback(() => setSceneReady(true), []);

  const animated = webgl && !reducedMotion;
  // The scene mounts once the page has loaded and the court is near the viewport.
  const live = animated && near && loaded && colors !== null;
  const play = live ? PLAYS[playIndex] : STILL_PLAY;
  const nextPlay = () => setPlayIndex((i) => (i + 1) % PLAYS.length);

  return (
    <figure className="min-w-0">
      <div ref={frame} role="img" aria-label={DESCRIPTION} className="relative aspect-[4/3] w-full bg-paper">
        {/* The still frame stays underneath until the scene has drawn its first frame. */}
        {!sceneReady && <StillCourt />}
        {live && (
          <CourtScene
            colors={colors}
            play={play}
            active={visible}
            maxDpr={touch ? 1 : 1.5}
            onPlayEnd={nextPlay}
            onReady={markSceneReady}
          />
        )}
      </div>
      <figcaption className="mt-3">
        <p className="text-[0.9375rem] leading-snug font-medium">Agentic systems, drawn as a basketball play</p>
        <p className="meta mt-0.5">I see them as a team sport. One request, one possession.</p>
        {/* The request being played; it changes with each play. */}
        <p className="mt-4 min-h-[2lh] text-[0.9375rem] leading-snug">
          <span className="meta mr-2">Someone asks</span>“{play.question}”
        </p>
      </figcaption>
    </figure>
  );
}

const STILL_SIZES = "(min-width: 768px) 45vw, 100vw";
const stillSrcSet = (theme: "light" | "dark") => `/court/court-${theme}-800.webp 800w, /court/court-${theme}.webp 1200w`;

/**
 * Frame rendered from the 3D scene: shown while the scene loads, and instead of it
 * for reduced motion or without WebGL. Often the largest thing on screen at load,
 * so it is fetched first, at the right size.
 */
function StillCourt() {
  return (
    <picture>
      <source srcSet={stillSrcSet("dark")} sizes={STILL_SIZES} media="(prefers-color-scheme: dark)" />
      <img
        src="/court/court-light.webp"
        srcSet={stillSrcSet("light")}
        sizes={STILL_SIZES}
        alt=""
        width={1200}
        height={900}
        fetchPriority="high"
        className="h-full w-full"
      />
    </picture>
  );
}
