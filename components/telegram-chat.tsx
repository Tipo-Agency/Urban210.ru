"use client"
import { useState, useEffect, useRef } from "react"
import type React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { MessageCircle, X, Send, ExternalLink, User, Bot } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface Message {
  id: string
  text: string
  isUser: boolean
  timestamp: Date
}

const TELEGRAM_BOT_TOKEN = "8180066648:AAE57J6EgXAy5o9C9pWAGPnIHvhfKQe5yBc"
const TELEGRAM_CHAT_ID = "@fcurbanbot"

export default function TelegramChat() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      text: "Привет! 👋 Я помогу вам с вопросами о фитнес-клубе Urban210. Чем могу помочь?",
      isUser: false,
      timestamp: new Date(),
    },
  ])
  const [inputValue, setInputValue] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const sendMessage = async () => {
    if (!inputValue.trim() || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      isUser: true,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue("")
    setIsLoading(true)

    try {
      // Отправляем сообщение в Telegram бот
      await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chat_id: TELEGRAM_CHAT_ID,
          text: `Новое сообщение с сайта:\n\n${inputValue}`,
        }),
      })

      // Симулируем ответ бота
      setTimeout(() => {
        const botResponse: Message = {
          id: (Date.now() + 1).toString(),
          text: getBotResponse(inputValue),
          isUser: false,
          timestamp: new Date(),
        }
        setMessages((prev) => [...prev, botResponse])
        setIsLoading(false)
      }, 1000)
    } catch (error) {
      console.error("Ошибка отправки сообщения:", error)
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "Извините, произошла ошибка. Попробуйте позже или свяжитесь с нами по телефону +7 (421) 295-09-20",
        isUser: false,
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, errorMessage])
      setIsLoading(false)
    }
  }

  const getBotResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase()

    if (message.includes("цена") || message.includes("стоимость") || message.includes("тариф")) {
      return "💰 Наши тарифы:\n\n🌅 Дневная карта - 1300₽/мес\n🌞 Полный день - 1700₽/мес\n⭐ Все включено - 2400₽/мес\n\nПодробнее на странице 'Тарифы' или звоните +7 (421) 295-09-20"
    }

    if (message.includes("расписание") || message.includes("время") || message.includes("занятия")) {
      return "📅 Расписание тренировок доступно на нашем сайте в разделе 'Расписание'. Там вы найдете все групповые программы с указанием времени и тренеров."
    }

    if (message.includes("адрес") || message.includes("где") || message.includes("находится")) {
      return "📍 Мы находимся по адресу:\nПроспект 60-летия Октября, 210\nХабаровск\n\nРежим работы:\nПн-Пт: 06:30-23:30\nСб-Вс: 07:30-22:30"
    }

    if (message.includes("услуги") || message.includes("что есть") || message.includes("зал")) {
      return "🏋️ У нас есть:\n• Тренажерный зал\n• Кроссфит зона\n• Групповые программы\n• Спа-зона с сауной и хаммамом\n• Персональные тренировки"
    }

    return "Спасибо за ваш вопрос! Наш менеджер свяжется с вами в ближайшее время. Для быстрой связи звоните +7 (421) 295-09-20 или переходите в наш Telegram."
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  return (
    <>
      {/* Кнопка чата */}
      <motion.button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 bg-orange-500 hover:bg-orange-600 text-white p-4 rounded-full shadow-lg transition-all duration-300"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        animate={{
          boxShadow: [
            "0 0 0 0 rgba(249, 115, 22, 0.7)",
            "0 0 0 10px rgba(249, 115, 22, 0)",
            "0 0 0 0 rgba(249, 115, 22, 0)",
          ],
        }}
        transition={{
          duration: 2,
          repeat: Number.POSITIVE_INFINITY,
        }}
      >
        <MessageCircle className="w-6 h-6" />
      </motion.button>

      {/* Окно чата */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="fixed bottom-6 right-6 z-50 w-80 h-96 bg-white rounded-lg shadow-2xl border border-gray-200 flex flex-col overflow-hidden"
          >
            {/* Заголовок чата */}
            <div className="bg-orange-500 text-white p-4 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                  <Bot className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-semibold">Urban210 Support</h3>
                  <p className="text-xs opacity-90">Онлайн</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <motion.a
                  href="https://t.me/fcurbanbot"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1 hover:bg-white/20 rounded transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  title="Открыть в Telegram"
                >
                  <ExternalLink className="w-4 h-4" />
                </motion.a>
                <motion.button
                  onClick={() => setIsOpen(false)}
                  className="p-1 hover:bg-white/20 rounded transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <X className="w-4 h-4" />
                </motion.button>
              </div>
            </div>

            {/* Сообщения */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${message.isUser ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-lg ${
                      message.isUser ? "bg-orange-500 text-white" : "bg-white text-gray-800 border border-gray-200"
                    }`}
                  >
                    <div className="flex items-start space-x-2">
                      {!message.isUser && <Bot className="w-4 h-4 mt-0.5 text-orange-500 flex-shrink-0" />}
                      {message.isUser && <User className="w-4 h-4 mt-0.5 text-white/80 flex-shrink-0" />}
                      <div>
                        <p className="text-sm whitespace-pre-line">{message.text}</p>
                        <p className={`text-xs mt-1 ${message.isUser ? "text-white/70" : "text-gray-500"}`}>
                          {message.timestamp.toLocaleTimeString("ru-RU", {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}

              {isLoading && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex justify-start"
                >
                  <div className="bg-white text-gray-800 border border-gray-200 p-3 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <Bot className="w-4 h-4 text-orange-500" />
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                        <div
                          className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                          style={{ animationDelay: "0.1s" }}
                        />
                        <div
                          className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                          style={{ animationDelay: "0.2s" }}
                        />
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Поле ввода */}
            <div className="p-4 bg-white border-t border-gray-200">
              <div className="flex space-x-2">
                <Input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Напишите ваш вопрос..."
                  className="flex-1"
                  disabled={isLoading}
                />
                <Button
                  onClick={sendMessage}
                  disabled={!inputValue.trim() || isLoading}
                  size="sm"
                  className="bg-orange-500 hover:bg-orange-600"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
              <p className="text-xs text-gray-500 mt-2 text-center">
                Или перейдите в{" "}
                <a
                  href="https://t.me/fcurbanbot"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-orange-500 hover:underline"
                >
                  Telegram
                </a>
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
