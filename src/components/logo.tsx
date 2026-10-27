// Логотип из старого сайта: «URBAN» цветом текста, «210›» акцентом.
export function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-baseline font-display text-[1.65rem] font-bold leading-none tracking-tight ${className}`} role="img" aria-label="Urban210">
      <span aria-hidden="true">URBAN</span>
      <span aria-hidden="true" className="text-accent">
        210
      </span>
      <svg aria-hidden="true" viewBox="0 0 10 16" className="ml-0.5 h-[0.8em] w-auto text-accent" fill="currentColor">
        <path d="M0 0h3.6L10 8l-6.4 8H0l6.4-8z" />
      </svg>
    </span>
  );
}
