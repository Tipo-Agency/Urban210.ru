"use client"
import { Button } from "@/components/ui/button"
import {
  Dumbbell,
  Users,
  HeartPulse,
  Zap,
  Coffee,
  Shield,
  Car,
  Wifi,
  Shirt,
  UserCheck,
  Music,
  Target,
  Flame,
  Sparkles,
  Heart,
  Activity,
} from "lucide-react"
import { motion } from "framer-motion"
import Link from "next/link"
import Header from "@/components/header"
import Footer from "@/components/footer"
import TelegramChat from "@/components/telegram-chat"

const ServiceCard = ({ icon: Icon, title, description, features, delay = 0 }: any) => (
  <motion.div
    className="bg-gradient-to-br from-zinc-900 to-zinc-800 p-6 rounded-2xl border border-zinc-800 hover:border-orange-500/50 transition-all duration-500 group"
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6, delay }}
    whileHover={{ scale: 1.02, y: -5 }}
  >
    <div className="flex items-start gap-4">
      <motion.div
        className="p-3 bg-orange-500/10 rounded-xl group-hover:bg-orange-500/20 transition-colors"
        whileHover={{ scale: 1.1, rotate: 5 }}
      >
        <Icon className="w-8 h-8 text-orange-500" />
      </motion.div>
      <div className="flex-grow">
        <h3 className="text-xl font-bold mb-2 group-hover:text-orange-500 transition-colors">{title}</h3>
        <p className="text-gray-400 mb-4">{description}</p>
        <ul className="space-y-2">
          {features.map((feature: string, i: number) => (
            <motion.li
              key={feature}
              className="flex items-center gap-2 text-sm text-gray-300"
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: delay + 0.1 + i * 0.05 }}
            >
              <div className="w-1.5 h-1.5 bg-orange-500 rounded-full" />
              {feature}
            </motion.li>
          ))}
        </ul>
      </div>
    </div>
  </motion.div>
)

const GroupProgramCard = ({ icon: Icon, title, description, benefits, forWho, delay = 0 }: any) => (
  <motion.div
    className="bg-gradient-to-br from-zinc-900 to-zinc-800 p-8 rounded-2xl border border-zinc-800 hover:border-orange-500/50 transition-all duration-500 group"
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6, delay }}
    whileHover={{ scale: 1.02, y: -5 }}
  >
    <div className="flex items-center gap-4 mb-6">
      <motion.div
        className="p-4 bg-orange-500/10 rounded-xl group-hover:bg-orange-500/20 transition-colors"
        whileHover={{ scale: 1.1, rotate: 5 }}
      >
        <Icon className="w-10 h-10 text-orange-500" />
      </motion.div>
      <h3 className="text-2xl font-bold group-hover:text-orange-500 transition-colors">{title}</h3>
    </div>

    <p className="text-gray-400 mb-6 leading-relaxed">{description}</p>

    <div className="space-y-4">
      <div>
        <h4 className="text-lg font-semibold text-orange-500 mb-2">Что дает:</h4>
        <p className="text-gray-300 text-sm leading-relaxed">{benefits}</p>
      </div>

      <div>
        <h4 className="text-lg font-semibold text-orange-500 mb-2">Для кого:</h4>
        <p className="text-gray-300 text-sm leading-relaxed">{forWho}</p>
      </div>
    </div>
  </motion.div>
)

