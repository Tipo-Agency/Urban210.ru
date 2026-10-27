import Image from "next/image";
import Link from "next/link";
import { comparison, programs, promos, reviews, zones } from "@/data/content";
import { site } from "@/data/site";
import { IconArrow, IconStar } from "./icons";

export function SectionHead({ title, text, id, action }: { title: string; text?: string; id: string; action?: React.ReactNode }) {
  return (
    <div className="mb-10 flex flex-col gap-6 md:mb-14 md:flex-row md:items-end md:justify-between">
      <div className="max-w-3xl">
        <h2 id={id} className="text-[length:var(--text-h2)]">
          {title}
        </h2>
        {text && <p className="text-muted mt-4 max-w-2xl text-[length:var(--text-lead)]">{text}</p>}
      </div>
      {action}
    </div>
  );
}

export function RatingBadge({ className = "" }: { className?: string }) {
  return (
    <a href={site.maps.yandexReviews} target="_blank" rel="noopener" className={`inline-flex items-center gap-3 ${className}`} data-block="rating">
      <span className="flex text-accent" aria-hidden="true">
        {Array.from({ length: 5 }).map((_, i) => (
          <IconStar key={i} />
        ))}
      </span>
      <span>
        <b className="font-semibold">{site.rating.value.toString().replace(".", ",")}</b> · {site.rating.text} на Яндекс Картах и 2ГИС
      </span>
    </a>
  );
}

export function Zones() {
  return (
    <section className="section" aria-labelledby="zones-title" data-block="zones">
      <div className="wrap">
        <SectionHead id="zones-title" title="Всё для тренировки в одном клубе" text={`${site.facts.area}: зал, кардиозона, студия групповых программ и SPA. Не нужно выбирать между железом и сауной.`} />
        <div className="grid gap-4 md:grid-cols-6 md:grid-rows-[20rem_20rem]">
          {zones.map((z, i) => (
            <Link
              key={z.id}
              href={z.href}
              className={`group relative min-h-[18rem] overflow-hidden rounded-[var(--radius-card)] bg-card ${
                i === 0 ? "md:col-span-4 md:row-span-1" : i === 1 ? "md:col-span-2" : i === 2 ? "md:col-span-3" : "md:col-span-3"
              }`}
            >
              {z.image ? (
                <>
                  <Image src={z.image} alt="" fill sizes="(min-width: 768px) 60vw, 100vw" className="object-cover transition-transform duration-500 group-hover:scale-[1.03]" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
                </>
              ) : (
                <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(120%_90%_at_85%_10%,#7a2b12_0%,#2a1710_45%,#161311_100%)]">
                  <span className="absolute right-6 top-4 whitespace-nowrap font-display text-[5.5rem] font-semibold leading-none text-accent/25 md:text-[9rem]">40–50°</span>
                </div>
              )}
              <div className="absolute inset-x-0 bottom-0 p-6">
                <h3 className="flex items-center gap-3 text-[length:var(--text-h3)]">
                  {z.title}
                  <IconArrow className="transition-transform group-hover:translate-x-1" />
                </h3>
                <p className="mt-2 max-w-md text-[0.9375rem] text-[#d9d2ca]">{z.text}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Comparison() {
  return (
    <section className="section" aria-labelledby="cmp-title" data-block="comparison">
      <div className="wrap grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        <div>
          <h2 id="cmp-title" className="text-[length:var(--text-h2)]">
            Платите за тренировки, а не за вход в сеть
          </h2>
          <p className="text-muted mt-5 max-w-md text-[length:var(--text-lead)]">
            Федеральные сети берут вступительный взнос и прячут сауну в дорогие тарифы. У нас цена на сайте и есть итоговая цена.
          </p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left text-[0.9375rem] md:text-base">
            <thead>
              <tr className="border-b border-line">
                {comparison.head.map((h, i) => (
                  <th key={i} scope="col" className={`py-4 pr-4 font-medium ${i === 1 ? "text-accent" : "text-muted"}`}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {comparison.rows.map((r) => (
                <tr key={r[0]} className="border-b border-line">
                  <th scope="row" className="py-4 pr-4 font-normal text-muted">
                    {r[0]}
                  </th>
                  <td className="py-4 pr-4 font-semibold">{r[1]}</td>
                  <td className="py-4 text-muted">{r[2]}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="mt-4 text-sm text-muted">{comparison.note}</p>
        </div>
      </div>
    </section>
  );
}

export function Reviews() {
  return (
    <section className="section border-t border-line" aria-labelledby="reviews-title" data-block="reviews">
      <div className="wrap">
        <SectionHead
          id="reviews-title"
          title="Что говорят те, кто уже ходит"
          text="Отзывы с Яндекс Карт и 2ГИС. Хорошие и с замечаниями: по ним мы и меняемся."
          action={<RatingBadge className="shrink-0 rounded-full border border-line px-5 py-3 hover:border-ink" />}
        />
        {reviews.length > 0 && (
          <ul className="grid gap-4 md:grid-cols-2">
            {reviews.map((r) => (
              <li key={r.name} className="flex flex-col rounded-[var(--radius-card)] border border-line bg-card p-6">
                <p className="flex-1 leading-relaxed">«{r.text}»</p>
                <p className="mt-5 text-sm">
                  <b className="font-semibold">{r.name}</b> <span className="text-muted">· {r.source}</span>
                </p>
              </li>
            ))}
          </ul>
        )}
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
  );
}

export function Programs({ withLink = true }: { withLink?: boolean }) {
  return (
    <div className="grid gap-px overflow-hidden rounded-[var(--radius-card)] border border-line bg-line md:grid-cols-2">
      {programs.map((p) => (
        <div key={p.group} className="bg-bg p-6 md:p-8">
          <h3 className="text-[length:var(--text-h3)]">{p.group}</h3>
          <p className="mt-2 font-medium text-accent">{p.items.join(" · ")}</p>
          <p className="text-muted mt-3">{p.text}</p>
        </div>
      ))}
      {withLink && null}
    </div>
  );
}

export function Promos({ exclude }: { exclude?: string }) {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {promos
        .filter((p) => p.slug !== exclude)
        .map((p, i) => (
          <Link
            key={p.slug}
            href={`/promo/${p.slug}/`}
            className={`group flex min-h-[15rem] flex-col rounded-[var(--radius-card)] p-6 md:p-8 ${i === 0 && !exclude ? "bg-accent text-[#140d09]" : "border border-line bg-card"}`}
          >
            <h3 className="text-[length:var(--text-h3)]">{p.title}</h3>
            <p className={`mt-3 ${i === 0 && !exclude ? "text-[#2a1208]" : "text-muted"}`}>{p.short}</p>
            <span className="mt-auto inline-flex items-center gap-2 pt-6 font-medium">
              Условия <IconArrow className="transition-transform group-hover:translate-x-1" />
            </span>
          </Link>
        ))}
    </div>
  );
}

export function PhotoBand({ src, alt, priority = false }: { src: string; alt: string; priority?: boolean }) {
  return (
    <div className="relative aspect-[16/10] overflow-hidden rounded-[var(--radius-card)] bg-card md:aspect-[16/9]">
      <Image src={src} alt={alt} fill priority={priority} sizes="(min-width: 1280px) 1200px, 100vw" className="object-cover" />
    </div>
  );
}
