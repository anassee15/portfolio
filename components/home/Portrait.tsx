"use client";

import { useEffect, useRef, useState } from "react";
import { useCssVariables, useInView, usePageLoaded, usePrefersReducedMotion } from "@/lib/hooks";
import { useTheme } from "@/lib/theme";

// Same grid as the dot-screen files in /public/images, so the canvas takes over without a jump.
const COLS = 46;
const ROWS = 47;
const HOLD = 700; // ms the dot screen stays still before it starts to resolve
const DURATION = 1700; // ms

type Phase = "ink" | "playing" | "done";

/**
 * My Memoji next to my name. It first shows as a dot screen, like the players on the court,
 * then is denoised back to the original, cell by cell. The animation plays again each time the
 * portrait comes back on screen, and when it is hovered.
 * Without JavaScript the dot screen stays; with reduced motion the original shows at once.
 */
export function Portrait() {
  const frame = useRef<HTMLSpanElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const image = useRef<HTMLImageElement>(null);
  const visible = useInView(frame);
  const loaded = usePageLoaded();
  const reducedMotion = usePrefersReducedMotion();
  const dark = useTheme() === "dark";
  const colors = useCssVariables(["paper", "ink"] as const);
  const [phase, setPhase] = useState<Phase>("ink");
  const [run, setRun] = useState(0);

  useEffect(() => {
    const img = image.current;
    const cvs = canvas.current;
    if (reducedMotion || !loaded || !visible || !colors || !img || !cvs) return;

    let raf = 0;
    let timer = 0;
    let cancelled = false;

    img
      .decode()
      .then(() => {
        if (cancelled) return;
        const screen = createScreen(cvs, img, colors, dark);
        screen.draw(0, 0);
        setPhase("playing");

        timer = window.setTimeout(() => {
          const start = performance.now();
          const tick = (now: number) => {
            const progress = Math.min(1, (now - start) / DURATION);
            screen.draw(progress, now);
            if (progress < 1) raf = requestAnimationFrame(tick);
            else setPhase("done");
          };
          raf = requestAnimationFrame(tick);
        }, HOLD);
      })
      .catch(() => {});

    return () => {
      cancelled = true;
      clearTimeout(timer);
      cancelAnimationFrame(raf);
      // Back to the dot screen, ready for the next time it comes on screen.
      cvs.getContext("2d")?.clearRect(0, 0, cvs.width, cvs.height);
      setPhase("ink");
    };
  }, [reducedMotion, loaded, visible, colors, dark, run]);

  return (
    <span
      ref={frame}
      aria-hidden
      onPointerEnter={() => phase === "done" && setRun((n) => n + 1)}
      className="absolute bottom-[0.04em] left-full ml-[0.14em] block aspect-[46/47] h-[1.2em]"
    >
      <span className={phase === "ink" ? "motion-reduce:hidden" : "hidden"}>
        <InkScreen theme="light" className="dark:hidden" />
        <InkScreen theme="dark" className="hidden dark:block" />
      </span>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        ref={image}
        src="/images/memoji-wave.webp"
        alt=""
        width={353}
        height={360}
        className={`absolute inset-0 h-full w-full max-w-none motion-reduce:opacity-100 ${phase === "ink" ? "opacity-0" : ""}`}
      />
      <canvas ref={canvas} className="pointer-events-none absolute inset-0 h-full w-full" />
    </span>
  );
}

/** The static dot screen, drawn in ink through a mask: dots follow the shadows on paper, the lights on a dark page. */
function InkScreen({ theme, className }: { theme: "light" | "dark"; className: string }) {
  const mask = `url(/images/memoji-ink-${theme}.svg)`;
  return (
    <span
      className={`absolute inset-0 bg-ink [mask-repeat:no-repeat] [mask-size:100%_100%] ${className}`}
      style={{ maskImage: mask, WebkitMaskImage: mask }}
    />
  );
}

/** Reads the picture's tones on the grid and returns a painter for the dot screen that covers it. */
function createScreen(canvas: HTMLCanvasElement, img: HTMLImageElement, colors: { paper: string; ink: string }, dark: boolean) {
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  const { width, height } = canvas.getBoundingClientRect();
  canvas.width = Math.round(width * dpr);
  canvas.height = Math.round(height * dpr);
  const ctx = canvas.getContext("2d")!;
  ctx.scale(dpr, dpr);
  const cw = width / COLS;
  const ch = height / ROWS;

  const dots = readDots(img, dark);
  // Each cell resolves at its own random moment, so the picture comes back everywhere at once.
  const resolveAt = Float32Array.from({ length: COLS * ROWS }, () => Math.random());

  return {
    draw(progress: number, time: number) {
      ctx.clearRect(0, 0, width, height);
      const eased = 1 - Math.pow(1 - progress, 2);
      const reroll = Math.floor(time / 70);
      // The dots boil while the picture resolves, and are still at both ends.
      const boil = Math.sin(Math.PI * Math.min(1, progress * 1.15)) * 0.9;
      const unresolved: number[] = [];
      for (let i = 0; i < dots.length; i++) if (dots[i] >= 0 && resolveAt[i] >= eased) unresolved.push(i);

      ctx.fillStyle = colors.paper;
      for (const i of unresolved) {
        ctx.fillRect((i % COLS) * cw - 0.5, Math.floor(i / COLS) * ch - 0.5, cw + 1, ch + 1);
      }

      ctx.fillStyle = colors.ink;
      ctx.beginPath();
      for (const i of unresolved) {
        const radius = dots[i] * cw * (1 + boil * (hash(i, reroll) - 0.5) * 2);
        if (radius < 0.15) continue;
        const x = (i % COLS) * cw + cw / 2;
        const y = Math.floor(i / COLS) * ch + ch / 2;
        ctx.moveTo(x + radius, y);
        ctx.arc(x, y, radius, 0, Math.PI * 2);
      }
      ctx.fill();
    },
  };
}

/** One dot radius per cell, as a fraction of the cell; -1 outside the figure, 0 on its soft edge. */
function readDots(img: HTMLImageElement, dark: boolean) {
  const sample = document.createElement("canvas");
  sample.width = COLS;
  sample.height = ROWS;
  const ctx = sample.getContext("2d", { willReadFrequently: true })!;
  ctx.drawImage(img, 0, 0, COLS, ROWS);
  const { data } = ctx.getImageData(0, 0, COLS, ROWS);

  const tones = new Float32Array(COLS * ROWS).fill(-1);
  let low = 1;
  let high = 0;
  for (let i = 0; i < tones.length; i++) {
    const alpha = data[i * 4 + 3] / 255;
    if (alpha < 0.12) continue;
    const tone = (0.2126 * data[i * 4] + 0.7152 * data[i * 4 + 1] + 0.0722 * data[i * 4 + 2]) / 255;
    tones[i] = alpha < 0.5 ? -2 : tone;
    if (alpha >= 0.5) {
      low = Math.min(low, tone);
      high = Math.max(high, tone);
    }
  }
  return tones.map((tone) => {
    if (tone === -1) return -1;
    if (tone === -2) return 0;
    const t = (tone - low) / (high - low || 1);
    return 0.14 + 0.36 * Math.pow(dark ? t : 1 - t, 0.85);
  });
}

/** Cheap deterministic pseudo-random in [0, 1). */
function hash(i: number, seed: number) {
  const x = Math.sin(i * 127.1 + seed * 311.7) * 43758.5453;
  return x - Math.floor(x);
}
