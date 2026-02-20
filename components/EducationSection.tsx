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
            transition={{ duration: 0.7, delay: index * 0.15 }}
          >
            <Card className="group h-full overflow-hidden border-slate-300/80 dark:border-slate-800/50 bg-white dark:bg-slate-900/70 transition-all duration-300 hover:scale-[1.02] hover:border-purple-600/40 dark:hover:border-purple-500/30 hover:bg-white dark:hover:bg-slate-900/90 hover:shadow-xl hover:shadow-purple-500/10">

                <CardHeader className="flex flex-row items-start gap-4">
                  {edu.logo && (
                    <div className="shrink-0 flex items-center justify-center">
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
                    </div>
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
                          <Badge
                            variant="outline"
                            className="mt-2 border-purple-500/40 bg-purple-500/10 text-purple-600 dark:text-purple-300 hover:bg-purple-500/20 transition-colors"
                          >
                            Grade: {edu.grade}
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm font-medium text-slate-500 dark:text-slate-500 shrink-0">
                        {edu.period}
                      </p>
                    </div>
                  </div>
                </CardHeader>

                {edu.coursework && edu.coursework.length > 0 && (
                  <CardContent>
                    <p className="text-sm font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-3">
                      Coursework
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {edu.coursework.map((course) => (
                        <motion.div
                          key={course}
                          whileHover={{ scale: 1.05, y: -2 }}
                          transition={{ duration: 0.2 }}
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
              </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
