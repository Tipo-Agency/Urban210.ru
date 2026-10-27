"use client";

import { useState } from "react";
import { site } from "@/data/site";
import { IconPin } from "./icons";

// Карта грузится только по клику: виджет Яндекса весит больше всей страницы.
export function YandexMap() {
  const [on, setOn] = useState(false);
  const { lat, lng } = site.address;
  const src = `https://yandex.ru/map-widget/v1/?ll=${lng}%2C${lat}&z=16&pt=${lng}%2C${lat}%2Cpm2rdl&oid=122837663271&ol=biz`;
  return (
    <div className="relative aspect-[4/3] overflow-hidden rounded-[var(--radius-card)] border border-line bg-card md:aspect-[16/10]">
      {on ? (
        <iframe src={src} title="Urban210 на Яндекс Картах" className="absolute inset-0 h-full w-full" loading="lazy" allowFullScreen />
      ) : (
        <button type="button" onClick={() => setOn(true)} className="absolute inset-0 grid place-items-center bg-[radial-gradient(circle_at_50%_45%,#2a2622_0,#141210_70%)] text-center">
          <span>
            <IconPin size={40} className="mx-auto text-accent" />
            <span className="mt-3 block font-medium">{site.address.short}</span>
            <span className="mt-1 block text-sm text-muted">Показать на карте</span>
          </span>
        </button>
      )}
    </div>
  );
}
