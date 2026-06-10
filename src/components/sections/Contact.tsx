'use client'

import { Mail, Phone, Send } from 'lucide-react'
import { useState } from 'react'
import Reveal from '@/components/ui/Reveal'
import { site } from '@/lib/site'

const inputClasses =
  'w-full rounded-2xl border border-ink/15 bg-white px-5 py-3.5 text-ink placeholder:text-ink/50 transition-all focus:border-leaf-500 focus:ring-2 focus:ring-leaf-200 outline-none'

export default function Contact() {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [message, setMessage] = useState('')

  // Bez backend-a: sastavljamo mailto poruku i otvaramo korisnikov
  // email program sa već popunjenim sadržajem.
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
      className="section-padding scroll-mt-20 bg-white"
      aria-label="Kontakt"
    >
      <div className="container-custom">
        <div className="grid gap-14 lg:grid-cols-2 lg:gap-20">
          <div>
            <Reveal>
              <p className="eyebrow text-leaf-700">
                <span className="eyebrow-dot" aria-hidden="true" />
                Kontakt
              </p>
              <h2 className="mt-5 text-balance font-display text-4xl font-semibold text-ink sm:text-5xl">
                Javite nam se —{' '}
                <span className="text-gradient-leaf">odgovaramo rado</span>
              </h2>
              <p className="mt-6 text-lg leading-relaxed text-ink/70">
                Imate pitanje o proizvodu, treba vam savet oko ishrane ili samo
                proveravate da li nešto držimo? Pozovite, pišite ili svratite.
              </p>
            </Reveal>

            <div className="mt-10 space-y-4">
              <Reveal delay={0.1}>
                <a
                  href={`tel:${site.phones.mobile.e164}`}
                  className="card-surface group flex items-center gap-5 p-6"
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-leaf-50 text-leaf-700 transition-transform duration-300 group-hover:scale-110">
                    <Phone className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest2 text-ink/60">
                      Pozovite nas
                    </p>
                    <p className="mt-1 font-sans text-lg font-bold text-ink">
                      {site.phones.mobile.display}
                    </p>
                    <p className="text-sm text-ink/70">
                      ili fiksni: {site.phones.landline.display}
                    </p>
                  </div>
                </a>
              </Reveal>

              <Reveal delay={0.18}>
                <a
                  href={`mailto:${site.email}`}
                  className="card-surface group flex items-center gap-5 p-6"
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-honey-50 text-honey-600 transition-transform duration-300 group-hover:scale-110">
                    <Mail className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest2 text-ink/60">
                      Pišite nam
                    </p>
                    <p className="mt-1 break-all font-sans text-lg font-bold text-ink">
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
              className="card-surface p-8 sm:p-10"
              aria-label="Kontakt forma"
            >
              <div className="space-y-6">
                <div>
                  <label
                    htmlFor="name"
                    className="mb-2 block text-sm font-bold text-ink"
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
                    className="mb-2 block text-sm font-bold text-ink"
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
                    className="mb-2 block text-sm font-bold text-ink"
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

                <button type="submit" className="btn-primary w-full">
                  <Send className="h-4 w-4" aria-hidden="true" />
                  Pošalji poruku
                </button>

                <p className="text-center text-xs leading-relaxed text-ink/60">
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
