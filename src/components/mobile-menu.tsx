"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { nav, site } from "@/data/site";
import { IconClose, IconMenu } from "./icons";

export function MobileMenu() {
  const [open, setOpen] = useState(false);
  const path = usePathname();
  useEffect(() => setOpen(false), [path]);
  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
  }, [open]);

  return (
    <div className="lg:hidden">
      <button
        type="button"
        className="-mr-2 grid h-11 w-11 place-items-center rounded-lg"
        aria-expanded={open}
        aria-controls="mobile-nav"
        aria-label={open ? "Закрыть меню" : "Открыть меню"}
        onClick={() => setOpen((v) => !v)}
      >
        {open ? <IconClose size={26} /> : <IconMenu size={26} />}
      </button>
      {open && (
        <nav id="mobile-nav" aria-label="Мобильное меню" className="fixed inset-x-0 top-16 bottom-0 z-40 overflow-y-auto border-t border-line bg-bg">
          <ul className="wrap py-4">
            <li>
              <Link href="/" className="block border-b border-line py-4 font-display text-3xl uppercase">
                Главная
              </Link>
            </li>
            {nav.map((n) => (
              <li key={n.href}>
                <Link href={n.href} className="block border-b border-line py-4 font-display text-3xl uppercase">
                  {n.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/virtual-tour/" className="block border-b border-line py-4 font-display text-3xl uppercase">
                3D-тур
              </Link>
            </li>
            <li>
              <Link href="/blog/" className="block border-b border-line py-4 font-display text-3xl uppercase">
                Блог
              </Link>
            </li>
          </ul>
          <div className="wrap pb-28 text-muted">
            <a href={site.phone.href} className="block text-xl font-medium text-ink">
              {site.phone.display}
            </a>
            <p className="mt-1">{site.address.short}</p>
          </div>
        </nav>
      )}
    </div>
  );
}
