import { Cta } from "@/components/cta";
import { LeadSection } from "@/components/lead-section";
import { PageHero } from "@/components/page-hero";
import { TrainerWall } from "@/components/blocks";
import { personalText } from "@/data/content";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Тренеры фитнес-клуба Urban210, Хабаровск",
  description: "Тренеры фитнес-клуба Urban210 в Хабаровске: персональные тренировки, групповые программы, постановка техники. Первая персональная тренировка бесплатно при покупке подписки.",
  path: "/trainers/",
});

export default function Page() {
  return (
    <>
      <PageHero title="Тренеры" lead={`${personalText.lead} ${personalText.bonus}.`} crumbs={[{ href: "/trainers/", label: "Тренеры" }]}>
        <Cta goal="Персональные тренировки" block="trainers_hero">
          Записаться к тренеру
        </Cta>
      </PageHero>
      <section className="wrap pb-20" aria-label="Команда тренеров" data-block="trainers">
        <TrainerWall />
      </section>
      <LeadSection title="Запишитесь на первую тренировку с тренером" text="Оставьте номер: тренер или администратор перезвонит и подберёт время. При покупке подписки первая персональная тренировка бесплатно." goal="Персональные тренировки" block="final_trainers" />
    </>
  );
}
