// Цели для Яндекс Метрики и GA4. Имена одинаковые во всех системах (website-conversion/analytics-events).
type Params = Record<string, string | number | undefined>;

declare global {
  interface Window {
    ym?: (id: number, method: string, ...args: unknown[]) => void;
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

const YM_ID = Number(process.env.NEXT_PUBLIC_YM_ID || 0);

export function track(goal: string, params: Params = {}) {
  if (typeof window === "undefined") return;
  const p = { page: location.pathname, ...params };
  try {
    if (YM_ID && window.ym) window.ym(YM_ID, "reachGoal", goal, p);
    if (window.gtag) window.gtag("event", goal, p);
    if (process.env.NODE_ENV !== "production") console.info("[goal]", goal, p);
  } catch {
    /* аналитика не должна ломать страницу */
  }
}
