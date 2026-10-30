import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const puppeteer = require('puppeteer-core');
const map = { '05':'#price','25':'.ap-try','26':'.nm-coupon','27':'.vh-offer','28':'.rz-flood','29':'.lq-offer','30':'.p-offer','31':'.sv-offer','32':'.cf-extra','33':'.rl-offer','34':'.rm-offer-dev','35':'.ma-offer' };
const only = process.argv.slice(2);
const browser = await puppeteer.launch({ executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', headless: true, args: ['--hide-scrollbars'], protocolTimeout: 40000 });
for (const [n, sel] of Object.entries(map)) {
  if (only.length && !only.includes(n)) continue;
  for (const [tag, vp] of [['d', { width: 1440, height: 900 }], ['m', { width: 390, height: 844, isMobile: true, hasTouch: true }]]) {
    const page = await browser.newPage();
    await page.setViewport(vp);
    await page.goto(`http://localhost:4443/concepts/${n}/`, { waitUntil: 'load', timeout: 30000 }).catch(() => {});
    await page.evaluate(async (sel) => { for (let y = 0; y < document.body.scrollHeight; y += 500) { scrollTo(0, y); await new Promise((r) => setTimeout(r, 60)); } const e = document.querySelector(sel); e && e.scrollIntoView({ block: 'center' }); }, sel);
    await new Promise((r) => setTimeout(r, 1800));
    await page.screenshot({ path: `/tmp/u210-c/blk-${n}-${tag}.jpg`, type: 'jpeg', quality: 60 });
    const ow = await page.evaluate(() => document.documentElement.scrollWidth - innerWidth);
    console.log(n, tag, 'overflowX', ow);
    await page.close();
  }
}
await browser.close();
