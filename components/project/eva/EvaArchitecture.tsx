import { EvaBrain } from "@/components/ink/diagrams/EvaBrain";
import { type Block, Card, Layer } from "./blocks";

/**
 * EVA's architecture in four layers, after the Groupe Mutuel poster.
 * Written in HTML rather than SVG so the text stays readable at any width.
 * Internal system names are replaced by generic ones; `mine` marks my own work.
 */

const CHANNEL: Block[] = [
  { icon: "phone", kicker: "channel", title: "Mobile app", text: "iOS and Android. Where 115,000 policyholders ask their questions." },
  { icon: "fastapi", kicker: "backend", title: "API", text: "FastAPI, async Python. Answers are streamed." },
];

const BRAIN_LEFT: Block[] = [
  { icon: "openai", kicker: "reasoning", title: "LLMs", text: "GPT models on a public cloud. Every agent runs on them." },
  { icon: "search", kicker: "knowledge", title: "Search index", text: "General terms, business rules, knowledge base." },
  { icon: "archive", kicker: "memory", title: "Object storage", text: "The history of every conversation." },
];

const BRAIN_RIGHT: Block[] = [
  { icon: "network", kicker: "business system", title: "Policy API", text: "Deductible, plan, premiums, invoices." },
  { icon: "database", kicker: "policyholder data", title: "Database", text: "The source of truth." },
];

const STEERING: Block[] = [
  { icon: "trace", kicker: "observability", title: "Langfuse", text: "Every LLM call, agent and tool traced, with cost and latency.", mine: true },
  { icon: "clipboard", kicker: "evaluation", title: "The harness", text: "Simulated policyholders, calibrated judges, pass^k. Gates feature rollouts.", mine: true },
  { icon: "databricks", kicker: "data", title: "Databricks", text: "Nightly ETL of the traces; questions grouped by topic with BERTopic.", mine: true },
  { icon: "review", kicker: "improvement", title: "Expert review", text: "Business experts review conversations and flag errors; dashboards in Power BI." },
];

const FOUNDATION: Block[] = [
  { icon: "kubernetes", kicker: "runtime", title: "Kubernetes", text: "Everything above runs in containers, on a public cloud." },
  { icon: "gitlab", kicker: "delivery", title: "GitLab CI/CD", text: "Lint, types, tests, images. Dev → int → staging → prod, plus a preview per branch." },
  { icon: "pulse", kicker: "health", title: "Golden questions", text: "A pod stays out of rotation until its latency is back under the threshold.", mine: true },
];

const AGENT_ROLES = ["coverage", "therapists", "self-service", "contact", "info", "premiums", "offers"];

export function EvaArchitecture() {
  return (
    <figure className="@container">
      <div className="grid gap-6">
        <Layer index={1} name="Channel">
          <div className="grid gap-3 @lg:grid-cols-[1fr_auto_1fr] @lg:items-center">
            <Card {...CHANNEL[0]} />
            <span className="hidden text-muted @lg:block" aria-hidden>
              →
            </span>
            <Card {...CHANNEL[1]} />
          </div>
        </Layer>

        <Layer index={2} name="Brain">
          <div className="grid gap-3 @3xl:grid-cols-[1fr_1.7fr_1fr]">
            <div className="order-2 grid gap-3 @lg:grid-cols-3 @3xl:order-1 @3xl:grid-cols-1">
              {BRAIN_LEFT.map((block) => (
                <Card key={block.title} {...block} />
              ))}
            </div>

            <div className="order-1 border-2 border-ink bg-paper p-4 @3xl:order-2">
              <p className="font-display text-[34px] leading-none font-black">EVA</p>
              <p className="mt-2 text-[13px] leading-snug text-ink-2">
                <span className="text-ball-text">●</span> Guardrails and language detection first
                <span className="sr-only"> (my work)</span>. Then a router calls 0 to n of 7 specialised agents, in
                parallel, and a synthesis agent writes one answer in the policyholder&apos;s language.
              </p>
              <div className="mx-auto mt-3 max-w-[420px]">
                <EvaBrain />
              </div>
              <p className="meta mt-2 text-[11px]">7 agents: {AGENT_ROLES.join(" · ")}</p>
            </div>

            <div className="order-3 grid content-start gap-3 @lg:grid-cols-2 @3xl:grid-cols-1">
              {BRAIN_RIGHT.map((block) => (
                <Card key={block.title} {...block} />
              ))}
            </div>
          </div>
        </Layer>

        <Layer index={3} name="Steering">
          <div className="grid gap-3 @lg:grid-cols-2 @3xl:grid-cols-4">
            {STEERING.map((block) => (
              <Card key={block.title} {...block} />
            ))}
          </div>
        </Layer>

        <Layer index={4} name="Foundation">
          <div className="grid gap-3 @lg:grid-cols-3">
            {FOUNDATION.map((block) => (
              <Card key={block.title} {...block} />
            ))}
          </div>
        </Layer>
      </div>

      <figcaption className="meta mt-4 text-[11px]">
        <span className="text-ball-text">●</span> my work. After the Groupe Mutuel poster, Oct 2026; internal names
        left out.
      </figcaption>
    </figure>
  );
}
