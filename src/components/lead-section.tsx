import Image from "next/image";
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
    <section id="zayavka" className="section" aria-labelledby="zayavka-title" data-block={block}>
      <div className="wrap">
        <div className="relative isolate overflow-hidden rounded-[2.5rem] border border-line">
          <Image src="/images/brand/popup-bg.jpg" alt="" fill sizes="(min-width: 1280px) 1240px, 100vw" className="-z-20 object-cover opacity-50" />
          <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(16,16,16,0.75),rgba(16,16,16,0.92)),radial-gradient(ellipse_at_bottom,rgba(255,87,34,0.35),transparent_60%)]" />
          <div className="grid gap-12 p-7 md:p-14 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-16">
            <div>
              <h2 id="zayavka-title" className="text-[clamp(2.75rem,1.6rem+4.4vw,6rem)] leading-[0.92]">
                {title}
              </h2>
              <p className="mt-6 max-w-md text-[#d4d4d4]">{text}</p>
              <ul className="mt-10 grid gap-4 text-sm">
                <li className="flex gap-4">
                  <IconPin className="mt-0.5 shrink-0 text-accent" />
                  <span>
                    {site.address.short}, {site.district}
                    <br />
                    <span className="text-muted">{site.parking}</span>
                  </span>
                </li>
                <li className="flex gap-4">
                  <IconClock className="mt-0.5 shrink-0 text-accent" />
                  <span>
                    {site.hours.map((h) => (
                      <span key={h.days} className="block">
                        {h.days}: {h.time}
                      </span>
                    ))}
                  </span>
                </li>
                <li className="flex flex-wrap gap-x-8 gap-y-3">
                  <a href={site.phone.href} className="flex items-center gap-4 font-medium hover:text-accent">
                    <IconPhone className="shrink-0 text-accent" />
                    {site.phone.display}
                  </a>
                  <a href={whatsappLink("Здравствуйте! Хочу на пробный день в Urban210")} target="_blank" rel="noopener" className="flex items-center gap-4 font-medium hover:text-accent">
                    <IconWhatsApp className="shrink-0 text-accent" />
                    WhatsApp
                  </a>
                </li>
              </ul>
            </div>
            <div className="rounded-[2rem] border border-line bg-[#101010]/85 p-6 backdrop-blur md:p-8">
              <LeadForm goal={goal} block={block} formId="final" submitLabel="Отправить" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
