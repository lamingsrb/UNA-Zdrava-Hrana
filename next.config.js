/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  // Kanonski domen je unazdravahrana.com — stari .vercel.app i www
  // se trajno preusmeravaju (SEO: bez dupliranog sadržaja)
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'una-zdrava-hrana.vercel.app' }],
        destination: 'https://unazdravahrana.com/:path*',
        permanent: true,
      },
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'www.unazdravahrana.com' }],
        destination: 'https://unazdravahrana.com/:path*',
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig
