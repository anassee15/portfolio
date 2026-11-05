import type { ComponentType } from "react";
import { ConnectFourRead } from "@/components/ink/diagrams/ConnectFourRead";
import { EvaBrain } from "@/components/ink/diagrams/EvaBrain";
import { GazeCone } from "@/components/ink/diagrams/GazeCone";
import { HoopvizFlow } from "@/components/ink/diagrams/HoopvizFlow";
import { LbmGrid } from "@/components/ink/diagrams/LbmGrid";
import { ReductionTree } from "@/components/ink/diagrams/ReductionTree";
import { RobotVision } from "@/components/ink/diagrams/RobotVision";
import { TutorSteps } from "@/components/ink/diagrams/TutorSteps";
import { UnhatememePipeline } from "@/components/ink/diagrams/UnhatememePipeline";
import { VoyagerLoop } from "@/components/ink/diagrams/VoyagerLoop";

/** Each project's ink drawing, by slug: on its card, and above "The system" on its page (or "The situation" on a short one). */
export const projectDrawings: Partial<Record<string, ComponentType>> = {
  eva: EvaBrain,
  "vision-voyager": VoyagerLoop,
  unhatememe: UnhatememePipeline,
  lbm: LbmGrid,
  hoopviz: HoopvizFlow,
  robotics: RobotVision,
  idiap: GazeCone,
  "stem-tutor": TutorSteps,
  leetgpu: ReductionTree,
  "connect-four": ConnectFourRead,
};
