import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const puppeteer = require('puppeteer-core');
const [n, w, h, dpr] = process.argv.slice(2);
const browser = await puppeteer.launch({ executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', headless: true, args: ['--hide-scrollbars'], protocolTimeout: 40000 });
const page = await browser.newPage();
await page.setViewport({ width: +w, height: +h, deviceScaleFactor: +dpr, isMobile: +w < 500, hasTouch: +w < 500 });
await page.goto(`http://localhost:4443/concepts/${n}/`, { waitUntil: 'load', timeout: 30000 }).catch((e) => console.log('goto', e.message));
await new Promise((r) => setTimeout(r, 2500));
try { await page.screenshot({ path: `/tmp/u210-c/${n}-${+w < 500 ? 'mobile' : 'desktop'}.jpg`, type: 'jpeg', quality: 72 }); console.log('ok'); } catch (e) { console.log('shot fail', e.message.slice(0, 100)); }
await browser.close();
