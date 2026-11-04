import Link from "next/link";
import { Figures } from "@/components/charts/Figures";
import { PassKChart } from "@/components/charts/PassKChart";
import { EvaSystem } from "@/components/ink/diagrams/EvaSystem";
import { Section } from "@/components/layout/Section";
import { getProjectBySlug } from "@/data/projects";

export function MainProject() {
  const eva = getProjectBySlug("eva")!;

  return (
    <Section label="Main project" id="eva">
      <div className="grid items-start gap-x-10 gap-y-5 md:grid-cols-2">
        <div>
          <h2 className="mb-3 font-display text-[clamp(26px,3.6vw,36px)] leading-[1.02] font-extrabold">{eva.title}</h2>
          <p className="max-w-[62ch] text-[17px]">{eva.pitch}</p>
          <p className="mt-3 max-w-[62ch] text-ink-2">
            I&apos;m a core contributor to EVA. I built its evaluation harness alone: simulated policyholders talk to the
            real assistant, judges grade every claim, and we measure reliability, not luck.
          </p>
          <p className="mt-3.5">
            <Link href={`/projects/${eva.slug}`} className="link">
              Read the case study →
            </Link>
          </p>
        </div>
        <EvaSystem />
      </div>

      <div className="mt-7">
        <Figures figures={eva.figures} source={eva.source} />
      </div>

      <div className="mt-[30px] grid items-start gap-x-10 gap-y-5 md:grid-cols-2">
        <div>
          <h3 className="mb-1.5 font-display text-[23px] leading-[1.05] font-extrabold">Why the harness measures pass^k</h3>
          <p className="max-w-[62ch] text-ink-2">
            An agent that succeeds once in k tries looks great on pass@k. In production it has to succeed every time,
            which is pass^k. Same agent, two very different stories.
          </p>
          <p className="meta mt-2.5">
            219 tests · 125 situations × 30 products · 4 languages · catches regressions and gates feature rollouts in
            production
          </p>
        </div>
        <PassKChart />
      </div>
    </Section>
  );
}
