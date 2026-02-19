// components/Navigation.tsx
"use client";

import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Moon, Sun, Menu, X } from "lucide-react";
import { useTheme } from "./ThemeProvider";

export default function Navigation() {
  const { scrollY } = useScroll();
  const headerOpacity = useTransform(scrollY, [0, 100], [0.8, 1]);
  const borderOpacity = useTransform(scrollY, [0, 50], [0.6, 1]);
  const [activeSection, setActiveSection] = useState("#top");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const sections = ["top", "about", "projects", "experience", "education", "skills", "contact"];

    const observerOptions = {
      root: null,
      rootMargin: "-20% 0px -60% 0px",
      threshold: 0,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(`#${entry.target.id}`);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    sections.forEach((section) => {
      const element = document.getElementById(section);
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      sections.forEach((section) => {
        const element = document.getElementById(section);
        if (element) {
          observer.unobserve(element);
        }
      });
    };
  }, []);

  const navItems = [
    { href: "#about", label: "About" },
    { href: "#projects", label: "Projects" },
    { href: "#experience", label: "Experience" },
    { href: "#education", label: "Education" },
    { href: "#skills", label: "Skills" },
    { href: "#contact", label: "Contact" },
  ];

  const handleNavClick = (href: string) => {
    setActiveSection(href);
    setMobileMenuOpen(false);
  };

  return (
    <>
      <motion.header
        style={{
          opacity: headerOpacity,
          borderBottomColor: useTransform(
            borderOpacity,
            (v) => `rgba(148, 163, 184, ${v * 0.6})`
          )
        }}
        className="glass-strong sticky top-0 z-30 border-b backdrop-blur-xl shadow-sm"
      >
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 sm:px-6 py-3 sm:py-4">
          {/* Logo/Name */}
          <motion.a
            href="#top"
            className="group relative font-bold text-sm sm:text-base md:text-base lg:text-lg tracking-tight text-slate-900 dark:text-slate-100"
            onClick={() => handleNavClick("#top")}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="relative z-10 transition-colors duration-300 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-cyan-500 group-hover:to-purple-600">
              Anasse El Boudiri
            </span>

            {/* Animated underline on hover */}
            <motion.div
              className="absolute -bottom-0.5 left-0 right-0 h-0.5 bg-gradient-to-r from-cyan-500 to-purple-600 opacity-0 group-hover:opacity-100"
              initial={{ scaleX: 0 }}
              whileHover={{ scaleX: 1 }}
              transition={{ duration: 0.3 }}
            />
          </motion.a>

          {/* Desktop Nav Items & Theme Toggle */}
          <div className="hidden md:flex items-center gap-1 lg:gap-2">
            {navItems.map((item, index) => (
              <motion.a
                key={item.href}
                href={item.href}
                className="group relative px-2 lg:px-3 py-2 text-xs lg:text-sm font-medium transition-colors duration-300"
                onClick={() => setActiveSection(item.href)}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                {/* Background highlight on hover */}
                <motion.div
                  className="absolute inset-0 rounded-lg bg-gradient-to-br from-cyan-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100"
                  transition={{ duration: 0.3 }}
                />

                {/* Text */}
                <span
                  className={`relative z-10 transition-colors duration-300 ${
                    activeSection === item.href
                      ? "text-cyan-600 dark:text-cyan-400"
                      : "text-slate-700 dark:text-slate-300 group-hover:text-cyan-600 dark:group-hover:text-cyan-400"
                  }`}
                >
                  {item.label}
                </span>

                {/* Active indicator */}
                {activeSection === item.href && (
                  <motion.div
                    layoutId="activeSection"
                    className="absolute -bottom-0.5 left-1 right-1 lg:left-2 lg:right-2 h-0.5 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-full"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}

                {/* Subtle glow effect on hover - only on larger screens */}
                <motion.div
                  className="hidden lg:block absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 blur-xl bg-gradient-to-r from-cyan-500/20 to-purple-500/20 -z-10"
                  transition={{ duration: 0.3 }}
                />
              </motion.a>
            ))}

            {/* Divider */}
            <motion.div
              className="mx-1 lg:mx-2 h-6 w-px bg-slate-300 dark:bg-slate-700"
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              transition={{ duration: 0.3, delay: 0.4 }}
            />

            {/* Theme Toggle Button */}
            <motion.button
              onClick={toggleTheme}
              className="group relative p-2 lg:p-2.5 rounded-xl bg-slate-200/50 dark:bg-slate-800/50 border border-slate-300/50 dark:border-slate-700/50 transition-all duration-300 hover:border-cyan-500/50 dark:hover:border-cyan-500/50 hover:shadow-lg hover:shadow-cyan-500/20"
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.5 }}
              whileHover={{ scale: 1.05, rotate: 5 }}
              whileTap={{ scale: 0.95, rotate: -5 }}
              aria-label="Toggle theme"
            >
              {/* Gradient overlay on hover */}
              <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-cyan-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <AnimatePresence mode="wait" initial={false}>
                {theme === "dark" ? (
                  <motion.div
                    key="sun"
                    initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
                    animate={{ rotate: 0, opacity: 1, scale: 1 }}
                    exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] as const }}
                  >
                    <Sun
                      size={16}
                      className="lg:w-[18px] lg:h-[18px] text-slate-700 dark:text-slate-300 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors relative z-10"
                    />
                  </motion.div>
                ) : (
                  <motion.div
                    key="moon"
                    initial={{ rotate: 90, opacity: 0, scale: 0.5 }}
                    animate={{ rotate: 0, opacity: 1, scale: 1 }}
                    exit={{ rotate: -90, opacity: 0, scale: 0.5 }}
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] as const }}
                  >
                    <Moon
                      size={16}
                      className="lg:w-[18px] lg:h-[18px] text-slate-700 dark:text-slate-300 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors relative z-10"
                    />
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Rotating glow on hover */}
              <motion.div
                className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 blur-lg bg-gradient-to-r from-cyan-500/30 to-purple-500/30 -z-10"
                animate={{ rotate: 360 }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              />
            </motion.button>
          </div>

          {/* Mobile Menu Button and Theme Toggle */}
          <div className="flex md:hidden items-center gap-2">
            <motion.button
              onClick={toggleTheme}
              className="group relative p-2 sm:p-2.5 rounded-lg bg-slate-200/50 dark:bg-slate-800/50 border border-slate-300/50 dark:border-slate-700/50"
              whileTap={{ scale: 0.95 }}
              aria-label="Toggle theme"
            >
              {theme === "dark" ? (
                <Sun size={18} className="text-slate-700 dark:text-slate-300" />
              ) : (
                <Moon size={18} className="text-slate-700 dark:text-slate-300" />
              )}
            </motion.button>

            <motion.button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 sm:p-2.5 rounded-lg bg-slate-200/50 dark:bg-slate-800/50 border border-slate-300/50 dark:border-slate-700/50"
              whileTap={{ scale: 0.95 }}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X size={20} className="text-slate-700 dark:text-slate-300" />
              ) : (
                <Menu size={20} className="text-slate-700 dark:text-slate-300" />
              )}
            </motion.button>
          </div>
        </nav>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed top-[65px] sm:top-[73px] left-0 right-0 z-20 md:hidden glass-strong border-b border-slate-300/60 dark:border-slate-800/60 backdrop-blur-xl"
          >
            <nav className="mx-auto max-w-6xl px-4 sm:px-6 py-3 sm:py-4">
              <div className="flex flex-col gap-2">
                {navItems.map((item, index) => (
                  <motion.a
                    key={item.href}
                    href={item.href}
                    className={`px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg text-sm font-medium transition-colors duration-300 ${
                      activeSection === item.href
                        ? "bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20"
                        : "text-slate-700 dark:text-slate-300 hover:bg-slate-200/50 dark:hover:bg-slate-800/50"
                    }`}
                    onClick={() => handleNavClick(item.href)}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {item.label}
                  </motion.a>
                ))}
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
