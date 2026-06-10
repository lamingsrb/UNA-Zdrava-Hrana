'use client'

import { motion } from 'framer-motion'
import Reveal from '@/components/ui/Reveal'

const EASE = [0.22, 1, 0.36, 1] as const

const chapters = [
  {
    numeral: '01',
    name: 'Koren',
    title: 'Sve počinje u prirodi',
    text:
      'Verujemo da hrana ne mora da bude komplikovana da bi bila dobra — mora da bude prava. ' +
      'Zato na našim policama nema slučajnih proizvoda: samo ono što priroda ume da napravi, ' +
      'a mi umemo da prepoznamo.',
  },
  {
    numeral: '02',
    name: 'Izbor',
    title: 'Biramo kao za svoju kuću',
    text:
      'Svaki proizvod na našoj polici prošao je jednostavan test: da li bismo ga poneli kući, ' +
      'svojoj porodici? Ako odgovor nije odmah „da“ — nije ni na polici.',
  },
  {
    numeral: '03',
    name: 'Susret',
    title: 'Vrata kod mosta u Bresnici',
    text:
      'Više od 15 godina, na istom mestu, sa istim osmehom. Dođite po proizvod, ostanite na ' +
      'razgovoru — odavde se odlazi s kesom u ruci i savetom koji vredi.',
  },
]

export default function Story() {
  return (
    <section
      id="prica"
      className="section-padding scroll-mt-20 bg-cream-50"
      aria-label="Naša priča"
    >
      <div className="container-custom">
        <Reveal className="mb-20 max-w-2xl">
          <p className="eyebrow text-leaf-700">
            <span className="eyebrow-dot" aria-hidden="true" />
            Naša priča
          </p>
          <h2 className="mt-5 text-balance font-display text-4xl font-semibold text-ink sm:text-5xl lg:text-6xl">
            Od prirode do{' '}
            <span className="text-gradient-leaf">vaše trpeze</span>
          </h2>
        </Reveal>

        <div className="space-y-20 lg:space-y-28">
          {chapters.map((chapter, index) => (
            <div
              key={chapter.numeral}
              className={`grid items-center gap-8 lg:grid-cols-12 lg:gap-12 ${
                index % 2 === 1 ? '' : ''
              }`}
            >
              <Reveal
                className={`lg:col-span-4 ${
                  index % 2 === 1 ? 'lg:order-2 lg:text-right' : ''
                }`}
              >
                <div className="relative">
                  <span
                    aria-hidden="true"
                    className="font-display text-[7rem] font-semibold leading-none text-leaf-100 sm:text-[9rem]"
                  >
                    {chapter.numeral}
                  </span>
                  <span className="absolute bottom-4 left-1 text-sm font-bold uppercase tracking-widest2 text-honey-700 sm:bottom-6">
                    {chapter.name}
                  </span>
                </div>
              </Reveal>

              <div
                className={`lg:col-span-8 ${index % 2 === 1 ? 'lg:order-1' : ''}`}
              >
                <Reveal delay={0.12}>
                  <h3 className="font-display text-3xl font-semibold text-ink sm:text-4xl">
                    {chapter.title}
                  </h3>
                </Reveal>
                <motion.div
                  aria-hidden="true"
                  className="mt-5 h-px w-full origin-left bg-gradient-to-r from-honey-400 via-leaf-300 to-transparent"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 1.1, ease: EASE }}
                />
                <Reveal delay={0.2}>
                  <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink/70">
                    {chapter.text}
                  </p>
                </Reveal>
              </div>
            </div>
          ))}
        </div>

        <Reveal className="mt-24 lg:mt-32">
          <figure className="mx-auto max-w-3xl text-center">
            <blockquote className="text-balance font-display text-2xl font-medium italic leading-snug text-leaf-800 sm:text-3xl lg:text-4xl">
              „Zdravlje nije trend. Zdravlje je navika koja se gradi svaki
              dan — a mi smo tu da vam je olakšamo.“
            </blockquote>
            <figcaption className="mt-6 text-sm font-bold uppercase tracking-widest2 text-honey-700">
              UNA — vaša prodavnica zdrave hrane
            </figcaption>
          </figure>
        </Reveal>
      </div>
    </section>
  )
}
