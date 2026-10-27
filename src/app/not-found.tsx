import Link from "next/link";

export default function NotFound() {
  return (
    <section className="wrap section pt-36 md:pt-44">
      <p aria-hidden="true" className="mega outline-ink text-[clamp(8rem,40vw,30rem)]">
        4<span className="text-accent [-webkit-text-stroke:0]">0</span>4
      </p>
      <h1 className="mt-8 text-[length:var(--text-h2)]">Такой страницы нет</h1>
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
