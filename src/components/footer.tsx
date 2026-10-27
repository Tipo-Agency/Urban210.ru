import Link from "next/link";
import { nav, site, telegramLink, whatsappLink } from "@/data/site";
import { IconInstagram, IconTelegram, IconWhatsApp } from "./icons";
import { Logo } from "./logo";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-line pb-28 pt-16 md:pb-12" data-block="footer">
      <div className="wrap grid gap-12 md:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
        <div>
          <Logo />
          <p className="mt-4 max-w-xs text-muted">Фитнес-клуб в Железнодорожном районе Хабаровска. Без вступительных взносов.</p>
          <div className="mt-6 flex gap-2">
            <a href={whatsappLink("Здравствуйте!")} target="_blank" rel="noopener" aria-label="WhatsApp" className="grid h-11 w-11 place-items-center rounded-full border border-line hover:border-ink">
              <IconWhatsApp />
            </a>
            <a href={telegramLink("site_footer")} target="_blank" rel="noopener" aria-label="Telegram-бот клуба" className="grid h-11 w-11 place-items-center rounded-full border border-line hover:border-ink">
              <IconTelegram />
            </a>
            <a href={site.instagram} target="_blank" rel="noopener nofollow" aria-label="Instagram" className="grid h-11 w-11 place-items-center rounded-full border border-line hover:border-ink">
              <IconInstagram />
            </a>
          </div>
        </div>

        <nav aria-label="Разделы">
          <p className="mb-4 font-medium">Клуб</p>
          <ul className="grid gap-2.5 text-muted">
            {nav.map((n) => (
              <li key={n.href}>
                <Link href={n.href} className="hover:text-ink">
                  {n.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/personal/" className="hover:text-ink">
                Персональные тренировки
              </Link>
            </li>
            <li>
              <Link href="/virtual-tour/" className="hover:text-ink">
                3D-тур по клубу
              </Link>
            </li>
            <li>
              <Link href="/blog/" className="hover:text-ink">
                Блог
              </Link>
            </li>
          </ul>
        </nav>

        <div>
          <p className="mb-4 font-medium">Режим работы</p>
          <ul className="grid gap-2.5 text-muted">
            {site.hours.map((h) => (
              <li key={h.days}>
                {h.days}: <span className="text-ink">{h.time}</span>
              </li>
            ))}
          </ul>
          <p className="mb-4 mt-8 font-medium">Документы</p>
          <ul className="grid gap-2.5 text-muted">
            <li><Link href="/oferta/" className="hover:text-ink">Договор-оферта</Link></li>
            <li><Link href="/rules/" className="hover:text-ink">Правила клуба</Link></li>
            <li><Link href="/policy/" className="hover:text-ink">Политика конфиденциальности</Link></li>
          </ul>
        </div>

        <address className="not-italic">
          <p className="mb-4 font-medium">Контакты</p>
          <a href={site.phone.href} className="block text-xl font-medium hover:text-accent">
            {site.phone.display}
          </a>
          <a href={`mailto:${site.email}`} className="mt-2 block text-muted hover:text-ink">
            {site.email}
          </a>
          <p className="mt-4 text-muted">
            {site.address.locality}, {site.address.short}
          </p>
          <a href={site.maps.yandex} target="_blank" rel="noopener" className="mt-2 inline-block text-accent underline underline-offset-4">
            Построить маршрут
          </a>
        </address>
      </div>

      <div className="wrap mt-14 flex flex-col gap-3 border-t border-line pt-6 text-sm text-muted md:flex-row md:items-center md:justify-between">
        <p>
          © {year} {site.legal.name}, ИНН {site.legal.inn}, ОГРН {site.legal.ogrn}
        </p>
        <a href="https://tipa.uz/ru/services/web" target="_blank" rel="noopener" className="hover:text-ink">
          Разработка сайта — TIPA
        </a>
      </div>
    </footer>
  );
}
