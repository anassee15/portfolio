import { strengths } from "@/data/profile";
import { site } from "@/data/site";
import { CourtFigure } from "./CourtFigure";
import { Portrait } from "./Portrait";

export function Cover() {
  const [before, after] = site.tagline.split("production");

  return (
    <div className="grid items-center gap-7 pt-[clamp(40px,7vw,84px)] pb-[clamp(28px,4vw,48px)] md:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)]">
      <div>
        <p className="meta">
          {site.role} · {site.school}
        </p>
        <h1 className="mt-2.5 mb-[18px] font-display text-[clamp(3.25rem,10vw,6.5rem)] leading-[0.86] font-black uppercase">
          <span className="relative inline-block">
            Anasse
            <Portrait />
          </span>
          <br />
          El Boudiri
        </h1>
        <p className="max-w-[38ch] text-[1.1875rem] text-balance leading-normal">
          {before}
          <span className="bg-[linear-gradient(var(--ball),var(--ball))] bg-[length:100%_3px] bg-[position:0_92%] bg-no-repeat pb-px">
            production
          </span>
          {after}
        </p>
        <div className="mt-[22px] flex flex-wrap gap-2.5">
          <a href="#contact" className="btn btn-primary">
            Contact me
          </a>
          <a href={site.cv} className="btn" download>
            Download CV
          </a>
        </div>
        <dl className="mt-8 grid max-w-[34rem] grid-cols-2 gap-x-6 gap-y-5">
          {strengths.map(({ title, proof }) => (
            <div key={title}>
              <span className="mb-2 block h-[3px] w-6 bg-ball" aria-hidden />
              <dt className="font-display text-[1.1875rem] leading-[1.05] font-extrabold">{title}</dt>
              <dd className="mt-1 text-[0.8125rem] leading-snug text-ink-2">{proof}</dd>
            </div>
          ))}
        </dl>
      </div>
      <CourtFigure />
    </div>
  );
}
