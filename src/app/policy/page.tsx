import { LegalPage } from "@/components/legal-page";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({ title: "Политика конфиденциальности", description: "Политика обработки персональных данных фитнес-клуба Urban210 (ООО «Альянс»), Хабаровск.", path: "/policy/" });

export default function Page() {
  return <LegalPage file="policy.html" title="Политика конфиденциальности" href="/policy/" />;
}
