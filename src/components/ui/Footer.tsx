import { Leaf, MapPin, Phone, Mail, Facebook, Instagram } from 'lucide-react'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container-custom">
        {/* Main Footer Content */}
        <div className="py-16 grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* About */}
          <div>
            <div className="flex items-center gap-2 mb-6">
              <div className="bg-gradient-health p-2 rounded-lg">
                <Leaf className="w-6 h-6 text-white" />
              </div>
              <div>
                <span className="text-xl font-display font-bold text-white">UNA</span>
                <p className="text-xs text-gray-400">Zdrava Hrana</p>
              </div>
            </div>
            <p className="text-gray-400 leading-relaxed">
              Vaš partner za zdravlje već 15 godina. Najkvalitetniji proizvodi 
              za zdrav način života na jednom mestu.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-bold mb-6">Brzi Linkovi</h3>
            <ul className="space-y-3">
              <li>
                <a href="#pocetna" className="hover:text-primary-400 transition-colors">
                  Početna
                </a>
              </li>
              <li>
                <a href="#o-nama" className="hover:text-primary-400 transition-colors">
                  O Nama
                </a>
              </li>
              <li>
                <a href="#proizvodi" className="hover:text-primary-400 transition-colors">
                  Proizvodi
                </a>
              </li>
              <li>
                <a href="#lokacija" className="hover:text-primary-400 transition-colors">
                  Lokacija
                </a>
              </li>
              <li>
                <a href="#kontakt" className="hover:text-primary-400 transition-colors">
                  Kontakt
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white font-bold mb-6">Kontakt</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary-400 flex-shrink-0 mt-0.5" />
                <span className="text-sm">
                  Kod Mosta u Bresnici<br />
                  Kragujevac, Srbija
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-primary-400" />
                <a href="tel:+38134123456" className="text-sm hover:text-primary-400 transition-colors">
                  +381 34 123 456
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-primary-400" />
                <a href="mailto:info@unazdravahrana.rs" className="text-sm hover:text-primary-400 transition-colors">
                  info@unazdravahrana.rs
                </a>
              </li>
            </ul>
          </div>

          {/* Working Hours & Social */}
          <div>
            <h3 className="text-white font-bold mb-6">Radno Vreme</h3>
            <div className="text-sm space-y-2 mb-6">
              <p>Ponedeljak - Petak</p>
              <p className="text-primary-400 font-semibold">08:00 - 20:00</p>
              <p className="mt-3">Subota</p>
              <p className="text-primary-400 font-semibold">08:00 - 16:00</p>
              <p className="mt-3">Nedelja</p>
              <p className="text-gray-500">Zatvoreno</p>
            </div>

            {/* Social Media */}
            <div>
              <h4 className="text-white font-semibold mb-3">Pratite nas</h4>
              <div className="flex gap-3">
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-gray-800 hover:bg-primary-500 rounded-lg flex items-center justify-center transition-colors"
                >
                  <Facebook className="w-5 h-5" />
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-gray-800 hover:bg-primary-500 rounded-lg flex items-center justify-center transition-colors"
                >
                  <Instagram className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-400">
              © {currentYear} UNA Zdrava Hrana. Sva prava zadržana.
            </p>
            <div className="flex gap-6 text-sm">
              <a href="#" className="hover:text-primary-400 transition-colors">
                Politika privatnosti
              </a>
              <a href="#" className="hover:text-primary-400 transition-colors">
                Uslovi korišćenja
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
