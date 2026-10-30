# Запуск нового сайта на urban210.ru

Сервер: tipa-prod (217.199.252.14). Старый сайт на WordPress живёт на 212.19.27.203 до смены DNS.

## Как устроено

- Статика: `/var/www/urban210/current/client`, отдаёт nginx (`deploy/prod-nginx.conf` → `/etc/nginx/sites-available/urban210.ru`).
- Заявки: node `server/entry.mjs` на 127.0.0.1:3210, служба `urban210` (`deploy/urban210.service`), ключи в `/etc/urban210/urban210.env`.
- Выкатка: `bash scripts/deploy-prod.sh` (релизы в `/var/www/urban210/releases`, ссылка `current`, хранятся 3 последних).
- Превью https://urban210.uchetgram.ru остаётся отдельно: `bash scripts/deploy-preview.sh`, noindex, без Метрики.

## Что настроено в коде

- canonical, sitemap, robots, OG смотрят на https://urban210.ru (PUBLIC_SITE_URL).
- Метрика 108422317 включается только на домене urban210.ru. Цели: `form_start`, `lead` (отправка формы), `cta_click` (открытие формы), `plan_choice` (выбор тарифа), `call_click`, `max_click`, `telegram_click`.
- Calltouch: счётчик `aauqct0x` (подмена номера), site_id 52901.
- Заявки: сервер отправляет их в Calltouch тем же методом `requests/52901/register`, что и старый сайт, плюс в Telegram и webhook, если заданы ключи. Если ни один канал не принял заявку, форма пишет «позвоните» и показывает телефон.
- Редиректы со старых адресов (nginx, 301):
  - `/promo/11-вдвоём-выгоднее/` → `/promo/1-plus-1/`
  - `/promo/trade-in-urban/` → `/promo/trade-in/`
  - `/promo/тестовыи-день-за-1-рубль/` и `/promo/1-rubl/` → `/price/`
  - `/site/policy/` → `/policy/`
  - `?p=`, `?page_id=` → `/`
  - `/wp-admin`, `/wp-login.php`, `/wp-content`, `/wp-json`, `/xmlrpc.php`, `/feed` → 410
- www → без www, http → https.

## Порядок запуска

1. Установить на сервер службу, env и nginx-конфиг (команды ниже), `nginx -t`, reload.
2. Выложить сборку: `bash scripts/deploy-prod.sh`.
3. Александр меняет A-записи `@` и `www` на 217.199.252.14.
4. Когда `dig +short urban210.ru` отдаёт 217.199.252.14: `certbot --nginx -d urban210.ru -d www.urban210.ru --redirect`.
5. Проверка: все страницы 200, редиректы, форма (тестовая заявка с пометкой ТЕСТ), Метрика (`?_ym_debug=1`), Calltouch (подмена номера), OG в Telegram (@WebpageBot) и VK, robots и sitemap.
6. Sitemap в Яндекс Вебмастер и Google Search Console.

```bash
scp deploy/urban210.service tipa-prod:/etc/systemd/system/urban210.service
scp deploy/prod-nginx.conf tipa-prod:/etc/nginx/sites-available/urban210.ru
ssh tipa-prod "mkdir -p /var/www/urban210/releases /etc/urban210 /var/www/certbot && printf 'CALLTOUCH_SITE_ID=52901\n' > /etc/urban210/urban210.env && systemctl daemon-reload && systemctl enable urban210 && ln -sf /etc/nginx/sites-available/urban210.ru /etc/nginx/sites-enabled/urban210.ru && nginx -t && systemctl reload nginx"
```

## Что нужно от клуба

- Куда старый сайт слал письма с форм (настройка Bricks в админке WordPress). В HTML видно только Calltouch. Если нужен ещё Telegram или почта, дать бота и чат или адрес.
- Ссылки на приложение в App Store, Google Play, RuStore (приложение на платформе «Мобифитнес»).
- Ссылки на Макс и Telegram клуба.
- Логотип (новый брендбук).
- Доступ к Яндекс Вебмастеру и Search Console, если их нет на этом Mac.
