import Link from "next/link";
import { SITE_URL } from "@/data/site";
import { JsonLd } from "./json-ld";

export function Breadcrumbs({ items }: { items: { href: string; label: string }[] }) {
  const all = [{ href: "/", label: "Главная" }, ...items];
  return (
    <>
      <nav aria-label="Хлебные крошки" className="text-sm text-muted">
        <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
          {all.map((c, i) => (
            <li key={c.href} className="flex items-center gap-2">
              {i > 0 && <span aria-hidden="true">/</span>}
              {i === all.length - 1 ? (
                <span aria-current="page">{c.label}</span>
              ) : (
                <Link prefetch={false} href={c.href} className="hover:text-ink">
                  {c.label}
                </Link>
              )}
            </li>
          ))}
        </ol>
      </nav>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: all.map((c, i) => ({ "@type": "ListItem", position: i + 1, name: c.label, item: SITE_URL + c.href })),
        }}
      />
    </>
  );
}
