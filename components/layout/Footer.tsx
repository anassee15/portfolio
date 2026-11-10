import Link from "next/link";
import { site } from "@/data/site";
import { getNotes } from "@/lib/notes";

export async function Footer() {
  const hasNotes = (await getNotes()).length > 0;
  return (
    <footer className="page-x meta mt-16 flex flex-wrap justify-between gap-x-6 gap-y-2 border-t border-rule py-4 text-[0.6875rem]">
      <span>
        {site.name} · {site.location}
      </span>
      {/* Mobile only: the nav keeps just the name and Contact. */}
      <span className="flex gap-4 sm:hidden">
        <Link href="/projects">Projects</Link>
        {hasNotes && <Link href="/notes">Notes</Link>}
        <a href={site.cv}>CV</a>
      </span>
      <span>
        Set in Big Shoulders and Zen Kaku Gothic. Drawings in ink, sampled from noise. Updated {site.updated}.
      </span>
    </footer>
  );
}
