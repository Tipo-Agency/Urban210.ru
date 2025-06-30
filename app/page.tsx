"use client"

import type React from "react"
import { useEffect, useState, useRef } from "react"
import { useActionState } from "react"
import { useFormStatus } from "react-dom"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/components/ui/use-toast"
import {
  Dumbbell,
  Zap,
  HeartPulse,
  Users,
  Phone,
  Instagram,
  MessageCircle,
  CheckCircle2,
  ArrowRight,
  Gift,
  Sparkles,
  FileText,
  MapPin,
  Mountain,
  Timer,
} from "lucide-react"
import { motion, useScroll, useTransform, useInView, AnimatePresence } from "framer-motion"
import { submitLead } from "./actions"

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
    if (state.message && !state.errors) {
      toast({
        title: state.success ? "Заявка принята!" : "Ошибка",
        description: state.message,
        variant: state.success ? "default" : "destructive",
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

      <header
        className={`sticky top-0 z-40 transition-all duration-500 ${headerBg ? "bg-black/90 backdrop-blur-xl shadow-2xl border-b border-orange-500/20" : "bg-transparent"}`}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <Link href="#" className="flex items-center shrink-0">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Image
                  src="/logo-dark.png"
                  alt="Urban210 Logo"
                  width={140}
                  height={40}
                  priority
                  className="object-contain"
                />
              </motion.div>
            </Link>
            <nav className="hidden lg:flex items-center space-x-8 text-sm font-medium text-gray-300">
              {[
                { href: "#membership", text: "Клубные карты" },
                { href: "#tour", text: "3D-тур" },
                { href: "#advantages", text: "Преимущества" },
                { href: "#programs", text: "Программы" },
                { href: "#contact", text: "Контакты" },
              ].map((item) => (
                <motion.a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => handleScrollTo(e, item.href.slice(1))}
                  className="hover:text-orange-500 transition-colors relative"
                  whileHover={{ y: -2 }}
                >
                  {item.text}
                  <motion.div
                    className="absolute -bottom-1 left-0 w-0 h-0.5 bg-orange-500"
                    whileHover={{ width: "100%" }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.a>
              ))}
            </nav>
            <div className="flex items-center space-x-4">
              <motion.a
                href="tel:+79242057500"
                className="hidden sm:flex items-center gap-2 text-sm font-semibold hover:text-orange-500 transition-colors"
                whileHover={{ scale: 1.05 }}
              >
                <Phone className="w-4 h-4" /> +7 (924) 205-75-00
              </motion.a>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button asChild className="bg-orange-500 text-white hover:bg-orange-600 shadow-lg shadow-orange-500/20">
                  <a href="#">Личный кабинет</a>
                </Button>
              </motion.div>
            </div>
          </div>
        </div>
      </header>

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
                features={["Безлимитное посещение", "Все групповые программы", "Спа-зона", "Скалодром"]}
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 items-center">
              <motion.div
                className="lg:col-span-2"
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
                <p className="flex items-center gap-2">
                  <span className="font-bold text-orange-500">ПН-ПТ</span> 06:30 - 23:30
                </p>
                <p className="flex items-center gap-2">
                  <span className="font-bold text-orange-500">СБ-ВС</span> 07:30 - 22:30
                </p>
              </motion.div>
              <motion.div
                className="flex flex-col items-start md:items-end space-y-2"
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <motion.a
                  href="#"
                  className="flex items-center gap-2 text-gray-300 hover:text-orange-500 transition-colors"
                  whileHover={{ scale: 1.05, x: -5 }}
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
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
              {[
                { icon: Dumbbell, title: "Современное оборудование", desc: "Тренажеры от ведущих мировых брендов." },
                { icon: Zap, title: "Фитнес-бар", desc: "Здоровое питание и спортивные напитки." },
                { icon: HeartPulse, title: "Спа-зона", desc: "Сауна и хаммам для полного расслабления." },
                { icon: Users, title: "Опытные тренеры", desc: "Команда профессионалов для ваших целей." },
                { icon: Mountain, title: "Скалодром", desc: "Уникальная стена для скалолазания в городе." },
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

        <AnimatedSection id="promotions" className="py-8 sm:py-10 bg-black relative overflow-hidden">
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
                  desc: "Самый выгодный фитнес — всего 14 000 ₽ за целый год без ограничений!",
                  action: "Купить карту",
                },
              ].map((promo, i) => (
                <motion.div
                  key={promo.title}
                  className="bg-gradient-to-br from-zinc-900 to-zinc-800 p-8 rounded-2xl border border-zinc-700 flex items-center gap-8 group hover:border-orange-500/50 transition-all duration-500"
                  initial={{ opacity: 0, x: i === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.2 }}
                  whileHover={{ scale: 1.02, y: -5 }}
                >
                  <FloatingElement delay={i * 0.5}>
                    <promo.icon className="w-20 h-20 text-orange-500 shrink-0 group-hover:scale-110 transition-transform duration-300" />
                  </FloatingElement>
                  <div>
                    <h3 className="text-2xl font-bold group-hover:text-orange-500 transition-colors">{promo.title}</h3>
                    <p className="text-gray-400 mt-2 mb-4 group-hover:text-gray-300 transition-colors">{promo.desc}</p>
                    <ShineButton>
                      {promo.action}
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </ShineButton>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </AnimatedSection>

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
              >
                <TabsList className="grid w-full grid-cols-4 max-w-3xl mx-auto bg-zinc-900/50 backdrop-blur-sm border border-zinc-800">
                  <TabsTrigger value="crossfit" className="data-[state=active]:bg-orange-500">
                    Кроссфит
                  </TabsTrigger>
                  <TabsTrigger value="group" className="data-[state=active]:bg-orange-500">
                    Групповые
                  </TabsTrigger>
                  <TabsTrigger value="power" className="data-[state=active]:bg-orange-500">
                    Силовые
                  </TabsTrigger>
                  <TabsTrigger value="climbing" className="data-[state=active]:bg-orange-500">
                    Скалодром
                  </TabsTrigger>
                </TabsList>
              </motion.div>

              <TabsContent value="crossfit" className="mt-8">
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

              <TabsContent value="group" className="mt-8">
                <ProgramCard
                  title="Групповые занятия"
                  description="Зарядитесь энергией в команде единомышленников! Йога, пилатес, зумба и многое другое. Динамичные тренировки, которые не дадут вам заскучать."
                  image="/images/group-training.jpg"
                  features={["Йога и пилатес", "Танцевальные направления", "Силовые классы", "Мотивирующая атмосфера"]}
                />
              </TabsContent>

              <TabsContent value="power" className="mt-8">
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

              <TabsContent value="climbing" className="mt-8">
                <ProgramCard
                  title="Скалодром"
                  description="Уникальная возможность заниматься скалолазанием в городских условиях! Развивайте координацию, силу и выносливость на нашей профессиональной скалодромной стене высотой 12 метров."
                  image="/images/rest-recovery.jpg"
                  features={[
                    "Стена высотой 12м",
                    "Разные уровни сложности",
                    "Безопасное снаряжение",
                    "Инструктаж для новичков",
                  ]}
                />
              </TabsContent>
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
                  style={{ backgroundImage: "url('https://i.imgur.com/3Z3eZ8X.png')" }}
                ></div>
              </motion.div>
            </div>
          </div>
        </AnimatedSection>
      </main>

      <footer className="bg-black border-t border-zinc-800 relative overflow-hidden">
        <motion.div
          className="absolute inset-0 opacity-5"
          animate={{
            background: [
              "radial-gradient(circle at 20% 50%, #f97316 0%, transparent 50%)",
              "radial-gradient(circle at 80% 50%, #f97316 0%, transparent 50%)",
              "radial-gradient(circle at 20% 50%, #f97316 0%, transparent 50%)",
            ],
          }}
          transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY }}
        />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 relative">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <motion.div
              className="lg:col-span-1"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Link href="#">
                <motion.div whileHover={{ scale: 1.05 }}>
                  <Image src="/logo-dark.png" alt="Urban210 Logo" width={140} height={40} className="object-contain" />
                </motion.div>
              </Link>
              <p className="mt-4 text-sm text-gray-400">Современный фитнес-клуб для тех, кто стремится к большему.</p>
              <div className="mt-6 flex space-x-4">
                <SocialIcon href="#" icon={Instagram} />
                <SocialIcon href="https://wa.me/79242057500" icon={MessageCircle} />
              </div>
            </motion.div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8 lg:col-span-3">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <h4 className="font-semibold text-white">Навигация</h4>
                <ul className="mt-4 space-y-2 text-sm">
                  {[
                    { href: "#membership", text: "Карты" },
                    { href: "#advantages", text: "Преимущества" },
                    { href: "#programs", text: "Программы" },
                    { href: "#contact", text: "Контакты" },
                  ].map((item) => (
                    <li key={item.href}>
                      <motion.a
                        href={item.href}
                        onClick={(e) => handleScrollTo(e, item.href.slice(1))}
                        className="text-gray-400 hover:text-orange-500 transition-colors"
                        whileHover={{ x: 5 }}
                      >
                        {item.text}
                      </motion.a>
                    </li>
                  ))}
                </ul>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <h4 className="font-semibold text-white">Информация</h4>
                <ul className="mt-4 space-y-2 text-sm">
                  <li>
                    <motion.div whileHover={{ x: 5 }}>
                      <Link href="#" className="text-gray-400 hover:text-orange-500 transition-colors">
                        Политика конфиденциальности
                      </Link>
                    </motion.div>
                  </li>
                  <li>
                    <motion.div whileHover={{ x: 5 }}>
                      <Link href="#" className="text-gray-400 hover:text-orange-500 transition-colors">
                        Договор-оферта
                      </Link>
                    </motion.div>
                  </li>
                </ul>
              </motion.div>
            </div>
          </div>
          <motion.div
            className="mt-10 pt-8 border-t border-zinc-800 text-center text-sm text-gray-500"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <p>&copy; {new Date().getFullYear()} Urban210. Все права защищены.</p>
          </motion.div>
        </div>
      </footer>

      <motion.div
        className="fixed bottom-5 right-5 z-50"
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ duration: 0.5, delay: 1 }}
      >
        <PulseElement>
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            <Button className="rounded-full w-16 h-16 bg-orange-500 hover:bg-orange-600 shadow-lg shadow-orange-500/30">
              <MessageCircle className="w-8 h-8" />
            </Button>
          </motion.div>
        </PulseElement>
      </motion.div>
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
            className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-1 rounded-full text-sm font-semibold tracking-wide"
            initial={{ opacity: 0, scale: 0, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0, y: 10 }}
            transition={{ duration: 0.3, delay: delay + 0.3 }}
          >
            <motion.span
              animate={{
                textShadow: [
                  "0 0 0px rgba(255,255,255,0)",
                  "0 0 10px rgba(255,255,255,0.5)",
                  "0 0 0px rgba(255,255,255,0)",
                ],
              }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
            >
              ⭐ Хит продаж
            </motion.span>
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
              <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0" />
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
        <ShineButton className="w-full mt-auto">
          <a href="https://t.me/fcurbanbot" target="_blank" rel="noopener noreferrer" className="w-full block">
            Выбрать
          </a>
        </ShineButton>
      </motion.div>
    </motion.div>
  )
}

const SocialIcon = ({ href, icon: Icon }: any) => (
  <motion.a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="p-3 bg-zinc-800 rounded-full text-gray-400 hover:bg-orange-500 hover:text-white transition-all duration-300"
    whileHover={{ scale: 1.1, rotate: 5 }}
    whileTap={{ scale: 0.9 }}
  >
    <Icon className="w-5 h-5" />
  </motion.a>
)

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
