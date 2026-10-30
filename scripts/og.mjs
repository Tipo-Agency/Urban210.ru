// Картинки для превью ссылок (Open Graph) 1200×630 в public/og/*.jpg через системный Chrome.
// npm run og  → default, home, price, zones, trainers и blog-<slug> для каждой статьи src/content/blog/*.md.
// Шрифт Geologica и фото берутся из проекта по file://. Обложка статьи: поле image во frontmatter
// (/images/x.jpg ищется в src/assets/images и public), если файла нет, ставим zal.jpg.
import { createRequire } from 'node:module';
import { readFileSync, readdirSync, writeFileSync, mkdirSync, existsSync, statSync, copyFileSync, rmSync, mkdtempSync } from 'node:fs';
import { join, dirname, resolve } from 'node:path';
import { tmpdir } from 'node:os';
import { fileURLToPath, pathToFileURL } from 'node:url';

const require = createRequire(import.meta.url);
const puppeteer = require('puppeteer-core');

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const out = join(root, 'public/og');
const imgDir = join(root, 'src/assets/images');
const url = (p) => pathToFileURL(p).href;
// Цена дня из src/data/pricing.ts (самая доступная карта): обновить вместе с ценами
const DAY_PRICE = 43;

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
// Неразрывные пробелы после коротких слов и перед ₽, чтобы не оставались висячие предлоги
const typo = (s) => esc(s).replace(/(?<=^|[\s ])([а-яёa-z0-9]{1,2}) /gi, '$1 ').replace(/ ₽/g, ' ₽').replace(/ —/g, ' —');

const logomark = readFileSync(join(root, 'public/logomark.svg'), 'utf8');

function html({ title, label, photo, pos = 'center 30%' }) {
  return `<!doctype html><html lang="ru"><head><meta charset="utf-8"><style>
@font-face { font-family: G; font-weight: 100 900; src: url('${url(join(root, 'public/fonts/geologica-cyrillic.woff2'))}') format('woff2'); unicode-range: U+0301, U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116; }
@font-face { font-family: G; font-weight: 100 900; src: url('${url(join(root, 'public/fonts/geologica-latin.woff2'))}') format('woff2'); unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+20BD, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD; }
* { box-sizing: border-box; margin: 0; padding: 0; }
html, body { width: 1200px; height: 630px; background: #000; overflow: hidden; }
body { font-family: G, sans-serif; color: #f4f2ee; position: relative; }
.left { position: absolute; left: 36px; top: 36px; width: 680px; height: 558px; display: flex; flex-direction: column; gap: 22px; }
.logo { display: flex; align-items: center; gap: 12px; height: 52px; font-weight: 800; font-size: 40px; letter-spacing: -0.03em; line-height: 1; }
.logo b { color: #ff5722; font-weight: 800; margin-left: -10px; }
.logo svg { width: 48px; height: 48px; margin-left: -12px; }
.card { flex: 1; min-height: 0; background: #ff5722; border-radius: 32px; padding: 34px 40px 36px; display: flex; flex-direction: column; color: #000; }
.label { align-self: flex-start; font-size: 19px; font-weight: 600; letter-spacing: 0.01em; border: 2px solid #000; border-radius: 999px; padding: 6px 16px 7px; margin-bottom: 22px; }
.hwrap { flex: 1; min-height: 0; margin-bottom: 18px; display: flex; align-items: flex-start; }
h1 { font-weight: 800; letter-spacing: -0.045em; line-height: 0.98; font-size: 84px; text-wrap: pretty; hyphens: manual; }
.foot { font-size: 21px; font-weight: 600; letter-spacing: -0.005em; padding-right: 210px; }
.photo { position: absolute; right: 36px; top: 36px; width: 428px; height: 558px; border-radius: 32px; overflow: hidden; background: #111; }
.photo img { width: 100%; height: 100%; object-fit: cover; object-position: ${pos}; display: block; }
.sticker { position: absolute; left: 520px; bottom: 58px; transform: rotate(-6deg); background: #000; color: #f4f2ee; border: 3px solid #f4f2ee; border-radius: 999px; padding: 14px 28px 16px; font-weight: 800; font-size: 34px; letter-spacing: -0.03em; white-space: nowrap; box-shadow: 0 10px 0 rgb(0 0 0 / 0.35); }
.sticker b { color: #ff5722; font-weight: 800; }
</style></head><body>
<div class="left">
  <div class="logo">URBAN<b>210</b>${logomark}</div>
  <div class="card">
    ${label ? `<div class="label">${esc(label)}</div>` : ''}
    <div class="hwrap"><h1>${typo(title)}</h1></div>
    <div class="foot">Urban210 · фитнес-клуб · Хабаровск</div>
  </div>
</div>
<div class="photo"><img src="${url(photo)}" alt=""></div>
<div class="sticker">от <b>${DAY_PRICE} ₽</b> в день</div>
</body></html>`;
}

