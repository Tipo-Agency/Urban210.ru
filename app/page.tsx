"use client"

import type React from "react"
import { useEffect, useState, useRef } from "react"
import { useActionState } from "react"
import { useFormStatus } from "react-dom"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"
import {
  Dumbbell,
  Zap,
  HeartPulse,
  Users,
  CheckCircle2,
  ArrowRight,
  Gift,
  Sparkles,
  FileText,
  MapPin,
  Timer,
  GraduationCap,
  RefreshCw,
  Music,
  Target,
  Heart,
  Activity,
  Flame,
  UserCheck,
} from "lucide-react"
import { motion, useScroll, useTransform, useInView, AnimatePresence } from "framer-motion"
import { submitLead } from "./actions"
import Header from "@/components/header"
import Footer from "@/components/footer"
import TelegramChat from "@/components/telegram-chat"

const AnimatedSection = ({
  children,
  className,
  id,
}: { children: React.ReactNode; className?: string; id?: string }) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  return (
    <motion.section
      ref={ref}
      id={id}
      className={className}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      {children}
    </motion.section>
  )
}

const FloatingElement = ({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) => (
  <motion.div
    initial={{ y: 0 }}
    animate={{ y: [-10, 10, -10] }}
    transition={{
      duration: 4,
      repeat: Number.POSITIVE_INFINITY,
      ease: "easeInOut",
      delay,
    }}
  >
    {children}
  </motion.div>
)

const PulseElement = ({ children }: { children: React.ReactNode }) => (
  <motion.div
    animate={{ scale: [1, 1.05, 1] }}
    transition={{
      duration: 2,
      repeat: Number.POSITIVE_INFINITY,
      ease: "easeInOut",
    }}
  >
    {children}
  </motion.div>
)

const StarIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="text-yellow-400">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
  </svg>
)

function SubmitButton() {
  const { pending } = useFormStatus()
  return (
    <Button
      type="submit"
      size="lg"
      disabled={pending}
      className="bg-orange-500 hover:bg-orange-600 text-white font-bold w-full shadow-lg shadow-orange-500/30 disabled:bg-orange-400 transform transition-all duration-300 hover:scale-105"
    >
      {pending ? "Отправка..." : "Перезвоните мне"}
    </Button>
  )
}

