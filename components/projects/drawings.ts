import type { ComponentType } from "react";
import { EvaBrain } from "@/components/ink/diagrams/EvaBrain";
import { UnhatememePipeline } from "@/components/ink/diagrams/UnhatememePipeline";
import { VoyagerLoop } from "@/components/ink/diagrams/VoyagerLoop";

/** Each project's ink drawing, by slug: on its card, and above "The system" on its page. */
export const projectDrawings: Partial<Record<string, ComponentType>> = {
  eva: EvaBrain,
  "vision-voyager": VoyagerLoop,
  unhatememe: UnhatememePipeline,
};
