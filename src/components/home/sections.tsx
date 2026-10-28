import Image from "next/image";
import Link from "next/link";
import { Cta, Dumbbell } from "@/components/cta";
import { IconStar } from "@/components/icons";
import { LeadForm } from "@/components/lead-form";
import { programs, reviews, trainers, personalText } from "@/data/content";
import { perDay, plans, trial } from "@/data/pricing";
import { site } from "@/data/site";
import { HeroVideo } from "./hero-video";
import { NeonCard } from "./neon-card";
import { StoryVideo } from "./story-video";

const minDay = perDay(plans[0].month, 30);

// Двойная стрелка из логотипа клуба
export function Chevrons({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 26 20" aria-hidden="true" className={className} fill="currentColor">
      <path d="M0 0h5.6l8 10-8 10H0l8-10zM12 0h5.6l8 10-8 10H12l8-10z" />
    </svg>
  );
}

export function BrandLink({ href, children, light = false, className = "" }: { href: string; children: React.ReactNode; light?: boolean; className?: string }) {
  return (
    <a href={href} className={`btn-brand ${light ? "light" : ""} ${className}`}>
      <span className="ico">
        <Dumbbell />
      </span>
      <span>{children}</span>
    </a>
  );
}

export function BrandMarquee({ text, light = false }: { text: string; light?: boolean }) {
  const row = (hidden: boolean) => (
    <ul aria-hidden={hidden || undefined} className="flex shrink-0 items-center">
      {Array.from({ length: 6 }).map((_, i) => (
        <li key={i} className="flex items-center gap-10 px-5 font-display text-xl font-semibold uppercase tracking-wide md:text-2xl">
          {text}
          <span className="text-accent">/</span>
        </li>
      ))}
    </ul>
  );
  return (
    <div className={`marquee-wrap overflow-hidden rounded-full py-3.5 ${light ? "bg-white text-[#101010]" : "border border-line bg-[#171717]"}`}>
      <div className="marquee" style={{ "--marquee-speed": "40s" } as React.CSSProperties}>
        {row(false)}
        {row(true)}
      </div>
    </div>
  );
}

function Title({ id, children, className = "" }: { id: string; children: React.ReactNode; className?: string }) {
  return (
    <h2 id={id} data-g="rise" className={`text-center text-[clamp(2.25rem,1.3rem+3.6vw,4.75rem)] leading-[0.98] ${className}`}>
      {children}
    </h2>
  );
}

/* ───────── Первый экран ───────── */

export function Hero() {
  return (
    <section className="relative isolate flex min-h-[max(100svh,44rem)] items-end overflow-hidden" data-block="hero">
      <picture>
        <source media="(max-width: 767px)" srcSet="/video/hero-mobile-poster.jpg" />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/video/hero-poster.jpg" alt="" fetchPriority="high" className="absolute inset-0 -z-30 h-full w-full object-cover" />
      </picture>
      <HeroVideo />
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(16,16,16,0.92)_0%,rgba(16,16,16,0.55)_50%,rgba(16,16,16,0.2)_100%),linear-gradient(180deg,rgba(16,16,16,0.4)_0%,transparent_30%,transparent_60%,#101010_100%)]" />

      <div className="wrap relative grid items-end gap-10 pb-10 pt-32 md:pb-14 lg:grid-cols-[1.25fr_0.75fr]">
        <div>
          <h1 className="text-[clamp(3.25rem,1.6rem+6.4vw,8.5rem)] leading-[0.88]">
            <span className="mb-6 block font-sans text-sm font-medium normal-case tracking-normal text-[#d4d4d4] md:text-base">
              <span className="bracket">Фитнес-клуб Urban210 в Хабаровске</span>
            </span>
            Стильный клуб <span className="text-accent">для сильных</span>
          </h1>
          <p className="rise rise-2 mt-7 max-w-xl text-base leading-relaxed text-[#e5e5e5] md:text-lg">
            Безлимит от <span className="tag-accent font-semibold">{minDay} ₽/день</span>. Тренируйся столько, сколько хочешь. Без вступительного взноса.
          </p>
          <div className="rise rise-3 mt-9 flex flex-col gap-3 sm:flex-row">
            <Cta goal={trial.title} block="hero" className="sm:min-w-72">
              Пробный день за 1 ₽
            </Cta>
            <BrandLink href="#tarify" light className="sm:min-w-60">
              Выбрать подписку
            </BrandLink>
          </div>
        </div>
        <div className="rise rise-4 relative mx-auto w-[78%] max-w-[30rem] lg:mx-0 lg:w-full lg:justify-self-end">
          <div aria-hidden="true" className="absolute inset-[-20%] -z-10 bg-[radial-gradient(closest-side,rgba(255,87,34,0.45),transparent)]" />
          <NeonCard src="/images/brand/card-orange.webp" alt="Клубная карта Urban210" priority sizes="(min-width: 1024px) 30rem, 78vw" className="-rotate-6" />
        </div>
      </div>
    </section>
  );
}

