// Кнопка целевого действия. Работает и без JavaScript: ведёт к форме внизу страницы.
export function Cta({
  children,
  goal = "",
  block,
  variant = "accent",
  className = "",
}: {
  children: React.ReactNode;
  goal?: string;
  block: string;
  variant?: "accent" | "ghost";
  className?: string;
}) {
  return (
    <a href="#zayavka" data-lead={goal} data-block={block} className={`btn btn-${variant} ${className}`}>
      {children}
    </a>
  );
}
