---
headline: "EVA, and the harness"
meta: "Groupe Mutuel · Aug 2025 – Feb 2027 · core contributor, harness built solo"
lede: "An assistant in the mobile app that answers policyholders about what their plan covers, in four languages. And the tool I built to prove it answers right, every time."
---

## The situation

EVA is multi-agent, multi-turn, in four languages, across dozens of products and plan levels. An answer that is right for one level can be wrong for another. The old check looked at one answer, one message, once. Models changed often, with no reliable way to catch regressions.

## The system

Each question goes through guardrails, then a router that calls zero to n specialised agents in parallel, then a synthesis agent that answers in the policyholder's language. A coverage question takes about ten LLM calls, and every call is traced with its cost and latency. We shipped 25 releases of this architecture in about 14 months.

## The harness

- A simulated policyholder with a goal, a persona, and facts it only reveals when asked.
- Each situation is played with every relevant product, a level that doesn't cover it, and a product that covers nothing, so refusals are tested as much as answers.
- Judges are calibrated before their scores count. Every run is reproducible: code, documents and dataset are fingerprinted.

## Results

The harness itself: 219 tests, 125 situations × 30 products, 4 languages, 8 personas, built solo in about six weeks. It catches regressions and gates feature rollouts in production.

## Try it

A real test situation from the harness, anonymised. The simulated policyholder knows things EVA has to ask for.

## What I learned

The judges were wrong before EVA was: calibration showed they flagged the standard texts EVA adds to its answers as unsourced. We fixed the judges before trusting a single score.
