import Image, { getImageProps } from "next/image";
import { preload } from "react-dom";
import Link from "next/link";
import { Cta } from "@/components/cta";
import { Faq } from "@/components/faq";
import { IconArrow, IconCar, IconClock, IconPin } from "@/components/icons";
import { LeadSection } from "@/components/lead-section";
import { Pricing } from "@/components/pricing";
import { Comparison, Programs, Promos, RatingBadge, Reviews, SectionHead, Zones } from "@/components/sections";
import { Trainers } from "@/components/trainers";
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

// Разные кадры для телефона и десктопа: на узком экране тёмный панорамный кадр почти не читается.
function HeroPicture() {
  const common = { alt: "Тренажёрный зал Urban210 с панорамными окнами", fill: true, priority: true, sizes: "100vw" };
  const { props: { srcSet: desktop } } = getImageProps({ ...common, src: "/images/hero.jpg", quality: 70 });
  const { props: { srcSet: mobile, ...rest } } = getImageProps({ ...common, src: "/images/zal.jpg", quality: 60 });
  preload(rest.src, { as: "image", imageSrcSet: mobile, imageSizes: "100vw", fetchPriority: "high", media: "(max-width: 767px)" } as Parameters<typeof preload>[1]);
  preload(rest.src.replace("zal.jpg", "hero.jpg"), { as: "image", imageSrcSet: desktop, imageSizes: "100vw", fetchPriority: "high", media: "(min-width: 768px)" } as Parameters<typeof preload>[1]);
  return (
    <picture>
      <source media="(min-width: 768px)" srcSet={desktop} />
      <source media="(max-width: 767px)" srcSet={mobile} />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img {...rest} alt={common.alt} fetchPriority="high" className="-z-20 object-cover object-[60%_center]" />
    </picture>
  );
}