export default function ServicesPage() {
  const groupPrograms = [
    {
      icon: Dumbbell,
      title: "Силовые тренировки",
      description:
        "Занятия, направленные на укрепление всех групп мышц с использованием дополнительного веса и собственного веса тела.",
      benefits:
        "Формируют красивый мышечный рельеф, увеличивают силу и выносливость, ускоряют метаболизм и эффективно сжигают жир. Укрепляют кости и суставы, улучшают осанку.",
      forWho:
        "Для всех, кто хочет стать сильнее, выносливее, обрести подтянутое и атлетичное тело. Подходит как для новичков, так и для опытных спортсменов.",
    },
    {
      icon: Activity,
      title: "Функциональные тренировки",
      description:
        "Динамичные, многосуставные упражнения, имитирующие естественные движения нашего тела в повседневной жизни.",
      benefits:
        "Развивают силу, гибкость, координацию, баланс и ловкость. Улучшают выносливость, снижают риск травм и делают тело функциональным.",
      forWho:
        "Для тех, кто стремится к универсальной физической подготовке, хочет улучшить координацию и подготовить тело к активной жизни.",
    },
    {
      icon: Zap,
      title: "Степ-аэробика",
      description: "Зажигательный кардио-тренинг с использованием специальной платформы под энергичную музыку.",
      benefits:
        "Мощная кардио-нагрузка, эффективно сжигает калории, укрепляет сердечно-сосудистую систему. Особое внимание мышцам ног и ягодиц, развивает координацию.",
      forWho:
        "Для любителей динамичных тренировок, танцевальных движений и тех, кто хочет эффективно сжигать калории с удовольствием.",
    },
    {
      icon: Music,
      title: "Танцевальные направления",
      description:
        "Погружение в мир музыки и танца! От зажигательной Зумбы до элегантных хореографий различных стилей.",
      benefits:
        "Активно сжигают калории, развивают гибкость, пластичность, координацию. Помогают снять стресс, улучшить настроение и повысить уверенность в себе.",
      forWho:
        "Для всех, кто любит танцевать, хочет улучшить пластичность, координацию и получать удовольствие от тренировок.",
    },
    {
      icon: Heart,
      title: "Йога",
      description:
        "Древнее искусство, объединяющее физические позы, дыхательные практики и медитацию для гармонии тела и духа.",
      benefits:
        "Улучшает гибкость, развивает силу, укрепляет мышцы кора. Помогает снять стресс, улучшить концентрацию и обрести внутреннее спокойствие.",
      forWho:
        "Для тех, кто ищет баланс, хочет улучшить гибкость, снять стресс и обрести внутреннюю гармонию. Подходит для любого уровня.",
    },
    {
      icon: Target,
      title: "Пилатес",
      description:
        "Уникальная система упражнений, направленная на укрепление глубоких мышц живота и спины – центра силы.",
      benefits:
        "Значительно улучшает осанку, укрепляет мышцы кора, снимает боли в спине. Развивает гибкость и повышает осознанность движений.",
      forWho:
        "Идеально для людей с проблемами спины, для улучшения осанки и развития осознанности тела. Подходит для всех возрастов.",
    },
  ]

  return (
    <div className="bg-black text-gray-200 min-h-screen font-sans selection:bg-orange-500/30">
      <Header currentPage="/services" />

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-6xl mx-auto"
        >
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
              <span className="bg-gradient-to-r from-white via-orange-500 to-white bg-clip-text text-transparent">
                Наши услуги
              </span>
            </h1>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Все необходимое для эффективных тренировок и полноценного отдыха в одном месте
            </p>
          </div>

          {/* Основные зоны */}
          <div className="mb-20">
            <h2 className="text-3xl font-bold text-center mb-8">Тренировочные зоны</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <ServiceCard
                icon={Dumbbell}
                title="Тренажерный зал"
                description="Современное оборудование от ведущих мировых производителей"
                features={[
                  "Кардио-зона с беговыми дорожками и велотренажерами",
                  "Силовые тренажеры для всех групп мышц",
                  "Зона свободных весов с гантелями и штангами",
                  "Функциональная зона для кроссфита",
                ]}
                delay={0}
              />

              <ServiceCard
                icon={Users}
                title="Групповые программы"
                description="Разнообразные направления для любого уровня подготовки"
                features={[
                  "Силовые и функциональные тренировки",
                  "Танцевальные направления (зумба, латина)",
                  "Йога и пилатес для гибкости и релаксации",
                  "Степ-аэробика и кардио-программы",
                ]}
                delay={0.1}
              />

              <ServiceCard
                icon={HeartPulse}
                title="СПА-зона"
                description="Полноценный отдых и восстановление после тренировок"
                features={[
                  "Финская сауна с ароматерапией",
                  "Турецкий хаммам",
                  "Зона релаксации с массажными креслами",
                  "Контрастные процедуры",
                ]}
                delay={0.3}
              />
            </div>
          </div>

          {/* Групповые программы */}
          <div className="mb-20">
            <motion.div
              className="text-center mb-12"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl font-bold mb-4">
                <span className="bg-gradient-to-r from-white via-orange-500 to-white bg-clip-text text-transparent">
                  Групповые тренировки
                </span>
              </h2>
              <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                Откройте мир энергии и гармонии! Каждый класс – это целое событие, где энергия группы умножает ваши
                усилия, а профессиональные тренеры вдохновляют на новые достижения.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {groupPrograms.map((program, index) => (
                <GroupProgramCard
                  key={program.title}
                  icon={program.icon}
                  title={program.title}
                  description={program.description}
                  benefits={program.benefits}
                  forWho={program.forWho}
                  delay={index * 0.1}
                />
              ))}
            </div>

            <motion.div
              className="text-center mt-12 p-8 bg-gradient-to-r from-orange-500/10 to-red-500/10 rounded-2xl border border-orange-500/30"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="text-2xl font-bold mb-4 text-orange-500">Почему групповые тренировки?</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-sm">
                <div className="flex items-start gap-3">
                  <Flame className="w-5 h-5 text-orange-500 mt-1 shrink-0" />
                  <div>
                    <h4 className="font-semibold mb-1">Мотивация и энергия</h4>
                    <p className="text-gray-400">Поддержка группы помогает преодолевать себя и достигать большего</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <UserCheck className="w-5 h-5 text-orange-500 mt-1 shrink-0" />
                  <div>
                    <h4 className="font-semibold mb-1">Профессиональное руководство</h4>
                    <p className="text-gray-400">Опытные тренеры корректируют технику и обеспечивают безопасность</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Sparkles className="w-5 h-5 text-orange-500 mt-1 shrink-0" />
                  <div>
                    <h4 className="font-semibold mb-1">Разнообразие и новизна</h4>
                    <p className="text-gray-400">Широкий спектр направлений не дает тренировкам стать рутиной</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Дополнительные услуги */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-8">Дополнительные услуги</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <ServiceCard
                icon={UserCheck}
                title="Персональные тренировки"
                description="Индивидуальный подход к достижению ваших целей"
                features={[
                  "Составление персональной программы",
                  "Контроль техники выполнения",
                  "Мотивация и поддержка",
                  "Отслеживание прогресса",
                ]}
                delay={0}
              />

              <ServiceCard
                icon={Zap}
                title="Фитнес-бар"
                description="Здоровое питание и спортивные напитки"
                features={["Протеиновые коктейли", "Свежевыжатые соки", "Здоровые снеки", "Спортивное питание"]}
                delay={0.1}
              />

              <ServiceCard
                icon={Coffee}
                title="Зона отдыха"
                description="Комфортное пространство для общения и релакса"
                features={["Удобная мебель", "Wi-Fi зона", "Телевизоры с трансляциями", "Настольные игры"]}
                delay={0.2}
              />
            </div>
          </div>

          {/* Удобства */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-8">Удобства клуба</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { icon: Car, title: "Парковка", desc: "Бесплатная парковка для клиентов" },
                { icon: Wifi, title: "Wi-Fi", desc: "Высокоскоростной интернет" },
                { icon: Shirt, title: "Раздевалки", desc: "Просторные раздевалки с душевыми" },
                { icon: Shield, title: "Безопасность", desc: "Видеонаблюдение и охрана" },
              ].map((item, i) => (
                <motion.div
                  key={item.title}
                  className="text-center p-4 bg-zinc-900/30 rounded-xl border border-zinc-800 hover:border-orange-500/30 transition-colors"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <item.icon className="w-8 h-8 text-orange-500 mx-auto mb-3" />
                  <h3 className="font-semibold mb-1">{item.title}</h3>
                  <p className="text-sm text-gray-400">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>

          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-gray-400 mb-6">Готовы начать свой путь к здоровому образу жизни?</p>
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
