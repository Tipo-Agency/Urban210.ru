// Весь JS сайта: шапка, меню, окно заявки, форма, появление блоков, слоган по словам, видео на первом экране.
// Без библиотек анимации: CSS-переходы и IntersectionObserver.

declare global {
  interface Window {
    ym?: (id: number, method: string, ...args: unknown[]) => void;
    call_value?: string;
  }
}

const KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content', 'yclid', 'gclid', 'fbclid'];
const STORE = 'u210_attr';

function goal(name: string, params: Record<string, string> = {}) {
  try {
    const id = Number(document.body.dataset.ym || 0);
    if (id && window.ym) window.ym(id, 'reachGoal', name, { page: location.pathname, ...params });
  } catch {
    /* аналитика не должна ломать страницу */
  }
}

function captureAttribution() {
  try {
    // Метки нового перехода из рекламы перезаписывают старые; без меток оставляем то, что уже сохранено
    const q = new URLSearchParams(location.search);
    if (sessionStorage.getItem(STORE) && !KEYS.some((k) => q.get(k))) return;
    const data: Record<string, string> = { landing: location.pathname + location.search, referrer: document.referrer || '' };
    for (const k of KEYS) {
      const v = q.get(k);
      if (v) data[k] = v.slice(0, 200);
    }
    sessionStorage.setItem(STORE, JSON.stringify(data));
  } catch {
    /* приватный режим */
  }
}

function readAttribution() {
  let data: Record<string, string> = {};
  try {
    data = JSON.parse(sessionStorage.getItem(STORE) || '{}');
  } catch {
    /* пусто */
  }
  const ym = document.cookie.match(/(?:^|; )_ym_uid=([^;]*)/);
  if (ym) data.ym_uid = decodeURIComponent(ym[1]);
  return data;
}

/* ---------- Телефон: маска +7 (___) ___-__-__ ---------- */
function digits(v: string) {
  let d = v.replace(/\D/g, '');
  if (d.startsWith('8')) d = '7' + d.slice(1);
  if (d && !d.startsWith('7')) d = '7' + d;
  return d.slice(0, 11);
}
function maskPhone(v: string) {
  const d = digits(v);
  if (!d) return '';
  const p = d.slice(1);
  let out = '+7';
  if (p.length) out += ' (' + p.slice(0, 3);
  if (p.length >= 3) out += ')';
  if (p.length > 3) out += ' ' + p.slice(3, 6);
  if (p.length > 6) out += '-' + p.slice(6, 8);
  if (p.length > 8) out += '-' + p.slice(8, 10);
  return out;
}

/* ---------- Форма ---------- */
function initForm(form: HTMLFormElement) {
  const opened = Date.now();
  const phone = form.querySelector<HTMLInputElement>('input[name=phone]')!;
  const name = form.querySelector<HTMLInputElement>('input[name=name]')!;
  const consent = form.querySelector<HTMLInputElement>('input[name=consent]')!;
  const msg = form.querySelector<HTMLElement>('[data-form-msg]')!;
  const btn = form.querySelector<HTMLButtonElement>('button[type=submit]')!;
  let started = false;

  phone.addEventListener('input', () => {
    phone.value = maskPhone(phone.value);
  });
  phone.addEventListener('focus', () => {
    if (!phone.value) phone.value = '+7 (';
  });
  phone.addEventListener('blur', () => {
    if (digits(phone.value).length <= 1) phone.value = '';
  });
  form.addEventListener('input', () => {
    if (!started) {
      started = true;
      goal('form_start', { block: (form.querySelector('input[name=block]') as HTMLInputElement | null)?.value || '' });
    }
  });

  const set = (field: string, bad: boolean) => form.querySelector(`[data-field=${field}]`)?.classList.toggle('bad', bad);

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    msg.className = 'form-msg';
    const okName = name.value.trim().length >= 2;
    const okPhone = digits(phone.value).length === 11;
    set('name', !okName);
    set('phone', !okPhone);
    set('consent', !consent.checked);
    if (!okName) return name.focus();
    if (!okPhone) return phone.focus();
    if (!consent.checked) return consent.focus();

    const fd = new FormData(form);
    const payload = {
      name: name.value.trim(),
      phone: phone.value,
      goal: String(fd.get('goal') || ''),
      block: String(fd.get('block') || ''),
      consent: true,
      website: String(fd.get('website') || ''),
      t: Date.now() - opened,
      page: location.pathname,
      url: location.href,
      ctSession: String(window.call_value || ''),
      attribution: readAttribution(),
    };
    btn.disabled = true;
    try {
      const res = await fetch('/api/lead/', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(payload) });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.ok) throw new Error(data.error || 'Не удалось отправить');
      form.classList.add('is-done');
      goal('lead', { goal: payload.goal, block: payload.block });
    } catch (err) {
      msg.textContent = (err as Error).message.startsWith('Не удалось') || (err as Error).message.startsWith('Слишком')
        ? (err as Error).message
        : 'Не удалось отправить заявку. Позвоните нам, пожалуйста.';
      msg.classList.add('is-err');
    } finally {
      btn.disabled = false;
    }
  });
}

