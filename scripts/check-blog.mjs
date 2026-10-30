// Проверка статей: длина, длинное тире, описание, ссылки на существующие страницы и статьи.
import { readdirSync, readFileSync } from 'node:fs';

const dir = new URL('../src/content/blog/', import.meta.url);
const files = readdirSync(dir).filter((f) => f.endsWith('.md'));
const slugs = new Set(files.map((f) => f.replace(/\.md$/, '')));
const pages = new Set(['/', '/price/', '/zal/', '/zones/', '/zones/cardio/', '/zones/free-weights/', '/zones/functional/', '/group/', '/spa/', '/trainers/', '/personal/', '/promo/', '/promo/trade-in/', '/promo/1-plus-1/', '/contacts/', '/virtual-tour/', '/blog/', '/policy/', '/rules/', '/oferta/']);
let bad = 0;
const words = [];
for (const f of files) {
  const raw = readFileSync(new URL(f, dir), 'utf8');
  const m = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  const errs = [];
  if (!m) errs.push('нет frontmatter');
  else {
    const body = m[2];
    const n = body.split(/\s+/).filter(Boolean).length;
    words.push(n);
    if (n < 700) errs.push(`мало слов: ${n}`);
    if (raw.includes('—')) errs.push('длинное тире');
    const desc = m[1].match(/^description:\s*"(.*)"\s*$/m)?.[1] || '';
    if (desc.length < 100 || desc.length > 200) errs.push(`description ${desc.length} знаков`);
    for (const [, href] of body.matchAll(/\]\((\/[^)\s#]*)/g)) {
      const blog = href.match(/^\/blog\/([^/]+)\/?$/);
      if (blog ? !slugs.has(blog[1]) : !pages.has(href.endsWith('/') ? href : href + '/')) errs.push(`битая ссылка ${href}`);
    }
  }
  if (errs.length) {
    bad++;
    console.log(`${f}: ${errs.join('; ')}`);
  }
}
words.sort((a, b) => a - b);
console.log(`Статей: ${files.length}, слов от ${words[0]} до ${words[words.length - 1]}, медиана ${words[Math.floor(words.length / 2)]}. С ошибками: ${bad}`);
process.exit(bad ? 1 : 0);
