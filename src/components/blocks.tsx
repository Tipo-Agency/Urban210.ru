import Image from "next/image";
import Link from "next/link";
import { comparison, programs, promos, reviews, trainers, zones } from "@/data/content";
import { site } from "@/data/site";
import { IconArrow, IconStar } from "./icons";

// Крупные блоки главной. Анимации задаются атрибутами data-reveal / data-words / data-count, их подхватывает <Motion />.

const star = (
  <svg viewBox="0 0 24 24" aria-hidden="true" className="h-[0.7em] w-[0.7em] shrink-0 fill-current">
    <path d="M12 0l2.6 8.4H24l-7.6 5.3 2.9 8.6L12 17l-7.3 5.3 2.9-8.6L0 8.4h9.4z" />
  </svg>
);

export function Marquee({ items, tone = "accent", reverse = false, className = "" }: { items: string[]; tone?: "accent" | "ink"; reverse?: boolean; className?: string }) {
  const row = (hidden: boolean) => (
    <ul aria-hidden={hidden || undefined} className="flex shrink-0 items-center">
      {items.map((t, i) => (
        <li key={i} className="flex items-center gap-6 px-6 font-display text-3xl font-bold uppercase leading-none md:gap-10 md:px-10 md:text-5xl">
          {t}
          {star}
        </li>
      ))}
    </ul>
  );
  return (
    <div className={`marquee-wrap overflow-hidden py-4 md:py-6 ${tone === "accent" ? "bg-accent text-[#120804]" : "bg-ink text-bg"} ${className}`}>
      <div className={`marquee ${reverse ? "marquee-rev" : ""}`}>
        {row(false)}
        {row(true)}
      </div>
    </div>
  );
}

// Слоган, который «проявляется» по словам на скролле. Внутри текста маленькие фото-пилюли.
type Part = string | { img: string; alt: string };
export function Manifesto({ parts }: { parts: Part[] }) {
  return (
    <section className="section" aria-label="О клубе" data-block="manifesto">
      <div className="wrap">
        <p className="kicker text-accent">Urban210 · Хабаровск</p>
        <p data-words className="mt-8 max-w-[22ch] font-display text-[clamp(2.4rem,1.2rem+5.4vw,6.75rem)] font-bold uppercase leading-[0.98] tracking-[-0.02em] md:max-w-[19ch]">
          {parts.map((p, i) =>
            typeof p === "string" ? (
              p.split(" ").filter(Boolean).map((w, j) => (
                <span key={`${i}-${j}`} className="w">
                  {w}{" "}
                </span>
              ))
            ) : (
              <span key={i} className="w relative mx-1 inline-block h-[0.78em] w-[1.7em] -translate-y-[0.04em] overflow-hidden rounded-full align-middle">
                <Image src={p.img} alt={p.alt} fill sizes="200px" className="object-cover" />
              </span>
            ),
          )}
        </p>
      </div>
    </section>
  );
}

