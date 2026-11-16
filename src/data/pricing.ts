// Цены по прайсу клуба «кусочек цен.docx» от 16.11.2026 (копия в docs/price-2026-11.md).
// Месячные карты: plans. Абонементы на 3, 6 и 12 месяцев: terms, у них три цены.

export type Plan = {
  id: "day" | "full" | "all";
  name: string;
  tag?: string;
  hours: string;
  month: number;
  features: string[];
  excluded?: string[];
};

// Месячные карты оформляются со стартовым взносом
export const startFee = 3000;
// После окончания абонемента дней на продление
export const renewDays = 10;

export const plans: Plan[] = [
  {
    id: "day",
    name: "Дневная карта",
    hours: "с 7:00 до 17:00",
    month: 1900,
    features: ["Тренажёрный зал и кардиозона", "Фитнес-тестирование", "Раздевалки и душевые", "Бесплатная парковка"],
    excluded: ["Вечернее время", "Групповые программы", "SPA-зона"],
  },
  {
    id: "full",
    name: "Полный день",
    tag: "Популярный",
    hours: "всё время работы клуба",
    month: 2100,
    features: ["Всё из дневной карты", "Любое время работы клуба", "Пробная тренировка с тренером", "Бесплатная парковка"],
    excluded: ["Групповые программы", "SPA-зона"],
  },
  {
    id: "all",
    name: "Всё включено",
    tag: "Максимум",
    hours: "всё время работы клуба",
    month: 2400,
    features: ["Всё из «Полного дня»", "Групповые программы без доплат", "SPA: финская сауна, хаммам, релакс-зона", "Приоритетное обслуживание"],
  },
];

// Абонементы на срок. Цены: новым клиентам, бывшим членам клуба, действующим членам клуба.
export type Term = {
  id: "unlim12" | "day12" | "mornev12" | "unlim6" | "unlim3";
  name: string;
  months: number;
  days: number;
  tag?: string;
  hours: string;
  price: { fresh: number; former: number; member: number };
  features: string[];
};

export const terms: Term[] = [
  {
    id: "unlim12",
    name: "Безлимит на 12 месяцев",
    months: 12,
    days: 365,
    tag: "Выгоднее всего",
    hours: "с открытия до закрытия клуба",
    price: { fresh: 23900, former: 20900, member: 17900 },
    features: ["Все групповые программы", "30 дней заморозки", "1 персональная тренировка", "2 гостевых визита"],
  },
  {
    id: "day12",
    name: "Дневной на 12 месяцев",
    months: 12,
    days: 365,
    hours: "с 7:00 до 17:00",
    price: { fresh: 14900, former: 14900, member: 13900 },
    features: ["Все групповые программы", "30 дней заморозки", "1 персональная тренировка", "2 гостевых визита"],
  },
  {
    id: "mornev12",
    name: "Утро-вечер на 12 месяцев",
    months: 12,
    days: 365,
    hours: "будни 6:00–13:00 и 20:30–23:45, выходные 6:30–23:00",
    price: { fresh: 15900, former: 15900, member: 14900 },
    features: ["Все групповые программы", "30 дней заморозки", "1 персональная тренировка", "2 гостевых визита"],
  },
  {
    id: "unlim6",
    name: "Безлимит на 6 месяцев",
    months: 6,
    days: 182,
    hours: "с открытия до закрытия клуба",
    price: { fresh: 14900, former: 13900, member: 13900 },
    features: ["Все групповые программы", "15 дней заморозки", "1 персональная тренировка", "2 гостевых визита"],
  },
  {
    id: "unlim3",
    name: "Безлимит на 3 месяца",
    months: 3,
    days: 91,
    hours: "с открытия до закрытия клуба",
    price: { fresh: 9900, former: 9900, member: 9900 },
    features: ["Все групповые программы", "1 персональная тренировка"],
  },
];

export const term = (id: Term["id"]) => terms.find((t) => t.id === id)!;
export const perDay = (rub: number, days: number) => Math.round(rub / days);
export const rub = (n: number) => `${n.toLocaleString("ru-RU").replace(/ /g, " ")} ₽`;

// Самая низкая цена дня для нового клиента (сейчас «Дневной на 12 месяцев»)
export const fromPerDay = Math.min(...terms.map((t) => perDay(t.price.fresh, t.days)));
// Самый дешёвый абонемент на срок
export const fromTerm = Math.min(...terms.map((t) => t.price.fresh));

export const personal = {
  pack: 10,
  price: 15300, // уточнить: на странице тренеров «10 занятий — 7000 ₽»
  firstFree: "Первая персональная тренировка бесплатно при покупке подписки",
};
