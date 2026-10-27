import { Cta } from "@/components/cta";
import { Faq } from "@/components/faq";
import { JsonLd } from "@/components/json-ld";
import { LeadSection } from "@/components/lead-section";
import { PageHero } from "@/components/page-hero";
import { Pricing } from "@/components/pricing";
import { Comparison, Promos, SectionHead } from "@/components/sections";
import { faqGeneral, personalText } from "@/data/content";
import { plans, rub, trial } from "@/data/pricing";
import { SITE_URL } from "@/data/site";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Цены на абонементы в фитнес-клуб Urban210, Хабаровск",
  description: `Абонемент в фитнес-клуб Urban210: от ${rub(plans[0].month)} в месяц, за год от ${rub(plans[0].year)}. Без вступительного взноса. Тренажёрный зал, групповые, сауна и хаммам. Пробный день за 1 ₽.`,
  path: "/price/",
});

const faq = [
  faqGeneral[1],
  faqGeneral[2],
  { q: "Чем дневная карта отличается от полного дня?", a: "Дневная карта действует с 6:30 до 16:00, это самый дешёвый способ тренироваться, если вы свободны утром или днём. «Полный день» открывает клуб на всё время работы." },
  { q: "Что входит в «Всё включено»?", a: "Всё из «Полного дня», плюс групповые программы без доплат, SPA-зона с финской сауной, хаммамом и релакс-зоной, приоритетное обслуживание." },
  faqGeneral[3],
  { q: "Можно ли оплатить частями?", a: "Да, договор допускает рассрочку. Условия подскажет администратор при оформлении." },
];

export default function Page() {
  return (
    <>
      <PageHero
        title="Цены на абонементы"
        lead={`Три тарифа, безлимит в выбранное время. Без вступительного взноса и скрытых платежей. Перед покупкой можно прийти на ${trial.title.toLowerCase()}.`}
        crumbs={[{ href: "/price/", label: "Тарифы" }]}
      >
        <Cta goal={trial.title} block="price_hero">
          Пробный день за 1 ₽
        </Cta>
      </PageHero>

      <section className="section on-paper" aria-labelledby="plans-title" data-block="price">
        <div className="wrap">
          <h2 id="plans-title" className="sr-only">
            Тарифы
          </h2>
          <Pricing block="price_page" />
        </div>
      </section>

      <section className="section" aria-labelledby="pt-title" data-block="personal_price">
        <div className="wrap grid gap-8 md:grid-cols-2 md:items-end">
          <SectionHead id="pt-title" title="Персональные тренировки" text={personalText.lead} />
          <div className="rounded-[var(--radius-card)] border border-line bg-card p-6 md:p-8">
            <p className="font-display text-3xl uppercase">{personalText.price}</p>
            <p className="mt-2 text-muted">{personalText.bonus}</p>
            <Cta goal="Персональные тренировки" block="personal_price" className="mt-6 w-full">
              Записаться к тренеру
            </Cta>
          </div>
        </div>
      </section>

      <Comparison />

      <section className="section border-t border-line" aria-labelledby="promo-title" data-block="promo">
        <div className="wrap">
          <SectionHead id="promo-title" title="Акции" />
          <Promos />
        </div>
      </section>

      <Faq items={faq} title="Вопросы о тарифах" />
      <LeadSection title="Не знаете, какой тариф выбрать?" text="Оставьте номер: администратор спросит про цель и график и предложит тариф, который выйдет дешевле." goal="Вопрос" block="final_price" />

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "OfferCatalog",
          name: "Абонементы Urban210",
          url: SITE_URL + "/price/",
          itemListElement: plans.flatMap((p) => [
            { "@type": "Offer", name: `${p.name}, 1 месяц`, price: p.month, priceCurrency: "RUB", availability: "https://schema.org/InStock", seller: { "@id": SITE_URL + "/#club" } },
            { "@type": "Offer", name: `${p.name}, 12 месяцев`, price: p.year, priceCurrency: "RUB", availability: "https://schema.org/InStock", seller: { "@id": SITE_URL + "/#club" } },
          ]),
        }}
      />
    </>
  );
}
