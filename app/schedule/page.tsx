"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsTrigger, TabsList } from "@/components/ui/tabs"
import { Calendar, Clock, Users, MapPin, Filter, Search, Star, ChevronLeft, ChevronRight } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import Header from "@/components/header"
import Footer from "@/components/footer"
import TelegramChat from "@/components/telegram-chat"

// Моковые данные для красивого расписания
const scheduleData = {
  monday: [
    {
      time: "18:30",
      name: "Functional",
      trainer: "Павел",
      duration: "x мин",
      level: "Продвинутый",
      spots: 12,
      maxSpots: 15,
      type: "functional",
      date: "2025-07-14",
    },
    {
      time: "19:00",
      name: "Body Pump",
      trainer: "Ева",
      duration: "х мин",
      level: "Продвинутый",
      spots: 8,
      maxSpots: 10,
      type: "bodypump",
      date: "2025-07-14",
    },
    {
      time: "19:00",
      name: "RPM",
      trainer: "Анастасия",
      duration: "х мин",
      level: "Средний",
      spots: 10,
      maxSpots: 12,
      type: "rpm",
      date: "2025-07-14",
    },
    {
      time: "20:00",
      name: "Body Balance",
      trainer: "Ева",
      duration: "х мин",
      level: "Начинающий",
      spots: 6,
      maxSpots: 8,
      type: "bodybalance",
      date: "2025-07-14",
    },
  ],
  tuesday: [
    {
      time: "10:00",
      name: "ABL",
      trainer: "Игорь",
      duration: "х мин",
      level: "Продвинутый",
      spots: 7,
      maxSpots: 10,
      type: "abl",
      date: "2025-07-15",
    },
    {
      time: "11:00",
      name: "ABS+Stretch",
      trainer: "Игорь",
      duration: "х мин",
      level: "Средний",
      spots: 8,
      maxSpots: 12,
      type: "absstretch",
      date: "2025-07-15",
    },
    {
      time: "18:00",
      name: "Pilates",
      trainer: "Pilates",
      duration: "х мин",
      level: "Продвинутый",
      spots: 5,
      maxSpots: 8,
      type: "pilates",
      date: "2025-07-15",
    },
    {
      time: "18:30",
      name: "ABS",
      trainer: "Игорь",
      duration: "х мин",
      level: "Продвинутый",
      spots: 12,
      maxSpots: 15,
      type: "abs",
      date: "2025-07-15",
    },
    {
      time: "19:00",
      name: "Core",
      trainer: "Игорь",
      duration: "х мин",
      level: "Продвинутый",
      spots: 12,
      maxSpots: 15,
      type: "core",
      date: "2025-07-15",
    },
    {
      time: "19:00",
      name: "Stretch",
      trainer: "Марина",
      duration: "х мин",
      level: "Начинающий",
      spots: 12,
      maxSpots: 15,
      type: "stretch",
      date: "2025-07-15",
    },
    {
      time: "20:00",
      name: "Step Mix",
      trainer: "Игорь",
      duration: "х мин",
      level: "Средний",
      spots: 12,
      maxSpots: 15,
      type: "stepmix",
      date: "2025-07-15",
    },
  ],
  wednesday: [
    {
      time: "18:30",
      name: "Functional",
      trainer: "Павел",
      duration: "х мин",
      level: "Продвинутый",
      spots: 9,
      maxSpots: 10,
      type: "functional",
      date: "2025-07-16",
    },
    {
      time: "19:00",
      name: "Super Body",
      trainer: "Ева",
      duration: "х мин",
      level: "Продвинутый",
      spots: 8,
      maxSpots: 12,
      type: "superbody",
      date: "2025-07-16",
    },
    {
      time: "19:30",
      name: "HIIT",
      trainer: "Анастасия",
      duration: "х мин",
      level: "Продвинутый",
      spots: 6,
      maxSpots: 8,
      type: "hiit",
      date: "2025-07-16",
    },
    {
      time: "20:00",
      name: "Healthy Back",
      trainer: "Ева",
      duration: "х мин",
      level: "Начинающий",
      spots: 14,
      maxSpots: 18,
      type: "healthyback",
      date: "2025-07-16",
    },
  ],
  thursday: [
    {
      time: "18:00",
      name: "Pilates",
      trainer: "Pilates",
      duration: "х мин",
      level: "Начинающий",
      spots: 10,
      maxSpots: 12,
      type: "pilates",
      date: "2025-07-17",
    },
    {
      time: "19:00",
      name: "Body Balance",
      trainer: "Марина",
      duration: "х мин",
      level: "Начинающий",
      spots: 8,
      maxSpots: 10,
      type: "bodybalance",
      date: "2025-07-17",
    },
    {
      time: "19:00",
      name: "ABL",
      trainer: "Ева",
      duration: "х мин",
      level: "Продвинутый",
      spots: 11,
      maxSpots: 15,
      type: "abl",
      date: "2025-07-17",
    },
    {
      time: "20:00",
      name: "Step MIX",
      trainer: "Ева",
      duration: "х мин",
      level: "Средний",
      spots: 11,
      maxSpots: 15,
      type: "stepmix",
      date: "2025-07-17",
    },
  ],
  friday: [
    {
      time: "10:00",
      name: "Tabata",
      trainer: "Андрей",
      duration: "х мин",
      level: "Средний",
      spots: 7,
      maxSpots: 10,
      type: "tabata",
      date: "2025-07-18",
    },
    {
      time: "11:00",
      name: "Latina MIX",
      trainer: "Андрей",
      duration: "х мин",
      level: "Средний",
      spots: 9,
      maxSpots: 12,
      type: "latinamix",
      date: "2025-07-18",
    },
    {
      time: "18:30",
      name: "Functional",
      trainer: "Павел",
      duration: "х мин",
      level: "Продвинутый",
      spots: 18,
      maxSpots: 25,
      type: "functional",
      date: "2025-07-18",
    },
    {
      time: "19:00",
      name: "Body Pump",
      trainer: "Игорь",
      duration: "х мин",
      level: "Продвинутый",
      spots: 8,
      maxSpots: 12,
      type: "bodypump",
      date: "2025-07-18",
    },
    {
      time: "20:00",
      name: "Stretch",
      trainer: "Игорь",
      duration: "х мин",
      level: "Начинающий",
      spots: 8,
      maxSpots: 12,
      type: "stretch",
      date: "2025-07-18",
    },
  ],
  saturday: [
    {
      time: "10:00",
      name: "RPM",
      trainer: "Анастасия",
      duration: "х мин",
      level: "Средний",
      spots: 15,
      maxSpots: 20,
      type: "rpm",
      date: "2025-07-19",
    },
    {
      time: "11:00",
      name: "Functional",
      trainer: "Павел",
      duration: "х мин",
      level: "Продвинутый",
      spots: 8,
      maxSpots: 12,
      type: "functional",
      date: "2025-07-19",
    },
    {
      time: "11:00",
      name: "Stretch",
      trainer: "Анастасия",
      duration: "х мин",
      level: "Начинающий",
      spots: 6,
      maxSpots: 8,
      type: "stretch",
      date: "2025-07-19",
    },
    {
      time: "14:00",
      name: "Yoga",
      trainer: "Анна",
      duration: "х мин",
      level: "Начинающий",
      spots: 6,
      maxSpots: 8,  
      type: "yoga",
      date: "2025-07-19",
    },
  ],
  sunday: [
    {
      time: "11:00",
      name: "ABL",
      trainer: "Игорь",
      duration: "х мин",
      level: "Продвинутый",
      spots: 12,
      maxSpots: 15,
      type: "abl",
      date: "2025-07-20",
    },
    {
      time: "12:00",
      name: "Stretch",
      trainer: "Игорь",
      duration: "х мин",
      level: "Начинающий",
      spots: 6,
      maxSpots: 8,
      type: "stretch",
      date: "2025-07-20",
    },
    {
      time: "17:00",
      name: "Step MIX",
      trainer: "Игорь",
      duration: "х мин",
      level: "Средний",
      spots: 10,
      maxSpots: 15,
      type: "stepmix",
      date: "2025-07-20",
    },
  ],
}

