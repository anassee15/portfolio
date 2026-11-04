export type Figure = { value: string; label: string };

/** One horizontal bar; `low` turns it into a range (low to value). */
export type Bar = { label: string; value: number; low?: number; display: string; highlight?: boolean };

export type BarChartData = { title: string; bars: Bar[]; note: string };

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
  /** The figures as one short line with their units, for list rows ("F1 0.76"). */
  score?: string;
  /** Chart shown next to the project on the home; without one, its figures are shown. */
  chart?: BarChartData;
};

export const projects: Project[] = [
  {
    slug: "eva",
    title: "Conversational agentic systems, and their evaluation",
    pitch:
      "EVA, the conversational agent of Groupe Mutuel, tells policyholders what their plan covers, in four languages.",
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
  {
    slug: "vision-voyager",
    title: "Vision Voyager",
    pitch: "An agent that learns Minecraft by writing its own code. I gave it eyes, and open-source models.",
    context: "EPFL · CS-503",
    year: "2025",
    tier: "flagship",
    tags: ["agents", "vision", "open-weight"],
    stack: ["Python", "JavaScript (Mineflayer)", "GPT-4.1", "Ollama", "VLMs", "ChromaDB"],
    figures: [{ value: "172", label: "skills written by the agent itself" }],
    source: "CS-503 project, EPFL, 2025. Three full runs.",
    links: [{ label: "GitHub", href: "https://github.com/anassee15/vision-voyager" }],
    chart: {
      title: "Items discovered in 160 iterations",
      bars: [
        { label: "Text only", value: 65, display: "≈ 65" },
        { label: "With vision", low: 48, value: 54, display: "48–54", highlight: true },
      ],
      note: "With vision it built better (a real house, not a pile of blocks), not faster.",
    },
  },
  {
    slug: "unhatememe",
    title: "UnHateMeme",
    pitch: "Spot a hateful meme, then repair it while changing the image as little as possible.",
    context: "EPFL · EE-559",
    year: "2026",
    tier: "flagship",
    tags: ["vlm", "diffusion", "evaluation"],
    stack: ["Qwen 3.6 / 2.5-VL", "Gemma 4", "FLUX.2", "LoRA", "Docker"],
    figures: [{ value: "84 %", label: "toxicity reduction, no fine-tuning" }],
    source: "EE-559 project report, EPFL, 2026. Mean over repeated runs.",
    links: [{ label: "GitHub", href: "https://github.com/anassee15/UnHateMemeDL" }],
    chart: {
      title: "Toxicity reduction after the rewrite",
      bars: [
        { label: "Gemma 4, no fine-tuning", value: 84, display: "84 %", highlight: true },
        { label: "Qwen 3.6 + LoRA", value: 63, display: "63 %" },
        { label: "Qwen 3.6, no fine-tuning", value: 43, display: "43 %" },
      ],
      note: "Mean over repeated runs. EE-559 report, EPFL, 2026.",
    },
  },
  {
    slug: "lbm",
    title: "Lattice Boltzmann, MPI and CUDA",
    pitch: "A fluid simulation, made to run 100 times faster.",
    context: "EPFL · MATH-454",
    year: "2026",
    tier: "flagship",
    tags: ["hpc", "cuda"],
    stack: ["C++", "MPI", "CUDA", "HDF5", "SLURM"],
    figures: [{ value: "~105×", label: "the serial version, on one GPU" }],
    source: "Benchmarks on SCITAS, EPFL, 2026.",
    chart: {
      title: "Million lattice updates per second (MLUPS)",
      bars: [
        { label: "Serial", value: 21.6, display: "21.6" },
        { label: "MPI, 128 ranks", value: 1323, display: "1,323" },
        { label: "CUDA, 1 GPU", value: 2265, display: "2,265", highlight: true },
      ],
      note: "Benchmarks on SCITAS, EPFL. One GPU runs ~105× the serial version.",
    },
  },
  {
    slug: "hoopviz",
    title: "HoopViz",
    pitch: "Decades of NBA stats turned into a living map you can move through time.",
    context: "EPFL · COM-480",
    year: "2026",
    tier: "flagship",
    tags: ["dataviz", "basketball"],
    stack: ["D3.js", "JavaScript", "Python"],
    figures: [
      { value: "46", label: "seasons" },
      { value: "~6,200", label: "players" },
      { value: "~55,000", label: "games" },
      { value: "6.1M", label: "shots" },
    ],
    source: "NBA data, 1980 – 2025; shots from play-by-play, 1996 – 2024.",
    links: [
      { label: "Live site", href: "https://com-480-data-visualization.github.io/HoopViz/" },
      { label: "Video", href: "https://youtu.be/H1Zgz_uHQyw" },
      { label: "GitHub", href: "https://github.com/com-480-data-visualization/HoopViz" },
    ],
  },
  {
    slug: "robotics",
    title: "Robots that see",
    pitch: "A small NVIDIA robot that stops when its camera sees a target, then vine mildew spotted fast enough to run on it.",
    context: "HES-SO · bachelor",
    year: "2022 – 2023",
    tier: "bench",
    tags: ["robotics", "vision"],
    stack: ["Jetson Nano", "PyTorch", "TensorRT", "ONNX"],
    score: "142 FPS · mIoU 76.5 %",
    figures: [
      { value: "142 FPS", label: "mildew segmentation" },
      { value: "76.5 %", label: "mIoU" },
    ],
    source: "Bachelor project and thesis, HES-SO, 2023.",
  },
  {
    slug: "idiap",
    title: "Looking at hands",
    pitch: "Teaching a machine to see when someone looks at a hand, to pre-annotate videos.",
    context: "EPFL × Idiap",
    year: "2024",
    tier: "bench",
    tags: ["research", "vision"],
    stack: ["Python", "PyTorch"],
    score: "F1 0.76",
    figures: [{ value: "0.76", label: "F1, baseline" }],
    source: "Research project, EPFL × Idiap, 2024.",
  },
  {
    slug: "stem-tutor",
    title: "STEM tutor",
    pitch: "A small open-source model (0.6B) that answers science multiple-choice questions like a tutor.",
    context: "EPFL · CS-552",
    year: "2025",
    tier: "bench",
    tags: ["llm", "fine-tuning"],
    stack: ["Qwen3-0.6B", "SFT", "DPO", "QLoRA", "RAG"],
    score: "+4 % · 1.1 → 0.5 GB",
    figures: [
      { value: "+4 %", label: "accuracy after SFT" },
      { value: "1.1 → 0.5 GB", label: "with QLoRA, same accuracy" },
    ],
    source: "CS-552 project, EPFL, 2025.",
  },
  {
    slug: "leetgpu",
    title: "leetGPU",
    pitch: "CUDA kernels written from scratch, from matmul to online softmax.",
    context: "Personal",
    year: "2026",
    tier: "bench",
    tags: ["cuda"],
    stack: ["CUDA", "C++"],
    score: "~20 kernels",
    figures: [{ value: "~20", label: "kernels" }],
    source: "github.com/anassee15/leetGPU",
    links: [{ label: "GitHub", href: "https://github.com/anassee15/leetGPU" }],
  },
];

export function getProjectBySlug(slug: string) {
  return projects.find((project) => project.slug === slug);
}
