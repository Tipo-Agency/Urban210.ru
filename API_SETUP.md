# Настройка API для клубных карт

## Обзор

Система клубных карт теперь получает данные из API вместо статичных данных. Это позволяет динамически обновлять информацию о тарифах без изменения кода.

## Структура API

### Базовый URL
```
http://212.19.27.201/urban210/hs/api/v3
```

### Endpoint для получения подписок
```
GET /price_list?type=membership&club_id=b5f85d29-6727-11e9-80cb-00155d066506
```

## Настройка

### 1. API ключ (опционально)
Если API требует аутентификации, добавьте API ключ в переменные окружения:

```bash
# .env.local
API_KEY=your_api_key_here
```

Затем раскомментируйте строку в `lib/api.ts`:
```typescript
'apikey': process.env.API_KEY || '',
```

### 2. Fallback данные
Если API недоступен, система автоматически использует fallback данные из `lib/api.ts`. Эти данные можно настроить в функции `getFallbackMemberships()`.

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

- Если API недоступен, используются fallback данные
- Ошибки логируются в консоль браузера
- Пользователь видит skeleton loading во время загрузки

## Тестирование

Для тестирования API можно использовать curl:

```bash
curl -X GET "http://212.19.27.201/urban210/hs/api/v3/price_list?type=membership&club_id=b5f85d29-6727-11e9-80cb-00155d066506" \
  -H "Content-Type: application/json"
```

## Обновление данных

Для обновления информации о тарифах достаточно изменить данные в API - изменения автоматически отразятся на сайте при следующей загрузке страницы. 