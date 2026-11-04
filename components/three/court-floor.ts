import * as THREE from "three";
import { ENTRY, Phase, ROUTER, SYNTHESIS, WINGS, type Vec3 } from "./play";

/**
 * The floor is a canvas texture: court markings plus the play drawn like a coach's
 * playbook (dashed arrows for passes, a curve for the shot). Black on white;
 * the shader turns black into ink.
 */

const WIDTH = 1400;
const HEIGHT = 1000;
const PX_PER_UNIT = 100; // the floor plane is 14 × 10 world units
const PLAYER_GAP = 50; // arrows stop short of the players

/** World (x, z) on the floor → canvas pixels. */
const toCanvas = ([x, , z]: Vec3): [number, number] => [(x + 7) * PX_PER_UNIT, (z + 5) * PX_PER_UNIT];

function drawMarkings(ctx: CanvasRenderingContext2D) {
  ctx.fillStyle = "#fff";
  ctx.fillRect(0, 0, WIDTH, HEIGHT);
  ctx.strokeStyle = "#000";
  ctx.lineWidth = 9;
  ctx.lineCap = "round";
  ctx.setLineDash([]);

  // Boundary and key.
  ctx.strokeRect(60, 40, WIDTH - 120, HEIGHT - 80);
  ctx.strokeRect(455, 40, 490, 560);

  // Free-throw circle.
  ctx.beginPath();
  ctx.arc(700, 600, 180, 0, Math.PI);
  ctx.stroke();

  // Three-point line.
  ctx.beginPath();
  ctx.moveTo(140, 40);
  ctx.lineTo(140, 300);
  ctx.arc(700, 140, 590, Math.PI - 0.28, 0.28, true);
  ctx.lineTo(1260, 40);
  ctx.stroke();

  // Centre circle.
  ctx.beginPath();
  ctx.arc(700, HEIGHT - 40, 180, Math.PI, 0);
  ctx.stroke();
}

/** A pass in playbook notation: dashed line with an arrowhead, trimmed at both ends. */
function drawPass(ctx: CanvasRenderingContext2D, from: Vec3, to: Vec3) {
  const [x1, y1] = toCanvas(from);
  const [x2, y2] = toCanvas(to);
  const angle = Math.atan2(y2 - y1, x2 - x1);
  const sx = x1 + Math.cos(angle) * PLAYER_GAP;
  const sy = y1 + Math.sin(angle) * PLAYER_GAP;
  const ex = x2 - Math.cos(angle) * PLAYER_GAP;
  const ey = y2 - Math.sin(angle) * PLAYER_GAP;

  ctx.lineWidth = 7;
  ctx.setLineDash([20, 16]);
  ctx.beginPath();
  ctx.moveTo(sx, sy);
  ctx.lineTo(ex, ey);
  ctx.stroke();

  ctx.setLineDash([]);
  ctx.beginPath();
  ctx.moveTo(ex, ey);
  ctx.lineTo(ex - Math.cos(angle - 0.45) * 34, ey - Math.sin(angle - 0.45) * 34);
  ctx.lineTo(ex - Math.cos(angle + 0.45) * 34, ey - Math.sin(angle + 0.45) * 34);
  ctx.closePath();
  ctx.fillStyle = "#000";
  ctx.fill();
}

/** The shot: a solid curve from the synthesis to the basket. */
function drawShot(ctx: CanvasRenderingContext2D) {
  const [x1, y1] = toCanvas(SYNTHESIS);
  ctx.lineWidth = 7;
  ctx.setLineDash([]);
  ctx.beginPath();
  ctx.moveTo(x1 - PLAYER_GAP * 0.6, y1 - PLAYER_GAP * 0.8);
  ctx.quadraticCurveTo(x1 - 40, 130, 720, 128);
  ctx.stroke();
}

export function createCourtFloor() {
  const canvas = document.createElement("canvas");
  canvas.width = WIDTH;
  canvas.height = HEIGHT;
  const ctx = canvas.getContext("2d")!;
  const texture = new THREE.CanvasTexture(canvas);

  /** Redraws the markings plus every pass already made at this phase. */
  function drawPlay(agents: number, phase: Phase) {
    drawMarkings(ctx);
    const wings = WINGS.slice(0, agents);
    if (phase >= Phase.ToAgents) drawPass(ctx, ENTRY, ROUTER);
    if (agents === 0 && phase >= Phase.Shot) drawPass(ctx, ROUTER, SYNTHESIS);
    if (phase >= Phase.ToSynthesis) wings.forEach((wing) => drawPass(ctx, ROUTER, wing));
    if (phase >= Phase.Shot) wings.forEach((wing) => drawPass(ctx, wing, SYNTHESIS));
    if (phase >= Phase.Scored) drawShot(ctx);
    texture.needsUpdate = true;
  }

  drawPlay(0, Phase.Question);
  return { texture, drawPlay };
}
