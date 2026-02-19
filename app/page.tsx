// app/page.tsx
"use client";

import { motion } from "framer-motion";
import Hero from "@/components/Hero";
import AboutSection from "@/components/AboutSection";
import ProjectsSection from "@/components/ProjectsSection";
import ExperienceSection from "@/components/ExperienceSection";
import EducationSection from "@/components/EducationSection";
import SkillsSection from "@/components/SkillsSection";
import ContactSection from "@/components/ContactSection";

const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.1 * i,
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  }),
};

export default function HomePage() {
  return (
    <main id="top" className="relative min-h-screen bg-slate-50 dark:bg-[#020617] text-slate-900 dark:text-slate-100">
      <Hero />

      <motion.section
        id="about"
        className="mx-auto max-w-6xl px-4 md:px-6 py-16 md:py-28"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        variants={sectionVariants}
        custom={0}
      >
        <AboutSection />
      </motion.section>

      <motion.section
        id="projects"
        className="mx-auto max-w-6xl px-4 md:px-6 py-16 md:py-28"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        variants={sectionVariants}
        custom={1}
      >
        <ProjectsSection />
      </motion.section>

      <motion.section
        id="experience"
        className="mx-auto max-w-6xl px-4 md:px-6 py-16 md:py-28"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        variants={sectionVariants}
        custom={2}
      >
        <ExperienceSection />
      </motion.section>

      <motion.section
        id="education"
        className="mx-auto max-w-6xl px-4 md:px-6 py-16 md:py-28"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        variants={sectionVariants}
        custom={3}
      >
        <EducationSection />
      </motion.section>

      <motion.section
        id="skills"
        className="mx-auto max-w-6xl px-4 md:px-6 py-16 md:py-28"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        variants={sectionVariants}
        custom={4}
      >
        <SkillsSection />
      </motion.section>

      <motion.section
        id="contact"
        className="mx-auto max-w-6xl px-4 md:px-6 py-16 md:py-28 pb-24 md:pb-40"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        variants={sectionVariants}
        custom={5}
      >
        <ContactSection />
      </motion.section>
    </main>
  );
}
