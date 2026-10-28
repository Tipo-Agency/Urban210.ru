"use client";

import { useEffect, useRef, useState } from "react";

// Видео зала поверх постера. Постер грузится сразу (это LCP), видео подключаем после загрузки страницы,
// на телефоне берём вертикальную версию. При «уменьшить движение» и экономии трафика остаётся постер.
export function HeroVideo() {
  const ref = useRef<HTMLVideoElement>(null);
  const [on, setOn] = useState(false);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const saveData = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData;
    if (reduce || saveData) return;
    const start = () => {
      v.src = window.matchMedia("(max-width: 767px)").matches ? "/video/hero-mobile.mp4" : "/video/hero.mp4";
      v.play().catch(() => {});
    };
    if (document.readyState === "complete") setTimeout(start, 300);
    else window.addEventListener("load", () => setTimeout(start, 300), { once: true });
  }, []);

  return (
    <video
      ref={ref}
      muted
      loop
      playsInline
      preload="none"
      aria-hidden="true"
      onPlaying={() => setOn(true)}
      className={`absolute inset-0 -z-20 h-full w-full object-cover transition-opacity duration-1000 ${on ? "opacity-100" : "opacity-0"}`}
    />
  );
}
