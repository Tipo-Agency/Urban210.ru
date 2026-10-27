import Image from "next/image";
import { trainers } from "@/data/content";

export function Trainers() {
  return (
    <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {trainers.map((t) => (
        <li key={t.name} className="overflow-hidden rounded-[var(--radius-card)] border border-line bg-card">
          <div className="relative aspect-square bg-raise">
            {t.photo && <Image src={t.photo} alt={`${t.name}, тренер Urban210`} fill sizes="(min-width: 1024px) 400px, (min-width: 640px) 50vw, 100vw" className="object-cover" />}
          </div>
          <div className="flex items-end justify-between gap-4 p-5">
            <div>
              <h3 className="text-2xl">{t.name}</h3>
              <p className="mt-1 text-[0.9375rem] text-muted">{t.role}</p>
            </div>
            <a href="#zayavka" data-lead="Персональные тренировки" data-block="trainer_card" className="btn btn-ghost min-h-11 shrink-0 px-4 text-sm">
              Записаться
            </a>
          </div>
        </li>
      ))}
    </ul>
  );
}
