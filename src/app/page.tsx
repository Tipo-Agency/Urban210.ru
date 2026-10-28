import { Faq } from "@/components/faq";
import { BrandMarquee, Bento, ChoiceAB, GroupPrograms, Hero, HeroFacts, ReviewsFacts, TrainersBlock, TrialBlock, Why2000 } from "@/components/home/sections";
import { HomeMotion } from "@/components/home/home-motion";
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
      <div className="relative z-10 -mt-6 md:-mt-10">
        <HeroFacts />
      </div>

      <Bento />

      {/* Тарифы */}
      <section id="tarify" className="section pt-0" aria-labelledby="price-title" data-block="price">
        <div className="wrap">
          <h2 id="price-title" data-g="rise" className="text-center text-[clamp(2.25rem,1.3rem+3.6vw,4.75rem)] leading-[0.98]">
            <span className="text-accent">Выберите</span> свой путь
          </h2>
          <div className="mt-10">
            <BrandMarquee text="Фиксируй цену сегодня" />
          </div>
          <div className="mt-10">
            <PricingCards block="home_price" />
          </div>
        </div>
      </section>

      <TrialBlock />
      <Why2000 />
      <ReviewsFacts />
      <GroupPrograms />
      <TrainersBlock />
      <Faq items={faqGeneral} paper={false} title="Есть вопросы? Мы ответили на главные" />
      <ChoiceAB />
      <LeadSection title="Какой путь выберешь ты?" text="Хватит откладывать. Оставь номер, и мы забронируем за тобой стартовую тренировку." />
      <HomeMotion />
    </>
  );
}
