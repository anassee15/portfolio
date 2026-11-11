/** The pitch under my name, then where I've been. Figures as on the CV. */

export type Strength = { title: string; proof: string };

export const strengths: Strength[] = [
  {
    title: "AI in production",
    proof: "Agents, ML and data pipelines, shipped to real users.",
  },
  {
    title: "Agentic evaluation",
    proof: "I measure whether an agent really works before it ships.",
  },
  {
    title: "MLOps & delivery",
    proof: "Releases, CI/CD, tests, APIs, Kubernetes, health checks.",
  },
  {
    title: "Software engineering",
    proof: "Python, C++, Java, SQL: clean, tested, documented code.",
  },
];

export type Role = {
  title: string;
  dates: string;
  detail: string;
  /** The one number to remember, shown large. */
  figure: { value: string; label: string };
  current?: boolean;
};

/** One organisation, with every role held there (most recent first). */
export type PathEntry = {
  org: string;
  /** File in /public/logos, drawn in ink through a CSS mask. */
  logo: string;
  /** The logo is a symbol rather than a wordmark: it is drawn taller. */
  emblem?: boolean;
  roles: Role[];
};

export const experience: PathEntry[] = [
  {
    org: "Groupe Mutuel",
    logo: "groupe-mutuel.svg",
    roles: [
      {
        title: "Master thesis · Agentic evaluation & open-weight migration",
        dates: "2026 – 27",
        detail:
          "Multi-turn evaluation of a multi-agent assistant: simulated policyholders, LLM judges, pass^k. It gates feature rollouts in production. Now moving the assistant to open-weight models.",
        figure: { value: "Now", label: "until Feb 2027" },
        current: true,
      },
      {
        title: "AI engineer intern",
        dates: "2025 – 26",
        detail:
          "Shipped an agentic chatbot to policyholders, and ran its production releases with the business teams: CI/CD, tests, API on AKS, health checks, Langfuse tracing, debugging.",
        figure: { value: "400,000", label: "users" },
      },
    ],
  },
  {
    org: "Scientific Visual",
    logo: "scientific-visual.png",
    emblem: true,
    roles: [
      {
        title: "Software engineer",
        dates: "2024 – 25",
        detail:
          "Three short contracts: data workflows for a computer-vision pipeline in Python, a C++ image library and a 3D clustering made 100× faster, then product licensing and a concurrent file library in C#.",
        figure: { value: "100×", label: "faster" },
      },
    ],
  },
  {
    org: "Idiap Research Institute",
    logo: "idiap.svg",
    roles: [
      {
        title: "ML research assistant",
        dates: "2024 – 25",
        detail: "Created a video dataset and metrics for hand-gaze detection, and trained the baseline model.",
        figure: { value: "0.76", label: "F1" },
      },
    ],
  },
];

export const education: PathEntry[] = [
  {
    org: "EPFL",
    logo: "epfl.svg",
    roles: [
      {
        title: "MSc Data Science",
        dates: "2023 – 27",
        detail:
          "Machine learning · Deep learning · Modern natural language processing · Visual intelligence · Applied data analysis · Systems for data management and data science · Large-scale data science for real-world data · Parallel and high-performance computing · Data visualization",
        figure: { value: "5.4", label: "GPA / 6" },
      },
    ],
  },
  {
    org: "HES-SO Neuchâtel",
    logo: "hes-so.svg",
    roles: [
      {
        title: "BSc Computer Science",
        dates: "2020 – 23",
        detail: "Data structures & algorithms · Databases · Computer systems · Networks · Web development",
        figure: { value: "5.6", label: "GPA / 6" },
      },
    ],
  },
];
