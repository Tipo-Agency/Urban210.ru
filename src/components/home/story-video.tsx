"use client";

import { useEffect, useRef } from "react";

// Вертикальное видео из сторис клуба: играет, только пока видно на экране.
export function StoryVideo({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const v = ref.current;
    if (!v || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        if (!v.src) v.src = "/video/story.mp4";
        v.play().catch(() => {});
      } else v.pause();
    }, { threshold: 0.25 });
    io.observe(v);
    return () => io.disconnect();
  }, []);
  return <video ref={ref} muted loop playsInline preload="none" poster="/video/story-poster.jpg" aria-label="Видео из клуба Urban210" className={className} />;
}
