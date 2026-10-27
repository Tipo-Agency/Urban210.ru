import { Cta } from "@/components/cta";
import { Faq } from "@/components/faq";
import { LeadSection } from "@/components/lead-section";
import { PageHero } from "@/components/page-hero";
import { SectionHead } from "@/components/sections";
import { plans, rub } from "@/data/pricing";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Сауна и хаммам в фитнес-клубе, Хабаровск",
  description: `SPA-зона фитнес-клуба Urban210: финская сауна, хаммам 40–50 °C и релакс-зона с массажными креслами. Входит в тариф «Всё включено» за ${rub(plans[2].month)} в месяц.`,
  path: "/spa/",
});

const items = [
  { title: "Финская сауна", text: "Сухой жар расслабляет мышцы после силовой и помогает восстановиться к следующей тренировке." },
  { title: "Хаммам", text: "Влажный пар 40–50 °C. Мягче сауны, полезен для дыхания и кожи. Хорошо чередовать с прохладным душем." },
  { title: "Релакс-зона", text: "Массажные кресла и тишина. Десять минут после тренировки, чтобы пульс пришёл в норму." },
];

const faq = [
  { q: "Сколько стоит SPA-зона?", a: `SPA входит в тариф «Всё включено»: ${rub(plans[2].month)} в месяц или ${rub(plans[2].year)} за год. Отдельно за сауну платить не нужно.` },
  { q: "Можно ли в сауну сразу после тренировки?", a: "Лучше подождать 10–15 минут, пока пульс и дыхание восстановятся. Заходите на 8–12 минут, между заходами отдыхайте и пейте воду." },
  { q: "Кому нельзя в сауну и хаммам?", a: "При повышенной температуре, острых воспалениях, гипертонии, болезнях сердца и сосудов, во время беременности. Если сомневаетесь, посоветуйтесь с врачом." },
  { q: "Что взять с собой?", a: "Полотенце, сланцы и шапочку для сауны. Душевые с гелем и шампунем есть в раздевалках." },
];

export default function Page() {
  return (
    <>
      <PageHero
        title="SPA-зона: сауна и хаммам"
        lead="Восстановление после тренировки без отдельной оплаты: финская сауна, хаммам и релакс-зона входят в тариф «Всё включено»."
        crumbs={[{ href: "/spa/", label: "SPA-зона" }]}
      >
        <Cta goal="Всё включено" block="spa_hero">
          Хочу «Всё включено»
        </Cta>
      </PageHero>

      <section className="section pt-4" aria-labelledby="spa-items" data-block="spa_items">
        <div className="wrap">
          <h2 id="spa-items" className="sr-only">
            Что есть в SPA-зоне
          </h2>
          <div className="grid gap-4 md:grid-cols-3">
            {items.map((it, i) => (
              <article key={it.title} className={`flex min-h-[16rem] flex-col justify-end rounded-[var(--radius-card)] p-6 md:p-8 ${i === 0 ? "bg-[radial-gradient(120%_90%_at_85%_10%,#7a2b12_0%,#2a1710_50%,#161311_100%)]" : "border border-line bg-card"}`}>
                <h3 className="text-[length:var(--text-h3)]">{it.title}</h3>
                <p className="mt-3 text-muted">{it.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section border-t border-line" aria-labelledby="spa-how" data-block="spa_how">
        <div className="wrap">
          <SectionHead id="spa-how" title="Как правильно восстанавливаться" />
          <ol className="grid gap-6 md:grid-cols-4">
            {["Остыньте 10–15 минут после тренировки", "Тёплый душ, затем сауна или хаммам на 8–12 минут", "Прохладный душ и отдых 10 минут, выпейте воды", "Повторите 2–3 раза и закончите в релакс-зоне"].map((s, i) => (
              <li key={s} className="border-t border-line pt-5">
                <span className="font-display text-4xl text-accent">{i + 1}</span>
                <p className="mt-3">{s}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <Faq items={faq} title="Вопросы о SPA" />
      <LeadSection title="Приходите на пробный день и загляните в сауну" />
    </>
  );
}
