import type { ImageMetadata } from 'astro';

// Фото лежат в src/assets/images и проходят через astro:assets (AVIF/WebP нужного размера).
// В данных и статьях пути пишутся как раньше: /images/zal.jpg.
const files = import.meta.glob<{ default: ImageMetadata }>('../assets/images/**/*.{jpg,jpeg,png,webp}', { eager: true });

export function img(path: string): ImageMetadata {
  const key = '../assets' + path;
  const hit = files[key];
  if (!hit) throw new Error(`Нет картинки ${path}`);
  return hit.default;
}
