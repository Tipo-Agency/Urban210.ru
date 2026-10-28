import { Faq } from "@/components/faq";
import { Community, Hero, Offers, PriceStatement, Programs, Reviews, Tagline, Trainers, Zones } from "@/components/home/v4";
import { PricingCards } from "@/components/home/pricing-cards";
import { LeadSection } from "@/components/lead-section";
import { faqGeneral } from "@/data/content";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Фитнес-клуб Urban210 в Хабаровске: безлимит от 1300 ₽ в месяц",
  description:
    "Фитнес-клуб в Железнодорожном районе Хабаровска. Тренажёры Technogym и Matrix, групповые программы, сауна и хаммам, бесплатная парковка. Без вступительного взноса. Пробный день за 1 ₽.",
  path: "/",
});

export default function Home() {
  return (
    <>
      <Hero />
      <Zones />
      <PriceStatement />

      <section id="tarify" className="section on-paper" aria-labelledby="price-title" data-block="price">
        <div className="wrap">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <h2 id="price-title" className="h2 max-w-[12ch]">
              Тарифы без вступительного взноса
            </h2>
            <p className="max-w-[34ch] text-muted">Цена фиксируется на весь срок подписки. За год выходит до 31% дешевле.</p>
          </div>
          <div className="mt-10 md:mt-14">
            <PricingCards block="home_price" />
          </div>
        </div>
      </section>

      <Tagline />
      <Reviews />
      <Programs />
      <Trainers />
      <Offers />
      <Community />
      <Faq items={faqGeneral} title="Частые вопросы" />
      <LeadSection title="Приходите на пробный день за 1 ₽" text="Оставьте номер: перезвоним, ответим на вопросы и запишем на удобное время." />
    </>
  );
}
