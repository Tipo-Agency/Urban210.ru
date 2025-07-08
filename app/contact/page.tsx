"use client"
import { useActionState } from "react"
import { useFormStatus } from "react-dom"
import { useState, useEffect } from "react"
import { useToast } from "@/hooks/use-toast"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { MapPin, Phone, Clock, Mail, MessageCircle, Send, Instagram } from "lucide-react"
import { motion } from "framer-motion"
import { submitContactForm } from "../actions"
import Header from "@/components/header"
import Footer from "@/components/footer"
import TelegramChat from "@/components/telegram-chat"

const WhatsAppIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.891 3.488" />
  </svg>
)

function SubmitButton() {
  const { pending } = useFormStatus()
  return (
    <Button
      type="submit"
      size="lg"
      disabled={pending}
      className="bg-orange-500 hover:bg-orange-600 text-white font-bold w-full shadow-lg shadow-orange-500/30 disabled:bg-orange-400"
    >
      {pending ? "Отправка..." : "Отправить сообщение"}
    </Button>
  )
}

export default function ContactPage() {
  const { toast } = useToast()
  
  const [state, formAction] = useActionState(submitContactForm, {
    message: "",
    errors: {},
    success: false,
  })

  useEffect(() => {
    if (state.message && state.success && Object.keys(state.errors).length === 0) {
      toast({
        title: "Сообщение отправлено!",
        description: state.message,
        variant: "default",
      })
    }
  }, [state, toast])

  return (
    <div className="bg-black text-gray-200 min-h-screen font-sans selection:bg-orange-500/30">
      <Header currentPage="/contact" />

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-6xl mx-auto"
        >
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
              <span className="bg-gradient-to-r from-white via-orange-500 to-white bg-clip-text text-transparent">
                Контакты
              </span>
            </h1>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Свяжитесь с нами любым удобным способом. Мы всегда готовы помочь!
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Контактная информация */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-bold mb-8">Как нас найти</h2>

              <div className="space-y-6 mb-8">
                <motion.div
                  className="flex items-start gap-4 p-4 bg-zinc-900/50 rounded-xl border border-zinc-800 hover:border-orange-500/30 transition-colors"
                  whileHover={{ scale: 1.02 }}
                >
                  <MapPin className="w-6 h-6 text-orange-500 mt-1 shrink-0" />
                  <div>
                    <h3 className="font-semibold mb-1">Адрес</h3>
                    <p className="text-gray-400">г. Хабаровск, Проспект 60-летия Октября, 210</p>
                  </div>
                </motion.div>

                <motion.div
                  className="flex items-start gap-4 p-4 bg-zinc-900/50 rounded-xl border border-zinc-800 hover:border-orange-500/30 transition-colors"
                  whileHover={{ scale: 1.02 }}
                >
                  <Phone className="w-6 h-6 text-orange-500 mt-1 shrink-0" />
                  <div>
                    <h3 className="font-semibold mb-1">Телефон</h3>
                    <a href="tel:+74212950920" className="text-gray-400 hover:text-orange-500 transition-colors">
                      +7 (421) 295-09-20
                    </a>
                  </div>
                </motion.div>

                <motion.div
                  className="flex items-start gap-4 p-4 bg-zinc-900/50 rounded-xl border border-zinc-800 hover:border-orange-500/30 transition-colors"
                  whileHover={{ scale: 1.02 }}
                >
                  <Clock className="w-6 h-6 text-orange-500 mt-1 shrink-0" />
                  <div>
                    <h3 className="font-semibold mb-1">Режим работы</h3>
                    <div className="text-gray-400 space-y-1">
                      <p>ПН-ПТ: 06:30 - 23:30</p>
                      <p>СБ-ВС: 07:30 - 22:30</p>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  className="flex items-start gap-4 p-4 bg-zinc-900/50 rounded-xl border border-zinc-800 hover:border-orange-500/30 transition-colors"
                  whileHover={{ scale: 1.02 }}
                >
                  <Mail className="w-6 h-6 text-orange-500 mt-1 shrink-0" />
                  <div>
                    <h3 className="font-semibold mb-1">Email</h3>
                    <a href="mailto:info@urban210.ru" className="text-gray-400 hover:text-orange-500 transition-colors">
                      info@urban210.ru
                    </a>
                  </div>
                </motion.div>
              </div>

              {/* Социальные сети */}
              <div className="mb-8">
                <h3 className="text-xl font-bold mb-4">Мы в социальных сетях</h3>
                <div className="flex gap-4">
                  <motion.a
                    href="https://www.instagram.com/fc.urban210?igsh=ajR2dGQ4ZHVmOGI1"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-zinc-800 rounded-full text-gray-400 hover:bg-orange-500 hover:text-white transition-all duration-300"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Instagram className="w-5 h-5" />
                  </motion.a>
                  <motion.a
                    href="https://wa.me/79242054109"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-zinc-800 rounded-full text-gray-400 hover:bg-orange-500 hover:text-white transition-all duration-300"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <WhatsAppIcon/>
                  </motion.a>
                  <motion.a
                    href="https://t.me/urban210_bot"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-zinc-800 rounded-full text-gray-400 hover:bg-orange-500 hover:text-white transition-all duration-300"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Send className="w-5 h-5" />
                  </motion.a>
                </div>
              </div>
            </motion.div>

            {/* Форма обратной связи */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-bold mb-8">Напишите нам</h2>

              <form action={formAction} className="space-y-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.1 }}
                >
                  <label htmlFor="name" className="block text-sm font-medium mb-2">
                    Ваше имя *
                  </label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    required
                    placeholder="Введите ваше имя"
                    className="bg-zinc-900/50 backdrop-blur-sm border-zinc-800 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-300"
                  />
                  {state.errors?.name && <p className="text-red-400 text-sm mt-1">{state.errors.name}</p>}
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.2 }}
                >
                  <label htmlFor="phone" className="block text-sm font-medium mb-2">
                    Телефон *
                  </label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    required
                    placeholder="+7 (___) ___-__-__"
                    className="bg-zinc-900/50 backdrop-blur-sm border-zinc-800 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-300"
                  />
                  {state.errors?.phone && <p className="text-red-400 text-sm mt-1">{state.errors.phone}</p>}
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.3 }}
                >
                  <label htmlFor="email" className="block text-sm font-medium mb-2">
                    Email
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="your@email.com"
                    className="bg-zinc-900/50 backdrop-blur-sm border-zinc-800 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-300"
                  />
                  {state.errors?.email && <p className="text-red-400 text-sm mt-1">{state.errors.email}</p>}
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.4 }}
                >
                  <label htmlFor="message" className="block text-sm font-medium mb-2">
                    Сообщение
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    rows={5}
                    placeholder="Расскажите подробнее о вашем вопросе..."
                    className="bg-zinc-900/50 backdrop-blur-sm border-zinc-800 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-300 resize-none"
                  />
                  {state.errors?.message && <p className="text-red-400 text-sm mt-1">{state.errors.message}</p>}
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.6 }}
                >
                  <SubmitButton />
                </motion.div>

                {state.message && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className={`p-4 rounded-lg ${
                      state.success
                        ? "bg-green-500/10 border border-green-500/30 text-green-400"
                        : "bg-red-500/10 border border-red-500/30 text-red-400"
                    }`}
                  >
                    {state.message}
                  </motion.div>
                )}
              </form>
            </motion.div>
          </div>

          {/* Карта на всю ширину */}
          <motion.div
            className="mt-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="w-full h-96 rounded-xl overflow-hidden border border-zinc-800">
              <iframe
                src="https://yandex.ru/map-widget/v1/?um=constructor%3A8b8c8d8e8f8g8h8i8j8k8l8m8n8o8p8q&amp;source=constructor&amp;ll=135.098021,48.495314&amp;z=15&amp;pt=135.098021,48.495314,pm2rdm"
                width="100%"
                height="100%"
                frameBorder="0"
                className=" transition-all duration-300"
              ></iframe>
            </div>
          </motion.div>
        </motion.div>
      </main>

      <Footer />
      <TelegramChat />
    </div>
  )
}
