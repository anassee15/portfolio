// components/ContactSection.tsx
"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Mail, MapPin, Github, Linkedin, ArrowRight } from "lucide-react";

export default function ContactSection() {
  const contactItems = [
    {
      icon: Mail,
      label: "Email",
      value: "anasse.elboudiri@epfl.ch",
      href: "mailto:anasse.elboudiri@epfl.ch",
      type: "email",
    },
    {
      icon: MapPin,
      label: "Location",
      value: "Lausanne, Switzerland",
      type: "location",
    },
  ];

  const socialLinks = [
    {
      icon: Github,
      label: "GitHub",
      href: "https://github.com/anassee15",
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/anasse-elboudiri",
    },
  ];

  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl font-bold">
          <span className="gradient-text">Let&apos;s Connect</span>
        </h2>
        <p className="mt-3 max-w-2xl text-slate-600 dark:text-slate-400 leading-relaxed">
          I&apos;m open to master&apos;s thesis projects, research collaborations, and
          internships in applied AI, NLP, and agentic systems starting August 2026.
        </p>
      </motion.div>

      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {/* Contact Method Cards */}
        {contactItems.map((item, index) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{
              duration: 0.6,
              delay: 0.2 + index * 0.1,
              ease: [0.16, 1, 0.3, 1] as const,
            }}
          >
            <motion.div
              whileHover={{ scale: 1.03, y: -5 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <Card className="group relative overflow-hidden h-full border-slate-300/80 dark:border-slate-800/50 bg-white dark:bg-slate-900/70 backdrop-blur-xl transition-all duration-300 hover:border-cyan-500/50 hover:shadow-xl hover:shadow-cyan-500/20">
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                <CardContent className="p-6 relative">
                  <div className="flex items-start gap-4">
                    <motion.div
                      whileHover={{ rotate: 360, scale: 1.2 }}
                      transition={{ duration: 0.6 }}
                      className="shrink-0 p-3 rounded-xl bg-cyan-500/10 dark:bg-cyan-500/20 border border-cyan-500/30"
                    >
                      <item.icon className="w-6 h-6 text-cyan-600 dark:text-cyan-400" />
                    </motion.div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
                        {item.label}
                      </p>
                      {item.href ? (
                        <motion.a
                          href={item.href}
                          className="block text-base font-semibold text-slate-900 dark:text-slate-100 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors break-all leading-snug"
                          whileHover={{ x: 3 }}
                          transition={{ duration: 0.2 }}
                        >
                          {item.value}
                          <motion.span
                            className="inline-block ml-2 opacity-0 group-hover:opacity-100 transition-opacity"
                            animate={{ x: [0, 3, 0] }}
                            transition={{ repeat: Infinity, duration: 1.5 }}
                          >
                            →
                          </motion.span>
                        </motion.a>
                      ) : (
                        <p className="text-base font-semibold text-slate-900 dark:text-slate-100 leading-snug">
                          {item.value}
                        </p>
                      )}
                    </div>
                  </div>
                </CardContent>

                {/* Decorative corner glow */}
                <motion.div
                  className="absolute -right-8 -bottom-8 w-24 h-24 bg-gradient-to-br from-cyan-500/30 to-transparent rounded-full blur-2xl opacity-0 group-hover:opacity-50 transition-opacity duration-500"
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

        {/* Social Links Card */}
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{
            duration: 0.6,
            delay: 0.4,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          <motion.div
            whileHover={{ scale: 1.03, y: -5 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <Card className="group relative overflow-hidden h-full border-slate-300/80 dark:border-slate-800/50 bg-white dark:bg-slate-900/70 backdrop-blur-xl transition-all duration-300 hover:border-purple-500/50 hover:shadow-xl hover:shadow-purple-500/20">
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

              <CardContent className="p-6 relative">
                <div className="flex items-center gap-2 mb-4">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="text-2xl"
                  >
                    🌐
                  </motion.div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    Social Links
                  </p>
                </div>

                <div className="flex flex-col gap-3">
                  {socialLinks.map((social, index) => (
                    <motion.div
                      key={social.label}
                      initial={{ opacity: 0, scale: 0.8, x: -10 }}
                      whileInView={{ opacity: 1, scale: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 0.4,
                        delay: 0.5 + index * 0.1,
                        type: "spring",
                        stiffness: 200,
                      }}
                      whileHover={{ scale: 1.05, x: 5 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Button
                        variant="outline"
                        asChild
                        className="w-full group/btn border-slate-300 dark:border-slate-700 bg-slate-100 dark:bg-slate-800/50 transition-all duration-300 hover:border-purple-500 dark:hover:border-purple-500/50 hover:bg-purple-500/10 hover:text-purple-600 dark:hover:text-purple-400 hover:shadow-lg hover:shadow-purple-500/20"
                      >
                        <a
                          href={social.href}
                          target="_blank"
                          rel="noreferrer"
                          className="flex items-center justify-between gap-2"
                        >
                          <div className="flex items-center gap-2">
                            <social.icon className="w-4 h-4" />
                            <span>{social.label}</span>
                          </div>
                          <motion.div
                            className="opacity-0 group-hover/btn:opacity-100 transition-opacity"
                            animate={{ x: [0, 3, 0] }}
                            transition={{ repeat: Infinity, duration: 1.5 }}
                          >
                            <ArrowRight className="w-3 h-3" />
                          </motion.div>
                        </a>
                      </Button>
                    </motion.div>
                  ))}
                </div>
              </CardContent>

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
      </div>

      {/* Call to Action */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="mt-8 text-center"
      >
        <motion.p
          className="text-sm text-slate-600 dark:text-slate-400"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
          💡 Feel free to reach out for collaborations or just to chat about AI!
        </motion.p>
      </motion.div>
    </div>
  );
}