export default function Home() {
  return (
    <>
      {/* Первый экран */}
      <section className="relative isolate flex min-h-[calc(100svh-4rem)] items-end overflow-hidden md:min-h-[min(54rem,calc(100svh-4.5rem))]" data-block="hero">
        <HeroPicture />
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(15,14,13,0.55)_0%,rgba(15,14,13,0.78)_40%,#0f0e0d_100%)] md:bg-[linear-gradient(180deg,rgba(15,14,13,0.35)_0%,rgba(15,14,13,0.55)_45%,#0f0e0d_100%)]" />
        <div aria-hidden="true" className="absolute -bottom-40 -left-40 -z-10 h-[30rem] w-[30rem] rounded-full bg-accent/20 blur-3xl" />
        <div className="wrap pb-12 pt-24 md:pb-20">
          <p className="rise eyebrow">
            <IconPin size={18} /> {site.district}, {site.address.short}
          </p>
          <h1 className="rise rise-2 mt-5 max-w-5xl text-[length:var(--text-hero)] leading-[0.95]">
            Фитнес-клуб в Хабаровске. <span className="text-accent">Безлимит от {minDay} ₽</span> в день
          </h1>
          <p className="rise rise-3 mt-6 max-w-2xl text-[length:var(--text-lead)] text-[#d9d2ca]">
            {site.facts.area} без очередей, {site.facts.machines} {site.facts.brands}, сауна и хаммам, бесплатная парковка. Без вступительного взноса.
          </p>
          <div className="rise rise-3 mt-9 flex flex-col gap-3 sm:flex-row">
            <Cta goal={trial.title} block="hero" className="text-base sm:min-w-64">
              Пробный день за 1 ₽
            </Cta>
            <Link href="/price/" className="btn btn-ghost border-white/25 text-base backdrop-blur-sm">
              Смотреть тарифы
            </Link>
          </div>
          <RatingBadge className="rise rise-3 mt-8 text-[0.9375rem] text-[#d9d2ca] hover:text-ink" />
        </div>
      </section>

      {/* Быстрые факты */}
      <section aria-label="Коротко о клубе" className="border-y border-line" data-block="facts">
        <ul className="wrap grid grid-cols-2 lg:grid-cols-4">
          {[
            { big: "0 ₽", small: "вступительный взнос", icon: null },
            { big: "6:30", small: "открываемся по будням, закрываемся в 23:30", icon: <IconClock size={18} /> },
            { big: "50", small: "мест на бесплатной парковке", icon: <IconCar size={18} /> },
            { big: "4,7", small: `рейтинг, ${site.rating.text}`, icon: null },
          ].map((f) => (
            <li key={f.big} className="border-line py-7 pr-4 md:py-9 [&:nth-child(even)]:border-l [&:nth-child(even)]:pl-4 md:[&:nth-child(even)]:pl-8 [&:nth-child(n+3)]:border-t lg:[&:nth-child(n+3)]:border-t-0 lg:[&:not(:first-child)]:border-l lg:[&:not(:first-child)]:pl-8">
              <p className="font-display text-5xl font-semibold leading-none md:text-6xl">{f.big}</p>
              <p className="mt-2 text-[0.9375rem] text-muted">{f.small}</p>
            </li>
          ))}
        </ul>
      </section>

      <Zones />

      {/* Тарифы */}
      <section id="tarify" className="section on-paper" aria-labelledby="price-title" data-block="price">
        <div className="wrap">
          <SectionHead
            id="price-title"
            title="Тарифы без вступительного взноса"
            text="Цена на сайте и есть итоговая цена. Оплата за год выходит почти на треть дешевле."
            action={
              <Link href="/price/" className="btn btn-ghost shrink-0">
                Подробнее о тарифах <IconArrow />
              </Link>
            }
          />
          <Pricing block="home_price" />
        </div>
      </section>

      <Comparison />

      {/* Групповые */}
      <section className="section border-t border-line" aria-labelledby="group-title" data-block="group">
        <div className="wrap">
          <SectionHead
            id="group-title"
            title="Групповые программы"
            text="Входят в тариф «Всё включено». Расписание и запись в приложении клуба: показали QR-код на входе и пошли на тренировку."
            action={
              <Link href="/group/" className="btn btn-ghost shrink-0">
                Все направления <IconArrow />
              </Link>
            }
          />
          <div className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
            <Programs />
            <div className="relative min-h-[22rem] overflow-hidden rounded-[var(--radius-card)]">
              <Image src="/images/functional.jpg" alt="Функциональная тренировка с медболами в Urban210" fill sizes="(min-width: 1024px) 40vw, 100vw" className="object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* Персональные и тренеры */}
      <section className="section border-t border-line" aria-labelledby="trainers-title" data-block="personal">
        <div className="wrap">
          <SectionHead
            id="trainers-title"
            title="Тренеры, которые ведут к результату"
            text={personalText.lead}
            action={
              <Link href="/personal/" className="btn btn-ghost shrink-0">
                Персональные тренировки <IconArrow />
              </Link>
            }
          />
          <Trainers />
          <div className="mt-8 flex flex-col gap-6 rounded-[var(--radius-card)] border border-line bg-card p-6 md:flex-row md:items-center md:justify-between md:p-8">
            <div>
              <p className="font-display text-3xl uppercase">{personalText.price}</p>
              <p className="mt-2 text-muted">{personalText.bonus}</p>
            </div>
            <Cta goal="Персональные тренировки" block="personal" className="shrink-0">
              Записаться к тренеру
            </Cta>
          </div>
        </div>
      </section>

      <Reviews />

      {/* Акции */}
      <section className="section border-t border-line" aria-labelledby="promo-title" data-block="promo">
        <div className="wrap">
          <SectionHead
            id="promo-title"
            title="Акции"
            action={
              <Link href="/promo/" className="btn btn-ghost shrink-0">
                Все акции <IconArrow />
              </Link>
            }
          />
          <Promos />
        </div>
      </section>

      <Faq items={faqGeneral} />

      <LeadSection />
    </>
  );
}
