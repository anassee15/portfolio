import { Figures } from "@/components/charts/Figures";
import { PassKChart } from "@/components/charts/PassKChart";
import { RunsChart } from "@/components/charts/RunsChart";
import { EvaReplay } from "@/components/demos/EvaReplay";
import { EvaArchitecture } from "@/components/project/eva/EvaArchitecture";
import { ClaimScoring } from "@/components/ink/diagrams/ClaimScoring";
import { ConversationReuse } from "@/components/ink/diagrams/ConversationReuse";
import { HarnessPipeline } from "@/components/ink/diagrams/HarnessPipeline";
import { SituationCrossing } from "@/components/ink/diagrams/SituationCrossing";
import { DiagramFrame } from "../DiagramFrame";
import type { CaseSlots } from "../CaseLayout";
import type { Project } from "@/data/projects";

/** EVA itself: the architecture and the usage figures. */
export function evaSlots(project: Project): CaseSlots {
  return {
    "the-system": {
      after: (
        <div className="mt-8">
          <EvaArchitecture />
        </div>
      ),
    },
    results: {
      before: (
        <div className="mb-6">
          <Figures figures={project.figures} source={project.source} />
        </div>
      ),
    },
  };
}

/** The evaluation harness: the pipeline, then one figure per design choice. */
export function evaluationSlots(project: Project): CaseSlots {
  return {
    header: {
      after: (
        <div className="mt-10">
          <Figures figures={project.figures} source={project.source} />
        </div>
      ),
    },
    "the-system": {
      after: (
        <div className="mt-8">
          <DiagramFrame
            label="The harness, step by step"
            minWidth={560}
            caption="Tone-filled circles are LLMs; plain circles are code."
          >
            <HarnessPipeline />
          </DiagramFrame>
        </div>
      ),
    },
    "one-situation-many-policyholders": {
      before: (
        <div className="mb-6">
          <DiagramFrame label="One situation, many policyholders" minWidth={480} maxWidth={640}>
            <SituationCrossing />
          </DiagramFrame>
        </div>
      ),
    },
    "simulate-once-judge-many-times": {
      before: (
        <div className="mb-6">
          <DiagramFrame label="Four ways to reuse a conversation" minWidth={480} maxWidth={640}>
            <ConversationReuse />
          </DiagramFrame>
        </div>
      ),
      after: (
        <div className="mt-8 max-w-[640px]">
          <EvaReplay />
        </div>
      ),
    },
    "the-llm-classifies-the-code-scores": {
      before: (
        <div className="mb-6">
          <DiagramFrame label="The LLM classifies, the code scores" minWidth={500} maxWidth={660}>
            <ClaimScoring />
          </DiagramFrame>
        </div>
      ),
    },
    "reliability-not-just-capability": {
      after: (
        <div className="mt-8 grid gap-12">
          <PassKChart />
          <RunsChart />
        </div>
      ),
    },
  };
}
