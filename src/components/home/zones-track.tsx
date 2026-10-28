"use client";

import { useEffect, useRef } from "react";

// Лента зон клуба. На десктопе лента закреплена и едет вбок, пока страница скроллится вниз;
// на телефоне это обычная горизонтальная прокрутка пальцем со снапом.
export function ZonesTrack({ children }: { children: React.ReactNode }) {
  const outer = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const o = outer.current;
    const t = track.current;
    if (!o || !t) return;
    const desktop = window.matchMedia("(min-width: 1024px)");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let dist = 0;
    let frame = 0;

    const measure = () => {
      if (!desktop.matches || reduce) {
        o.style.height = "";
        t.style.transform = "";
        dist = 0;
        return;
      }
      dist = Math.max(0, t.scrollWidth - window.innerWidth);
      o.style.height = `${dist + window.innerHeight}px`;
      paint();
    };
    const paint = () => {
      frame = 0;
      if (!dist) return;
      const top = o.getBoundingClientRect().top;
      const p = Math.min(1, Math.max(0, -top / dist));
      t.style.transform = `translate3d(${(-p * dist).toFixed(1)}px,0,0)`;
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(paint);
    };

    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(t);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", measure);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div ref={outer} className="relative">
      <div className="snap-x snap-mandatory overflow-x-auto overscroll-x-contain scroll-px-4 md:scroll-px-8 [scrollbar-width:none] lg:sticky lg:top-0 lg:flex lg:h-svh lg:items-center lg:overflow-hidden [&::-webkit-scrollbar]:hidden">
        <div ref={track} className="flex w-max gap-4 px-4 pb-2 will-change-transform md:px-8 lg:gap-6 lg:pb-0">
          {children}
        </div>
      </div>
    </div>
  );
}
