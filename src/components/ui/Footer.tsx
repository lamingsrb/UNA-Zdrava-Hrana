import { Clock, Mail, MapPin, Phone } from 'lucide-react'
import Image from 'next/image'
import { site } from '@/lib/site'

// "/#sekcija" umesto "#sekcija" — linkovi rade i sa /blog stranica
const quickLinks = [
  { name: 'Naša priča', href: '/#prica' },
  { name: 'Proizvodi', href: '/#proizvodi' },
  { name: 'O nama', href: '/#o-nama' },
  { name: 'Blog', href: '/blog' },
  { name: 'Recepti', href: '/recepti' },
  { name: 'Lokacija', href: '/#lokacija' },
  { name: 'Kontakt', href: '/#kontakt' },
]

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="grain border-t border-cream-50/10 bg-forest-950 text-cream-100/70">
      <div className="container-custom relative z-10">
        <div className="grid gap-12 py-16 sm:py-20 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="flex items-center gap-3">
              <Image
                src="/una-logo.svg"
                alt=""
                width={48}
                height={48}
                className="h-12 w-12"
              />
              <div className="flex flex-col leading-none">
                <span className="font-display text-2xl font-bold text-cream-50">
                  UNA
                </span>
                <span className="text-[10px] font-bold uppercase tracking-widest2 text-honey-300">
                  Zdrava hrana
                </span>
              </div>
            </div>
            <p className="mt-6 text-sm leading-relaxed">
              Prodavnica zdrave hrane u Kragujevcu — više od{' '}
              {site.yearsInBusiness} godina poverenja, na istoj adresi kod
              Mosta u Bresnici.
            </p>
          </div>

          <nav aria-label="Linkovi u podnožju">
            <h3 className="font-sans text-sm font-bold uppercase tracking-widest2 text-cream-50">
              Brzi linkovi
            </h3>
            <ul className="mt-6 space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-sm transition-colors hover:text-honey-300"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h3 className="font-sans text-sm font-bold uppercase tracking-widest2 text-cream-50">
              Kontakt
            </h3>
            <ul className="mt-6 space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <MapPin
                  className="mt-0.5 h-4 w-4 shrink-0 text-honey-300"
                  aria-hidden="true"
                />
                <span>
                  {site.address.street}{' '}
                  <strong className="font-bold text-cream-100">
                    ({site.address.landmark})
                  </strong>
                  <br />
                  {site.address.city}, {site.address.countryName}
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-4 w-4 shrink-0 text-honey-300" aria-hidden="true" />
                <a
                  href={`tel:${site.phones.landline.e164}`}
                  className="transition-colors hover:text-honey-300"
                >
                  {site.phones.landline.display}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-4 w-4 shrink-0 text-honey-300" aria-hidden="true" />
                <a
                  href={`mailto:${site.email}`}
                  className="break-all transition-colors hover:text-honey-300"
                >
                  {site.email}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-sans text-sm font-bold uppercase tracking-widest2 text-cream-50">
              Radno vreme
            </h3>
            <ul className="mt-6 space-y-3 text-sm">
              <li className="flex items-center gap-3">
                <Clock className="h-4 w-4 shrink-0 text-honey-300" aria-hidden="true" />
                <span>
                  {site.hours.weekdays.label}
                  <br />
                  <strong className="font-bold text-cream-100">
                    {site.hours.weekdays.opens} – {site.hours.weekdays.closes}
                  </strong>
                </span>
              </li>
              <li className="pl-7">
                {site.hours.sunday.label}
                <br />
                <strong className="font-bold text-cream-100">
                  {site.hours.sunday.opens} – {site.hours.sunday.closes}
                </strong>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-cream-50/10 py-8">
          <p className="text-center text-xs text-cream-100/60">
            © {currentYear} {site.name}, {site.address.city}. Sva prava
            zadržana.
          </p>
        </div>
      </div>
    </footer>
  )
}
