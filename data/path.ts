/** Career path, as on the CV: a short intro, then experience and education. */

// Draft intro, to be rewritten by Anasse in his own words.
export const intro =
  "I did a bachelor in computer science at HES\u2060-\u2060SO Neuchâtel, where I built two small NVIDIA robots and got vision models running on them. Then a master's in data science at EPFL, with research at Idiap and a summer of C++ at Scientific Visual. Since 2025 I've been at Groupe Mutuel: first putting an assistant in production, now measuring how reliable it is, for my master thesis.";

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
