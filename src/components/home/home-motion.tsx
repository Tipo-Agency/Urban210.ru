"use client";

import { useEffect } from "react";

// Движение главной: плавный скролл (Lenis) и сцены на GSAP ScrollTrigger.
// Библиотеки грузятся после загрузки страницы, чтобы не мешать первому экрану.
// Элементы размечены атрибутами: data-g="rise" | "clip" | "bars" | "count" | "ab", data-speed.
export function HomeMotion() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let cleanup = () => {};
    let cancelled = false;

    const init = async () => {
      const [{ gsap }, { ScrollTrigger }, { default: Lenis }] = await Promise.all([import("gsap"), import("gsap/ScrollTrigger"), import("lenis")]);
      if (cancelled) return;
      gsap.registerPlugin(ScrollTrigger);

      const lenis = new Lenis({ duration: 1.1, smoothWheel: true });
      lenis.on("scroll", ScrollTrigger.update);
      const raf = (t: number) => lenis.raf(t * 1000);
      gsap.ticker.add(raf);
      gsap.ticker.lagSmoothing(0);

      // Якорные ссылки через Lenis, с отступом под плавающую шапку
      const onClick = (e: MouseEvent) => {
        const a = (e.target as HTMLElement).closest<HTMLAnchorElement>('a[href^="#"]');
        if (!a || a.dataset.lead !== undefined) return;
        const el = document.querySelector(a.getAttribute("href")!);
        if (!el) return;
        e.preventDefault();
        lenis.scrollTo(el as HTMLElement, { offset: -90 });
      };
      document.addEventListener("click", onClick);

      const ctx = gsap.context(() => {
        gsap.set("[data-g='rise']", { opacity: 0 });
        ScrollTrigger.batch("[data-g='rise']", {
          start: "top 88%",
          once: true,
          onEnter: (els) => gsap.fromTo(els, { y: 70, opacity: 0 }, { y: 0, opacity: 1, duration: 1.1, ease: "expo.out", stagger: 0.08, overwrite: true }),
        });

        gsap.utils.toArray<HTMLElement>("[data-g='clip']").forEach((el) => {
          const img = el.querySelector("img, video");
          const tl = gsap.timeline({ scrollTrigger: { trigger: el, start: "top 85%", once: true } });
          tl.fromTo(el, { clipPath: "inset(18% 8% 18% 8% round 2rem)" }, { clipPath: "inset(0% 0% 0% 0% round 2rem)", duration: 1.3, ease: "expo.out" });
          if (img) tl.fromTo(img, { scale: 1.25 }, { scale: 1, duration: 1.6, ease: "expo.out" }, 0);
        });

        gsap.utils.toArray<HTMLElement>("[data-speed]").forEach((el) => {
          const speed = Number(el.dataset.speed);
          gsap.fromTo(el, { yPercent: speed * -1 }, { yPercent: speed, ease: "none", scrollTrigger: { trigger: el.parentElement, start: "top bottom", end: "bottom top", scrub: true } });
        });

        gsap.utils.toArray<HTMLElement>("[data-g='bars']").forEach((box) => {
          const bars = box.querySelectorAll<HTMLElement>("[data-bar]");
          gsap.fromTo(bars, { scaleX: 0 }, { scaleX: 1, transformOrigin: "left center", duration: 1.4, ease: "expo.out", stagger: 0.12, scrollTrigger: { trigger: box, start: "top 80%", once: true } });
        });

        gsap.utils.toArray<HTMLElement>("[data-g='count']").forEach((el) => {
          const to = Number(el.dataset.to);
          const obj = { v: 0 };
          gsap.to(obj, {
            v: to, duration: 2, ease: "expo.out",
            scrollTrigger: { trigger: el, start: "top 85%", once: true },
            onUpdate: () => { el.textContent = String(Math.round(obj.v)); },
          });
        });

        // Вариант А уходит в тень, вариант Б выезжает вперёд
        const ab = document.querySelector("[data-g='ab']");
        if (ab) {
          gsap.timeline({ scrollTrigger: { trigger: ab, start: "top 75%", once: true } })
            .fromTo(ab.children[0], { x: -80, opacity: 0, rotate: -3 }, { x: 0, opacity: 1, rotate: -1.5, duration: 1.1, ease: "expo.out" })
            .fromTo(ab.children[1], { x: 80, opacity: 0, rotate: 3 }, { x: 0, opacity: 1, rotate: 1.5, duration: 1.1, ease: "expo.out" }, 0.15);
        }
      });

      cleanup = () => {
        document.removeEventListener("click", onClick);
        ctx.revert();
        gsap.ticker.remove(raf);
        lenis.destroy();
      };
    };

    const start = () => void init();
    if (document.readyState === "complete") start();
    else window.addEventListener("load", start, { once: true });

    return () => {
      cancelled = true;
      window.removeEventListener("load", start);
      cleanup();
    };
  }, []);

  return null;
}
