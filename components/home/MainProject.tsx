import Link from "next/link";
import { Figures } from "@/components/charts/Figures";
import { EvaBrain } from "@/components/ink/diagrams/EvaBrain";
import { Section } from "@/components/layout/Section";
import { HarnessArchitecture } from "@/components/project/eva/HarnessArchitecture";
import { getProjectBySlug } from "@/data/projects";

export function MainProject() {
  const eva = getProjectBySlug("eva")!;

  return (
    <Section label="Main project" id="eva">
      <div className="grid items-start gap-x-10 gap-y-5 md:grid-cols-2">
        <div>
          <h2 className="mb-3 font-display text-[clamp(26px,3.6vw,36px)] leading-[1.02] font-extrabold">
            Conversational agentic systems, and their evaluation
          </h2>
          <p className="max-w-[62ch] text-[17px]">
            EVA is the conversational agent of Groupe Mutuel, a Swiss health insurer. In the app, it tells policyholders
            what their plan covers, in four languages.
          </p>
          <p className="mt-3 max-w-[62ch] text-ink-2">
            I&apos;m a core contributor to EVA. I built its evaluation harness alone: simulated policyholders talk to the
            real assistant, judges grade every claim, and we measure reliability, not luck.
          </p>
          <p className="mt-3.5">
            <Link href={`/projects/${eva.slug}`} className="link">
              Read the EVA case study →
            </Link>
          </p>
        </div>
        <EvaBrain />
      </div>

      <div className="mt-7">
        <Figures figures={eva.figures} source={eva.source} />
      </div>

      <div className="mt-[30px]">
        <h3 className="mb-1.5 font-display text-[23px] leading-[1.05] font-extrabold">How the harness works</h3>
        <p className="mb-5 max-w-[62ch] text-ink-2">
          Simulate, then judge, then measure. The two steps are decoupled, so a new judge can grade old conversations.
        </p>
        <HarnessArchitecture />
      </div>
    </Section>
  );
}
