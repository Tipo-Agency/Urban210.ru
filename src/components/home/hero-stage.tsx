"use client";

import { useEffect, useRef, useState } from "react";

// Окно-шеврон с видео зала. На десктопе при скролле окно раскрывается на весь экран:
// прогресс 0..1 пишем в переменную --p, остальное делает CSS (globals.css, .hero-window).
// Видео подключаем только на десктопе после загрузки страницы; на телефоне остаётся постер.
export function HeroStage({ children }: { children: React.ReactNode }) {
  const stage = useRef<HTMLDivElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const root = stage.current;
    if (!root) return;
    const section = root.parentElement as HTMLElement;
    const desktop = window.matchMedia("(min-width: 1024px)");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let frame = 0;

    const paint = () => {
      frame = 0;
      if (!desktop.matches || reduce) {
        root.style.setProperty("--p", "0");
        return;
      }
      const r = section.getBoundingClientRect();
      const travel = section.offsetHeight - window.innerHeight;
      const p = travel > 0 ? Math.min(1, Math.max(0, -r.top / travel)) : 0;
      root.style.setProperty("--p", p.toFixed(4));
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(paint);
    };
    paint();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    const v = video.current;
    const saveData = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData;
    const start = () => {
      if (!v || !desktop.matches || reduce || saveData) return;
      v.src = "/video/hero-bw.mp4";
      v.play().catch(() => {});
    };
    if (document.readyState === "complete") setTimeout(start, 200);
    else window.addEventListener("load", () => setTimeout(start, 200), { once: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div ref={stage} className="hero-stage relative flex flex-col lg:sticky lg:top-0 lg:block lg:h-svh lg:overflow-hidden">
      <div className="hero-window relative order-2 mt-10 h-[17rem] sm:h-[24rem] lg:absolute lg:inset-0 lg:mt-0 lg:h-auto">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/video/hero-bw-poster.jpg" alt="" fetchPriority="high" className="absolute inset-0 h-full w-full object-cover" />
        <video
          ref={video}
          muted
          loop
          playsInline
          preload="none"
          aria-hidden="true"
          onPlaying={() => setPlaying(true)}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${playing ? "opacity-100" : "opacity-0"}`}
        />
        <div aria-hidden="true" className="hero-shade absolute inset-0 bg-bg" />
      </div>
      {children}
    </div>
  );
}
