---
headline: "EVA, an agent in production"
meta: "Groupe Mutuel · Aug 2025 – Feb 2027 · core contributor, team of about 8"
lede: "EVA is the conversational agent of Groupe Mutuel, a Swiss health insurer. In the mobile app, it answers policyholders about what their plan covers, in four languages. I worked on the agents, and on getting them into production and keeping them there."
---

## The situation

A policyholder wants to know whether their plan covers a crown or a physiotherapist. The answer depends on the product, the plan level and the general terms, in four languages, across dozens of products. An answer that is right for one level can be wrong for another.

## The system

Each question goes through guardrails and language detection, then a router that calls zero to n of seven specialised agents in parallel, then a synthesis agent that answers in the policyholder's language. A coverage question takes about ten LLM calls.

## In production

- **Delivery.** GitLab CI/CD (lint, types, tests, images) across four environments, plus a preview per branch; everything runs in Docker on Azure Kubernetes Service. I led releases with the business teams, and the debugging in production.
- **Health.** I added a check on golden questions: a pod stays out of rotation until its latency is back under the threshold.
- **Observability.** I traced every LLM call, agent and tool in Langfuse, with its cost and latency, and built the nightly ETL that loads the traces into Databricks, where questions are grouped by topic with BERTopic.
- We shipped 25 releases of this architecture in about 14 months.

## Results

More than 200,000 conversations so far.

## How we know it works

Every release has to answer right, and keep answering right. I built the harness that checks it, alone: [Agentic evaluation →](/projects/agent-evaluation)
