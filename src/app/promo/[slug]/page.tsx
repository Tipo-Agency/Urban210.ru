import Image from "next/image";
import { notFound } from "next/navigation";
import { Cta } from "@/components/cta";
import { IconCheck } from "@/components/icons";
import { LeadSection } from "@/components/lead-section";
import { PageHero } from "@/components/page-hero";
import { Promos, SectionHead } from "@/components/sections";
import { promos } from "@/data/content";
import { pageMeta } from "@/lib/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return promos.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = promos.find((x) => x.slug === slug);
  if (!p) return {};
  return pageMeta({ title: `${p.title}: акция фитнес-клуба Urban210`, description: `${p.short}. ${p.text}`.slice(0, 200), path: `/promo/${p.slug}/`, image: `/images/promo/${p.slug}.jpg` });
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = promos.find((x) => x.slug === slug);
  if (!p) notFound();
  return (
    <>
      <PageHero title={p.title} lead={p.text} crumbs={[{ href: "/promo/", label: "Акции" }, { href: `/promo/${p.slug}/`, label: p.title }]}>
        <Cta goal={p.goal} block={`promo_${p.slug}`}>
          {p.cta}
        </Cta>
      </PageHero>
      <section className="wrap grid gap-8 pb-20 md:grid-cols-2 md:items-center" data-block="promo_terms">
        <div className="relative aspect-square overflow-hidden bg-card md:max-w-xl">
          <Image src={`/images/promo/${p.slug}.jpg`} alt="" fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover object-right" />
        </div>
        <div>
          <h2 className="text-[length:var(--text-h3)]">Условия</h2>
          <ul className="mt-5 grid gap-3">
            {p.terms.map((t) => (
              <li key={t} className="flex gap-3">
                <IconCheck className="mt-1 shrink-0 text-accent" size={18} />
                {t}
              </li>
            ))}
          </ul>
          <p className="mt-6 text-sm text-muted">Срок действия и детали уточняйте у администратора.</p>
        </div>
      </section>
      <section className="section border-t border-line" aria-labelledby="other" data-block="promo_other">
        <div className="wrap">
          <SectionHead id="other" title="Другие акции" />
          <Promos exclude={p.slug} />
        </div>
      </section>
      <LeadSection title={p.title} text={p.short} goal={p.goal} block={`final_promo_${p.slug}`} />
    </>
  );
}
