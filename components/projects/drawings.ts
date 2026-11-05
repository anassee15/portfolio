import type { ComponentType } from "react";
import { EvaBrain } from "@/components/ink/diagrams/EvaBrain";

/** Ink drawing shown on a project's card, by slug. The others get theirs with their page. */
export const cardDrawings: Partial<Record<string, ComponentType>> = {
  eva: EvaBrain,
};
