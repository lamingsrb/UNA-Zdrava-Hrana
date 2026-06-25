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
      </body>
    </html>
  )
}
