"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  CreditCard,
  Calendar,
  BarChart3,
  Settings,
  Phone,
  Mail,
  Clock,
  Trophy,
  Target,
  Activity,
  LogOut,
  Edit,
  Plus,
  CheckCircle,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import Header from "@/components/header"
import Footer from "@/components/footer"
import TelegramChat from "@/components/telegram-chat"

// Мокированные данные пользователя
const userData = {
  name: "Александр Петров",
  email: "alex.petrov@example.com",
  phone: "+7 (999) 123-45-67",
  memberSince: "15 января 2024",
  avatar: "/placeholder.svg?height=100&width=100&text=АП",
  currentTariff: {
    name: "Полный день",
    price: "1700₽/мес",
    validUntil: "15 февраля 2025",
    daysLeft: 28,
    status: "active",
  },
  stats: {
    totalWorkouts: 47,
    thisMonth: 12,
    streak: 5,
    favoriteTime: "18:00-20:00",
  },
  upcomingBookings: [
    {
      id: 1,
      type: "CrossFit",
      date: "Сегодня",
      time: "18:00",
      trainer: "Михаил Иванов",
      status: "confirmed",
    },
    {
      id: 2,
      type: "Силовая тренировка",
      date: "Завтра",
      time: "19:30",
      trainer: "Елена Смирнова",
      status: "confirmed",
    },
    {
      id: 3,
      type: "Групповая тренировка",
      date: "5 июля",
      time: "17:00",
      trainer: "Дмитрий Козлов",
      status: "pending",
    },
  ],
  paymentHistory: [
    {
      id: 1,
      date: "15 января 2025",
      amount: "1700₽",
      description: "Абонемент Полный день",
      status: "paid",
    },
    {
      id: 2,
      date: "15 декабря 2024",
      amount: "1700₽",
      description: "Абонемент Полный день",
      status: "paid",
    },
    {
      id: 3,
      date: "15 ноября 2024",
      amount: "1700₽",
      description: "Абонемент Полный день",
      status: "paid",
    },
  ],
}

