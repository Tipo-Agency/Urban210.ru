// UTM и идентификаторы кликов с первой страницы визита. Уходят вместе с заявкой в Telegram и CRM.
const KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content", "yclid", "gclid", "fbclid"] as const;
const STORE = "u210_attr";

export type Attribution = Partial<Record<(typeof KEYS)[number] | "landing" | "referrer" | "ym_uid" | "ga_cid", string>>;

export function captureAttribution() {
  try {
    if (sessionStorage.getItem(STORE)) return;
    const q = new URLSearchParams(location.search);
    const data: Attribution = { landing: location.pathname + location.search, referrer: document.referrer || "" };
    for (const k of KEYS) {
      const v = q.get(k);
      if (v) data[k] = v.slice(0, 200);
    }
    sessionStorage.setItem(STORE, JSON.stringify(data));
  } catch {
    /* приватный режим */
  }
}

function cookie(name: string) {
  const m = document.cookie.match(new RegExp("(?:^|; )" + name + "=([^;]*)"));
  return m ? decodeURIComponent(m[1]) : "";
}

export function readAttribution(): Attribution {
  let data: Attribution = {};
  try {
    data = JSON.parse(sessionStorage.getItem(STORE) || "{}");
  } catch {
    /* пусто */
  }
  const ym = cookie("_ym_uid");
  const ga = cookie("_ga").split(".").slice(-2).join(".");
  if (ym) data.ym_uid = ym;
  if (ga) data.ga_cid = ga;
  return data;
}
