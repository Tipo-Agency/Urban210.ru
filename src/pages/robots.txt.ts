import { SITE_URL } from '../data/site';

const CLEAN_PARAMS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term', 'yclid', 'gclid', 'fbclid', 'ysclid', 'calltouch_tm', 'etext', 'from', '_openstat'];

export function GET() {
  return new Response(
    `User-agent: *\nAllow: /\nDisallow: /api/\n\nUser-agent: Yandex\nAllow: /\nDisallow: /api/\nClean-param: ${CLEAN_PARAMS.join('&')}\n\nSitemap: ${SITE_URL}/sitemap.xml\n`,
    { headers: { 'Content-Type': 'text/plain; charset=utf-8' } },
  );
}
