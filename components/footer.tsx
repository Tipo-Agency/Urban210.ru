"use client"
import Link from "next/link"
import type React from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { Instagram, Send, MapPin, Phone } from "lucide-react"

const WhatsAppIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.891 3.488" />
  </svg>
)

export default function Footer() {
  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault()
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
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
          {/* Логотип и описание */}
          <motion.div
            className="lg:col-span-1"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Link href="/">
              <motion.div whileHover={{ scale: 1.05 }}>
                <Image src="/logo-dark.png" alt="Urban210 Logo" width={140} height={40} className="object-contain" />
              </motion.div>
            </Link>
            <p className="mt-4 text-sm text-gray-400">Современный фитнес-клуб для тех, кто стремится к большему.</p>
            <div className="mt-6 flex space-x-4">
              <motion.a
                href="https://www.instagram.com/fc.urban210?igsh=ajR2dGQ4ZHVmOGI1"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-zinc-800 rounded-full text-gray-400 hover:bg-orange-500 hover:text-white transition-all duration-300"
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
              >
                <Instagram className="w-5 h-5" />
              </motion.a>
              <motion.a
                href="https://wa.me/79242054109"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-zinc-800 rounded-full text-gray-400 hover:bg-orange-500 hover:text-white transition-all duration-300"
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
              >
                <WhatsAppIcon />
              </motion.a>
              <motion.a
                href="https://t.me/fcurbanbot"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-zinc-800 rounded-full text-gray-400 hover:bg-orange-500 hover:text-white transition-all duration-300"
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
              >
                <Send className="w-5 h-5" />
              </motion.a>
            </div>
          </motion.div>

          {/* Навигация и информация */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <h4 className="font-semibold text-white mb-4">Навигация</h4>
              <ul className="space-y-2 text-sm">
                {[
                  { href: "/tariffs", text: "Тарифы" },
                  { href: "/schedule", text: "Расписание" },
                  { href: "/services", text: "Услуги" },
                  { href: "/tour", text: "3D-тур" },
                  { href: "/contact", text: "Контакты" },
                ].map((item) => (
                  <li key={item.href}>
                    <motion.a
                      href={item.href}
                      onClick={item.href.startsWith("#") ? (e) => handleScrollTo(e, item.href.slice(1)) : undefined}
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
              <h4 className="font-semibold text-white mb-4">Информация</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <motion.div whileHover={{ x: 5 }}>
                    <Link href="/oferta#privacy" className="text-gray-400 hover:text-orange-500 transition-colors">
                      Политика конфиденциальности
                    </Link>
                  </motion.div>
                </li>
                <li>
                  <motion.div whileHover={{ x: 5 }}>
                    <Link href="/oferta#offer" className="text-gray-400 hover:text-orange-500 transition-colors">
                      Публичная оферта
                    </Link>
                  </motion.div>
                </li>
                <li>
                  <motion.div whileHover={{ x: 5 }}>
                    <Link href="/oferta#rules" className="text-gray-400 hover:text-orange-500 transition-colors">
                      Правила посещения
                    </Link>
                  </motion.div>
                </li>
              </ul>
            </motion.div>
          </div>

          {/* Юридическая информация */}
          <motion.div
            className="lg:col-span-1"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h4 className="font-semibold text-white mb-4">ООО «Альянс»</h4>
            <div className="text-xs text-gray-400 space-y-1">
              <p>680009, Хабаровский край, город Хабаровск, проспект 60-летия Октября, д.210, лит.А, офис 306</p>
              <p>ИНН 2723055622</p>
              <p>КПП 272401001</p>
              <p>ОГРН 1032700450650</p>
              <div className="mt-3 pt-3 border-t border-zinc-800">
                <p className="text-xs">ФИЛИАЛ "ХАБАРОВСКИЙ" АО "АЛЬФА-БАНК"</p>
                <p>р/счет: 40702810820000004204</p>
                <p>к/счет: 30101810800000000770</p>
                <p>БИК: 040813770</p>
              </div>
              <div className="mt-4 pt-3 border-t border-zinc-800">
                <div className="flex items-center gap-2 mb-2">
                  <MapPin className="w-4 h-4 text-orange-500" />
                  <span className="text-sm">Проспект 60-ти летия Октября, 210</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-orange-500" />
                  <a href="tel:+74212950920" className="text-sm">
                    <span>+7 (421) 295-09-20</span>
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          className="mt-10 pt-8 border-t border-zinc-800 text-sm text-gray-500"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-center sm:text-left">&copy; {new Date().getFullYear()} Urban210. Все права защищены.</p>
            <a
              href="https://tipa.uz"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 group"
            >
              <span className="text-white/80 group-hover:text-white text-lg sm:text-lg">ⓒ</span>
              <img src="/icons/tipa_agency.svg" alt="Типа агенство" className="h-5 w-auto opacity-90 group-hover:opacity-100 transition-opacity" />
            </a>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}
