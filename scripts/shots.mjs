// Скриншоты страниц через системный Chrome (puppeteer-core из lighthouse).
// node scripts/shots.mjs <папка> имя=url [имя=url ...] [--full]
// Сохраняет <имя>-desktop.jpg (1440×900), <имя>-mobile.jpg (390×844, @2x) и с --full <имя>-desktop-full.jpg, <имя>-mobile-full.jpg.
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const puppeteer = require('puppeteer-core');
const args = process.argv.slice(2);
const out = args.shift();
const full = args.includes('--full');
const pairs = args.filter((a) => a.includes('='));
const browser = await puppeteer.launch({ executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', headless: true, args: ['--hide-scrollbars'] });
for (const pair of pairs) {
  const i = pair.indexOf('=');
  const name = pair.slice(0, i), url = pair.slice(i + 1);
  for (const [tag, vp] of [['desktop', { width: 1440, height: 900, deviceScaleFactor: 1 }], ['mobile', { width: 390, height: 844, deviceScaleFactor: 2, isMobile: true, hasTouch: true }]]) {
    const page = await browser.newPage();
    try {
      await page.setViewport(vp);
      await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 }).catch(() => {});
      await new Promise((r) => setTimeout(r, 2500));
      await page.screenshot({ path: `${out}/${name}-${tag}.jpg`, type: 'jpeg', quality: 72 });
      if (full) {
        await page.evaluate(async () => { for (let y = 0; y < document.body.scrollHeight; y += 400) { scrollTo(0, y); await new Promise((r) => setTimeout(r, 150)); } scrollTo(0, 0); });
        await new Promise((r) => setTimeout(r, 1500));
        // длинная страница в 2x упирается в предел Chrome 16384px и повторяет верх, поэтому целиком снимаем в 1x
        if (vp.deviceScaleFactor > 1) await page.setViewport({ ...vp, deviceScaleFactor: 1 });
        await page.screenshot({ path: `${out}/${name}-${tag}-full.jpg`, type: 'jpeg', quality: 60, fullPage: true });
      }
      console.log('ok', name, tag);
    } catch (e) {
      console.log('fail', name, tag, e.message.slice(0, 120));
    }
    await page.close();
  }
}
await browser.close();
