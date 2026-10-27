import { LegalPage } from "@/components/legal-page";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({ title: "Правила посещения клуба", description: "Правила посещения фитнес-клуба Urban210 в Хабаровске: вход, браслет, раздевалки, SPA-зона, тренажёрный зал.", path: "/rules/" });

export default function Page() {
  return <LegalPage file="rules.html" title="Правила посещения" href="/rules/" />;
}
