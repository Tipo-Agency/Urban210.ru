import type { Faq as FaqItem } from "@/data/content";
import { IconPlus } from "./icons";
import { JsonLd } from "./json-ld";

export function Faq({ items, title = "Частые вопросы" }: { items: FaqItem[]; title?: string; paper?: boolean }) {
  return (
    <section className="section" aria-labelledby="faq-title" data-block="faq">
      <div className="wrap">
        <h2 id="faq-title" className="mx-auto max-w-4xl text-center text-[clamp(2.25rem,1.3rem+3.6vw,4.75rem)] leading-[0.98]">
          {title}
        </h2>
        <div className="mt-12 grid items-start gap-3 md:mt-16 md:grid-cols-2">
          {items.map((f) => (
            <details key={f.q} className="group rounded-[1.75rem] border border-line bg-[#171717]/85 transition-colors open:border-accent/60 hover:border-white/30">
              <summary className="flex items-center justify-between gap-6 px-6 py-5 text-[0.9375rem] font-medium md:px-7">
                {f.q}
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-line transition-colors group-open:border-accent group-open:bg-accent">
                  <IconPlus className="faq-icon transition-transform duration-300" size={18} />
                </span>
              </summary>
              <p className="max-w-[62ch] px-6 pb-6 text-sm leading-relaxed text-muted md:px-7">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: items.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
        }}
      />
    </section>
  );
}
