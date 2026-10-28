import type { Faq as FaqItem } from "@/data/content";
import { IconPlus } from "./icons";
import { JsonLd } from "./json-ld";

export function Faq({ items, title = "Частые вопросы" }: { items: FaqItem[]; title?: string; paper?: boolean }) {
  return (
    <section className="section" aria-labelledby="faq-title" data-block="faq">
      <div className="wrap grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <h2 id="faq-title" className="h2 max-w-[12ch]">
          {title}
        </h2>
        <div className="border-t border-line">
          {items.map((f) => (
            <details key={f.q} className="group border-b border-line">
              <summary className="flex items-center justify-between gap-6 py-5 text-lg font-semibold transition-colors hover:text-accent md:py-6">
                {f.q}
                <span className="grid h-9 w-9 shrink-0 place-items-center border border-line transition-colors group-open:border-accent group-open:bg-accent group-open:text-paper-ink">
                  <IconPlus className="faq-icon transition-transform duration-300" size={18} />
                </span>
              </summary>
              <p className="max-w-[62ch] pb-6 text-muted">{f.a}</p>
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