export function HeroFacts() {
  const items = [
    `Без очередей: огромная кардиозона и ${site.facts.machines}`,
    `Центр ЖД района, бесплатная парковка на 50 мест`,
    `${site.rating.value.toString().replace(".", ",")} на Яндекс Картах, ${site.rating.text}`,
  ];
  return (
    <section aria-label="Коротко о клубе" className="wrap">
      <ul className="grid overflow-hidden rounded-[2rem] border border-line bg-[#171717]/80 md:grid-cols-3">
        {items.map((t, i) => (
          <li key={t} className={`flex items-center gap-4 px-6 py-5 md:px-8 md:py-6 ${i ? "border-t border-line md:border-l md:border-t-0" : ""}`}>
            <Chevrons className="h-5 w-auto shrink-0 text-accent" />
            <span className="text-[0.9375rem] leading-snug">{t}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

/* ───────── Бенто: клуб изнутри ───────── */

function Starburst() {
  const n = 18;
  const pts = Array.from({ length: n * 2 }, (_, i) => {
    const r = i % 2 ? 41 : 50;
    const a = (Math.PI * i) / n;
    return `${(50 + r * Math.sin(a)).toFixed(2)},${(50 - r * Math.cos(a)).toFixed(2)}`;
  }).join(" ");
  return (
    <div className="relative grid aspect-square w-full max-w-[17rem] place-items-center">
      <svg viewBox="0 0 100 100" aria-hidden="true" className="spin-slow absolute inset-0 h-full w-full">
        <polygon points={pts} fill="var(--color-accent)" />
      </svg>
      <div className="relative -rotate-12 text-center text-[#101010]">
        <svg viewBox="0 0 24 24" aria-hidden="true" className="mx-auto h-9 w-9" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21z" />
          <circle cx="12" cy="9.5" r="2.5" />
        </svg>
        <p className="mt-1 font-display text-3xl font-bold leading-none">URBAN210</p>
        <p className="mx-auto mt-1.5 max-w-[11rem] text-xs font-medium leading-snug">
          г. Хабаровск,
          <br />
          {site.address.short}
        </p>
      </div>
    </div>
  );
}

function Photo({ src, alt, className = "", sizes = "(min-width: 1024px) 25vw, 100vw" }: { src: string; alt: string; className?: string; sizes?: string }) {
  return (
    <div data-g="clip" className={`group overflow-hidden rounded-[2rem] bg-[#171717] ${className.includes("absolute") ? "" : "relative"} ${className}`}>
      <Image src={src} alt={alt} fill sizes={sizes} className="object-cover transition-[filter,transform] duration-700 [filter:grayscale(1)_contrast(1.05)] group-hover:scale-105 group-hover:[filter:grayscale(0)]" />
    </div>
  );
}

export function Bento() {
  return (
    <section className="section" aria-labelledby="club-title" data-block="club">
      <div className="wrap">
        <Title id="club-title" className="mx-auto max-w-5xl">
          Urban210: место, где ты <span className="text-accent">становишься сильнее</span> каждый день
        </Title>

        <div className="mt-12 grid auto-rows-[minmax(14rem,auto)] gap-3 md:mt-16 md:grid-cols-2 md:gap-4 lg:grid-cols-4 lg:grid-rows-[repeat(4,15.5rem)]">
          {/* Зал + площадь */}
          <div className="relative min-h-[26rem] md:col-span-2 lg:row-span-2">
            <Photo src="/images/zal.jpg" alt="Тренажёрный зал Urban210 с панорамными окнами" className="absolute inset-0" sizes="(min-width: 1024px) 50vw, 100vw" />
            <div data-g="rise" className="panel absolute left-3 top-3 max-w-[19rem] bg-[#101010]/90 p-6 backdrop-blur md:left-4 md:top-4">
              <p className="font-display text-3xl font-semibold uppercase leading-none">
                <span className="text-accent">{site.facts.area.replace("более ", "")}</span>
                <br />
                свободного пространства
              </p>
              <p className="mt-3 text-sm leading-relaxed text-muted">Тренируешься без очередей и компромиссов. Здесь ты не ждёшь, ты делаешь.</p>
            </div>
          </div>

          <div data-g="rise" className="grid place-items-center py-4">
            <Starburst />
          </div>
          <Photo src="/images/free-weights.jpg" alt="Гантели Urban210" className="min-h-[14rem]" />
          <Photo src="/images/cardio.jpg" alt="Кардиозона с беговыми дорожками" className="min-h-[14rem]" />
          <div data-g="rise" className="flex flex-col justify-center p-2 md:p-4">
            <p className="font-display text-3xl font-semibold uppercase leading-[1.05]">
              <span className="text-accent">Беговые дорожки</span>
              <br />
              Technogym Skillrun
            </p>
            <p className="mt-3 text-sm leading-relaxed text-muted">Для выносливости и быстрого прогресса: ходьба в наклоне, бег, интервалы. Всё в одном тренажёре.</p>
          </div>

          {/* SPA */}
          <div data-g="rise" className="panel flex flex-col p-7 lg:row-span-2">
            <p className="font-display text-3xl font-semibold uppercase leading-none">
              <span className="text-accent">SPA-зона</span> для восстановления
            </p>
            <ul className="mt-6 grid gap-5 text-sm">
              {[
                ["Финская сауна", "Сухой жар расслабляет мышцы после силовой"],
                ["Хаммам", "40–50 °C, влажный пар для дыхания и кожи"],
                ["Релакс-зона", "Массажные кресла и спокойное восстановление"],
              ].map(([t, d]) => (
                <li key={t} className="flex gap-3">
                  <span className="font-display text-xl leading-none text-accent">+</span>
                  <span>
                    <b className="font-medium">{t}</b>
                    <span className="mt-1 block text-muted">{d}</span>
                  </span>
                </li>
              ))}
            </ul>
            <Link href="/spa/" className="mt-auto rounded-full border border-line px-4 py-3 text-center text-xs text-muted transition-colors hover:border-white hover:text-white">
              Входит в тариф «Всё включено»
            </Link>
          </div>
          <Photo src="/images/machines.jpg" alt="Силовой тренажёр Technogym" className="min-h-[14rem]" />

          {/* Видео из сторис */}
          <div data-g="clip" className="relative min-h-[30rem] overflow-hidden rounded-[2rem] bg-[#171717] lg:row-span-2 lg:min-h-0">
            <StoryVideo className="absolute inset-0 h-full w-full object-cover" />
          </div>

          {/* Комьюнити */}
          <div data-g="rise" className="panel-light relative flex min-h-[26rem] flex-col overflow-hidden p-7 lg:row-span-2 lg:min-h-0">
            <div aria-hidden="true" className="-mx-7 -mt-7 flex h-44 items-center justify-center overflow-hidden bg-accent">
              <Chevrons className="h-56 w-auto translate-x-6 text-white" />
            </div>
            <p className="mt-6 font-display text-3xl font-semibold uppercase leading-none">
              <span className="text-accent">Стань частью</span>
              <br />
              Urban-комьюнити
            </p>
            <p className="mt-3 text-sm leading-relaxed text-[#525252]">Тело не скажет «спасибо» за ещё один пропущенный понедельник. Начать проще, чем кажется.</p>
            <BrandLink href="#tarify" className="mt-auto self-start pt-1.5">
              Выбрать подписку
            </BrandLink>
          </div>

          <div data-g="rise" className="panel flex flex-col justify-end p-7">
            <p className="font-display text-6xl font-semibold leading-none text-accent">60+</p>
            <p className="mt-2 font-display text-2xl font-semibold uppercase leading-none">современных тренажёров</p>
            <p className="mt-3 text-sm leading-relaxed text-muted">{site.facts.brands}: подходят новичкам и опытным спортсменам.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ───────── Пробный день ───────── */

export function TrialBlock() {
  return (
    <section className="wrap" aria-labelledby="trial-title" data-block="trial">
      <div data-g="rise" className="relative isolate grid overflow-hidden rounded-[2.5rem] border border-line bg-[#171717] lg:grid-cols-[1fr_1fr]">
        <div className="relative z-10 p-7 md:p-14">
          <h2 id="trial-title" className="text-[clamp(2.5rem,1.5rem+3.6vw,4.75rem)] leading-[0.95]">
            <span className="text-accent">Готовы начать</span> тренироваться?
          </h2>
          <p className="mt-5 max-w-md text-muted">Тестовый день за 1 ₽, чтобы познакомиться с клубом и попробовать тренировки до покупки подписки.</p>
          <div className="mt-8 max-w-md">
            <LeadForm goal={trial.title} block="trial" formId="trial" simple submitLabel="Хочу начать" />
          </div>
          <p className="mt-4 text-xs text-muted">Акция для новых гостей клуба.</p>
        </div>
        <div className="relative min-h-[18rem] lg:min-h-0">
          <Image src="/images/brand/promo-bg-1.webp" alt="" fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover object-[85%_bottom]" />
          <p aria-hidden="true" className="absolute left-6 top-6 font-display text-[clamp(5rem,12vw,11rem)] font-bold leading-none text-white/[0.06] lg:left-auto lg:right-10">
            1 ₽
          </p>
        </div>
      </div>
    </section>
  );
}

/* ───────── 2000+ ───────── */

const people = ["2", "11", "3", "12", "9", "13", "6", "15"];

export function Why2000() {
  const cols = [people.slice(0, 2), people.slice(2, 4), people.slice(4, 6), people.slice(6, 8)];
  const speeds = [18, -14, 22, -20];
  return (
    <section className="relative isolate overflow-hidden py-24 md:py-32" aria-labelledby="why-title" data-block="why">
      <div aria-hidden="true" className="absolute inset-0 -z-10 grid grid-cols-2 gap-3 px-3 opacity-60 md:grid-cols-4 md:gap-5 md:px-5">
        {cols.map((c, i) => (
          <div key={i} data-speed={speeds[i]} className={`flex flex-col gap-3 md:gap-5 ${i > 1 ? "hidden md:flex" : ""} ${i % 2 ? "pt-24" : ""}`}>
            {c.map((n) => (
              <div key={n} className="relative aspect-[9/14] overflow-hidden rounded-[1.75rem]">
                <Image src={`/images/community/${n}.jpg`} alt="" fill sizes="(min-width: 768px) 25vw, 50vw" className="object-cover" />
              </div>
            ))}
          </div>
        ))}
      </div>
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,rgba(16,16,16,0.92)_0%,rgba(16,16,16,0.75)_45%,rgba(16,16,16,0.35)_100%)]" />

      <div className="wrap flex min-h-[34rem] flex-col items-center justify-center text-center">
        <h2 id="why-title" className="font-display uppercase">
          <span className="block text-3xl font-medium md:text-5xl">Почему</span>
          <span className="block font-sans text-[clamp(6rem,3rem+14vw,15rem)] font-semibold leading-[0.9] tracking-[-0.06em]">
            <span data-g="count" data-to="2000">2000</span>
            <span className="text-accent">+</span>
          </span>
          <span className="block text-3xl font-medium leading-tight md:text-5xl">
            хабаровчан выбрали
            <br />
            Urban210?
          </span>
        </h2>
        <p data-g="rise" className="mt-10 max-w-2xl text-[0.9375rem] leading-relaxed text-[#d4d4d4]">
          Мы не берём денег за право просто войти в зал. Нет вступительных взносов, скрытых регистраций и странных сборов. Только честная оплата подписки, и ты стартуешь в тот же день.
        </p>
      </div>
    </section>
  );
}

/* ───────── Отзывы и факты ───────── */

const facts = [
  { pct: 65, title: "Просторный зал", quote: "Огромный зал, высокие потолки, нет тесноты" },
  { pct: 58, title: "Качество оборудования", quote: "Тренажёры Technogym, всегда свободны" },
  { pct: 48, title: "Цена", quote: "Дешевле разовых, безлимит топ" },
  { pct: 48, title: "Тренеры", quote: "Индивидуальный подход, техника, план питания" },
  { pct: 42, title: "Чистота и комфорт", quote: "Чисто, приятная атмосфера" },
];

export function ReviewsFacts() {
  return (
    <section className="section" aria-labelledby="rev-title" data-block="reviews">
      <div className="wrap">
        <Title id="rev-title" className="mx-auto max-w-5xl">
          Здесь не просто качают мышцы, <span className="text-accent">здесь меняют образ жизни</span>
        </Title>
        <div className="mt-12 grid gap-4 md:mt-16 lg:grid-cols-[0.95fr_1.05fr]">
          <div data-g="rise" className="panel p-6 md:p-9">
            <p className="text-[0.9375rem]">Что чаще всего хвалят в {site.rating.text}:</p>
            <ul data-g="bars" className="mt-7 grid gap-6">
              {facts.map((f, i) => (
                <li key={f.title}>
                  <div className="flex items-baseline justify-between gap-4">
                    <p className="font-display text-xl font-semibold uppercase">
                      <span className="mr-3 text-sm text-muted">0{i + 1}</span>
                      {f.title}
                    </p>
                    <p className="font-display text-2xl font-semibold text-accent">{f.pct}%</p>
                  </div>
                  <div className="mt-2 h-2 overflow-hidden rounded-full bg-white/10">
                    <div data-bar style={{ width: `${f.pct}%` }} className="h-full rounded-full bg-[linear-gradient(90deg,#ff5722,#ffb74d)]" />
                  </div>
                  <p className="mt-2 text-xs text-muted">«{f.quote}»</p>
                </li>
              ))}
            </ul>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {reviews.map((r) => (
              <article key={r.name} data-g="rise" className="panel flex flex-col p-6">
                <div className="flex items-center justify-between gap-3">
                  <span className="flex text-[#ffc107]" role="img" aria-label="5 из 5">
                    {Array.from({ length: 5 }).map((_, k) => (
                      <IconStar key={k} size={14} />
                    ))}
                  </span>
                  <span className="text-xs text-muted">{r.source}</span>
                </div>
                <p className="mt-4 flex-1 text-sm leading-relaxed text-[#d4d4d4]">{r.text}</p>
                <p className="mt-5 font-display text-lg font-semibold uppercase">{r.name}</p>
              </article>
            ))}
          </div>
        </div>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <a href={site.maps.yandexReviews} target="_blank" rel="noopener" className="rounded-full border border-line px-5 py-3 text-sm transition-colors hover:border-white">
            Все отзывы на Яндекс Картах
          </a>
          <a href={site.maps.twoGis} target="_blank" rel="noopener" className="rounded-full border border-line px-5 py-3 text-sm transition-colors hover:border-white">
            Отзывы в 2ГИС
          </a>
        </div>
      </div>
    </section>
  );
}

/* ───────── Групповые ───────── */

const programMeta = [
  { img: "/images/group-strength.jpg", tags: ["Body", "Pump", "ABS"], text: "Работаем до «приятного жжения». Техника под контролем, результат в зеркале." },
  { img: "/images/functional.jpg", tags: ["Кроссфит", "TRX"], text: "Тренировка, после которой понимаешь: могу больше, чем думал." },
  { img: "/images/group.jpg", tags: ["Зумба", "Стрип"], text: "Кардио, которое ощущается как вечеринка. Двигайся под бит, будто никто не смотрит." },
  { img: "/images/stretching.jpg", tags: ["Пилатес", "Растяжка"], text: "Чтобы ничего не тянуло, спалось лучше и тренировки шли легче." },
];

export function GroupPrograms() {
  return (
    <section className="section relative" aria-labelledby="group-title" data-block="group">
      <div aria-hidden="true" className="absolute inset-x-0 top-0 -z-10 h-[30rem] bg-[radial-gradient(ellipse_at_top,rgba(255,87,34,0.18),transparent_65%)]" />
      <div className="wrap">
        <Title id="group-title">
          <span className="text-accent">Групповые программы:</span>
          <br />
          становимся сильнее вместе
        </Title>
        <div className="mt-12 grid gap-4 sm:grid-cols-2 md:mt-16 lg:grid-cols-4">
          {programs.map((p, i) => (
            <Link key={p.group} href="/group/" data-g="rise" className="group flex flex-col gap-3">
              <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem] bg-[#171717]">
                <Image src={programMeta[i].img} alt={`${p.group} тренировки в Urban210`} fill sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
              </div>
              <div className="panel flex-1 p-6 transition-colors duration-300 group-hover:border-accent">
                <h3 className="text-3xl">{p.group === "Танцевальные" ? "Танцы" : p.group}</h3>
                <p className="mt-2 flex flex-wrap gap-x-2 text-sm text-accent">
                  {programMeta[i].tags.map((t) => (
                    <span key={t} className="bracket">
                      {t}
                    </span>
                  ))}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-muted">{programMeta[i].text}</p>
              </div>
            </Link>
          ))}
        </div>
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

export function TrainersBlock() {
  return (
    <section className="section" aria-labelledby="tr-title" data-block="personal">
      <div className="wrap">
        <Title id="tr-title" className="mx-auto max-w-5xl">
          <span className="text-accent">Результат быстрее,</span> когда рядом тренер
        </Title>
        <div className="mt-12 grid gap-4 md:mt-16 md:grid-cols-3">
          {trainers.map((t) => (
            <article key={t.name} data-g="rise" className="group relative overflow-hidden rounded-[2rem] bg-[#171717]">
              <div className="relative aspect-square">
                <Image src={glow[t.name]} alt={`${t.name}, тренер Urban210`} fill sizes="(min-width: 768px) 33vw, 100vw" className="object-cover transition-transform duration-700 group-hover:scale-[1.04]" />
              </div>
              <div className="flex items-end justify-between gap-4 p-6">
                <div>
                  <h3 className="text-3xl">{t.name}</h3>
                  <p className="mt-1 text-sm text-muted">{t.role}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
        <div data-g="rise" className="mt-4 grid gap-6 rounded-[2rem] border border-line bg-[#171717] p-7 md:grid-cols-[1fr_auto] md:items-center md:p-10">
          <ul className="grid gap-5 md:grid-cols-2 md:gap-10">
            <li className="flex gap-4">
              <span className="font-display text-2xl leading-none text-accent">+</span>
              <span>
                <b className="font-display text-2xl font-semibold uppercase">{personalText.price}</b>
                <span className="mt-1 block text-sm text-muted">1 530 ₽ за занятие. Выгодно, чтобы стартовать и закрепить привычку.</span>
              </span>
            </li>
            <li className="flex gap-4">
              <span className="font-display text-2xl leading-none text-accent">+</span>
              <span>
                <b className="font-display text-2xl font-semibold uppercase">Бонус новым клиентам</b>
                <span className="mt-1 block text-sm text-muted">{personalText.bonus}.</span>
              </span>
            </li>
          </ul>
          <Cta goal="Персональные тренировки" block="personal">
            Выбрать тренера
          </Cta>
        </div>
      </div>
    </section>
  );
}

/* ───────── Вариант А / Б ───────── */

export function ChoiceAB() {
  const a = ["Спина болит дальше, вес остаётся", "Энергия не растёт", "Через год всё то же самое", "Когда-нибудь подумаешь: почему я не начал раньше?"];
  const b = ["Неделя 1: спина крепче", "Недели 3–4: видны первые результаты", "Месяц 1: изменения видны в зеркале", "Месяц 3: окружающие спрашивают, что ты делаешь", "Месяц 6: совсем другой человек"];
  return (
    <section className="section overflow-hidden" aria-labelledby="ab-title" data-block="choice">
      <div className="wrap">
        <Title id="ab-title" className="mx-auto max-w-5xl">
          Если ты читаешь это, <span className="text-accent">ты уже готов к изменениям.</span> Осталось одно: начать
        </Title>
        <div data-g="ab" className="mt-12 grid gap-4 md:mt-16 md:grid-cols-2">
          <div className="panel p-7 md:p-10">
            <p className="font-display text-2xl font-medium uppercase text-muted">Вариант А</p>
            <p className="mt-1 font-display text-3xl font-semibold uppercase">Закрыть сайт и забыть</p>
            <ul className="mt-7 grid gap-3.5 text-sm text-muted">
              {a.map((t) => (
                <li key={t} className="flex gap-3">
                  <span aria-hidden="true">—</span>
                  {t}
                </li>
              ))}
            </ul>
          </div>
          <div className="panel-light relative overflow-hidden p-7 md:p-10">
            <div aria-hidden="true" className="absolute -right-16 -top-16 h-56 w-56 bg-[radial-gradient(closest-side,rgba(255,87,34,0.35),transparent)]" />
            <p className="font-display text-2xl font-medium uppercase text-accent">Вариант Б</p>
            <p className="mt-1 font-display text-3xl font-semibold uppercase">Записаться и начать сейчас</p>
            <ul className="mt-7 grid gap-3.5 text-sm">
              {b.map((t) => (
                <li key={t} className="flex gap-3">
                  <span aria-hidden="true" className="font-semibold text-accent">+</span>
                  {t}
                </li>
              ))}
            </ul>
            <Cta goal={trial.title} block="choice_b" className="mt-8">
              Выбираю вариант Б
            </Cta>
          </div>
        </div>
        <div className="mt-10">
          <BrandMarquee text="Ты на верном пути" />
        </div>
      </div>
    </section>
  );
}