const typeColors: Record<string, string> = {
  yoga: "bg-purple-500/20 text-purple-300 border-purple-500/30",
  crossfit: "bg-red-500/20 text-red-300 border-red-500/30",
  pilates: "bg-pink-500/20 text-pink-300 border-pink-500/30",
  strength: "bg-blue-500/20 text-blue-300 border-blue-500/30",
  dance: "bg-yellow-500/20 text-yellow-300 border-yellow-500/30",
  functional: "bg-green-500/20 text-green-300 border-green-500/30",
  boxing: "bg-orange-500/20 text-orange-300 border-orange-500/30",
  stretching: "bg-teal-500/20 text-teal-300 border-teal-500/30",
  aqua: "bg-cyan-500/20 text-cyan-300 border-cyan-500/30",
  trx: "bg-indigo-500/20 text-indigo-300 border-indigo-500/30",
  family: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
  swimming: "bg-sky-500/20 text-sky-300 border-sky-500/30",
}

const levelColors: Record<string, string> = {
  Начинающий: "bg-green-500/20 text-green-300",
  Средний: "bg-yellow-500/20 text-yellow-300",
  Продвинутый: "bg-red-500/20 text-red-300",
}

const ClassCard = ({ classItem, delay = 0 }: any) => {
  const spotsLeft = classItem.maxSpots - classItem.spots
  const isAlmostFull = spotsLeft <= 3
  const isFull = spotsLeft === 0

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("ru-RU", {
      day: "numeric",
      month: "short",
    })
  }

  return (
    <motion.div
      className="bg-gradient-to-br from-zinc-900 to-zinc-800 p-4 sm:p-6 rounded-xl border border-zinc-800 hover:border-orange-500/50 transition-all duration-500 group"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      whileHover={{ scale: 1.02, y: -5 }}
    >
      <div className="flex justify-between items-start mb-3 sm:mb-4">
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="text-xl sm:text-2xl font-bold text-orange-500">{classItem.time}</div>
          <div
            className={`px-2 py-1 rounded-full text-xs border ${typeColors[classItem.type] || typeColors.functional}`}
          >
            {classItem.type}
          </div>
        </div>
        <div className="flex flex-col items-end">
          <div className="flex items-center gap-1 mb-1">
            <Star className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-400 fill-current" />
            <span className="text-xs sm:text-sm text-gray-400">4.8</span>
          </div>
          <div className="text-xs text-gray-500">{formatDate(classItem.date)}</div>
        </div>
      </div>

      <h3 className="text-lg sm:text-xl font-bold mb-2 group-hover:text-orange-500 transition-colors line-clamp-2">
        {classItem.name}
      </h3>

      <div className="flex items-center gap-2 mb-3">
        <Users className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400 shrink-0" />
        <span className="text-xs sm:text-sm text-gray-400 truncate">{classItem.trainer}</span>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-4 mb-4">
        <div className="flex items-center gap-3 sm:gap-4 text-xs sm:text-sm text-gray-400">
          <div className="flex items-center gap-1">
            <Clock className="w-3 h-3 sm:w-4 sm:h-4" />
            {classItem.duration}
          </div>
          <div className={`px-2 py-1 rounded-full text-xs ${levelColors[classItem.level]}`}>{classItem.level}</div>
        </div>
      </div>

      <div className="flex items-center justify-between mb-3 sm:mb-4">
        <div className="text-xs sm:text-sm">
          <span className={`${isFull ? "text-red-400" : isAlmostFull ? "text-yellow-400" : "text-green-400"}`}>
            {isFull ? "Мест нет" : `${spotsLeft} мест`}
          </span>
          <span className="text-gray-500"> из {classItem.maxSpots}</span>
        </div>
        <Button
          size="sm"
          disabled={isFull}
          className={`${
            isFull ? "bg-gray-600 cursor-not-allowed" : "bg-orange-500 hover:bg-orange-600"
          } text-white transition-all duration-300 text-xs sm:text-sm px-3 sm:px-4`}
        >
          {isFull ? "Занято" : "Записаться"}
        </Button>
      </div>

      {/* Прогресс-бар заполненности */}
      <div className="mt-3 sm:mt-4">
        <div className="w-full bg-zinc-700 rounded-full h-1.5 sm:h-2">
          <div
            className={`h-1.5 sm:h-2 rounded-full transition-all duration-500 ${
              isFull ? "bg-red-500" : isAlmostFull ? "bg-yellow-500" : "bg-green-500"
            }`}
            style={{ width: `${(classItem.spots / classItem.maxSpots) * 100}%` }}
          />
        </div>
      </div>
    </motion.div>
  )
}

