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
