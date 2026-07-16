import type { Metadata, Viewport } from 'next'
import { Fraunces, Manrope } from 'next/font/google'
import Script from 'next/script'
import { SITE_URL, site } from '@/lib/site'
import './globals.css'

const fraunces = Fraunces({
  subsets: ['latin', 'latin-ext'],
  style: ['normal', 'italic'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-fraunces',
  display: 'swap',
})

const manrope = Manrope({
  subsets: ['latin', 'latin-ext'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-manrope',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'UNA Zdrava Hrana — prodavnica zdrave hrane u Kragujevcu',
    template: '%s | UNA Zdrava Hrana Kragujevac',
  },
  description:
    'Prodavnica zdrave hrane u Kragujevcu, kod mosta u Bresnici. Organski proizvodi, ' +
    'suplementi, superhrana i prirodna kozmetika. 15+ godina poverenja. Otvoreni svakog dana.',
  keywords: [
    'zdrava hrana Kragujevac',
    'prodavnica zdrave hrane Kragujevac',
    'organski proizvodi Kragujevac',
    'zdrava hrana Bresnica',
    'suplementi Kragujevac',
    'vitamini Kragujevac',
    'superhrana',
    'prirodna kozmetika Kragujevac',
    'UNA zdrava hrana',
  ],
  authors: [{ name: site.name }],
  creator: site.name,
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'sr_RS',
    url: SITE_URL,
    siteName: site.name,
    title: 'UNA Zdrava Hrana — Kragujevac, kod mosta u Bresnici',
    description:
      'Organski proizvodi, suplementi, superhrana i prirodna kozmetika. ' +
      'Više od 15 godina poverenja. Otvoreni svakog dana.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'UNA Zdrava Hrana — Kragujevac',
    description:
      'Prodavnica zdrave hrane kod Mosta u Bresnici. Više od 15 godina poverenja.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  // favicon/apple ikonice: Next file konvencija — src/app/icon.png i apple-icon.png
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#061A10',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="sr-Latn" className={`${fraunces.variable} ${manrope.variable}`}>
      <body className="font-sans">
        {children}
        {/* Umami self-hosted analytics (AEO referral tracking) — isti funnel
            kao fakturko.io / bizflowai.io; c007aa82-bb16-43b0-94a1-270b5addb7fe je placeholder
            koji integrator zamenjuje pravim website UUID-om iz Umami-ja.
            defer + lazyOnload: fail-silent ako je funnel down, ne blokira LCP.
            recorder.js = session replay. */}
        <Script
          defer
          src="/_stats/script.js" data-host-url="https://unazdravahrana.com/_stats"
          data-website-id="c007aa82-bb16-43b0-94a1-270b5addb7fe"
          strategy="lazyOnload"
        />
        {/* BizFlow lead-tracker v1: broji lead klikove (tel/viber/mailto/maps/forma...)
            kao PostHog 'Lead Click' {action, $host}. Cookieless, anonimno — random
            distinct_id po eventu, bez kolačića. Downstream: posthog_sync.py ->
            lead_events_daily -> /analytics. Kanon: BizFlow_ContentStudio/docs/LEAD_TRACKER_SNIPPET.html */}
        <Script id="bizflow-lead-tracker" strategy="afterInteractive" dangerouslySetInnerHTML={{ __html: `
(function(){var K='phc_HlhWFN4k7VNBZzsZhilmyShFWi3bebCOehOzZMibQfW',EP='https://us.i.posthog.com/capture/';
function act(el){var d=el.getAttribute('data-lead');if(d)return d;var h=(el.getAttribute('href')||'').toLowerCase();if(!h)return null;
if(h.indexOf('tel:')===0)return'tel_click';if(h.indexOf('viber:')===0)return'viber_click';
if(h.indexOf('wa.me')>-1||h.indexOf('whatsapp')>-1)return'whatsapp_click';if(h.indexOf('mailto:')===0)return'mailto_click';
if(h.indexOf('calendly.com')>-1)return'calendly_click';if(h.indexOf('linkedin.com')>-1)return'linkedin_click';
if(h.indexOf('instagram.com')>-1)return'instagram_click';if(h.indexOf('github.com')>-1)return'github_click';
if(h.indexOf('maps.google')>-1||h.indexOf('google.com/maps')>-1||h.indexOf('goo.gl/maps')>-1||h.indexOf('maps.app')>-1)return'maps_click';return null}
function send(a){try{var b=JSON.stringify({api_key:K,event:'Lead Click',distinct_id:'anon-'+Math.random().toString(36).slice(2),properties:{action:a,$host:location.hostname.replace(/^www\\./,''),$current_url:location.href,$pathname:location.pathname}});
if(navigator.sendBeacon){navigator.sendBeacon(EP,new Blob([b],{type:'application/json'}))}else{fetch(EP,{method:'POST',headers:{'Content-Type':'application/json'},body:b,keepalive:true})}}catch(e){}}
document.addEventListener('click',function(e){var t=e.target,el=t&&t.closest?t.closest('a[href],[data-lead]'):null;if(!el)return;var a=act(el);if(a)send(a)},true);
document.addEventListener('submit',function(e){var f=e.target;if(f&&f.tagName==='FORM')send(f.getAttribute('data-lead')||'form_submit')},true);
})();` }} />
      </body>
    </html>
  )
}
