"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Calendar, User, CreditCard, Check, Clock, Zap, Award } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import Header from "@/components/header"
import Footer from "@/components/footer"

// Utility function to format price with thousands separator
const formatPrice = (price: number) => {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")
}

const tariffs = [
  {
    id: "day",
    name: "Дневная карта",
    price: 1300,
    period: "мес",
    icon: Clock,
    color: "from-blue-500 to-cyan-500",
    features: [
      "Посещение с 7:00 до 17:00",
      "Тренажерный зал",
      "Кардио-зона",
      "Раздевалки с индивидуальными шкафчиками",
    ],
  },
  {
    id: "full",
    name: "Полный день",
    price: 1700,
    period: "мес",
    icon: Zap,
    color: "from-green-500 to-emerald-500",
    features: ["Безлимитное посещение", "Тренажерный зал", "Кардио-зона", "Гостевые визиты"],
  },
  {
    id: "premium",
    name: "Все включено",
    price: 2400,
    originalPrice: 2800,
    period: "мес",
    icon: Award,
    color: "from-purple-500 to-pink-500",
    popular: true,
    features: [
      "Безлимитное посещение",
      "Все групповые программы",
      "Спа-зона",
      "Скалодром",
      "Гостевые визиты",
      "Приоритетное обслуживание",
    ],
  },
]

