import { SITE_URL } from '../data/site';

export function GET() {
  return new Response(`User-agent: *\nAllow: /\nDisallow: /api/\n\nHost: ${SITE_URL}\nSitemap: ${SITE_URL}/sitemap.xml\n`, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
}
