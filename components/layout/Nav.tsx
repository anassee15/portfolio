import Link from "next/link";
import { site } from "@/data/site";
import { getNotes } from "@/lib/notes";

export async function Nav() {
  // "Notes" shows up once a note is published (in development, drafts count).
  const hasNotes = (await getNotes()).length > 0;
  return (
    <header className="page-x border-b border-rule">
      <nav aria-label="Main" className="flex items-center gap-5 py-4 sm:gap-6">
        <Link
          href="/"
          className="mr-auto font-display text-[1.0625rem] leading-none font-extrabold tracking-[0.03em] uppercase"
        >
          {site.name}
        </Link>
        <div className="hidden items-center gap-6 text-sm font-medium text-ink-2 sm:flex">
          <Link href="/projects">Projects</Link>
          {hasNotes && <Link href="/notes">Notes</Link>}
          <a href={site.cv}>CV</a>
        </div>
        <Link href="/#contact" className="bg-ink px-3 py-2 text-sm font-medium text-paper">
          Contact
        </Link>
      </nav>
    </header>
  );
}
