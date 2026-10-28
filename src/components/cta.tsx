// Кнопка целевого действия. Работает и без JavaScript: ведёт к форме внизу страницы.
export function Dumbbell({ size = 22 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" aria-hidden="true">
      <path d="M8.5 15.5l7-7M5.2 12.2l6.6 6.6M12.2 5.2l6.6 6.6M3.5 14.6l5.9 5.9M14.6 3.5l5.9 5.9" />
    </svg>
  );
}

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
  variant?: "accent" | "light";
  wide?: boolean;
  className?: string;
}) {
  return (
    <a href="#zayavka" data-lead={goal} data-block={block} className={`btn-brand ${variant === "light" ? "light" : ""} ${wide ? "wide" : ""} ${className}`}>
      <span className="ico">
        <Dumbbell />
      </span>
      <span>{children}</span>
    </a>
  );
}
