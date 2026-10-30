// Цены со страницы /price/ старого сайта на 27.10.2026. Уточнить у клуба перед запуском.

export type Plan = {
  id: "day" | "full" | "all";
  name: string;
  tag?: string;
  hours: string;
  month: number;
  year: number;
  features: string[];
  excluded?: string[];
};

export const plans: Plan[] = [
  {
    id: "day",
    name: "Дневная карта",
    hours: "с 6:30 до 16:00", // уточнить: в FAQ старого сайта «до 17:00»
    month: 1300,
    year: 10990,
    features: ["Тренажёрный зал и кардиозона", "Фитнес-тестирование", "Раздевалки и душевые", "Бесплатная парковка"],
    excluded: ["Вечернее время", "Групповые программы", "SPA-зона"],
  },
  {
    id: "full",
    name: "Полный день",
    tag: "Популярный",
    hours: "всё время работы клуба",
    month: 1700, // уточнить: в FAQ старого сайта 1800
    year: 14990,
    features: ["Всё из дневной карты", "Любое время работы клуба", "Пробная тренировка с тренером", "Бесплатная парковка"],
    excluded: ["Групповые программы", "SPA-зона"],
  },
  {
    id: "all",
    name: "Всё включено",
    tag: "Максимум",
    hours: "всё время работы клуба",
    month: 2400,
    year: 19990,
    features: ["Всё из «Полного дня»", "Групповые программы без доплат", "SPA: финская сауна, хаммам, релакс-зона", "Приоритетное обслуживание"],
  },
];

export const perDay = (rub: number, days: number) => Math.round(rub / days);
export const rub = (n: number) => `${n.toLocaleString("ru-RU").replace(/ /g, " ")} ₽`;

export const personal = {
  pack: 10,
  price: 15300, // уточнить: на странице тренеров «10 занятий — 7000 ₽»
  firstFree: "Первая персональная тренировка бесплатно при покупке подписки",
};