export default function Urban210Page() {
  const [headerBg, setHeaderBg] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const { toast } = useToast()
  const [isClient, setIsClient] = useState(false)

  const [state, formAction] = useActionState(submitLead, {
    message: "",
    errors: {},
    success: false,
  })

  const heroRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  })
  const videoParallax = useTransform(scrollYProgress, [0, 1], ["0%", "30%"])
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])

  useEffect(() => {
    if (state.message && state.success && Object.keys(state.errors).length === 0) {
      toast({
        title: "Заявка принята!",
        description: state.message,
        variant: "default",
      })
    }
  }, [state, toast])

  useEffect(() => {
    const handleScroll = () => setHeaderBg(window.scrollY > 50)
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener("scroll", handleScroll)
    window.addEventListener("mousemove", handleMouseMove)

    return () => {
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  useEffect(() => {
    setIsClient(true)
  }, [])

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault()
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  const headline = "Безлимитный фитнес".split(" ")

  return (
    <div className="bg-black text-gray-200 min-h-screen font-sans selection:bg-orange-500/30 overflow-x-hidden">
      {/* Cursor follower */}
      {isClient && (
        <motion.div
          className="fixed w-6 h-6 bg-orange-500/20 rounded-full pointer-events-none z-50 mix-blend-difference"
          animate={{
            x: mousePosition.x - 12,
            y: mousePosition.y - 12,
          }}
          transition={{ type: "spring", stiffness: 500, damping: 28 }}
        />
      )}

      <Header currentPage="/" />

      <main className="pt-0">
        <section
          ref={heroRef}
          className="relative h-[20vh] min-h-[200px] flex flex-col justify-center text-center text-white overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/70 to-black/90 z-10" />

          {/* Animated background particles */}
          <div className="absolute inset-0 z-5">
            {isClient &&
              [...Array(20)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 bg-orange-500/30 rounded-full"
                  initial={{
                    x: Math.random() * 1200,
                    y: Math.random() * 800,
                  }}
                  animate={{
                    y: [0, -100, 0],
                    opacity: [0, 1, 0],
                  }}
                  transition={{
                    duration: Math.random() * 3 + 2,
                    repeat: Number.POSITIVE_INFINITY,
                    delay: Math.random() * 2,
                  }}
                />
              ))}
          </div>

          <motion.video
            style={{ y: videoParallax }}
            autoPlay
            loop
            muted
            playsInline
            className="absolute z-0 w-auto min-w-full min-h-full max-w-none object-cover"
          >
            <source src="https://cdn.coverr.co/videos/coverr-a-woman-doing-crunches-4817/1080p.mp4" type="video/mp4" />
          </motion.video>

          <motion.div className="relative z-20 container mx-auto px-4 sm:px-6 lg:px-8" style={{ y: textY }}>
            <motion.h1 className="text-5xl md:text-7xl font-black tracking-tighter uppercase">
              {headline.map((word, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 100, rotateX: -90 }}
                  animate={{ opacity: 1, y: 0, rotateX: 0 }}
                  transition={{
                    duration: 0.8,
                    delay: 0.2 + i * 0.2,
                    ease: [0.25, 0.46, 0.45, 0.94],
                    type: "spring",
                    stiffness: 100,
                  }}
                  className="inline-block mr-4"
                  whileHover={{
                    scale: 1.1,
                    color: "#f97316",
                    textShadow: "0 0 20px rgba(249, 115, 22, 0.5)",
                  }}
                >
                  {word}
                </motion.span>
              ))}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 50, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 1, delay: 0.8, ease: "backOut" }}
              className="mt-4 text-2xl md:text-4xl font-bold text-orange-500 uppercase tracking-widest"
            >
              <motion.span
                animate={{
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                }}
                transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
                className="bg-gradient-to-r from-orange-500 via-red-500 to-orange-500 bg-clip-text text-transparent bg-[length:200%_100%]"
              >
                Твоя территория силы
              </motion.span>
            </motion.p>
          </motion.div>
        </section>

        <AnimatedSection id="membership" className="py-8 sm:py-10 bg-black relative">
          <div className="absolute inset-0 bg-gradient-to-b from-orange-500/5 to-transparent" />
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
            <motion.div
              className="text-center mb-8"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
                <motion.span
                  className="bg-gradient-to-r from-white via-orange-500 to-white bg-clip-text text-transparent"
                  animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
                  transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY }}
                >
                  Клубные карты
                </motion.span>
              </h2>
              <p className="mt-4 text-lg text-gray-400">Выберите свой идеальный тариф</p>
            </motion.div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto items-stretch">
              <PricingCard
                title="Дневная карта"
                price="1300"
                features={["Посещение с 7:00 до 17:00", "Тренажерный зал", "Кардио-зона"]}
                delay={0}
              />
              <PricingCard
                title="Все включено"
                price="2400"
                features={["Безлимитное посещение", "Все групповые программы", "Спа-зона"]}
                isPopular
                delay={0.2}
              />
              <PricingCard
                title="Полный день"
                price="1700"
                features={["Безлимитное посещение", "Тренажерный зал", "Кардио-зона"]}
                delay={0.4}
              />
            </div>
          </div>
        </AnimatedSection>

        <AnimatedSection
          id="schedule"
          className="py-8 sm:py-10 bg-black border-b-2 border-orange-500 relative overflow-hidden"
        >
          <motion.div
            className="absolute inset-0 opacity-10"
            animate={{ rotate: 360 }}
            transition={{ duration: 50, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          >
            <div className="w-full h-full bg-gradient-conic from-orange-500 via-transparent to-orange-500" />
          </motion.div>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-center">
              <motion.div
                className="lg:col-span-1"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h3 className="text-3xl font-bold uppercase flex items-center gap-3">
                  <Timer className="w-8 h-8 text-orange-500" />
                  Расписание работы
                </h3>
              </motion.div>
              <motion.div
                className="text-lg"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <p className="flex items-center gap-2 mb-2">
                  <span className="font-bold text-orange-500">ПН-ПТ</span> 06:30 - 23:30
                </p>
                <p className="flex items-center gap-2">
                  <span className="font-bold text-orange-500">СБ-ВС</span> 07:30 - 22:30
                </p>
              </motion.div>
              <motion.div
                className="flex flex-col space-y-3"
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <motion.a
                  href="/oferta#rules"
                  className="flex items-center gap-2 text-gray-300 hover:text-orange-500 transition-colors"
                  whileHover={{ scale: 1.05, x: 5 }}
                >
                  <FileText className="w-5 h-5 text-orange-500" /> Правила посещения
                </motion.a>
                <motion.p className="flex items-center gap-2 text-gray-300" whileHover={{ scale: 1.05 }}>
                  <MapPin className="w-5 h-5 text-orange-500" /> Хабаровск, Пр-т 60-летия Октября, 210
                </motion.p>
              </motion.div>
            </div>
          </div>
        </AnimatedSection>

        <AnimatedSection id="advantages" className="py-8 sm:py-10 bg-black relative">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              className="text-center mb-8"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "backOut" }}
            >
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight">Почему Urban210</h2>
              <p className="mt-4 text-lg text-gray-400 max-w-2xl mx-auto">
                Мы создали пространство, где каждый может стать лучшей версией себя.
              </p>
            </motion.div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { icon: Dumbbell, title: "Современное оборудование", desc: "Тренажеры от ведущих мировых брендов." },
                { icon: Zap, title: "Фитнес-бар", desc: "Здоровое питание и спортивные напитки." },
                { icon: HeartPulse, title: "Спа-зона", desc: "Сауна и хаммам для полного расслабления." },
                { icon: Users, title: "Опытные тренеры", desc: "Команда профессионалов для ваших целей." },
              ].map((item, i) => (
                <motion.div
                  key={item.title}
                  className="text-center p-6 bg-zinc-900/50 backdrop-blur-sm rounded-xl border border-zinc-800/50 shadow-lg hover:shadow-2xl hover:shadow-orange-500/10 hover:-translate-y-3 transition-all duration-500 group"
                  initial={{ opacity: 0, y: 50, rotateY: -15 }}
                  whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  whileHover={{
                    scale: 1.05,
                    rotateY: 5,
                    boxShadow: "0 20px 40px rgba(249, 115, 22, 0.2)",
                  }}
                >
                  <motion.div
                    className="relative"
                    whileHover={{ scale: 1.2, rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <item.icon className="w-12 h-12 mx-auto text-orange-500 mb-5 group-hover:drop-shadow-[0_0_10px_rgba(249,115,22,0.5)]" />
                    <motion.div
                      className="absolute inset-0 bg-orange-500/20 rounded-full blur-xl"
                      initial={{ scale: 0, opacity: 0 }}
                      whileHover={{ scale: 1.5, opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  </motion.div>
                  <h3 className="text-xl font-bold group-hover:text-orange-500 transition-colors">{item.title}</h3>
                  <p className="mt-2 text-gray-400 text-sm group-hover:text-gray-300 transition-colors">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </AnimatedSection>

        <AnimatedSection id="group-programs" className="py-8 sm:py-10 bg-black relative">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              className="text-center mb-8"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight">Групповые тренировки</h2>
              <p className="mt-4 text-lg text-gray-400 max-w-3xl mx-auto">
                Откройте мир энергии и гармонии! Каждый класс – это целое событие, где энергия группы умножает ваши
                усилия
              </p>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-8">
              {[
                { icon: Dumbbell, title: "Силовые", color: "from-red-500/20 to-red-600/10" },
                { icon: Activity, title: "Функциональные", color: "from-blue-500/20 to-blue-600/10" },
                { icon: Zap, title: "Степ-аэробика", color: "from-yellow-500/20 to-yellow-600/10" },
                { icon: Music, title: "Танцевальные", color: "from-pink-500/20 to-pink-600/10" },
                { icon: Heart, title: "Йога", color: "from-purple-500/20 to-purple-600/10" },
                { icon: Target, title: "Пилатес", color: "from-green-500/20 to-green-600/10" },
              ].map((program, i) => (
                <motion.div
                  key={program.title}
                  className={`text-center p-4 bg-gradient-to-br ${program.color} rounded-xl border border-zinc-800 hover:border-orange-500/30 transition-all duration-300 group`}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                >
                  <motion.div whileHover={{ scale: 1.2, rotate: 10 }} transition={{ duration: 0.3 }}>
                    <program.icon className="w-8 h-8 text-orange-500 mx-auto mb-3 group-hover:drop-shadow-[0_0_10px_rgba(249,115,22,0.5)]" />
                  </motion.div>
                  <h3 className="text-sm font-semibold group-hover:text-orange-500 transition-colors">
                    {program.title}
                  </h3>
                </motion.div>
              ))}
            </div>

            <motion.div
              className="text-center p-6 bg-gradient-to-r from-orange-500/10 to-red-500/10 rounded-2xl border border-orange-500/30"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
                <div className="flex items-center gap-3">
                  <Flame className="w-6 h-6 text-orange-500 shrink-0" />
                  <div className="text-left">
                    <h4 className="font-semibold mb-1">Мотивация и энергия</h4>
                    <p className="text-gray-400">Поддержка группы помогает достигать большего</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <UserCheck className="w-6 h-6 text-orange-500 shrink-0" />
                  <div className="text-left">
                    <h4 className="font-semibold mb-1">Профессиональные тренеры</h4>
                    <p className="text-gray-400">Опытные инструкторы обеспечивают безопасность</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Sparkles className="w-6 h-6 text-orange-500 shrink-0" />
                  <div className="text-left">
                    <h4 className="font-semibold mb-1">Разнообразие программ</h4>
                    <p className="text-gray-400">Широкий выбор направлений для всех уровней</p>
                  </div>
                </div>
              </div>
              <motion.div className="mt-6">
                <Button asChild className="bg-orange-500 hover:bg-orange-600 text-white font-bold">
                  <a href="/services">Узнать больше о программах</a>
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </AnimatedSection>

        {/* <AnimatedSection id="promotions" className="py-8 sm:py-10 bg-black relative overflow-hidden">
          <motion.div
            className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-orange-500 to-transparent"
            animate={{ x: ["-100%", "100%"] }}
            transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          />
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              className="text-center mb-8"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight">Акции и спецпредложения</h2>
              <p className="mt-4 text-lg text-gray-400">Лучшие условия для наших атлетов</p>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                {
                  icon: Gift,
                  title: "Приведи друга",
                  desc: "Получите месяц фитнеса в подарок для себя и скидку 50% для друга!",
                  action: "Узнать больше",
                },
                {
                  icon: Sparkles,
                  title: "Годовой абонемент",
                  desc: "Самый выгодный фитнес — от 13 900 ₽ за целый год без ограничений!",
                  action: "Купить карту",
                },
                {
                  icon: GraduationCap,
                  title: "Скидка для студентов",
                  desc: "Специальная скидка 66% для студентов! Фитнес стал еще доступнее.",
                  action: "Получить скидку",
                },
                {
                  icon: RefreshCw,
                  title: "Трейд-ин",
                  desc: "Обменяйте старый абонемент на новый со скидкой от 50% до 90%!",
                  action: "Обменять",
                },
              ].map((promo, i) => (
                <motion.div
                  key={promo.title}
                  className="bg-gradient-to-br from-zinc-900 to-zinc-800 p-8 rounded-2xl border border-zinc-700 flex items-center gap-8 group hover:border-orange-500/50 transition-all duration-500"
                  initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: (i % 2) * 0.2 }}
                  whileHover={{ scale: 1.02, y: -5 }}
                >
                  <FloatingElement delay={i * 0.5}>
                    <promo.icon className="w-20 h-20 text-orange-500 shrink-0 group-hover:scale-110 transition-transform duration-300" />
                  </FloatingElement>
                  <div>
                    <h3 className="text-2xl font-bold group-hover:text-orange-500 transition-colors">{promo.title}</h3>
                    <p className="text-gray-400 mt-2 mb-4 group-hover:text-gray-300 transition-colors">{promo.desc}</p>
                    <ShineButton>
                      <a
                        href="https://t.me/fcurbanmanagerbot"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center"
                      >
                        {promo.action}
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </a>
                    </ShineButton>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </AnimatedSection> */}

        <AnimatedSection id="tour" className="py-8 sm:py-10 bg-black">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              className="text-center mb-8"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight">Виртуальный 3D-тур</h2>
              <p className="mt-4 text-lg text-gray-400">Оцените масштаб клуба прямо сейчас</p>
            </motion.div>
            <motion.div
              className="aspect-video w-full max-w-5xl mx-auto rounded-lg overflow-hidden border-2 border-orange-500/50 shadow-2xl shadow-orange-500/10"
              initial={{ opacity: 0, scale: 0.8, rotateX: 15 }}
              whileInView={{ opacity: 1, scale: 1, rotateX: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "backOut" }}
              whileHover={{ scale: 1.02, boxShadow: "0 25px 50px rgba(249, 115, 22, 0.2)" }}
            >
              <iframe
                src="https://ep.matterport.host/index/?m=RX7Vmh4E33h"
                width="100%"
                height="100%"
                frameBorder="0"
                allowFullScreen
                allow="xr-spatial-tracking"
              ></iframe>
            </motion.div>
          </div>
        </AnimatedSection>

        <AnimatedSection id="programs" className="py-8 sm:py-10 bg-black">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              className="text-center mb-8"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight">Программы тренировок</h2>
              <p className="mt-4 text-lg text-gray-400">Найдите направление по душе</p>
            </motion.div>
            <Tabs defaultValue="crossfit" className="w-full">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="mb-8"
              >
                <TabsList className="grid w-full grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 max-w-5xl mx-auto bg-transparent backdrop-blur-sm  gap-2 p-2 rounded-lg">
                  <TabsTrigger value="crossfit" className="data-[state=active]:bg-orange-500 data-[state=active]:text-white text-sm sm:text-base px-2 sm:px-4 py-2 rounded-md transition-all duration-200 bg-zinc-800/50 hover:bg-zinc-700/50">
                    Кроссфит
                  </TabsTrigger>
                  <TabsTrigger value="group" className="data-[state=active]:bg-orange-500 data-[state=active]:text-white text-sm sm:text-base px-2 sm:px-4 py-2 rounded-md transition-all duration-200 bg-zinc-800/50 hover:bg-zinc-700/50">
                    Групповые
                  </TabsTrigger>
                  <TabsTrigger value="power" className="data-[state=active]:bg-orange-500 data-[state=active]:text-white text-sm sm:text-base px-2 sm:px-4 py-2 rounded-md transition-all duration-200 bg-zinc-800/50 hover:bg-zinc-700/50">
                    Силовые
                  </TabsTrigger>
                  <TabsTrigger value="spa" className="data-[state=active]:bg-orange-500 data-[state=active]:text-white text-sm sm:text-base px-2 sm:px-4 py-2 rounded-md transition-all duration-200 bg-zinc-800/50 hover:bg-zinc-700/50">
                    СПА
                  </TabsTrigger>
                </TabsList>
              </motion.div>

              <div className="relative">
                <TabsContent value="crossfit" className="mt-32 lg:mt-8">
                  <ProgramCard
                    title="Кроссфит"
                    description="Испытайте себя на прочность с нашими высокоинтенсивными интервальными тренировками. Развивайте выносливость, силу и скорость в специально оборудованной зоне."
                    image="/images/crossfit.jpg"
                    features={[
                      "Функциональные движения",
                      "Высокая интенсивность",
                      "Групповые WOD",
                      "Профессиональные тренеры",
                    ]}
                  />
                </TabsContent>

                <TabsContent value="group" className="mt-32 lg:mt-8">
                  <ProgramCard
                    title="Групповые занятия"
                    description="Зарядитесь энергией в команде единомышленников! Йога, пилатес, зумба и многое другое. Динамичные тренировки, которые не дадут вам заскучать."
                    image="/images/group-training.jpg"
                    features={["Йога и пилатес", "Танцевальные направления", "Силовые классы", "Мотивирующая атмосфера"]}
                  />
                </TabsContent>

                <TabsContent value="power" className="mt-32 lg:mt-8">
                  <ProgramCard
                    title="Силовые тренировки"
                    description="Наращивайте мышечную массу и силу под руководством наших лучших тренеров. Мы предлагаем индивидуальные программы, основанные на ваших целях и физической подготовке."
                    image="/images/strength-training.jpg"
                    features={[
                      "Персональные программы",
                      "Современные тренажеры",
                      "Техника безопасности",
                      "Отслеживание прогресса",
                    ]}
                  />
                </TabsContent>

                <TabsContent value="spa" className="mt-32 lg:mt-8">
                  <ProgramCard
                    title="СПА и восстановление"
                    description="После интенсивных тренировок важно правильно восстанавливаться. Наша СПА-зона с сауной, хаммамом и зоной релаксации поможет вам полностью расслабиться и восстановить силы."
                    image="/images/spa-recovery.png"
                    features={["Финская сауна", "Турецкий хаммам", "Зона релаксации", "Массажные кресла"]}
                  />
                </TabsContent>
              </div>
            </Tabs>
          </div>
        </AnimatedSection>

        <AnimatedSection id="contact" className="py-8 sm:py-10 bg-black">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-4xl md:text-5xl font-bold tracking-tight">Остались вопросы?</h2>
                <p className="mt-4 text-lg text-gray-400">Оставьте телефон — мы вам перезвоним и всё расскажем.</p>
                <form action={formAction} className="mt-8 space-y-4">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.1 }}
                  >
                    <Input
                      name="name"
                      type="text"
                      placeholder="Ваше имя"
                      className="bg-zinc-900/50 backdrop-blur-sm border-zinc-800 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-300"
                    />
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.2 }}
                  >
                    <Input
                      name="phone"
                      type="tel"
                      placeholder="+7 (___) ___-__-__"
                      className="bg-zinc-900/50 backdrop-blur-sm border-zinc-800 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-300"
                    />
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.3 }}
                  >
                    <SubmitButton />
                  </motion.div>
                </form>
              </motion.div>
              <motion.div
                className="rounded-2xl overflow-hidden h-[500px] shadow-2xl"
                initial={{ opacity: 0, x: 50, rotateY: -15 }}
                whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: "backOut" }}
                whileHover={{ scale: 1.02, rotateY: 5 }}
              >
                <div
                  className="w-full h-full bg-cover bg-center"
                  style={{ backgroundImage: "url('/images/contact-gym.jpg')" }}
                ></div>
              </motion.div>
            </div>
          </div>
        </AnimatedSection>
      </main>

      <Footer />
      <TelegramChat />
    </div>
  )
}

