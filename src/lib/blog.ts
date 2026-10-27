import { readdirSync, readFileSync } from "node:fs";
import path from "node:path";
import { marked } from "marked";

// Статьи блога: src/content/blog/<slug>.md с заголовком в формате
// ---
// title: ...
// description: ...
// date: 2026-10-27
// image: /images/zal.jpg
// cta: Пробный день за 1 ₽
// ---
export type Post = { slug: string; title: string; description: string; date: string; image: string; cta: string; html: string; minutes: number };

const DIR = path.join(process.cwd(), "src/content/blog");

function parse(file: string): Post {
  const raw = readFileSync(path.join(DIR, file), "utf8");
  const m = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!m) throw new Error(`Нет заголовка в ${file}`);
  const meta = Object.fromEntries(
    m[1].split("\n").map((l) => {
      const i = l.indexOf(":");
      return [l.slice(0, i).trim(), l.slice(i + 1).trim()];
    }),
  );
  const body = m[2].trim();
  const words = body.split(/\s+/).length;
  return {
    slug: file.replace(/\.md$/, ""),
    title: meta.title,
    description: meta.description,
    date: meta.date,
    image: meta.image || "/images/zal.jpg",
    cta: meta.cta || "Пробный день за 1 ₽",
    html: marked.parse(body, { async: false }) as string,
    minutes: Math.max(3, Math.round(words / 180)),
  };
}

export function getPosts(): Post[] {
  let files: string[] = [];
  try {
    files = readdirSync(DIR).filter((f) => f.endsWith(".md"));
  } catch {
    return [];
  }
  return files.map(parse).sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPost(slug: string) {
  return getPosts().find((p) => p.slug === slug);
}
