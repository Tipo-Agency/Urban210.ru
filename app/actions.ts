"use server"

import { z } from "zod"
const leadSchema = z.object({
  name: z.string().min(2, { message: "Имя должно содержать не менее 2 символов." }),
  phone: z.string().min(10, { message: "Введите корректный номер телефона." }),
})

export async function submitLead(prevState: any, formData: FormData) {
  const validatedFields = leadSchema.safeParse({
    name: formData.get("name"),
    phone: formData.get("phone"),
  })

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Ошибка валидации.",
    }
  }

  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 1000))

  console.log("New Lead:", validatedFields.data)

  return {
    success: true,
    message: `Спасибо, ${validatedFields.data.name}! Мы скоро с вами свяжемся.`,
  }
}
