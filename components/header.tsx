"use client"
import { useState, useEffect } from "react"
import type React from "react"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Phone, Menu, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

interface HeaderProps {
  currentPage?: string
}

export default function Header({ currentPage = "/" }: HeaderProps) {
  const [headerBg, setHeaderBg] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setHeaderBg(window.scrollY > 50)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault()
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  const navigationItems = [
    { href: "/tariffs", text: "Тарифы" },
    { href: "/schedule", text: "Расписание" },
    { href: "/services", text: "Услуги" },
    { href: "/tour", text: "3D-тур" },
    { href: "/contact", text: "Контакты" },
  ]

  return (
    <header
      className={`sticky top-0 z-40 transition-all duration-500 ${
        headerBg ? "bg-black/90 backdrop-blur-xl shadow-2xl border-b border-orange-500/20" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="flex items-center shrink-0">
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

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8 text-sm font-medium text-gray-300">
            {navigationItems.map((item) => (
              <motion.a
                key={item.href}
                href={item.href}
                onClick={item.href.startsWith("#") ? (e) => handleScrollTo(e, item.href.slice(1)) : undefined}
                className={`transition-colors relative ${
                  currentPage === item.href ? "text-orange-500" : "hover:text-orange-500"
                }`}
                whileHover={{ y: -2 }}
              >
                {item.text}
                <motion.div
                  className={`absolute -bottom-1 left-0 h-0.5 bg-orange-500 ${
                    currentPage === item.href ? "w-full" : "w-0"
                  }`}
                  whileHover={{ width: "100%" }}
                  transition={{ duration: 0.3 }}
                />
              </motion.a>
            ))}
          </nav>

          {/* Desktop Contact & CTA */}
          <div className="hidden lg:flex items-center space-x-4">
            <motion.a
              href="tel:+74212950920"
              className="flex items-center gap-2 text-sm font-semibold hover:text-orange-500 transition-colors"
              whileHover={{ scale: 1.05 }}
            >
              <Phone className="w-4 h-4" /> +7 (421) 295-09-20
            </motion.a>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button asChild className="bg-orange-500 text-white hover:bg-orange-600 shadow-lg shadow-orange-500/20">
                <Link href="/cabinet">Личный кабинет</Link>
              </Button>
            </motion.div>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center space-x-4">
            <motion.a
              href="tel:+74212950920"
              className="text-sm font-semibold hover:text-orange-500 transition-colors"
              whileHover={{ scale: 1.05 }}
            >
              <Phone className="w-5 h-5" />
            </motion.a>
            <motion.button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-gray-300 hover:text-orange-500 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </motion.button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden border-t border-zinc-800/50 bg-black/95 backdrop-blur-xl"
            >
              <div className="py-4 space-y-4">
                {navigationItems.map((item, index) => (
                  <motion.a
                    key={item.href}
                    href={item.href}
                    onClick={() => {
                      setIsMobileMenuOpen(false)
                      if (item.href.startsWith("#")) {
                        handleScrollTo(new Event("click") as any, item.href.slice(1))
                      }
                    }}
                    className={`block px-4 py-2 text-base font-medium transition-colors ${
                      currentPage === item.href ? "text-orange-500" : "text-gray-300 hover:text-orange-500"
                    }`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    {item.text}
                  </motion.a>
                ))}
                <motion.div
                  className="px-4 pt-4 border-t border-zinc-800/50"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.5 }}
                >
                  <a
                    href="tel:+74212950920"
                    className="flex items-center gap-2 text-sm font-semibold text-gray-300 hover:text-orange-500 transition-colors mb-3"
                  >
                    <Phone className="w-4 h-4" /> +7 (421) 295-09-20
                  </a>
                  <Button asChild className="w-full bg-orange-500 text-white hover:bg-orange-600">
                    <Link href="/cabinet">Личный кабинет</Link>
                  </Button>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  )
}
