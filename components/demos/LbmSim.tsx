"use client";

import { useEffect, useRef, useState } from "react";
import { useCssVariables, useInView, usePrefersReducedMotion } from "@/lib/hooks";
import { NX, NY } from "./lbm/config";
import { createSolver, hexToRgb, type Solver } from "./lbm/solver";

const STEPS_PER_FRAME = 8;
const WARM_UP = 30000; // steps until the vortex street has formed
const WARM_CHUNK = 1000; // warm-up steps per frame: a short fast-forward, never one long block
const CELL = 5; // CSS pixels per screentone dot, as in the other drawings

/**
 * Flow past a cylinder, simulated live on the visitor's GPU. Dragging across it stirs the flow.
 * It runs only while on screen; with reduced motion it waits for Play.
 */
export function LbmSim() {
  const frame = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const solver = useRef<Solver | null>(null);
  const pointer = useRef<{ x: number; y: number } | null>(null);
  const warmUpLeft = useRef(WARM_UP);
  const inView = useInView(frame, { rootMargin: "100px" });
  const reducedMotion = usePrefersReducedMotion();
  const colors = useCssVariables(["paper", "ink", "ball"] as const);
  const [supported, setSupported] = useState(true);
  const [playing, setPlaying] = useState<boolean | null>(null);
  const [epoch, setEpoch] = useState(0); // bumped on restart, so a paused view redraws
  const running = (playing ?? !reducedMotion) && inView;

  // Create the solver once.
  useEffect(() => {
    const element = canvas.current;
    if (!element) return;
    const created = createSolver(element);
    if (!created) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- feature detection, after mount
      setSupported(false);
      return;
    }
    solver.current = created;
    return () => {
      created.dispose();
      solver.current = null;
    };
  }, []);

  // While on screen: finish the warm-up (drawn only if animating), then step and draw every frame.
  useEffect(() => {
    const element = canvas.current;
    const sim = solver.current;
    if (!element || !sim || !colors) return;
    const palette = { paper: hexToRgb(colors.paper), ink: hexToRgb(colors.ink), ball: hexToRgb(colors.ball) };
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const draw = () => {
      // Resizing clears the canvas, so only when its size really changed.
      const { width, height } = element.getBoundingClientRect();
      const w = Math.round(width * dpr);
      const h = Math.round(height * dpr);
      if (element.width !== w || element.height !== h) {
        element.width = w;
        element.height = h;
      }
      sim.draw(palette, CELL * dpr);
    };

    if (!inView) return;
    let raf = 0;
    const tick = () => {
      if (warmUpLeft.current > 0) {
        const steps = Math.min(warmUpLeft.current, WARM_CHUNK);
        sim.step(steps);
        warmUpLeft.current -= steps;
      } else if (running) {
        sim.step(STEPS_PER_FRAME);
      } else {
        draw();
        return;
      }
      if (running) draw();
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, running, colors, epoch]);

  const onPointerMove = (event: React.PointerEvent<HTMLCanvasElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    // Lattice coordinates; the canvas draws y upwards.
    const x = ((event.clientX - rect.left) / rect.width) * NX;
    const y = (1 - (event.clientY - rect.top) / rect.height) * NY;
    const last = pointer.current;
    if (last) solver.current?.stir(x, y, (x - last.x) * 0.02, (y - last.y) * 0.02);
    pointer.current = { x, y };
  };

  if (!supported) {
    return (
      <p className="meta border border-rule p-4">
        This browser cannot run the simulation (it needs WebGL 2 with float textures).
      </p>
    );
  }

  return (
    <figure ref={frame}>
      <div className="relative border border-rule" style={{ aspectRatio: `${NX} / ${NY}` }}>
        <canvas
          ref={canvas}
          className="h-full w-full touch-pan-y"
          role="img"
          aria-label="A live fluid simulation: flow from left to right past a cylinder, leaving a street of alternating vortices, drawn as ink and orange dots."
          onPointerMove={onPointerMove}
          onPointerLeave={() => (pointer.current = null)}
        />
      </div>
      <div className="mt-2 flex flex-wrap items-baseline gap-x-4 gap-y-1">
        <button type="button" onClick={() => setPlaying(!running)} className="link text-sm">
          {running ? "Pause" : "Play"}
        </button>
        <button
          type="button"
          onClick={() => {
            solver.current?.reset();
            setEpoch(epoch + 1);
          }}
          className="link text-sm"
        >
          Restart
        </button>
        <figcaption className="meta text-[11px]">
          D2Q9 on your GPU, {NX} × {NY} cells. Ink and orange: the two spins of the vorticity.
        </figcaption>
      </div>
    </figure>
  );
}
