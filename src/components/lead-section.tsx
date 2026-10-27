import { site, whatsappLink } from "@/data/site";
import { trial } from "@/data/pricing";
import { IconClock, IconPhone, IconPin, IconWhatsApp } from "./icons";
import { LeadForm } from "./lead-form";

// Финальный блок каждой страницы. Сюда ведут все кнопки, если JavaScript не загрузился.
export function LeadSection({
  title = "Приходите на пробный день за 1 ₽",
  text = trial.text,
  goal = trial.title,
  block = "final",
}: {
  title?: string;
  text?: string;
  goal?: string;
  block?: string;
}) {
  return (
    <section id="zayavka" className="relative isolate overflow-hidden bg-accent text-[#120804]" aria-labelledby="zayavka-title" data-block={block}>
      <p aria-hidden="true" className="mega pointer-events-none absolute -bottom-[0.1em] left-1/2 -z-10 -translate-x-1/2 select-none whitespace-nowrap text-[26vw] text-[#120804]/[0.08] deco" data-text="6:30" />
      <div className="wrap section grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-16">
        <div>
          <p className="kicker">Первый шаг</p>
          <h2 id="zayavka-title" data-reveal className="mt-5 text-[clamp(3rem,1.8rem+4.2vw,6.5rem)] leading-[0.88]">
            {title}
          </h2>
          <p className="mt-6 max-w-md text-[length:var(--text-lead)] text-[#3a1a0c]">{text}</p>
          <ul className="mt-10 grid gap-4 text-[1.0625rem]">
            <li className="flex gap-4">
              <IconPin className="mt-1 shrink-0" />
              <span>
                {site.address.short}, {site.district}
                <br />
                <span className="text-[#2a1208]">{site.parking}</span>
              </span>
            </li>
            <li className="flex gap-4">
              <IconClock className="mt-1 shrink-0" />
              <span>
                {site.hours.map((h) => (
                  <span key={h.days} className="block">
                    {h.days}: {h.time}
                  </span>
                ))}
              </span>
            </li>
            <li className="flex flex-wrap gap-x-8 gap-y-3">
              <a href={site.phone.href} className="flex items-center gap-4 font-semibold underline-offset-4 hover:underline">
                <IconPhone className="shrink-0" />
                {site.phone.display}
              </a>
              <a href={whatsappLink("Здравствуйте! Хочу на пробный день в Urban210")} target="_blank" rel="noopener" className="flex items-center gap-4 font-semibold underline-offset-4 hover:underline">
                <IconWhatsApp className="shrink-0" />
                WhatsApp
              </a>
            </li>
          </ul>
        </div>
        <div className="self-start rounded-[2rem] bg-[#0b0b0a] p-6 text-ink shadow-[0_40px_80px_-30px_rgba(18,8,4,0.7)] md:p-9">
          <LeadForm goal={goal} block={block} formId="final" />
        </div>
      </div>
    </section>
  );
}
