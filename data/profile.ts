/** The short profile at the top of the home: what I bring, then where I've been. Figures as on the CV. */

export type Strength = { title: string; proof: string; keywords: string[] };

export const strengths: Strength[] = [
  {
    title: "Agents in production",
    proof:
      "Core contributor to EVA, the conversational agent of Groupe Mutuel: 115,000 policyholders have used it, ~18,000 calls avoided in 6 months.",
    keywords: ["multi-agent", "RAG", "Azure OpenAI", "Langfuse"],
  },
  {
    title: "LLM evaluation",
    proof: "Built EVA's evaluation harness alone: simulated users, LLM judges, pass^k. It gates feature rollouts in production.",
    keywords: ["LLM-as-judge", "simulation", "pass^k"],
  },
  {
    title: "Open-weight models",
    proof: "Benchmarking Qwen, Kimi and Mistral against a proprietary baseline, fine-tuning with LoRA, sizing self-hosted inference.",
    keywords: ["LoRA / QLoRA", "SFT / DPO", "Hugging Face"],
  },
  {
    title: "Close to the hardware",
    proof: "3D clustering 100× faster in C++, a fluid solver in CUDA and MPI, vision models on two NVIDIA robots.",
    keywords: ["C++", "CUDA", "MPI", "Jetson"],
  },
];

export type PathEntry = { org: string; role: string; dates: string };

export const experience: PathEntry[] = [
  { org: "Groupe Mutuel", role: "Master thesis", dates: "2026 – 27" },
  { org: "Groupe Mutuel", role: "AI engineer intern", dates: "2025 – 26" },
  { org: "Scientific Visual", role: "Software engineer", dates: "2025" },
  { org: "Idiap", role: "ML research assistant", dates: "2024 – 25" },
];

export const education: PathEntry[] = [
  { org: "EPFL", role: "MSc Data Science", dates: "2023 – 27" },
  { org: "HES-SO Neuchâtel", role: "BSc Computer Science", dates: "2020 – 23" },
];
