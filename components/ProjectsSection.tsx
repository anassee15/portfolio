// components/ProjectsSection.tsx
"use client";

import { projects } from "@/data/projects";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { motion } from "framer-motion";
import Image from "next/image";

export default function ProjectsSection() {
  const isImageUrl = (logo: string) => {
    return logo.startsWith('http') || logo.startsWith('/');
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
          <span className="gradient-text">Featured Projects</span>
        </h2>
        <p className="mt-3 text-sm md:text-base text-slate-600 dark:text-slate-400">
          A selection of projects spanning agentic AI, NLP, computer vision, and robotics-style systems.
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
                    className="shrink-0 flex items-center justify-center"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    {isImageUrl(project.logo) ? (
                      <div className="relative w-12 h-12 md:w-14 md:h-14 rounded-lg overflow-hidden bg-white p-2">
                        <Image
                          src={project.logo}
                          alt={`${project.company || project.title} logo`}
                          fill
                          className="object-contain"
                        />
                      </div>
                    ) : (
                      <div className="text-4xl md:text-5xl">
                        {project.logo}
                      </div>
                    )}
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
              <CardContent className="space-y-4 relative z-10">
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

                {/* Project Links */}
                {project.links && Object.keys(project.links).length > 0 && (
                  <div className="flex flex-wrap gap-3 pt-2">
                    {project.links.github && (
                      <motion.a
                        href={project.links.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 glass px-4 py-2 rounded-lg text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors"
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                        </svg>
                        GitHub
                      </motion.a>
                    )}

                    {project.links.demo && (
                      <motion.a
                        href={project.links.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 glass px-4 py-2 rounded-lg text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors"
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                        Demo
                      </motion.a>
                    )}

                    {project.links.paper && (
                      <motion.a
                        href={project.links.paper}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 glass px-4 py-2 rounded-lg text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors"
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        Paper
                      </motion.a>
                    )}

                    {project.links.report && (
                      <motion.a
                        href={project.links.report}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 glass px-4 py-2 rounded-lg text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors"
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        Report
                      </motion.a>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