export function Stats() {
  const items = [
    { value: "0", suffix: " ₽", label: "вступительный взнос" },
    { value: "60", suffix: "+", label: `тренажёров ${site.facts.brands}` },
    { value: "17", suffix: " ч", label: "открыты каждый будний день, с 6:30 до 23:30" },
    { value: "50", suffix: "", label: "мест на бесплатной парковке у входа" },
    { value: "4.7", suffix: "", label: `рейтинг на Яндекс Картах, ${site.rating.text}` },
  ];
  return (
    <section aria-label="Клуб в цифрах" className="border-y border-line" data-block="stats">
      <ul className="wrap grid grid-cols-2 md:grid-cols-5">
        {items.map((s, i) => (
          <li
            key={s.label}
            data-reveal
            style={{ "--d": `${i * 90}ms` } as React.CSSProperties}
            className={`border-line py-8 pr-4 md:py-12 md:pl-6 md:first:pl-0 md:[&:not(:first-child)]:border-l ${i % 2 ? "border-l pl-4" : ""} ${i > 1 ? "border-t md:border-t-0" : ""} ${i === 4 ? "col-span-2 md:col-span-1" : ""} ${i === 4 ? "border-l-0 pl-0 md:pl-6" : ""}`}
          >
            <p className="num text-7xl md:text-8xl">
              <span data-count={s.value}>{s.value.replace(".", ",")}</span>
              <span className="text-accent">{s.suffix}</span>
            </p>
            <p className="mt-3 max-w-[18ch] text-[0.9375rem] leading-snug text-muted">{s.label}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}

// Зоны клуба: полноэкранные карточки, которые складываются стопкой при прокрутке.
export function ZoneStack() {
  return (
    <section className="section pt-0" aria-labelledby="zones-title" data-block="zones">
      <div className="wrap">
        <div className="mb-12 flex flex-col gap-6 md:mb-16 md:flex-row md:items-end md:justify-between">
          <h2 id="zones-title" data-reveal className="text-[length:var(--text-h2)]">
            Четыре зоны.
            <br />
            <span className="outline-ink">Один абонемент.</span>
          </h2>
          <p data-reveal className="max-w-sm text-[length:var(--text-lead)] text-muted">
            {site.facts.area}: железо, кардио, групповые и SPA под одной крышей.
          </p>
        </div>
        <div className="grid gap-6">
          {zones.map((z, i) => (
            <Link
              key={z.id}
              href={z.href}
              style={{ "--i": i } as React.CSSProperties}
              className={`stack-card group relative isolate flex h-[min(78svh,44rem)] min-h-[28rem] flex-col justify-between overflow-hidden rounded-[2rem] p-6 shadow-[0_-20px_60px_-20px_rgba(0,0,0,0.8)] md:p-10 ${z.image ? "bg-card" : "bg-accent text-[#120804]"}`}
              data-block={`zone_${z.id}`}
            >
              {z.image ? (
                <>
                  <Image src={z.image} alt="" fill sizes="(min-width: 1280px) 1240px, 100vw" className="duo -z-20 object-cover group-hover:scale-[1.03]" />
                  <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(11,11,10,0.25)_0%,rgba(11,11,10,0.1)_40%,rgba(11,11,10,0.88)_100%)]" />
                </>
              ) : (
                <span aria-hidden="true" className="mega pointer-events-none absolute -bottom-[0.12em] -right-[0.04em] -z-10 text-[clamp(7rem,30vw,26rem)] text-[#120804]/12 deco" data-text="40–50°" />
              )}
              <div className="flex items-start justify-between">
                <span className={`num text-6xl md:text-8xl ${z.image ? "outline-ink" : "outline"}`}>{String(i + 1).padStart(2, "0")}</span>
                <span className={`grid h-14 w-14 place-items-center rounded-full transition-transform duration-500 group-hover:rotate-[-45deg] md:h-16 md:w-16 ${z.image ? "bg-accent text-[#120804]" : "bg-[#120804] text-accent"}`}>
                  <IconArrow size={26} />
                </span>
              </div>
              <div>
                <h3 className="max-w-[12ch] text-[clamp(3rem,1.5rem+6vw,8rem)] leading-[0.85]">{z.title}</h3>
                <p className={`mt-5 max-w-lg text-[length:var(--text-lead)] ${z.image ? "text-[#ddd6ce]" : "text-[#3a1a0c]"}`}>{z.text}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export function VersusNetwork() {
  return (
    <section className="section relative overflow-hidden" aria-labelledby="cmp-title" data-block="comparison">
      <div aria-hidden="true" className="pointer-events-none absolute -right-[20%] top-1/3 -z-10 h-[40rem] w-[40rem] bg-[radial-gradient(closest-side,rgba(255,90,31,0.18),transparent)]" />
      <div className="wrap">
        <h2 id="cmp-title" data-reveal className="max-w-5xl text-[length:var(--text-h2)]">
          Платите за тренировки,
          <br />
          <span className="text-accent">а не за вход в сеть</span>
        </h2>
        <div className="mt-12 grid gap-px overflow-hidden rounded-[2rem] border border-line bg-line md:mt-16">
          <div className="hidden grid-cols-[1.1fr_1fr_1fr] bg-bg md:grid">
            <span />
            <p className="kicker bg-accent px-8 py-5 text-[#120804]">Urban210</p>
            <p className="kicker px-8 py-5 text-muted">Федеральная сеть</p>
          </div>
          {comparison.rows.map((r, i) => (
            <div key={r[0]} data-reveal style={{ "--d": `${i * 70}ms` } as React.CSSProperties} className="grid grid-cols-2 bg-bg md:grid-cols-[1.1fr_1fr_1fr]">
              <p className="col-span-2 px-5 pt-5 text-sm text-muted md:col-span-1 md:px-8 md:py-7 md:text-base md:text-ink">{r[0]}</p>
              <p className="px-5 pb-5 pt-2 font-display text-2xl font-bold uppercase leading-tight text-accent md:bg-accent/[0.07] md:px-8 md:py-7 md:text-3xl">
                <span className="kicker mb-1 block text-[0.6875rem] text-muted md:hidden">Urban210</span>
                {r[1]}
              </p>
              <p className="px-5 pb-5 pt-2 text-muted md:px-8 md:py-7 md:text-lg">
                <span className="kicker mb-1 block text-[0.6875rem] md:hidden">Сеть</span>
                {r[2]}
              </p>
            </div>
          ))}
        </div>
        <p className="mt-4 text-sm text-muted">{comparison.note}</p>
      </div>
    </section>
  );
}

const programImages = ["/images/group-strength.jpg", "/images/functional.jpg", "/images/group.jpg", "/images/stretching.jpg"];

export function ProgramList() {
  return (
    <ul className="border-t border-line">
      {programs.map((p, i) => (
        <li key={p.group} data-reveal className="group relative border-b border-line">
          <Link href="/group/" className="grid items-center gap-5 py-7 md:grid-cols-[3rem_1fr_auto] md:gap-6 md:py-9">
            <span className="kicker hidden text-muted md:block">{String(i + 1).padStart(2, "0")}</span>
            <div className="flex min-w-0 items-center gap-4">
              <span className="relative h-16 w-16 shrink-0 overflow-hidden rounded-2xl md:hidden">
                <Image src={programImages[i]} alt="" fill sizes="64px" className="duo object-cover" />
              </span>
              <div className="min-w-0">
                <h3 className="text-[clamp(1.875rem,0.6rem+5.6vw,5.75rem)] leading-[0.9] transition-colors duration-300 group-hover:text-accent">{p.group}</h3>
                <p className="mt-2 text-muted md:hidden">{p.items.join(" · ")}</p>
              </div>
            </div>
            <div className="hidden items-center gap-8 md:flex">
              <p className="hidden max-w-[17rem] text-right text-[0.9375rem] text-muted xl:block">
                <span className="block font-medium text-ink">{p.items.join(" · ")}</span>
                {p.text}
              </p>
              <span className="relative h-28 w-40 shrink-0 overflow-hidden rounded-2xl">
                <Image src={programImages[i]} alt="" fill sizes="160px" className="duo object-cover group-hover:scale-110" />
              </span>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}

export function TrainerWall() {
  return (
    <ul className="grid gap-4 md:grid-cols-3">
      {trainers.map((t, i) => (
        <li key={t.name} data-reveal style={{ "--d": `${i * 110}ms` } as React.CSSProperties} className="group relative aspect-[4/5] overflow-hidden rounded-[2rem] bg-card">
          {t.photo && <Image src={t.photo} alt={`${t.name}, тренер Urban210`} fill sizes="(min-width: 768px) 33vw, 100vw" className="duo object-cover group-hover:scale-[1.04]" />}
          <div aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(180deg,transparent_45%,rgba(11,11,10,0.92)_100%)]" />
          <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-6">
            <div>
              <h3 className="text-4xl leading-[0.9]">
                {t.name.split(" ")[0]}
                <br />
                <span className="text-accent">{t.name.split(" ").slice(1).join(" ")}</span>
              </h3>
              <p className="mt-2 text-sm text-[#cfc7be]">{t.role}</p>
            </div>
            <a href="#zayavka" data-lead="Персональные тренировки" data-block="trainer_card" aria-label={`Записаться к тренеру: ${t.name}`} className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-accent text-[#120804] transition-transform duration-500 hover:rotate-[-45deg]">
              <IconArrow />
            </a>
          </div>
        </li>
      ))}
    </ul>
  );
}

const community = ["2", "11", "3", "12", "9", "13", "6", "15"];

export function CommunityReel() {
  const row = (hidden: boolean) => (
    <ul aria-hidden={hidden || undefined} className="flex shrink-0 gap-4 pr-4">
      {community.map((n, i) => (
        <li key={n} className={`relative h-[22rem] w-[12.5rem] shrink-0 overflow-hidden rounded-[1.5rem] md:h-[30rem] md:w-[17rem] ${i % 2 ? "md:translate-y-10" : ""}`}>
          <Image src={`/images/community/${n}.jpg`} alt={hidden ? "" : "Гости клуба Urban210 на тренировке"} fill sizes="(min-width: 768px) 272px, 200px" className="object-cover" />
        </li>
      ))}
    </ul>
  );
  return (
    <div className="marquee-wrap overflow-hidden pb-10">
      <div className="marquee" style={{ "--marquee-speed": "60s" } as React.CSSProperties}>
        {row(false)}
        {row(true)}
      </div>
    </div>
  );
}

export function ReviewRail() {
  return (
    <ul className="-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-4 [scrollbar-width:none] md:mx-0 md:grid md:grid-cols-2 md:overflow-visible md:px-0">
      {reviews.map((r, i) => (
        <li key={r.name} data-reveal style={{ "--d": `${(i % 2) * 100}ms` } as React.CSSProperties} className="flex w-[85vw] max-w-md shrink-0 snap-start flex-col rounded-[2rem] border border-line bg-card p-7 md:w-auto md:max-w-none md:p-10">
          <span aria-hidden="true" className="font-display text-8xl font-bold leading-[0.6] text-accent">“</span>
          <p className="mt-4 flex-1 text-lg leading-relaxed md:text-xl">{r.text}</p>
          <div className="mt-8 flex items-center justify-between gap-4 border-t border-line pt-5">
            <p className="font-semibold">{r.name}</p>
            <p className="flex items-center gap-2 text-sm text-muted">
              <span className="flex text-accent" role="img" aria-label="5 из 5">
                {Array.from({ length: 5 }).map((_, k) => (
                  <IconStar key={k} size={14} />
                ))}
              </span>
              {r.source}
            </p>
          </div>
        </li>
      ))}
    </ul>
  );
}

const promoImages: Record<string, string> = { "1-rubl": "/images/promo/1-rubl.jpg", "trade-in": "/images/promo/trade-in.jpg", "1-plus-1": "/images/promo/1-plus-1.jpg" };

export function PromoCards({ exclude }: { exclude?: string }) {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {promos
        .filter((p) => p.slug !== exclude)
        .map((p, i) => (
          <Link
            key={p.slug}
            href={`/promo/${p.slug}/`}
            data-reveal
            style={{ "--d": `${i * 100}ms` } as React.CSSProperties}
            className="group relative isolate flex min-h-[26rem] flex-col justify-end overflow-hidden rounded-[2rem] bg-[#141210] p-7 md:min-h-[30rem]"
          >
            {/* Справа на баннерах старого сайта предмет (гиря, монета, карта), слева их текст: показываем только предмет */}
            <Image src={promoImages[p.slug]} alt="" fill sizes="(min-width: 768px) 33vw, 100vw" className="-z-20 object-cover object-[88%_center] transition-transform duration-700 group-hover:scale-105" />
            <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(11,11,10,0)_20%,rgba(11,11,10,0.92)_78%)]" />
            <h3 className="text-[clamp(2.25rem,1.5rem+2vw,3.25rem)] leading-[0.92]">{p.title}</h3>
            <p className="mt-3 text-[#cfc7be]">{p.short}</p>
            <span className="mt-6 inline-flex items-center gap-2 font-semibold text-accent">
              Условия <IconArrow className="transition-transform group-hover:translate-x-1" />
            </span>
          </Link>
        ))}
    </div>
  );
}
