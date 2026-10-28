"use client";

import Image from "next/image";
import { useState } from "react";
import { Arrows } from "@/components/cta";
import { perDay, plans, rub } from "@/data/pricing";
import { track } from "@/lib/analytics";

// Три тарифа колонками. Карты клуба сверху — те же неоновые карты, что выдают в клубе.
const card = { day: "/images/brand/card-blue.webp", full: "/images/brand/card-teal.webp", all: "/images/brand/card-orange.webp" } as const;
const order = ["day", "full", "all"] as const;

export function PricingCards({ block = "price" }: { block?: string }) {
  const [period, setPeriod] = useState<"month" | "year">("month");

  function pick(p: "month" | "year") {
    setPeriod(p);
    track("price_toggle", { period: p, block });
  }

  return (
    <div>
      <div role="radiogroup" aria-label="Период оплаты" className="inline-flex border border-line p-1">
        {(["month", "year"] as const).map((p) => (
          <button
            key={p}
            type="button"
            role="radio"
            aria-checked={period === p}
            onClick={() => pick(p)}
            className={`flex min-h-12 items-center gap-2 px-6 font-semibold transition-colors duration-200 ${period === p ? "bg-paper-ink text-[#f5f1ec]" : "text-muted hover:text-paper-ink"}`}
          >
            {p === "month" ? "Помесячно" : "За год"}
            {p === "year" && <span className="bg-accent px-1.5 py-0.5 text-xs font-bold text-paper-ink">до −31%</span>}
          </button>
        ))}
      </div>

      <div className="mt-10 grid gap-px bg-line lg:grid-cols-3">
        {order.map((id) => {
          const plan = plans.find((p) => p.id === id)!;
          const featured = id === "all";
          const price = period === "month" ? plan.month : plan.year;
          const day = period === "month" ? perDay(plan.month, 30) : perDay(plan.year, 365);
          return (
            <article key={id} className={`relative flex flex-col overflow-hidden p-7 md:p-9 ${featured ? "bg-paper-ink text-[#f5f1ec]" : "bg-paper"}`}>
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-[clamp(1.5rem,1.2rem+1vw,2rem)]">{plan.name}</h3>
                  <p className={`mt-2 text-sm ${featured ? "text-[#a39a93]" : "text-muted"}`}>{plan.hours}</p>
                </div>
                {featured && <span className="bg-accent px-2.5 py-1 text-sm font-bold text-paper-ink">Всё сразу</span>}
              </div>
              <div className="relative mt-8 w-[70%] max-w-[15rem] -rotate-6">
                <Image src={card[id]} alt="" width={760} height={494} sizes="15rem" />
              </div>

              <p className="mt-8 flex flex-wrap items-baseline gap-x-2">
                <span className={`num text-[clamp(3rem,2.4rem+2vw,4.25rem)] ${featured ? "text-accent" : ""}`}>{rub(price)}</span>
                <span className={featured ? "text-[#a39a93]" : "text-muted"}>{period === "month" ? "в месяц" : "за год"}</span>
              </p>
              <p className={`mt-2 text-sm ${featured ? "text-[#a39a93]" : "text-muted"}`}>Около {day} ₽ в день</p>

              <ul className={`mt-8 grid gap-3 border-t pt-6 ${featured ? "border-white/15" : "border-line"}`}>
                {plan.features.map((f) => (
                  <li key={f} className="flex gap-3">
                    <Arrows className="mt-1.5 h-3 w-3 shrink-0 text-accent" />
                    {f}
                  </li>
                ))}
                {plan.excluded?.map((f) => (
                  <li key={f} className={`flex gap-3 line-through decoration-1 ${featured ? "text-[#a39a93]" : "text-muted"}`}>
                    <span aria-hidden="true" className="w-3 shrink-0" />
                    <span>
                      <span className="sr-only">Не входит: </span>
                      {f}
                    </span>
                  </li>
                ))}
              </ul>

              <div className="mt-auto pt-10">
                <a href="#zayavka" data-lead={plan.name} data-block={`${block}_${plan.id}`} className={`btn-brand wide ${featured ? "" : "dark"}`}>
                  <span>Оформить «{plan.name}»</span>
                  <Arrows />
                </a>
              </div>
            </article>
          );
        })}
      </div>
      <p className="mt-6 text-muted">Без вступительного взноса и скрытых платежей. Регистрация и браслет входят в стоимость.</p>
    </div>
  );
}