const ProgramCard = ({
  title,
  description,
  image,
  features,
}: {
  title: string
  description: string
  image: string
  features: string[]
}) => (
  <motion.div
    className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center bg-gradient-to-br from-zinc-900 to-zinc-800 p-8 rounded-2xl border border-zinc-700 hover:border-orange-500/50 transition-all duration-500"
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6 }}
    whileHover={{ scale: 1.02, y: -5 }}
  >
    <div className="order-2 md:order-1">
      <motion.h3
        className="text-3xl font-bold text-white mb-4"
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        {title}
      </motion.h3>
      <motion.p
        className="text-gray-400 mb-6"
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        {description}
      </motion.p>
      <motion.ul
        className="space-y-2 mb-6"
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        {features.map((feature, i) => (
          <motion.li
            key={feature}
            className="flex items-center gap-2 text-gray-300"
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.5 + i * 0.1 }}
          >
            <CheckCircle2 className="w-4 h-4 text-orange-500 shrink-0" />
            {feature}
          </motion.li>
        ))}
      </motion.ul>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.6 }}
      >
        <Button asChild className="bg-orange-500 hover:bg-orange-600 text-white">
          <a href="#membership">Выбрать абонемент</a>
        </Button>
      </motion.div>
    </div>
    <motion.div
      className="order-1 md:order-2 h-64 md:h-80 rounded-lg overflow-hidden"
      initial={{ opacity: 0, scale: 0.8, rotateY: 15 }}
      whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: "backOut" }}
      whileHover={{ scale: 1.05, rotateY: -5 }}
    >
      <Image
        src={image || "/placeholder.svg"}
        alt={title}
        width={600}
        height={400}
        className="w-full h-full object-cover"
      />
    </motion.div>
  </motion.div>
)

