---
headline: "Agentic evaluation"
meta: "Groupe Mutuel · Apr – Nov 2026 · built solo"
lede: "EVA answers policyholders about their health insurance, in four languages. A demo shows it can answer right. I built the harness that checks it answers right every time, before a release reaches them."
---

## The situation

EVA is multi-agent, multi-turn, in four languages, across dozens of products and plan levels. An answer that is right for one level can be wrong for another. The old check looked at one answer, one message, once. Models changed often, with no reliable way to catch regressions.

## The system

- **A simulated policyholder** with a goal, a persona, and facts it only reveals when asked, talks turn after turn with the real EVA. A separate goal agent only decides when the conversation is over.
- **Simulation and judging are decoupled**, so a run can be judged again without simulating again. If the simulated policyholder invents a fact, the conversation is excluded, not counted as EVA's failure.
- **The LLM classifies, the code scores.** Judges give a typed verdict per claim (correct, contradiction, invented figure, unjustified refusal…), and Python turns them into a score from a penalty table. A human review updates the score without calling an LLM again.
- **Products are crossed.** Each situation is played with every relevant product, a level that doesn't cover it, and a product that covers nothing, so refusals are tested as much as answers.
- **Reliability, not just success.** Each situation runs k times and the harness reports pass^k, not only pass@k. Every run is reproducible: commit, fingerprints of the code and documents, hash of the dataset.

## Results

219 tests, 7,579 lines of Python, and an Evaluation Lab (React / TS, 8 pages) to browse runs, conversations and verdicts, with an Arena where the business teams compare two deployments blind. The harness catches regressions and gates feature rollouts in production.

## Try it

A real test situation from the harness. The simulated policyholder knows things EVA has to ask for, then judges check every claim of the answer.

## What I learned

The judges were wrong before EVA was: calibration showed they flagged the standard texts EVA adds to its answers as unsourced. We fixed the judges before trusting a single score.

## What's next

My master thesis uses this harness to answer one question: for each of EVA's agents, how little adaptation does an open-weight model need to match the proprietary one?
