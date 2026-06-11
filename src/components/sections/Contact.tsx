'use client'

import { Mail, Phone, Send } from 'lucide-react'
import { useState } from 'react'
import Reveal from '@/components/ui/Reveal'
import { site } from '@/lib/site'

const inputClasses =
  'w-full rounded-2xl border border-cream-50/15 bg-forest-900/70 px-5 py-3.5 text-cream-50 placeholder:text-cream-100/40 transition-all focus:border-honey-400 focus:ring-2 focus:ring-honey-400/30 outline-none'

export default function Contact() {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [message, setMessage] = useState('')

  // Bez backend-a: sastavljamo mailto poruku i otvaramo korisnikov
  // program za mejl sa već popunjenim sadržajem.
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const subject = `Poruka sa sajta — ${name}`
    const body = `${message}\n\n— ${name}${phone ? `\nTelefon: ${phone}` : ''}`
    window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`
  }

  return (
    <section
      id="kontakt"
      className="grain section-padding relative scroll-mt-20 overflow-hidden bg-forest-950 text-cream-50"
      aria-label="Kontakt"
    >
      {/* dekorativni odsjaji */}
      <div
        aria-hidden="true"
        className="absolute -left-32 top-10 h-96 w-96 rounded-full bg-leaf-600/15 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="absolute -right-24 bottom-0 h-80 w-80 rounded-full bg-honey-500/10 blur-3xl"
      />

      <div className="container-custom relative z-10">
        <div className="grid gap-14 lg:grid-cols-2 lg:gap-20">
          <div>
            <Reveal>
              <p className="eyebrow text-honey-300">
                <span className="eyebrow-dot" aria-hidden="true" />
                Kontakt
              </p>
              <h2 className="mt-5 text-balance font-display text-4xl font-semibold text-cream-50 sm:text-5xl">
                Javite nam se —{' '}
                <em className="text-gradient-honey font-medium italic">
                  odgovaramo rado
                </em>
              </h2>
              <p className="mt-6 text-lg leading-relaxed text-cream-100/75">
                Imate pitanje o proizvodu, treba vam savet oko ishrane ili samo
                proveravate da li nešto držimo? Pozovite, pišite ili svratite.
              </p>
            </Reveal>

            <div className="mt-10 space-y-4">
              <Reveal delay={0.1}>
                <a
                  href={`tel:${site.phones.landline.e164}`}
                  className="group flex items-center gap-5 rounded-3xl border border-cream-50/10 bg-cream-50/5 p-6 backdrop-blur-sm transition-colors duration-300 hover:border-cream-50/25"
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-leaf-500/15 text-leaf-300 transition-transform duration-300 group-hover:scale-110">
                    <Phone className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest2 text-cream-100/60">
                      Pozovite nas
                    </p>
                    <p className="mt-1 font-sans text-lg font-bold text-cream-50">
                      {site.phones.landline.display}
                    </p>
                  </div>
                </a>
              </Reveal>

              <Reveal delay={0.18}>
                <a
                  href={`mailto:${site.email}`}
                  className="group flex items-center gap-5 rounded-3xl border border-cream-50/10 bg-cream-50/5 p-6 backdrop-blur-sm transition-colors duration-300 hover:border-cream-50/25"
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-honey-400/15 text-honey-300 transition-transform duration-300 group-hover:scale-110">
                    <Mail className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest2 text-cream-100/60">
                      Pišite nam
                    </p>
                    <p className="mt-1 break-all font-sans text-lg font-bold text-cream-50">
                      {site.email}
                    </p>
                  </div>
                </a>
              </Reveal>
            </div>
          </div>

          <Reveal delay={0.15}>
            <form
              onSubmit={handleSubmit}
              className="rounded-3xl border border-cream-50/10 bg-cream-50/5 p-8 backdrop-blur-sm sm:p-10"
              aria-label="Kontakt forma"
            >
              <div className="space-y-6">
                <div>
                  <label
                    htmlFor="name"
                    className="mb-2 block text-sm font-bold text-cream-100"
                  >
                    Ime i prezime *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className={inputClasses}
                    placeholder="Vaše ime i prezime"
                    autoComplete="name"
                  />
                </div>

                <div>
                  <label
                    htmlFor="phone"
                    className="mb-2 block text-sm font-bold text-cream-100"
                  >
                    Telefon
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className={inputClasses}
                    placeholder="+381 6x xxx xx xx"
                    autoComplete="tel"
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="mb-2 block text-sm font-bold text-cream-100"
                  >
                    Poruka *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={5}
                    className={`${inputClasses} resize-none`}
                    placeholder="Kako možemo da vam pomognemo?"
                  />
                </div>

                <button type="submit" className="btn-honey w-full">
                  <Send className="h-4 w-4" aria-hidden="true" />
                  Pošalji poruku
                </button>

                <p className="text-center text-xs leading-relaxed text-cream-100/60">
                  Klikom na dugme otvoriće se vaš program za mejl sa već
                  popunjenom porukom za {site.email}.
                </p>
              </div>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
