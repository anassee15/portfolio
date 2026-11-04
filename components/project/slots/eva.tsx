import { Figures } from "@/components/charts/Figures";
import { PassKChart } from "@/components/charts/PassKChart";
import { RunsChart } from "@/components/charts/RunsChart";
import { EvaReplay } from "@/components/demos/EvaReplay";
import { EvaHarness } from "@/components/ink/diagrams/EvaHarness";
import { EvaSystem } from "@/components/ink/diagrams/EvaSystem";
import type { CaseSlots } from "../CaseLayout";
import type { Project } from "@/data/projects";

export function evaSlots(project: Project): CaseSlots {
  return {
    "the-system": {
      before: (
        <div className="mb-6 max-w-[440px]">
          <EvaSystem />
        </div>
      ),
    },
    "the-harness": {
      before: (
        <div className="mb-6">
          <EvaHarness />
        </div>
      ),
      after: (
        <div className="mt-10 max-w-[480px]">
          <PassKChart />
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
    "try-it": {
      after: (
        <div className="mt-8 grid gap-x-10 gap-y-12 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)]">
          <EvaReplay />
          <RunsChart />
        </div>
      ),
    },
  };
}
