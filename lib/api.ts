const API_BASE_URL = "/api/memberships"

// Типы для API
export interface Membership {
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

export interface ApiResponse<T> {
  result: boolean
  data: T
}

// Функция для получения списка подписок
export async function getMemberships(): Promise<Membership[]> {
  console.log('🔍 Client: Начинаем запрос к API...')
  console.log('📍 URL:', API_BASE_URL)
  
  try {
    const response = await fetch(API_BASE_URL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    console.log('📡 Client: Response status:', response.status)

    if (!response.ok) {
      console.log('❌ Client: Response not OK:', response.status, response.statusText)
      throw new Error(`API request failed: ${response.status}`)
    }

    const result: ApiResponse<Membership[]> = await response.json()
    console.log('📦 Client: Response data:', result)
    
    if (!result.result) {
      console.log('❌ Client: API returned false result')
      throw new Error('API returned false result')
    }

    console.log('✅ Client: API request successful, returning data')
    return result.data
  } catch (error) {
    console.error('❌ Client: Error fetching memberships:', error)
    console.log('🔄 Client: Using fallback data...')
    // Возвращаем fallback данные если API недоступен
    return getFallbackMemberships()
  }
}

// Fallback данные на случай недоступности API
function getFallbackMemberships(): Membership[] {
  return [
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