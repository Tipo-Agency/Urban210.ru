import { readFileSync } from "node:fs";
import path from "node:path";
import { LeadSection } from "./lead-section";
import { PageHero } from "./page-hero";

// Тексты документов перенесены со старого сайта без изменений (src/content/legal).
export function LegalPage({ file, title, href }: { file: string; title: string; href: string }) {
  const html = readFileSync(path.join(process.cwd(), "src/content/legal", file), "utf8");
  return (
    <>
      <PageHero title={title} crumbs={[{ href, label: title }]} />
      <section className="wrap pb-20">
        <div className="prose-u text-[#d9d2ca] [&_strong]:text-ink" dangerouslySetInnerHTML={{ __html: html }} />
      </section>
      <LeadSection />
    </>
  );
}