export default function CabinetPage() {
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <div className="min-h-screen bg-black text-white">
      <Header currentPage="/cabinet" />

      <main className="container mx-auto px-4 py-8">
        {/* Заголовок страницы */}
        <div className="mb-8">
          <motion.h1
            className="text-4xl md:text-5xl font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Личный{" "}
            <span className="bg-gradient-to-r from-white via-orange-500 to-white bg-clip-text text-transparent">
              кабинет
            </span>
          </motion.h1>
          <p className="text-gray-400 text-lg">Управляйте своими тренировками и подписками</p>
        </div>

        {/* Профиль пользователя */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <Card className="bg-zinc-900 border-zinc-800">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                <div className="w-20 h-20 rounded-full bg-orange-500 flex items-center justify-center text-2xl font-bold">
                  {userData.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold mb-2">{userData.name}</h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-400">
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4" />
                      {userData.email}
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4" />
                      {userData.phone}
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      Член клуба с {userData.memberSince}
                    </div>
                  </div>
                </div>
                <Button
                  variant="outline"
                  className="border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white bg-transparent"
                >
                  <Edit className="w-4 h-4 mr-2" />
                  Редактировать
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Табы */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-5 bg-zinc-900 mb-8">
            <TabsTrigger value="overview" className="data-[state=active]:bg-orange-500">
              <BarChart3 className="w-4 h-4 mr-2" />
              Обзор
            </TabsTrigger>
            <TabsTrigger value="schedule" className="data-[state=active]:bg-orange-500">
              <Calendar className="w-4 h-4 mr-2" />
              Расписание
            </TabsTrigger>
            <TabsTrigger value="subscription" className="data-[state=active]:bg-orange-500">
              <CreditCard className="w-4 h-4 mr-2" />
              Подписка
            </TabsTrigger>
            <TabsTrigger value="payments" className="data-[state=active]:bg-orange-500">
              <Activity className="w-4 h-4 mr-2" />
              Платежи
            </TabsTrigger>
            <TabsTrigger value="settings" className="data-[state=active]:bg-orange-500">
              <Settings className="w-4 h-4 mr-2" />
              Настройки
            </TabsTrigger>
          </TabsList>

          {/* Обзор */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="bg-zinc-900 border-zinc-800">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-400">Всего тренировок</p>
                      <p className="text-3xl font-bold text-orange-500">{userData.stats.totalWorkouts}</p>
                    </div>
                    <Trophy className="w-8 h-8 text-orange-500" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-zinc-900 border-zinc-800">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-400">В этом месяце</p>
                      <p className="text-3xl font-bold text-orange-500">{userData.stats.thisMonth}</p>
                    </div>
                    <Target className="w-8 h-8 text-orange-500" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-zinc-900 border-zinc-800">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-400">Серия тренировок</p>
                      <p className="text-3xl font-bold text-orange-500">{userData.stats.streak}</p>
                    </div>
                    <Activity className="w-8 h-8 text-orange-500" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-zinc-900 border-zinc-800">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-400">Любимое время</p>
                      <p className="text-lg font-bold text-orange-500">{userData.stats.favoriteTime}</p>
                    </div>
                    <Clock className="w-8 h-8 text-orange-500" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Текущая подписка */}
            <Card className="bg-zinc-900 border-zinc-800">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="w-5 h-5 text-orange-500" />
                  Текущая подписка
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                  <div>
                    <h3 className="text-xl font-bold mb-2">{userData.currentTariff.name}</h3>
                    <p className="text-gray-400 mb-2">Действует до {userData.currentTariff.validUntil}</p>
                    <Badge className="bg-green-500/20 text-green-400 border-green-500/30">Активна</Badge>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-orange-500 mb-2">{userData.currentTariff.price}</p>
                    <p className="text-sm text-gray-400">Осталось {userData.currentTariff.daysLeft} дней</p>
                    <Progress value={(userData.currentTariff.daysLeft / 30) * 100} className="w-32 mt-2" />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Ближайшие тренировки */}
            <Card className="bg-zinc-900 border-zinc-800">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-orange-500" />
                  Ближайшие тренировки
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {userData.upcomingBookings.map((booking) => (
                    <div key={booking.id} className="flex items-center justify-between p-4 bg-zinc-800 rounded-lg">
                      <div>
                        <h4 className="font-semibold">{booking.type}</h4>
                        <p className="text-sm text-gray-400">
                          {booking.date} в {booking.time}
                        </p>
                        <p className="text-sm text-gray-400">Тренер: {booking.trainer}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        {booking.status === "confirmed" ? (
                          <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                            <CheckCircle className="w-3 h-3 mr-1" />
                            Подтверждено
                          </Badge>
                        ) : (
                          <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">
                            <Clock className="w-3 h-3 mr-1" />
                            Ожидание
                          </Badge>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                <Button className="w-full mt-4 bg-orange-500 hover:bg-orange-600">
                  <Plus className="w-4 h-4 mr-2" />
                  Записаться на тренировку
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Расписание */}
          <TabsContent value="schedule">
            <Card className="bg-zinc-900 border-zinc-800">
              <CardHeader>
                <CardTitle>Мои тренировки</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <Calendar className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Календарь тренировок</h3>
                  <p className="text-gray-400 mb-6">Здесь будет отображаться ваше расписание тренировок</p>
                  <Button className="bg-orange-500 hover:bg-orange-600">Посмотреть расписание</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Подписка */}
          <TabsContent value="subscription">
            <div className="space-y-6">
              <Card className="bg-zinc-900 border-zinc-800">
                <CardHeader>
                  <CardTitle>Информация о подписке</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-lg font-semibold mb-4">Текущий тариф</h3>
                      <div className="space-y-2">
                        <p>
                          <span className="text-gray-400">Название:</span> {userData.currentTariff.name}
                        </p>
                        <p>
                          <span className="text-gray-400">Стоимость:</span> {userData.currentTariff.price}
                        </p>
                        <p>
                          <span className="text-gray-400">Действует до:</span> {userData.currentTariff.validUntil}
                        </p>
                        <p>
                          <span className="text-gray-400">Статус:</span>
                          <Badge className="ml-2 bg-green-500/20 text-green-400 border-green-500/30">Активна</Badge>
                        </p>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-4">Действия</h3>
                      <div className="space-y-3">
                        <Button className="w-full bg-orange-500 hover:bg-orange-600">Продлить подписку</Button>
                        <Button
                          variant="outline"
                          className="w-full border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white bg-transparent"
                        >
                          Изменить тариф
                        </Button>
                        <Button
                          variant="outline"
                          className="w-full border-red-500 text-red-500 hover:bg-red-500 hover:text-white bg-transparent"
                        >
                          Заморозить подписку
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Платежи */}
          <TabsContent value="payments">
            <Card className="bg-zinc-900 border-zinc-800">
              <CardHeader>
                <CardTitle>История платежей</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {userData.paymentHistory.map((payment) => (
                    <div key={payment.id} className="flex items-center justify-between p-4 bg-zinc-800 rounded-lg">
                      <div>
                        <h4 className="font-semibold">{payment.description}</h4>
                        <p className="text-sm text-gray-400">{payment.date}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold text-orange-500">{payment.amount}</p>
                        <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                          <CheckCircle className="w-3 h-3 mr-1" />
                          Оплачено
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Настройки */}
          <TabsContent value="settings">
            <div className="space-y-6">
              <Card className="bg-zinc-900 border-zinc-800">
                <CardHeader>
                  <CardTitle>Настройки профиля</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-semibold">Уведомления о тренировках</h4>
                        <p className="text-sm text-gray-400">Получать напоминания за час до тренировки</p>
                      </div>
                      <Button variant="outline" size="sm">
                        Включено
                      </Button>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-semibold">Email-рассылка</h4>
                        <p className="text-sm text-gray-400">Новости и специальные предложения</p>
                      </div>
                      <Button variant="outline" size="sm">
                        Включено
                      </Button>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-semibold">SMS-уведомления</h4>
                        <p className="text-sm text-gray-400">Важные уведомления по SMS</p>
                      </div>
                      <Button variant="outline" size="sm">
                        Выключено
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-zinc-900 border-zinc-800">
                <CardHeader>
                  <CardTitle>Безопасность</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <Button className="w-full bg-orange-500 hover:bg-orange-600">Изменить пароль</Button>
                    <Button
                      variant="outline"
                      className="w-full border-red-500 text-red-500 hover:bg-red-500 hover:text-white bg-transparent"
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      Выйти из аккаунта
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>

      <Footer />
      <TelegramChat />
    </div>
  )
}
