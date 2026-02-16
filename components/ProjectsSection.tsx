// components/ProjectsSection.tsx
"use client";

import { projects } from "@/data/projects";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { motion } from "framer-motion";

export default function ProjectsSection() {
  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-2xl md:text-3xl font-bold">
          <span className="gradient-text">Featured Projects</span>
        </h2>
        <p className="mt-3 max-w-2xl text-sm md:text-base text-slate-600 dark:text-slate-400">
          A selection of projects spanning agentic AI, NLP, computer vision, and
          robotics-style systems. Each project demonstrates production-grade
          engineering and research thinking.
        </p>
      </motion.div>

      <div className="mt-8 md:mt-12 grid gap-4 md:gap-6 lg:grid-cols-2">
        {projects.map((project, index) => (
          <motion.div
            key={project.title}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card className="group h-full border-slate-300/80 dark:border-slate-800/50 bg-white dark:bg-slate-900/70 transition-all duration-300 hover:scale-[1.02] hover:border-cyan-600/40 dark:hover:border-cyan-500/30 hover:bg-white dark:hover:bg-slate-900/90 hover:shadow-xl hover:shadow-cyan-500/10">
              <CardHeader className="flex flex-row items-start gap-4">
                {project.logo && (
                  <motion.div
                    className="text-5xl shrink-0"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    {project.logo}
                  </motion.div>
                )}
                <div className="flex-1">
                  <div className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-2">
                    <div className="space-y-2">
                      <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
                        {project.title}
                      </h3>
                      {project.subtitle && (
                        <p className="text-sm text-slate-600 dark:text-slate-400">
                          {project.subtitle}
                        </p>
                      )}
                      <div className="flex flex-wrap gap-2 pt-2">
                        {project.tags.map((tag: string, i: number) => (
                          <motion.div
                            key={tag}
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.3, delay: index * 0.1 + i * 0.05 }}
                          >
                            <Badge
                              variant="outline"
                              className="border-cyan-500/40 bg-cyan-500/10 text-xs text-cyan-600 dark:text-cyan-300"
                            >
                              {tag}
                            </Badge>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                    {project.period && (
                      <p className="text-sm font-medium text-slate-500 dark:text-slate-500 shrink-0">
                        {project.period}
                      </p>
                    )}
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-base leading-relaxed text-slate-700 dark:text-slate-300">
                  {project.summary}
                </p>
                <ul className="list-disc space-y-2 pl-5 text-base text-slate-700 dark:text-slate-300 leading-relaxed">
                  {project.highlights.map((highlight: string) => (
                    <motion.li
                      key={highlight}
                      whileHover={{ x: 3 }}
                      transition={{ duration: 0.2 }}
                    >
                      {highlight}
                    </motion.li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
