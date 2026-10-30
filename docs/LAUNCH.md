# Запуск нового сайта на urban210.ru

Сервер: tipa-prod (217.199.252.14). Старый сайт на WordPress живёт на 212.19.27.203 до смены DNS.

## Как устроено

- Статика: `/var/www/urban210/current/client`, отдаёт nginx (`deploy/prod-nginx.conf` → `/etc/nginx/sites-available/urban210.ru`).
- Заявки: node `server/entry.mjs` на 127.0.0.1:3210, служба `urban210` (`deploy/urban210.service`), ключи в `/etc/urban210/urban210.env`.
- Выкатка: `bash scripts/deploy-prod.sh` (релизы в `/var/www/urban210/releases`, ссылка `current`, хранятся 3 последних).
- Превью и концепции дизайна убраны с сервера 30.10.2026 (остались в истории git, коммит 622cd18).

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

## DNS urban210.ru до переезда (nic.ru, DNS-master DP2108262055, снято 30.10.2026)

Откат: вернуть A `@` и A `www` на 212.19.27.203.

```
$TTL 3600
urban210.ru.               IN NS    ns4-cloud.nic.ru. / ns3-l2.nic.ru. / ns4-l2.nic.ru. / ns8-l2.nic.ru. / ns8-cloud.nic.ru.
urban210.ru.               IN A     212.19.27.203
co.urban210.ru.            IN A     185.165.123.36
ko.urban210.ru.            IN A     185.165.123.36
old.urban210.ru.           IN A     195.24.68.21
www.urban210.ru.           IN A     212.19.27.203
www.co.urban210.ru.        IN A     185.165.123.36
www.ko.urban210.ru.        IN A     185.165.123.36
www.old.urban210.ru.       IN A     195.24.68.21
urban210.ru.urban210.ru.   IN MX    5 mx02.nicmail.ru. / 10 mx01.nicmail.ru. / 20 mx03.nicmail.ru.
promo.urban210.ru.         IN CNAME lp556605.myflexbe.ru.
_dmarc.urban210.ru.urban210.ru. IN TXT "v=DMARC1; p=quarantine"
urban210.ru.urban210.ru.   IN TXT   "v=spf1 include:dc1.nicmail.ru include:dc2.nicmail.ru ?all"
```

Замечание: MX, SPF и DMARC записаны на имя `urban210.ru.urban210.ru` (лишний суффикс), поэтому у самого urban210.ru сейчас нет MX и SPF. Не трогали, нужно решение клуба: если почта @urban210.ru в nicmail нужна, эти записи надо перенести на `@`.

## Итог запуска 30.10.2026

- DNS (nic.ru): A `@` и A `www` → 217.199.252.14; добавлены TXT `google-site-verification=ArIkaqD0TXglUBRNKi9sAXL041ef5LL1czl4HU5Eac8` и `yandex-verification: 93ab28aaa15c1022`. Остальные записи не трогали.
- HTTPS: Let's Encrypt для urban210.ru и www (до 28.01.2027, продлевается certbot сам).
- Проверено на живом сайте: страницы 200, http и www → https://urban210.ru, старые адреса 301, WordPress 410, Метрика грузится, Calltouch подменяет номер (на сайте виден номер подмены), тестовая заявка «ТЕСТ сайта, не звонить» принята Calltouch.
- Google Search Console (аккаунт «Типа Агентство»): доменный ресурс urban210.ru подтверждён, sitemap отправлен.
- Яндекс Вебмастер: сайт добавлен, проверка DNS запущена (Яндекс проверяет до двух дней), sitemap и регион добавить после подтверждения.

## Calltouch и Метрика (проверено 30.10.2026)

- Calltouch: домен urban210.ru, скрипт работает, подмена номера на сайте работает, заявки с форм приходят в журнал заявок.
- Интеграция Calltouch → Метрика смотрит на другой счётчик, не на тот, что стоит на сайте. Решить с клубом, какой счётчик основной.
- Метрика: доступ к счётчику сайта нужно выдать аккаунту агентства, после этого настроить цели, Вебвизор и фильтр своих визитов.
