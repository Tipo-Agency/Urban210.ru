import { Cta } from "@/components/cta";
import { Faq } from "@/components/faq";
import { LeadSection } from "@/components/lead-section";
import { PageHero } from "@/components/page-hero";
import { SectionHead } from "@/components/sections";
import { TrainerWall } from "@/components/blocks";
import { personalText } from "@/data/content";
import { personal, rub } from "@/data/pricing";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Персональный тренер в Хабаровске",
  description: `Персональные тренировки в фитнес-клубе Urban210: ${personalText.price}. Программа под цель, постановка техники, контроль прогресса. Первая тренировка бесплатно при покупке подписки.`,
  path: "/personal/",
});

const steps = [
  { t: "Знакомство", d: "Тренер спросит про цель, опыт и ограничения по здоровью, проверит подвижность и базовую силу." },
  { t: "Программа", d: "Составит план под вашу цель: снижение веса, набор массы, здоровая спина или подготовка к старту." },
  { t: "Техника", d: "На каждой тренировке следит за техникой и подбирает вес, чтобы был прогресс без травм." },
  { t: "Прогресс", d: "Замеры и корректировка плана по ходу. Вы видите результат в цифрах, а не только в зеркале." },
];

const faq = [
  { q: "Сколько стоят персональные тренировки?", a: `Пакет из ${personal.pack} тренировок стоит ${rub(personal.price)}, это ${rub(Math.round(personal.price / personal.pack))} за занятие. Абонемент в зал оплачивается отдельно.` },
  { q: "Можно ли попробовать бесплатно?", a: `Да. ${personal.firstFree}.` },
  { q: "Сколько раз в неделю заниматься с тренером?", a: "Чаще всего 2–3 раза. Между тренировками можно заниматься самостоятельно по программе, которую составит тренер." },
];

export default function Page() {
  return (
    <>
      <PageHero
        title="Персональный тренер"
        lead={personalText.lead}
        crumbs={[{ href: "/personal/", label: "Персональные тренировки" }]}
        image="/images/functional.jpg"
        imageAlt="Тренер Urban210 занимается с клиентом"
      >
        <Cta goal="Персональные тренировки" block="personal_hero">
          Первая тренировка бесплатно
        </Cta>
      </PageHero>

      <section className="section" aria-labelledby="how" data-block="personal_how">
        <div className="wrap">
          <SectionHead id="how" title="Как это работает" />
          <ol className="grid gap-6 md:grid-cols-4">
            {steps.map((s, i) => (
              <li key={s.t} className="border-t border-line pt-5">
                <span className="font-display text-4xl text-accent">{i + 1}</span>
                <h3 className="mt-3 text-2xl">{s.t}</h3>
                <p className="mt-2 text-muted">{s.d}</p>
              </li>
            ))}
          </ol>
          <div className="mt-14 grid items-center gap-8 rounded-[var(--radius-card)] border border-line bg-card p-6 md:grid-cols-[1fr_auto] md:p-10">
            <div>
              <p className="font-display text-4xl uppercase md:text-5xl">{personalText.price}</p>
              <p className="mt-3 text-muted">{personalText.bonus}</p>
            </div>
            <Cta goal="Персональные тренировки" block="personal_offer">
              Записаться
            </Cta>
          </div>
        </div>
      </section>

      <section className="section border-t border-line" aria-labelledby="team" data-block="trainers">
        <div className="wrap">
          <SectionHead id="team" title="Тренеры" />
          <TrainerWall />
        </div>
      </section>

      <Faq items={faq} title="Вопросы о персональных" />
      <LeadSection title="Первая тренировка с тренером бесплатно" text="Оставьте номер, подберём тренера и время. Бесплатная тренировка действует при покупке подписки." goal="Персональные тренировки" block="final_personal" />
    </>
  );
}
