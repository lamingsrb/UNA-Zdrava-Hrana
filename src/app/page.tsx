import Header from '@/components/ui/Header'
import Footer from '@/components/ui/Footer'
import Hero from '@/components/sections/Hero'
import Story from '@/components/sections/Story'
import Products from '@/components/sections/Products'
import About from '@/components/sections/About'
import Gallery from '@/components/sections/Gallery'
import Visit from '@/components/sections/Visit'
import FAQ from '@/components/sections/FAQ'
import Location from '@/components/sections/Location'
import Contact from '@/components/sections/Contact'
import {
  buildFaqJsonLd,
  buildFounderJsonLd,
  buildStoreJsonLd,
  buildWebSiteJsonLd,
} from '@/lib/site'

export default function Home() {
  const jsonLd = [buildStoreJsonLd(), buildWebSiteJsonLd(), buildFaqJsonLd(), buildFounderJsonLd()]

  return (
    <>
      {jsonLd.map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
      <a
        href="#sadrzaj"
        className="sr-only z-[100] rounded-xl bg-leaf-700 px-5 py-3 font-sans text-sm font-bold text-cream-50 focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        Preskoči na sadržaj
      </a>
      <Header />
      <main id="sadrzaj" className="min-h-screen">
        <Hero />
        <Story />
        <Products />
        <About />
        <Gallery />
        <Visit />
        <FAQ />
        <Location />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
