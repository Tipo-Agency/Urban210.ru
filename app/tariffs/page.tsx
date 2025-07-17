"use client"
import { motion } from "framer-motion"
import type React from "react"
import { useEffect, useState } from "react"

import { Zap, Users, Clock, Heart, Target, Award, CheckCircle2, Star, Sparkles, Gift } from "lucide-react"
import { Button } from "@/components/ui/button"
import Header from "@/components/header"
import Footer from "@/components/footer"
import TelegramChat from "@/components/telegram-chat"
import { getMemberships, type Membership } from "@/lib/api"

const AnimatedSection = ({
  children,
  className,
  id,
}: { children: React.ReactNode; className?: string; id?: string }) => {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  return (
    <motion.section
      id={id}
      className={className}
      initial={{ opacity: 0, y: 50 }}
      whileInView={isMounted ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      {children}
    </motion.section>
  )
}

const PricingCard = ({
  title,
  price,
  period = "/мес",
  features,
  isPopular = false,
  delay = 0,
  description,
  timeAccess,
  icon: Icon,
}: any) => {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  return (
    <motion.div
      className={`relative p-8 rounded-2xl border h-full flex flex-col group ${
        isPopular
          ? "border-orange-500/50 bg-gradient-to-br from-zinc-900 to-orange-900/20 scale-105 shadow-2xl shadow-orange-500/20"
          : "bg-gradient-to-br from-zinc-900 to-zinc-800 border-zinc-800 hover:border-orange-500/30"
      }`}
      initial={{ opacity: 0, y: 50, rotateX: 15 }}
      whileInView={isMounted ? { opacity: 1, y: 0, rotateX: 0 } : { opacity: 0, y: 50, rotateX: 15 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay, ease: "backOut" }}
      whileHover={{
        y: -15,
        scale: isPopular ? 1.02 : 1.05,
        boxShadow: isPopular ? "0 25px 50px rgba(249, 115, 22, 0.3)" : "0 20px 40px rgba(249, 115, 22, 0.2)",
      }}
    >
      {isPopular && (
        <motion.div
          className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-2 rounded-full text-sm font-semibold tracking-wide flex items-center gap-2"
          initial={{ opacity: 0, scale: 0, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.3, delay: delay + 0.3 }}
        >
          <motion.div
            animate={{
              rotate: [0, 360],
              scale: [1, 1.2, 1],
            }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
          >
            <Star className="w-4 h-4 fill-current" />
          </motion.div>
          <span>Самый популярный</span>
        </motion.div>
      )}

      <div className="flex-grow">
        {/* Header */}
        <div className="text-center mb-8">
          <motion.div
            className="inline-flex items-center justify-center w-16 h-16 bg-orange-500/10 rounded-full mb-4 group-hover:bg-orange-500/20 transition-colors"
            whileHover={{ scale: 1.1, rotate: 5 }}
          >
            <Icon className="w-8 h-8 text-orange-500" />
          </motion.div>
          <h3 className="text-2xl font-bold mb-2 group-hover:text-orange-500 transition-colors">{title}</h3>
          <p className="text-gray-400 text-sm mb-4">{description}</p>
          <div className="text-center">
            <div className="flex items-baseline justify-center gap-2">
              <motion.span
                className="text-5xl font-black bg-gradient-to-r from-white to-orange-500 bg-clip-text text-transparent"
                whileHover={{ scale: 1.1 }}
              >
                {price}₽
              </motion.span>
              <span className="text-lg text-gray-400">{period}</span>
            </div>
          </div>
        </div>

        {/* Time Access */}
        <div className="bg-zinc-800/50 rounded-lg p-4 mb-6 border border-zinc-700/50">
          <div className="flex items-center gap-2 text-sm">
            <Clock className="w-4 h-4 text-orange-500" />
            <span className="text-gray-300">Время доступа: {timeAccess}</span>
          </div>
        </div>

        {/* Features */}
        <div className="space-y-3 mb-8">
          {features.map((feature: string, i: number) => (
            <motion.div
              key={i}
              className="flex items-start gap-3"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: delay + 0.3 + i * 0.1 }}
            >
              <motion.div
                className="w-5 h-5 rounded-full bg-orange-500/20 flex items-center justify-center mt-0.5 shrink-0"
                whileHover={{ scale: 1.2, backgroundColor: "rgba(249, 115, 22, 0.3)" }}
              >
                <CheckCircle2 className="w-3 h-3 text-orange-500" />
              </motion.div>
              <span className="text-gray-300 text-sm group-hover:text-gray-200 transition-colors">{feature}</span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* CTA Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: delay + 0.5 }}
      >
        <Button
          asChild
          className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold shadow-lg shadow-orange-500/30 relative overflow-hidden group"
        >
          <a href="https://t.me/fcurbanbot" target="_blank" rel="noopener noreferrer">
            <span className="relative z-10">Выбрать тариф</span>
            <motion.span
              className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 w-full h-full block transform -skew-x-45 -translate-x-full"
              whileHover={{ translateX: "200%" }}
              transition={{ duration: 0.6 }}
            />
          </a>
        </Button>
      </motion.div>
    </motion.div>
  )
}

const ServiceCard = ({ icon: Icon, title, description, delay = 0 }: any) => {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  return (
    <motion.div
      className="bg-gradient-to-br from-zinc-900 to-zinc-800 p-6 rounded-xl border border-zinc-800 hover:border-orange-500/50 transition-all duration-500 group text-center"
      initial={{ opacity: 0, y: 30 }}
      whileInView={isMounted ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      whileHover={{ scale: 1.05, y: -5 }}
    >
    <motion.div
      className="inline-flex items-center justify-center w-12 h-12 bg-orange-500/10 rounded-full mb-4 group-hover:bg-orange-500/20 transition-colors"
      whileHover={{ scale: 1.2, rotate: 10 }}
    >
      <Icon className="w-6 h-6 text-orange-500" />
    </motion.div>
    <h3 className="text-lg font-semibold mb-2 group-hover:text-orange-500 transition-colors">{title}</h3>
    <p className="text-gray-400 text-sm group-hover:text-gray-300 transition-colors">{description}</p>
  </motion.div>
  )
}

export default function TariffsPage() {
  const [isMounted, setIsMounted] = useState(false)
  const [memberships, setMemberships] = useState<Membership[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  // Загрузка клубных карт
  useEffect(() => {
    async function loadMemberships() {
      try {
        const data = await getMemberships()
        setMemberships(data)
      } catch (error) {
        console.error('Error loading memberships:', error)
      } finally {
        setLoading(false)
      }
    }

    loadMemberships()
  }, [])



  const additionalServices = [
    {
      name: "Персональные тренировки",
      description: "Индивидуальная работа с опытным тренером для достижения ваших целей",
      icon: Target,
    },
    {
      name: "Групповые программы",
      description: "Более 20 видов групповых занятий: йога, пилатес, зумба, кроссфит и многое другое",
      icon: Users,
    },
    {
      name: "Спа-процедуры",
      description: "Расслабление и восстановление в нашей спа-зоне с сауной",
      icon: Heart,
    },
  ]

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Animated background particles */}
      {isMounted && (
        <div className="absolute inset-0 z-0">
          {[...Array(20)].map((_, i) => {
            // Используем детерминированные значения на основе индекса
            const x = ((i * 123) % 1200) + 50
            const y = ((i * 456) % 800) + 50
            const duration = 2 + ((i * 7) % 3)
            const delay = ((i * 11) % 2)
            
            return (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-orange-500/30 rounded-full"
                initial={{
                  x,
                  y,
                }}
                animate={{
                  y: [y, y - 100, y],
                  opacity: [0, 1, 0],
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
      )}

      <Header currentPage="/tariffs" />

      {/* Hero Section */}
      <AnimatedSection className="pt-24 pb-16 bg-gradient-to-b bg-black relative z-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={isMounted ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8 }}
          >
            <motion.h1
              className="text-4xl md:text-6xl font-bold tracking-tight mb-6"
              initial={{ opacity: 0, y: 50, scale: 0.8 }}
              animate={isMounted ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 50, scale: 0.8 }}
              transition={{ duration: 1, delay: 0.2, ease: "backOut" }}
            >
              <span className="bg-gradient-to-r from-white via-orange-500 to-white bg-clip-text text-transparent">
                Выберите свой тариф
              </span>
            </motion.h1>
            <motion.p
              className="text-xl text-gray-400 max-w-2xl mx-auto mb-8"
              initial={{ opacity: 0, y: 30 }}
              animate={isMounted ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Гибкие условия для достижения ваших фитнес-целей
            </motion.p>
            <motion.p
              className="text-lg text-orange-400 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 30 }}
              animate={isMounted ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              Без скрытых платежей • Пробная тренировка бесплатно • Возврат в течение 14 дней
            </motion.p>
          </motion.div>
        </div>
      </AnimatedSection>

      {/* Main Tariffs */}
      <AnimatedSection className="py-20 relative z-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {loading ? (
              // Skeleton loading
              Array.from({ length: 3 }).map((_, index) => (
                <div
                  key={index}
                  className="p-8 bg-zinc-900/50 backdrop-blur-sm rounded-2xl border border-zinc-800/50 shadow-lg animate-pulse"
                >
                  <div className="h-8 bg-zinc-800 rounded mb-4"></div>
                  <div className="h-12 bg-zinc-800 rounded mb-6"></div>
                  <div className="space-y-3">
                    {Array.from({ length: 6 }).map((_, i) => (
                      <div key={i} className="h-4 bg-zinc-800 rounded"></div>
                    ))}
                  </div>
                </div>
              ))
            ) : (
              memberships.map((membership, index) => {
                // Выбираем иконку на основе индекса
                const icons = [Clock, Award, Zap]
                const Icon = icons[index % icons.length]
                
                return (
                  <PricingCard
                    key={membership.id}
                    title={membership.title}
                    price={membership.price.replace(' ₽', '')}
                    period="/месяц"
                    description={membership.available_time}
                    timeAccess={membership.available_time}
                    features={membership.services?.map(service => service.title) || []}
                    isPopular={index === 1} // Вторая карта как популярная
                    icon={Icon}
                    delay={index * 0.1}
                  />
                )
              })
            )}
          </div>
        </div>
      </AnimatedSection>

      {/* Additional Services */}
      <AnimatedSection className="py-20 bg-gradient-to-b from-zinc-900/30 to-black relative z-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Дополнительные{" "}
              <span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">услуги</span>
            </h2>
            <p className="text-xl text-gray-400">Персональный подход для максимального результата</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {additionalServices.map((service, index) => (
              <ServiceCard
                key={index}
                icon={service.icon}
                title={service.name}
                description={service.description}
                delay={index * 0.1}
              />
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* Promotions Section */}
      <AnimatedSection className="py-20 relative z-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Специальные{" "}
              <span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
                предложения
              </span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            <motion.div
              className="bg-gradient-to-br from-zinc-900 to-zinc-800 p-8 rounded-2xl border border-zinc-800 hover:border-orange-500/50 transition-all duration-500 group"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              whileHover={{ scale: 1.02, y: -5 }}
            >
              <div className="flex items-start gap-6">
                <motion.div
                  className="p-4 bg-orange-500/10 rounded-xl group-hover:bg-orange-500/20 transition-colors shrink-0"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                >
                  <Gift className="w-12 h-12 text-orange-500" />
                </motion.div>
                <div>
                  <h3 className="text-2xl font-bold mb-3 group-hover:text-orange-500 transition-colors">
                    Приведи друга
                  </h3>
                  <p className="text-gray-400 mb-6 group-hover:text-gray-300 transition-colors">
                    Получите месяц фитнеса в подарок для себя и скидку 50% для друга!
                  </p>
                  <Button
                    asChild
                    className="bg-orange-500 hover:bg-orange-600 text-white font-bold shadow-lg shadow-orange-500/30"
                  >
                    <a href="https://t.me/fcurbanbot" target="_blank" rel="noopener noreferrer">
                      Узнать больше
                    </a>
                  </Button>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="bg-gradient-to-br from-zinc-900 to-zinc-800 p-8 rounded-2xl border border-zinc-800 hover:border-orange-500/50 transition-all duration-500 group"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              whileHover={{ scale: 1.02, y: -5 }}
            >
              <div className="flex items-start gap-6">
                <motion.div
                  className="p-4 bg-purple-500/10 rounded-xl group-hover:bg-purple-500/20 transition-colors shrink-0"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                >
                  <Sparkles className="w-12 h-12 text-purple-500" />
                </motion.div>
                <div>
                  <h3 className="text-2xl font-bold mb-3 group-hover:text-purple-500 transition-colors">
                    Годовой абонемент
                  </h3>
                  <p className="text-gray-400 mb-6 group-hover:text-gray-300 transition-colors">
                    Самый выгодный фитнес — от 13 900 ₽ за целый год без ограничений!
                  </p>
                  <Button
                    asChild
                    className="bg-purple-500 hover:bg-purple-600 text-white font-bold shadow-lg shadow-purple-500/30"
                  >
                    <a href="https://t.me/fcurbanbot" target="_blank" rel="noopener noreferrer">
                      Купить карту
                    </a>
                  </Button>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="bg-gradient-to-br from-zinc-900 to-zinc-800 p-8 rounded-2xl border border-zinc-800 hover:border-orange-500/50 transition-all duration-500 group"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              whileHover={{ scale: 1.02, y: -5 }}
            >
              <div className="flex items-start gap-6">
                <motion.div
                  className="p-4 bg-green-500/10 rounded-xl group-hover:bg-green-500/20 transition-colors shrink-0"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                >
                  <Users className="w-12 h-12 text-green-500" />
                </motion.div>
                <div>
                  <h3 className="text-2xl font-bold mb-3 group-hover:text-green-500 transition-colors">
                    Скидка для студентов
                  </h3>
                  <p className="text-gray-400 mb-6 group-hover:text-gray-300 transition-colors">
                    Специальная скидка 66% для студентов! Фитнес стал еще доступнее.
                  </p>
                  <Button
                    asChild
                    className="bg-green-500 hover:bg-green-600 text-white font-bold shadow-lg shadow-green-500/30"
                  >
                    <a href="https://t.me/fcurbanbot" target="_blank" rel="noopener noreferrer">
                      Получить скидку
                    </a>
                  </Button>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="bg-gradient-to-br from-zinc-900 to-zinc-800 p-8 rounded-2xl border border-zinc-800 hover:border-orange-500/50 transition-all duration-500 group"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              whileHover={{ scale: 1.02, y: -5 }}
            >
              <div className="flex items-start gap-6">
                <motion.div
                  className="p-4 bg-blue-500/10 rounded-xl group-hover:bg-blue-500/20 transition-colors shrink-0"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                >
                  <Target className="w-12 h-12 text-blue-500" />
                </motion.div>
                <div>
                  <h3 className="text-2xl font-bold mb-3 group-hover:text-blue-500 transition-colors">Трейд-ин</h3>
                  <p className="text-gray-400 mb-6 group-hover:text-gray-300 transition-colors">
                    Обменяйте старый абонемент на новый со скидкой от 50% до 90%!
                  </p>
                  <Button
                    asChild
                    className="bg-blue-500 hover:bg-blue-600 text-white font-bold shadow-lg shadow-blue-500/30"
                  >
                    <a href="https://t.me/fcurbanbot" target="_blank" rel="noopener noreferrer">
                      Обменять
                    </a>
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </AnimatedSection>

      {/* CTA Section */}
      <AnimatedSection className="py-20 relative z-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center bg-gradient-to-r from-zinc-900 to-zinc-800 p-12 rounded-2xl border border-zinc-700"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold mb-4">Готовы начать?</h2>
            <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
              Выберите подходящий тариф и начните свой путь к здоровому образу жизни уже сегодня!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                size="lg"
                className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold shadow-lg shadow-orange-500/30"
              >
                <a href="https://t.me/fcurbanbot" target="_blank" rel="noopener noreferrer">
                  Записаться на пробную тренировку
                </a>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white bg-transparent"
              >
                <a href="tel:+74212950920">Позвонить нам</a>
              </Button>
            </div>
          </motion.div>
        </div>
      </AnimatedSection>

      <Footer />
      <TelegramChat />
    </div>
  )
}
