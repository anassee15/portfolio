import { BarChart } from "@/components/charts/BarChart";
import { Figures } from "@/components/charts/Figures";
import { projectDrawings } from "@/components/projects/drawings";
import type { Project } from "@/data/projects";
import type { CaseSlots } from "../CaseLayout";
import { lbmSlots, roboticsSlots, unhatememeSlots, voyagerSlots } from "./demos";
import { evaSlots } from "./eva";

/** Per-project drawings, figures and demos, placed around the Markdown sections. */
const slotsBySlug: Record<string, (project: Project) => CaseSlots> = {
  eva: evaSlots,
  "vision-voyager": voyagerSlots,
  unhatememe: unhatememeSlots,
  robotics: roboticsSlots,
  lbm: lbmSlots,
};

/** By default the system (or, on a short page, the situation) opens with the project's drawing, and the results with its chart, or its figures. */
function defaultSlots(project: Project, sectionIds: string[]): CaseSlots {
  const Drawing = projectDrawings[project.slug];
  const drawingAt = sectionIds.includes("the-system") ? "the-system" : "the-situation";
  return {
    ...(Drawing && {
      [drawingAt]: {
        before: (
          <div className="mb-8 max-w-[560px]">
            <Drawing />
          </div>
        ),
      },
    }),
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

export function getCaseSlots(project: Project, sectionIds: string[]): CaseSlots {
  return { ...defaultSlots(project, sectionIds), ...slotsBySlug[project.slug]?.(project) };
}
