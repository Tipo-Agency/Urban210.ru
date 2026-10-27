import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { Cta } from "@/components/cta";
import { JsonLd } from "@/components/json-ld";
import { LeadSection } from "@/components/lead-section";
import { SITE_URL } from "@/data/site";
import { getPost, getPosts } from "@/lib/blog";
import { pageMeta } from "@/lib/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return getPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = getPost(slug);
  if (!p) return {};
  return pageMeta({ title: p.title, description: p.description, path: `/blog/${p.slug}/`, image: p.image });
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = getPost(slug);
  if (!p) notFound();
  const more = getPosts().filter((x) => x.slug !== p.slug).slice(0, 3);
  const date = new Date(p.date).toLocaleDateString("ru-RU", { day: "numeric", month: "long", year: "numeric" });
  return (
    <>
      <article className="wrap pb-16 pt-28 md:pt-36">
        <Breadcrumbs items={[{ href: "/blog/", label: "Блог" }, { href: `/blog/${p.slug}/`, label: p.title }]} />
        <h1 className="mt-6 max-w-4xl text-[length:var(--text-h2)]">{p.title}</h1>
        <p className="mt-4 text-sm text-muted">
          {date} · {p.minutes} мин чтения
        </p>
        <div className="relative mt-8 aspect-[16/8] overflow-hidden rounded-[var(--radius-card)] bg-card">
          <Image src={p.image} alt="" fill priority sizes="(min-width: 1280px) 1200px, 100vw" className="object-cover" />
        </div>
        <div className="mt-10 grid gap-12 lg:grid-cols-[1fr_20rem]">
          <div className="prose-u text-[1.0625rem] text-[#e2dbd3]" dangerouslySetInnerHTML={{ __html: p.html }} />
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-[var(--radius-card)] border border-line bg-card p-6">
              <p className="font-display text-2xl uppercase">Попробуйте Urban210</p>
              <p className="mt-2 text-sm text-muted">Пробный день за 1 ₽: зал, кардио и раздевалки без обязательств.</p>
              <Cta goal={p.cta} block="blog_aside" className="mt-5 w-full">
                {p.cta === "Пробный день за 1 ₽" ? p.cta : "Оставить заявку"}
              </Cta>
            </div>
          </aside>
        </div>
      </article>
      {more.length > 0 && (
        <section className="wrap border-t border-line py-16" aria-labelledby="more">
          <h2 id="more" className="text-[length:var(--text-h3)]">
            Ещё по теме
          </h2>
          <ul className="mt-6 grid gap-4 md:grid-cols-3">
            {more.map((m) => (
              <li key={m.slug}>
                <Link href={`/blog/${m.slug}/`} className="block rounded-[var(--radius-card)] border border-line bg-card p-6 hover:border-ink">
                  <span className="text-lg font-medium">{m.title}</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}
      <LeadSection />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: p.title,
          description: p.description,
          image: SITE_URL + p.image,
          datePublished: p.date,
          dateModified: p.date,
          inLanguage: "ru",
          author: { "@type": "Organization", name: "Фитнес-клуб Urban210", url: SITE_URL + "/" },
          publisher: { "@id": SITE_URL + "/#club" },
          mainEntityOfPage: SITE_URL + `/blog/${p.slug}/`,
        }}
      />
    </>
  );
}
