'use client'

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ChevronLeft, ChevronRight, Expand, X } from 'lucide-react'
import Image from 'next/image'
import { useCallback, useEffect, useRef, useState } from 'react'
import Reveal from '@/components/ui/Reveal'
import { galleryImages } from '@/lib/gallery'

const EASE = [0.22, 1, 0.36, 1] as const

const kindLabel: Record<string, string> = {
  exterior: 'Spolja',
  interior: 'Iznutra',
}

/**
 * Galerija prodavnice — masonry mrežica pravih fotki sa lightbox-om.
 * Slike se učitavaju lenjo, sa blur placeholderom (bez layout skoka).
 * Lightbox: tastatura (←/→/Esc), focus trap, vraćanje fokusa na okidač,
 * aria-live najava aktivne slike i zaključavanje skrola u pozadini.
 */
export default function Gallery() {
  const reduce = useReducedMotion()
  const [active, setActive] = useState<number | null>(null)
  const isOpen = active !== null

  // Element koji je otvorio lightbox — fokus se vraća ovde pri zatvaranju.
  const triggerRef = useRef<HTMLButtonElement | null>(null)
  const dialogRef = useRef<HTMLDivElement>(null)
  const closeBtnRef = useRef<HTMLButtonElement>(null)

  const close = useCallback(() => setActive(null), [])
  const go = useCallback(
    (dir: number) =>
      setActive((current) => {
        if (current === null) return current
        return (current + dir + galleryImages.length) % galleryImages.length
      }),
    [],
  )

  const open = useCallback(
    (index: number, trigger: HTMLButtonElement) => {
      triggerRef.current = trigger
      setActive(index)
    },
    [],
  )

  // Tastatura + focus trap + zaključavanje skrola dok je lightbox otvoren.
  // Keyovan na isOpen (ne na indeks) da se ne re-pokreće pri ←/→ navigaciji.
  useEffect(() => {
    if (!isOpen) return

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        close()
      } else if (e.key === 'ArrowRight') {
        go(1)
      } else if (e.key === 'ArrowLeft') {
        go(-1)
      } else if (e.key === 'Tab') {
        const dialog = dialogRef.current
        if (!dialog) return
        const focusables = dialog.querySelectorAll<HTMLElement>('button')
        if (focusables.length === 0) return
        const first = focusables[0]
        const last = focusables[focusables.length - 1]
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault()
          last.focus()
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault()
          first.focus()
        }
      }
    }

    window.addEventListener('keydown', onKey)
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const focusId = window.setTimeout(() => closeBtnRef.current?.focus(), 0)

    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = prevOverflow
      window.clearTimeout(focusId)
      triggerRef.current?.focus()
    }
  }, [isOpen, close, go])

  const current = active === null ? null : galleryImages[active]

  return (
    <section
      id="galerija"
      className="section-padding relative scroll-mt-20 overflow-hidden bg-gradient-to-b from-cream-50 via-cream-100 to-cream-50"
      aria-label="Galerija prodavnice"
    >
      <div
        aria-hidden="true"
        className="glow-blob -left-32 top-24 h-[26rem] w-[26rem] bg-honey-200/40"
      />
      <div
        aria-hidden="true"
        className="glow-blob -right-28 bottom-16 h-96 w-96 bg-leaf-200/45"
      />

      <div className="container-custom relative z-10">
        <Reveal className="mb-14 max-w-3xl">
          <p className="eyebrow text-leaf-700">
            <span className="eyebrow-dot" aria-hidden="true" />
            Galerija
          </p>
          <h2 className="mt-5 text-balance font-display text-4xl font-semibold text-ink sm:text-5xl lg:text-6xl">
            Zavirite u našu radnju{' '}
            <span className="text-gradient-leaf">pre nego što svratite</span>
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-ink/70">
            Od ulice kod mosta do polica punih rinfuz superhrane, suvog voća i
            čajeva — ovako izgleda mesto koje već više od 15 godina mirise na
            zdravlje. Kliknite na bilo koju fotografiju za uvećan prikaz.
          </p>
        </Reveal>

        {/* Masonry: prirodne visine (sve fotke su 4:3); break-inside-avoid
            drži svaku karticu celom unutar jedne kolone. */}
        <div className="gap-4 [column-fill:_balance] sm:columns-2 lg:columns-3 [&>*]:mb-4">
          {galleryImages.map((img, index) => (
            <motion.button
              key={img.src}
              type="button"
              onClick={(event) => open(index, event.currentTarget)}
              initial={{ opacity: 0, y: reduce ? 0 : 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.7, delay: (index % 3) * 0.08, ease: EASE }}
              className="group relative block w-full break-inside-avoid overflow-hidden rounded-3xl shadow-soft ring-1 ring-ink/5 transition-shadow duration-500 hover:shadow-lift focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-leaf-600"
              aria-label={`Uvećaj: ${img.alt}`}
            >
              <Image
                src={img.src}
                alt={img.alt}
                width={img.width}
                height={img.height}
                placeholder="blur"
                blurDataURL={img.blurDataURL}
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                loading="lazy"
                className="h-auto w-full object-cover ease-out motion-safe:transition-transform motion-safe:duration-[800ms] motion-safe:group-hover:scale-[1.06]"
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-forest-950/55 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
              />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 flex translate-y-2 items-center justify-between p-5 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                <span className="rounded-full bg-cream-50/90 px-3 py-1 text-[11px] font-bold uppercase tracking-widest2 text-forest-800 backdrop-blur-sm">
                  {kindLabel[img.kind]}
                </span>
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-honey-400 text-forest-950 shadow-soft">
                  <Expand className="h-4 w-4" aria-hidden="true" />
                </span>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {current && (
          <motion.div
            ref={dialogRef}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-forest-950/92 p-4 backdrop-blur-md sm:p-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={close}
            role="dialog"
            aria-modal="true"
            aria-label={current.alt}
          >
            {/* Najava aktivne slike čitaču ekrana pri svakoj navigaciji
                (van keyovane figure da se pouzdano reanonsira). */}
            <p aria-live="polite" className="sr-only">
              Fotografija {(active ?? 0) + 1} od {galleryImages.length}:{' '}
              {current.alt}
            </p>

            <button
              ref={closeBtnRef}
              type="button"
              onClick={close}
              className="absolute right-4 top-4 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-cream-50/10 text-cream-50 transition-colors hover:bg-cream-50/20 sm:right-6 sm:top-6"
              aria-label="Zatvori"
            >
              <X className="h-5 w-5" aria-hidden="true" />
            </button>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                go(-1)
              }}
              className="absolute left-3 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-cream-50/10 text-cream-50 transition-colors hover:bg-cream-50/20 sm:left-6"
              aria-label="Prethodna fotografija"
            >
              <ChevronLeft className="h-6 w-6" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                go(1)
              }}
              className="absolute right-3 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-cream-50/10 text-cream-50 transition-colors hover:bg-cream-50/20 sm:right-6"
              aria-label="Sledeća fotografija"
            >
              <ChevronRight className="h-6 w-6" aria-hidden="true" />
            </button>

            <motion.figure
              key={current.src}
              className="relative flex max-h-full w-full max-w-5xl flex-col items-center"
              initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.3, ease: EASE }}
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={current.src}
                alt={current.alt}
                width={current.width}
                height={current.height}
                placeholder="blur"
                blurDataURL={current.blurDataURL}
                sizes="(min-width: 1024px) 64rem, 100vw"
                className="h-auto max-h-[80vh] w-auto rounded-2xl object-contain shadow-lift"
              />
              <figcaption className="mt-4 max-w-2xl text-center text-sm text-cream-100/80">
                {current.alt}
                <span className="ml-2 text-cream-100/50">
                  {(active ?? 0) + 1} / {galleryImages.length}
                </span>
              </figcaption>
            </motion.figure>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
