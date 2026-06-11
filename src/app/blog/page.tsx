import type { Metadata } from 'next'
import Link from 'next/link'
import Header from '@/components/ui/Header'
import Footer from '@/components/ui/Footer'
import { formatDateSr, listPosts } from '@/lib/blog'
import { SITE_URL } from '@/lib/site'

export const metadata: Metadata = {
  // absolute — zaobilazi layout template (inače bi naslov prešao 60 karaktera)
  title: { absolute: 'Blog — saveti o zdravoj ishrani | UNA' },
  description:
    'Saveti o zdravoj ishrani iz prodavnice UNA u Kragujevcu: vodiči o namirnicama, ' +
    'superhrana, sezonski saveti i recepti — novi tekstovi svakog dana.',
  alternates: { canonical: `${SITE_URL}/blog` },
  openGraph: {
    type: 'website',
    locale: 'sr_RS',
    url: `${SITE_URL}/blog`,
    siteName: 'UNA Zdrava Hrana',
    title: 'Blog — saveti o zdravoj ishrani | UNA',
    description:
      'Vodiči o namirnicama, superhrana i sezonski saveti — iz prodavnice ' +
      'zdrave hrane UNA u Kragujevcu.',
  },
}

export default function BlogIndexPage() {
  const posts = listPosts()

  return (
    <>
      <a
        href="#sadrzaj"
        className="sr-only z-[100] rounded-xl bg-leaf-700 px-5 py-3 font-sans text-sm font-bold text-cream-50 focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        Preskoči na sadržaj
      </a>
      <Header solid />
      <main id="sadrzaj" className="min-h-screen">
        {/* Hero traka — svetla, u UNA tonu */}
        <section className="relative overflow-hidden bg-gradient-to-b from-cream-50 to-cream-100 pb-16 pt-32 sm:pb-20 sm:pt-40">
          <div
            aria-hidden="true"
            className="glow-blob -right-32 -top-24 h-96 w-96 bg-honey-200/40"
          />
          <div
            aria-hidden="true"
            className="glow-blob -left-40 bottom-0 h-80 w-80 bg-leaf-100/60"
          />
          <div className="container-custom relative z-10">
            <p className="eyebrow text-leaf-700">
              <span className="eyebrow-dot" aria-hidden="true" />
              UNA blog
            </p>
            <h1 className="mt-5 max-w-3xl text-balance font-display text-4xl font-semibold text-forest-900 sm:text-5xl lg:text-6xl">
              Saveti o <span className="text-gradient-leaf">zdravoj ishrani</span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink/70">
              Vodiči o namirnicama, superhrana, sezonski saveti i ideje iz naše
              prodavnice u Kragujevcu — pisano jednostavno, bez nauke radi
              nauke. Sve što pročitate možete i da probate: čeka vas na polici,
              kod mosta u Bresnici.
            </p>
          </div>
        </section>

        {/* Grid kartica */}
        <section className="section-padding bg-cream-100">
          <div className="container-custom">
            {posts.length === 0 ? (
              <p className="text-lg text-ink/60">
                Prvi tekstovi su u pripremi — svratite uskoro.
              </p>
            ) : (
              <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {posts.map((post) => (
                  <article key={post.slug} className="card-surface group flex flex-col">
                    <Link
                      href={`/blog/${post.slug}`}
                      className="flex h-full flex-col"
                    >
                      {post.hero ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={post.hero}
                          alt={post.heroAlt}
                          width={post.heroWidth || 1600}
                          height={post.heroHeight || 1066}
                          loading="lazy"
                          decoding="async"
                          className="aspect-[3/2] w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                        />
                      ) : (
                        <div
                          aria-hidden="true"
                          className="flex aspect-[3/2] w-full items-center justify-center bg-gradient-to-br from-leaf-50 via-cream-50 to-honey-50"
                        >
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src="/una-logo.svg"
                            alt=""
                            width={88}
                            height={88}
                            loading="lazy"
                            className="h-20 w-20 opacity-80"
                          />
                        </div>
                      )}
                      <div className="flex flex-1 flex-col p-6 sm:p-7">
                        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs font-bold">
                          <span className="rounded-full bg-leaf-50 px-3 py-1 uppercase tracking-widest2 text-leaf-700">
                            {post.category}
                          </span>
                          <time
                            dateTime={post.date}
                            className="font-sans text-ink/55"
                          >
                            {formatDateSr(post.date)}
                          </time>
                        </div>
                        <h2 className="mt-4 text-balance font-display text-xl font-semibold text-forest-800 transition-colors group-hover:text-leaf-700 sm:text-2xl">
                          {post.title}
                        </h2>
                        <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-ink/65">
                          {post.description}
                        </p>
                        <span className="mt-auto inline-flex items-center gap-1.5 pt-5 text-sm font-bold text-honey-600 transition-colors group-hover:text-honey-500">
                          Pročitajte tekst
                          <span aria-hidden="true">→</span>
                        </span>
                      </div>
                    </Link>
                  </article>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
