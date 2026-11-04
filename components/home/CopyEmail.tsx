"use client";

import { useEffect, useRef, useState } from "react";

/** The email as a mailto link, with a button that copies it (many people have no mail client set up). */
export function CopyEmail({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);
  const link = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    if (!copied) return;
    const id = setTimeout(() => setCopied(false), 2000);
    return () => clearTimeout(id);
  }, [copied]);

  async function copy() {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
    } catch {
      // Clipboard API refused (permissions, embedded frame): select the address and copy it the old way.
      const selection = window.getSelection();
      if (!link.current || !selection) return;
      selection.selectAllChildren(link.current);
      setCopied(document.execCommand("copy"));
    }
  }

  return (
    <div className="flex flex-wrap items-baseline gap-x-5 gap-y-3">
      <a
        ref={link}
        href={`mailto:${email}`}
        className="font-display text-[clamp(25px,7vw,64px)] leading-none font-extrabold [overflow-wrap:anywhere] decoration-ball decoration-[3px] underline-offset-[6px] hover:underline"
      >
        {email}
      </a>
      <button type="button" onClick={copy} className="btn min-w-[92px] text-center">
        {copied ? "Copied" : "Copy"}
      </button>
      <span role="status" className="sr-only">
        {copied ? "Email copied to the clipboard" : ""}
      </span>
    </div>
  );
}
