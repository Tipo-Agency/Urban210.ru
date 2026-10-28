"use client";

import Image from "next/image";
import { useRef } from "react";

// Неоновая карта клуба с 3D-наклоном за курсором. На тач-устройствах просто плавает.
export function NeonCard({ src, alt, className = "", priority = false, sizes = "(min-width: 1024px) 40vw, 80vw" }: { src: string; alt: string; className?: string; priority?: boolean; sizes?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  function move(e: React.PointerEvent) {
    if (e.pointerType !== "mouse" || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    ref.current.style.setProperty("--rx", `${(-y * 18).toFixed(2)}deg`);
    ref.current.style.setProperty("--ry", `${(x * 22).toFixed(2)}deg`);
    ref.current.style.setProperty("--gx", `${((x + 0.5) * 100).toFixed(1)}%`);
    ref.current.style.setProperty("--gy", `${((y + 0.5) * 100).toFixed(1)}%`);
  }
  function leave() {
    ref.current?.style.setProperty("--rx", "0deg");
    ref.current?.style.setProperty("--ry", "0deg");
  }

  return (
    <div ref={ref} onPointerMove={move} onPointerLeave={leave} className={`neon-card [perspective:1200px] ${className}`}>
      <div className="neon-card-inner relative">
        <Image src={src} alt={alt} width={760} height={494} priority={priority} sizes={sizes} className="relative h-auto w-full select-none" draggable={false} />
        <span aria-hidden="true" className="neon-card-shine" />
      </div>
    </div>
  );
}
