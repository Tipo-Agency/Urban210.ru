# Инструкция по тестированию API на сервере

## Файлы для тестирования

1. **test-server-api.js** - Node.js скрипт для тестирования
2. **test-server-api.sh** - Bash скрипт для тестирования

## Запуск тестов

### Вариант 1: Node.js скрипт
```bash
# Загрузите файл test-server-api.js на сервер
node test-server-api.js
```

### Вариант 2: Bash скрипт
```bash
# Загрузите файл test-server-api.sh на сервер
chmod +x test-server-api.sh
./test-server-api.sh
```

### Вариант 3: Прямой curl
```bash
curl -X GET \
  "http://212.19.27.201/urban210/hs/api/v3/price_list?type=membership&club_id=b5f85d29-6727-11e9-80cb-00155d066506" \
  -H "Content-Type: application/json" \
  -H "apikey: e3f63a57-4286-465a-b0dc-42a1123002e4" \
  -H "Authorization: Basic QWRtaW5ib3Q6UmVrQk9UKjAxMkc=" \
  -v
```

## Что тестируется

1. **Доступность сервера** - отвечает ли API сервер
2. **Аутентификация** - правильный ли API ключ
3. **Структура ответа** - корректный ли формат данных
4. **Содержимое данных** - какие подписки возвращаются

## Ожидаемые результаты

### Успешный ответ:
```json
{
  "result": true,
  "data": [
    {
      "id": "sub_1",
      "title": "SmartFit",
      "price": "1300 ₽",
      "available_time": "07:00–17:30, 20:30–23:30",
      "services": [...]
    }
  ]
}
```

### Возможные ошибки:
- **403 Forbidden** - IP не разрешен
- **401 Unauthorized** - неправильный API ключ
- **404 Not Found** - неправильный endpoint
- **Timeout** - сервер не отвечает

## Отправка результатов

Скопируйте полный вывод команды и отправьте мне. Это поможет понять:
- Работает ли API с вашего сервера
- Какие данные возвращаются
- Есть ли проблемы с аутентификацией или IP 