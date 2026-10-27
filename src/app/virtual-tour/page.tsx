import Image from "next/image";
import { LeadSection } from "@/components/lead-section";
import { PageHero } from "@/components/page-hero";
import { TourEmbed } from "@/components/tour-embed";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "3D-тур по фитнес-клубу Urban210",
  description: "Виртуальный 3D-тур по фитнес-клубу Urban210 в Хабаровске: тренажёрный зал, кардиозона, студия групповых программ, раздевалки и SPA.",
  path: "/virtual-tour/",
});

const photos = [
  ["/images/zal.jpg", "Тренажёрный зал"],
  ["/images/cardio.jpg", "Кардиозона"],
  ["/images/free-weights.jpg", "Свободные веса"],
  ["/images/machines.jpg", "Силовые тренажёры"],
  ["/images/group.jpg", "Групповая тренировка"],
  ["/images/reception.jpg", "Ресепшен и зона отдыха"],
];

export default function Page() {
  return (
    <>
      <PageHero title="3D-тур по клубу" lead="Пройдитесь по залам, раздевалкам и SPA-зоне, не выходя из дома. А потом приходите на пробный день за 1 ₽." crumbs={[{ href: "/virtual-tour/", label: "3D-тур" }]} />
      <section className="wrap" data-block="tour">
        <TourEmbed />
      </section>
      <section className="wrap section" aria-label="Фотографии клуба" data-block="gallery">
        <ul className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4">
          {photos.map(([src, alt]) => (
            <li key={src} className="relative aspect-[4/3] overflow-hidden rounded-xl bg-card">
              <Image src={src} alt={alt} fill sizes="(min-width: 768px) 33vw, 50vw" className="object-cover" />
            </li>
          ))}
        </ul>
      </section>
      <LeadSection />
    </>
  );
}
