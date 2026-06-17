'use client'

import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { Clock, MapPin, Phone, Play } from 'lucide-react'
import { useEffect, useRef } from 'react'
import Reveal from '@/components/ui/Reveal'
import { walkthroughPoster, walkthroughVideo } from '@/lib/gallery'
import { site } from '@/lib/site'

/**
 * Sinematik "posetite nas" traka — živa video šetnja kroz radnju u punoj
 * širini, sa parallax dubinom na skrol. Video kreće tek kad uđe u kadar
 * (IntersectionObserver), bez zvuka i u petlji; uz prefers-reduced-motion
 * ili save-data ostaje samo poster (video se uopšte ne preuzima).
 */
export default function Visit() {
  const ref = useRef<HTMLElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const reduce = useReducedMotion()

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const y = useTransform(scrollYProgress, [0, 1], ['-8%', '8%'])

  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    const saveData = (
      navigator as Navigator & { connection?: { saveData?: boolean } }
    ).connection?.saveData
    // Bez fetch-a videa: poster ostaje vidljiv (preload="none").
    if (reduce || saveData) return

    let inView = false
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          inView = entry.isIntersecting
          if (inView && !document.hidden) void video.play().catch(() => {})
          else video.pause()
        }
      },
      { threshold: 0.25 },
    )
    io.observe(video)

    // Pauziraj kad tab ode u pozadinu (štedi bateriju/CPU na mobilnom),
    // nastavi kad se vrati ako je sekcija još u kadru.
    const onVisibility = () => {
      if (document.hidden) video.pause()
      else if (inView) void video.play().catch(() => {})
    }
    document.addEventListener('visibilitychange', onVisibility)

    return () => {
      io.disconnect()
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [reduce])

  return (
    <section
      id="poseta"
      ref={ref}
      className="grain relative scroll-mt-20 overflow-hidden bg-forest-950"
      aria-label="Posetite našu prodavnicu"
    >
      {/* Parallax video — scale i y idu isključivo kroz framer style
          (jedinstven izvor transforma); pod reduce nema y, samo blago
          uvećanje da video pokrije ivice. */}
      <motion.div
        aria-hidden="true"
        style={reduce ? { scale: 1.25 } : { y, scale: 1.25 }}
        className="absolute inset-0"
      >
        <video
          ref={videoRef}
          poster={walkthroughPoster.src}
          muted
          loop
          playsInline
          preload="none"
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover"
        >
          <source src={walkthroughVideo} type="video/mp4" />
        </video>
      </motion.div>
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-r from-forest-950/92 via-forest-950/72 to-forest-950/40"
      />

      <div className="container-custom relative z-10 py-28 sm:py-36 lg:py-44">
        <div className="max-w-xl">
          <Reveal>
            <p className="eyebrow inline-flex items-center gap-2.5 text-honey-300">
              <span
                className="flex h-6 w-6 items-center justify-center rounded-full bg-honey-400/20"
                aria-hidden="true"
              >
                <Play className="h-3 w-3 fill-honey-300 text-honey-300" />
              </span>
              Šetnja kroz radnju
            </p>
            <h2 className="mt-5 text-balance font-display text-4xl font-semibold text-cream-50 sm:text-5xl">
              Najlepši deo priče počinje{' '}
              <em className="text-gradient-honey font-medium italic">
                kada uđete
              </em>
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-cream-100/80">
              Police pune pažljivo biranih proizvoda, miris čajeva i neko ko će
              vas saslušati. Čekamo vas {site.address.landmarkInline} — svakog
              dana u nedelji.
            </p>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="mt-9 flex flex-wrap items-center gap-x-7 gap-y-3 text-sm font-semibold text-cream-100/85">
              <span className="inline-flex items-center gap-2">
                <Clock className="h-4 w-4 text-honey-300" aria-hidden="true" />
                {site.hours.weekdays.label}: {site.hours.weekdays.opens} –{' '}
                {site.hours.weekdays.closes} · {site.hours.sunday.label}:{' '}
                {site.hours.sunday.opens} – {site.hours.sunday.closes}
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
                href={`tel:${site.phones.landline.e164}`}
                className="btn-outline-light"
              >
                <Phone className="h-4 w-4" aria-hidden="true" />
                {site.phones.landline.display}
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
