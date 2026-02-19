// components/AboutSection.tsx
"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import { useState } from "react";

export default function AboutSection() {
  const [isHovered, setIsHovered] = useState(false);
  const interests = [
    "Agentic AI Systems",
    "Large Language Models",
    "Computer Vision",
    "MLOps & Deployment",
    "Research & Innovation",
  ];

  return (
    <div className="relative">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-2xl md:text-3xl font-bold">
          <span className="gradient-text">About Me</span>
        </h2>
        <p className="mt-3 max-w-2xl text-sm md:text-base text-slate-600 dark:text-slate-400">
          Learning, building, and contributing to the future of AI.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mt-8 md:mt-12"
      >
        <Card className="group relative overflow-hidden border-slate-300/80 dark:border-slate-800/50 bg-white dark:bg-slate-900/70 backdrop-blur-xl transition-all duration-500 hover:border-cyan-500/50 hover:shadow-2xl">
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

          <div className="relative z-10 p-6 md:p-8">
            <div className="flex flex-col lg:flex-row gap-8 items-center">
              {/* Memoji Section */}
              <motion.div
                className="flex-shrink-0"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                whileHover={{ scale: 1.03 }}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                <div className="relative w-40 h-40 md:w-48 md:h-48 lg:w-56 lg:h-56 rounded-2xl overflow-hidden border-2 border-slate-200 dark:border-slate-800 shadow-xl hover:shadow-2xl hover:border-cyan-500/50 dark:hover:border-cyan-500/50 transition-all duration-300">
                  <AnimatePresence initial={false}>
                    <motion.div
                      key={isHovered ? "hover" : "default"}
                      initial={{ opacity: 0, scale: 1.05 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.15, ease: "easeInOut" }}
                      className="absolute inset-0"
                    >
                      <Image
                        src={isHovered ? "/icon-about2.png" : "/icon-about.png"}
                        alt="Profile photo"
                        fill
                        className="object-cover"
                      />
                    </motion.div>
                  </AnimatePresence>
                </div>
              </motion.div>

              {/* Content Section */}
              <div className="flex-1 space-y-6">
                {/* Bio text */}
                <div className="space-y-4">
                  <motion.p
                    className="text-base md:text-lg leading-relaxed text-slate-700 dark:text-slate-300"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                  >
                    I'm a <span className="font-semibold text-cyan-600 dark:text-cyan-400">Data Science student at EPFL</span> passionate about AI but pragmatic about building systems that actually work. My research interests focus on <span className="font-semibold text-purple-600 dark:text-purple-400">agentic systems, multimodality, and robotics</span>, figuring out how to make AI agents interact with the real world more naturally and effectively.
                  </motion.p>

                  <motion.p
                    className="text-base md:text-lg leading-relaxed text-slate-700 dark:text-slate-300"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                  >
                    I love the theoretical side, but I also care deeply about production reliability, debugging complex systems, and creating solutions people can depend on. From deploying <span className="font-semibold text-orange-600 dark:text-orange-400">LLM-RAG systems serving thousands of users</span> to researching vision-language models, I bridge the gap between cutting-edge research and practical applications.
                  </motion.p>

                  <motion.p
                    className="text-base md:text-lg leading-relaxed text-slate-700 dark:text-slate-300"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                  >
                    I'm someone who loves constantly learning new things and remains open to exploring new domains. I optimize for learning opportunities and tangible impact. I'm happiest when working on challenging problems that expand my skills while creating something useful. I value learning from teammates and believe the best growth comes from asking questions and tackling problems that push my boundaries.
                  </motion.p>
                </div>

                {/* Interests tags */}
                <motion.div
                  className="flex flex-wrap gap-2 pt-2"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.7 }}
                >
                  {interests.map((interest, i) => (
                    <motion.div
                      key={interest}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: 0.7 + i * 0.1 }}
                      whileHover={{ scale: 1.05, y: -2 }}
                    >
                      <Badge
                        variant="outline"
                        className="border-cyan-500/40 bg-cyan-500/10 text-cyan-600 dark:text-cyan-300 hover:bg-cyan-500/20 transition-colors cursor-default"
                      >
                        {interest}
                      </Badge>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            </div>
          </div>

          {/* Decorative corner glow */}
          <motion.div
            className="absolute -right-8 -bottom-8 w-32 h-32 bg-gradient-to-br from-cyan-500/20 via-purple-500/20 to-transparent rounded-full blur-3xl opacity-0 group-hover:opacity-50 transition-opacity duration-500"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </Card>
      </motion.div>
    </div>
  );
}
