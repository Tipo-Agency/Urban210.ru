import Image from "next/image";
import Link from "next/link";
import { Arrows, Cta } from "@/components/cta";
import { IconStar } from "@/components/icons";
import { personalText, programs, promos, reviews, trainers } from "@/data/content";
import { perDay, plans, trial } from "@/data/pricing";
import { site } from "@/data/site";
import { HeroStage } from "./hero-stage";
import { ZonesTrack } from "./zones-track";

const minDay = perDay(plans[0].month, 30);

/* ───────── Первый экран ───────── */

export function Hero() {
  return (
    <section className="relative lg:h-[230svh]" data-block="hero" aria-labelledby="hero-title">
      <HeroStage>
        <div className="hero-copy wrap relative z-10 order-1 pt-24 md:pt-28 lg:flex lg:h-full lg:flex-col lg:justify-center lg:pb-24 lg:pt-20">
          <p className="rise font-medium text-muted">
            Фитнес-клуб в Хабаровске, {site.district}
          </p>
          <h1 id="hero-title" className="rise rise-2 mt-5 max-w-[11ch] text-[length:var(--text-hero)] uppercase leading-[0.92] tracking-[-0.045em]">
            Стильный клуб для сильных
          </h1>
          <p className="rise rise-3 mt-6 max-w-[34ch] text-[length:var(--text-lead)] text-ink/85">
            Безлимит от {minDay} ₽ в день. Без вступительного взноса, с 6:30 до 23:30, парковка на 50 машин.
          </p>
          <div className="rise rise-4 mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Cta goal={trial.title} block="hero">
              {trial.title}
            </Cta>
            <a href="#tarify" className="inline-flex min-h-12 items-center gap-2 px-1 font-semibold underline decoration-accent decoration-2 underline-offset-[6px] hover:text-accent">
              Тарифы от {plans[0].month.toLocaleString("ru-RU")} ₽ в месяц
            </a>
          </div>
        </div>

        {/* Появляется, когда окно раскрылось на весь экран (только десктоп) */}
        <div className="hero-after pointer-events-none absolute inset-x-0 bottom-0 z-10 hidden lg:block">
          <div className="wrap grid grid-cols-3 gap-8 pb-12">
            {[
              ["1300 м²", "зал без очередей даже вечером"],
              ["60+", "тренажёров Technogym и Matrix"],
              [site.rating.value.toString().replace(".", ","), `на Яндекс Картах, ${site.rating.text}`],
            ].map(([big, small]) => (
              <div key={big} className="border-t border-ink/40 pt-5">
                <p className="num text-[clamp(3rem,5vw,5.5rem)]">{big}</p>
                <p className="mt-3 max-w-[22ch] text-lg">{small}</p>
              </div>
            ))}
          </div>
        </div>
      </HeroStage>

      {/* На телефоне те же факты обычным списком */}
      <ul className="wrap mt-8 grid grid-cols-3 gap-3 lg:hidden">
        {[
          ["1300 м²", "зал"],
          ["60+", "тренажёров"],
          [site.rating.value.toString().replace(".", ","), "Яндекс Карты"],
        ].map(([big, small]) => (
          <li key={big} className="border-t border-line pt-3">
            <p className="num whitespace-nowrap text-[1.5rem]">{big}</p>
            <p className="mt-1 text-sm text-muted">{small}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}

/* ───────── Зоны клуба: лента ───────── */

const zoneCards = [
  { href: "/zal/", title: "Тренажёрный зал", text: "Больше 1300 м² и 60+ тренажёров Technogym и Matrix. Очередей нет даже вечером.", img: "/images/zal.jpg", alt: "Тренажёрный зал Urban210: ряды тренажёров у панорамных окон" },
  { href: "/zal/", title: "Свободные веса", text: "Гантели и блины до 60 кг, стойки для приседа, скамьи для жима и помосты.", img: "/images/free-weights.jpg", alt: "Стойка с гантелями в зале Urban210" },
  { href: "/zal/#cardio", title: "Кардиозона", text: "Беговые дорожки Technogym Skillrun: ходьба в наклоне, бег, интервалы.", img: "/images/cardio.jpg", alt: "Ряд беговых дорожек Technogym" },
  { href: "/group/", title: "Групповые", text: "Отдельный зал 150 м²: от пилатеса до кроссфита, запись в приложении клуба.", img: "/images/group.jpg", alt: "Групповая тренировка в зале Urban210" },
  { href: "/zal/", title: "Тренажёры", text: "Блочные тренажёры на все группы мышц, настроены под новичков и опытных.", img: "/images/machines.jpg", alt: "Блочный тренажёр в зале Urban210" },
];

function ZonesIntro({ id }: { id?: string }) {
  return (
    <>
      <h2 id={id} className="h2 max-w-[14ch]">
        Всё для тренировки под одной крышей
      </h2>
      <p className="mt-5 max-w-[32ch] text-muted">Два этажа: внизу силовая зона и свободные веса, наверху кардио.</p>
      <Arrows className="mt-8 hidden h-8 w-8 text-accent lg:block" />
    </>
  );
}

export function Zones() {
  return (
    <section aria-labelledby="zones-title" data-block="zones" className="pt-20 md:pt-28 lg:pt-0">
      <div className="wrap mb-8 lg:hidden">
        <ZonesIntro />
      </div>
      <ZonesTrack>
        <div className="hidden w-[30rem] shrink-0 flex-col justify-end pr-8 lg:flex">
          <ZonesIntro id="zones-title" />
        </div>

        {zoneCards.map((z) => (
          <article key={z.title} className="group relative w-[78vw] shrink-0 snap-start sm:w-[24rem] lg:w-[34rem]">
            <Link prefetch={false} href={z.href} className="block">
              <div className="cut-r relative aspect-[4/5] overflow-hidden bg-card lg:aspect-[5/6]" style={{ "--cut": "3rem" } as React.CSSProperties}>
                <Image src={z.img} alt={z.alt} fill sizes="(min-width: 1024px) 34rem, 78vw" className="duo object-cover group-hover:scale-[1.03]" />
              </div>
              <div className="mt-5 flex items-start justify-between gap-4 pr-4">
                <div>
                  <h3 className="text-[length:var(--text-h3)] transition-colors group-hover:text-accent">{z.title}</h3>
                  <p className="mt-2 max-w-[34ch] text-muted">{z.text}</p>
                </div>
                <Arrows className="mt-1.5 h-5 w-5 shrink-0 text-accent transition-transform duration-300 group-hover:translate-x-1" />
              </div>
            </Link>
          </article>
        ))}

        <article className="on-accent relative flex w-[78vw] shrink-0 snap-start flex-col justify-between p-7 sm:w-[24rem] lg:w-[30rem] lg:p-10" style={{ aspectRatio: "4 / 5" }}>
          <h3 className="text-[clamp(1.75rem,1.2rem+1.8vw,2.75rem)] leading-[1]">SPA после тренировки</h3>
          <ul className="grid gap-4 text-lg">
            <li className="border-t border-line pt-3">Финская сауна</li>
            <li className="border-t border-line pt-3">Хаммам 40–50 °C</li>
            <li className="border-t border-line pt-3">Релакс-зона с массажными креслами</li>
          </ul>
          <Link prefetch={false} href="/spa/" className="inline-flex items-center gap-3 font-semibold underline underline-offset-4">
            Входит в тариф «Всё включено»
            <Arrows className="h-4 w-4" />
          </Link>
        </article>
      </ZonesTrack>
    </section>
  );
}

/* ───────── Цена: оранжевая плоскость ───────── */

export function PriceStatement() {
  return (
    <section className="on-accent relative overflow-hidden" aria-labelledby="day-title" data-block="price_statement">
      <div className="wrap grid gap-10 py-16 md:py-24 lg:grid-cols-[1.2fr_1fr] lg:items-end">
        <div>
          <h2 id="day-title" className="sr-only">
            Безлимит от {minDay} ₽ в день
          </h2>
          <p aria-hidden="true" className="num whitespace-nowrap text-[clamp(6rem,24vw,21rem)] leading-[0.8] tracking-[-0.07em]">
            {minDay}&nbsp;₽
          </p>
          <p className="mt-6 max-w-[26ch] text-[clamp(1.375rem,1rem+1.2vw,2rem)] font-semibold leading-tight">
            столько в день стоит безлимит в зал на дневной карте
          </p>
        </div>
        <ul className="grid gap-0 text-lg">
          {[
            ["Вступительный взнос", "0 ₽"],
            ["Регистрация и браслет", "в цене"],
            ["Парковка", "бесплатно"],
            ["Первый визит", "1 ₽"],
          ].map(([k, v]) => (
            <li key={k} className="flex items-baseline justify-between gap-6 border-t border-line py-4 last:border-b">
              <span>{k}</span>
              <span className="font-display text-xl font-bold">{v}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ───────── Слоган, слова проявляются по скроллу ───────── */

export function Tagline() {
  const text = "Здесь не просто качают мышцы. Здесь меняют образ жизни.";
  return (
    <section className="section" aria-label="О клубе" data-block="tagline">
      <div className="wrap">
        <p data-words className="max-w-[18ch] font-display text-[clamp(2.25rem,1.2rem+4.4vw,6rem)] font-bold leading-[1.02] tracking-[-0.04em]">
          {text.split(" ").map((w, i) => (
            <span key={i} className="w">
              {w}{" "}
            </span>
          ))}
        </p>
      </div>
    </section>
  );
}

/* ───────── Отзывы ───────── */

const praise = [
  { pct: 65, title: "Просторный зал", quote: "Огромный зал, высокие потолки, нет тесноты" },
  { pct: 58, title: "Оборудование", quote: "Тренажёры Technogym, всегда свободны" },
  { pct: 48, title: "Цена", quote: "Дешевле разовых, безлимит топ" },
  { pct: 48, title: "Тренеры", quote: "Индивидуальный подход, техника, план питания" },
  { pct: 42, title: "Чистота", quote: "Чисто, приятная атмосфера" },
];

export function Reviews() {
  return (
    <section className="section pt-0" aria-labelledby="rev-title" data-block="reviews">
      <div className="wrap grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <div>
          <h2 id="rev-title" className="h2">
            Что пишут о клубе
          </h2>
          <div className="mt-10 flex items-end gap-5">
            <p className="num text-[clamp(5rem,4rem+4vw,8rem)] text-accent">{site.rating.value.toString().replace(".", ",")}</p>
            <p className="pb-2 text-muted">
              на Яндекс Картах
              <br />
              {site.rating.text}
            </p>
          </div>
          <p className="mt-10 font-semibold">Что хвалят чаще всего</p>
          <ul className="mt-4 grid gap-4">
            {praise.map((f) => (
              <li key={f.title}>
                <div className="flex items-baseline justify-between gap-4">
                  <span>{f.title}</span>
                  <span className="font-display font-bold">{f.pct}%</span>
                </div>
                <div className="mt-2 h-1.5 bg-white/10">
                  <div style={{ width: `${f.pct}%` }} className="h-full bg-accent" />
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <ul className="grid gap-px bg-line sm:grid-cols-2">
            {reviews.map((r) => (
              <li key={r.name} className="flex flex-col bg-bg p-6 md:p-8">
                <span className="flex text-accent" role="img" aria-label="5 из 5">
                  {Array.from({ length: 5 }).map((_, k) => (
                    <IconStar key={k} size={14} />
                  ))}
                </span>
                <blockquote className="mt-4 flex-1 text-ink/85">{r.text}</blockquote>
                <p className="mt-6 font-semibold">
                  {r.name}
                  <span className="font-normal text-muted">, {r.source}</span>
                </p>
              </li>
            ))}
          </ul>
          <div className="mt-6 flex flex-wrap gap-x-8 gap-y-3">
            <a href={site.maps.yandexReviews} target="_blank" rel="noopener" className="font-semibold underline decoration-accent decoration-2 underline-offset-[6px] hover:text-accent">
              Все отзывы на Яндекс Картах
            </a>
            <a href={site.maps.twoGis} target="_blank" rel="noopener" className="font-semibold underline decoration-accent decoration-2 underline-offset-[6px] hover:text-accent">
              Отзывы в 2ГИС
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ───────── Групповые программы: список ───────── */

const programImg: Record<string, { img: string; alt: string }> = {
  Силовые: { img: "/images/group-strength.jpg", alt: "Силовая тренировка с гантелями" },
  Функциональные: { img: "/images/functional.jpg", alt: "Функциональная тренировка с медболами" },
  Танцевальные: { img: "/images/group.jpg", alt: "Зумба в зале групповых программ" },
  "Мягкий фитнес": { img: "/images/stretching.jpg", alt: "Растяжка на ковриках" },
};

export function Programs() {
  return (
    <section className="section on-paper" aria-labelledby="group-title" data-block="group">
      <div className="wrap">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <h2 id="group-title" className="h2 max-w-[14ch]">
            Групповые программы без доплат
          </h2>
          <p className="max-w-[36ch] text-muted">Входят в тариф «Всё включено». Зал 150 м², запись в приложении клуба.</p>
        </div>
        <ul className="mt-12 border-t border-line md:mt-16">
          {programs.map((p) => {
            const m = programImg[p.group];
            return (
              <li key={p.group} className="group border-b border-line">
                <Link prefetch={false} href="/group/" className="grid grid-cols-[5rem_minmax(0,1fr)] items-center gap-4 py-5 md:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)_9rem] md:gap-10 md:py-7">
                  <div className="cut-r relative aspect-square overflow-hidden md:order-3 md:aspect-[4/3]" style={{ "--cut": "1.25rem" } as React.CSSProperties}>
                    <Image src={m.img} alt={m.alt} fill sizes="(min-width: 768px) 9rem, 5rem" className="duo object-cover" />
                  </div>
                  <div>
                    <h3 className="text-[clamp(1.25rem,0.8rem+2.4vw,3.25rem)] leading-none transition-colors group-hover:text-accent md:order-1">{p.group}</h3>
                    <p className="mt-2 text-sm font-semibold text-muted md:hidden">{p.items.join(", ")}</p>
                  </div>
                  <div className="col-span-2 md:order-2 md:col-span-1">
                    <p className="hidden text-sm font-semibold md:block">{p.items.join(", ")}</p>
                    <p className="text-muted md:mt-1">{p.text}</p>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

/* ───────── Тренеры ───────── */

const glow: Record<string, string> = {
  "Лидия Парфенова": "/images/trainers/parfenova-glow.webp",
  "Павел Шуваев": "/images/trainers/shuvaev-glow.webp",
  "Александр Лазько": "/images/trainers/lazko-glow.webp",
};

export function Trainers() {
  return (
    <section className="section" aria-labelledby="tr-title" data-block="trainers">
      <div className="wrap">
        <div className="grid gap-6 lg:grid-cols-[1fr_1fr] lg:items-end">
          <h2 id="tr-title" className="h2 max-w-[13ch]">
            С тренером результат быстрее
          </h2>
          <p className="max-w-[40ch] text-muted lg:justify-self-end">{personalText.lead}</p>
        </div>
        <ul className="mt-12 grid gap-4 sm:grid-cols-3 md:mt-16">
          {trainers.map((t) => (
            <li key={t.name}>
              <div className="relative aspect-square overflow-hidden bg-card">
                <Image src={glow[t.name] || t.photo} alt={`${t.name}, ${t.role.toLowerCase()}`} fill sizes="(min-width: 640px) 30vw, 100vw" className="object-cover" />
              </div>
              <p className="mt-4 font-display text-xl font-bold">{t.name}</p>
              <p className="mt-1 text-muted">{t.role}</p>
            </li>
          ))}
        </ul>
        <div className="mt-12 grid gap-8 border-t border-line pt-8 md:grid-cols-[1fr_1fr_auto] md:items-center">
          <p>
            <span className="block font-display text-2xl font-bold">{personalText.price}</span>
            <span className="text-muted">Пакет персональных тренировок</span>
          </p>
          <p className="text-muted">{personalText.bonus}.</p>
          <Cta goal="Персональная тренировка" block="trainers">
            Выбрать тренера
          </Cta>
        </div>
      </div>
    </section>
  );
}

/* ───────── Акции ───────── */

export function Offers() {
  return (
    <section className="section pt-0" aria-labelledby="offers-title" data-block="promo">
      <div className="wrap">
        <h2 id="offers-title" className="h2">
          Акции для новых гостей
        </h2>
        <ul className="mt-10 grid gap-4 md:mt-14 md:grid-cols-3">
          {promos.map((p, i) => (
            <li key={p.slug} className={i === 0 ? "on-accent" : "bg-card"}>
              <Link prefetch={false} href={`/promo/${p.slug}/`} className="group flex h-full flex-col p-7 md:p-8">
                <h3 className="text-[clamp(1.5rem,1.1rem+1.2vw,2.25rem)] leading-[1.05]">{p.title}</h3>
                <p className={`mt-4 flex-1 ${i === 0 ? "" : "text-muted"}`}>{p.short}</p>
                <span className="mt-8 inline-flex items-center gap-3 font-semibold">
                  Условия
                  <Arrows className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ───────── Участники клуба: лента фото ───────── */

const people = ["2", "3", "9", "11", "12", "13", "15", "6"];

export function Community() {
  const row = (hidden: boolean) => (
    <ul aria-hidden={hidden || undefined} className="flex shrink-0 gap-4 pr-4">
      {people.map((n) => (
        <li key={n} className="relative h-[20rem] w-[12rem] shrink-0 overflow-hidden md:h-[26rem] md:w-[15rem]">
          <Image src={`/images/community/${n}.jpg`} alt={hidden ? "" : "Участник клуба Urban210 в зале"} fill sizes="15rem" className="object-cover" />
        </li>
      ))}
    </ul>
  );
  return (
    <section className="section overflow-hidden" aria-labelledby="com-title" data-block="community">
      <div className="wrap flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <h2 id="com-title" className="h2 max-w-[15ch]">
          2000+ хабаровчан уже тренируются с нами
        </h2>
        <a href={site.instagram} target="_blank" rel="noopener nofollow" className="btn-brand light self-start md:self-auto">
          <span>Instagram клуба</span>
          <Arrows />
        </a>
      </div>
      <div className="marquee-wrap mt-12 md:mt-16">
        <div className="marquee" style={{ "--marquee-speed": "70s" } as React.CSSProperties}>
          {row(false)}
          {row(true)}
        </div>
      </div>
    </section>
  );
}
