import { getCollection } from 'astro:content';
import { SITE_URL } from '../data/site';
import { promos } from '../data/content';

const pages = ['/', '/price/', '/zal/', '/group/', '/spa/', '/trainers/', '/personal/', '/promo/', '/contacts/', '/virtual-tour/', '/blog/', '/policy/', '/rules/', '/oferta/'];

export async function GET() {
  const posts = await getCollection('blog');
  const urls = [
    ...pages.map((p) => ({ loc: p, lastmod: '' })),
    ...promos.map((p) => ({ loc: `/promo/${p.slug}/`, lastmod: '' })),
    ...posts.map((p) => ({ loc: `/blog/${p.id}/`, lastmod: p.data.date.toISOString().slice(0, 10) })),
  ];
  const body = urls.map((u) => `  <url><loc>${SITE_URL}${u.loc}</loc>${u.lastmod ? `<lastmod>${u.lastmod}</lastmod>` : ''}</url>`).join('\n');
  return new Response(`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</urlset>\n`, { headers: { 'Content-Type': 'application/xml' } });
}
