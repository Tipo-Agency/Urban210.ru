"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { nav, site } from "@/data/site";
import { trial } from "@/data/pricing";

const links = [{ href: "/", label: "Главная" }, ...nav, { href: "/virtual-tour/", label: "3D-тур" }, { href: "/blog/", label: "Блог" }];

export function MobileMenu() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const path = usePathname();
  useEffect(() => setOpen(false), [path]);
  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
  }, [open]);

  return (
    <div className="lg:hidden">
      <button
        type="button"
        className="relative z-50 grid h-11 w-11 place-items-center rounded-full bg-white/5 md:h-12 md:w-12"
        aria-expanded={open}
        aria-controls="mobile-nav"
        aria-label={open ? "Закрыть меню" : "Открыть меню"}
        onClick={() => setOpen((v) => !v)}
      >
        {/* Две линии превращаются в крестик */}
        <span aria-hidden="true" className="relative block h-3 w-5">
          <span className={`absolute left-0 h-0.5 w-5 rounded bg-current transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${open ? "top-[5px] rotate-45" : "top-0"}`} />
          <span className={`absolute left-0 h-0.5 w-5 rounded bg-current transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${open ? "top-[5px] -rotate-45" : "top-2.5"}`} />
        </span>
      </button>
      {mounted && createPortal(
      <nav
        id="mobile-nav"
        aria-label="Мобильное меню"
        aria-hidden={!open}
        inert={!open}
        className={`fixed inset-0 z-[35] overflow-y-auto lg:hidden bg-[#0b0b0a]/95 backdrop-blur-2xl transition-opacity duration-300 ${open ? "opacity-100" : "pointer-events-none opacity-0"}`}
      >
        {/* Панель вынесена в body: у шапки backdrop-filter, внутри неё fixed считался бы от шапки */}
        <ul className="wrap pt-24">
          {links.map((n, i) => (
            <li
              key={n.href}
              style={{ transitionDelay: open ? `${Math.min(i * 45, 400)}ms` : "0ms" }}
              className={`transition-[opacity,transform] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${open ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"}`}
            >
              <Link
                href={n.href}
                aria-current={path === n.href ? "page" : undefined}
                className={`flex items-baseline gap-4 border-b border-line py-3.5 font-display text-4xl font-bold uppercase ${path === n.href ? "text-accent" : ""}`}
              >
                <span className="w-7 font-sans text-xs font-medium text-muted">{String(i + 1).padStart(2, "0")}</span>
                {n.label}
              </Link>
            </li>
          ))}
        </ul>
        <div className="wrap pb-12 pt-8">
          <a href="#zayavka" data-lead={trial.title} data-block="mobile_menu" onClick={() => setOpen(false)} className="btn btn-accent w-full">
            Пробный день за 1 ₽
          </a>
          <a href={site.phone.href} className="mt-6 block text-2xl font-semibold">
            {site.phone.display}
          </a>
          <p className="mt-1 text-muted">{site.address.short}</p>
        </div>
      </nav>,
      document.body)}
    </div>
  );
}
