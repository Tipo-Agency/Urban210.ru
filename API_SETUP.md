# Настройка API для клубных карт

## Обзор

Система клубных карт теперь получает данные из API вместо статичных данных. Это позволяет динамически обновлять информацию о тарифах без изменения кода.

## Структура API

### Внешний API (HTTP)
```
http://212.19.27.201/urban210/hs/api/v3
```

### Внутренний API (HTTPS через прокси)
```
/api/memberships
```

### Endpoint для получения подписок
```
GET /api/memberships
```

## Настройка

### 1. API ключ и авторизация
Учетные данные уже настроены в `app/api/memberships/route.ts`:

```typescript
const API_KEY = "e3f63a57-4286-465a-b0dc-42a1123002e4"
const USERNAME = "Adminbot"
const PASSWORD = "RekBOT*012G"
const AUTH_HEADER = "Basic " + Buffer.from(`${USERNAME}:${PASSWORD}`).toString('base64')
```

**Заголовки запроса:**
```http
Content-Type: application/json
apikey: e3f63a57-4286-465a-b0dc-42a1123002e4
Authorization: Basic QWRtaW5ib3Q6UmVrQk9UKjAxMkc=
```

Для изменения учетных данных отредактируйте файл `app/api/memberships/route.ts`.

### 2. Fallback данные
Если внешний API недоступен, система автоматически использует fallback данные из `app/api/memberships/route.ts`. Эти данные можно настроить в функции API route.

## Структура данных

### Membership (Подписка)
```typescript
interface Membership {
  id: string
  title: string
  price: string
  available_time: string
  fee?: {
    id: string
    title: string
    price: string
  }
  services?: Array<{
    id: string
    title: string
    count: number
  }>
}
```

### Пример ответа API
```json
{
  "result": true,
  "data": [
    {
      "id": "sub_1",
      "title": "SmartFit",
      "price": "1300 ₽",
      "available_time": "07:00–17:30, 20:30–23:30",
      "fee": {
        "id": "fee_1",
        "title": "Вступительный взнос",
        "price": "3000 ₽"
      },
      "services": [
        {
          "id": "96a8ed2b-dbe2-11eb-8104-00155d06650d",
          "title": "Фитнес тестирование первичное",
          "count": 1
        }
      ]
    }
  ]
}
```

## Использование

### Главная страница
Клубные карты на главной странице автоматически загружаются из API при загрузке страницы.

### Страница тарифов
Страница `/tariffs` также использует данные из API для отображения подробной информации о тарифах.

### Loading состояния
Во время загрузки данных отображаются skeleton элементы для лучшего UX.

## Обработка ошибок

- Если внешний API недоступен, используются fallback данные
- Ошибки логируются в консоль сервера (API route) и браузера (клиент)
- Пользователь видит skeleton loading во время загрузки
- Система автоматически переключается на fallback данные при любых проблемах с внешним API

## Текущий статус

**Внешний API недоступен** - сервер `212.19.27.201` не отвечает (таймаут подключения).  
Система корректно использует fallback данные, обеспечивая бесперебойную работу сайта.

## Тестирование

Для тестирования API можно использовать curl:

```bash
# Тест внутреннего API (рекомендуется)
curl -X GET "http://localhost:3000/api/memberships" \
  -H "Content-Type: application/json"

# Тест внешнего API (только для отладки)
curl -X GET "http://212.19.27.201/urban210/hs/api/v3/price_list?type=membership&club_id=b5f85d29-6727-11e9-80cb-00155d066506" \
  -H "Content-Type: application/json" \
  -H "apikey: e3f63a57-4286-465a-b0dc-42a1123002e4"
```

## Обновление данных

Для обновления информации о тарифах достаточно изменить данные в API - изменения автоматически отразятся на сайте при следующей загрузке страницы. 