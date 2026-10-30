import type { APIRoute } from 'astro';

// Приём заявок: Telegram администраторов и webhook CRM. Ключи только из переменных окружения сервера.
export const prerender = false;

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

const env = (k: string) => process.env[k] || '';
const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const str = (v: unknown, max: number) => (typeof v === 'string' ? v.trim().slice(0, max) : '');
const json = (data: unknown, status = 200) => new Response(JSON.stringify(data), { status, headers: { 'content-type': 'application/json' } });

type Lead = { name: string; phone: string; goal: string; block: string; page: string; attribution: Record<string, string> };

function normPhone(v: string) {
  let d = v.replace(/\D/g, '');
  if (d.length === 10) d = '7' + d;
  if (d.length === 11 && d.startsWith('8')) d = '7' + d.slice(1);
  return d.length === 11 && d.startsWith('7') ? d : '';
}
const fmt = (d: string) => `+7 (${d.slice(1, 4)}) ${d.slice(4, 7)}-${d.slice(7, 9)}-${d.slice(9, 11)}`;

function telegramText(l: Lead) {
  const time = new Date().toLocaleString('ru-RU', { timeZone: 'Asia/Vladivostok', dateStyle: 'short', timeStyle: 'short' });
  const a = l.attribution;
  const utm = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'].filter((k) => a[k]).map((k) => `${k.replace('utm_', '')}: ${esc(a[k])}`).join(' · ');
  return [
    `<b>Заявка с urban210.ru</b>`,
    `<b>${esc(l.goal)}</b>`,
    '',
    `Имя: ${esc(l.name)}`,
    `Телефон: ${fmt(l.phone)}`,
    '',
    `Страница: ${esc(l.page || '/')}${l.block ? ` · блок ${esc(l.block)}` : ''}`,
    utm && `UTM: ${utm}`,
    a.yclid && `yclid: ${esc(a.yclid)}`,
    a.referrer && `Откуда: ${esc(a.referrer)}`,
    `Время (Хабаровск): ${time}`,
  ].filter((x) => x !== undefined && x !== false).join('\n');
}

async function sendTelegram(l: Lead) {
  const token = env('TELEGRAM_BOT_TOKEN');
  const chat = env('TELEGRAM_CHAT_ID');
  if (!token || !chat) return false;
  const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ chat_id: chat, text: telegramText(l), parse_mode: 'HTML', disable_web_page_preview: true }),
    signal: AbortSignal.timeout(8000),
  });
  if (!res.ok) throw new Error(`telegram ${res.status}`);
  return true;
}

async function sendWebhook(l: Lead) {
  const url = env('LEADS_WEBHOOK_URL');
  if (!url) return false;
  const headers: Record<string, string> = { 'content-type': 'application/json' };
  if (env('LEADS_WEBHOOK_TOKEN')) headers.authorization = `Bearer ${env('LEADS_WEBHOOK_TOKEN')}`;
  const res = await fetch(url, {
    method: 'POST',
    headers,
    body: JSON.stringify({ source: 'urban210.ru', name: l.name, phone: '+' + l.phone, goal: l.goal, page: l.page, block: l.block, ...l.attribution, created_at: new Date().toISOString() }),
    signal: AbortSignal.timeout(8000),
  });
  if (!res.ok) throw new Error(`webhook ${res.status}`);
  return true;
}

export const POST: APIRoute = async ({ request, clientAddress }) => {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return json({ ok: false, error: 'Некорректный запрос' }, 400);
  }

  const name = str(body.name, 80);
  const phone = normPhone(str(body.phone, 40));
  const fields: Record<string, string> = {};
  if (name.length < 2) fields.name = 'Напишите имя';
  if (!phone) fields.phone = 'Проверьте номер: нужно 10 цифр после +7';
  if (body.consent !== true) fields.consent = 'Нужно согласие на обработку данных';
  if (Object.keys(fields).length) return json({ ok: false, fields, error: Object.values(fields)[0] }, 422);

  // Боты: заполнили скрытое поле или отправили быстрее 3 секунд. Отвечаем успехом и ничего не шлём.
  if (str(body.website, 200) || (typeof body.t === 'number' && body.t < 3000)) return json({ ok: true });

  const ip = (request.headers.get('x-forwarded-for') || '').split(',')[0].trim() || clientAddress || 'local';
  if (limited(ip)) return json({ ok: false, error: 'Слишком много заявок. Позвоните нам.' }, 429);

  const attribution: Record<string, string> = {};
  if (body.attribution && typeof body.attribution === 'object') {
    for (const [k, v] of Object.entries(body.attribution as Record<string, unknown>).slice(0, 20)) {
      const s = str(v, 300);
      if (s) attribution[k.slice(0, 40)] = s;
    }
  }
  const lead: Lead = { name, phone, goal: str(body.goal, 60) || 'Пробный день за 1 ₽', block: str(body.block, 40), page: str(body.page, 200), attribution };

  const results = await Promise.allSettled([sendTelegram(lead), sendWebhook(lead)]);
  const delivered = results.some((r) => r.status === 'fulfilled' && r.value === true);
  results.forEach((r) => r.status === 'rejected' && console.error('[lead]', r.reason));
  if (!delivered) {
    console.error('[lead] не доставлена ни в один канал', { goal: lead.goal, page: lead.page });
    return json({ ok: false, error: 'Не удалось отправить. Позвоните нам, пожалуйста.' }, 503);
  }
  return json({ ok: true });
};
