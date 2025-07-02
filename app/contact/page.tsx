"use client"
import { useActionState } from "react"
import { useFormStatus } from "react-dom"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { MapPin, Phone, Clock, Mail, MessageCircle, Send } from "lucide-react"
import { motion } from "framer-motion"
import { submitContactForm } from "../actions"
import Header from "@/components/header"
import Footer from "@/components/footer"
import TelegramChat from "@/components/telegram-chat"

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
  const [state, formAction] = useActionState(submitContactForm, {
    message: "",
    errors: {},
    success: false,
  })

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
                    href="https://t.me/fcurbanbot"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-zinc-800 rounded-full text-gray-400 hover:bg-orange-500 hover:text-white transition-all duration-300"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Send className="w-5 h-5" />
                  </motion.a>
                  <motion.a
                    href="https://wa.me/74212950920"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-zinc-800 rounded-full text-gray-400 hover:bg-orange-500 hover:text-white transition-all duration-300"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <MessageCircle className="w-5 h-5" />
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
                src="https://yandex.ru/map-widget/v1/?um=constructor%3A8b8c8d8e8f8g8h8i8j8k8l8m8n8o8p8q&amp;source=constructor"
                width="100%"
                height="100%"
                frameBorder="0"
                className="grayscale hover:grayscale-0 transition-all duration-300"
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