export default function SchedulePage() {
  const [activeDay, setActiveDay] = useState("monday")
  const [currentWeek, setCurrentWeek] = useState(0)

  const days = [
    { key: "monday", label: "Понедельник", short: "ПН" },
    { key: "tuesday", label: "Вторник", short: "ВТ" },
    { key: "wednesday", label: "Среда", short: "СР" },
    { key: "thursday", label: "Четверг", short: "ЧТ" },
    { key: "friday", label: "Пятница", short: "ПТ" },
    { key: "saturday", label: "Суббота", short: "СБ" },
    { key: "sunday", label: "Воскресенье", short: "ВС" },
  ]

  const getWeekDates = (weekOffset: number) => {
    const today = new Date()
    const startOfWeek = new Date(today.setDate(today.getDate() - today.getDay() + 1 + weekOffset * 7))
    const dates = []
    for (let i = 0; i < 7; i++) {
      const date = new Date(startOfWeek)
      date.setDate(startOfWeek.getDate() + i)
      dates.push(date)
    }
    return dates
  }

  const weekDates = getWeekDates(currentWeek)

  const formatWeekRange = () => {
    const start = weekDates[0]
    const end = weekDates[6]
    return `${start.getDate()} ${start.toLocaleDateString("ru-RU", { month: "short" })} - ${end.getDate()} ${end.toLocaleDateString("ru-RU", { month: "short" })}`
  }

  return (
    <div className="bg-black text-gray-200 min-h-screen font-sans selection:bg-orange-500/30">
      <Header currentPage="/schedule" />

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-7xl mx-auto"
        >
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
              <span className="bg-gradient-to-r from-white via-orange-500 to-white bg-clip-text text-transparent">
                Расписание тренировок
              </span>
            </h1>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-8">
              Выберите удобное время для тренировок и групповых занятий
            </p>
          </div>

          {/* Информационные карточки */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <motion.div
              className="bg-zinc-900/50 p-6 rounded-xl border border-zinc-800 text-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <Clock className="w-12 h-12 text-orange-500 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Режим работы</h3>
              <p className="text-gray-400 text-sm">
                ПН-ПТ: 06:30 - 23:30
                <br />
                СБ-ВС: 07:30 - 22:30
              </p>
            </motion.div>

            <motion.div
              className="bg-zinc-900/50 p-6 rounded-xl border border-zinc-800 text-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Users className="w-12 h-12 text-orange-500 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Групповые занятия</h3>
              <p className="text-gray-400 text-sm">
                Более 20 видов
                <br />
                групповых программ
              </p>
            </motion.div>

            <motion.div
              className="bg-zinc-900/50 p-6 rounded-xl border border-zinc-800 text-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <MapPin className="w-12 h-12 text-orange-500 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Адрес</h3>
              <p className="text-gray-400 text-sm">
                г. Хабаровск
                <br />
                Пр-т 60-летия Октября, 210
              </p>
            </motion.div>
          </div>

          {/* Расписание */}
          <motion.div
            className="bg-zinc-900/30 rounded-2xl border border-zinc-800 overflow-hidden"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {/* Заголовок и кнопки */}
            <div className="p-4 sm:p-6 border-b border-zinc-800">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                <div className="flex items-center gap-3">
                  <Calendar className="w-6 h-6 text-orange-500" />
                  <h2 className="text-xl sm:text-2xl font-bold">Расписание занятий</h2>
                </div>
                <div className="flex items-center gap-2 sm:gap-4">
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-zinc-700 text-gray-400 bg-transparent hover:bg-orange-500 hover:text-white hover:border-orange-500 flex-1 sm:flex-none"
                  >
                    <Filter className="w-4 h-4 mr-1 sm:mr-2" />
                    <span className="hidden sm:inline">Фильтр</span>
                    <span className="sm:hidden">Фильтр</span>
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-zinc-700 text-gray-400 bg-transparent hover:bg-orange-500 hover:text-white hover:border-orange-500 flex-1 sm:flex-none"
                  >
                    <Search className="w-4 h-4 mr-1 sm:mr-2" />
                    <span className="hidden sm:inline">Поиск</span>
                    <span className="sm:hidden">Поиск</span>
                  </Button>
                </div>
              </div>

              {/* Навигация по неделям */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentWeek(currentWeek - 1)}
                  className="border-zinc-700 text-gray-400 bg-transparent hover:bg-orange-500 hover:text-white hover:border-orange-500 transition-all duration-300 order-2 sm:order-1"
                >
                  <ChevronLeft className="w-4 h-4 mr-1 sm:mr-2" />
                  <span className="text-xs sm:text-sm">Предыдущая</span>
                </Button>

                <div className="text-center order-1 sm:order-2">
                  <p className="text-lg sm:text-xl font-bold text-orange-500 mb-1">{formatWeekRange()}</p>
                  <p className="text-xs sm:text-sm text-gray-400">
                    {currentWeek === 0 ? "Текущая неделя" : currentWeek > 0 ? "Следующая неделя" : "Прошлая неделя"}
                  </p>
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentWeek(currentWeek + 1)}
                  className="border-zinc-700 text-gray-400 bg-transparent hover:bg-orange-500 hover:text-white hover:border-orange-500 transition-all duration-300 order-3"
                >
                  <span className="text-xs sm:text-sm">Следующая</span>
                  <ChevronRight className="w-4 h-4 ml-1 sm:ml-2" />
                </Button>
              </div>

              <p className="text-gray-400 text-center text-sm">
                Записывайтесь на занятия заранее. Количество мест ограничено.
              </p>
            </div>

            {/* Переключатель дней недели */}
            <Tabs value={activeDay} onValueChange={setActiveDay} className="w-full">
              <div className="px-4 sm:px-6 py-4 sm:py-6 border-b border-zinc-800">
                <TabsList className="grid grid-cols-7 gap-1 sm:gap-2 bg-zinc-800/30 p-1 sm:p-2 rounded-xl w-full h-auto">
                  {days.map((day, index) => (
                    <TabsTrigger
                      key={day.key}
                      value={day.key}
                      className="data-[state=active]:bg-orange-500 data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:shadow-orange-500/30 text-gray-400 hover:text-white hover:bg-zinc-700 transition-all duration-300 flex flex-col py-2 sm:py-3 px-1 sm:px-2 rounded-lg border-0 h-auto text-center"
                    >
                      <span className="text-xs sm:text-sm font-semibold mb-1">{day.short}</span>
                      <span className="text-xs opacity-80">
                        {weekDates[index].getDate()}.{(weekDates[index].getMonth() + 1).toString().padStart(2, "0")}
                      </span>
                    </TabsTrigger>
                  ))}
                </TabsList>
              </div>

              {/* Контент дней */}
              {days.map((day) => (
                <TabsContent key={day.key} value={day.key} className="p-4 sm:p-6 mt-0">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={day.key}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                    >
                      <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-orange-500">{day.label}</h3>
                      {scheduleData[day.key as keyof typeof scheduleData]?.length > 0 ? (
                        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
                          {scheduleData[day.key as keyof typeof scheduleData].map((classItem, index) => (
                            <ClassCard key={index} classItem={classItem} delay={index * 0.1} />
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-8 sm:py-12">
                          <Calendar className="w-12 h-12 sm:w-16 sm:h-16 text-gray-600 mx-auto mb-4" />
                          <h3 className="text-lg sm:text-xl font-semibold text-gray-400 mb-2">
                            Занятий не запланировано
                          </h3>
                          <p className="text-gray-500 text-sm sm:text-base">
                            В этот день групповые занятия не проводятся
                          </p>
                        </div>
                      )}
                    </motion.div>
                  </AnimatePresence>
                </TabsContent>
              ))}
            </Tabs>
          </motion.div>

          <motion.div
            className="text-center mt-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <p className="text-gray-400 mb-6">Нужна помощь с записью на тренировку? Обращайтесь к администратору!</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                size="lg"
                className="bg-orange-500 hover:bg-orange-600 text-white font-bold shadow-lg shadow-orange-500/30"
              >
                <a href="https://t.me/fcurbanbot" target="_blank" rel="noopener noreferrer">
                  Записаться на тренировку
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
        </motion.div>
      </main>

      <Footer />
      <TelegramChat />
    </div>
  )
}
