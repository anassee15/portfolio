// components/SkillsSection.tsx
"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";

export default function SkillsSection() {
  const categories = [
    {
      title: "Agentic AI & NLP",
      icon: "🤖",
      color: "cyan",
      skills: [
        "Agentic Systems",
        "RAG",
        "LLMs",
        "Generative AI",
        "Foundation Models",
        "NLP",
        "Topic Modeling",
        "Fine-tuning",
      ],
    },
    {
      title: "ML & Robotics",
      icon: "🧠",
      color: "purple",
      skills: [
        "Deep Learning",
        "Computer Vision",
        "Robotics-style Systems",
        "Evaluation Metrics",
      ],
    },
    {
      title: "Development & Infrastructure",
      icon: "⚙️",
      color: "orange",
      skills: [
        "Python (Sklearn, PyTorch, TensorFlow, MLX)",
        "C/C++",
        "CUDA",
        "Java",
        "SQL",
        "JavaScript",
        "HTML/CSS",
        "Linux",
        "Azure",
        "HPC Infrastructure",
        "Docker",
        "Kubernetes",
        "GPU Programming",
        "MLOps",
      ],
    },
    {
      title: "Languages",
      icon: "🌍",
      color: "slate",
      skills: ["French (Native)", "English (C1)", "Arabic (B1)"],
    },
  ];

  const getColorClasses = (color: string) => {
    const colorMap = {
      cyan: {
        border: "border-cyan-500/40",
        bg: "bg-cyan-500/10",
        text: "text-cyan-600 dark:text-cyan-300",
        hover: "hover:bg-cyan-500/20 hover:border-cyan-500/60",
        glow: "hover:shadow-cyan-500/20",
        gradient: "from-cyan-500/5 to-transparent",
      },
      purple: {
        border: "border-purple-500/40",
        bg: "bg-purple-500/10",
        text: "text-purple-600 dark:text-purple-300",
        hover: "hover:bg-purple-500/20 hover:border-purple-500/60",
        glow: "hover:shadow-purple-500/20",
        gradient: "from-purple-500/5 to-transparent",
      },
      orange: {
        border: "border-orange-500/40",
        bg: "bg-orange-500/10",
        text: "text-orange-600 dark:text-orange-300",
        hover: "hover:bg-orange-500/20 hover:border-orange-500/60",
        glow: "hover:shadow-orange-500/20",
        gradient: "from-orange-500/5 to-transparent",
      },
      slate: {
        border: "border-slate-500/40",
        bg: "bg-slate-500/10",
        text: "text-slate-600 dark:text-slate-300",
        hover: "hover:bg-slate-500/20 hover:border-slate-500/60",
        glow: "hover:shadow-slate-500/20",
        gradient: "from-slate-500/5 to-transparent",
      },
    };
    return colorMap[color as keyof typeof colorMap] || colorMap.cyan;
  };

  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-2xl md:text-3xl font-bold">
          <span className="gradient-text">Skills</span>
        </h2>
        <p className="mt-3 max-w-2xl text-sm md:text-base text-slate-600 dark:text-slate-400">
          A mix of agentic AI, machine learning, and production engineering
          skills.
        </p>
      </motion.div>

      <div className="mt-8 md:mt-12 grid gap-4 md:gap-6 lg:grid-cols-2">
        {categories.map((category, categoryIndex) => {
          const colors = getColorClasses(category.color);
          return (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.6,
                delay: categoryIndex * 0.1,
                ease: [0.16, 1, 0.3, 1] as const,
              }}
            >
              <motion.div
                whileHover={{ scale: 1.02, y: -5 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <Card
                  className={`group h-full border-slate-300/80 dark:border-slate-800/50 bg-white dark:bg-slate-900/70 backdrop-blur-xl transition-all duration-300 hover:border-${category.color}-500/50 hover:shadow-xl ${colors.glow} overflow-hidden relative`}
                >
                  {/* Gradient overlay */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${colors.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`}
                  />

                  <CardContent className="p-6 relative">
                    {/* Header with icon */}
                    <motion.div
                      className="flex items-center gap-3 mb-5"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: categoryIndex * 0.1 + 0.2 }}
                    >
                      <motion.div
                        className="text-4xl"
                        whileHover={{ rotate: [0, -10, 10, -10, 0], scale: 1.2 }}
                        transition={{ duration: 0.5 }}
                      >
                        {category.icon}
                      </motion.div>
                      <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
                        {category.title}
                      </h3>
                    </motion.div>

                    {/* Skills badges */}
                    <div className="flex flex-wrap gap-2">
                      {category.skills.map((skill, skillIndex) => (
                        <motion.div
                          key={skill}
                          initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
                          whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                          viewport={{ once: true }}
                          transition={{
                            duration: 0.4,
                            delay: categoryIndex * 0.1 + skillIndex * 0.03,
                            type: "spring",
                            stiffness: 200,
                            damping: 15,
                          }}
                          whileHover={{
                            scale: 1.1,
                            rotate: 2,
                            transition: { duration: 0.2 },
                          }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Badge
                            variant="outline"
                            className={`${colors.border} ${colors.bg} ${colors.text} ${colors.hover} text-sm py-1.5 px-3 transition-all duration-300 cursor-default shadow-sm hover:shadow-md font-medium`}
                          >
                            {skill}
                          </Badge>
                        </motion.div>
                      ))}
                    </div>

                    {/* Decorative corner element */}
                    <motion.div
                      className={`absolute -right-8 -bottom-8 w-24 h-24 bg-gradient-to-br ${colors.gradient} rounded-full blur-2xl opacity-0 group-hover:opacity-50 transition-opacity duration-500`}
                      animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.3, 0.5, 0.3],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    />
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
