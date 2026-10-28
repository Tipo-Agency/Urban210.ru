// Двойной шеврон из фирменного знака клуба (urban_arrow.svg со старого сайта)
export function Arrows({ className = "arrows" }: { className?: string }) {
  return (
    <svg viewBox="0 0 30 32" aria-hidden="true" className={className} fill="currentColor">
      <path d="M0 31.7L10 15.9 0 0h7.7l9.7 15.9-9.7 15.8zM12.6 31.7l10-15.8L12.6 0h7.6l9.7 15.9-9.7 15.8z" />
    </svg>
  );
}

// Кнопка целевого действия. Работает и без JavaScript: ведёт к форме внизу страницы.
export function Cta({
  children,
  goal = "",
  block,
  variant = "accent",
  wide = false,
  className = "",
}: {
  children: React.ReactNode;
  goal?: string;
  block: string;
  variant?: "accent" | "light" | "dark";
  wide?: boolean;
  className?: string;
}) {
  return (
    <a href="#zayavka" data-lead={goal} data-block={block} className={`btn-brand ${variant === "accent" ? "" : variant} ${wide ? "wide" : ""} ${className}`}>
      <span>{children}</span>
      <Arrows />
    </a>
  );
}

// Та же кнопка-шеврон для обычных ссылок
export function GoLink({ href, children, variant = "accent", className = "" }: { href: string; children: React.ReactNode; variant?: "accent" | "light" | "dark"; className?: string }) {
  return (
    <a href={href} className={`btn-brand ${variant === "accent" ? "" : variant} ${className}`}>
      <span>{children}</span>
      <Arrows />
    </a>
  );
}
