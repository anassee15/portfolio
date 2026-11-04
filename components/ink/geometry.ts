/** Small path helpers shared by the ink diagrams. */

export type Point = [number, number];

/** A straight segment from a to b, trimmed so it starts and ends at the circles' edges. */
export function link([x1, y1]: Point, [x2, y2]: Point, r1: number, r2: number) {
  const length = Math.hypot(x2 - x1, y2 - y1);
  const dx = (x2 - x1) / length;
  const dy = (y2 - y1) / length;
  return `M${x1 + dx * r1} ${y1 + dy * r1} L${x2 - dx * r2} ${y2 - dy * r2}`;
}

/** A small open arrowhead whose tip sits at `tip`, pointing in `direction`. */
export function arrowHead([x, y]: Point, direction: "right" | "left" | "up" | "down", size = 6) {
  const s = size;
  switch (direction) {
    case "right":
      return `M${x - s} ${y - s} L${x} ${y} L${x - s} ${y + s}`;
    case "left":
      return `M${x + s} ${y - s} L${x} ${y} L${x + s} ${y + s}`;
    case "up":
      return `M${x - s} ${y + s} L${x} ${y} L${x + s} ${y + s}`;
    case "down":
      return `M${x - s} ${y - s} L${x} ${y} L${x + s} ${y - s}`;
  }
}

/** A smooth curve through every point (Catmull-Rom turned into cubic Béziers), without the leading "M". */
export function smoothThrough(points: Point[]) {
  let d = "";
  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[i - 1] ?? points[i];
    const [x1, y1] = points[i];
    const [x2, y2] = points[i + 1];
    const p3 = points[i + 2] ?? points[i + 1];
    const c1 = [x1 + (x2 - p0[0]) / 6, y1 + (y2 - p0[1]) / 6];
    const c2 = [x2 - (p3[0] - x1) / 6, y2 - (p3[1] - y1) / 6];
    d += ` C${round(c1[0])} ${round(c1[1])}, ${round(c2[0])} ${round(c2[1])}, ${x2} ${y2}`;
  }
  return d;
}

const round = (n: number) => Math.round(n * 10) / 10;
