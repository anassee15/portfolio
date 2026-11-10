"use client";

import { useRef, useState } from "react";

type PovVideoProps = { src: string; poster: string; size: number; label: string; caption: React.ReactNode };

/** A silent clip; with preload="none" nothing is downloaded until it is asked to play. */
export function PovVideo({ src, poster, size, label, caption }: PovVideoProps) {
  const video = useRef<HTMLVideoElement>(null);
  const [started, setStarted] = useState(false);

  const play = () => {
    setStarted(true);
    video.current?.play();
  };

  return (
    <figure className="w-full max-w-[360px]">
      <div className="relative aspect-square border border-rule">
        <video
          ref={video}
          src={src}
          poster={poster}
          width={size}
          height={size}
          muted
          playsInline
          loop
          controls={started}
          preload="none"
          aria-label={label}
          className="h-full w-full [image-rendering:pixelated]"
        />
        {!started && (
          <button
            type="button"
            onClick={play}
            className="absolute inset-0 flex items-end justify-start p-3 text-left"
            aria-label={`Play: ${label}`}
          >
            <span className="bg-ink px-3 py-2 text-sm font-medium text-paper">▶ Play, 26 s</span>
          </button>
        )}
      </div>
      <figcaption className="meta mt-2 text-[0.6875rem]">{caption}</figcaption>
    </figure>
  );
}
