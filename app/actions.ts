"use server"

export async function submitLead(prevState: any, formData: FormData) {
  // Имитация задержки
  await new Promise((resolve) => setTimeout(resolve, 1000))

  const name = formData.get("name") as string
  const phone = formData.get("phone") as string

  // Простая валидация
  const errors: any = {}

  if (!name || name.trim().length < 2) {
    errors.name = "Имя должно содержать минимум 2 символа"
  }

  if (!phone || phone.trim().length < 10) {
    errors.phone = "Введите корректный номер телефона"
  }

  if (Object.keys(errors).length > 0) {
    return {
      message: "Пожалуйста, исправьте ошибки в форме",
      errors,
      success: false,
    }
  }

  // Здесь должна быть логика отправки данных в CRM или на email
  console.log("Новая заявка:", { name, phone })

  return {
    message: "Спасибо! Мы свяжемся с вами в ближайшее время.",
    errors: {},
    success: true,
  }
}

export async function submitContactForm(prevState: any, formData: FormData) {
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

  if (!phone || phone.trim().length < 10) {
    errors.phone = "Введите корректный номер телефона"
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

  // Здесь должна быть логика отправки данных
  console.log("Новое сообщение:", { name, phone, email, message })

  return {
    message: "Спасибо за ваше сообщение! Мы ответим в ближайшее время.",
    errors: {},
    success: true,
  }
}