/* ---------- Блокировка прокрутки (iOS не слушает overflow: hidden у body) ---------- */
let lockY = 0;
let locks = 0;
function lockScroll(on: boolean) {
  const b = document.body;
  if (on) {
    if (locks++ > 0) return;
    lockY = scrollY;
    b.style.top = `-${lockY}px`;
    b.classList.add('is-locked');
  } else {
    if (locks === 0 || --locks > 0) return;
    b.classList.remove('is-locked');
    b.style.top = '';
    const html = document.documentElement;
    const prev = html.style.scrollBehavior;
    html.style.scrollBehavior = 'auto';
    scrollTo(0, lockY);
    html.style.scrollBehavior = prev;
  }
}

/* ---------- Окно заявки ---------- */
function initDialog() {
  const dlg = document.querySelector<HTMLDialogElement>('[data-dialog]');
  if (!dlg || typeof dlg.showModal !== 'function') return;
  const form = dlg.querySelector<HTMLFormElement>('form')!;
  const title = dlg.querySelector<HTMLElement>('[data-form-title]')!;
  const goalInput = form.querySelector<HTMLInputElement>('input[name=goal]')!;
  const blockInput = form.querySelector<HTMLInputElement>('input[name=block]')!;

  document.addEventListener('click', (e) => {
    const a = (e.target as HTMLElement).closest<HTMLElement>('[data-lead]');
    if (!a) return;
    e.preventDefault();
    const g = a.dataset.lead || 'Заявка с сайта';
    goalInput.value = g;
    blockInput.value = a.dataset.block || 'dialog';
    title.textContent = g === 'Заявка с сайта' ? 'Оставить заявку' : g;
    form.classList.remove('is-done');
    closeMenu();
    dlg.showModal();
    lockScroll(true);
    goal('cta_click', { goal: g, block: blockInput.value });
    if (g.startsWith('Тариф')) goal('plan_choice', { plan: g });
    // На телефоне не открываем клавиатуру сразу: иначе iOS сдвигает форму и крестик уходит за экран
    if (!matchMedia('(max-width: 600px)').matches) setTimeout(() => form.querySelector<HTMLInputElement>('input[name=name]')?.focus(), 50);
    dlg.querySelector<HTMLElement>(':scope > div')?.scrollTo(0, 0);
  });
  dlg.addEventListener('close', () => lockScroll(false));
  dlg.querySelector('[data-close]')?.addEventListener('click', () => dlg.close());
  dlg.addEventListener('click', (e) => {
    if (e.target === dlg) dlg.close();
  });
}

/* ---------- Шапка и меню ---------- */
let closeMenu = () => {};
function initHeader() {
  const header = document.querySelector<HTMLElement>('[data-header]');
  const burger = document.querySelector<HTMLButtonElement>('[data-burger]');
  const menu = document.querySelector<HTMLElement>('[data-menu]');
  const mbar = document.querySelector<HTMLElement>('[data-mbar]');
  if (!header || !burger || !menu) {
    // страница со своей шапкой: оставляем только липкую панель на телефоне
    const tick = () => mbar?.classList.toggle('is-on', scrollY > innerHeight * 0.6);
    addEventListener('scroll', tick, { passive: true });
    tick();
    return;
  }
  let last = scrollY;
  let ticking = false;

  const update = () => {
    const y = scrollY;
    header.classList.toggle('is-solid', y > 40);
    const open = menu.classList.contains('is-open');
    header.classList.toggle('is-hidden', !open && y > 400 && y > last + 4);
    if (y < last - 4 || y < 400) header.classList.remove('is-hidden');
    mbar?.classList.toggle('is-on', y > innerHeight * 0.6);
    last = y;
    ticking = false;
  };
  addEventListener('scroll', () => {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(update);
    }
  }, { passive: true });
  update();

  const setOpen = (open: boolean) => {
    if (open === menu.classList.contains('is-open')) return;
    menu.classList.toggle('is-open', open);
    burger.setAttribute('aria-expanded', String(open));
    header.classList.remove('is-hidden');
    lockScroll(open);
    header.classList.toggle('is-solid', open || scrollY > 40);
  };
  closeMenu = () => setOpen(false);
  burger.addEventListener('click', () => setOpen(!menu.classList.contains('is-open')));
  menu.addEventListener('click', (e) => {
    if ((e.target as HTMLElement).closest('a')) setOpen(false);
  });
  addEventListener('keydown', (e) => {
    if (e.key === 'Escape') setOpen(false);
  });
}

