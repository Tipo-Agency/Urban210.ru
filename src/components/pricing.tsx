"use client";

import { useState } from "react";
import { perDay, plans, rub } from "@/data/pricing";
import { track } from "@/lib/analytics";
import { IconCheck, IconMinus } from "./icons";

export function Pricing({ block = "price" }: { block?: string }) {
  const [period, setPeriod] = useState<"month" | "year">("month");

  function pick(p: "month" | "year") {
    setPeriod(p);
    track("price_toggle", { period: p, block });
  }

  return (
    <div>
      <div role="radiogroup" aria-label="Период оплаты" className="inline-flex rounded-full border border-paper-line bg-white p-1.5">
        {(["month", "year"] as const).map((p) => (
          <button
            key={p}
            type="button"
            role="radio"
            aria-checked={period === p}
            onClick={() => pick(p)}
            className={`min-h-12 rounded-full px-6 text-[0.9375rem] font-semibold transition-colors duration-300 ${period === p ? "bg-paper-ink text-paper" : "text-paper-muted hover:text-paper-ink"}`}
          >
            {p === "month" ? "Помесячно" : "За год, до −31%"}
          </button>
        ))}
      </div>

      <div className="mt-10 grid gap-4 lg:grid-cols-3 lg:items-stretch">
        {plans.map((plan) => {
          const featured = plan.id === "all";
          const price = period === "month" ? plan.month : plan.year;
          const day = period === "month" ? perDay(plan.month, 30) : perDay(plan.year, 365);
          const saving = plan.month * 12 - plan.year;
          return (
            <article
              key={plan.id}
              data-reveal
              style={{ "--d": `${plans.indexOf(plan) * 100}ms` } as React.CSSProperties}
              className={`relative isolate flex flex-col overflow-hidden rounded-[2rem] p-7 md:p-9 ${featured ? "bg-[#0b0b0a] text-paper shadow-[0_30px_80px_-30px_rgba(255,90,31,0.55)]" : "border border-paper-line bg-white"}`}
            >
              {featured && <div aria-hidden="true" className="absolute -right-24 -top-24 -z-10 h-72 w-72 bg-[radial-gradient(closest-side,rgba(255,90,31,0.45),transparent)]" />}
              <div className="flex items-start justify-between gap-3">
                <h3 className="text-4xl">{plan.name}</h3>
                {plan.tag && (
                  <span className={`rounded-full px-3 py-1 text-xs font-semibold ${featured ? "bg-accent text-[#140d09]" : "bg-paper text-paper-ink"}`}>{plan.tag}</span>
                )}
              </div>
              <p className={`mt-1 text-sm ${featured ? "text-[#bdb4aa]" : "text-paper-muted"}`}>{plan.hours}</p>

              <p className="mt-8 flex flex-wrap items-baseline gap-x-2">
                <span className={`num text-[clamp(3.75rem,2rem+6vw,6rem)] ${featured ? "text-accent" : ""}`}>{price.toLocaleString("ru-RU").replace(/\s/g, " ")}</span>
                <span className="font-display text-3xl font-bold">₽</span>
                <span className={featured ? "text-[#bdb4aa]" : "text-paper-muted"}>/ {period === "month" ? "мес" : "год"}</span>
              </p>
              <p className={`mt-1 text-sm ${featured ? "text-[#bdb4aa]" : "text-paper-muted"}`}>
                {day} ₽ в день
                {period === "year" && <> · экономия {rub(saving)}</>}
              </p>

              <ul className="mt-6 grid gap-3 text-[0.9375rem]">
                {plan.features.map((f) => (
                  <li key={f} className="flex gap-3">
                    <IconCheck size={18} className="mt-0.5 shrink-0 text-accent" />
                    {f}
                  </li>
                ))}
                {plan.excluded?.map((f) => (
                  <li key={f} className={`flex gap-3 ${featured ? "text-[#8f877e]" : "text-[#766e67]"}`}>
                    <IconMinus size={18} className="mt-0.5 shrink-0" />
                    <span>
                      <span className="sr-only">Не входит: </span>
                      {f}
                    </span>
                  </li>
                ))}
              </ul>

              <div className="mt-auto pt-8">
                <a href="#zayavka" data-lead={plan.name} data-block={`${block}_${plan.id}`} className={`btn w-full ${featured ? "btn-accent" : "bg-paper-ink text-paper hover:-translate-y-0.5 hover:bg-black"}`}>
                  Оформить «{plan.name}»
                </a>
              </div>
            </article>
          );
        })}
      </div>
      <p className="mt-6 text-sm text-paper-muted">Без вступительного взноса и скрытых платежей. Регистрация и браслет входят в стоимость.</p>
    </div>
  );
}
