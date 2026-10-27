// Проверка собранных страниц: один H1, title, description, canonical, без «уточнить» в тексте.
// Запуск после `npm run build`: npm test
import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync, readdirSync, statSync } from "node:fs";
import path from "node:path";

const ROOT = ".next/server/app";
function walk(dir) {
  return readdirSync(dir).flatMap((f) => {
    const p = path.join(dir, f);
    return statSync(p).isDirectory() ? walk(p) : p.endsWith(".html") && !p.includes("_not-found") ? [p] : [];
  });
}
const pages = walk(ROOT);
const titles = new Map();

test("страницы собраны", () => assert.ok(pages.length >= 20, `страниц: ${pages.length}`));

for (const file of pages) {
  test(file, () => {
    const html = readFileSync(file, "utf8");
    const h1 = html.match(/<h1[\s>]/g) || [];
    assert.equal(h1.length, 1, "должен быть ровно один H1");
    const title = html.match(/<title>([^<]+)<\/title>/)?.[1];
    assert.ok(title && title.length >= 15 && title.length <= 90, `title: ${title}`);
    assert.ok(!titles.has(title), `дубль title с ${titles.get(title)}`);
    titles.set(title, file);
    const desc = html.match(/<meta name="description" content="([^"]+)"/)?.[1];
    assert.ok(desc && desc.length >= 70 && desc.length <= 260, `description ${desc?.length}`);
    assert.match(html, /<link rel="canonical" href="https:\/\/urban210\.ru\/[^"]*\/?"/);
    assert.ok(!/уточнить/i.test(html.replace(/<script[\s\S]*?<\/script>/g, "")), "служебная пометка попала в HTML");
    assert.match(html, /id="zayavka"/, "нет финальной формы");
  });
}
