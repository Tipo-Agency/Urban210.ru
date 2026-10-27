import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Старый WordPress-сайт отдавал адреса со слешем на конце (/price/). Сохраняем их.
  trailingSlash: true,
  output: "standalone",
  poweredByHeader: false,
  // CSS небольшой, встраиваем в HTML: убирает блокирующий запрос и ускоряет первый экран
  experimental: { inlineCss: true },
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [390, 640, 828, 1080, 1440, 1920],
    minimumCacheTTL: 60 * 60 * 24 * 30,
  },
  async redirects() {
    return [
      // Адреса WordPress и старого прототипа
      { source: "/site/policy", destination: "/policy/", permanent: true },
      { source: "/tariffs", destination: "/price/", permanent: true },
      { source: "/tour", destination: "/virtual-tour/", permanent: true },
      { source: "/contact", destination: "/contacts/", permanent: true },
      { source: "/services", destination: "/", permanent: true },
      { source: "/schedule", destination: "/group/", permanent: true },
      { source: "/wp-admin/:path*", destination: "/", permanent: false },
      { source: "/feed", destination: "/", permanent: true },
      { source: "/promo/11-%D0%B2%D0%B4%D0%B2%D0%BE%D1%91%D0%BC-%D0%B2%D1%8B%D0%B3%D0%BE%D0%B4%D0%BD%D0%B5%D0%B5", destination: "/promo/1-plus-1/", permanent: true },
      { source: "/promo/%D1%82%D0%B5%D1%81%D1%82%D0%BE%D0%B2%D1%8B%D0%B8-%D0%B4%D0%B5%D0%BD%D1%8C-%D0%B7%D0%B0-1-%D1%80%D1%83%D0%B1%D0%BB%D1%8C", destination: "/promo/1-rubl/", permanent: true },
      { source: "/promo/trade-in-urban", destination: "/promo/trade-in/", permanent: true },
    ];
  },
  async headers() {
    return [
      {
        source: "/_next/static/:path*",
        headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
      },
      {
        source: "/images/:path*",
        headers: [{ key: "Cache-Control", value: "public, max-age=2592000" }],
      },
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
        ],
      },
    ];
  },
};

export default nextConfig;
