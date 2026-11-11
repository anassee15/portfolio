"use client";

import { useSyncExternalStore } from "react";
import { THEME_COLORS, THEME_KEY as KEY, syncThemeElements, type Theme } from "@/lib/theme-script";

/*
 * The page follows the system colour scheme unless the visitor picks the other one:
 * the choice is kept in localStorage and set as data-theme on <html> (see globals.css).
 */
export type { Theme };

const DARK_QUERY = "(prefers-color-scheme: dark)";

function subscribe(onChange: () => void) {
  const media = window.matchMedia(DARK_QUERY);
  media.addEventListener("change", onChange);
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
  return () => {
    media.removeEventListener("change", onChange);
    observer.disconnect();
  };
}

function readOverride(): Theme | null {
  const value = document.documentElement.dataset.theme;
  return value === "light" || value === "dark" ? value : null;
}

const systemTheme = (): Theme => (window.matchMedia(DARK_QUERY).matches ? "dark" : "light");

/** The theme picked with the toggle, or null when the page follows the system (and on the server). */
export function useThemeOverride() {
  return useSyncExternalStore(subscribe, readOverride, () => null);
}

/** The theme on screen. */
export function useTheme(): Theme {
  return useSyncExternalStore(subscribe, () => readOverride() ?? systemTheme(), () => "light");
}

/** Shows `theme`. Picking the system's own theme drops the override, so the page follows the system again. */
export function setTheme(theme: Theme) {
  const root = document.documentElement;
  const follow = theme === systemTheme();
  if (follow) delete root.dataset.theme;
  else root.dataset.theme = theme;
  syncThemeElements(follow ? null : theme, THEME_COLORS);
  try {
    if (follow) localStorage.removeItem(KEY);
    else localStorage.setItem(KEY, theme);
  } catch {
    // Storage blocked: the choice lasts for this page only.
  }
}
