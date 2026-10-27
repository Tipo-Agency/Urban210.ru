import Image from "next/image";
import { Cta } from "@/components/cta";
import { Faq } from "@/components/faq";
import { LeadSection } from "@/components/lead-section";
import { PageHero } from "@/components/page-hero";
import { Programs, SectionHead } from "@/components/sections";
import { plans, rub } from "@/data/pricing";
import { site } from "@/data/site";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Групповые тренировки в Хабаровске: пилатес, зумба, кроссфит",
  description: `Групповые программы в фитнес-клубе Urban210: Body, Pump, ABS, кроссфит, TRX, зумба, стрип, пилатес, растяжка. ${site.facts.groupHall}. Входят в тариф «Всё включено» за ${rub(plans[2].month)} в месяц.`,
  path: "/group/",
  image: "/images/group.jpg",
});

const faq = [
  { q: "Сколько стоят групповые?", a: `Групповые программы входят в тариф «Всё включено»: ${rub(plans[2].month)} в месяц или ${rub(plans[2].year)} за год. Отдельно платить за каждое занятие не нужно.` },
  { q: "Как записаться на занятие?", a: "Через приложение клуба: там расписание и онлайн-запись. Доступ в приложение вы получите после оформления абонемента." },
  { q: "Я никогда не занимался в группе. С чего начать?", a: "С мягкого фитнеса или силовых программ: тренер подскажет вес и технику. Через пару недель можно переходить на функциональные тренировки." },
  { q: "Что взять на групповое занятие?", a: "Удобную одежду, кроссовки, полотенце и воду. Коврики, гантели и петли TRX есть в зале." },
];

export default function Page() {
  return (
    <>
      <PageHero
        title="Групповые тренировки"
        lead={`От пилатеса до кроссфита. ${site.facts.groupHall[0].toUpperCase() + site.facts.groupHall.slice(1)}, запись в приложении клуба, все занятия входят в тариф «Всё включено».`}
        crumbs={[{ href: "/group/", label: "Групповые программы" }]}
        image="/images/group.jpg"
        imageAlt="Танцевальная групповая тренировка в Urban210"
      >
        <Cta goal="Всё включено" block="group_hero">
          Попробовать групповые
        </Cta>
      </PageHero>

      <section className="section" aria-labelledby="dir-title" data-block="group_programs">
        <div className="wrap">
          <SectionHead id="dir-title" title="Направления" text="Четыре направления под разные цели: сила, выносливость, настроение и гибкость." />
          <Programs />
          <div className="mt-4 grid gap-4 md:grid-cols-3">
            {[
              ["/images/group-strength.jpg", "Силовая групповая тренировка с гантелями"],
              ["/images/stretching.jpg", "Занятие растяжкой в Urban210"],
              ["/images/functional.jpg", "Функциональная тренировка с медболами"],
            ].map(([src, alt]) => (
              <div key={src} className="relative aspect-[4/3] overflow-hidden rounded-[var(--radius-card)] bg-card">
                <Image src={src} alt={alt} fill sizes="(min-width: 768px) 33vw, 100vw" className="object-cover" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <Faq items={faq} title="Вопросы о групповых" />
      <LeadSection title="Запишитесь на пробное занятие" goal="Всё включено" block="final_group" text="Оставьте номер: администратор подберёт направление и время и расскажет про тариф «Всё включено»." />
    </>
  );
}
