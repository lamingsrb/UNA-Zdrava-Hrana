'use client'

import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { Clock, MapPin, Phone } from 'lucide-react'
import Image from 'next/image'
import { useRef } from 'react'
import Reveal from '@/components/ui/Reveal'
import { site } from '@/lib/site'

/**
 * Sinematik "posetite nas" traka — fotografija prodavnice u punoj širini,
 * sa parallax dubinom na skrol.
 */
export default function Visit() {
  const ref = useRef<HTMLElement>(null)
  const reduce = useReducedMotion()

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const y = useTransform(scrollYProgress, [0, 1], ['-8%', '8%'])

  return (
    <section
      id="galerija"
      ref={ref}
      className="grain relative scroll-mt-20 overflow-hidden bg-forest-950"
      aria-label="Posetite našu prodavnicu"
    >
      {/* Parallax fotografija — scale mora biti u framer style objektu:
          inline transform bi inače pregazio Tailwind scale klasu */}
      <motion.div
        aria-hidden="true"
        style={reduce ? undefined : { y, scale: 1.25 }}
        className="absolute inset-0 scale-[1.25]"
      >
        <Image
          src="/images/store/store-front.jpg"
          alt=""
          fill
          className="object-cover"
          sizes="100vw"
        />
      </motion.div>
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-r from-forest-950/90 via-forest-950/70 to-forest-950/40"
      />

      <div className="container-custom relative z-10 py-28 sm:py-36 lg:py-44">
        <div className="max-w-xl">
          <Reveal>
            <p className="eyebrow text-honey-300">
              <span className="eyebrow-dot" aria-hidden="true" />
              Posetite nas
            </p>
            <h2 className="mt-5 text-balance font-display text-4xl font-semibold text-cream-50 sm:text-5xl">
              Najlepši deo priče počinje{' '}
              <em className="text-gradient-honey font-medium italic">
                kada uđete
              </em>
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-cream-100/80">
              Police pune pažljivo biranih proizvoda, miris čajeva i neko ko će
              vas saslušati. Čekamo vas {site.address.landmarkInline}, svakog
              dana osim nedelje.
            </p>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="mt-9 flex flex-wrap items-center gap-x-7 gap-y-3 text-sm font-semibold text-cream-100/85">
              <span className="inline-flex items-center gap-2">
                <Clock className="h-4 w-4 text-honey-300" aria-hidden="true" />
                {site.hours.label}: {site.hours.opens} – {site.hours.closes}
              </span>
              <span className="inline-flex items-center gap-2">
                <MapPin className="h-4 w-4 text-honey-300" aria-hidden="true" />
                {site.address.street}, {site.address.city}
              </span>
            </div>
          </Reveal>

          <Reveal delay={0.25}>
            <div className="mt-9 flex flex-col gap-4 sm:flex-row">
              <a
                href={site.maps.directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-honey"
              >
                <MapPin className="h-4 w-4" aria-hidden="true" />
                Put do prodavnice
              </a>
              <a
                href={`tel:${site.phones.mobile.e164}`}
                className="btn-outline-light"
              >
                <Phone className="h-4 w-4" aria-hidden="true" />
                {site.phones.mobile.display}
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
