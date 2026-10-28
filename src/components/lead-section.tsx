import { site, whatsappLink } from "@/data/site";
import { trial } from "@/data/pricing";
import { IconClock, IconPhone, IconPin, IconWhatsApp } from "./icons";
import { Arrows } from "./cta";
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
    <section id="zayavka" className="on-accent relative overflow-hidden" aria-labelledby="zayavka-title" data-block={block}>
      <Arrows className="pointer-events-none absolute -right-[12vw] top-1/2 hidden h-[130%] w-auto -translate-y-1/2 text-[#ff6a3d] lg:block" />
      <div className="wrap relative grid gap-12 py-20 md:py-28 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-16">
        <div>
          <h2 id="zayavka-title" className="text-[clamp(2.25rem,1.4rem+3.6vw,5rem)] leading-[0.98]">
            {title}
          </h2>
          <p className="mt-6 max-w-md text-lg">{text}</p>
          <ul className="mt-10 grid gap-4">
            <li className="flex gap-4">
              <IconPin className="mt-1 shrink-0" />
              <span>
                {site.address.short}, {site.district}
                <br />
                <span className="text-muted">{site.parking}</span>
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
        <div className="dark-card bg-bg p-6 text-[#f5f1ec] md:p-9" style={{ "--color-ink": "#f5f1ec", "--color-muted": "#a39a93", "--color-line": "rgb(255 240 230 / 0.12)" } as React.CSSProperties}>
          <LeadForm goal={goal} block={block} formId="final" submitLabel="Жду звонка" />
        </div>
      </div>
    </section>
  );
}
