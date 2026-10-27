"use client";

import { useEffect, useRef, useState } from "react";
import { track } from "@/lib/analytics";
import { captureAttribution } from "@/lib/attribution";
import { trial } from "@/data/pricing";
import { IconClose } from "./icons";
import { LeadForm } from "./lead-form";

// Одна форма на весь сайт. Любая ссылка с data-lead открывает её с нужной целью.
// Без JavaScript ссылка ведёт на #zayavka внизу страницы.
export function LeadDialog() {
  const ref = useRef<HTMLDialogElement>(null);
  const [goal, setGoal] = useState<string>(trial.title);
  const [block, setBlock] = useState("dialog");
  const [key, setKey] = useState(0);

  useEffect(() => {
    captureAttribution();

    function onClick(e: MouseEvent) {
      const el = (e.target as HTMLElement).closest<HTMLElement>("a, button");
      if (!el) return;

      const lead = el.dataset.lead;
      if (lead !== undefined) {
        e.preventDefault();
        const b = el.dataset.block || "unknown";
        setGoal(lead || trial.title);
        setBlock(b);
        setKey((k) => k + 1);
        track("cta_click", { cta_text: el.textContent?.trim().slice(0, 60), block: b });
        ref.current?.showModal();
        return;
      }

      const href = el.getAttribute("href") || "";
      const b = el.dataset.block || el.closest("[data-block]")?.getAttribute("data-block") || "";
      if (href.startsWith("tel:")) track("phone_click", { block: b });
      else if (href.includes("wa.me")) track("messenger_click", { messenger: "whatsapp", block: b });
      else if (href.includes("t.me")) track("messenger_click", { messenger: "telegram", block: b });
      else if (href.includes("yandex.ru/maps") || href.includes("2gis.ru")) track("map_click", { block: b });
    }
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return (
    <dialog
      ref={ref}
      aria-labelledby="lead-title"
      className="m-auto w-[calc(100%-2rem)] max-w-lg rounded-[var(--radius-card)] border border-line bg-card p-0 text-ink"
      onClick={(e) => e.target === ref.current && ref.current?.close()}
    >
      <div className="p-6 md:p-8">
        <div className="mb-5 flex items-start justify-between gap-4">
          <div>
            <p id="lead-title" className="font-display text-3xl uppercase leading-none">
              {goal === trial.title ? "Пробный день за 1 ₽" : "Оставьте заявку"}
            </p>
            <p className="mt-2 text-muted">Администратор перезвонит, ответит на вопросы и запишет на удобное время.</p>
          </div>
          <button type="button" onClick={() => ref.current?.close()} className="-m-2 rounded-full p-2 text-muted hover:text-ink" aria-label="Закрыть">
            <IconClose size={24} />
          </button>
        </div>
        <LeadForm key={key} goal={goal} block={block} formId="dialog" compact />
      </div>
    </dialog>
  );
}
