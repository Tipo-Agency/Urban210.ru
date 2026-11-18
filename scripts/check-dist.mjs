// Проверка готовой сборки dist/client: битые внутренние ссылки и картинки, OG-картинки,
// дубли title и description, ровно один H1, canonical, alt у картинок, sitemap без лишних и пропущенных адресов.
// Запуск после npm run build: npm run check:dist
import { readdirSync, readFileSync, statSync, existsSync } from 'node:fs';
import { join, relative } from 'node:path';

const root = new URL('../dist/client/', import.meta.url).pathname;
if (!existsSync(root)) {
  console.error('Нет dist/client: сначала npm run build');
  process.exit(1);
}

const walk = (d) => readdirSync(d).flatMap((f) => (statSync(join(d, f)).isDirectory() ? walk(join(d, f)) : [join(d, f)]));
const files = walk(root);
// Страницы сайта: index.html и 404.html (файлы подтверждения Вебмастера пропускаем)
const htmls = files.filter((f) => f.endsWith('/index.html') || f.endsWith('/404.html'));
const toUrl = (f) => '/' + relative(root, f).replace(/index\.html$/, '').replace(/\.html$/, '/');
const exists = (p) => {
  const clean = decodeURIComponent(p.split('#')[0].split('?')[0]);
  if (clean === '' || clean === '/') return true;
  const f = join(root, clean);
  return existsSync(f) && statSync(f).isFile() ? true : existsSync(join(f, 'index.html'));
};
// Адреса, которые отдаёт сервер, а не статика
const serverOnly = ['/api/lead/'];

const errors = [];
const titles = new Map();
const descs = new Map();
let links = 0;

for (const f of htmls) {
  const url = toUrl(f);
  const html = readFileSync(f, 'utf8');
  const is404 = url === '/404/';
  const noindex = /<meta name="robots" content="noindex/.test(html);
  const title = html.match(/<title>([^<]*)<\/title>/)?.[1];
  const desc = html.match(/<meta name="description" content="([^"]*)"/)?.[1];
  const h1 = (html.match(/<h1[\s>]/g) || []).length;
  const canonical = html.match(/<link rel="canonical" href="([^"]+)"/)?.[1];
  const og = html.match(/<meta property="og:image" content="https?:\/\/[^/]+([^"]+)"/)?.[1];

  if (!title) errors.push(`${url}: нет title`);
  else if (!is404 && !noindex) titles.set(title, [...(titles.get(title) || []), url]);
  if (!desc) errors.push(`${url}: нет description`);
  else if (!is404 && !noindex) descs.set(desc, [...(descs.get(desc) || []), url]);
  if (h1 !== 1) errors.push(`${url}: H1 ${h1} шт.`);
  if (!is404 && !canonical?.endsWith(url)) errors.push(`${url}: canonical ${canonical}`);
  if (og && !exists(og)) errors.push(`${url}: нет og:image ${og}`);

  for (const [, tag] of html.matchAll(/<img\b([^>]*)>/g)) {
    if (!/\salt="/.test(tag)) errors.push(`${url}: img без alt`);
    const src = tag.match(/\ssrc="(\/[^"]+)"/)?.[1];
    if (src && !exists(src)) errors.push(`${url}: нет картинки ${src}`);
  }
  for (const [, href] of html.matchAll(/\shref="(\/[^"]*)"/g)) {
    if (href.startsWith('//')) continue;
    links++;
    const path = href.split('#')[0].split('?')[0];
    if (serverOnly.includes(path)) continue;
    if (!exists(path)) errors.push(`${url}: битая ссылка ${href}`);
    else if (path && !path.endsWith('/') && !/\.[a-z0-9]+$/i.test(path)) errors.push(`${url}: ссылка без слеша ${href}`);
  }
}

for (const [t, urls] of titles) if (urls.length > 1) errors.push(`дубль title «${t}»: ${urls.join(', ')}`);
for (const [d, urls] of descs) if (urls.length > 1) errors.push(`дубль description: ${urls.join(', ')}`);

// sitemap: каждый адрес существует, каждая индексируемая страница в sitemap
const sm = readFileSync(join(root, 'sitemap.xml'), 'utf8');
const smUrls = [...sm.matchAll(/<loc>https?:\/\/[^/]+([^<]*)<\/loc>/g)].map((m) => m[1]);
for (const u of smUrls) if (!exists(u)) errors.push(`sitemap: нет страницы ${u}`);
const pages = htmls.map(toUrl).filter((u) => u !== '/404/' && !/<meta name="robots" content="noindex/.test(readFileSync(join(root, u, 'index.html'), 'utf8')));
for (const u of pages) if (!smUrls.includes(u)) errors.push(`sitemap: нет адреса ${u}`);

for (const e of errors) console.log(e);
console.log(`Страниц: ${htmls.length}, в sitemap: ${smUrls.length}, внутренних ссылок: ${links}. Ошибок: ${errors.length}`);
process.exit(errors.length ? 1 : 0);
