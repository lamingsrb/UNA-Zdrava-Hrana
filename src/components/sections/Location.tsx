'use client'

import { motion } from 'framer-motion'
import { MapPin, Clock, Phone, Mail } from 'lucide-react'

const info = [
  {
    icon: MapPin,
    title: 'Adresa',
    details: ['Slobodana Penezića Krcuna', 'Kragujevac, Srbija']
  },
  {
    icon: Clock,
    title: 'Radno vreme',
    details: ['Ponedeljak - Petak: 08:00 - 20:00', 'Subota: 08:00 - 16:00', 'Nedelja: Zatvoreno']
  },
  {
    icon: Phone,
    title: 'Telefon',
    details: ['034 387257', '+381 64 121 32 92']
  },
  {
    icon: Mail,
    title: 'Email',
    details: ['info@unazdr avahrana.rs', 'prodaja@unazdravahrana.rs']
  }
]

export default function Location() {
  return (
    <section id="lokacija" className="section-padding bg-white">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-2 bg-primary-50 rounded-full mb-6">
            <span className="text-sm font-semibold text-primary-600">LOKACIJA</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-display font-bold text-gray-900 mb-6">
            Posetite nas u{' '}
            <span className="text-primary-600">Kragujevcu</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Dobro poznata lokacija kod Mosta u Bresnici. Lako nas pronađite!
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left: Map */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="relative h-full min-h-[400px] rounded-2xl overflow-hidden shadow-xl">
              {/* Google Maps Iframe */}
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2831.4!2d20.9379514!3d43.9970506!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x475721e27f812157%3A0x6b96b2b26ee95793!2sHrani%20se%20zdravo!5e0!3m2!1sen!2s!4v1234567890"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0"
              />
              {/* Overlay for better visual */}
              <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-4 py-3 rounded-lg shadow-md">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-primary-500 rounded-full animate-pulse" />
                  <span className="font-semibold text-gray-900">UNA Zdrava Hrana</span>
                </div>
                <p className="text-sm text-gray-600 mt-1">Slobodana Penezića Krcuna</p>
              </div>
            </div>
          </motion.div>

          {/* Right: Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            {info.map((item, index) => {
              const Icon = item.icon
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-gray-50 rounded-xl p-6 hover:bg-primary-50 transition-colors"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                        <Icon className="w-6 h-6 text-primary-600" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-gray-900 mb-2">{item.title}</h3>
                      {item.title === 'Adresa' ? (
                        <>
                          <p className="text-gray-600 leading-relaxed">
                            Slobodana Penezića Krcuna <strong className="font-bold">(Kod Mosta u Bresnici)</strong>
                          </p>
                          <p className="text-gray-600 leading-relaxed">Kragujevac, Srbija</p>
                        </>
                      ) : (
                        item.details.map((detail) => (
                          <p key={detail} className="text-gray-600 leading-relaxed">
                            {detail}
                          </p>
                        ))
                      )}
                    </div>
                  </div>
                </motion.div>
              )
            })}

            {/* Direction Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="pt-4"
            >
              <a
                href="https://maps.google.com/?q=Kragujevac+Most+Bresnica"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary w-full text-center inline-block"
              >
                Prikaži putanju na mapi
              </a>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
