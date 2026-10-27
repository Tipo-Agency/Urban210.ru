import Link from "next/link";
import { nav, site } from "@/data/site";
import { trial } from "@/data/pricing";
import { IconPhone } from "./icons";
import { Logo } from "./logo";
import { MobileMenu } from "./mobile-menu";

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-line/70 bg-bg/90 backdrop-blur-md supports-[backdrop-filter]:bg-bg/75" data-block="header">
      <div className="wrap flex h-16 items-center justify-between gap-4 md:h-[4.5rem]">
        <Link href="/" className="shrink-0" aria-label="Urban210, на главную">
          <Logo />
        </Link>
        <nav aria-label="Основное меню" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {nav.map((n) => (
              <li key={n.href}>
                <Link href={n.href} className="rounded-lg px-3 py-2 text-[0.9375rem] text-muted transition-colors hover:text-ink">
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="flex items-center gap-2">
          <a href={site.phone.href} className="hidden items-center gap-2 px-2 text-[0.9375rem] font-medium md:inline-flex">
            <IconPhone size={18} className="text-accent" />
            {site.phone.display}
          </a>
          <a href="#zayavka" data-lead={trial.title} data-block="header" className="btn btn-accent hidden min-h-11 px-4 text-[0.9375rem] sm:inline-flex">
            Пробный день за 1 ₽
          </a>
          <MobileMenu />
        </div>
      </div>
    </header>
  );
}
