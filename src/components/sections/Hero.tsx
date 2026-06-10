'use client'

import { ArrowRight, MapPin } from 'lucide-react'
import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'
import Marquee from '@/components/ui/Marquee'
import Counter from '@/components/ui/Counter'
import { site, stats } from '@/lib/site'

// 3D scena: učitava se tek kada je browser besposlen (posle LCP-a),
// i preskače se uz prefers-reduced-motion ili uključen save-data režim.
const HeroScene = dynamic(() => import('@/components/three/HeroScene'), {
  ssr: false,
})

const marqueeItems = [
  'Organski proizvodi',
  'Superhrana',
  'Suplementi i vitamini',
  'Čajevi i napici',
  'Zdrave grickalice',
  'Prirodna kozmetika',
]

/** Ulazne animacije su čist CSS (animate-hero-in) — tekst se crta odmah
 *  iz server HTML-a i LCP ne čeka hidrataciju ni JS chunk-ove. */
const heroIn = 'motion-safe:animate-hero-in'
const delay = (ms: number) => ({ animationDelay: `${ms}ms` })

export default function Hero() {
  const [sceneReady, setSceneReady] = useState(false)

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const saveData = (
      navigator as Navigator & { connection?: { saveData?: boolean } }
    ).connection?.saveData
    if (reduce || saveData) return

    const start = () => setSceneReady(true)
    if (typeof window.requestIdleCallback === 'function') {
      const id = window.requestIdleCallback(start, { timeout: 2500 })
      return () => window.cancelIdleCallback(id)
    }
    const id = window.setTimeout(start, 350)
    return () => window.clearTimeout(id)
  }, [])

  return (
    <section
      id="pocetna"
      className="grain relative flex min-h-screen flex-col overflow-hidden bg-forest-950 text-cream-50"
    >
      {/* Pozadina: gradijent + 3D scena */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(120%_90%_at_70%_10%,#16402A_0%,#0A2316_45%,#061A10_100%)]"
      />
      {sceneReady && <HeroScene />}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-forest-950 to-transparent"
      />

      <div className="container-custom relative z-10 flex flex-1 flex-col items-center justify-center pb-28 pt-32 text-center sm:pt-36">
        <h1 className="max-w-4xl">
          <span
            className={`eyebrow block text-honey-300 ${heroIn}`}
            style={delay(50)}
          >
            <span className="eyebrow-dot" aria-hidden="true" />
            Prodavnica zdrave hrane — Bresnica, Kragujevac
            <span className="eyebrow-dot" aria-hidden="true" />
          </span>
          <span
            className={`mt-7 block text-balance font-display text-5xl font-semibold leading-[1.05] sm:text-6xl lg:text-7xl ${heroIn}`}
            style={delay(180)}
          >
            Priroda zna recept.{' '}
            <em className="text-gradient-honey font-medium italic">
              Mi ga čuvamo za vas.
            </em>
          </span>
        </h1>

        <p
          className={`mt-7 max-w-2xl text-balance text-lg leading-relaxed text-cream-100/80 sm:text-xl ${heroIn}`}
          style={delay(320)}
        >
          Organska hrana, superhrana, suplementi i prirodna kozmetika — birani
          s pažnjom već više od {site.yearsInBusiness} godina. Sve za zdrav
          život, na jednom mestu, {site.address.landmarkInline}.
        </p>

        <div
          className={`mt-10 flex flex-col items-center gap-4 sm:flex-row ${heroIn}`}
          style={delay(460)}
        >
          <a href="#proizvodi" className="btn-honey group">
            Istražite ponudu
            <ArrowRight
              className="h-4 w-4 transition-transform group-hover:translate-x-1"
              aria-hidden="true"
            />
          </a>
          <a href="#lokacija" className="btn-outline-light">
            <MapPin className="h-4 w-4" aria-hidden="true" />
            Pronađite nas
          </a>
        </div>

        <ul
          className={`mt-16 grid w-full max-w-2xl grid-cols-3 gap-6 border-t border-cream-50/10 pt-10 ${heroIn}`}
          style={delay(620)}
        >
          {stats.map((stat) => (
            <li key={stat.label} className="flex flex-col items-center gap-1">
              <span className="font-display text-3xl font-semibold tabular-nums text-honey-300 sm:text-5xl">
                <Counter value={stat.value} suffix={stat.suffix} />
              </span>
              <span className="text-xs font-semibold uppercase tracking-widest2 text-cream-100/60 sm:text-sm sm:normal-case sm:tracking-normal">
                {stat.label}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* Pokretna traka kategorija */}
      <div className="relative z-10 border-t border-cream-50/10 bg-forest-950/60 py-5 text-cream-100/70 backdrop-blur-sm">
        <Marquee items={marqueeItems} />
      </div>

      {/* Indikator skrola — čist CSS, bez JS animacije */}
      <div
        aria-hidden="true"
        className="absolute bottom-24 left-1/2 z-10 hidden -translate-x-1/2 motion-safe:animate-bob sm:block"
      >
        <div className="flex h-10 w-6 items-start justify-center rounded-full border border-cream-50/30 p-1.5">
          <div className="h-2 w-1 rounded-full bg-honey-300" />
        </div>
      </div>
    </section>
  )
}
