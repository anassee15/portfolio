"use client";

import { setTheme, useTheme } from "@/lib/theme";

// Line icons on the 24 grid, like components/icons.
const MOON = "M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9z";
const SUN =
  "M12 8a4 4 0 1 1 0 8a4 4 0 0 1 0-8z M12 2v2 M12 20v2 M4.93 4.93l1.41 1.41 M17.66 17.66l1.41 1.41 M2 12h2 M20 12h2 M6.34 17.66l-1.41 1.41 M19.07 4.93l-1.41 1.41";

const icon =
  "absolute inset-0 size-full transition-[transform,opacity] duration-500 ease-ink motion-reduce:transition-none";

/** Shows where a click leads: the moon on a light page, the sun on a dark one. CSS picks it, so it is right from the first paint. */
export function ThemeToggle() {
  const next = useTheme() === "dark" ? "light" : "dark";
  return (
    <button
      type="button"
      onClick={() => setTheme(next)}
      aria-label={`Switch to ${next} theme`}
      title={`Switch to ${next} theme`}
      className="-mx-1 grid size-9 place-items-center text-ink-2 transition-colors hover:text-ink"
    >
      <span aria-hidden className="relative size-[18px]">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.6}
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`${icon} dark:scale-50 dark:-rotate-90 dark:opacity-0`}
        >
          <path d={MOON} />
        </svg>
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.6}
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`${icon} scale-50 rotate-90 opacity-0 dark:scale-100 dark:rotate-0 dark:opacity-100`}
        >
          <path d={SUN} />
        </svg>
      </span>
    </button>
  );
}
