// components/ExperienceSection.tsx
"use client";

import { experience } from "@/data/experience";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { motion } from "framer-motion";
import Image from "next/image";

export default function ExperienceSection() {
  const isImageUrl = (logo: string) => {
    return logo.startsWith('http') || logo.startsWith('/');
  };

  return (
    <div>
      <h2 className="text-2xl md:text-3xl font-bold">
        <span className="gradient-text">Experience</span>
      </h2>
      <p className="mt-3 max-w-2xl text-sm md:text-base text-slate-600 dark:text-slate-400">
        Roles where I applied AI, NLP, and high-performance computing to real-world problems.
      </p>

      <div className="mt-8 md:mt-12 space-y-4 md:space-y-6">
        {experience.map((exp, index) => (
          <motion.div
            key={exp.company + exp.role}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: index * 0.2 }}
          >
            <Card className="group relative shimmer card-3d border-slate-300/80 dark:border-slate-800/50 bg-white/80 dark:bg-slate-900/70 backdrop-blur-xl transition-all duration-500 hover:border-cyan-600/60 dark:hover:border-cyan-500/50 hover:shadow-2xl hover:shadow-cyan-500/20">
              <CardHeader className="flex flex-row items-start gap-4 relative z-10">
                {exp.logo && (
                  <motion.div
                    className="shrink-0 flex items-center justify-center"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 200, damping: 15 }}
                  >
                    {isImageUrl(exp.logo) ? (
                      <div className="relative w-12 h-12 md:w-14 md:h-14 rounded-lg overflow-hidden bg-white p-2">
                        <Image
                          src={exp.logo}
                          alt={`${exp.company} logo`}
                          fill
                          className="object-contain"
                        />
                      </div>
                    ) : (
                      <div className="text-4xl md:text-5xl">
                        {exp.logo}
                      </div>
                    )}
                  </motion.div>
                )}
                <div className="flex-1">
                  <div className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-2">
                    <div className="space-y-1">
                      <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
                        {exp.role}
                      </h3>
                      <p className="text-base text-slate-600 dark:text-slate-400">
                        {exp.company} · {exp.location}
                      </p>
                    </div>
                    <p className="text-sm font-medium text-slate-500 dark:text-slate-500 shrink-0">{exp.period}</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="relative z-10">
                <ul className="list-disc space-y-2 pl-5 text-base text-slate-700 dark:text-slate-300 leading-relaxed">
                  {exp.points.map((p) => (
                    <motion.li
                      key={p}
                      whileHover={{ x: 3 }}
                      transition={{ duration: 0.2 }}
                    >
                      {p}
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
