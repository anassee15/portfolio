// data/projects.ts
export type ProjectTag =
  | "Agentic AI"
  | "RAG"
  | "CNN"
  | "LLM"
  | "NLP"
  | "VLM"
  | "Vision"
  | "Robotics"
  | "Medical"
  | "HPC"
  | "Open-Source LMs"
  | "Transformers"
  | "3D Image Segmentation"
  | "SFT"
  | "DPO"
  | "Quantization";


export interface Project {
  title: string;
  subtitle?: string;
  company?: string;
  logo?: string; // Company logo URL or emoji
  tags: ProjectTag[];
  period?: string;
  summary: string;
  highlights: string[];
  techStack: string[];
  links?: {
    github?: string;
    demo?: string;
    paper?: string;
    report?: string;
  };
}

export const projects: Project[] = [
  {
    title: "EVA: Virtual Assistant Agent for Insurance",
    subtitle: "Production Agentic LLM-RAG System",
    company: "Groupe Mutuel",
    logo: "🏥",
    tags: ["Agentic AI", "RAG", "LLM", "HPC"],
    summary:
      "EVA is a chatbot available 24/7 to policyholders, answering coverage-related questions and guiding users through the mobile app journey.",
    highlights: [
      "Designed and deployed an agentic RAG architecture tailored to insurance workflows.",
      "Implemented an evaluation framework to monitor quality and guide model/prompt iteration.",
      "Set up Langfuse-based observability for faster debugging and monitoring of agent behavior.",
      "Conducted research on agentic systems and fine-tuned small language models for comparison with larger models.",
      "Usage of CI/CD pipelines and Azure services for scalable deployment and maintenance of the system.",
    ],
    techStack: ["Python", "LLMs", "RAG", "Langfuse", "Azure"],
  },
  {
    title: "Educational STEM Assistant",
    subtitle: "Educational AI for STEM Tutoring",
    logo: "📚",
    tags: ["LLM", "SFT", "DPO", "RAG", "Quantization", "HPC"],
    summary:
      "Extended the Voyager autonomous Minecraft agent to integrate open-source vision-language models for multimodal perception and planning.",
    highlights: [
      "Consolidated 24K STEM MCQ datasets (STEMQ, MATH, etc.) for SFT and curated annotated triplets for DPO. Integrated 62K Wikipedia and arXiv STEM documents with 10K synthetic Q\&A pairs for RAG and Retrieval-Augmented Fine-Tuning (RAFT)",
      "Aligned model with student preferences using DPO (73% reward accuracy) on annotated triplets; integrated RAG with fine-tuned GTE-ModernBERT retriever on 62k Wikipedia STEM docs.",
      "Optimized for deployment via QLoRA (4-bit quantization, LoRA r=16 on all linear layers), halving model size (506MB) while maintaining/improving accuracy and reducing VRAM (2.81GB).",
    ],
    techStack: ["Python", "LLMs", "HPC", "Pytorch"],
    links: {
        report: "/report/stem-assistant-report.pdf",
    }
  },
  {
    title: "Vision Voyager",
    subtitle: "Autonomous Minecraft Agent with VLMs",
    logo: "🎮",
    tags: ["Agentic AI", "VLM", "Open-Source LMs", "HPC"],
    summary:
      "Extended the Voyager autonomous Minecraft agent to integrate open-source vision-language models for multimodal perception and planning.",
    highlights: [
      "Modified Voyager's architecture to use Mistral Small and Gemma 3 for visual observations.",
      "Designed prompts and tools enabling code generation conditioned on visual context.",
      "Evaluated VLMs for latency and reliability in long-horizon, open-ended tasks.",
    ],
    techStack: ["Python", "LLMs", "VLMs", "Minecraft"],
    links: {
        github: "https://github.com/anassee15/vision-voyager",
        report: "/report/vision-voyager-report.pdf",
    }
  },

  {
    title: "Human Spinal Cord 3D Reconstruction",
    logo: "🧠",
    tags: ["Medical", "Vision", "3D Image Segmentation", "HPC"],
    summary:
      "Performed 3D MRI segmentation to identify and locate spinal roots using nnU-Net and HardNet architectures.",
    highlights: [
      "Preprocessed volumetric MRI data and curated training datasets for 3D segmentation.",
      "Trained nnU-Net and HardNet models for accurate spinal root localization on HPC architectures.",
      "Contributed to a pipeline supporting clinical research on spinal cord anatomy.",
    ],
    techStack: ["Python", "PyTorch", "nnU-Net", "HardNet", "Medical Imaging"],
    links: {
        report: "/report/spinal-cord-report.pdf",
    }
  },
  {
    title: "Vine Mildew Prediction on JetRacer",
    logo: "🍇",
    tags: ["CNN", "Vision", "Robotics"],
    summary:
      "Implemented CNN-based image classification, detection, and segmentation for real-time vine disease detection on NVIDIA JetRacer.",
    highlights: [
      "Deployed vision models on embedded hardware for real-time vineyard disease monitoring.",
      "Built an end-to-end pipeline from data collection to on-device inference.",
    ],
    techStack: ["Python", "CNNs", "JetRacer", "Computer Vision"],
  },
  {
    title: "Sentimental Review",
    logo: "🎬",
    tags: ["NLP", "Transformers"],
    summary:
      "Analyzed movie impressions by scraping Twitter and IMDb, applying sentiment analysis with BERT to understand audience reactions.",
    highlights: [
      "Collected and cleaned social media and web data via APIs and scraping.",
      "Applied transformer-based sentiment analysis for fine-grained opinion mining.",
    ],
    techStack: ["Python", "BERT", "Twitter API", "Scraping"],
  },
];
