"use client"
import { motion } from "framer-motion"
import type React from "react"
import { useState } from "react"

import { Eye, EyeOff, Mail, Lock, User, Phone, Dumbbell, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Header from "@/components/header"
import Footer from "@/components/footer"
import TelegramChat from "@/components/telegram-chat"

const AnimatedSection = ({
  children,
  className,
  delay = 0,
}: { children: React.ReactNode; className?: string; delay?: number }) => {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
    >
      {children}
    </motion.div>
  )
}

export default function AuthPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [activeTab, setActiveTab] = useState("login")

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-zinc-900/50 to-black" />
        {[...Array(15)].map((_, i) => {
          const x = ((i * 123) % 1200) + 50
          const y = ((i * 456) % 800) + 50
          const duration = 3 + ((i * 7) % 4)
          const delay = ((i * 11) % 3)
          
          return (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-orange-500/20 rounded-full"
              initial={{ x, y, opacity: 0 }}
              animate={{
                y: [y, y - 100, y],
                opacity: [0, 0.8, 0],
              }}
              transition={{
                duration,
                repeat: Number.POSITIVE_INFINITY,
                delay,
              }}
            />
          )
        })}
      </div>

      <Header currentPage="/auth" />

      <main className="relative z-10 pt-24 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-md mx-auto">
            {/* Hero */}
            <AnimatedSection className="text-center mb-8">
              <motion.div
                className="inline-flex items-center justify-center w-20 h-20 bg-orange-500/10 rounded-full mb-6"
                whileHover={{ scale: 1.05, rotate: 5 }}
                transition={{ duration: 0.3 }}
              >
                <Dumbbell className="w-10 h-10 text-orange-500" />
              </motion.div>
              <h1 className="text-3xl md:text-4xl font-bold mb-4">
                <span className="bg-gradient-to-r from-white via-orange-500 to-white bg-clip-text text-transparent">
                  Добро пожаловать
                </span>
              </h1>
              <p className="text-gray-400">
                Войдите в свой аккаунт или создайте новый
              </p>
            </AnimatedSection>

            {/* Auth Form */}
            <AnimatedSection delay={0.2}>
              <motion.div
                className="bg-gradient-to-br from-zinc-900 to-zinc-800 p-8 rounded-2xl border border-zinc-800 shadow-2xl"
                initial={{ scale: 0.95 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                  <TabsList className="grid w-full grid-cols-2 bg-zinc-800 border border-zinc-700">
                    <TabsTrigger
                      value="login"
                      className="data-[state=active]:bg-orange-500 data-[state=active]:text-white transition-all duration-300"
                    >
                      Вход
                    </TabsTrigger>
                    <TabsTrigger
                      value="register"
                      className="data-[state=active]:bg-orange-500 data-[state=active]:text-white transition-all duration-300"
                    >
                      Регистрация
                    </TabsTrigger>
                  </TabsList>

                  {/* Login Form */}
                  <TabsContent value="login" className="space-y-6 mt-6">
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4 }}
                      className="space-y-4"
                    >
                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-gray-300">
                          Email
                        </Label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-4 h-4" />
                          <Input
                            id="email"
                            type="email"
                            placeholder="your@email.com"
                            className="pl-10 bg-zinc-800 border-zinc-700 focus:border-orange-500 focus:ring-orange-500/20"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="password" className="text-gray-300">
                          Пароль
                        </Label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-4 h-4" />
                          <Input
                            id="password"
                            type={showPassword ? "text" : "password"}
                            placeholder="••••••••"
                            className="pl-10 pr-10 bg-zinc-800 border-zinc-700 focus:border-orange-500 focus:ring-orange-500/20"
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors"
                          >
                            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          </button>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <label className="flex items-center space-x-2 text-sm text-gray-400">
                          <input type="checkbox" className="rounded border-zinc-700" />
                          <span>Запомнить меня</span>
                        </label>
                        <button className="text-sm text-orange-500 hover:text-orange-400 transition-colors">
                          Забыли пароль?
                        </button>
                      </div>

                      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                        <Button className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold py-6 shadow-lg shadow-orange-500/30">
                          Войти
                        </Button>
                      </motion.div>
                    </motion.div>
                  </TabsContent>

                  {/* Register Form */}
                  <TabsContent value="register" className="space-y-6 mt-6">
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4 }}
                      className="space-y-4"
                    >
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="firstName" className="text-gray-300">
                            Имя
                          </Label>
                          <div className="relative">
                            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-4 h-4" />
                            <Input
                              id="firstName"
                              type="text"
                              placeholder="Ваше имя"
                              className="pl-10 bg-zinc-800 border-zinc-700 focus:border-orange-500 focus:ring-orange-500/20"
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="lastName" className="text-gray-300">
                            Фамилия
                          </Label>
                          <Input
                            id="lastName"
                            type="text"
                            placeholder="Фамилия"
                            className="bg-zinc-800 border-zinc-700 focus:border-orange-500 focus:ring-orange-500/20"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="registerEmail" className="text-gray-300">
                          Email
                        </Label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-4 h-4" />
                          <Input
                            id="registerEmail"
                            type="email"
                            placeholder="your@email.com"
                            className="pl-10 bg-zinc-800 border-zinc-700 focus:border-orange-500 focus:ring-orange-500/20"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="phone" className="text-gray-300">
                          Телефон
                        </Label>
                        <div className="relative">
                          <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-4 h-4" />
                          <Input
                            id="phone"
                            type="tel"
                            placeholder="+7 (999) 123-45-67"
                            className="pl-10 bg-zinc-800 border-zinc-700 focus:border-orange-500 focus:ring-orange-500/20"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="registerPassword" className="text-gray-300">
                          Пароль
                        </Label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-4 h-4" />
                          <Input
                            id="registerPassword"
                            type={showPassword ? "text" : "password"}
                            placeholder="••••••••"
                            className="pl-10 pr-10 bg-zinc-800 border-zinc-700 focus:border-orange-500 focus:ring-orange-500/20"
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors"
                          >
                            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          </button>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="confirmPassword" className="text-gray-300">
                          Подтвердите пароль
                        </Label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-4 h-4" />
                          <Input
                            id="confirmPassword"
                            type={showConfirmPassword ? "text" : "password"}
                            placeholder="••••••••"
                            className="pl-10 pr-10 bg-zinc-800 border-zinc-700 focus:border-orange-500 focus:ring-orange-500/20"
                          />
                          <button
                            type="button"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors"
                          >
                            {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          </button>
                        </div>
                      </div>

                      <div className="flex items-start space-x-2">
                        <input
                          type="checkbox"
                          id="terms"
                          className="mt-1 rounded border-zinc-700"
                        />
                        <label htmlFor="terms" className="text-sm text-gray-400">
                          Я соглашаюсь с{" "}
                          <a href="/oferta" className="text-orange-500 hover:text-orange-400">
                            пользовательским соглашением
                          </a>{" "}
                          и{" "}
                          <a href="/privacy" className="text-orange-500 hover:text-orange-400">
                            политикой конфиденциальности
                          </a>
                        </label>
                      </div>

                      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                        <Button className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold py-6 shadow-lg shadow-orange-500/30">
                          Зарегистрироваться
                        </Button>
                      </motion.div>
                    </motion.div>
                  </TabsContent>
                </Tabs>
              </motion.div>
            </AnimatedSection>
            {/* Benefits */}
            {/* <AnimatedSection delay={0.4} className="mt-8">
              <div className="bg-gradient-to-r from-zinc-900/50 to-zinc-800/50 p-6 rounded-xl border border-zinc-800">
                <h3 className="text-lg font-semibold mb-4 text-center">
                  Преимущества личного кабинета
                </h3>
                <div className="space-y-3">
                  {[
                    "Онлайн запись на тренировки",
                    "Отслеживание прогресса",
                    "Управление абонементом",
                    "Эксклюзивные предложения",
                  ].map((benefit, index) => (
                    <motion.div
                      key={index}
                      className="flex items-center gap-3"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                    >
                      <CheckCircle2 className="w-5 h-5 text-orange-500" />
                      <span className="text-gray-300">{benefit}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </AnimatedSection> */}
          </div>
        </div>
      </main>

      <Footer />
      <TelegramChat />
    </div>
  )
} 