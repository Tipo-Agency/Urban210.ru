#!/bin/bash

echo "🔍 Тестируем внешний API с сервера..."
echo "📍 URL: http://212.19.27.201/urban210/hs/api/v3/price_list?type=membership&club_id=b5f85d29-6727-11e9-80cb-00155d066506"
echo "🔑 API Key: e3f63a57-4286-465a-b0dc-42a1123002e4"
echo "⏰ Timestamp: $(date -u +"%Y-%m-%dT%H:%M:%SZ")"
echo ""

echo "🚀 Отправляем curl запрос..."
echo ""

# Тест основного API
curl -X GET \
  "http://212.19.27.201/urban210/hs/api/v3/price_list?type=membership&club_id=b5f85d29-6727-11e9-80cb-00155d066506" \
  -H "Content-Type: application/json" \
  -H "apikey: e3f63a57-4286-465a-b0dc-42a1123002e4" \
  -w "\n\n📡 HTTP Status: %{http_code}\n📡 Response Time: %{time_total}s\n📡 DNS Time: %{time_namelookup}s\n📡 Connect Time: %{time_connect}s\n" \
  --connect-timeout 30 \
  --max-time 60 \
  -v

echo ""
echo "🏁 Тест завершен" 