// frontmatter без зависимостей: только title, image, category
function front(file) {
  const m = readFileSync(file, 'utf8').match(/^---\n([\s\S]*?)\n---/);
  const get = (k) => {
    const r = m?.[1].match(new RegExp(`^${k}:\\s*(.+)$`, 'm'));
    if (!r) return undefined;
    let v = r[1].trim();
    if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))) v = v.slice(1, -1);
    return v.replace(/\\"/g, '"');
  };
  return { title: get('title'), image: get('image'), category: get('category') };
}

function cover(image) {
  const fallback = join(imgDir, 'zal.jpg');
  if (!image || !/\.(jpe?g|png|webp)$/i.test(image)) return fallback;
  const rel = image.replace(/^\//, '');
  const cands = [join(root, 'src/assets', rel), join(imgDir, rel.replace(/^images\//, '')), join(root, 'public', rel)];
  return cands.find((p) => existsSync(p)) || fallback;
}

const jobs = [
  { name: 'default', title: `Безлимит в зал от ${DAY_PRICE} ₽ в день`, photo: join(imgDir, 'zal.jpg'), pos: 'center 40%' },
  { name: 'home', title: `Фитнес-клуб с безлимитом от ${DAY_PRICE} ₽ в день`, photo: join(imgDir, 'hero.jpg'), pos: '50% 65%' },
  { name: 'price', title: 'Цены на абонементы', label: 'Три карты с безлимитом', photo: join(imgDir, 'reception.jpg'), pos: 'center 35%' },
  { name: 'zones', title: 'Зоны клуба', label: 'Зал, кардио, групповые, сауна', photo: join(imgDir, 'free-weights.jpg'), pos: 'center 35%' },
  { name: 'trainers', title: 'Тренеры клуба', label: 'Персональные тренировки', photo: join(imgDir, 'trainers/lazko.jpg'), pos: 'center 12%' },
];
const blogDir = join(root, 'src/content/blog');
for (const f of readdirSync(blogDir).filter((f) => f.endsWith('.md')).sort()) {
  const d = front(join(blogDir, f));
  jobs.push({ name: `blog-${f.replace(/\.md$/, '')}`, title: d.title || 'Блог Urban210', label: d.category, photo: cover(d.image), pos: 'center 30%' });
}

const only = process.argv.slice(2);
const todo = only.length ? jobs.filter((j) => only.some((o) => j.name.includes(o))) : jobs;
mkdirSync(out, { recursive: true });
const tmp = mkdtempSync(join(tmpdir(), 'og-'));
const browser = await puppeteer.launch({ executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', headless: true, args: ['--hide-scrollbars', '--allow-file-access-from-files'] });
const page = await browser.newPage();
await page.setViewport({ width: 1200, height: 630, deviceScaleFactor: 1 });
let total = 0;
for (const job of todo) {
  const file = join(tmp, `${job.name}.html`);
  writeFileSync(file, html(job));
  await page.goto(url(file), { waitUntil: 'load' });
  await page.evaluate(async () => {
    await document.fonts.ready;
    await Promise.all([...document.images].map((i) => i.decode().catch(() => {})));
    // Заголовок уменьшаем, пока не влезет в карточку по высоте и ширине
    const h = document.querySelector('h1'), box = h.parentElement;
    let size = 84;
    while (size > 34 && (h.scrollHeight > box.clientHeight || h.scrollWidth > box.clientWidth)) { size -= 2; h.style.fontSize = size + 'px'; }
  });
  const path = join(out, `${job.name}.jpg`);
  let q = 82;
  await page.screenshot({ path, type: 'jpeg', quality: q });
  while (statSync(path).size > 200 * 1024 && q > 50) { q -= 6; await page.screenshot({ path, type: 'jpeg', quality: q }); }
  total += statSync(path).size;
  console.log('ok', job.name, Math.round(statSync(path).size / 1024) + ' KB', q !== 82 ? `q${q}` : '');
}
await browser.close();
rmSync(tmp, { recursive: true, force: true });
// JSON-LD ссылается на /og.jpg: держим там копию default
if (todo.some((j) => j.name === 'default')) copyFileSync(join(out, 'default.jpg'), join(root, 'public/og.jpg'));
console.log(`${todo.length} images, ${Math.round(total / 1024)} KB`);
