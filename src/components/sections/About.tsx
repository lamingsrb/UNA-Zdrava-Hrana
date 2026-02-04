'use client'

import { motion } from 'framer-motion'
import { Heart, Award, Users, Sparkles } from 'lucide-react'

const features = [
  {
    icon: Heart,
    title: 'Ljubav prema zdravlju',
    description: 'Verujemo da je zdravlje najdragoceniji dar i trudimo se da vam pružimo najbolje proizvode.'
  },
  {
    icon: Award,
    title: 'Vrhunski kvalitet',
    description: 'Svi proizvodi su pažljivo odabrani i sertifikovani za maksimalnu bezbednost i efikasnost.'
  },
  {
    icon: Users,
    title: 'Porodična atmosfera',
    description: '15 godina gradimo poverenje sa našom zajednicom zdravo orijentisanih ljudi.'
  },
  {
    icon: Sparkles,
    title: 'Strast prema inovacijama',
    description: 'Stalno pratimo najnovije trendove i naučna dostignuća u oblasti zdrave ishrane.'
  }
]

export default function About() {
  return (
    <section id="o-nama" className="section-padding bg-white">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <div className="aspect-[4/3] relative">
                <img 
                  src="/images/store/store-front.jpg" 
                  alt="UNA Zdrava Hrana - Prodavnica" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            {/* Decorative element */}
            <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-accent-200 rounded-full filter blur-3xl opacity-30 -z-10" />
          </motion.div>

          {/* Right: Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-block px-4 py-2 bg-primary-50 rounded-full mb-6">
              <span className="text-sm font-semibold text-primary-600">O NAMA</span>
            </div>

            <h2 className="text-4xl sm:text-5xl font-display font-bold text-gray-900 mb-6">
              Više od 15 godina {' '}
              <span className="text-primary-600">vaš partner</span> za zdravlje
            </h2>

            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              UNA je prodavnica zdrave hrane koja već 15 godina pruža najkvalitetnije proizvode 
              za zdrav način života u Kragujevcu. Nalazimo se na dobro poznatoj lokaciji 
              <strong className="text-primary-600"> kod Mosta u Bresnici</strong>, gde nas možete posetiti 
              svakog dana.
            </p>

            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              Naša misija je da vam omogućimo pristup najkvalitetnijim organskim proizvodima, 
              suplementima i svemu što vam je potrebno za održavanje optimalnog zdravlja i vitalnosti.
            </p>

            {/* Features Grid */}
            <div className="grid sm:grid-cols-2 gap-6">
              {features.map((feature, index) => {
                const Icon = feature.icon
                return (
                  <motion.div
                    key={feature.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="flex gap-4"
                  >
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                        <Icon className="w-6 h-6 text-primary-600" />
                      </div>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">{feature.title}</h3>
                      <p className="text-sm text-gray-600">{feature.description}</p>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
