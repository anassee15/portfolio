import { EvaBrain } from "@/components/ink/diagrams/EvaBrain";

/**
 * EVA's architecture in four layers, after the Groupe Mutuel poster.
 * Written in HTML rather than SVG so the text stays readable at any width.
 * Internal system names are replaced by generic ones; `mine` marks my own work.
 */

type Block = { kicker: string; title: string; text: string; mine?: boolean };

const CHANNEL: Block[] = [
  { kicker: "channel", title: "Mobile app", text: "iOS and Android. Where 115,000 policyholders ask their questions." },
  { kicker: "backend", title: "API", text: "FastAPI, async Python. Answers are streamed." },
];

const BRAIN_LEFT: Block[] = [
  { kicker: "reasoning", title: "LLMs", text: "GPT models on a public cloud. Every agent runs on them." },
  { kicker: "knowledge", title: "Search index", text: "General terms, business rules, knowledge base." },
  { kicker: "memory", title: "Object storage", text: "The history of every conversation." },
];

const BRAIN_RIGHT: Block[] = [
  { kicker: "business system", title: "Policy API", text: "Deductible, plan, premiums, invoices." },
  { kicker: "policyholder data", title: "Database", text: "The source of truth." },
];

const STEERING: Block[] = [
  { kicker: "observability", title: "Langfuse", text: "Every LLM call, agent and tool traced, with cost and latency.", mine: true },
  { kicker: "evaluation", title: "The harness", text: "Simulated policyholders, calibrated judges, pass^k. Gates feature rollouts.", mine: true },
  { kicker: "data", title: "Databricks", text: "Nightly ETL of the traces; questions grouped by topic with BERTopic.", mine: true },
  { kicker: "improvement", title: "Expert review", text: "Business experts review conversations and flag errors; dashboards in Power BI." },
];

const FOUNDATION: Block[] = [
  { kicker: "runtime", title: "Kubernetes", text: "Everything above runs in containers, on a public cloud." },
  { kicker: "delivery", title: "GitLab CI/CD", text: "Lint, types, tests, images. Dev → int → staging → prod, plus a preview per branch." },
  { kicker: "health", title: "Golden questions", text: "A pod stays out of rotation until its latency is back under the threshold.", mine: true },
];

const AGENT_ROLES = ["coverage", "therapists", "self-service", "contact", "info", "premiums", "offers"];

function Card({ kicker, title, text, mine }: Block) {
  return (
    <div className={`border bg-paper px-3 py-2.5 ${mine ? "border-ball" : "border-rule"}`}>
      <p className={`font-mono text-[10px] tracking-[0.06em] uppercase ${mine ? "text-ball-text" : "text-muted"}`}>
        {mine && <span aria-hidden>● </span>}
        {kicker}
        {mine && <span className="sr-only"> (my work)</span>}
      </p>
      <p className="mt-0.5 text-sm leading-snug font-bold">{title}</p>
      <p className="mt-0.5 text-xs leading-snug text-ink-2">{text}</p>
    </div>
  );
}

function Layer({ index, name, children }: { index: number; name: string; children: React.ReactNode }) {
  return (
    <section aria-label={name}>
      <p className="meta mb-2 flex items-center gap-3 text-[11px] tracking-[0.06em] uppercase">
        <span>
          {index} · {name}
        </span>
        <span className="h-px flex-1 bg-rule" aria-hidden />
      </p>
      {children}
    </section>
  );
}

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
