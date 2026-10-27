// Единый источник фактов о клубе. Контакты, часы, цены и юрданные меняются только здесь.
// Поля с пометкой «уточнить» на старом сайте противоречили друг другу: см. docs/open-questions.md.

export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://urban210.ru").replace(/\/$/, "");

export const site = {
  name: "Urban210",
  fullName: "Фитнес-клуб Urban210",
  city: "Хабаровск",
  district: "Железнодорожный район",
  address: {
    street: "проспект 60-летия Октября, 210", // уточнить: 210 или 210/4
    short: "пр. 60-летия Октября, 210",
    postalCode: "680009",
    locality: "Хабаровск",
    region: "Хабаровский край",
    lat: 48.495488,
    lng: 135.098167,
  },
  phone: { display: "+7 (4212) 95-09-20", href: "tel:+74212950920" },
  whatsapp: "79242054109",
  telegramBot: "urban210_bot",
  instagram: "https://www.instagram.com/fc.urban210",
  email: "info@urban210.ru",
  hours: [
    { days: "Пн–Пт", time: "06:30–23:30", schema: { days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], opens: "06:30", closes: "23:30" } },
    { days: "Сб–Вс", time: "07:30–22:30", schema: { days: ["Saturday", "Sunday"], opens: "07:30", closes: "22:30" } },
  ],
  parking: "Бесплатная парковка на 50 мест под видеонаблюдением",
  rating: { value: 4.7, count: "2000+", text: "2000+ отзывов" },
  maps: {
    yandex: "https://yandex.ru/maps/org/urban_210/122837663271/",
    yandexReviews: "https://yandex.ru/maps/org/urban_210/122837663271/reviews/",
    twoGis: "https://2gis.ru/khabarovsk/firm/70000001028822631/",
  },
  legal: {
    name: "ООО «Альянс»",
    inn: "2723055622",
    ogrn: "1032700450650",
    address: "680009, г. Хабаровск, пр-т 60-летия Октября, д. 210, лит. А, офис 306",
  },
  facts: {
    area: "более 1300 м²", // уточнить: на старом сайте 1300 и 1500
    machines: "60+ тренажёров", // уточнить: на старом сайте 60+ и 100+
    brands: "Technogym и Matrix", // уточнить: в FAQ упоминались Cybex и Nautilus
    groupHall: "зал групповых программ 150 м²",
    freeWeights: "свободные веса до 60 кг",
  },
} as const;

export function whatsappLink(text: string) {
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(text)}`;
}

export function telegramLink(start: string) {
  return `https://t.me/${site.telegramBot}?start=${encodeURIComponent(start.replace(/[^a-zA-Z0-9_-]/g, "_").slice(0, 64))}`;
}

export const nav = [
  { href: "/price/", label: "Тарифы" },
  { href: "/zal/", label: "Тренажёрный зал" },
  { href: "/group/", label: "Групповые" },
  { href: "/spa/", label: "SPA" },
  { href: "/trainers/", label: "Тренеры" },
  { href: "/promo/", label: "Акции" },
  { href: "/contacts/", label: "Контакты" },
] as const;
