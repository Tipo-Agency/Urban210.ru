"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function NavLinks({ items }: { items: readonly { href: string; label: string }[] }) {
  const path = usePathname();
  return (
    <ul className="flex items-center gap-0.5">
      {items.map((n) => {
        const active = path === n.href || (n.href !== "/" && path.startsWith(n.href));
        return (
          <li key={n.href}>
            <Link
              href={n.href}
              aria-current={active ? "page" : undefined}
              className={`rounded-full px-3.5 py-2 text-[0.9375rem] transition-colors ${active ? "bg-white/10 text-ink" : "text-muted hover:text-ink"}`}
            >
              {n.label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
