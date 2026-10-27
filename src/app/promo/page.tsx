import { LeadSection } from "@/components/lead-section";
import { PageHero } from "@/components/page-hero";
import { Promos } from "@/components/sections";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Акции фитнес-клуба Urban210 в Хабаровске",
  description: "Акции Urban210: пробный день за 1 ₽, trade-in карты другого клуба за 999 ₽, месяц в подарок другу при покупке годовой подписки.",
  path: "/promo/",
});

export default function Page() {
  return (
    <>
      <PageHero title="Акции" lead="Попробовать клуб почти бесплатно, перейти из другого клуба или тренироваться вдвоём." crumbs={[{ href: "/promo/", label: "Акции" }]} />
      <section className="wrap pb-20" aria-label="Список акций" data-block="promo_list">
        <Promos />
      </section>
      <LeadSection />
    </>
  );
}
