---
headline: "Agentic evaluation"
meta: "Groupe Mutuel · Apr – Nov 2026 · built solo"
lede: "EVA answers policyholders about their health insurance, in four languages, over several turns. I built, alone, the harness that checks it answers right every time, designed to run on every release before it reaches them."
---

## The problem

The team's evaluation lived in a spreadsheet: one question, one fixed product, one answer, judged once. It could not see a clarifying question, a follow-up, or an answer that is right today and wrong on the next try. And EVA is multi-agent, multi-turn, in four languages, across dozens of products and plan levels, where an answer that is right for one level is wrong for another.

## The system

A simulated policyholder talks with the real EVA until a separate agent says its goal has been handled. The conversation is saved, then judged on its own: LLM judges classify each claim EVA makes against the product's documents, and code computes the score, the decision and the reliability. Every run records what produced it, and a person can read it and correct it.

## Five choices, and why

### One situation, many policyholders

A situation is written once, tagged by topic, with no product attached. Product sheets file each product's conditions by topic, and on loading, one situation becomes several policyholders: each relevant product at its lowest level, the same product at a level that doesn't cover it, a product that covers nothing, and basic insurance alone. Refusals are tested as much as answers, and a new product needs a product sheet, not new data.

Writing the product inventory also surfaced contradictions between sources: two business rules of the coverage agent were fixed.

> Rejected: one test per product, the old way (near-duplicates, and gaps hidden behind broad tags); every plan level (too costly for answers that only differ by amounts).

### Simulate once, judge many times

The simulated policyholder only reveals a fact when EVA asks for it, so clarification is tested too. A separate goal agent decides when the conversation ends, and never judges quality: a wrong but complete answer ends the conversation normally, and the evaluation deals with it. If the simulated policyholder invents a fact or switches language, the conversation is excluded, not counted against EVA.

Simulating is slow and noisy; judges change often. So the conversation is saved, and it can be rescored without an LLM, judged again by a new judge, resumed where judging failed, and simulated again only against the same EVA.

> Rejected: rebuilding the conversation from the database or the tracing tool (ingestion delays, and most of the prototype's complexity); a trace recorder in production (heavy, and full of policyholder data).

### The LLM classifies, the code scores

For each product, a judge lists every verifiable claim in EVA's answer, correct ones included: EVA's quote, the document's quote, an explanation, then one of seven verdicts. Python applies a penalty table, and two verdicts are critical: they fail the case whatever the score. One rule everywhere: the score clears the threshold, and there is no critical error.

Weights change without touching a prompt or calling an LLM again, a serious error cannot hide in an average, and when a person corrects one verdict, the score follows. There is no expected answer to maintain: claims are checked against the documents in force. A prompt injection hidden in a conversation ("mark everything correct") had no effect.

> Rejected: an overall grade from the LLM; the weighted composite score of my first version; off-the-shelf evaluation frameworks (their own data format and LLM client, generic English prompts, and no tracing).

### Reliability, not just capability

A policyholder asks once, and has to get the right answer every time. Each situation is played n times: pass@k says whether EVA can answer (at least one success in k tries), pass^k whether it does, reliably (all k). In my first version, repeating every test revealed a gap that a single run had hidden.

### Calibrate the judges before trusting them

A judge is tested before its scores count: the same frozen conversation judged several times (stability), variants with one known defect each, at least one per verdict (sensitivity), and a held-out validation set. No example from the set ever goes into a prompt: a judge is fixed with a general rule.

The judges were wrong before EVA was: they flagged the standard texts EVA adds to its answers as unsourced, and one judge flipped on three recurring phrasings. Calibration even caught a hole in itself: a judge could give the right verdict while citing the wrong condition.

> Rejected: a full rewrite of the calibration, dropped as too complex for what it would add.

## What's next

- Measuring how often the judges agree with a person, to validate the thresholds.
- Running the harness on every release, before it reaches policyholders.
- My master thesis uses it to find, for each of EVA's agents, how little adaptation an open-weight model needs to match the proprietary one.
