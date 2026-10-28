import Link from "next/link";
import { nav, site } from "@/data/site";
import { trial } from "@/data/pricing";
import { IconPhone } from "./icons";
import { Logo } from "./logo";
import { MobileMenu } from "./mobile-menu";
import { NavLinks } from "./nav-links";

// Шапка во всю ширину: прозрачная над первым экраном, плотная после скролла (класс scrolled из motion.tsx).
export function Header() {
  return (
    <header data-header className="fixed inset-x-0 top-0 z-40 border-b border-transparent transition-colors duration-300" data-block="header">
      <div className="mx-auto flex h-16 max-w-[90rem] items-center justify-between gap-4 px-4 md:h-[4.5rem] md:px-8">
        <Link prefetch={false} href="/" className="shrink-0" aria-label="Urban210, на главную">
          <Logo />
        </Link>
        <nav aria-label="Основное меню" className="hidden lg:block">
          <NavLinks items={nav} />
        </nav>
        <div className="flex items-center gap-2">
          <a href={site.phone.href} className="hidden items-center gap-2 px-3 py-2 text-[0.9375rem] font-medium transition-colors hover:text-accent xl:inline-flex">
            <IconPhone size={18} className="text-accent" />
            {site.phone.display}
          </a>
          <a href="#zayavka" data-lead={trial.title} data-block="header" className="btn btn-accent hidden min-h-11 px-5 text-sm sm:inline-flex">
            Пробный день за 1 ₽
          </a>
          <MobileMenu />
        </div>
      </div>
    </header>
  );
}
