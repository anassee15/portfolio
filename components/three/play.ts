/**
 * A multi-agent system played as a basketball set, with a real five:
 * the point guard is the router, three wings are specialised agents,
 * the center is the synthesis agent who scores the answer.
 * Pure geometry and data, no three.js.
 */

export type Vec3 = [number, number, number];

/** A request and the agents the router calls for it (0 to 3, in parallel). */
export type Play = { question: string; agents: string[] };

export const PLAYS: Play[] = [
  { question: "Find a ramen place near the station, and check whether I'm free at noon.", agents: ["search", "calendar"] },
  { question: "Why does this test fail?", agents: ["code"] },
  {
    question: "What's the weather in Lausanne, when is my next meeting, and what's in the news?",
    agents: ["weather", "calendar", "news"],
  },
  { question: "Summarise this 40-page report in five bullet points.", agents: ["documents"] },
  { question: "Thanks, that's all!", agents: [] },
];

export const HOOP_Z = -3.85;
export const ROUTER: Vec3 = [0, 0, 1.6];
export const SYNTHESIS: Vec3 = [1, 0, -2.7];
/** Spots for the agents: left wing, right wing, left corner. */
export const WINGS: Vec3[] = [
  [-3.3, 0, -0.5],
  [3.3, 0, -0.5],
  [-4.9, 0, -3.3],
];

export const ENTRY: Vec3 = [-6, 1, 4.2];
export const RIM: Vec3 = [0, 2.75, HOOP_Z + 0.2];
const HAND_HEIGHT = 1.25;

/** What the play is doing, step by step. */
export enum Phase {
  Question,
  ToAgents,
  ToSynthesis,
  Shot,
  Scored,
}

/** Start time of each phase, in seconds. */
const STARTS = [0, 1.1, 2.6, 4.1, 5.2];
export const PLAY_DURATION = 7;

export function phaseAt(t: number): Phase {
  let phase = Phase.Question;
  STARTS.forEach((start, i) => {
    if (t >= start) phase = i;
  });
  return phase;
}

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

/** Positions of every ball in flight at time `t`, with `agents` wings called. */
export function ballsAt(t: number, agents: number): Vec3[] {
  const [, toAgents, toSynthesis, shot, scored] = STARTS;
  const router = hand(ROUTER);
  const synthesis = hand(SYNTHESIS);
  const wings = WINGS.slice(0, agents).map(hand);

  if (t < toAgents) return [pass(ENTRY, router, t / toAgents, 1.2)];

  if (t < shot) {
    // With no agent called, the router passes straight to the synthesis.
    if (agents === 0) return [pass(router, synthesis, (t - toAgents) / (shot - toAgents), 0.8)];
    if (t < toSynthesis) {
      const k = ((t - toAgents) / (toSynthesis - toAgents)) * 1.15;
      return wings.map((wing) => pass(router, wing, k, 0.7));
    }
    const k = ((t - toSynthesis) / (shot - toSynthesis)) * 1.15;
    return wings.map((wing) => pass(wing, synthesis, k, 0.6));
  }

  if (t < scored) return [pass(synthesis, RIM, (t - shot) / (scored - shot), 1.6)];
  if (t < scored + 0.5) return [[RIM[0], RIM[1] - (t - scored) * 4.5, RIM[2]]];
  return [];
}

/** Which player holds or is about to receive the ball: "router", "synthesis", a wing index, or none. */
export function activePlayers(phase: Phase, agents: number): ("router" | "synthesis" | number)[] {
  if (phase === Phase.Question) return ["router"];
  if (phase === Phase.ToAgents) return agents ? [...Array(agents).keys()] : ["synthesis"];
  if (phase === Phase.ToSynthesis || phase === Phase.Shot) return ["synthesis"];
  return [];
}
