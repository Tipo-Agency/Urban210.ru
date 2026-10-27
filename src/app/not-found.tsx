import Link from "next/link";

export default function NotFound() {
  return (
    <section className="wrap section">
      <p className="eyebrow">Ошибка 404</p>
      <h1 className="mt-4 text-[length:var(--text-h2)]">Такой страницы нет</h1>
      <p className="mt-4 max-w-md text-muted">Возможно, она переехала после обновления сайта. Начните с главной или посмотрите тарифы.</p>
      <div className="mt-8 flex flex-wrap gap-3">
        <Link href="/" className="btn btn-accent">
          На главную
        </Link>
        <Link href="/price/" className="btn btn-ghost">
          Тарифы
        </Link>
      </div>
    </section>
  );
}
