const EXTERNAL_API_URL = "http://212.19.27.201/urban210/hs/api/v3"
const CLUB_ID = "b5f85d29-6727-11e9-80cb-00155d066506"
const API_KEY = "e3f63a57-4286-465a-b0dc-42a1123002e4"

async function testExternalAPI() {
  console.log('🔍 Тестируем внешний API с сервера...')
  console.log('📍 URL:', `${EXTERNAL_API_URL}/price_list?type=membership&club_id=${CLUB_ID}`)
  console.log('🔑 API Key:', API_KEY)
  console.log('⏰ Timestamp:', new Date().toISOString())
  
  try {
    console.log('🚀 Отправляем fetch запрос...')
    const startTime = Date.now()
    
    const response = await fetch(
      `${EXTERNAL_API_URL}/price_list?type=membership&club_id=${CLUB_ID}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'apikey': API_KEY,
        },
        signal: AbortSignal.timeout(30000), // 30 секунд
      }
    )

    const endTime = Date.now()
    console.log(`⏱️ Запрос выполнен за ${endTime - startTime}ms`)
    console.log('📡 Status:', response.status)
    console.log('📡 StatusText:', response.statusText)
    console.log('📡 Headers:', Object.fromEntries(response.headers.entries()))

    if (!response.ok) {
      const errorText = await response.text()
      console.log('❌ Error response body:', errorText)
      throw new Error(`HTTP ${response.status}: ${response.statusText}`)
    }

    const data = await response.json()
    console.log('📦 Response data:', JSON.stringify(data, null, 2))
    
    if (!data.result) {
      throw new Error('API returned false result')
    }

    console.log('✅ Успешно! Найдено подписок:', data.data.length)
    console.log('📋 Список подписок:')
    data.data.forEach((membership, index) => {
      console.log(`  ${index + 1}. ${membership.title} - ${membership.price}`)
      if (membership.services) {
        console.log(`     Услуги: ${membership.services.map(s => s.title).join(', ')}`)
      }
    })
    
  } catch (error) {
    console.error('❌ Ошибка:', error.message)
    console.error('❌ Тип ошибки:', error.name)
    if (error.cause) {
      console.error('❌ Причина:', error.cause)
    }
    console.error('❌ Stack trace:', error.stack)
  }
}

// Дополнительный тест - проверка доступности сервера
async function testServerAvailability() {
  console.log('\n🔍 Проверяем доступность сервера...')
  
  try {
    const response = await fetch(`${EXTERNAL_API_URL}/`, {
      method: 'GET',
      signal: AbortSignal.timeout(10000),
    })
    
    console.log('📡 Server status:', response.status)
    console.log('📡 Server headers:', Object.fromEntries(response.headers.entries()))
    
    if (response.ok) {
      console.log('✅ Сервер доступен')
    } else {
      console.log('⚠️ Сервер отвечает, но с ошибкой')
    }
    
  } catch (error) {
    console.error('❌ Сервер недоступен:', error.message)
  }
}

// Запускаем тесты
async function runTests() {
  console.log('🚀 Запуск тестов API...\n')
  
  await testServerAvailability()
  console.log('\n' + '='.repeat(50) + '\n')
  await testExternalAPI()
  
  console.log('\n🏁 Тесты завершены')
}

runTests() 