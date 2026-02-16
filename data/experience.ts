// data/experience.ts
export interface ExperienceItem {
  role: string;
  company: string;
  logo?: string; // Company logo emoji or URL
  location: string;
  period: string;
  points: string[];
}

export const experience: ExperienceItem[] = [
  {
    role: "AI Applied Scientist Intern",
    company: "Groupe Mutuel",
    logo: "/images/groupemutuel.png",
    location: "Lausanne, Switzerland",
    period: "08/2025 – 06/2026",
    points: [
      "Deployed an agentic LLM-RAG system in production, serving 600,000+ users.",
      "Implemented an evaluation framework to improve AI model quality and development workflows.",
      "Conducted research on agentic systems and fine-tuned small language models.",
      "Deployed a production-ready LLM observability system using Langfuse.",
    ],
  },
  {
    role: "Software Engineer",
    company: "Scientific Visual",
    logo: "/images/sv.png",
    location: "Lausanne, Switzerland",
    period: "01/2025 – 02/2025",
    points: [
      "Designed data processing workflows for a computer vision ML pipeline in Python.",
      "Achieved a 100x speedup in 3D clustering via algorithm optimization in C++/CUDA.",
    ],
  },
  {
    role: "ML Research Assistant",
    company: "IDIAP",
    logo: "/images/idiap.png",
    location: "Lausanne, Switzerland",
    period: "09/2024 – 01/2025",
    points: [
      "Created a novel dataset and evaluation metrics for hand-gaze detection.",
      "Developed a computer vision model to accelerate hand-gaze annotation in videos.",
    ],
  },
];
