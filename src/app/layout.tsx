import type { Metadata } from 'next'
import { Inter, Poppins } from 'next/font/google'
import './globals.css'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
})

const poppins = Poppins({ 
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-poppins',
})

export const metadata: Metadata = {
  title: 'UNA - Zdrava Hrana | Kragujevac',
  description: 'Prodavnica zdrave hrane sa 15+ godina iskustva. Najkvalitetniji organski proizvodi, suplementi i proizvodi za zdrav način života. Kragujevac, kod Mosta u Bresnici.',
  keywords: 'zdrava hrana, organski proizvodi, suplementi, Kragujevac, UNA, zdravlje, wellness',
  authors: [{ name: 'UNA Zdrava Hrana' }],
  openGraph: {
    title: 'UNA - Zdrava Hrana | Kragujevac',
    description: '15+ godina poverenja u zdravoj ishrani',
    url: 'https://unazdr avahrana.rs',
    siteName: 'UNA Zdrava Hrana',
    locale: 'sr_RS',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="sr" className={`${inter.variable} ${poppins.variable}`}>
      <body className="font-sans">
        {children}
      </body>
    </html>
  )
}
