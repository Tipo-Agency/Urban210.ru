import { z } from "zod";

export const GOALS = [
  "Пробный день за 1 ₽",
  "Дневная карта",
  "Полный день",
  "Всё включено",
  "Персональные тренировки",
  "Trade-in за 999 ₽",
  "Акция 1+1",
  "Вопрос",
] as const;

export const leadSchema = z.object({
  name: z.string().trim().min(2, "Напишите имя").max(80),
  phone: z
    .string()
    .trim()
    .transform((v) => v.replace(/\D/g, ""))
    .transform((d) => (d.length === 10 ? "7" + d : d.length === 11 && d.startsWith("8") ? "7" + d.slice(1) : d))
    .refine((d) => d.length === 11 && d.startsWith("7"), "Проверьте номер: нужно 10 цифр после +7"),
  goal: z.string().max(60).default("Пробный день за 1 ₽"),
  comment: z.string().max(1000).optional().default(""),
  consent: z.literal(true, { error: "Нужно согласие на обработку данных" }),
  block: z.string().max(40).optional().default(""),
  page: z.string().max(200).optional().default(""),
  website: z.string().optional().default(""), // honeypot
  t: z.number().optional(), // сколько мс форма была открыта
  attribution: z.record(z.string(), z.string().max(300)).optional().default({}),
});

export type LeadInput = z.input<typeof leadSchema>;
export type Lead = z.output<typeof leadSchema>;

export function formatPhone(d: string) {
  return `+7 (${d.slice(1, 4)}) ${d.slice(4, 7)}-${d.slice(7, 9)}-${d.slice(9, 11)}`;
}
