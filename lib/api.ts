const API_BASE_URL = "http://212.19.27.201/urban210/hs/api/v3"
const CLUB_ID = "b5f85d29-6727-11e9-80cb-00155d066506"

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
  try {
    const response = await fetch(
      `${API_BASE_URL}/price_list?type=membership&club_id=${CLUB_ID}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          // Здесь нужно будет добавить apikey когда он будет доступен
          'apikey': process.env.API_KEY || 'e3f63a57-4286-465a-b0dc-42a1123002e4',
        },
      }
    )

    if (!response.ok) {
      throw new Error(`API request failed: ${response.status}`)
    }

    const result: ApiResponse<Membership[]> = await response.json()
    
    if (!result.result) {
      throw new Error('API returned false result')
    }

    return result.data
  } catch (error) {
    console.error('Error fetching memberships:', error)
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