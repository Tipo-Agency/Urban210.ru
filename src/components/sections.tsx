import { programs } from "@/data/content";

export function SectionHead({ title, text, id, action }: { title: string; text?: string; id: string; action?: React.ReactNode }) {
  return (
    <div className="mb-10 flex flex-col gap-6 md:mb-14 md:flex-row md:items-end md:justify-between">
      <div className="max-w-3xl">
        <h2 id={id} className="text-[length:var(--text-h2)]">
          {title}
        </h2>
        {text && <p className="text-muted mt-4 max-w-2xl text-[length:var(--text-lead)]">{text}</p>}
      </div>
      {action}
    </div>
  );
}

export function Programs({ withLink = true }: { withLink?: boolean }) {
  return (
    <div className="grid gap-px overflow-hidden rounded-[var(--radius-card)] border border-line bg-line md:grid-cols-2">
      {programs.map((p) => (
        <div key={p.group} className="bg-bg p-6 md:p-8">
          <h3 className="text-[length:var(--text-h3)]">{p.group}</h3>
          <p className="mt-2 font-medium text-accent">{p.items.join(" · ")}</p>
          <p className="text-muted mt-3">{p.text}</p>
        </div>
      ))}
      {withLink && null}
    </div>
  );
}

export { PromoCards as Promos } from "./blocks";

