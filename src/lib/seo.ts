import type { Metadata } from "next";
import { SITE_URL, site } from "@/data/site";

export function pageMeta({ title, description, path, image = "/og.jpg" }: { title: string; description: string; path: string; image?: string }): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      locale: "ru_RU",
      siteName: site.fullName,
      url: SITE_URL + path,
      title,
      description,
      images: [{ url: image, width: 1200, height: 630, alt: site.fullName }],
    },
    twitter: { card: "summary_large_image", title, description, images: [image] },
  };
}

export function gymSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ExerciseGym",
    "@id": SITE_URL + "/#club",
    name: site.fullName,
    url: SITE_URL + "/",
    image: SITE_URL + "/og.jpg",
    logo: SITE_URL + "/icon.png",
    telephone: "+74212950920",
    email: site.email,
    priceRange: "1300–2400 ₽/мес",
    currenciesAccepted: "RUB",
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address.street,
      addressLocality: site.address.locality,
      addressRegion: site.address.region,
      postalCode: site.address.postalCode,
      addressCountry: "RU",
    },
    geo: { "@type": "GeoCoordinates", latitude: site.address.lat, longitude: site.address.lng },
    openingHoursSpecification: site.hours.map((h) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: h.schema.days,
      opens: h.schema.opens,
      closes: h.schema.closes,
    })),
    amenityFeature: [
      { "@type": "LocationFeatureSpecification", name: "Бесплатная парковка", value: true },
      { "@type": "LocationFeatureSpecification", name: "Сауна", value: true },
      { "@type": "LocationFeatureSpecification", name: "Хаммам", value: true },
    ],
    sameAs: [site.instagram, site.maps.yandex, site.maps.twoGis],
    parentOrganization: { "@type": "Organization", name: site.legal.name, taxID: site.legal.inn },
  };
}
