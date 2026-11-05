import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Not found" };

export default function NotFound() {
  return (
    <main className="page-x pt-[clamp(56px,12vw,120px)] pb-8">
      <p className="meta">404</p>
      <h1 className="mt-2.5 mb-4 font-display text-[clamp(56px,12vw,128px)] leading-[0.88] font-black uppercase">
        Air ball.
      </h1>
      <p className="max-w-[44ch] text-[19px] leading-normal">Nothing at this address: the page moved, or never existed.</p>
      <p className="mt-7 flex flex-wrap gap-x-6 gap-y-2">
        <Link href="/" className="link">
          Back to the home page
        </Link>
        <Link href="/projects" className="link">
          See the projects
        </Link>
      </p>
    </main>
  );
}
