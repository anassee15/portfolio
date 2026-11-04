import type { Project } from "@/data/projects";
import type { CaseSlots } from "../CaseLayout";
import { evaSlots } from "./eva";

/** Per-project drawings, figures and demos, placed around the Markdown sections. */
const slotsBySlug: Record<string, (project: Project) => CaseSlots> = {
  eva: evaSlots,
};

export function getCaseSlots(project: Project): CaseSlots {
  return slotsBySlug[project.slug]?.(project) ?? {};
}
