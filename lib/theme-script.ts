export type Theme = "light" | "dark";

/** localStorage key of the theme picked with the toggle (see lib/theme.ts). */
export const THEME_KEY = "theme";

/** Page background per theme, also used as the browser bar colour. */
export const THEME_COLORS: Record<Theme, string> = { light: "#f4f3ef", dark: "#141417" };

/**
 * Brings what CSS cannot reach in line with the picked theme (null: follow the system):
 * the browser bar colour, and the dark <source> of pictures marked data-dark.
 * Also serialised into the <head> script, so it may only use its arguments and globals.
 */
export function syncThemeElements(theme: Theme | null, colors: Record<Theme, string>) {
  document.querySelectorAll<HTMLMetaElement>('meta[name="theme-color"]').forEach((meta) => {
    const color = theme ? colors[theme] : colors[meta.media.includes("dark") ? "dark" : "light"];
    if (meta.content !== color) meta.content = color;
  });
  document.querySelectorAll<HTMLSourceElement>("source[data-dark]").forEach((source) => {
    const media = theme ? (theme === "dark" ? "all" : "not all") : "(prefers-color-scheme: dark)";
    if (source.media !== media) source.media = media;
  });
}

/**
 * Runs in <head> before the first paint, so a saved theme never flashes the other one.
 * While the page is parsed, elements are synced as soon as they arrive.
 */
export const themeScript = `(function(sync,colors){try{
var t=localStorage.getItem("${THEME_KEY}");
if(t!=="light"&&t!=="dark")return;
document.documentElement.dataset.theme=t;
var run=function(){sync(t,colors)};
run();
var observer=new MutationObserver(run);
observer.observe(document.documentElement,{childList:true,subtree:true});
document.addEventListener("DOMContentLoaded",function(){observer.disconnect();run()});
}catch(e){}})(${syncThemeElements.toString()},${JSON.stringify(THEME_COLORS)})`;
