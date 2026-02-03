'use client'

import { motion } from 'framer-motion'
import { Leaf, Coffee, Heart, Sparkles, Apple, Droplet } from 'lucide-react'

const categories = [
  {
    icon: Leaf,
    title: 'Organski Proizvodi',
    description: 'Sertifikovani organski proizvodi bez pesticida i GMO',
    items: ['Organske žitarice', 'Organske paste', 'Ekološko brašno'],
    color: 'from-green-400 to-emerald-600'
  },
  {
    icon: Heart,
    title: 'Suplementi i Vitamini',
    description: 'Visokokvalitetni dodaci ishrani za podršku zdravlju',
    items: ['Multivitamini', 'Omega-3', 'Probiotici'],
    color: 'from-red-400 to-pink-600'
  },
  {
    icon: Coffee,
    title: 'Čajevi i Napici',
    description: 'Prirodni čajevi i zdravi napici za svaki trenutak',
    items: ['Zeleni čaj', 'Biljna čajevi', 'Smoothie mixevi'],
    color: 'from-amber-400 to-orange-600'
  },
  {
    icon: Apple,
    title: 'Zdrave Grickalice',
    description: 'Ukusne i nutritivne grickalice bez štetnih dodataka',
    items: ['Semenke i orašasti plodovi', 'Protein barovi', 'Voćne pločice'],
    color: 'from-rose-400 to-red-600'
  },
  {
    icon: Sparkles,
    title: 'Superfoods',
    description: 'Namirnice bogate nutrientima za maksimalnu vitalnost',
    items: ['Chia semenke', 'Spirulina', 'Goji bobice'],
    color: 'from-purple-400 to-indigo-600'
  },
  {
    icon: Droplet,
    title: 'Kozmetika i Nega',
    description: 'Prirodna kozmetika i proizvodi za negu tela',
    items: ['Prirodna kozmetika', 'Etarska ulja', 'Proizvodi za negu kože'],
    color: 'from-blue-400 to-cyan-600'
  }
]

export default function Products() {
  return (
    <section id="proizvodi" className="section-padding bg-gradient-to-b from-gray-50 to-white">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-2 bg-primary-50 rounded-full mb-6">
            <span className="text-sm font-semibold text-primary-600">PROIZVODI</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-display font-bold text-gray-900 mb-6">
            Širok izbor {' '}
            <span className="text-primary-600">kvalitetnih proizvoda</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Od organskih namirnica do suplementa - pronađite sve što vam je potrebno 
            za zdraviji način života
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category, index) => {
            const Icon = category.icon
            return (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="card group cursor-pointer"
              >
                <div className="p-8">
                  {/* Icon with gradient */}
                  <div className={`w-16 h-16 bg-gradient-to-br ${category.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">
                    {category.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-600 mb-4">
                    {category.description}
                  </p>

                  {/* Items List */}
                  <ul className="space-y-2">
                    {category.items.map((item) => (
                      <li key={item} className="flex items-center text-sm text-gray-700">
                        <div className="w-1.5 h-1.5 bg-primary-500 rounded-full mr-3" />
                        {item}
                      </li>
                    ))}
                  </ul>

                  {/* Hover Effect Border */}
                  <div className={`absolute inset-0 border-2 border-transparent group-hover:border-primary-300 rounded-xl transition-colors pointer-events-none`} />
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <p className="text-lg text-gray-600 mb-6">
            Imate pitanja o proizvodima? Naš tim je tu da vam pomogne!
          </p>
          <a href="#kontakt" className="btn-primary">
            Kontaktirajte nas
          </a>
        </motion.div>
      </div>
    </section>
  )
}
