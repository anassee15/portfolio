import { BarChart } from "@/components/charts/BarChart";
import { Figures } from "@/components/charts/Figures";
import type { Project } from "@/data/projects";
import type { CaseSlots } from "../CaseLayout";
import { evaSlots } from "./eva";

/** Per-project drawings, figures and demos, placed around the Markdown sections. */
const slotsBySlug: Record<string, (project: Project) => CaseSlots> = {
  eva: evaSlots,
};

/** Until a project has its own slots, its results open with its chart, or its figures. */
function defaultSlots(project: Project): CaseSlots {
  return {
    results: {
      before: (
        <div className="mb-8 max-w-[640px]">
          {project.chart ? (
            <BarChart {...project.chart} />
          ) : (
            <Figures figures={project.figures} source={project.source} compact />
          )}
        </div>
      ),
    },
  };
}

export function getCaseSlots(project: Project): CaseSlots {
  return (slotsBySlug[project.slug] ?? defaultSlots)(project);
}
