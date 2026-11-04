import { Section } from "@/components/layout/Section";
import { site } from "@/data/site";
import { CopyEmail } from "./CopyEmail";

export function Contact() {
  return (
    <Section label="Contact" id="contact">
      <h2 className="mb-2 font-display text-[clamp(26px,3.6vw,36px)] leading-[1.02] font-extrabold">
        Available from {site.availableFrom}
      </h2>
      <p className="mb-7 max-w-[62ch] text-[17px]">
        I&apos;m looking for a role as {listOf(site.roles)}, in Switzerland.
      </p>
      <CopyEmail email={site.email} />
      <ul className="mt-7 flex flex-wrap gap-x-6 gap-y-2 text-[15px]">
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
