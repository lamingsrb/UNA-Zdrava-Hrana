'use client'

import { Apple, Coffee, Droplet, Heart, Leaf, Sparkles } from 'lucide-react'
import Reveal from '@/components/ui/Reveal'
import TiltCard from '@/components/ui/TiltCard'

const categories = [
  {
    icon: Leaf,
    title: 'Organski proizvodi',
    description: 'Sertifikovano organsko — bez pesticida i bez GMO.',
    items: ['Organske žitarice', 'Integralne testenine', 'Ekološka brašna'],
    chip: 'bg-leaf-50 text-leaf-700',
    glow: 'from-leaf-400/25',
  },
  {
    icon: Heart,
    title: 'Suplementi i vitamini',
    description: 'Pažljivo birani dodaci ishrani za svakodnevnu podršku.',
    items: ['Multivitamini', 'Omega-3', 'Probiotici'],
    chip: 'bg-rose-50 text-rose-600',
    glow: 'from-rose-400/25',
  },
  {
    icon: Coffee,
    title: 'Čajevi i napici',
    description: 'Prirodni čajevi i zdravi napici za svaki deo dana.',
    items: ['Zeleni čaj', 'Biljne mešavine', 'Prirodni sokovi'],
    chip: 'bg-amber-50 text-amber-600',
    glow: 'from-amber-400/25',
  },
  {
    icon: Apple,
    title: 'Zdrave grickalice',
    description: 'Ukusno i nutritivno, bez nepotrebnih dodataka.',
    items: ['Orašasti plodovi i semenke', 'Proteinske pločice', 'Voćne pločice'],
    chip: 'bg-orange-50 text-orange-600',
    glow: 'from-orange-400/25',
  },
  {
    icon: Sparkles,
    title: 'Superhrana',
    description: 'Namirnice bogate nutrijentima za maksimalnu vitalnost.',
    items: ['Chia semenke', 'Spirulina', 'Goji bobice'],
    chip: 'bg-violet-50 text-violet-600',
    glow: 'from-violet-400/25',
  },
  {
    icon: Droplet,
    title: 'Prirodna kozmetika',
    description: 'Nega kože i tela po receptu prirode.',
    items: ['Prirodna nega kože', 'Etarska ulja', 'Prirodni sapuni'],
    chip: 'bg-sky-50 text-sky-600',
    glow: 'from-sky-400/25',
  },
]

export default function Products() {
  return (
    <section
      id="proizvodi"
      className="section-padding scroll-mt-20 bg-cream-50"
      aria-label="Proizvodi"
    >
      <div className="container-custom">
        <Reveal className="mb-16 max-w-3xl">
          <p className="eyebrow text-leaf-700">
            <span className="eyebrow-dot" aria-hidden="true" />
            Proizvodi
          </p>
          <h2 className="mt-5 text-balance font-display text-4xl font-semibold text-ink sm:text-5xl lg:text-6xl">
            Više od 500 proizvoda,{' '}
            <span className="text-gradient-leaf">jedan standard</span>
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-ink/70">
            Šest kategorija pažljivo složenih na policama — od organskih
            namirnica do prirodne kozmetike. Ako nešto tražite, a ne vidite na
            polici — pitajte: vrlo verovatno možemo da ga nabavimo za vas.
          </p>
        </Reveal>

        <div className="grid gap-7 md:grid-cols-2 lg:grid-cols-3">
          {categories.map((category, index) => {
            const Icon = category.icon
            return (
              <Reveal key={category.title} delay={index * 0.07}>
                <TiltCard className="card-surface group h-full">
                  <div
                    aria-hidden="true"
                    className={`pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-gradient-radial ${category.glow} to-transparent opacity-0 transition-opacity duration-700 group-hover:opacity-100`}
                  />
                  <div className="relative flex h-full flex-col p-8">
                    <div
                      className={`flex h-14 w-14 items-center justify-center rounded-2xl ${category.chip} transition-transform duration-500 group-hover:scale-110`}
                    >
                      <Icon className="h-7 w-7" aria-hidden="true" />
                    </div>
                    <h3 className="mt-6 font-display text-2xl font-semibold text-ink">
                      {category.title}
                    </h3>
                    <p className="mt-2.5 text-sm leading-relaxed text-ink/65">
                      {category.description}
                    </p>
                    <ul className="mt-5 flex flex-wrap gap-2">
                      {category.items.map((item) => (
                        <li
                          key={item}
                          className="rounded-full border border-ink/10 px-3.5 py-1.5 text-xs font-semibold text-ink/70"
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </TiltCard>
              </Reveal>
            )
          })}
        </div>

        <Reveal className="mt-16 text-center">
          <p className="text-lg text-ink/70">
            Niste sigurni odakle da krenete? Tu smo da vam pomognemo da
            izaberete.
          </p>
          <a href="#kontakt" className="btn-primary mt-6">
            Slobodno nas pitajte
          </a>
        </Reveal>
      </div>
    </section>
  )
}
