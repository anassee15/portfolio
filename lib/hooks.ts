"use client";

import { useCallback, useEffect, useState, useSyncExternalStore } from "react";

export function useMediaQuery(query: string, serverValue = false) {
  const subscribe = useCallback(
    (onChange: () => void) => {
      const list = window.matchMedia(query);
      list.addEventListener("change", onChange);
      return () => list.removeEventListener("change", onChange);
    },
    [query],
  );
  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(query).matches,
    () => serverValue,
  );
}

export function usePrefersReducedMotion() {
  // Assume reduced motion until the client says otherwise: nothing moves before hydration.
  return useMediaQuery("(prefers-reduced-motion: reduce)", true);
}

/** Reads CSS custom properties from :root, refreshed when the colour scheme changes. */
export function useCssVariables<T extends string>(names: readonly T[]): Record<T, string> | null {
  const dark = useMediaQuery("(prefers-color-scheme: dark)");
  const [values, setValues] = useState<Record<T, string> | null>(null);
  const key = names.join(",");

  useEffect(() => {
    const style = getComputedStyle(document.documentElement);
    const read = Object.fromEntries(
      key.split(",").map((name) => [name, style.getPropertyValue(`--${name}`).trim()]),
    ) as Record<T, string>;
    // eslint-disable-next-line react-hooks/set-state-in-effect -- syncing from the DOM, after paint
    setValues(read);
  }, [key, dark]);

  return values;
}

type InViewOptions = { rootMargin?: string; once?: boolean };

/** True while the element is in (or near, with rootMargin) the viewport. */
export function useInView(ref: React.RefObject<Element | null>, { rootMargin = "0px", once = false }: InViewOptions = {}) {
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
        if (once && entry.isIntersecting) observer.disconnect();
      },
      { rootMargin },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, [ref, rootMargin, once]);

  return inView;
}

/** The element's content width in pixels, kept up to date; `fallback` until it is measured. */
export function useElementWidth(ref: React.RefObject<Element | null>, fallback: number) {
  const [width, setWidth] = useState(fallback);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const observer = new ResizeObserver(([entry]) => setWidth(Math.round(entry.contentRect.width)));
    observer.observe(element);
    return () => observer.disconnect();
  }, [ref]);

  return width;
}

let webglSupport: boolean | undefined;

function detectWebGL() {
  if (webglSupport === undefined) {
    try {
      webglSupport = !!document.createElement("canvas").getContext("webgl2");
    } catch {
      webglSupport = false;
    }
  }
  return webglSupport;
}

export function useWebGL() {
  return useSyncExternalStore(
    () => () => {},
    detectWebGL,
    () => true,
  );
}
