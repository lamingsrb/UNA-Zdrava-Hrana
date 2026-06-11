'use client'

import { Clock, Mail, MapPin, Phone } from 'lucide-react'
import Reveal from '@/components/ui/Reveal'
import { site } from '@/lib/site'

interface InfoCard {
  icon: typeof MapPin
  title: string
  lines: string[]
  phones?: { display: string; e164: string }[]
  email?: string
}

const infoCards: InfoCard[] = [
  {
    icon: MapPin,
    title: 'Adresa',
    lines: [
      `${site.address.street} (${site.address.landmark})`,
      `${site.address.city}, ${site.address.countryName}`,
    ],
  },
  {
    icon: Clock,
    title: 'Radno vreme',
    lines: [
      `${site.hours.weekdays.label}: ${site.hours.weekdays.opens} – ${site.hours.weekdays.closes}`,
      `${site.hours.sunday.label}: ${site.hours.sunday.opens} – ${site.hours.sunday.closes}`,
    ],
  },
  {
    icon: Phone,
    title: 'Telefon',
    lines: [],
    phones: [site.phones.landline],
  },
  {
    icon: Mail,
    title: 'Mejl',
    lines: [],
    email: site.email,
  },
]

export default function Location() {
  return (
    <section
      id="lokacija"
      className="section-padding relative scroll-mt-20 overflow-hidden bg-gradient-to-b from-cream-100 via-leaf-50/70 to-cream-100"
      aria-label="Lokacija"
    >
      <div
        aria-hidden="true"
        className="glow-blob -right-32 top-32 h-[26rem] w-[26rem] bg-leaf-200/40"
      />
      <div className="container-custom relative z-10">
        <Reveal className="mb-16 max-w-3xl">
          <p className="eyebrow text-leaf-700">
            <span className="eyebrow-dot" aria-hidden="true" />
            Lokacija
          </p>
          <h2 className="mt-5 text-balance font-display text-4xl font-semibold text-ink sm:text-5xl lg:text-6xl">
            Kod mosta u Bresnici —{' '}
            <span className="text-gradient-leaf">svi znaju gde je to</span>
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-ink/70">
            U Ulici {site.address.street} u Kragujevcu. Most je orijentir koji
            se ne promašuje — a odmah uz njega smo mi.
          </p>
        </Reveal>

        <div className="grid gap-10 lg:grid-cols-2">
          <Reveal>
            <div className="relative h-full min-h-[420px] overflow-hidden rounded-[2rem] shadow-lift">
              <iframe
                src={site.maps.embedUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Mapa — UNA Zdrava Hrana, Kragujevac"
                className="absolute inset-0 h-full w-full"
              />
              <div className="absolute left-5 top-5 rounded-2xl bg-white/95 px-5 py-3.5 shadow-soft backdrop-blur-sm">
                <div className="flex items-center gap-2.5">
                  <span
                    className="h-2.5 w-2.5 animate-pulse-soft rounded-full bg-leaf-500 motion-reduce:animate-none"
                    aria-hidden="true"
                  />
                  <span className="font-sans text-sm font-bold text-ink">
                    {site.name}
                  </span>
                </div>
                <p className="mt-1 text-xs text-ink/60">{site.address.street}</p>
              </div>
            </div>
          </Reveal>

          <div className="flex flex-col gap-5">
            {infoCards.map((card, index) => {
              const Icon = card.icon
              return (
                <Reveal key={card.title} delay={index * 0.08}>
                  <div className="card-surface flex items-start gap-5 p-6">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-leaf-50 text-leaf-700">
                      <Icon className="h-6 w-6" aria-hidden="true" />
                    </div>
                    <div>
                      <h3 className="font-sans text-base font-bold text-ink">
                        {card.title}
                      </h3>
                      {card.lines.map((line) => (
                        <p key={line} className="mt-1 text-sm leading-relaxed text-ink/65">
                          {line}
                        </p>
                      ))}
                      {card.phones?.map((phone) => (
                        <p key={phone.e164} className="mt-1">
                          <a
                            href={`tel:${phone.e164}`}
                            className="text-sm font-semibold text-leaf-700 hover:underline"
                          >
                            {phone.display}
                          </a>
                        </p>
                      ))}
                      {card.email && (
                        <p className="mt-1">
                          <a
                            href={`mailto:${card.email}`}
                            className="text-sm font-semibold text-leaf-700 hover:underline"
                          >
                            {card.email}
                          </a>
                        </p>
                      )}
                    </div>
                  </div>
                </Reveal>
              )
            })}

            <Reveal delay={0.35}>
              <a
                href={site.maps.directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary w-full"
              >
                <MapPin className="h-4 w-4" aria-hidden="true" />
                Prikaži put na mapi
              </a>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
