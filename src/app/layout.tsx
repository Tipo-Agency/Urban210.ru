import type { Metadata, Viewport } from "next";
import { Golos_Text, Oswald, Unbounded } from "next/font/google";
import Script from "next/script";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { JsonLd } from "@/components/json-ld";
import { LeadDialog } from "@/components/lead-dialog";
import { MobileBar } from "@/components/mobile-bar";
import { Motion } from "@/components/motion";
import { SITE_URL } from "@/data/site";
import { gymSchema } from "@/lib/seo";
import "./globals.css";

// Unbounded для заголовков, Golos Text для текста. Oswald только для логотипа, нужна одна латиница.
const unbounded = Unbounded({ subsets: ["latin", "cyrillic"], weight: ["700"], variable: "--font-unbounded", display: "swap" });
const golos = Golos_Text({ subsets: ["latin", "cyrillic"], weight: ["400", "600"], variable: "--font-golos", display: "swap" });
const oswald = Oswald({ subsets: ["latin"], weight: ["700"], variable: "--font-oswald", display: "swap", preload: false });

const YM_ID = process.env.NEXT_PUBLIC_YM_ID;
const GA_ID = process.env.NEXT_PUBLIC_GA_ID;
const CT_ID = process.env.NEXT_PUBLIC_CALLTOUCH_ID;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: "Фитнес-клуб Urban210 в Хабаровске: безлимит от 1300 ₽ в месяц", template: "%s | Urban210" },
  description:
    "Фитнес-клуб Urban210 в Железнодорожном районе Хабаровска: тренажёры Technogym и Matrix, групповые программы, сауна и хаммам, бесплатная парковка. Без вступительного взноса. Пробный день за 1 ₽.",
  applicationName: "Urban210",
  formatDetection: { telephone: false },
  verification: { yandex: "767e7e36f712fc4c" },
};

export const viewport: Viewport = { themeColor: "#110e0c", colorScheme: "dark" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru" className={`${unbounded.variable} ${golos.variable} ${oswald.variable}`} suppressHydrationWarning>
      <head>
        {/* Класс js включает анимации появления. Без скриптов контент виден сразу. */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body>
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:bg-accent focus:px-4 focus:py-2 focus:text-paper-ink">
          К содержанию
        </a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <MobileBar />
        <LeadDialog />
        <Motion />
        <JsonLd data={gymSchema()} />
        {YM_ID && (
          <>
            <Script id="ym" strategy="afterInteractive">{`(function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};m[i].l=1*new Date();for(var j=0;j<document.scripts.length;j++){if(document.scripts[j].src===r){return;}}k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})(window,document,"script","https://mc.yandex.ru/metrika/tag.js","ym");ym(${Number(YM_ID)},"init",{clickmap:true,trackLinks:true,accurateTrackBounce:true,webvisor:true});`}</Script>
            <noscript>
              <div>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={`https://mc.yandex.ru/watch/${Number(YM_ID)}`} style={{ position: "absolute", left: "-9999px" }} alt="" />
              </div>
            </noscript>
          </>
        )}
        {CT_ID && (
          <Script id="calltouch" strategy="lazyOnload">{`(function(w,d,n,c){w.CalltouchDataObject=n;w[n]=function(){w[n]["callbacks"].push(arguments)};if(!w[n]["callbacks"]){w[n]["callbacks"]=[]}w[n]["loaded"]=false;if(typeof c!=="object"){c=[c]}w[n]["counters"]=c;for(var i=0;i<c.length;i+=1){p(c[i])}function p(cId){var a=d.getElementsByTagName("script")[0],s=d.createElement("script"),i=function(){a.parentNode.insertBefore(s,a)},m=typeof Array.prototype.find==='function',n=m?"init-min.js":"init.js";s.async=true;s.src="https://mod.calltouch.ru/"+n+"?id="+cId;i()}})(window,document,"ct",${JSON.stringify(CT_ID)});`}</Script>
        )}
        {GA_ID && (
          <>
            <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
            <Script id="ga" strategy="afterInteractive">{`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','${GA_ID}');`}</Script>
          </>
        )}
      </body>
    </html>
  );
}
