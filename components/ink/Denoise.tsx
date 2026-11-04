"use client";

import { useEffect, useRef, useState } from "react";
import { useCssVariables, useInView, usePrefersReducedMotion } from "@/lib/hooks";

const CELL = 5; // CSS pixels, same screentone grid as the 3D court
const DURATION = 1300; // ms

/**
 * Shows its children (an ink drawing) as if sampled from noise: a canvas of random
 * screentone dots covers the drawing and dissolves, cell by cell, the first time it
 * enters the viewport. The drawing itself is plain HTML/SVG underneath, so it is
 * readable without JavaScript and with reduced motion.
 */
export function Denoise({ children }: { children: React.ReactNode }) {
  const frame = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const inView = useInView(frame, { rootMargin: "-10% 0px", once: true });
  const reducedMotion = usePrefersReducedMotion();
  const colors = useCssVariables(["paper", "ink"] as const);
  const [done, setDone] = useState(false);

  // Cover the drawing with noise as soon as possible, then dissolve it once in view.
  useEffect(() => {
    if (reducedMotion || done || !colors || !canvas.current) return;
    const noise = createNoise(canvas.current, colors);
    noise.draw(0, 0);
    if (!inView) return;

    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const progress = Math.min(1, (now - start) / DURATION);
      noise.draw(progress, now);
      if (progress < 1) raf = requestAnimationFrame(tick);
      else setDone(true);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [reducedMotion, done, colors, inView]);

  return (
    <div ref={frame} className="relative">
      {children}
      {!reducedMotion && !done && (
        <canvas ref={canvas} aria-hidden className="pointer-events-none absolute inset-0 h-full w-full" />
      )}
    </div>
  );
}

function createNoise(canvas: HTMLCanvasElement, colors: { paper: string; ink: string }) {
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  const { width, height } = canvas.getBoundingClientRect();
  canvas.width = Math.round(width * dpr);
  canvas.height = Math.round(height * dpr);
  const ctx = canvas.getContext("2d")!;
  ctx.scale(dpr, dpr);

  const cols = Math.ceil(width / CELL);
  const rows = Math.ceil(height / CELL);
  // Each cell resolves at its own random moment, so the drawing emerges everywhere at once.
  const resolveAt = Float32Array.from({ length: cols * rows }, () => Math.random());

  return {
    draw(progress: number, time: number) {
      ctx.clearRect(0, 0, width, height);
      const eased = 1 - Math.pow(1 - progress, 2);
      const reroll = Math.floor(time / 70);
      const unresolved: number[] = [];
      for (let i = 0; i < resolveAt.length; i++) if (resolveAt[i] >= eased) unresolved.push(i);

      // Unresolved cells hide the drawing with paper, then get a random dot of ink.
      ctx.fillStyle = colors.paper;
      for (const i of unresolved) ctx.fillRect((i % cols) * CELL, Math.floor(i / cols) * CELL, CELL, CELL);

      ctx.fillStyle = colors.ink;
      ctx.beginPath();
      for (const i of unresolved) {
        const r = hash(i, reroll);
        const radius = r * r * CELL * 0.5;
        if (radius < 0.3) continue;
        const x = (i % cols) * CELL + CELL / 2;
        const y = Math.floor(i / cols) * CELL + CELL / 2;
        ctx.moveTo(x + radius, y);
        ctx.arc(x, y, radius, 0, Math.PI * 2);
      }
      ctx.fill();
    },
  };
}

/** Cheap deterministic pseudo-random in [0, 1). */
function hash(i: number, seed: number) {
  const x = Math.sin(i * 127.1 + seed * 311.7) * 43758.5453;
  return x - Math.floor(x);
}
