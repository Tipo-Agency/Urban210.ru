import { LegalPage } from "@/components/legal-page";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({ title: "Публичная оферта", description: "Договор-оферта абонентского оказания физкультурно-оздоровительных услуг фитнес-клуба Urban210 (ООО «Альянс»).", path: "/oferta/" });

export default function Page() {
  return <LegalPage file="oferta.html" title="Публичная оферта" href="/oferta/" />;
}
