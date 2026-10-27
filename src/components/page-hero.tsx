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
    <section className={`relative isolate overflow-hidden ${image ? "min-h-[36rem] md:min-h-[44rem]" : ""} flex items-end`} data-block="page_hero">
      {image && (
        <>
          <Image src={image} alt={imageAlt} fill priority sizes="100vw" className="-z-20 object-cover grayscale" />
          <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(11,11,10,0.6)_0%,rgba(11,11,10,0.55)_45%,#0b0b0a_100%)]" />
        </>
      )}
      <div className="wrap pb-12 pt-28 md:pb-20 md:pt-36">
        <Breadcrumbs items={crumbs} />
        <h1 className="mt-6 max-w-5xl text-[clamp(3rem,1.6rem+5.6vw,8rem)] leading-[0.88]">{title}</h1>
        {lead && <p className="rise rise-2 mt-6 max-w-2xl text-[length:var(--text-lead)] text-[#d9d2ca]">{lead}</p>}
        {children && <div className="mt-8 flex flex-col gap-3 sm:flex-row">{children}</div>}
      </div>
    </section>
  );
}
