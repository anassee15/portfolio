/**
 * A real situation from the harness dataset ("crown or implant after a cavity"),
 * anonymised. EVA's wording is generic: no rates or limits from real plans.
 */

export type Message = { from: "policyholder" | "eva"; text: string };

export const conversation: Message[] = [
  { from: "policyholder", text: "I need to replace an old crown. Does my insurance pay for it?" },
  { from: "eva", text: "It depends on why it needs replacing. Was it caused by an accident, or by a cavity?" },
  { from: "policyholder", text: "A cavity. My dentist estimates about CHF 2,500." },
  {
    from: "eva",
    text: "Basic insurance doesn't cover dental care after a cavity. Your dental supplement pays part of it, up to its yearly limit. Do you want the details of your plan?",
  },
];

export const trajectory = [
  "guardrails, language detected: English",
  "router → coverage agent",
  "coverage agent: basic insurance, dental supplement",
  "synthesis → answer",
];

export const verdicts = [
  { claim: "Asked for the cause before answering", verdict: "expected" },
  { claim: "Basic insurance doesn't cover care after a cavity", verdict: "correct" },
  { claim: "The dental supplement pays part of it", verdict: "correct" },
];
