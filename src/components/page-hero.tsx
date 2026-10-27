import Image from "next/image";
import { Breadcrumbs } from "./breadcrumbs";

export function PageHero({
  title,
  lead,
  crumbs,
  image,
  imageAlt = "",
  children,
}: {
  title: React.ReactNode;
  lead?: React.ReactNode;
  crumbs: { href: string; label: string }[];
  image?: string;
  imageAlt?: string;
  children?: React.ReactNode;
}) {
  return (
    <section className={`relative isolate overflow-hidden ${image ? "min-h-[34rem] md:min-h-[38rem]" : ""} flex items-end`} data-block="page_hero">
      {image && (
        <>
          <Image src={image} alt={imageAlt} fill priority sizes="100vw" className="-z-20 object-cover" />
          <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(15,14,13,0.45)_0%,rgba(15,14,13,0.7)_55%,#0f0e0d_100%)]" />
        </>
      )}
      <div className="wrap pb-12 pt-10 md:pb-16 md:pt-14">
        <Breadcrumbs items={crumbs} />
        <h1 className="mt-6 max-w-4xl text-[length:var(--text-h2)] md:text-[clamp(2.5rem,1.5rem+3.5vw,5rem)]">{title}</h1>
        {lead && <p className="mt-5 max-w-2xl text-[length:var(--text-lead)] text-[#d9d2ca]">{lead}</p>}
        {children && <div className="mt-8 flex flex-col gap-3 sm:flex-row">{children}</div>}
      </div>
    </section>
  );
}
