import Image from "next/image";
import { BeforeAfter } from "@/components/demos/BeforeAfter";
import { LbmSim } from "@/components/demos/LbmSim";
import { PovVideo } from "@/components/demos/PovVideo";
import { PartyMeme } from "@/components/ink/diagrams/PartyMeme";
import type { CaseSlots } from "../CaseLayout";

const tryIt = (demo: React.ReactNode): CaseSlots => ({ "try-it": { after: <div className="mt-6">{demo}</div> } });

export function voyagerSlots(): CaseSlots {
  const house = (src: string, alt: string) => (
    <Image src={src} alt={alt} width={538} height={332} sizes="(min-width: 700px) 640px, 100vw" className="h-full w-full object-cover" />
  );
  return tryIt(
    <BeforeAfter
      ratio="538 / 332"
      before={{
        label: "Text only",
        content: house("/projects/vision-voyager/house-text-only.webp", "The text-only agent's house: a few walls with holes, glass blocks left floating around it."),
      }}
      after={{
        label: "With vision",
        content: house("/projects/vision-voyager/house-vision.webp", "Vision Voyager's house: one long wooden building with a door and windows."),
      }}
      caption="Screenshots from our runs, both on GPT-4.1. CS-503, EPFL, 2025."
    />,
  );
}

export function unhatememeSlots(): CaseSlots {
  return tryIt(
    <BeforeAfter
      ratio="320 / 240"
      before={{ label: "Before", content: <PartyMeme full={false} /> }}
      after={{ label: "After the rewrite", content: <PartyMeme full /> }}
      caption="Drawn by hand to illustrate the pipeline. Not a model output, not from the dataset."
    />,
  );
}

export function roboticsSlots(): CaseSlots {
  return tryIt(
    <PovVideo
      src="/projects/robotics/pov.mp4"
      poster="/projects/robotics/pov-poster.webp"
      size={224}
      label="The robot's camera view, with the detected target and its score"
      caption="The robot's camera, with the model's detection drawn on top. HES-SO, 2023."
    />,
  );
}

export function lbmSlots(): CaseSlots {
  return tryIt(<LbmSim />);
}
