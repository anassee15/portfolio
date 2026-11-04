/**
 * The basketball play acted out by EVA's architecture:
 * question → router (point guard) → 0 to n agents → synthesis → basket.
 * Pure geometry, no three.js, so it stays easy to read and tweak.
 */

export type Vec3 = [number, number, number];

export const HOOP_Z = -3.85;
export const ROUTER: Vec3 = [0, 0, 1.2];
export const SYNTHESIS: Vec3 = [0.9, 0, -2.7];

/** Seven specialised agents spread on an arc around the basket. */
export const AGENTS: Vec3[] = Array.from({ length: 7 }, (_, i) => {
  const angle = ((-72 + i * 24) * Math.PI) / 180;
  return [3.5 * Math.sin(angle), 0, HOOP_Z + 0.3 + 3.5 * Math.cos(angle)];
});

const ENTRY: Vec3 = [-6, 1, 4.2];
const RIM: Vec3 = [0, 2.75, HOOP_Z + 0.2];
const HAND_HEIGHT = 1.25;

/** Phase boundaries, in seconds: entry pass, to agents, to synthesis, shot, drop, pause. */
const PHASES = [1.1, 2.5, 3.9, 5.0, 5.5];
export const PLAY_DURATION = 6.2;

const hand = ([x, , z]: Vec3): Vec3 => [x, HAND_HEIGHT, z];

/** A pass from a to b: straight on the ground plane, with a parabolic lift of `lift`. */
function pass(a: Vec3, b: Vec3, t: number, lift: number): Vec3 {
  const k = Math.min(1, Math.max(0, t));
  return [
    a[0] + (b[0] - a[0]) * k,
    a[1] + (b[1] - a[1]) * k + Math.sin(Math.PI * k) * lift,
    a[2] + (b[2] - a[2]) * k,
  ];
}

/** Like the real router: it may call no agent at all, or up to three in parallel. */
export function pickAgents(random = Math.random): number[] {
  const count = Math.floor(random() * 4);
  const picked = new Set<number>();
  while (picked.size < count) picked.add(Math.floor(random() * AGENTS.length));
  return [...picked];
}

/** Positions of every ball in flight at time `t` (seconds since the play started). */
export function ballsAt(t: number, picked: number[]): Vec3[] {
  const [toRouter, toAgents, toSynthesis, shot, drop] = PHASES;
  const router = hand(ROUTER);
  const synthesis = hand(SYNTHESIS);

  if (t < toRouter) return [pass(ENTRY, router, t / toRouter, 1.2)];

  if (t < toSynthesis) {
    // With no agent called, the router passes straight to the synthesis.
    if (picked.length === 0) return [pass(router, synthesis, (t - toRouter) / (toSynthesis - toRouter), 0.8)];

    if (t < toAgents) {
      const k = ((t - toRouter) / (toAgents - toRouter)) * 1.15;
      return picked.map((i) => pass(router, hand(AGENTS[i]), k, 0.7));
    }
    const k = ((t - toAgents) / (toSynthesis - toAgents)) * 1.15;
    return picked.map((i) => pass(hand(AGENTS[i]), synthesis, k, 0.6));
  }

  if (t < shot) return [pass(synthesis, RIM, (t - toSynthesis) / (shot - toSynthesis), 1.6)];
  if (t < drop) return [[RIM[0], RIM[1] - (t - shot) * 4.5, RIM[2]]];
  return [];
}
