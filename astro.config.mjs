import { defineConfig } from 'astro/config';
import node from '@astrojs/node';

// Все страницы собираются статикой, на сервере работает только приём заявок /api/lead/.
export default defineConfig({
  site: process.env.PUBLIC_SITE_URL || 'https://urban210.ru',
  trailingSlash: 'always',
  output: 'static',
  adapter: node({ mode: 'standalone' }),
  build: { inlineStylesheets: 'always' },
  image: { responsiveStyles: false },
  devToolbar: { enabled: false },
  server: { port: 3210 },
});
