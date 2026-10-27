import Link from "next/link";
import { nav, site } from "@/data/site";
import { trial } from "@/data/pricing";
import { IconPhone } from "./icons";
import { Logo } from "./logo";
import { MobileMenu } from "./mobile-menu";
import { NavLinks } from "./nav-links";

// Плавающая панель: не прилипает к краю, сквозь неё видно страницу.
export function Header() {
  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-40 px-3 pt-3 md:px-5 md:pt-4" data-block="header">
      <div className="pointer-events-auto mx-auto flex h-14 max-w-[84rem] items-center justify-between gap-4 rounded-full border border-white/10 bg-[#0b0b0a]/70 pl-5 pr-2 shadow-[0_10px_40px_-12px_rgba(0,0,0,0.6)] backdrop-blur-xl md:h-16 md:pl-7">
        <Link href="/" className="shrink-0" aria-label="Urban210, на главную">
          <Logo />
        </Link>
        <nav aria-label="Основное меню" className="hidden lg:block">
          <NavLinks items={nav} />
        </nav>
        <div className="flex items-center gap-1.5">
          <a href={site.phone.href} className="hidden items-center gap-2 rounded-full px-3 py-2 text-[0.9375rem] font-medium transition-colors hover:bg-white/5 xl:inline-flex">
            <IconPhone size={18} className="text-accent" />
            {site.phone.display}
          </a>
          <a href="#zayavka" data-lead={trial.title} data-block="header" className="btn btn-accent hidden min-h-11 px-5 text-sm sm:inline-flex md:min-h-12">
            Пробный день за 1 ₽
          </a>
          <MobileMenu />
        </div>
      </div>
    </header>
  );
}
