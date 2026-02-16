// components/EducationSection.tsx
"use client";

import { education } from "@/data/education";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import Image from "next/image";

export default function EducationSection() {
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
          <span className="gradient-text">Education</span>
        </h2>
        <p className="mt-3 max-w-2xl text-sm md:text-base text-slate-600 dark:text-slate-400">
          Academic background in data science, machine learning, and computer
          systems.
        </p>
      </motion.div>

      <div className="mt-8 md:mt-12 space-y-4 md:space-y-6">
        {education.map((edu, index) => (
          <motion.div
            key={edu.school + edu.degree}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <motion.div
              whileHover={{ scale: 1.02, y: -3 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <Card className="group relative overflow-hidden border-slate-300/80 dark:border-slate-800/50 bg-white dark:bg-slate-900/70 backdrop-blur-xl transition-all duration-300 hover:border-purple-500/40 dark:hover:border-purple-500/30 hover:shadow-xl hover:shadow-purple-500/10">
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                <CardHeader className="relative flex flex-row items-start gap-4">
                  {edu.logo && (
                    <motion.div
                      className="shrink-0 flex items-center justify-center"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      {isImageUrl(edu.logo) ? (
                        <div className="relative w-12 h-12 md:w-14 md:h-14 rounded-lg overflow-hidden bg-white p-2">
                          <Image
                            src={edu.logo}
                            alt={`${edu.school} logo`}
                            fill
                            className="object-contain"
                          />
                        </div>
                      ) : (
                        <div className="text-4xl md:text-5xl">
                          {edu.logo}
                        </div>
                      )}
                    </motion.div>
                  )}
                  <div className="flex-1">
                    <div className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-2">
                      <div className="space-y-1">
                        <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                          {edu.degree}
                        </h3>
                        <p className="text-base text-slate-600 dark:text-slate-400">
                          {edu.school} · {edu.location}
                        </p>
                        {edu.grade && (
                          <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.3, delay: 0.2 }}
                          >
                            <Badge
                              variant="outline"
                              className="mt-2 border-purple-500/40 bg-purple-500/10 text-purple-600 dark:text-purple-300 hover:bg-purple-500/20 transition-colors"
                            >
                              Grade: {edu.grade}
                            </Badge>
                          </motion.div>
                        )}
                      </div>
                      <p className="text-sm font-medium text-slate-500 dark:text-slate-500 shrink-0">
                        {edu.period}
                      </p>
                    </div>
                  </div>
                </CardHeader>

                {edu.coursework && edu.coursework.length > 0 && (
                  <CardContent className="relative">
                    <p className="text-sm font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-3">
                      Coursework
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {edu.coursework.map((course, courseIndex) => (
                        <motion.div
                          key={course}
                          initial={{ opacity: 0, scale: 0.8 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{
                            duration: 0.3,
                            delay: 0.1 + courseIndex * 0.05,
                          }}
                          whileHover={{ scale: 1.05, y: -2 }}
                        >
                          <Badge
                            variant="outline"
                            className="border-slate-300 dark:border-slate-700 bg-slate-100 dark:bg-slate-800/50 text-slate-700 dark:text-slate-300 hover:border-purple-500/50 dark:hover:border-purple-500/50 hover:bg-purple-500/10 hover:text-purple-600 dark:hover:text-purple-400 transition-all duration-300 cursor-default"
                          >
                            {course}
                          </Badge>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                )}

                {/* Decorative corner glow */}
                <motion.div
                  className="absolute -right-8 -bottom-8 w-24 h-24 bg-gradient-to-br from-purple-500/30 to-transparent rounded-full blur-2xl opacity-0 group-hover:opacity-50 transition-opacity duration-500"
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
              </Card>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
