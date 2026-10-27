import type { Faq as FaqItem } from "@/data/content";
import { IconPlus } from "./icons";
import { JsonLd } from "./json-ld";

export function Faq({ items, title = "Частые вопросы", paper = true }: { items: FaqItem[]; title?: string; paper?: boolean }) {
  return (
    <section className={`section ${paper ? "on-paper" : ""}`} aria-labelledby="faq-title" data-block="faq">
      <div className="wrap grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <h2 id="faq-title" className="text-[length:var(--text-h2)]">
          {title}
        </h2>
        <div className={`border-t ${paper ? "border-paper-line" : "border-line"}`}>
          {items.map((f) => (
            <details key={f.q} className={`group border-b ${paper ? "border-paper-line" : "border-line"}`}>
              <summary className="flex items-start justify-between gap-6 py-5 text-lg font-medium md:text-xl">
                {f.q}
                <IconPlus className="faq-icon mt-1 shrink-0 transition-transform duration-200" size={22} />
              </summary>
              <p className="text-muted -mt-1 max-w-[62ch] pb-6">{f.a}</p>
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
