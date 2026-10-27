import type { MetadataRoute } from "next";
import { promos } from "@/data/content";
import { SITE_URL } from "@/data/site";
import { getPosts } from "@/lib/blog";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const pages: [string, number][] = [
    ["/", 1],
    ["/price/", 0.9],
    ["/zal/", 0.8],
    ["/group/", 0.8],
    ["/spa/", 0.7],
    ["/personal/", 0.7],
    ["/trainers/", 0.6],
    ["/promo/", 0.7],
    ["/virtual-tour/", 0.5],
    ["/contacts/", 0.7],
    ["/blog/", 0.5],
    ["/rules/", 0.2],
    ["/oferta/", 0.2],
    ["/policy/", 0.2],
  ];
  return [
    ...pages.map(([p, priority]) => ({ url: SITE_URL + p, lastModified: now, priority })),
    ...promos.map((p) => ({ url: `${SITE_URL}/promo/${p.slug}/`, lastModified: now, priority: 0.6 })),
    ...getPosts().map((p) => ({ url: `${SITE_URL}/blog/${p.slug}/`, lastModified: new Date(p.date), priority: 0.5 })),
  ];
}
