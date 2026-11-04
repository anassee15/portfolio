import { Big_Shoulders, Caveat_Brush, JetBrains_Mono, Zen_Kaku_Gothic_New } from "next/font/google";

// Big Shoulders has an optical-size axis: large headings get the "Display" cut automatically.
export const bigShoulders = Big_Shoulders({
  subsets: ["latin"],
  axes: ["opsz"],
  variable: "--font-big-shoulders",
});

export const zenKaku = Zen_Kaku_Gothic_New({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-zen-kaku",
});

export const caveatBrush = Caveat_Brush({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-caveat-brush",
  preload: false,
});

export const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-jetbrains",
  preload: false,
});

export const fontVariables = [bigShoulders, zenKaku, caveatBrush, jetbrains]
  .map((font) => font.variable)
  .join(" ");
