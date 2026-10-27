# Снимок urban210.ru (WordPress) — 2026-10-27

Снято с живого сайта для редизайна. CMS: WordPress 7.1.3, тема/конструктор **Bricks** (theme bricks, классы `brxe-*`).

## Состав
- `pages/` — HTML 13 страниц (главная = index.html; вложенные пути через `__`, напр. `promo__trade-in-urban.html`) + sitemap.xml, wp-sitemap.xml, sitemaps.xml, page-sitemap1.xml, promo-sitemap1.xml, robots.txt.
  - `/site/policy/` редиректит на `/policy/` (site__policy.html = копия policy.html).
  - Страницы из sitemap: /, /contacts/, /price/, /promo/, /promo/11-вдвоём-выгоднее/, /promo/trade-in-urban/, /promo/тестовыи-день-за-1-рубль/, /trainers/, /virtual-tour/. /policy/, /rules/, /oferta/ в sitemap не входят, но отдают 200.
- `uploads/` — оригиналы из /wp-content/uploads/ (год/месяц/файл), суффиксы -WxH отброшены (оригиналы существуют). `uploads/bricks/css/` — CSS страниц Bricks (там же фоновые картинки через url()).
- `fonts/` — шрифты Google Fonts: **Oswald** (200–700) и **Fira Code** (300–700), variable woff2, подмножества latin/latin-ext/cyrillic/cyrillic-ext; `google-fonts.css` — исходный CSS.
- Лого: `uploads/2026/02/urban_logo.svg`, фавикон `uploads/2026/04/favicon.webp`.
- `screens/` — главная full-page на 390 (DPR 2) и 1440.
- `asset-urls.txt` — все ссылки на /wp-content/ из HTML.

## Виртуальный тур
- iframe Matterport: `https://ep.matterport.host/index/?m=RX7Vmh4E33h` (allow="xr-spatial-tracking; fullscreen").

## Аналитика
- **Яндекс Метрика ID 108422317**: ssr, webvisor, clickmap, ecommerce:"dataLayer", accurateTrackBounce, trackLinks. Вызовов reachGoal в HTML нет (цели, видимо, настроены в Метрике по событиям/URL).
- **Calltouch**: счётчик `ct` id `aauqct0x` (mod.calltouch.ru/init-min.js), site_id **52901**. Заявки из форм дублируются скриптом в `https://api.calltouch.ru/calls-service/RestAPI/requests/52901/register/` (по клику на submit: fio из input[aria-label="Имя"], phoneNumber из input[type=tel], email, subject «Заявка с <host>», requestUrl, sessionId=window.call_value; анти-дубль 20 с).
- GA/GTM, VK pixel, Meta pixel, Top.Mail.ru — не найдены.

## Формы
- Нативные формы Bricks (`brxe-form form_main_1`, method=post без action) — отправка AJAX через `https://urban210.ru/wp-admin/admin-ajax.php` (action `bricks_form_submit`, ajaxUrl в bricksData; restApiUrl `/wp-json/bricks/v1/`). Куда Bricks шлёт письма/вебхук — настраивается в админке, в HTML не видно.
- Поля: «Ваше имя» (required), «Телефон» (tel, маска +7 (___) ____-__-__ через unpkg.com/imask, required), скрытые: `tarif-name-field` (тариф), пустое скрытое, URL страницы. Кнопка «Оформить»/«Записаться». ID форм: fevpxv (на всех страницах), gelglz, 7f843e, afugii, ovfxht.
- Попапы Bricks (data-popup-id 3271 и др.).

## Контакты и внешние ссылки
- Телефон +7 (4212) 95-09-20 (tel:+74212950920), WhatsApp wa.me/79242054109, Telegram-бот t.me/urban210_bot, info@urban210.ru, Instagram fc.urban210.
- Карты: Яндекс-конструктор (um=constructor:2ecd61bd60c296f6b148bd81b483e044fd04733bd6a67bba9973d916a5a0312e), Яндекс отзывы org 122837663271, 2ГИС firm 70000001028822631 (Хабаровск).
- В политике упоминается mobifitness.ru (support@mobifitness.ru) — вероятно, CRM/приложение клуба.
