/** Career path, as on the CV: the curve's milestones, then the two lists under it. */

export type MilestoneId = "captain" | "injury" | "hesso" | "epfl" | "idiap" | "sv" | "gm" | "available";

export type Milestone = { id: MilestoneId; label: string };

/** In order. Captain and the injury have no year on purpose. */
export const milestones: Milestone[] = [
  { id: "captain", label: "Club basketball, captain" },
  { id: "injury", label: "back injury + covid" },
  { id: "hesso", label: "HES-SO · 2020" },
  { id: "epfl", label: "EPFL · 2023" },
  { id: "idiap", label: "Idiap · 2024" },
  { id: "sv", label: "Scientific Visual · 2025" },
  { id: "gm", label: "Groupe Mutuel · 2025" },
  { id: "available", label: "Feb 2027" },
];

export const injuryNote = "Nobody is a prisoner of their destiny.";

export type PathEntry = { org: string; role: string; dates: string; detail: string };

export const experience: PathEntry[] = [
  {
    org: "Groupe Mutuel",
    role: "Master thesis",
    dates: "2026 – 2027",
    detail: "Agentic evaluation and the move to open-weight models. The harness gates feature rollouts in production.",
  },
  {
    org: "Groupe Mutuel",
    role: "AI engineer intern",
    dates: "2025 – 2026",
    detail: "Shipped EVA, an agentic assistant, to 400,000+ policyholders. ~18,000 calls avoided in 6 months.",
  },
  {
    org: "Scientific Visual",
    role: "Software engineer",
    dates: "2025",
    detail: "3D clustering 100× faster in C++.",
  },
  {
    org: "Idiap",
    role: "ML research assistant",
    dates: "2024 – 2025",
    detail: "A video dataset and metrics for hand-gaze detection, baseline F1 0.76.",
  },
];

export const education: PathEntry[] = [
  {
    org: "EPFL",
    role: "MSc Data Science",
    dates: "2023 – 2027",
    detail: "GPA 5.4 / 6. Machine learning, deep learning, NLP, foundation models, HPC.",
  },
  {
    org: "HES-SO Neuchâtel",
    role: "BSc Computer Science",
    dates: "2020 – 2023",
    detail: "GPA 5.6 / 6. Built and programmed two NVIDIA robots.",
  },
];
