import { Icon, type IconName } from "@/components/icons/Icon";
import { HarnessJudging } from "@/components/ink/diagrams/HarnessJudging";
import { HarnessSimulation } from "@/components/ink/diagrams/HarnessSimulation";
import { type Block, Card, Layer } from "./blocks";

/**
 * The evaluation harness in four stages, read top to bottom: dataset → simulation →
 * evaluation → results. Same building blocks as EvaArchitecture; the two stages
 * where an LLM does the work get an ink diagram, after the thesis deck.
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

const SIMULATION_NOTES: Block[] = [
  {
    icon: "flag",
    kicker: "goal agent",
    title: "Knows when to stop",
    text: "After each turn it checks whether every part of the goal got an answer. A turn limit stops the rest.",
  },
  {
    icon: "file",
    kicker: "output",
    title: "conversations.jsonl",
    text: "Messages, EVA's steps and the goal agent's decision. Kept, so they can be judged again without simulating again.",
  },
];

const EVALUATION_NOTES: Block[] = [
  {
    icon: "eye",
    kicker: "control",
    title: "Faithfulness check",
    text: "If the simulated policyholder invented a fact, the conversation is excluded, not judged.",
  },
  {
    icon: "python",
    kicker: "code",
    title: "Checks and scoring",
    text: "Which agents were called, whether the goal was reached; then a penalty table turns the judges' verdicts into a score.",
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

/** The heavier box of a stage, holding its diagram. */
function KeyBox({ icon, title, text, children }: { icon: IconName; title: string; text: string; children: React.ReactNode }) {
  return (
    <div className="min-w-0 border-2 border-ink bg-paper p-3 @lg:p-4">
      <p className="flex items-center gap-2 text-[15px] leading-snug font-bold">
        <Icon name={icon} />
        {title}
      </p>
      <p className="mt-1.5 max-w-[62ch] text-[13px] leading-snug text-ink-2">{text}</p>
      {/* On narrow screens the diagram keeps a readable size and scrolls sideways. */}
      <div className="mt-4 overflow-x-auto" tabIndex={0} role="region" aria-label={`${title}, diagram`}>
        <div className="mx-auto max-w-[560px] min-w-[460px] @lg:min-w-0">{children}</div>
      </div>
    </div>
  );
}

function Cards({ blocks, className }: { blocks: Block[]; className: string }) {
  return (
    <div className={`grid content-start gap-3 ${className}`}>
      {blocks.map((block) => (
        <Card key={block.title} {...block} />
      ))}
    </div>
  );
}

export function HarnessArchitecture() {
  return (
    <figure className="@container">
      <div className="grid gap-6">
        <Layer index={1} name="Dataset">
          <Cards blocks={DATASET} className="@lg:grid-cols-2" />
        </Layer>

        <Layer index={2} name="Simulation">
          <div className="grid gap-3 @3xl:grid-cols-[1.9fr_1fr]">
            <KeyBox
              icon="person"
              title="Simulated policyholder ⇄ EVA"
              text="An LLM plays the policyholder and talks, turn after turn, with the real EVA. N situations × k runs, in parallel."
            >
              <HarnessSimulation />
            </KeyBox>
            <Cards blocks={SIMULATION_NOTES} className="@lg:grid-cols-2 @3xl:grid-cols-1" />
          </div>
        </Layer>

        <Layer index={3} name="Evaluation">
          <div className="grid gap-3 @3xl:grid-cols-[1fr_1.9fr]">
            <div className="min-w-0 @3xl:order-2">
              <KeyBox
                icon="scales"
                title="The LLM classifies, the code scores"
                text="Each use case has its evaluators. LLM judges give a typed verdict per claim; they are calibrated on human labels before their scores count."
              >
                <HarnessJudging />
              </KeyBox>
            </div>
            <Cards blocks={EVALUATION_NOTES} className="@lg:grid-cols-3 @3xl:order-1 @3xl:grid-cols-1" />
          </div>
        </Layer>

        <Layer index={4} name="Results">
          <Cards blocks={RESULTS} className="@lg:grid-cols-3" />
        </Layer>
      </div>

      <figcaption className="meta mt-4 text-[11px]">
        After the thesis deck. Every run is reproducible: commit, code and document fingerprints, dataset hash. 219
        tests. Built alone in about six weeks.
      </figcaption>
    </figure>
  );
}
