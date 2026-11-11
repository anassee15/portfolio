import { Section } from "@/components/layout/Section";
import { site } from "@/data/site";

export function Contact() {
  return (
    <Section label="Contact" id="contact">
      <h2 className="mb-2 font-display text-[clamp(1.625rem,3.6vw,2.25rem)] leading-[1.02] font-extrabold">
        Let&apos;s talk
      </h2>
      <p className="mb-7 max-w-[62ch] text-[1.0625rem]">
        I&apos;m looking for a role as {listOf(site.roles)}.
      </p>
      <a
        href={`mailto:${site.email}`}
        className="font-display text-[clamp(1.5625rem,7vw,4rem)] leading-none font-extrabold [overflow-wrap:anywhere] decoration-ball decoration-[3px] underline-offset-[6px] hover:underline"
      >
        {site.email}
      </a>
      <ul className="mt-7 flex flex-wrap gap-x-6 gap-y-2 text-[0.9375rem]">
        <li>
          <a href={site.links.linkedin} className="link">
            LinkedIn
          </a>
        </li>
        <li>
          <a href={site.links.github} className="link">
            GitHub
          </a>
        </li>
        <li>
          <a href={site.cv} className="link" download>
            Download CV (PDF)
          </a>
        </li>
      </ul>
    </Section>
  );
}

/** ["a", "b", "c"] → "a, b or c" */
function listOf(items: readonly string[]) {
  return items.length < 2 ? items.join("") : `${items.slice(0, -1).join(", ")} or ${items[items.length - 1]}`;
}
