import Image from "next/image";
import { Cta } from "@/components/cta";
import { Faq } from "@/components/faq";
import { LeadSection } from "@/components/lead-section";
import { PageHero } from "@/components/page-hero";
import { SectionHead } from "@/components/sections";
import { trial } from "@/data/pricing";
import { site } from "@/data/site";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Тренажёрный зал в Хабаровске, Железнодорожный район",
  description: `Тренажёрный зал Urban210: ${site.facts.area}, ${site.facts.machines} ${site.facts.brands}, свободные веса, кардиозона с Technogym Skillrun, октагон. Без очередей, с 6:30 до 23:30, бесплатная парковка.`,
  path: "/zal/",
  image: "/images/zal.jpg",
});

const blocks = [
  {
    id: "free-weights",
    title: "Свободные веса",
    text: "Гантели до 60 кг, штанги, грифы и блины в достатке. Скамьи для жима, стойки для приседа и помосты для становой: очередь не собирается даже вечером.",
    image: "/images/free-weights.jpg",
    alt: "Ряды гантелей в тренажёрном зале Urban210",
  },
  {
    id: "machines",
    title: "Тренажёры Technogym и Matrix",
    text: "Блочные и рычажные тренажёры на все группы мышц с правильной биомеханикой. Подходят и новичку, и тому, кто тренируется годами.",
    image: "/images/machines.jpg",
    alt: "Силовой тренажёр в зале Urban210",
  },
  {
    id: "cardio",
    title: "Кардиозона",
    text: "Большая зона на втором этаже: беговые дорожки Technogym Skillrun для ходьбы в наклоне, бега и интервалов, эллипсы. Свободная дорожка находится почти всегда.",
    image: "/images/cardio.jpg",
    alt: "Беговые дорожки Technogym в кардиозоне Urban210",
  },
  {
    id: "functional",
    title: "Функциональная зона и октагон",
    text: "Медболы, петли TRX и октагон для единоборств. Здесь проходят функциональные тренировки и работа с тренером.",
    image: "/images/functional.jpg",
    alt: "Функциональная тренировка в октагоне Urban210",
  },
];

const faq = [
  { q: "Сколько людей в зале вечером?", a: `Зал занимает ${site.facts.area}, поэтому даже в час пик очередей к тренажёрам почти не бывает.` },
  { q: "Кто поможет, если я новичок?", a: "Инструкторы в зале покажут, как настроить тренажёр и выполнить упражнение. На тарифах «Полный день» и «Всё включено» есть пробная тренировка с тренером, а при покупке подписки первая персональная тренировка бесплатно." },
  { q: "Есть ли шкафчики и душ?", a: "Да. Просторные раздевалки, шкафчики и много душевых, так что ждать не придётся." },
  { q: "Как попасть в зал?", a: "Вход по браслету или QR-коду в приложении клуба. Оформить абонемент можно на ресепшене или оставить заявку на сайте." },
];

export default function Page() {
  return (
    <>
      <PageHero
        title="Тренажёрный зал в Хабаровске"
        lead={`${site.facts.area}, ${site.facts.machines} ${site.facts.brands}, свободные веса и кардиозона. Тренируйтесь без очередей с 6:30 до 23:30.`}
        crumbs={[{ href: "/zal/", label: "Тренажёрный зал" }]}
        image="/images/zal.jpg"
        imageAlt="Тренажёрный зал Urban210 с панорамными окнами"
      >
        <Cta goal={trial.title} block="zal_hero">
          Пробный день за 1 ₽
        </Cta>
      </PageHero>

      <section className="section" aria-labelledby="zal-zones" data-block="zal_zones">
        <div className="wrap">
          <SectionHead id="zal-zones" title="Что внутри" text="Два этажа: внизу силовая зона и функционалка, наверху кардио." />
          <div className="grid gap-16 md:gap-24">
            {blocks.map((b, i) => (
              <article key={b.id} id={b.id} className="grid items-center gap-8 md:grid-cols-2 md:gap-14">
                <div className={`relative aspect-[4/3] overflow-hidden rounded-[var(--radius-card)] bg-card ${i % 2 ? "md:order-2" : ""}`}>
                  <Image src={b.image} alt={b.alt} fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />
                </div>
                <div>
                  <h2 className="text-[length:var(--text-h3)] md:text-4xl">{b.title}</h2>
                  <p className="mt-4 max-w-md text-[length:var(--text-lead)] text-muted">{b.text}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <Faq items={faq} title="Вопросы о зале" />
      <LeadSection title="Посмотрите зал вживую за 1 ₽" />
    </>
  );
}
