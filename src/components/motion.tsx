"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

// Одна точка для всей анимации на скролле: появление блоков, счётчики и «проявление» слов.
// Только IntersectionObserver и один rAF-обработчик скролла, без библиотек.
export function Motion() {
  const path = usePathname();

  useEffect(() => {
    const root = document.documentElement;
    let ticking = 0;
    const mark = () => {
      ticking = 0;
      root.classList.toggle("scrolled", window.scrollY > window.innerHeight * 0.5);
    };
    const onScroll = () => {
      if (!ticking) ticking = requestAnimationFrame(mark);
    };
    mark();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          const el = e.target as HTMLElement;
          el.classList.add("in");
          if (el.dataset.count !== undefined) countUp(el, reduce);
          io.unobserve(el);
        }
      },
      { rootMargin: "0px 0px -12% 0px" },
    );
    document.querySelectorAll<HTMLElement>("[data-reveal],[data-clip],[data-count]").forEach((el) => io.observe(el));

    const blocks = Array.from(document.querySelectorAll<HTMLElement>("[data-words]"));
    let frame = 0;
    function paint() {
      frame = 0;
      const vh = window.innerHeight;
      for (const b of blocks) {
        const r = b.getBoundingClientRect();
        if (r.bottom < 0 || r.top > vh) continue;
        const words = b.querySelectorAll(".w");
        const progress = (vh * 0.82 - r.top) / (r.height + vh * 0.12);
        const lit = Math.round(Math.min(1, Math.max(0, progress)) * words.length);
        words.forEach((w, i) => w.classList.toggle("on", i < lit));
      }
    }
    function onScroll() {
      if (!frame) frame = requestAnimationFrame(paint);
    }
    if (blocks.length) {
      paint();
      window.addEventListener("scroll", onScroll, { passive: true });
    }

    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, [path]);

  return null;
}

function countUp(el: HTMLElement, reduce: boolean) {
  const target = Number(el.dataset.count);
  const decimals = (el.dataset.count!.split(".")[1] || "").length;
  const format = (v: number) => v.toFixed(decimals).replace(".", ",");
  if (reduce || !target) return;
  const start = performance.now();
  const dur = 1400;
  const tick = (t: number) => {
    const k = Math.min(1, (t - start) / dur);
    const eased = 1 - Math.pow(1 - k, 4);
    el.textContent = format(target * eased);
    if (k < 1) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}
