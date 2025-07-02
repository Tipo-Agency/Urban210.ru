import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Urban210 – Фитнес-клуб в Хабаровске. Безлимитный фитнес от 1300₽",
  description:
    "🔥 Современный фитнес-клуб Urban210 в Хабаровске. Безлимитный фитнес от 1300₽/мес. Тренажерный зал, кроссфит, групповые программы, скалодром, спа-зона. ⭐ Лучшие тренеры города!",
  keywords:
    "фитнес клуб хабаровск, тренажерный зал, кроссфит хабаровск, групповые тренировки, скалодром, спа зона, фитнес абонемент, urban210",
  authors: [{ name: "Urban210 Fitness Club" }],
  creator: "Urban210",
  publisher: "Urban210",
  robots: "index, follow",
  openGraph: {
    title: "Urban210 – Лучший фитнес-клуб Хабаровска | Безлимитный фитнес от 1300₽",
    description:
      "🔥 Современное оборудование, кроссфит, скалодром, спа-зона. Присоединяйтесь к лучшему фитнес-клубу города!",
    url: "https://urban210.ru",
    siteName: "Urban210 Fitness Club",
    images: [
      {
        url: "https://sjc.microlink.io/z31kzriG2Pc2dhRk5eBnbIL9U-IKAqlmFYszXlB94laADXvM1aN3NADSvkqZ3pCO-02bXq3jVXuCmKeXVmdFbQ.jpeg",
        width: 1200,
        height: 630,
        alt: "Urban210 - Современный фитнес-клуб в Хабаровске",
      },
    ],
    locale: "ru_RU",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Urban210 – Фитнес-клуб в Хабаровске",
    description: "Безлимитный фитнес от 1300₽. Кроссфит, скалодром, спа-зона",
    images: [
      "https://sjc.microlink.io/z31kzriG2Pc2dhRk5eBnbIL9U-IKAqlmFYszXlB94laADXvM1aN3NADSvkqZ3pCO-02bXq3jVXuCmKeXVmdFbQ.jpeg",
    ],
  },
  alternates: {
    canonical: "https://urban210.ru",
  },
  other: {
    "yandex-verification": "your-yandex-verification-code",
    "google-site-verification": "your-google-verification-code",
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ru" className="dark">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="theme-color" content="#f97316" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <meta name="format-detection" content="telephone=yes" />
        <meta property="business:contact_data:street_address" content="Пр-т 60-летия Октября, 210" />
        <meta property="business:contact_data:locality" content="Хабаровск" />
        <meta property="business:contact_data:region" content="Хабаровский край" />
        <meta property="business:contact_data:postal_code" content="680000" />
        <meta property="business:contact_data:country_name" content="Россия" />
        <meta property="business:contact_data:telephone" content="+7-421-295-09-20" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SportsActivityLocation",
              name: "Urban210",
              description:
                "Современный фитнес-клуб в Хабаровске с тренажерным залом, кроссфитом, скалодромом и спа-зоной",
              url: "https://urban210.ru",
              telephone: "+7-421-295-09-20",
              address: {
                "@type": "PostalAddress",
                streetAddress: "Пр-т 60-летия Октября, 210",
                addressLocality: "Хабаровск",
                addressRegion: "Хабаровский край",
                postalCode: "680000",
                addressCountry: "RU",
              },
              geo: {
                "@type": "GeoCoordinates",
                latitude: "48.4827",
                longitude: "135.0838",
              },
              openingHours: ["Mo-Fr 06:30-23:30", "Sa-Su 07:30-22:30"],
              priceRange: "1300-2400 RUB",
              amenityFeature: [
                {
                  "@type": "LocationFeatureSpecification",
                  name: "Тренажерный зал",
                },
                {
                  "@type": "LocationFeatureSpecification",
                  name: "Кроссфит зона",
                },
                {
                  "@type": "LocationFeatureSpecification",
                  name: "Скалодром",
                },
                {
                  "@type": "LocationFeatureSpecification",
                  name: "Спа-зона",
                },
                {
                  "@type": "LocationFeatureSpecification",
                  name: "Сауна",
                },
                {
                  "@type": "LocationFeatureSpecification",
                  name: "Хаммам",
                },
              ],
              hasOfferCatalog: {
                "@type": "OfferCatalog",
                name: "Фитнес абонементы",
                itemListElement: [
                  {
                    "@type": "Offer",
                    itemOffered: {
                      "@type": "Service",
                      name: "Дневная карта",
                    },
                    price: "1300",
                    priceCurrency: "RUB",
                  },
                  {
                    "@type": "Offer",
                    itemOffered: {
                      "@type": "Service",
                      name: "Полный день",
                    },
                    price: "1700",
                    priceCurrency: "RUB",
                  },
                  {
                    "@type": "Offer",
                    itemOffered: {
                      "@type": "Service",
                      name: "Все включено",
                    },
                    price: "2400",
                    priceCurrency: "RUB",
                  },
                ],
              },
            }),
          }}
        />
      </head>
      <body className={inter.className}>
        {children}
        <Toaster />
      </body>
    </html>
  )
}
