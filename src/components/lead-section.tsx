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
    <section id="zayavka" className="section relative overflow-hidden border-t border-line" aria-labelledby="zayavka-title" data-block={block}>
      <div aria-hidden="true" className="pointer-events-none absolute -right-40 -top-40 h-[32rem] w-[32rem] rounded-full bg-accent/10 blur-3xl" />
      <div className="wrap relative grid gap-12 lg:grid-cols-[1fr_1.05fr] lg:gap-20">
        <div>
          <h2 id="zayavka-title" className="text-[length:var(--text-h2)]">
            {title}
          </h2>
          <p className="mt-5 max-w-md text-[length:var(--text-lead)] text-muted">{text}</p>
          <ul className="mt-10 grid gap-5">
            <li className="flex gap-4">
              <IconPin className="mt-1 shrink-0 text-accent" />
              <span>
                {site.address.short}, {site.district}
                <br />
                <span className="text-muted">{site.parking}</span>
              </span>
            </li>
            <li className="flex gap-4">
              <IconClock className="mt-1 shrink-0 text-accent" />
              <span>
                {site.hours.map((h) => (
                  <span key={h.days} className="block">
                    {h.days}: {h.time}
                  </span>
                ))}
              </span>
            </li>
            <li className="flex gap-4">
              <IconPhone className="mt-1 shrink-0 text-accent" />
              <a href={site.phone.href} className="font-medium hover:text-accent">
                {site.phone.display}
              </a>
            </li>
            <li className="flex gap-4">
              <IconWhatsApp className="mt-1 shrink-0 text-accent" />
              <a href={whatsappLink("Здравствуйте! Хочу на пробный день в Urban210")} target="_blank" rel="noopener" className="font-medium hover:text-accent">
                Написать в WhatsApp
              </a>
            </li>
          </ul>
        </div>
        <div className="self-start rounded-[var(--radius-card)] border border-line bg-card p-6 md:p-8">
          <LeadForm goal={goal} block={block} formId="final" />
        </div>
      </div>
    </section>
  );
}
