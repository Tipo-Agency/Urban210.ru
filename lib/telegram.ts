const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN || ""
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID || ""

export async function sendTelegramMessage(message: string) {
  try {
    // Сначала пробуем с HTML
    const payload = {
      chat_id: TELEGRAM_CHAT_ID,
      text: message,
      parse_mode: 'HTML',
    }

    const response = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })

    if (!response.ok) {
      // Если HTML не работает, пробуем без HTML
      const plainPayload = {
        chat_id: TELEGRAM_CHAT_ID,
        text: message.replace(/<[^>]*>/g, ''), // Убираем HTML теги
      }

      const plainResponse = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(plainPayload),
      })

      if (!plainResponse.ok) {
        throw new Error(`Telegram API error: ${plainResponse.status}`)
      }

      return { success: true, result: await plainResponse.json() }
    }

    return { success: true, result: await response.json() }
  } catch (error) {
    return { success: false, error }
  }
}

export function formatLeadMessage(data: { name: string; phone: string }) {
  // Очищаем данные от потенциально опасных символов
  const cleanName = data.name.replace(/[<>]/g, '').trim()
  const cleanPhone = data.phone.replace(/[<>]/g, '').trim()
  
  return `
🔥 <b>Новая заявка с главной страницы!</b>

👤 <b>Имя:</b> ${cleanName}
📞 <b>Телефон:</b> ${cleanPhone}
⏰ <b>Время:</b> ${new Date().toLocaleString('ru-RU', { timeZone: 'Asia/Vladivostok' })}
🌐 <b>Источник:</b> Главная страница
  `.trim()
}

export function formatContactMessage(data: { name: string; phone: string; email?: string; message?: string }) {
  // Очищаем данные от потенциально опасных символов
  const cleanName = data.name.replace(/[<>]/g, '').trim()
  const cleanPhone = data.phone.replace(/[<>]/g, '').trim()
  const cleanEmail = data.email ? data.email.replace(/[<>]/g, '').trim() : ''
  const cleanMessage = data.message ? data.message.replace(/[<>]/g, '').trim() : ''
  
  return `
📧 <b>Новое сообщение с страницы контактов!</b>

👤 <b>Имя:</b> ${cleanName}
📞 <b>Телефон:</b> ${cleanPhone}
${cleanEmail ? `📧 <b>Email:</b> ${cleanEmail}` : ''}
${cleanMessage ? `💬 <b>Сообщение:</b>\n${cleanMessage}` : ''}
⏰ <b>Время:</b> ${new Date().toLocaleString('ru-RU', { timeZone: 'Asia/Vladivostok' })}
🌐 <b>Источник:</b> Страница контактов
  `.trim()
} 