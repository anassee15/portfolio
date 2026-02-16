// components/Hero.tsx
"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import AgentGraphCanvas from "./three/AgentGraphCanvas";
import { useEffect, useState } from "react";

const roles = [
  "Agentic AI Engineer",
  "NLP Specialist",
  "Deep Learning Researcher",
  "MLOps Engineer",
];

export default function Hero() {
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.3], [1, 0.95]);
  const y = useTransform(scrollYProgress, [0, 0.3], [0, 50]);

  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
      {/* Animated grid background */}
      <div className="pointer-events-none absolute inset-0 grid-bg opacity-30" />

      {/* 3D Background */}
      <div className="pointer-events-none absolute inset-0 opacity-50">
        <AgentGraphCanvas />
      </div>

      {/* Radial gradient overlay */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-radial from-transparent via-slate-50/50 to-slate-50 dark:via-[#020617]/50 dark:to-[#020617]" />

      {/* Animated floating orbs */}
      <motion.div
        className="pointer-events-none absolute left-[10%] top-[20%] h-64 w-64 rounded-full bg-cyan-500/10 blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="pointer-events-none absolute right-[10%] bottom-[20%] h-64 w-64 rounded-full bg-purple-500/10 blur-3xl"
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.5, 0.3, 0.5],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        style={{ opacity, scale, y }}
        className="relative z-10 mx-auto flex max-w-6xl flex-col items-center gap-10 px-6 py-20 text-center"
      >
        {/* Floating badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as const }}
          className="glass float inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-medium text-cyan-600 dark:text-cyan-300 shadow-lg shadow-cyan-500/10"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-75"></span>
            <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan-500"></span>
          </span>
          Available for Master&apos;s Thesis · August 2026
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] as const, delay: 0.2 }}
          className="space-y-6"
        >
          <h1 className="text-5xl font-bold leading-tight tracking-tight md:text-7xl">
            <motion.span
              className="gradient-text inline-block"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] as const, delay: 0.4 }}
            >
              Anasse El Boudiri
            </motion.span>
          </h1>

          <div className="flex min-h-[3rem] items-center justify-center">
            <motion.p
              key={roleIndex}
              initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -20, filter: "blur(10px)" }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as const }}
              className="text-xl font-medium text-slate-700 dark:text-slate-300 md:text-2xl"
            >
              {roles[roleIndex]}
            </motion.p>
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mx-auto max-w-2xl text-base leading-relaxed text-slate-600 dark:text-slate-400 md:text-lg"
          >
            EPFL Data Science student building real-world{" "}
            <span className="font-semibold text-cyan-600 dark:text-cyan-400">agentic AI systems</span>{" "}
            for NLP, vision, and high-performance ML.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-wrap items-center justify-center gap-4 pt-4"
          >
            <Button
              asChild
              size="lg"
              className="group relative overflow-hidden bg-gradient-to-r from-cyan-500 to-purple-600 text-white shadow-lg shadow-cyan-500/30 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-cyan-500/50"
            >
              <a href="#projects">
                View Projects
                <motion.span
                  className="ml-2 inline-block"
                  animate={{ x: [0, 5, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                >
                  →
                </motion.span>
              </a>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="glass-strong border-slate-300 dark:border-slate-700 transition-all duration-300 hover:scale-105 hover:border-cyan-500/50 hover:bg-slate-200 dark:hover:bg-slate-800/80"
            >
              <a href="#contact">Get in Touch</a>
            </Button>
          </motion.div>
        </motion.div>

        {/* Tech tags */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 1 }}
          className="flex flex-wrap justify-center gap-3 pt-8 text-xs text-slate-600 dark:text-slate-500"
        >
          {["Agentic AI", "RAG", "LLMs", "NLP", "CUDA", "MLOps"].map((tag, i) => (
            <motion.span
              key={tag}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 1.2 + i * 0.1 }}
              whileHover={{ scale: 1.1, color: "#22d3ee" }}
              className="glass cursor-default rounded-full px-3 py-1.5 transition-all duration-300"
            >
              {tag}
            </motion.span>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2 text-xs text-slate-600 dark:text-slate-500"
        >
          <span>Scroll to explore</span>
          <svg
            className="h-5 w-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </motion.div>
      </motion.div>
    </section>
  );
}
