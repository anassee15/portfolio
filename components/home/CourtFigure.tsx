"use client";

import { useRef, useState } from "react";
import dynamic from "next/dynamic";
import { PLAYS, Phase, type Play } from "@/components/three/play";
import { useCssVariables, useInView, useMediaQuery, usePageLoaded, usePrefersReducedMotion, useWebGL } from "@/lib/hooks";

// three.js is only downloaded once the page has loaded and the court is close to the viewport.
const CourtScene = dynamic(() => import("@/components/three/CourtScene"), { ssr: false });

const COLOR_TOKENS = ["paper", "ink", "ball"] as const;
// The still frame (public/court) shows the three-agent play, after the passes.
const STILL_PLAY = PLAYS[2];
const DESCRIPTION =
  "A half basketball court drawn in ink and screentone, where EVA answers a question as a team play: the router plays point guard and passes to the specialised agents it needs, who pass to the synthesis agent, who scores the answer.";

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
  const [sample, setSample] = useState(0);
  const [phase, setPhase] = useState(Phase.Scored);

  const animated = webgl && !reducedMotion;
  // Until the scene is mounted, the still frame stands in for it (and is what loads first).
  const live = animated && near && loaded && colors !== null;
  const play = live ? PLAYS[playIndex] : STILL_PLAY;
  const nextPlay = () => setPlayIndex((i) => (i + 1) % PLAYS.length);

  return (
    <figure className="min-w-0">
      <div ref={frame} role="img" aria-label={DESCRIPTION} className="relative aspect-[4/3] w-full bg-paper">
        {live ? (
          <CourtScene
            colors={colors}
            play={play}
            sample={sample}
            active={visible}
            maxDpr={touch ? 1 : 1.5}
            onPhase={setPhase}
            onPlayEnd={nextPlay}
          />
        ) : (
          <StillCourt />
        )}
      </div>
      <figcaption className="mt-3 flex items-start justify-between gap-4">
        <PlayTrace play={play} phase={live ? phase : Phase.Scored} />
        {live && (
          <button
            type="button"
            onClick={() => {
              nextPlay();
              setSample((n) => n + 1);
            }}
            className="meta flex-none cursor-pointer border border-ink px-2.5 py-1.5 text-[11px] text-ink"
          >
            Next question
          </button>
        )}
      </figcaption>
    </figure>
  );
}

/** The agent trace of the current play, filled in as the ball moves. */
function PlayTrace({ play, phase }: { play: Play; phase: Phase }) {
  const steps = [
    { at: Phase.ToAgents, text: `router → ${agentsText(play.agents)}` },
    { at: Phase.ToSynthesis, text: `${play.agents.length ? "agents" : "router"} → synthesis` },
    { at: Phase.Scored, text: "synthesis → answer, in the policyholder's language" },
  ];
  const latest = steps.findLast((step) => phase >= step.at);

  return (
    <div className="min-w-0 font-mono text-[11px] leading-relaxed">
      <p className="min-h-[3.2em] text-ink">“{play.question}”</p>
      <ol className="mt-1">
        {steps.map((step) => (
          <li
            key={step.at}
            className={phase < step.at ? "text-muted" : step === latest ? "text-ball-text" : "text-ink-2"}
          >
            {step.text}
          </li>
        ))}
      </ol>
    </div>
  );
}

function agentsText(agents: string[]) {
  if (agents.length === 0) return "no agent needed";
  return agents.length === 1 ? agents[0] : `${agents.join(" + ")}, in parallel`;
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