/* ---------- Появление и слоган ---------- */
function initReveal() {
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const items = document.querySelectorAll<HTMLElement>('[data-rise]');
  if (reduce || !('IntersectionObserver' in window)) {
    items.forEach((el) => el.classList.add('in'));
  } else {
    const io = new IntersectionObserver((entries) => {
      for (const en of entries) {
        if (!en.isIntersecting) continue;
        en.target.classList.add('in');
        io.unobserve(en.target);
      }
    }, { rootMargin: '0px 0px -8% 0px' });
    items.forEach((el) => io.observe(el));
  }

  // Слоган: слова загораются по одному, пока блок проходит через середину экрана
  const mans = document.querySelectorAll<HTMLElement>('[data-words]');
  mans.forEach((m) => {
    const words = [...m.querySelectorAll<HTMLElement>('.w')];
    if (reduce) return words.forEach((w) => w.classList.add('on'));
    let raf = 0;
    const paint = () => {
      raf = 0;
      const r = m.getBoundingClientRect();
      const start = innerHeight * 0.85;
      const end = innerHeight * 0.35;
      const p = Math.min(1, Math.max(0, (start - r.top) / (start - end + r.height * 0.6)));
      const n = Math.round(p * words.length);
      words.forEach((w, i) => w.classList.toggle('on', i < n));
    };
    const io = new IntersectionObserver(([en]) => {
      if (en.isIntersecting) addEventListener('scroll', onScroll, { passive: true });
      else removeEventListener('scroll', onScroll);
      paint();
    });
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(paint);
    };
    io.observe(m);
  });
}

/* ---------- Видео первого экрана: только десктоп, после загрузки страницы ---------- */
function initHeroVideo() {
  const v = document.querySelector<HTMLVideoElement>('[data-hero-video]');
  if (!v) return;
  const conn = (navigator as Navigator & { connection?: { saveData?: boolean; effectiveType?: string } }).connection;
  if (conn?.saveData || /2g/.test(conn?.effectiveType || '')) return;
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const start = () => {
    // на телефоне видео не грузим: первый экран держит постер, трафик и батарея целее
    if (!matchMedia('(min-width: 900px)').matches) return;
    const src = v.dataset.src;
    if (!src) return;
    v.src = src;
    v.addEventListener('playing', () => v.classList.add('is-on'), { once: true });
    v.play().catch(() => {});
  };
  if (document.readyState === 'complete') setTimeout(start, 600);
  else addEventListener('load', () => setTimeout(start, 600), { once: true });
}

/* ---------- Карта и 3D-тур грузятся по клику ---------- */
function initDeferredFrames() {
  document.querySelectorAll<HTMLButtonElement>('[data-frame]').forEach((b) => {
    b.addEventListener('click', () => {
      const f = document.createElement('iframe');
      f.src = b.dataset.frame!;
      f.title = b.dataset.title || '';
      f.allow = 'fullscreen; xr-spatial-tracking';
      f.allowFullscreen = true;
      b.replaceWith(f);
    });
  });
}

export function boot() {
  captureAttribution();
  initHeader();
  initDialog();
  document.querySelectorAll<HTMLFormElement>('[data-form]').forEach(initForm);
  initReveal();
  initHeroVideo();
  initDeferredFrames();
  document.addEventListener('click', (e) => {
    const a = (e.target as HTMLElement).closest<HTMLAnchorElement>('a[href^="tel:"], a[href*="max.ru"], a[href*="t.me"]');
    if (!a) return;
    goal(a.href.startsWith('tel:') ? 'call_click' : a.href.includes('max.ru') ? 'max_click' : 'telegram_click');
  });
}
