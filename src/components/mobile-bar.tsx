import { site, whatsappLink } from "@/data/site";
import { trial } from "@/data/pricing";
import { IconPhone, IconWhatsApp } from "./icons";

// Липкая панель на телефоне: звонок, WhatsApp и главный оффер всегда под пальцем.
export function MobileBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-30 border-t border-line bg-bg/95 pb-[env(safe-area-inset-bottom)] backdrop-blur md:hidden" data-block="mobile_bar">
      <div className="flex gap-2 px-3 py-2.5">
        <a href={site.phone.href} className="btn btn-ghost min-h-12 w-12 shrink-0 px-0" aria-label={`Позвонить ${site.phone.display}`}>
          <IconPhone />
        </a>
        <a
          href={whatsappLink("Здравствуйте! Хочу узнать про абонемент в Urban210")}
          target="_blank"
          rel="noopener"
          className="btn btn-ghost min-h-12 w-12 shrink-0 px-0"
          aria-label="Написать в WhatsApp"
        >
          <IconWhatsApp />
        </a>
        <a href="#zayavka" data-lead={trial.title} data-block="mobile_bar" className="btn btn-accent min-h-12 flex-1">
          Пробный день за 1 ₽
        </a>
      </div>
    </div>
  );
}
