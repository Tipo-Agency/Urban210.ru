# Urban210, фитнес-клуб в Хабаровске

Сайт [urban210.ru](https://urban210.ru): Next.js 15 (App Router), TypeScript, Tailwind CSS 4. Заменяет WordPress-сайт на Bricks. Все старые адреса (`/price/`, `/promo/`, `/trainers/`, `/virtual-tour/`, `/contacts/`, `/policy/`, `/rules/`, `/oferta/`) сохранены, промо-страницы WordPress перенаправляются 301 на новые.

## Запуск

```bash
npm ci
cp .env.example .env.local   # заполнить TELEGRAM_* или LEADS_WEBHOOK_URL
npm run dev                   # http://localhost:3000
npm run build && npm test     # сборка и проверка страниц (H1, title, description, canonical)
```

Node.js 20.9 или новее.

## Где что лежит

| Что | Где |
|---|---|
| Контакты, адрес, часы, юрлицо | `src/data/site.ts` |
| Тарифы и цены | `src/data/pricing.ts` |
| FAQ, отзывы, акции, тренеры, направления | `src/data/content.ts` |
| Статьи блога | `src/content/blog/*.md` (заголовок в YAML-блоке, см. `src/lib/blog.ts`) |
| Тексты документов | `src/content/legal/*.html` (перенесены со старого сайта) |
| Фото | `public/images`, готовятся `scripts/optimize-images.mjs` из ветки `import/wp-snapshot` |
| Визуальная система | `DESIGN.md`, токены в `src/app/globals.css` |
| Открытые вопросы к клубу | `docs/open-questions.md` |

## Заявки и аналитика

Одна форма на весь сайт (`src/components/lead-form.tsx`): любая кнопка с `data-lead="<цель>"` открывает её в модальном окне, без JavaScript ведёт на блок `#zayavka` внизу страницы. Сервер `src/app/api/lead/route.ts` проверяет поля, отсекает ботов (скрытое поле, отправка быстрее 3 с, не больше 5 заявок с IP за 10 минут) и отправляет заявку в Telegram и в webhook CRM, если они заданы. В заявке страница, блок, UTM, yclid и `_ym_uid`. После успеха заявка дублируется в Calltouch, как на старом сайте.

Цели Метрики и GA4 (`src/lib/analytics.ts`): `cta_click`, `form_start`, `form_submit`, `form_error`, `phone_click`, `messenger_click`, `map_click`, `price_toggle`, `tour_open`. В Метрике 108422317 их нужно завести как JavaScript-события с теми же именами.

Переменные `NEXT_PUBLIC_*` вшиваются при сборке, поэтому собирать нужно с заполненным `.env.production`.

## Выкладка

Сборка `output: "standalone"`, сервис `deploy/urban210.service` (порт 3210), nginx `deploy/nginx.conf`. Релизы в `/opt/urban210/releases/<время>`, активный по симлинку `/opt/urban210/current`, хранятся 3 последних.

```bash
SERVER=tipa-prod ./scripts/deploy.sh
```

Перед переключением домена: проверить форму с телефона (заявка дошла в Telegram и Calltouch), цели в Метрике, `robots.txt`, `sitemap.xml`, редиректы старых промо-адресов. Откат: `ln -sfn` на предыдущий релиз и `systemctl restart urban210`.