const PricingCard = ({ title, price, period = "/мес", features, isPopular = false, delay = 0 }: any) => {
  return (
    <motion.div
      className={`relative p-8 rounded-2xl border h-full flex flex-col group ${
        isPopular
          ? "border-orange-500/50 bg-gradient-to-br from-zinc-900 to-orange-900/20 scale-105 shadow-2xl shadow-orange-500/20"
          : "bg-gradient-to-br from-zinc-900 to-zinc-800 border-zinc-800 hover:border-orange-500/30"
      }`}
      initial={{ opacity: 0, y: 50, rotateX: 15 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay, ease: "backOut" }}
      whileHover={{
        y: -15,
        scale: isPopular ? 1.02 : 1.05,
        boxShadow: isPopular ? "0 25px 50px rgba(249, 115, 22, 0.3)" : "0 20px 40px rgba(249, 115, 22, 0.2)",
      }}
    >
      <AnimatePresence>
        {isPopular && (
          <motion.div
            className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-1 rounded-full text-sm font-semibold tracking-wide flex items-center gap-2"
            initial={{ opacity: 0, scale: 0, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0, y: 10 }}
            transition={{ duration: 0.3, delay: delay + 0.3 }}
          >
            <motion.div
              animate={{
                rotate: [0, 360],
                scale: [1, 1.2, 1],
              }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
            >
              <StarIcon />
            </motion.div>
            <span>Хит продаж</span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex-grow">
        <motion.h3
          className="text-2xl font-bold text-center group-hover:text-orange-500 transition-colors"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: delay + 0.1 }}
        >
          {title}
        </motion.h3>
        <motion.p
          className="text-center text-5xl font-black my-6"
          initial={{ opacity: 0, scale: 0.5 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: delay + 0.2, ease: "backOut" }}
        >
          <motion.span
            className="bg-gradient-to-r from-white to-orange-500 bg-clip-text text-transparent"
            whileHover={{ scale: 1.1 }}
          >
            {price}₽
          </motion.span>
          <span className="text-lg font-medium text-gray-500">{period}</span>
        </motion.p>
        <ul className="space-y-4 mb-8">
          {features.map((feature: string, i: number) => (
            <motion.li
              key={feature}
              className="flex items-center gap-3"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: delay + 0.3 + i * 0.1 }}
            >
              <CheckCircle2 className="w-5 h-5 text-orange-500 shrink-0" />
              <span className="group-hover:text-gray-200 transition-colors">{feature}</span>
            </motion.li>
          ))}
        </ul>
      </div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: delay + 0.5 }}
      >
        <a href="https://t.me/fcurbanbot" target="_blank" rel="noopener noreferrer" className="w-full block">
          <ShineButton className="w-full mt-auto">
              Выбрать 
          </ShineButton>
        </a>
      </motion.div>
    </motion.div>
  )
}

const ShineButton = ({
  children,
  className,
  ...props
}: { children: React.ReactNode; className?: string } & React.ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <Button
      className={`relative overflow-hidden group bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold shadow-lg shadow-orange-500/30 ${className}`}
      {...props}
    >
      <span className="relative z-10 flex items-center justify-center">{children}</span>
      <motion.span
        className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 w-full h-full block transform -skew-x-45 -translate-x-full"
        whileHover={{ translateX: "200%" }}
        transition={{ duration: 0.6 }}
      />
      <motion.div
        className="absolute inset-0 bg-orange-400/20 rounded-lg blur-xl"
        initial={{ scale: 0, opacity: 0 }}
        whileHover={{ scale: 1.5, opacity: 1 }}
        transition={{ duration: 0.3 }}
      />
    </Button>
  )
}
