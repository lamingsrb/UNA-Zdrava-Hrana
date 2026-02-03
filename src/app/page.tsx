import Hero from '@/components/sections/Hero'
import About from '@/components/sections/About'
import Products from '@/components/sections/Products'
import Location from '@/components/sections/Location'
import Contact from '@/components/sections/Contact'
import Header from '@/components/ui/Header'
import Footer from '@/components/ui/Footer'

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <About />
      <Products />
      <Location />
      <Contact />
      <Footer />
    </main>
  )
}
