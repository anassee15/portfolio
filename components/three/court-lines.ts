import * as THREE from "three";

/** Half-court markings drawn in black on white; the shader turns black into ink. */
export function createCourtLinesTexture() {
  const width = 1400;
  const height = 1000;
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;

  const ctx = canvas.getContext("2d")!;
  ctx.fillStyle = "#fff";
  ctx.fillRect(0, 0, width, height);
  ctx.strokeStyle = "#000";
  ctx.lineWidth = 9;
  ctx.lineCap = "round";

  // Boundary and key.
  ctx.strokeRect(60, 40, width - 120, height - 80);
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
  ctx.arc(700, height - 40, 180, Math.PI, 0);
  ctx.stroke();

  return new THREE.CanvasTexture(canvas);
}
