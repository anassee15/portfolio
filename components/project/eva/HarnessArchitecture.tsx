import { Icon, type IconName } from "@/components/icons/Icon";
import { type Block, Card, Layer } from "./blocks";

/**
 * The evaluation harness as a four-stage pipeline: dataset → simulation →
 * evaluation → results. Same building blocks as EvaArchitecture.
 * Stages sit side by side on wide containers and stack on narrow ones.
 */

const DATASET: Block[] = [
  {
    icon: "file",
    kicker: "situations",
    title: "125 situations",
    text: "One YAML file each: a goal, a contract, a persona, tags. Played with every relevant product, plus one that covers nothing.",
  },
  {
    icon: "person",
    kicker: "personas",
    title: "8 personas, 4 languages",
    text: "Different ways of asking. Facts are only revealed when EVA asks for them.",
  },
];

const EVALUATION: Block[] = [
  {
    icon: "eye",
    kicker: "control",
    title: "Faithfulness check",
    text: "If the simulated policyholder invented a fact, the conversation is excluded, not judged.",
  },
  {
    icon: "python",
    kicker: "code",
    title: "Deterministic checks",
    text: "Which agents were called, whether the goal was reached. Same result every time.",
  },
  {
    icon: "review",
    kicker: "humans",
    title: "Review",
    text: "A reviewer can overturn a verdict; the score is recomputed without calling the LLM again.",
  },
];

const RESULTS: Block[] = [
  {
    icon: "chart",
    kicker: "per use case",
    title: "pass@k and pass^k",
    text: "A run passes when its score clears the threshold with no critical error. Over k runs: at least once, or every time.",
  },
  {
    icon: "react",
    kicker: "interface",
    title: "Evaluation Lab",
    text: "Runs, conversations and verdicts in one place. Arena compares two deployments blind.",
  },
  {
    icon: "lock",
    kicker: "production",
    title: "Release gate",
    text: "A new feature reaches policyholders only once its use cases hold.",
  },
];

/** The central, heavier boxes: the two places where an LLM does the work. */
function KeyBox({ icon, title, children }: { icon: IconName; title: string; children: React.ReactNode }) {
  return (
    <div className="border-2 border-ink bg-paper p-3">
      <p className="flex items-center gap-2 text-[15px] leading-snug font-bold">
        <Icon name={icon} />
        {title}
      </p>
      <div className="mt-1.5 text-xs leading-snug text-ink-2">{children}</div>
    </div>
  );
}

/** A file the pipeline writes, in mono. */
function Output({ name, text }: { name: string; text: string }) {
  return (
    <div className="border border-dashed border-bar px-3 py-2">
      <p className="font-mono text-xs">{name}</p>
      <p className="mt-0.5 text-xs leading-snug text-muted">{text}</p>
    </div>
  );
}

export function HarnessArchitecture() {
  return (
    <figure className="@container">
      <div className="grid gap-6 @4xl:grid-cols-4 @4xl:gap-4">
        <Layer index={1} name="Dataset" flow>
          <div className="grid gap-3 @lg:grid-cols-2 @4xl:grid-cols-1">
            {DATASET.map((block) => (
              <Card key={block.title} {...block} />
            ))}
          </div>
        </Layer>

        <Layer index={2} name="Simulation" flow>
          <div className="grid gap-3 @lg:grid-cols-2 @4xl:grid-cols-1">
            <KeyBox icon="person" title="Simulated policyholder ⇄ EVA">
              An LLM plays the policyholder and talks, turn after turn, with the real EVA. A separate goal agent decides
              when the conversation is over.
              <p className="meta mt-2 text-[11px]">N situations × k runs, in parallel</p>
            </KeyBox>
            <Output name="conversations.jsonl" text="Kept, so they can be judged again without simulating again." />
          </div>
        </Layer>

        <Layer index={3} name="Evaluation" flow>
          <div className="grid gap-3 @lg:grid-cols-2 @4xl:grid-cols-1">
            {EVALUATION.slice(0, 2).map((block) => (
              <Card key={block.title} {...block} />
            ))}
            <KeyBox icon="scales" title="LLM judges">
              The LLM classifies, the code scores: a typed verdict per claim, then a penalty table in Python. Judges are
              calibrated on human labels before their scores count.
              <p className="mt-2 font-mono text-[11px] text-ink">
                LLM <span className="text-ball-text">→ verdicts →</span> code → score
              </p>
            </KeyBox>
            <Card {...EVALUATION[2]} />
          </div>
        </Layer>

        <Layer index={4} name="Results">
          <div className="grid gap-3 @lg:grid-cols-2 @4xl:grid-cols-1">
            {RESULTS.map((block) => (
              <Card key={block.title} {...block} />
            ))}
          </div>
        </Layer>
      </div>

      <figcaption className="meta mt-4 text-[11px]">
        Every run is reproducible: commit, code and document fingerprints, dataset hash. 219 tests. Built alone in about
        six weeks.
      </figcaption>
    </figure>
  );
}
