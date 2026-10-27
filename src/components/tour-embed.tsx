"use client";

import Image from "next/image";
import { useState } from "react";
import { track } from "@/lib/analytics";

const TOUR = "https://my.matterport.com/show/?m=RX7Vmh4E33h&play=1&lang=ru";

// Matterport грузится по клику: сам плеер весит десятки мегабайт.
export function TourEmbed() {
  const [on, setOn] = useState(false);
  return (
    <div className="relative aspect-[4/3] overflow-hidden rounded-[var(--radius-card)] border border-line bg-card md:aspect-video">
      {on ? (
        <iframe src={TOUR} title="3D-тур по клубу Urban210" className="absolute inset-0 h-full w-full" allow="xr-spatial-tracking; fullscreen" allowFullScreen />
      ) : (
        <button
          type="button"
          onClick={() => {
            setOn(true);
            track("tour_open");
          }}
          className="group absolute inset-0"
        >
          <Image src="/images/reception.jpg" alt="" fill sizes="100vw" className="object-cover opacity-60 transition-opacity group-hover:opacity-75" />
          <span className="absolute inset-0 grid place-items-center">
            <span className="btn btn-accent text-base">Запустить 3D-тур</span>
          </span>
        </button>
      )}
    </div>
  );
}
