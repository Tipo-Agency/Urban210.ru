import { IconClock, IconPhone, IconPin, IconTelegram, IconWhatsApp } from "@/components/icons";
import { LeadSection } from "@/components/lead-section";
import { PageHero } from "@/components/page-hero";
import { YandexMap } from "@/components/yandex-map";
import { site, telegramLink, whatsappLink } from "@/data/site";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Контакты фитнес-клуба Urban210: адрес, телефон, режим работы",
  description: `Фитнес-клуб Urban210: Хабаровск, ${site.address.short}, Железнодорожный район. Телефон ${site.phone.display}. Пн–Пт 06:30–23:30, Сб–Вс 07:30–22:30. Бесплатная парковка.`,
  path: "/contacts/",
});

export default function Page() {
  return (
    <>
      <PageHero title="Контакты" lead={`${site.district}, ${site.address.short}. ${site.parking}.`} crumbs={[{ href: "/contacts/", label: "Контакты" }]} />
      <section className="wrap grid gap-10 pb-20 lg:grid-cols-[0.9fr_1.1fr]" data-block="contacts">
        <div className="grid content-start gap-8">
          <div className="flex gap-4">
            <IconPin className="mt-1 shrink-0 text-accent" />
            <div>
              <p className="font-medium">Адрес</p>
              <p className="text-muted">
                {site.address.locality}, {site.address.street}
              </p>
              <div className="mt-2 flex flex-wrap gap-x-5 gap-y-1">
                <a href={site.maps.yandex} target="_blank" rel="noopener" className="text-accent underline underline-offset-4">
                  Яндекс Карты
                </a>
                <a href={site.maps.twoGis} target="_blank" rel="noopener" className="text-accent underline underline-offset-4">
                  2ГИС
                </a>
              </div>
            </div>
          </div>
          <div className="flex gap-4">
            <IconClock className="mt-1 shrink-0 text-accent" />
            <div>
              <p className="font-medium">Режим работы</p>
              {site.hours.map((h) => (
                <p key={h.days} className="text-muted">
                  {h.days}: {h.time}
                </p>
              ))}
            </div>
          </div>
          <div className="flex gap-4">
            <IconPhone className="mt-1 shrink-0 text-accent" />
            <div>
              <p className="font-medium">Отдел продаж</p>
              <a href={site.phone.href} className="text-xl font-medium hover:text-accent">
                {site.phone.display}
              </a>
              <a href={`mailto:${site.email}`} className="block text-muted hover:text-ink">
                {site.email}
              </a>
            </div>
          </div>
          <div className="flex flex-wrap gap-3">
            <a href={whatsappLink("Здравствуйте! Вопрос по клубу Urban210")} target="_blank" rel="noopener" className="btn btn-ghost">
              <IconWhatsApp /> WhatsApp
            </a>
            <a href={telegramLink("site_contacts")} target="_blank" rel="noopener" className="btn btn-ghost">
              <IconTelegram /> Telegram-бот
            </a>
          </div>
          <p className="text-sm text-muted">
            {site.legal.name}, ИНН {site.legal.inn}, ОГРН {site.legal.ogrn}
            <br />
            {site.legal.address}
          </p>
        </div>
        <YandexMap />
      </section>
      <LeadSection />
    </>
  );
}
