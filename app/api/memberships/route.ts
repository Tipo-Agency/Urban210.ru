import { NextRequest, NextResponse } from 'next/server'

const EXTERNAL_API_URL = "http://212.19.27.201/urban210/hs/api/v3"
const CLUB_ID = "b5f85d29-6727-11e9-80cb-00155d066506"
const API_KEY = "e3f63a57-4286-465a-b0dc-42a1123002e4"

export async function GET() {
  console.log('🔍 API Route: Начинаем запрос к внешнему API...')
  console.log('📍 URL:', `${EXTERNAL_API_URL}/price_list?type=membership&club_id=${CLUB_ID}`)
  console.log('🔑 API Key:', API_KEY)
  
  try {
    const response = await fetch(
      `${EXTERNAL_API_URL}/price_list?type=membership&club_id=${CLUB_ID}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'apikey': API_KEY,
        },
        // Добавляем таймаут для запроса
        signal: AbortSignal.timeout(10000), // 10 секунд
      }
    )

    console.log('📡 Response status:', response.status)
    console.log('📡 Response headers:', Object.fromEntries(response.headers.entries()))

    if (!response.ok) {
      console.log('❌ Response not OK:', response.status, response.statusText)
      throw new Error(`External API request failed: ${response.status}`)
    }

    const data = await response.json()
    console.log('📦 Response data:', JSON.stringify(data, null, 2))
    
    if (!data.result) {
      console.log('❌ API returned false result')
      throw new Error('External API returned false result')
    }

    console.log('✅ API request successful, returning data')
    return NextResponse.json(data)
  } catch (error) {
    console.error('❌ Error fetching memberships from external API:', error)
    console.log('🔄 Returning fallback data...')
    
    // Возвращаем fallback данные при ошибке
    const fallbackData = {
      result: true,
      data: [
        {
          id: "sub_1",
          title: "Дневная карта",
          price: "1300 ₽",
          available_time: "Посещение с 7:00 до 17:00",
          services: [
            {
              id: "service_1",
              title: "Тренажерный зал",
              count: 1
            },
            {
              id: "service_2", 
              title: "Кардио-зона",
              count: 1
            }
          ]
        },
        {
          id: "sub_2",
          title: "Все включено",
          price: "2400 ₽",
          available_time: "Безлимитное посещение",
          services: [
            {
              id: "service_1",
              title: "Все групповые программы",
              count: 1
            },
            {
              id: "service_2",
              title: "Спа-зона",
              count: 1
            },
            {
              id: "service_3",
              title: "Скалодром",
              count: 1
            }
          ]
        },
        {
          id: "sub_3",
          title: "Полный день",
          price: "1700 ₽",
          available_time: "Безлимитное посещение",
          services: [
            {
              id: "service_1",
              title: "Тренажерный зал",
              count: 1
            },
            {
              id: "service_2",
              title: "Кардио-зона",
              count: 1
            }
          ]
        }
      ]
    }

    return NextResponse.json(fallbackData)
  }
} 