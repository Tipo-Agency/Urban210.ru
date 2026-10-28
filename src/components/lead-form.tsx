"use client";

import Link from "next/link";
import { Dumbbell } from "./cta";
import { useEffect, useId, useRef, useState } from "react";
import { track } from "@/lib/analytics";
import { readAttribution } from "@/lib/attribution";
import { sendCalltouch } from "@/lib/calltouch";
import { GOALS } from "@/lib/lead";
import { site, telegramLink, whatsappLink } from "@/data/site";
import { IconTelegram, IconWhatsApp } from "./icons";

type Props = { goal?: string; block: string; formId: string; compact?: boolean; simple?: boolean; submitLabel?: string; onDone?: () => void };
type State = "idle" | "loading" | "ok" | "error";

function maskPhone(raw: string) {
  let d = raw.replace(/\D/g, "");
  if (d.startsWith("8") || d.startsWith("7")) d = d.slice(1);
  d = d.slice(0, 10);
  let out = "+7";
  if (d.length > 0) out += " (" + d.slice(0, 3);
  if (d.length >= 3) out += ")";
  if (d.length > 3) out += " " + d.slice(3, 6);
  if (d.length > 6) out += "-" + d.slice(6, 8);
  if (d.length > 8) out += "-" + d.slice(8, 10);
  return out;
}

export function LeadForm({ goal = GOALS[0], block, formId, compact, simple, submitLabel = "Жду звонка" }: Props) {
  const id = useId();
  const [state, setState] = useState<State>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [message, setMessage] = useState("");
  const [phone, setPhone] = useState("");
  const [selected, setSelected] = useState(goal);
  const opened = useRef(0);
  const started = useRef(false);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    opened.current = Date.now();
  }, []);
  useEffect(() => setSelected(goal), [goal]);

  function onStart() {
    if (started.current) return;
    started.current = true;
    track("form_start", { form_id: formId, block });
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const payload = {
      name: String(fd.get("name") || ""),
      phone: String(fd.get("phone") || ""),
      goal: selected,
      comment: String(fd.get("comment") || ""),
      consent: fd.get("consent") === "on",
      website: String(fd.get("website") || ""),
      block,
      page: location.pathname,
      t: Date.now() - opened.current,
      attribution: readAttribution(),
    };
    setState("loading");
    setErrors({});
    setMessage("");
    try {
      const res = await fetch("/api/lead/", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.ok) {
        setState("ok");
        sendCalltouch({ name: payload.name, phone: payload.phone, goal: selected });
        track("form_submit", { form_id: formId, block, lead_type: selected });
        return;
      }
      if (data.fields) {
        setErrors(data.fields);
        const first = Object.keys(data.fields)[0];
        track("form_error", { form_id: formId, field: first, error: data.fields[first] });
        formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      }
      setMessage(data.error || "Проверьте поля формы");
      setState("error");
    } catch {
      setMessage("Нет связи. Проверьте интернет или позвоните нам.");
      setState("error");
    }
  }

  if (state === "ok") {
    return (
      <div role="status" className="rounded-[var(--radius-card)] border border-line bg-card p-6 md:p-8">
        <p className="font-display text-3xl uppercase">Заявка у нас</p>
        <p className="mt-3 text-muted">
          Администратор перезвонит в течение 15 минут в часы работы клуба ({site.hours[0].days} {site.hours[0].time},{" "}
          {site.hours[1].days} {site.hours[1].time}). Если удобнее переписываться, напишите нам сами:
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          <a className="btn btn-ghost" href={whatsappLink(`Здравствуйте! Оставил заявку на сайте: ${selected}`)} target="_blank" rel="noopener">
            <IconWhatsApp /> WhatsApp
          </a>
          <a className="btn btn-ghost" href={telegramLink(`site_${formId}`)} target="_blank" rel="noopener">
            <IconTelegram /> Telegram
          </a>
        </div>
      </div>
    );
  }

  const err = (k: string) => (errors[k] ? { "aria-invalid": true as const, "aria-describedby": `${id}-${k}-err` } : {});

  return (
    <form ref={formRef} onSubmit={onSubmit} onFocus={onStart} noValidate className="grid gap-4">
      <div className={compact || simple ? "grid gap-4" : "grid gap-4 sm:grid-cols-2"}>
        <div>
          <label htmlFor={`${id}-name`} className="mb-1.5 block text-sm font-medium">
            Имя
          </label>
          <input id={`${id}-name`} name="name" className="field" autoComplete="given-name" required minLength={2} {...err("name")} />
          {errors.name && (
            <p id={`${id}-name-err`} className="mt-1.5 text-sm text-[#ff8a80]">
              {errors.name}
            </p>
          )}
        </div>
        <div>
          <label htmlFor={`${id}-phone`} className="mb-1.5 block text-sm font-medium">
            Телефон
          </label>
          <input
            id={`${id}-phone`}
            name="phone"
            className="field"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            placeholder="+7 (___) ___-__-__"
            value={phone}
            onChange={(e) => setPhone(maskPhone(e.target.value))}
            required
            {...err("phone")}
          />
          {errors.phone && (
            <p id={`${id}-phone-err`} className="mt-1.5 text-sm text-[#ff8a80]">
              {errors.phone}
            </p>
          )}
        </div>
      </div>

      <div className={simple ? "hidden" : ""}>
        <label htmlFor={`${id}-goal`} className="mb-1.5 block text-sm font-medium">
          Что вас интересует
        </label>
        <select id={`${id}-goal`} name="goal" className="field appearance-none" value={selected} onChange={(e) => setSelected(e.target.value)}>
          {GOALS.map((g) => (
            <option key={g} value={g}>
              {g}
            </option>
          ))}
        </select>
      </div>

      {/* Скрытое поле для ботов */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>
          Сайт
          <input name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <label className="flex items-start gap-3 text-sm text-muted">
        <input type="checkbox" name="consent" required className="mt-1 h-4 w-4 shrink-0 accent-[var(--color-accent)]" {...err("consent")} />
        <span>
          Согласен на обработку персональных данных по{" "}
          <Link href="/policy/" className="underline underline-offset-2 hover:text-ink" target="_blank">
            политике конфиденциальности
          </Link>
        </span>
      </label>
      {errors.consent && <p className="-mt-2 text-sm text-[#ff8a80]">{errors.consent}</p>}

      <button type="submit" className="btn-brand wide" disabled={state === "loading"} aria-busy={state === "loading"}>
        <span className="ico">
          <Dumbbell />
        </span>
        <span>{state === "loading" ? "Отправляем…" : submitLabel}</span>
      </button>
      <p className="text-sm text-muted">Перезвоним за 15 минут в часы работы клуба, чтобы подобрать время визита. Без спама.</p>
      {state === "error" && message && (
        <p role="alert" className="text-sm text-[#ff8a80]">
          {message}{" "}
          <a href={site.phone.href} className="underline">
            {site.phone.display}
          </a>
        </p>
      )}
    </form>
  );
}
