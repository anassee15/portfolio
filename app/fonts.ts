import { Big_Shoulders, JetBrains_Mono } from "next/font/google";
import localFont from "next/font/local";

// Big Shoulders has an optical-size axis: large headings get the "Display" cut automatically.
export const bigShoulders = Big_Shoulders({
  subsets: ["latin"],
  axes: ["opsz"],
  variable: "--font-big-shoulders",
});

// Zen Kaku is a Japanese font: from Google, next/font preloads all its CJK slices (~3 MB).
// We self-host only its latin slice (OFL), ~10 KB per weight.
export const zenKaku = localFont({
  src: [
    { path: "./font-files/zen-kaku-gothic-new-latin-400.woff2", weight: "400" },
    { path: "./font-files/zen-kaku-gothic-new-latin-500.woff2", weight: "500" },
    { path: "./font-files/zen-kaku-gothic-new-latin-700.woff2", weight: "700" },
  ],
  variable: "--font-zen-kaku",
});

export const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-jetbrains",
  preload: false,
});

export const fontVariables = [bigShoulders, zenKaku, jetbrains]
  .map((font) => font.variable)
  .join(" ");
