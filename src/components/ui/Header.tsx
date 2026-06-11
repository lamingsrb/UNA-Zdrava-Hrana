'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { Menu, Phone, X } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { site } from '@/lib/site'

// Linkovi su sidrišta na početnoj — "/#sekcija" radi i sa /blog stranica
// (puna navigacija nazad na početnu), a na početnoj se ponaša kao običan skok.
const navItems = [
  { name: 'Naša priča', href: '/#prica' },
  { name: 'Proizvodi', href: '/#proizvodi' },
  { name: 'O nama', href: '/#o-nama' },
  { name: 'Blog', href: '/blog' },
  { name: 'Recepti', href: '/recepti' },
  { name: 'Lokacija', href: '/#lokacija' },
  { name: 'Kontakt', href: '/#kontakt' },
]

interface HeaderProps {
  /**
   * Blog i druge podstranice nemaju tamni hero, pa header odmah kreće
   * u svetlom "staklo" stanju umesto prozirnog sa svetlim tekstom.
   */
  solid?: boolean
}

export default function Header({ solid = false }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Escape zatvara mobilni meni
  useEffect(() => {
    if (!isOpen) return
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsOpen(false)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [isOpen])

  // Iznad tamnog hero-a header je proziran sa svetlim tekstom;
  // čim krene skrol prelazi u svetlo "staklo" sa tamnim tekstom.
  // Na solid stranicama (blog) odmah je u svetlom stanju.
  const overHero = !solid && !scrolled && !isOpen
  const linkTone = overHero
    ? 'text-cream-50/85 hover:text-cream-50'
    : 'text-ink/75 hover:text-ink'

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        overHero
          ? 'bg-transparent py-2'
          : 'bg-cream-50/85 py-0 shadow-soft backdrop-blur-md'
      }`}
    >
      <nav className="container-custom" aria-label="Glavna navigacija">
        <div className="flex h-16 items-center justify-between sm:h-[76px]">
          <Link
            href="/#pocetna"
            className="group flex items-center gap-2.5"
            aria-label="UNA Zdrava Hrana — početak stranice"
          >
            <Image
              src="/una-logo.svg"
              alt=""
              width={48}
              height={48}
              className="h-11 w-11 transition-transform duration-300 group-hover:scale-110 sm:h-12 sm:w-12"
            />
            <span className="flex flex-col leading-none">
              <span
                className={`font-display text-2xl font-bold transition-colors ${
                  overHero ? 'text-cream-50' : 'text-leaf-700'
                }`}
              >
                UNA
              </span>
              <span
                className={`text-[10px] font-bold uppercase tracking-widest2 transition-colors ${
                  overHero ? 'text-honey-300' : 'text-honey-600'
                }`}
              >
                Zdrava hrana
              </span>
            </span>
          </Link>

          <div className="hidden items-center gap-7 lg:flex">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className={`text-sm font-semibold transition-colors ${linkTone}`}
              >
                {item.name}
              </a>
            ))}
            <a
              href={`tel:${site.phones.landline.e164}`}
              className={overHero ? 'btn-honey !px-5 !py-2.5' : 'btn-primary !px-5 !py-2.5'}
            >
              <Phone className="h-4 w-4" aria-hidden="true" />
              Pozovite nas
            </a>
          </div>

          <button
            type="button"
            onClick={() => setIsOpen((open) => !open)}
            className={`rounded-xl p-2 transition-colors lg:hidden ${
              overHero ? 'text-cream-50 hover:bg-cream-50/10' : 'text-ink hover:bg-ink/5'
            }`}
            aria-expanded={isOpen}
            aria-controls="mobilni-meni"
            aria-label={isOpen ? 'Zatvori meni' : 'Otvori meni'}
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              id="mobilni-meni"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden lg:hidden"
            >
              <div className="flex flex-col gap-1 border-t border-ink/10 py-4">
                {navItems.map((item, index) => (
                  <motion.a
                    key={item.name}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    initial={{ opacity: 0, x: -14 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 * index }}
                    className="rounded-xl px-3 py-3 font-semibold text-ink/80 transition-colors hover:bg-leaf-50 hover:text-leaf-700"
                  >
                    {item.name}
                  </motion.a>
                ))}
                <a
                  href={`tel:${site.phones.landline.e164}`}
                  onClick={() => setIsOpen(false)}
                  className="btn-primary mt-3"
                >
                  <Phone className="h-4 w-4" aria-hidden="true" />
                  {site.phones.landline.display}
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  )
}
