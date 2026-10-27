import Image from "next/image";
import Link from "next/link";
import { CommunityReel, Manifesto, Marquee, ProgramList, PromoCards, ReviewRail, Stats, TrainerWall, VersusNetwork, ZoneStack } from "@/components/blocks";
import { Cta } from "@/components/cta";
import { Faq } from "@/components/faq";
import { IconArrow, IconStar } from "@/components/icons";
import { LeadSection } from "@/components/lead-section";
import { Pricing } from "@/components/pricing";
import { faqGeneral, personalText } from "@/data/content";
import { perDay, plans, trial } from "@/data/pricing";
import { site } from "@/data/site";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Фитнес-клуб Urban210 в Хабаровске: безлимит от 1300 ₽ в месяц",
  description:
    "Фитнес-клуб в Железнодорожном районе Хабаровска. Тренажёры Technogym и Matrix, групповые программы, сауна и хаммам, бесплатная парковка. Без вступительного взноса. Пробный день за 1 ₽.",
  path: "/",
});

const minDay = perDay(plans[0].month, 30);

export default function Home() {
  return (
    <>
      {/* Первый экран: фото зала во весь экран и гигантский логотип */}
      <section className="relative isolate flex min-h-[max(100svh,40rem)] flex-col justify-end overflow-hidden pb-10 md:pb-0" data-block="hero">
        <Image src="/images/zal.jpg" alt="Тренажёрный зал Urban210 с панорамными окнами" fill priority quality={70} sizes="100vw" className="-z-20 object-cover object-[58%_center] grayscale" />
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(11,11,10,0.55)_0%,rgba(11,11,10,0.35)_35%,rgba(11,11,10,0.85)_70%,#0b0b0a_100%)]" />
        <div aria-hidden="true" className="absolute -bottom-[20%] left-1/2 -z-10 h-[34rem] w-[60rem] -translate-x-1/2 bg-[radial-gradient(closest-side,rgba(255,90,31,0.3),transparent)]" />

        <div className="wrap relative pt-6 md:pt-28">
          <div className="grid gap-8 pb-6 md:grid-cols-[1fr_auto] md:items-end md:gap-12 md:pb-4">
            <div>
              <p className="kicker flex items-center gap-3 text-[#e9e2da]">
                <span className="h-2 w-2 animate-pulse rounded-full bg-accent" />
                {site.district} · {site.address.short}
              </p>
              <h1 className="mt-5 max-w-[16ch] text-[clamp(2.5rem,1.4rem+4.2vw,5.25rem)] leading-[0.92]">
                Фитнес-клуб в Хабаровске. <span className="text-accent">Безлимит от {minDay} ₽ в день</span>
              </h1>
              <p className="rise rise-3 mt-5 max-w-xl text-[length:var(--text-lead)] text-[#ddd6ce]">
                {site.facts.machines} {site.facts.brands}, групповые, сауна и хаммам. Без вступительного взноса.
              </p>
            </div>
            <div className="rise rise-4 flex flex-col gap-4 md:items-end">
              <Cta goal={trial.title} block="hero" className="h-16 px-8 text-lg">
                Пробный день за 1 ₽ <IconArrow />
              </Cta>
              <a href={site.maps.yandexReviews} target="_blank" rel="noopener" className="flex items-center gap-3 text-[0.9375rem] text-[#ddd6ce] hover:text-ink" data-block="rating">
                <span className="flex text-accent" aria-hidden="true">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <IconStar key={i} />
                  ))}
                </span>
                <span>
                  <b className="font-semibold text-ink">{site.rating.value.toString().replace(".", ",")}</b> · {site.rating.text}
                </span>
              </a>
            </div>
          </div>
        </div>
        <p aria-hidden="true" className="mega order-first mt-24 select-none whitespace-nowrap text-center text-[23.6vw] leading-[0.76] md:order-none md:-mb-[0.06em] md:mt-0">
          URBAN<span className="text-accent">210</span>
        </p>
      </section>

      {/* Две бегущие строки крест-накрест */}
      <div className="relative z-10 -my-2 overflow-hidden py-10 md:py-14" aria-label="Коротко о предложении">
        <Marquee className="-rotate-[3deg] scale-105" items={["Пробный день за 1 ₽", "Без вступительного взноса", "Открыты с 6:30", "Парковка 50 мест", "Сауна и хаммам"]} />
        <Marquee tone="ink" reverse className="absolute inset-x-0 top-1/2 -z-10 -translate-y-1/2 rotate-[2.5deg] scale-105" items={["Technogym", "Matrix", "Кроссфит", "TRX", "Пилатес", "Зумба", "Хаммам"]} />
      </div>

      <Manifesto
        parts={[
          "Тягаем железо",
          { img: "/images/free-weights.jpg", alt: "Гантели" },
          "бежим свои километры",
          { img: "/images/cardio.jpg", alt: "Кардиозона" },
          "потеем на групповых",
          { img: "/images/group.jpg", alt: "Групповая тренировка" },
          "и отогреваемся в хаммаме. Без взноса и без очередей.",
        ]}
      />

      <Stats />

      <div className="h-24 md:h-36" />
      <ZoneStack />

      {/* Тарифы на светлом фоне: смена ритма страницы */}
      <section id="tarify" className="section on-paper relative overflow-hidden rounded-[2.5rem] md:rounded-[4rem]" aria-labelledby="price-title" data-block="price">
        <div className="wrap">
          <div className="mb-12 flex flex-col gap-6 md:mb-16 md:flex-row md:items-end md:justify-between">
            <h2 id="price-title" data-reveal className="text-[length:var(--text-h2)]">
              Тарифы
              <br />
              <span className="text-accent">без взноса</span>
            </h2>
            <div data-reveal className="max-w-sm">
              <p className="text-[length:var(--text-lead)] text-muted">Цена на сайте и есть итоговая. За год выходит почти на треть дешевле.</p>
              <Link href="/price/" className="mt-4 inline-flex items-center gap-2 font-semibold underline decoration-accent decoration-2 underline-offset-[6px] hover:text-accent">
                Подробнее о тарифах <IconArrow />
              </Link>
            </div>
          </div>
          <Pricing block="home_price" />
        </div>
      </section>

      <VersusNetwork />

      {/* Групповые */}
      <section className="section pt-0" aria-labelledby="group-title" data-block="group">
        <div className="wrap">
          <div className="mb-10 flex flex-col gap-6 md:mb-14 md:flex-row md:items-end md:justify-between">
            <h2 id="group-title" data-reveal className="text-[length:var(--text-h2)]">
              Групповые
              <br />
              <span className="outline-ink">программы</span>
            </h2>
            <p data-reveal className="max-w-sm text-[length:var(--text-lead)] text-muted">
              Входят в «Всё включено». Запись в приложении клуба: показали QR-код на входе и пошли на тренировку.
            </p>
          </div>
          <ProgramList />
        </div>
      </section>

      {/* Тренеры */}
      <section className="section border-t border-line" aria-labelledby="trainers-title" data-block="personal">
        <div className="wrap">
          <div className="mb-10 flex flex-col gap-6 md:mb-14 md:flex-row md:items-end md:justify-between">
            <h2 id="trainers-title" data-reveal className="text-[length:var(--text-h2)]">
              Тренеры,
              <br />
              <span className="text-accent">которые ведут</span>
            </h2>
            <p data-reveal className="max-w-sm text-[length:var(--text-lead)] text-muted">
              {personalText.lead}
            </p>
          </div>
          <TrainerWall />
          <div data-reveal className="mt-4 flex flex-col gap-6 rounded-[2rem] bg-accent p-7 text-[#120804] md:flex-row md:items-center md:justify-between md:p-10">
            <div>
              <p className="font-display text-4xl font-bold uppercase leading-none md:text-5xl">{personalText.price}</p>
              <p className="mt-3 text-[#3a1a0c]">{personalText.bonus}</p>
            </div>
            <a href="#zayavka" data-lead="Персональные тренировки" data-block="personal" className="btn btn-ink shrink-0">
              Записаться к тренеру <IconArrow />
            </a>
          </div>
        </div>
      </section>

      {/* Люди и отзывы */}
      <section className="section overflow-hidden border-t border-line" aria-labelledby="reviews-title" data-block="reviews">
        <div className="wrap mb-12 flex flex-col gap-6 md:mb-16 md:flex-row md:items-end md:justify-between">
          <h2 id="reviews-title" data-reveal className="text-[length:var(--text-h2)]">
            Это наши.
            <br />
            <span className="outline-ink">Присоединяйся</span>
          </h2>
          <a href={site.maps.yandexReviews} target="_blank" rel="noopener" data-reveal className="group flex items-center gap-5">
            <span className="num text-8xl text-accent">{site.rating.value.toString().replace(".", ",")}</span>
            <span className="text-muted">
              <span className="flex text-accent" aria-hidden="true">
                {Array.from({ length: 5 }).map((_, i) => (
                  <IconStar key={i} />
                ))}
              </span>
              <span className="mt-1 block group-hover:text-ink">
                {site.rating.text}
                <br />
                на Яндекс Картах и 2ГИС
              </span>
            </span>
          </a>
        </div>
        <CommunityReel />
        <div className="wrap mt-16">
          <ReviewRail />
          <div className="mt-8 flex flex-wrap gap-3">
            <a href={site.maps.yandexReviews} target="_blank" rel="noopener" className="btn btn-ghost">
              Все отзывы на Яндекс Картах
            </a>
            <a href={site.maps.twoGis} target="_blank" rel="noopener" className="btn btn-ghost">
              Отзывы в 2ГИС
            </a>
          </div>
        </div>
      </section>

      {/* Акции */}
      <section className="section border-t border-line" aria-labelledby="promo-title" data-block="promo">
        <div className="wrap">
          <div className="mb-10 flex items-end justify-between gap-6 md:mb-14">
            <h2 id="promo-title" data-reveal className="text-[length:var(--text-h2)]">
              Акции
            </h2>
            <Link href="/promo/" className="btn btn-ghost shrink-0">
              Все акции <IconArrow />
            </Link>
          </div>
          <PromoCards />
        </div>
      </section>

      <Faq items={faqGeneral} />

      <LeadSection />
    </>
  );
}
