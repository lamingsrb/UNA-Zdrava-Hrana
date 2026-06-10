'use client'

import { motion } from 'framer-motion'
import { HeartHandshake, Leaf, MessageCircle, ShieldCheck } from 'lucide-react'
import Image from 'next/image'
import Reveal from '@/components/ui/Reveal'
import { site } from '@/lib/site'

const features = [
  {
    icon: ShieldCheck,
    title: 'Provereni proizvodi',
    description:
      'Sarađujemo sa pouzdanim dobavljačima i držimo samo ono čemu i sami verujemo.',
  },
  {
    icon: MessageCircle,
    title: 'Savet koji vredi',
    description:
      'Petnaest godina iskustva znači da za svako pitanje imamo odgovor — ili ćemo ga zajedno pronaći.',
  },
  {
    icon: HeartHandshake,
    title: 'Komšijska atmosfera',
    description:
      'Kod nas niste broj na računu. Znamo vas po imenu i znamo šta volite.',
  },
  {
    icon: Leaf,
    title: 'Ponuda koja živi',
    description:
      'Asortiman stalno osvežavamo i pratimo novosti u svetu zdrave ishrane.',
  },
]

export default function About() {
  return (
    <section
      id="o-nama"
      className="section-padding scroll-mt-20 bg-white"
      aria-label="O nama"
    >
      <div className="container-custom">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <Reveal>
            <div className="relative">
              <div className="relative overflow-hidden rounded-[2rem] shadow-lift">
                <Image
                  src="/images/store/store-front.jpg"
                  alt="Prodavnica UNA Zdrava Hrana kod mosta u Bresnici, Kragujevac"
                  width={487}
                  height={1080}
                  className="aspect-[4/3] w-full object-cover"
                  sizes="(min-width: 1024px) 50vw, 100vw"
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-t from-forest-950/35 via-transparent to-transparent"
                />
              </div>

              <motion.div
                className="absolute -bottom-7 -right-3 rounded-3xl bg-forest-900 px-7 py-5 text-cream-50 shadow-lift sm:-right-7"
                initial={{ opacity: 0, scale: 0.85 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              >
                <p className="font-display text-4xl font-semibold text-honey-300">
                  {site.yearsInBusiness}+
                </p>
                <p className="text-xs font-bold uppercase tracking-widest2 text-cream-100/70">
                  godina s vama
                </p>
              </motion.div>

              <div
                aria-hidden="true"
                className="absolute -left-10 -top-10 -z-10 h-48 w-48 rounded-full bg-honey-200/50 blur-3xl"
              />
            </div>
          </Reveal>

          <div>
            <Reveal>
              <p className="eyebrow text-leaf-700">
                <span className="eyebrow-dot" aria-hidden="true" />
                O nama
              </p>
              <h2 className="mt-5 text-balance font-display text-4xl font-semibold text-ink sm:text-5xl">
                Više od prodavnice —{' '}
                <span className="text-gradient-leaf">komšijska adresa za zdravlje</span>
              </h2>
            </Reveal>

            <Reveal delay={0.12}>
              <p className="mt-7 text-lg leading-relaxed text-ink/70">
                UNA je prodavnica zdrave hrane u Kragujevcu koja već više od{' '}
                {site.yearsInBusiness} godina pomaže komšijama da jedu bolje i
                žive zdravije. Nalazimo se na dobro poznatoj lokaciji{' '}
                <strong className="font-bold text-leaf-700">
                  {site.address.landmarkInline}
                </strong>
                , gde nas možete posetiti svakog dana osim nedelje.
              </p>
              <p className="mt-4 text-lg leading-relaxed text-ink/70">
                Naša misija je jednostavna: da vam najkvalitetniji organski
                proizvodi, suplementi i superhrana budu nadohvat ruke — uz
                iskren savet i osmeh koji se pamti.
              </p>
            </Reveal>

            <div className="mt-10 grid gap-7 sm:grid-cols-2">
              {features.map((feature, index) => {
                const Icon = feature.icon
                return (
                  <Reveal key={feature.title} delay={0.15 + index * 0.08}>
                    <div className="flex gap-4">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-leaf-50 text-leaf-700">
                        <Icon className="h-6 w-6" aria-hidden="true" />
                      </div>
                      <div>
                        <h3 className="font-sans text-base font-bold text-ink">
                          {feature.title}
                        </h3>
                        <p className="mt-1.5 text-sm leading-relaxed text-ink/65">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  </Reveal>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
