import { site } from "@/data/site";
import { CourtFigure } from "./CourtFigure";

export function Cover() {
  const [before, after] = site.tagline.split("ships");

  return (
    <div className="grid items-center gap-7 pt-[clamp(40px,7vw,84px)] pb-[clamp(28px,4vw,48px)] md:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)]">
      <div>
        <p className="meta">
          {site.role} · {site.school} · {site.availability}
        </p>
        <h1 className="mt-2.5 mb-[18px] font-display text-[clamp(52px,10vw,104px)] leading-[0.86] font-black uppercase">
          Anasse
          <br />
          El Boudiri
        </h1>
        <p className="max-w-[30ch] text-[19px] leading-normal">
          {before}
          <span className="bg-[linear-gradient(var(--ball),var(--ball))] bg-[length:100%_3px] bg-[position:0_92%] bg-no-repeat pb-px">
            ships
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
        <p className="mt-[22px] flex items-baseline gap-2.5 text-[13px] leading-snug font-medium text-ink-2">
          <i className="size-2 flex-none -translate-y-px rounded-full bg-ball" aria-hidden />
          <span>Now: {site.now}</span>
        </p>
      </div>
      <CourtFigure />
    </div>
  );
}
