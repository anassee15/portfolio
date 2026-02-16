// app/layout.tsx
import "./globals.css";

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import ScrollProgress from "@/components/ScrollProgress";
import Navigation from "@/components/Navigation";
import { ThemeProvider } from "@/components/ThemeProvider";
import { SpeedInsights } from "@vercel/speed-insights/next"

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Anasse El Boudiri - Portfolio",
  description:
    "EPFL Data Science student building agentic AI systems for NLP, vision, and high-performance ML.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${inter.className} bg-white dark:bg-[#020617] text-slate-900 dark:text-slate-100 antialiased transition-colors duration-300`}
      >
        <ThemeProvider>
          <ScrollProgress />
          <Navigation />
          {children}
          <SpeedInsights />
        </ThemeProvider>
      </body>
    </html>
  );
}
