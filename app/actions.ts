"use server"

import { sendTelegramMessage, formatLeadMessage } from "@/lib/telegram"

export async function submitLead(prevState: any, formData: FormData) {
  try {
    // Имитация задержки
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const name = formData.get("name") as string
    const phone = formData.get("phone") as string

    // Простая валидация
    const errors: any = {}

    if (!name || name.trim().length < 2) {
      errors.name = "Имя должно содержать минимум 2 символа"
    }

    if (!phone || phone.trim().length < 3) {
      errors.phone = "Введите номер телефона"
    }

    if (Object.keys(errors).length > 0) {
      return {
        message: "Пожалуйста, исправьте ошибки в форме",
        errors,
        success: false,
      }
    }

    // Отправка в Telegram
    const message = formatLeadMessage({ name, phone })
    await sendTelegramMessage(message)

    return {
      message: "Спасибо! Мы свяжемся с вами в ближайшее время.",
      errors: {},
      success: true,
    }
  } catch (error) {
    console.error("Ошибка при отправке формы:", error)
    return {
      message: "Произошла ошибка при отправке формы. Попробуйте еще раз.",
      errors: {},
      success: false,
    }
  }
}

export async function submitContactForm(prevState: any, formData: FormData) {
  try {
    // Имитация задержки
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const name = formData.get("name") as string
    const phone = formData.get("phone") as string
    const email = formData.get("email") as string
    const message = formData.get("message") as string

    // Простая валидация
    const errors: any = {}

    if (!name || name.trim().length < 2) {
      errors.name = "Имя должно содержать минимум 2 символа"
    }

    if (!phone || phone.trim().length < 3) {
      errors.phone = "Введите номер телефона"
    }

    if (email && !/\S+@\S+\.\S+/.test(email)) {
      errors.email = "Введите корректный email"
    }

    // Убрать проверку message на обязательность

    if (Object.keys(errors).length > 0) {
      return {
        message: "Пожалуйста, исправьте ошибки в форме",
        errors,
        success: false,
      }
    }

    // Отправка в Telegram
    const { sendTelegramMessage, formatContactMessage } = await import("@/lib/telegram")
    const telegramMessage = formatContactMessage({ name, phone, email, message })
    await sendTelegramMessage(telegramMessage)

    return {
      message: "Спасибо за ваше сообщение! Мы ответим в ближайшее время.",
      errors: {},
      success: true,
    }
  } catch (error) {
    console.error("Ошибка при отправке формы:", error)
    return {
      message: "Произошла ошибка при отправке формы. Попробуйте еще раз.",
      errors: {},
      success: false,
    }
  }
}
