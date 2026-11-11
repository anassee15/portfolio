import "./globals.css";

import type { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { fontVariables } from "./fonts";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { site } from "@/data/site";
import { THEME_COLORS, themeScript } from "@/lib/theme-script";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} · ${site.role}`,
    template: `%s · ${site.name}`,
  },
  description: site.tagline,
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: THEME_COLORS.light },
    { media: "(prefers-color-scheme: dark)", color: THEME_COLORS.dark },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    // The theme script may set data-theme before React hydrates.
    <html lang="en" className={fontVariables} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="min-h-dvh">
        <a
          href="#content"
          className="sr-only z-50 bg-ink text-sm font-medium text-paper focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:px-3 focus:py-2"
        >
          Skip to content
        </a>
        <Nav />
        <div id="content">{children}</div>
        <Footer />
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
