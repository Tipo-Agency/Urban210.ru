import { site, whatsappLink } from "@/data/site";
import { trial } from "@/data/pricing";
import { IconPhone, IconWhatsApp } from "./icons";

// Липкая панель на телефоне: звонок, WhatsApp и главный оффер всегда под пальцем.
export function MobileBar() {
  return (
    <div data-mobile-bar className="fixed inset-x-0 bottom-0 z-30 px-3 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] pb-[max(0.75rem,env(safe-area-inset-bottom))] md:hidden" data-block="mobile_bar">
      <div className="flex gap-1.5 rounded-full border border-white/10 bg-[#0b0b0a]/80 p-1.5 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.8)] backdrop-blur-xl">
        <a href={site.phone.href} className="btn min-h-12 w-12 shrink-0 bg-white/5 px-0" aria-label={`Позвонить ${site.phone.display}`}>
          <IconPhone />
        </a>
        <a
          href={whatsappLink("Здравствуйте! Хочу узнать про абонемент в Urban210")}
          target="_blank"
          rel="noopener"
          className="btn min-h-12 w-12 shrink-0 bg-white/5 px-0"
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
