import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// Статьи блога: src/content/blog/<slug>.md
const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string().max(200),
    date: z.coerce.date(),
    image: z.string().default('/images/zal.jpg'),
    category: z.string().default('Начинающим'),
    keywords: z.array(z.string()).default([]),
    cta: z.string().default('Пробный день за 1 ₽'),
    faq: z.array(z.object({ q: z.string(), a: z.string() })).default([]),
  }),
});

export const collections = { blog };
