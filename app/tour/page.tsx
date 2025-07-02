"use client"
import { Button } from "@/components/ui/button"
import { Eye, Maximize, Navigation, Clock } from "lucide-react"
import { motion } from "framer-motion"
import Link from "next/link"
import Header from "@/components/header"
import Footer from "@/components/footer"
import TelegramChat from "@/components/telegram-chat"

export default function TourPage() {
  return (
    <div className="bg-black text-gray-200 min-h-screen font-sans selection:bg-orange-500/30">
      <Header currentPage="/tour" />

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
                Виртуальный 3D-тур
              </span>
            </h1>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-8">
              Исследуйте наш фитнес-клуб в интерактивном режиме прямо сейчас
            </p>
          </div>

          {/* Информационные карточки */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
            <motion.div
              className="bg-zinc-900/50 p-6 rounded-xl border border-zinc-800 text-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <Eye className="w-12 h-12 text-orange-500 mx-auto mb-4" />
              <h3 className="text-lg font-bold mb-2">360° обзор</h3>
              <p className="text-gray-400 text-sm">Полный обзор всех зон клуба</p>
            </motion.div>

            <motion.div
              className="bg-zinc-900/50 p-6 rounded-xl border border-zinc-800 text-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Navigation className="w-12 h-12 text-orange-500 mx-auto mb-4" />
              <h3 className="text-lg font-bold mb-2">Интерактивная навигация</h3>
              <p className="text-gray-400 text-sm">Перемещайтесь между зонами</p>
            </motion.div>

            <motion.div
              className="bg-zinc-900/50 p-6 rounded-xl border border-zinc-800 text-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Maximize className="w-12 h-12 text-orange-500 mx-auto mb-4" />
              <h3 className="text-lg font-bold mb-2">Полноэкранный режим</h3>
              <p className="text-gray-400 text-sm">Максимальное погружение</p>
            </motion.div>

            <motion.div
              className="bg-zinc-900/50 p-6 rounded-xl border border-zinc-800 text-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Clock className="w-12 h-12 text-orange-500 mx-auto mb-4" />
              <h3 className="text-lg font-bold mb-2">24/7 доступ</h3>
              <p className="text-gray-400 text-sm">Посещайте тур в любое время</p>
            </motion.div>
          </div>

          {/* 3D тур */}
          <motion.div
            className="aspect-video w-full rounded-2xl overflow-hidden border-2 border-orange-500/50 shadow-2xl shadow-orange-500/10 mb-12"
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
              className="w-full h-full"
            ></iframe>
          </motion.div>

          {/* Инструкции */}
          <motion.div
            className="bg-gradient-to-br from-zinc-900 to-zinc-800 p-8 rounded-2xl border border-zinc-700 mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-2xl font-bold mb-6 text-center">Как пользоваться 3D-туром</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto mb-4">
                  1
                </div>
                <h3 className="font-semibold mb-2">Кликните и перетаскивайте</h3>
                <p className="text-gray-400 text-sm">Для поворота камеры в любом направлении</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto mb-4">
                  2
                </div>
                <h3 className="font-semibold mb-2">Используйте колесо мыши</h3>
                <p className="text-gray-400 text-sm">Для приближения и отдаления</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto mb-4">
                  3
                </div>
                <h3 className="font-semibold mb-2">Кликайте на точки</h3>
                <p className="text-gray-400 text-sm">Для перемещения между зонами</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto mb-4">
                  4
                </div>
                <h3 className="font-semibold mb-2">Полноэкранный режим</h3>
                <p className="text-gray-400 text-sm">Нажмите на иконку для лучшего обзора</p>
              </div>
            </div>
          </motion.div>

          {/* Что можно увидеть */}
          <motion.div
            className="mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold text-center mb-8">Что вы увидите в туре</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  title: "Тренажерный зал",
                  description: "Современное оборудование и просторные зоны для тренировок",
                },
                {
                  title: "Кардио-зона",
                  description: "Беговые дорожки, велотренажеры и эллиптические тренажеры",
                },
                {
                  title: "Зона свободных весов",
                  description: "Гантели, штанги и все необходимое для силовых тренировок",
                },
                {
                  title: "Скалодром",
                  description: "Уникальная стена для скалолазания высотой 12 метров",
                },
                {
                  title: "СПА-зона",
                  description: "Сауна, хаммам и зона релаксации для восстановления",
                },
                {
                  title: "Раздевалки",
                  description: "Просторные раздевалки с душевыми и всеми удобствами",
                },
              ].map((zone, i) => (
                <motion.div
                  key={zone.title}
                  className="bg-zinc-900/30 p-6 rounded-xl border border-zinc-800 hover:border-orange-500/30 transition-colors"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <h3 className="text-lg font-bold mb-2 text-orange-500">{zone.title}</h3>
                  <p className="text-gray-400 text-sm">{zone.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-gray-400 mb-6">Понравилось то, что увидели? Приходите к нам на пробную тренировку!</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                size="lg"
                className="bg-orange-500 hover:bg-orange-600 text-white font-bold shadow-lg shadow-orange-500/30"
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
                <Link href="/tariffs">Посмотреть тарифы</Link>
              </Button>
            </div>
          </motion.div>
        </motion.div>
      </main>

      <Footer />
      <TelegramChat />
    </div>
  )
}
