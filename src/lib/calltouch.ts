// Дубль заявки в Calltouch, как на старом сайте: публичный endpoint заявок с sessionId из счётчика.
const SITE_ID = process.env.NEXT_PUBLIC_CALLTOUCH_SITE_ID;

declare global {
  interface Window {
    call_value?: string;
  }
}

export function sendCalltouch(lead: { name: string; phone: string; goal: string }) {
  if (!SITE_ID || typeof window === "undefined") return;
  const data: Record<string, string | undefined> = {
    fio: lead.name,
    phoneNumber: lead.phone,
    subject: `Заявка с ${location.hostname}: ${lead.goal}`,
    requestUrl: location.href,
    sessionId: window.call_value,
  };
  const body = Object.entries(data)
    .filter(([, v]) => v)
    .map(([k, v]) => `${k}=${encodeURIComponent(v as string)}`)
    .join("&");
  fetch(`https://api.calltouch.ru/calls-service/RestAPI/requests/${SITE_ID}/register/`, {
    method: "POST",
    headers: { "content-type": "application/x-www-form-urlencoded;charset=utf-8" },
    body,
    keepalive: true,
  }).catch(() => {});
}
