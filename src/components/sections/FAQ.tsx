'use client'

import { motion } from 'framer-motion'
import { Plus } from 'lucide-react'
import { useState } from 'react'
import Reveal from '@/components/ui/Reveal'
import { faq } from '@/lib/site'

const EASE = [0.22, 1, 0.36, 1] as const

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section
      id="faq"
      className="section-padding scroll-mt-20 bg-white"
      aria-label="Česta pitanja"
    >
      <div className="container-custom">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-4">
            <p className="eyebrow text-leaf-700">
              <span className="eyebrow-dot" aria-hidden="true" />
              Česta pitanja
            </p>
            <h2 className="mt-5 text-balance font-display text-4xl font-semibold text-ink sm:text-5xl">
              Imate <span className="text-gradient-leaf">pitanje?</span>
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-ink/70">
              Sakupili smo odgovore na ono što nas najčešće pitate. Za sve
              ostalo — telefon, mejl ili lično, kako vam je zgodnije.
            </p>
          </Reveal>

          <div className="lg:col-span-8">
            <div className="divide-y divide-ink/10 border-y border-ink/10">
              {faq.map((item, index) => {
                const isOpen = openIndex === index
                return (
                  <div key={item.question}>
                    <button
                      type="button"
                      id={`faq-pitanje-${index}`}
                      onClick={() => setOpenIndex(isOpen ? null : index)}
                      aria-expanded={isOpen}
                      aria-controls={`faq-odgovor-${index}`}
                      className="flex w-full items-center justify-between gap-6 py-6 text-left"
                    >
                      <span className="font-display text-lg font-semibold text-ink sm:text-xl">
                        {item.question}
                      </span>
                      <motion.span
                        aria-hidden="true"
                        animate={{ rotate: isOpen ? 45 : 0 }}
                        transition={{ duration: 0.3, ease: EASE }}
                        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition-colors ${
                          isOpen
                            ? 'border-leaf-600 bg-leaf-600 text-cream-50'
                            : 'border-ink/15 text-ink/60'
                        }`}
                      >
                        <Plus className="h-4 w-4" />
                      </motion.span>
                    </button>
                    {/* Odgovor ostaje u DOM-u i kad je zatvoren — sadržaj
                        stranice se poklapa sa FAQPage JSON-LD šemom */}
                    <motion.div
                      id={`faq-odgovor-${index}`}
                      role="region"
                      aria-labelledby={`faq-pitanje-${index}`}
                      initial={false}
                      animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
                      transition={{ duration: 0.4, ease: EASE }}
                      className="overflow-hidden"
                      aria-hidden={!isOpen}
                    >
                      <p className="max-w-2xl pb-7 leading-relaxed text-ink/70">
                        {item.answer}
                      </p>
                    </motion.div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