export default function PurchasePage() {
  const [step, setStep] = useState(1)
  const [selectedTariff, setSelectedTariff] = useState("premium")
  const [promoCode, setPromoCode] = useState("")
  const [promoApplied, setPromoApplied] = useState(false)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    birthDate: "",
    gender: "",
    experience: "",
  })

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const applyPromoCode = () => {
    if (promoCode.toLowerCase() === "urban") {
      setPromoApplied(true)
    }
  }

  const selectedTariffData = tariffs.find((t) => t.id === selectedTariff)!
  const entryFee = promoApplied ? 2000 : 3000
  const totalPrice = selectedTariffData.price + entryFee

  const nextStep = () => {
    if (step < 3) setStep(step + 1)
  }

  const prevStep = () => {
    if (step > 1) setStep(step - 1)
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <Header currentPage="/purchase" />

      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {/* Header */}
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold mb-4">
                Купить{" "}
                <span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
                  абонемент
                </span>
              </h1>

              {/* Progress Steps */}
              <div className="flex justify-center items-center space-x-4 mb-8">
                {[1, 2, 3].map((stepNum) => (
                  <div key={stepNum} className="flex items-center">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                        step >= stepNum
                          ? "bg-gradient-to-r from-orange-500 to-red-500 text-white"
                          : "bg-zinc-800 text-gray-400"
                      }`}
                    >
                      {stepNum}
                    </div>
                    {stepNum < 3 && (
                      <div
                        className={`w-16 h-1 mx-2 ${
                          step > stepNum ? "bg-gradient-to-r from-orange-500 to-red-500" : "bg-zinc-800"
                        }`}
                      />
                    )}
                  </div>
                ))}
              </div>

              <div className="flex justify-center space-x-8 text-sm">
                <span className={step >= 1 ? "text-orange-500" : "text-gray-400"}>Данные владельца</span>
                <span className={step >= 2 ? "text-orange-500" : "text-gray-400"}>Абонемент</span>
                <span className={step >= 3 ? "text-orange-500" : "text-gray-400"}>Оплата</span>
              </div>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              {/* Main Content */}
              <div className="lg:col-span-2">
                <AnimatePresence mode="wait">
                  {/* Step 1: Owner Data + Tariff Selection */}
                  {step === 1 && (
                    <motion.div
                      key="step1"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      className="space-y-8"
                    >
                      {/* Owner Data */}
                      <Card className="bg-gradient-to-br from-zinc-900 to-zinc-800 border-orange-500/20">
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2 text-orange-500">
                            <User className="w-5 h-5" />
                            Данные владельца
                          </CardTitle>
                          <p className="text-gray-400 text-sm">Все поля обязательны для заполнения</p>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="grid md:grid-cols-2 gap-4">
                            <div>
                              <Label htmlFor="lastName">Фамилия</Label>
                              <Input
                                id="lastName"
                                placeholder="Введите фамилию"
                                value={formData.lastName}
                                onChange={(e) => handleInputChange("lastName", e.target.value)}
                                className="bg-zinc-800 border-zinc-700 focus:border-orange-500"
                              />
                            </div>
                            <div>
                              <Label htmlFor="firstName">Имя</Label>
                              <Input
                                id="firstName"
                                placeholder="Введите имя"
                                value={formData.firstName}
                                onChange={(e) => handleInputChange("firstName", e.target.value)}
                                className="bg-zinc-800 border-zinc-700 focus:border-orange-500"
                              />
                            </div>
                          </div>

                          <div className="grid md:grid-cols-2 gap-4">
                            <div>
                              <Label htmlFor="phone">Телефон</Label>
                              <Input
                                id="phone"
                                type="tel"
                                placeholder="+7 (___) ___-__-__"
                                value={formData.phone}
                                onChange={(e) => handleInputChange("phone", e.target.value)}
                                className="bg-zinc-800 border-zinc-700 focus:border-orange-500"
                              />
                              <p className="text-xs text-gray-400 mt-1">
                                На этот номер будет отправлен код подтверждения
                              </p>
                            </div>
                            <div>
                              <Label htmlFor="email">Email</Label>
                              <Input
                                id="email"
                                type="email"
                                placeholder="example@mail.com"
                                value={formData.email}
                                onChange={(e) => handleInputChange("email", e.target.value)}
                                className="bg-zinc-800 border-zinc-700 focus:border-orange-500"
                              />
                            </div>
                          </div>

                          <div className="grid md:grid-cols-2 gap-4">
                            <div>
                              <Label htmlFor="birthDate">Дата рождения</Label>
                              <Input
                                id="birthDate"
                                type="date"
                                value={formData.birthDate}
                                onChange={(e) => handleInputChange("birthDate", e.target.value)}
                                className="bg-zinc-800 border-zinc-700 focus:border-orange-500"
                              />
                            </div>
                            <div>
                              <Label>Пол</Label>
                              <div className="flex gap-2 mt-2">
                                <Button
                                  type="button"
                                  variant={formData.gender === "male" ? "default" : "outline"}
                                  onClick={() => handleInputChange("gender", "male")}
                                  className={`flex-1 ${
                                    formData.gender === "male"
                                      ? "bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600"
                                      : "border-zinc-700 hover:border-orange-500"
                                  }`}
                                >
                                  Мужчина
                                </Button>
                                <Button
                                  type="button"
                                  variant={formData.gender === "female" ? "default" : "outline"}
                                  onClick={() => handleInputChange("gender", "female")}
                                  className={`flex-1 ${
                                    formData.gender === "female"
                                      ? "bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600"
                                      : "border-zinc-700 hover:border-orange-500"
                                  }`}
                                >
                                  Женщина
                                </Button>
                              </div>
                            </div>
                          </div>

                          <div>
                            <Label>Опыт в фитнесе</Label>
                            <Select
                              value={formData.experience}
                              onValueChange={(value) => handleInputChange("experience", value)}
                            >
                              <SelectTrigger className="bg-zinc-800 border-zinc-700 focus:border-orange-500">
                                <SelectValue placeholder="Выберите ваш опыт" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="beginner">Новичок</SelectItem>
                                <SelectItem value="intermediate">Средний уровень</SelectItem>
                                <SelectItem value="advanced">Продвинутый</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </CardContent>
                      </Card>

                      {/* Tariff Selection */}
                      <Card className="bg-gradient-to-br from-zinc-900 to-zinc-800 border-orange-500/20">
                        <CardHeader>
                          <CardTitle className="text-orange-500">Выберите тариф</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="grid gap-4">
                            {tariffs.map((tariff) => {
                              const Icon = tariff.icon
                              return (
                                <div
                                  key={tariff.id}
                                  className={`relative p-4 rounded-lg border-2 cursor-pointer transition-all ${
                                    selectedTariff === tariff.id
                                      ? "border-orange-500 bg-orange-500/10"
                                      : "border-zinc-700 hover:border-zinc-600"
                                  }`}
                                  onClick={() => setSelectedTariff(tariff.id)}
                                >
                                  {tariff.popular && (
                                    <Badge className="absolute -top-2 left-4 bg-gradient-to-r from-orange-500 to-red-500">
                                      Популярный
                                    </Badge>
                                  )}
                                  <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                      <div className={`p-2 rounded-lg bg-gradient-to-r ${tariff.color}`}>
                                        <Icon className="w-5 h-5 text-white" />
                                      </div>
                                      <div>
                                        <h3 className="font-semibold">{tariff.name}</h3>
                                        <div className="flex items-center gap-2">
                                          {tariff.originalPrice && (
                                            <span className="text-sm text-gray-400 line-through">
                                              {formatPrice(tariff.originalPrice)} ₽
                                            </span>
                                          )}
                                          <p className="text-2xl font-bold">
                                            {formatPrice(tariff.price)} ₽{" "}
                                            <span className="text-sm text-gray-400">/ {tariff.period}</span>
                                          </p>
                                        </div>
                                      </div>
                                    </div>
                                    <div
                                      className={`w-5 h-5 rounded-full border-2 ${
                                        selectedTariff === tariff.id
                                          ? "border-orange-500 bg-orange-500"
                                          : "border-zinc-600"
                                      }`}
                                    >
                                      {selectedTariff === tariff.id && <Check className="w-3 h-3 text-white m-0.5" />}
                                    </div>
                                  </div>
                                </div>
                              )
                            })}
                          </div>
                        </CardContent>
                      </Card>

                      <Button
                        onClick={nextStep}
                        className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600"
                      >
                        Выбрать тариф
                      </Button>
                    </motion.div>
                  )}

                  {/* Step 2: Subscription Details */}
                  {step === 2 && (
                    <motion.div
                      key="step2"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      className="space-y-6"
                    >
                      <Card className="bg-gradient-to-br from-zinc-900 to-zinc-800 border-orange-500/20">
                        <CardHeader>
                          <CardTitle className="text-orange-500">Дата начала занятий</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="flex items-center gap-3">
                            <Calendar className="w-5 h-5 text-orange-500" />
                            <Input
                              type="date"
                              defaultValue={new Date().toISOString().split("T")[0]}
                              className="bg-zinc-800 border-zinc-700 focus:border-orange-500"
                            />
                          </div>
                        </CardContent>
                      </Card>

                      <Card className="bg-gradient-to-br from-zinc-900 to-zinc-800 border-orange-500/20">
                        <CardHeader>
                          <CardTitle className="text-orange-500">Промокод</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="flex gap-3">
                            <Input
                              placeholder="Введите промокод"
                              value={promoCode}
                              onChange={(e) => setPromoCode(e.target.value)}
                              className="bg-zinc-800 border-zinc-700 focus:border-orange-500"
                            />
                            <Button
                              onClick={applyPromoCode}
                              variant="outline"
                              disabled={promoApplied}
                              className="border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white bg-transparent"
                            >
                              {promoApplied ? <Check className="w-4 h-4" /> : "Применить"}
                            </Button>
                          </div>
                          {promoApplied && (
                            <p className="text-green-500 text-sm mt-2">
                              Промокод применен! Скидка 33% на вступительный взнос
                            </p>
                          )}
                        </CardContent>
                      </Card>

                      <div className="flex gap-4">
                        <Button
                          onClick={prevStep}
                          variant="outline"
                          className="flex-1 border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white bg-transparent"
                        >
                          Назад
                        </Button>
                        <Button
                          onClick={nextStep}
                          className="flex-1 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600"
                        >
                          К оплате
                        </Button>
                      </div>
                    </motion.div>
                  )}

                  {/* Step 3: Payment */}
                  {step === 3 && (
                    <motion.div
                      key="step3"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      className="space-y-6"
                    >
                      <Card className="bg-gradient-to-br from-zinc-900 to-zinc-800 border-orange-500/20">
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2 text-orange-500">
                            <CreditCard className="w-5 h-5" />
                            Оплата
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="p-4 bg-zinc-800 rounded-lg border border-orange-500/20">
                            <h3 className="font-semibold mb-2 text-orange-500">Итого к оплате</h3>
                            <div className="space-y-2 text-sm">
                              <div className="flex justify-between">
                                <span>{selectedTariffData.name}</span>
                                <span>{formatPrice(selectedTariffData.price)} ₽</span>
                              </div>
                              <div className="flex justify-between">
                                <span>
                                  Вступительный взнос {promoApplied && <span className="text-green-500">(-33%)</span>}
                                </span>
                                <span className={promoApplied ? "line-through text-gray-500" : ""}>
                                  {formatPrice(3000)} ₽
                                </span>
                              </div>
                              {promoApplied && (
                                <div className="flex justify-between text-green-500">
                                  <span>Вступительный взнос со скидкой</span>
                                  <span>{formatPrice(2000)} ₽</span>
                                </div>
                              )}
                              <hr className="border-zinc-700" />
                              <div className="flex justify-between font-bold text-lg">
                                <span>Итого</span>
                                <span>{formatPrice(totalPrice)} ₽</span>
                              </div>
                            </div>
                          </div>

                          <Button className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-lg py-3">
                            Оплатить {formatPrice(totalPrice)} ₽
                          </Button>
                          <p className="text-xs text-gray-400 text-center">
                            Со следующего месяца {formatPrice(selectedTariffData.price)} ₽
                          </p>
                        </CardContent>
                      </Card>

                      <Button
                        onClick={prevStep}
                        variant="outline"
                        className="w-full border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white bg-transparent"
                      >
                        Назад
                      </Button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Right Sidebar - Tariff Info */}
              <div className="lg:col-span-1">
                <Card className="bg-gradient-to-br from-zinc-900 to-zinc-800 border-orange-500/20 sticky top-8">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg bg-gradient-to-r ${selectedTariffData.color}`}>
                        <selectedTariffData.icon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <CardTitle className="mb-4 text-orange-500">{selectedTariffData.name}</CardTitle>
                        <div className="flex items-center gap-2">
                          {selectedTariffData.originalPrice && (
                            <span className="text-lg text-gray-400 line-through">
                              {formatPrice(selectedTariffData.originalPrice)} ₽
                            </span>
                          )}
                          <p className="text-3xl font-bold">
                            {formatPrice(selectedTariffData.price)} ₽{" "}
                            <span className="text-lg text-gray-400">/ {selectedTariffData.period}</span>
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold mb-4 text-orange-500">Вступительный взнос</h4>
                        <div className="flex justify-between items-center">
                          <span className={promoApplied ? "line-through text-gray-500" : ""}>
                            {formatPrice(3000)} ₽
                          </span>
                          {promoApplied && <span className="text-green-500 font-bold">{formatPrice(2000)} ₽</span>}
                        </div>
                        <p className="text-xs text-gray-400 mt-1">* оплачивается один раз при оформлении</p>
                      </div>

                      <div>
                        <h4 className="font-semibold mb-3 text-orange-500">Включает в себя:</h4>
                        <ul className="space-y-2">
                          {selectedTariffData.features.map((feature, index) => (
                            <li key={index} className="flex items-start gap-2 text-sm">
                              <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* FAQ Section */}
            <div className="mt-16">
              <h2 className="text-3xl font-bold text-center mb-8">
                <span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
                  Вопросы и ответы
                </span>
              </h2>
              <div className="max-w-4xl mx-auto">
                <Accordion type="single" collapsible className="space-y-4">
                  <AccordionItem value="entry-fee" className="bg-zinc-900 border-zinc-800 rounded-lg px-6">
                    <AccordionTrigger className="text-left hover:no-underline">Вступительный взнос?</AccordionTrigger>
                    <AccordionContent className="text-gray-300">
                      <p className="mb-4">Оплачивается один раз при оформлении абонемента.</p>
                      <p className="mb-2">Включает в себя:</p>
                      <ul className="list-disc list-inside space-y-1 ml-4">
                        <li>
                          <strong>Личный фитнес-браслет</strong>, чтобы ты мог входить в клуб и пользоваться шкафчиком в
                          любое время, без ожидания на ресепшене.
                        </li>
                        <li>
                          <strong>Анализ состава тела по 29 параметрам</strong>, чтобы ты понимал на чем фокусироваться
                          и видеть свой прогресс на цифрах.
                        </li>
                        <li>
                          <strong>Вводное занятие с тренером</strong>, чтобы ты знал как безопасно пользоваться
                          тренажерами и с чего начать.
                        </li>
                      </ul>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="freeze" className="bg-zinc-900 border-zinc-800 rounded-lg px-6">
                    <AccordionTrigger className="text-left hover:no-underline">
                      Как заморозить абонемент?
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-300">
                      В любой момент в нашем Telegram боте @fcurbanbot, в разделе "Ваши подписки".
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="friends" className="bg-zinc-900 border-zinc-800 rounded-lg px-6">
                    <AccordionTrigger className="text-left hover:no-underline">
                      Могу ли я привести с собой друга?
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-300">
                      Да, вы можете приводить друзей хоть каждый день, но один и тот же друг может с вами прийти только
                      раз в год.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="buy-later" className="bg-zinc-900 border-zinc-800 rounded-lg px-6">
                    <AccordionTrigger className="text-left hover:no-underline">
                      Могу ли я купить сейчас, а прийти потом?
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-300">
                      Да, вы можете выбрать любую дату начала занятий при оформлении абонемента.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="cancel" className="bg-zinc-900 border-zinc-800 rounded-lg px-6">
                    <AccordionTrigger className="text-left hover:no-underline">
                      Как расторгнуть договор?
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-300">
                      Приди в любой клуб во время работы ресепшена и подпиши короткое заявление.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
