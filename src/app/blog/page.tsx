import Image from "next/image";
import Link from "next/link";
import { LeadSection } from "@/components/lead-section";
import { PageHero } from "@/components/page-hero";
import { getPosts } from "@/lib/blog";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Блог о тренировках и здоровье",
  description: "Статьи тренеров фитнес-клуба Urban210: как начать заниматься, тренировки для похудения и набора массы, сауна после зала, питание.",
  path: "/blog/",
});

export default function Page() {
  const posts = getPosts();
  return (
    <>
      <PageHero title="Блог" lead="Простые ответы на вопросы, которые задают на ресепшене: как начать, сколько ходить и что есть." crumbs={[{ href: "/blog/", label: "Блог" }]} />
      <section className="wrap pb-20" data-block="blog_list">
        <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((p) => (
            <li key={p.slug}>
              <Link href={`/blog/${p.slug}/`} className="group block">
                <div className="relative aspect-[16/10] overflow-hidden rounded-[var(--radius-card)] bg-card">
                  <Image src={p.image} alt="" fill sizes="(min-width: 1024px) 400px, (min-width: 768px) 50vw, 100vw" className="object-cover transition-transform duration-500 group-hover:scale-[1.03]" />
                </div>
                <h2 className="mt-4 text-2xl group-hover:text-accent">{p.title}</h2>
                <p className="mt-2 line-clamp-3 text-muted">{p.description}</p>
                <p className="mt-2 text-sm text-muted">{p.minutes} мин чтения</p>
              </Link>
            </li>
          ))}
        </ul>
      </section>
      <LeadSection />
    </>
  );
}
