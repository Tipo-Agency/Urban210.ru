import { NextResponse } from "next/server";
import { formatPhone, leadSchema, type Lead } from "@/lib/lead";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const hits = new Map<string, number[]>();
const WINDOW = 10 * 60 * 1000;
const LIMIT = 5;

function limited(ip: string) {
  const now = Date.now();
  const list = (hits.get(ip) || []).filter((t) => now - t < WINDOW);
  list.push(now);
  hits.set(ip, list);
  if (hits.size > 5000) hits.clear();
  return list.length > LIMIT;
}

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

function telegramText(lead: Lead) {
  const time = new Date().toLocaleString("ru-RU", { timeZone: "Asia/Vladivostok", dateStyle: "short", timeStyle: "short" });
  const a = lead.attribution;
  const utm = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"]
    .filter((k) => a[k])
    .map((k) => `${k.replace("utm_", "")}: ${esc(a[k])}`)
    .join(" · ");
  return [
    `<b>Заявка с urban210.ru</b>`,
    `<b>${esc(lead.goal)}</b>`,
    ``,
    `Имя: ${esc(lead.name)}`,
    `Телефон: ${formatPhone(lead.phone)}`,
    lead.comment ? `Комментарий: ${esc(lead.comment)}` : "",
    ``,
    `Страница: ${esc(lead.page || "/")}${lead.block ? ` · блок ${esc(lead.block)}` : ""}`,
    utm ? `UTM: ${utm}` : "",
    a.yclid ? `yclid: ${esc(a.yclid)}` : "",
    a.referrer ? `Откуда: ${esc(a.referrer)}` : "",
    `Время (Хабаровск): ${time}`,
  ]
    .filter((l, i, arr) => l !== "" || (arr[i - 1] ?? "") !== "")
    .join("\n");
}

async function sendTelegram(lead: Lead) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chat = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chat) return false;
  const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ chat_id: chat, text: telegramText(lead), parse_mode: "HTML", disable_web_page_preview: true }),
    signal: AbortSignal.timeout(8000),
  });
  if (!res.ok) throw new Error(`telegram ${res.status}`);
  return true;
}

async function sendWebhook(lead: Lead) {
  const url = process.env.LEADS_WEBHOOK_URL;
  if (!url) return false;
  const headers: Record<string, string> = { "content-type": "application/json" };
  if (process.env.LEADS_WEBHOOK_TOKEN) headers.authorization = `Bearer ${process.env.LEADS_WEBHOOK_TOKEN}`;
  const res = await fetch(url, {
    method: "POST",
    headers,
    body: JSON.stringify({
      source: "urban210.ru",
      name: lead.name,
      phone: "+" + lead.phone,
      goal: lead.goal,
      comment: lead.comment,
      page: lead.page,
      block: lead.block,
      ...lead.attribution,
      created_at: new Date().toISOString(),
    }),
    signal: AbortSignal.timeout(8000),
  });
  if (!res.ok) throw new Error(`webhook ${res.status}`);
  return true;
}

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Некорректный запрос" }, { status: 400 });
  }

  const parsed = leadSchema.safeParse(body);
  if (!parsed.success) {
    const fields: Record<string, string> = {};
    for (const issue of parsed.error.issues) fields[String(issue.path[0])] ??= issue.message;
    return NextResponse.json({ ok: false, fields }, { status: 422 });
  }
  const lead = parsed.data;

  // Боты: заполнили скрытое поле или отправили быстрее 3 секунд. Отвечаем успехом и ничего не шлём.
  if (lead.website || (typeof lead.t === "number" && lead.t < 3000)) return NextResponse.json({ ok: true });

  const ip = (req.headers.get("x-forwarded-for") || "").split(",")[0].trim() || "local";
  if (limited(ip)) return NextResponse.json({ ok: false, error: "Слишком много заявок. Позвоните нам." }, { status: 429 });

  const results = await Promise.allSettled([sendTelegram(lead), sendWebhook(lead)]);
  const delivered = results.some((r) => r.status === "fulfilled" && r.value === true);
  results.forEach((r) => r.status === "rejected" && console.error("[lead]", r.reason));

  if (!delivered) {
    console.error("[lead] не доставлена ни в один канал", { goal: lead.goal, page: lead.page });
    return NextResponse.json({ ok: false, error: "Не удалось отправить. Позвоните или напишите в WhatsApp." }, { status: 503 });
  }
  return NextResponse.json({ ok: true });
}
