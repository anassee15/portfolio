export type Figure = { value: string; label: string };

export type Project = {
  slug: string;
  title: string;
  /** One sentence, non-technical. */
  pitch: string;
  context: string;
  year: string;
  tier: "lead" | "flagship" | "bench";
  tags: string[];
  stack: string[];
  /** The first figure is the headline one. */
  figures: Figure[];
  /** Where the figures come from, shown under them. */
  source: string;
  links?: { label: string; href: string }[];
};

export const projects: Project[] = [
  {
    slug: "eva",
    title: "EVA, and the harness that tests it",
    pitch:
      "An assistant in the Groupe Mutuel app that tells policyholders what their plan covers, in four languages.",
    context: "Groupe Mutuel",
    year: "2025 – 2027",
    tier: "lead",
    tags: ["agents", "evaluation", "llm"],
    stack: ["Python", "FastAPI", "LLMs", "Langfuse", "Databricks", "Kubernetes", "React / TS"],
    figures: [
      { value: "115,000", label: "policyholders have used EVA" },
      { value: "400,000+", label: "have access to it in the app" },
      { value: "~18,000", label: "calls avoided in 6 months" },
      { value: "≈ CHF 360k", label: "estimated savings" },
    ],
    source: "Groupe Mutuel, 2026. Savings are an internal estimate; run scores stay internal.",
  },
];

export function getProjectBySlug(slug: string) {
  return projects.find((project) => project.slug === slug);
}
