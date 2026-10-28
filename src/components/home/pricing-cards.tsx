"use client";

import Image from "next/image";
import { useState } from "react";
import { Dumbbell } from "@/components/cta";
import { perDay, plans, rub } from "@/data/pricing";
import { track } from "@/lib/analytics";

// Тарифы с неоновыми картами клуба. Порядок как на старом сайте: «Всё включено» в центре.
const look = {
  day: { card: "/images/brand/card-blue.webp", glow: "rgba(33,150,243,0.35)", icon: "/images/brand/ico-sun.webp", tag: "Выгодно" },
  all: { card: "/images/brand/card-orange.webp", glow: "rgba(255,87,34,0.45)", icon: "/images/brand/ico-fire.webp", tag: "Хит" },
  full: { card: "/images/brand/card-teal.webp", glow: "rgba(29,233,182,0.3)", icon: "/images/brand/ico-muscle.webp", tag: "Интенсив" },
} as const;

const order = ["day", "all", "full"] as const;

export function PricingCards({ block = "price" }: { block?: string }) {
  const [period, setPeriod] = useState<"month" | "year">("month");

  function pick(p: "month" | "year") {
    setPeriod(p);
    track("price_toggle", { period: p, block });
  }

  return (
    <div>
      <div role="radiogroup" aria-label="Период оплаты" className="mx-auto flex w-fit items-center gap-2 rounded-full border border-line bg-[#171717] p-1.5">
        {(["month", "year"] as const).map((p) => (
          <button
            key={p}
            type="button"
            role="radio"
            aria-checked={period === p}
            onClick={() => pick(p)}
            className={`flex min-h-12 items-center gap-2 rounded-full px-7 font-display text-lg uppercase transition-colors duration-300 ${period === p ? "bg-accent text-white" : "text-muted hover:text-white"}`}
          >
            {p === "month" ? "Месяц" : "Год"}
            {p === "year" && <span className={`rounded-full px-2 py-0.5 font-sans text-xs ${period === p ? "bg-white text-accent" : "bg-accent text-white"}`}>до −31%</span>}
          </button>
        ))}
      </div>

      <div className="mt-12 grid gap-5 lg:grid-cols-3 lg:items-stretch">
        {order.map((id) => {
          const plan = plans.find((p) => p.id === id)!;
          const l = look[id];
          const featured = id === "all";
          const price = period === "month" ? plan.month : plan.year;
          const day = period === "month" ? perDay(plan.month, 30) : perDay(plan.year, 365);
          return (
            <article
              key={id}
              data-g="rise"
              className={`group relative isolate flex flex-col overflow-hidden rounded-[2rem] border bg-[#141414] p-7 pt-8 md:p-8 ${featured ? "border-accent/70 lg:-translate-y-4" : "border-line"}`}
            >
              <div aria-hidden="true" className="absolute -right-24 -top-24 -z-10 h-80 w-80 transition-transform duration-700 group-hover:scale-125" style={{ background: `radial-gradient(closest-side, ${l.glow}, transparent)` }} />
              <div className="flex items-start justify-between gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-white/25 px-3 py-1 text-xs">
                  <Image src={l.icon} alt="" width={16} height={16} />
                  {l.tag}
                </span>
              </div>
              <div className="pointer-events-none absolute -right-6 top-3 w-[46%] sm:w-[52%] lg:w-[58%] rotate-[-8deg] transition-transform duration-700 [filter:drop-shadow(0_20px_30px_rgba(0,0,0,0.6))] group-hover:-translate-y-2 group-hover:rotate-[-4deg] group-hover:scale-105">
                <Image src={l.card} alt="" width={760} height={494} sizes="(min-width: 1024px) 15vw, 50vw" />
              </div>
              <h3 className="mt-6 max-w-[9ch] text-4xl leading-[0.95]">{plan.name}</h3>

              <p className="mt-8 flex flex-wrap items-baseline gap-x-2">
                <span className={`font-display text-6xl font-semibold tabular-nums ${featured ? "text-accent" : ""}`}>{rub(price)}</span>
                <span className="text-muted">/ {period === "month" ? "мес" : "год"}</span>
              </p>
              <p className="mt-1 text-sm text-muted">~{day} ₽ в день · {plan.hours}</p>

              <div className="my-6 h-px bg-line" />
              <ul className="grid gap-3 text-sm">
                {plan.features.map((f) => (
                  <li key={f} className="flex gap-3">
                    <span aria-hidden="true" className="text-accent">✓</span>
                    {f}
                  </li>
                ))}
                {plan.excluded?.map((f) => (
                  <li key={f} className="flex gap-3 text-[#737373]">
                    <span aria-hidden="true">—</span>
                    <span>
                      <span className="sr-only">Не входит: </span>
                      {f}
                    </span>
                  </li>
                ))}
              </ul>

              <div className="mt-auto pt-8">
                <a href="#zayavka" data-lead={plan.name} data-block={`${block}_${plan.id}`} className={`btn-brand wide ${featured ? "" : "light"}`}>
                  <span className="ico">
                    <Dumbbell />
                  </span>
                  <span>Оформить подписку</span>
                </a>
              </div>
            </article>
          );
        })}
      </div>
      <p className="mt-6 text-center text-sm text-muted">Без вступительного взноса и скрытых платежей. Регистрация и браслет входят в стоимость.</p>
    </div>
  );
}
