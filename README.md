# Urban210, фитнес-клуб в Хабаровске

Сайт [urban210.ru](https://urban210.ru) на Astro 5. Все страницы собираются статикой, на сервере работает только приём заявок `/api/lead/` (адаптер `@astrojs/node`). Адреса старого сайта сохранены: `/price/`, `/zal/`, `/group/`, `/spa/`, `/trainers/`, `/personal/`, `/promo/`, `/promo/<акция>/`, `/contacts/`, `/virtual-tour/`, `/blog/`, `/policy/`, `/rules/`, `/oferta/`. Старые адреса WordPress перенаправляются в `deploy/prod-nginx.conf`.

## Запуск

```bash
npm ci
cp .env.example .env          # TELEGRAM_* или LEADS_WEBHOOK_URL для заявок
npm run dev                   # http://localhost:3210
npm run build && npm start    # продакшн-сборка на http://localhost:3210
npm run check                 # проверка статей блога
```

Node.js 20.9 или новее.

## Где что лежит

| Что | Где |
|---|---|
| Контакты, адрес, часы, юрлицо | `src/data/site.ts` |
| Тарифы и цены | `src/data/pricing.ts` |
| FAQ, отзывы, акции, тренеры, направления | `src/data/content.ts` |
| Статьи блога | `src/content/blog/*.md`, схема в `src/content.config.ts` |
| План статей и запросов | `docs/seo/keyword-plan.md` и `.json` |
| Тексты документов | `src/content/legal/*.html` |
| Фото | `src/assets/images` (сборка делает AVIF нужных размеров), видео в `public/video` |
| Визуальная система | `DESIGN.md`, токены в `src/styles/global.css` |
| Открытые вопросы к клубу | `docs/open-questions.md` |

## Заявки и аналитика

Одна форма на сайт (`src/components/LeadForm.astro`): имя, телефон, согласие. Любая кнопка с `data-lead="<цель>"` открывает форму в окне, без JavaScript ведёт на блок `#zayavka`. Сервер `src/pages/api/lead.ts` проверяет поля, отсекает ботов (скрытое поле, отправка быстрее 3 с, не больше 5 заявок с IP за 10 минут) и шлёт заявку в Telegram и webhook CRM. Ключи только в переменных окружения сервера. После успеха заявка дублируется в Calltouch.

Метрика 108422317 и Calltouch грузятся после `load`. Цели: `cta_click`, `form_start`, `lead`, `call_click`, `whatsapp_click`, `telegram_click`.

## Выкладка

`npm run build` даёт `dist/client` (статика для nginx) и `dist/server` (Node для заявок). Выкатка на tipa-prod: `bash scripts/deploy-prod.sh` (релизы в `/var/www/urban210/releases/<время>`, симлинк `/var/www/urban210/current`, сервис `deploy/urban210.service`, nginx `deploy/prod-nginx.conf`). Порядок запуска и проверки в `docs/LAUNCH.md`.
