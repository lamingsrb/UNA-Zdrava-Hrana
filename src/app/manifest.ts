import type { MetadataRoute } from 'next'
import { site } from '@/lib/site'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: site.name,
    short_name: site.shortName,
    description: site.description,
    start_url: '/',
    display: 'standalone',
    background_color: '#FBF8F1',
    theme_color: '#061A10',
    icons: [
      {
        src: '/una-logo-192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/una-logo-512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  }
}
