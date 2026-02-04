'use client'

import { motion } from 'framer-motion'
import { Camera } from 'lucide-react'
import { useState } from 'react'

const galleryImages = [
  {
    src: '/images/gallery/store-1.jpg',
    alt: 'UNA Zdrava Hrana - Prodavnica',
    category: 'Prodavnica'
  },
  {
    src: '/images/gallery/store-2.jpg',
    alt: 'UNA Zdrava Hrana - Enterijer',
    category: 'Enterijer'
  }
]

export default function Gallery() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null)

  return (
    <section id="galerija" className="section-padding bg-gradient-to-b from-white to-gray-50">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-2 bg-primary-50 rounded-full mb-6">
            <span className="text-sm font-semibold text-primary-600">GALERIJA</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-display font-bold text-gray-900 mb-6">
            Pogledajte našu{' '}
            <span className="text-primary-600">prodavnicu</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Moderna i dobro opremljena prodavnica u srcu Kragujevca
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryImages.map((image, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative aspect-[4/3] rounded-2xl overflow-hidden shadow-lg cursor-pointer"
              onClick={() => setSelectedImage(index)}
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="flex items-center gap-2 text-white">
                    <Camera className="w-5 h-5" />
                    <span className="text-sm font-semibold">{image.category}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Lightbox Modal */}
        {selectedImage !== null && (
          <div
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="relative max-w-5xl max-h-[90vh]"
            >
              <img
                src={galleryImages[selectedImage].src}
                alt={galleryImages[selectedImage].alt}
                className="w-full h-full object-contain rounded-lg"
              />
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 w-10 h-10 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors"
              >
                ✕
              </button>
            </motion.div>
          </div>
        )}
      </div>
    </section>
  )
}
