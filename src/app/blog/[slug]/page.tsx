import type { Metadata } from 'next'
import type { ImgHTMLAttributes } from 'react'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Clock, MapPin, Phone } from 'lucide-react'
import Header from '@/components/ui/Header'
import Footer from '@/components/ui/Footer'
import {
  formatDateSr,
  getPost,
  listPosts,
  listSlugs,
  type BlogPost,
} from '@/lib/blog'
import { SITE_URL, site } from '@/lib/site'

interface PageProps {
  params: { slug: string }
}

// Svi postovi se statički generišu iz content/blog — nepoznat slug je 404.
export const dynamicParams = false

export function generateStaticParams(): Array<{ slug: string }> {
  return listSlugs().map((slug) => ({ slug }))
}

/** SEO title ≤ 60 karaktera — duži naslovi se skraćuju sa elipsom. */
function metaTitle(title: string): string {
  return title.length <= 60 ? title : `${title.slice(0, 57).trimEnd()}…`
}

/** Apsolutni URL hero slike (frontmatter čuva relativnu putanju). */
function absoluteHeroUrl(hero: string): string {
  return hero.startsWith('http') ? hero : `${SITE_URL}${hero}`
}

export function generateMetadata({ params }: PageProps): Metadata {
  const post = listPosts().find((p) => p.slug === params.slug)
  if (!post) return {}

  const url = `${SITE_URL}/blog/${post.slug}`

  return {
    // absolute — layout template bi prešao limit od 60 karaktera
    title: { absolute: metaTitle(post.title) },
    description: post.description,
    keywords: post.seoKeywords,
    alternates: { canonical: url },
    openGraph: {
      type: 'article',
      locale: 'sr_RS',
      url,
      siteName: site.name,
      title: metaTitle(post.title),
      description: post.description,
      publishedTime: post.date,
      authors: [post.author],
      ...(post.hero
        ? {
            images: [
              {
                url: absoluteHeroUrl(post.hero),
                width: post.heroWidth || undefined,
                height: post.heroHeight || undefined,
                alt: post.heroAlt || post.title,
              },
            ],
          }
        : {}),
    },
    twitter: {
      card: post.hero ? 'summary_large_image' : 'summary',
      title: metaTitle(post.title),
      description: post.description,
    },
  }
}

function buildBlogPostingJsonLd(post: BlogPost) {
  const url = `${SITE_URL}/blog/${post.slug}`
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    '@id': `${url}#article`,
    headline: post.title,
    description: post.description,
    ...(post.llmSummary ? { abstract: post.llmSummary } : {}),
    ...(post.hero ? { image: [absoluteHeroUrl(post.hero)] } : {}),
    url,
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    datePublished: post.date,
    dateModified: post.date,
    inLanguage: 'sr-Latn-RS',
    author: { '@type': 'Organization', name: site.name, url: SITE_URL },
    // referenca na postojeći GroceryStore čvor sa početne strane
    publisher: { '@id': `${SITE_URL}/#store` },
    ...(post.wordCount ? { wordCount: post.wordCount } : {}),
    ...(post.seoKeywords.length > 0
      ? { keywords: post.seoKeywords.join(', ') }
      : {}),
    timeRequired: `PT${post.readingTimeMin}M`,
    articleSection: post.category,
  }
}

function buildBreadcrumbJsonLd(post: BlogPost) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Početna', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: `${SITE_URL}/blog` },
      {
        '@type': 'ListItem',
        position: 3,
        name: post.title,
        item: `${SITE_URL}/blog/${post.slug}`,
      },
    ],
  }
}

function buildPostFaqJsonLd(post: BlogPost) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: post.aeoQuestions.map((q) => ({
      '@type': 'Question',
      name: q.question,
      acceptedAnswer: { '@type': 'Answer', text: q.answer },
    })),
  }
}

// React 18 ne poznaje camelCase fetchPriority — lowercase atribut prolazi
// direktno u DOM (isti trik koristi i next/image interno).
const heroFetchPriority = {
  fetchpriority: 'high',
} as unknown as ImgHTMLAttributes<HTMLImageElement>

export default async function BlogPostPage({ params }: PageProps) {
  const post = await getPost(params.slug)
  if (!post) notFound()

  const jsonLd: Array<Record<string, unknown>> = [
    buildBlogPostingJsonLd(post),
    buildBreadcrumbJsonLd(post),
  ]
  if (post.aeoQuestions.length > 0) jsonLd.push(buildPostFaqJsonLd(post))

  return (
    <>
      {jsonLd.map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
      <a
        href="#sadrzaj"
        className="sr-only z-[100] rounded-xl bg-leaf-700 px-5 py-3 font-sans text-sm font-bold text-cream-50 focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        Preskoči na sadržaj
      </a>
      <Header solid />
      <main id="sadrzaj" className="min-h-screen bg-cream-100">
        <article className="pb-20 pt-28 sm:pb-28 sm:pt-36">
          <div className="container-custom">
            <div className="mx-auto max-w-3xl">
              {/* Breadcrumb */}
              <nav aria-label="Putanja do stranice" className="text-sm font-semibold text-ink/55">
                <ol className="flex flex-wrap items-center gap-2">
                  <li>
                    <Link href="/" className="transition-colors hover:text-leaf-700">
                      Početna
                    </Link>
                  </li>
                  <li aria-hidden="true">/</li>
                  <li>
                    <Link href="/blog" className="transition-colors hover:text-leaf-700">
                      Blog
                    </Link>
                  </li>
                  <li aria-hidden="true">/</li>
                  <li aria-current="page" className="text-ink/75">
                    {post.title}
                  </li>
                </ol>
              </nav>

              <h1 className="mt-7 text-balance font-display text-3xl font-semibold leading-tight text-forest-900 sm:text-4xl lg:text-5xl">
                {post.title}
              </h1>

              {/* Byline */}
              <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm font-semibold text-ink/60">
                <span className="rounded-full bg-leaf-50 px-3 py-1 text-xs font-bold uppercase tracking-widest2 text-leaf-700">
                  {post.category}
                </span>
                <time dateTime={post.date}>{formatDateSr(post.date)}</time>
                <span aria-hidden="true" className="text-ink/25">·</span>
                <span>{post.readingTimeMin} min čitanja</span>
                <span aria-hidden="true" className="text-ink/25">·</span>
                <span>{post.author}</span>
              </div>

              {/* Hero slika — LCP: eager + fetchpriority high */}
              {post.hero && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={post.hero}
                  alt={post.heroAlt}
                  width={post.heroWidth || 1600}
                  height={post.heroHeight || 1066}
                  loading="eager"
                  decoding="async"
                  {...heroFetchPriority}
                  className="mt-10 h-auto w-full rounded-3xl shadow-lift ring-1 ring-ink/5"
                />
              )}

              {/* Telo članka */}
              <div
                className="prose-una mt-10"
                dangerouslySetInnerHTML={{ __html: post.html }}
              />

              {/* Vidljiva AEO sekcija — poklapa se sa FAQPage JSON-LD šemom */}
              {post.aeoQuestions.length > 0 && (
                <section
                  aria-label="Česta pitanja o temi članka"
                  className="mt-16"
                >
                  <p className="eyebrow text-leaf-700">
                    <span className="eyebrow-dot" aria-hidden="true" />
                    Česta pitanja
                  </p>
                  <h2 className="mt-4 font-display text-2xl font-semibold text-forest-800 sm:text-3xl">
                    Pitate se…
                  </h2>
                  <div className="mt-7 space-y-4">
                    {post.aeoQuestions.map((q) => (
                      <div
                        key={q.question}
                        className="card-surface p-6 sm:p-7"
                      >
                        <h3 className="font-display text-lg font-semibold text-ink sm:text-xl">
                          {q.question}
                        </h3>
                        <p className="mt-3 leading-relaxed text-ink/70">
                          {q.answer}
                        </p>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* CTA — poseta prodavnici (ne online kupovina) */}
              <section
                aria-label="Posetite našu prodavnicu"
                className="grain relative mt-16 overflow-hidden rounded-3xl bg-forest-950 p-8 sm:p-10"
              >
                <div
                  aria-hidden="true"
                  className="glow-blob -right-20 -top-20 h-64 w-64 bg-honey-400/20"
                />
                <div className="relative z-10">
                  <p className="eyebrow text-honey-300">
                    <span className="eyebrow-dot" aria-hidden="true" />
                    Posetite nas
                  </p>
                  <h2 className="mt-4 text-balance font-display text-2xl font-semibold text-cream-50 sm:text-3xl">
                    Sve o čemu pišemo —{' '}
                    <em className="text-gradient-honey font-medium italic">
                      čeka vas na polici
                    </em>
                  </h2>
                  <p className="mt-4 max-w-xl leading-relaxed text-cream-100/80">
                    Svratite u našu prodavnicu u Kragujevcu,{' '}
                    {site.address.landmarkInline} — rado ćemo vam pomoći da
                    izaberete ono što vama zaista odgovara.
                  </p>
                  <ul className="mt-7 space-y-3 text-sm font-semibold text-cream-100/85">
                    <li className="flex items-start gap-3">
                      <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-honey-300" aria-hidden="true" />
                      <span>
                        {site.address.street} ({site.address.landmark}),{' '}
                        {site.address.city}
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Clock className="mt-0.5 h-4 w-4 shrink-0 text-honey-300" aria-hidden="true" />
                      <span>
                        {site.hours.weekdays.label}: {site.hours.weekdays.opens}{' '}
                        – {site.hours.weekdays.closes} · {site.hours.sunday.label}:{' '}
                        {site.hours.sunday.opens} – {site.hours.sunday.closes}
                      </span>
                    </li>
                  </ul>
                  <div className="mt-8 flex flex-wrap gap-4">
                    <a
                      href={site.maps.directionsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-honey"
                    >
                      <MapPin className="h-4 w-4" aria-hidden="true" />
                      Kako do nas
                    </a>
                    <a
                      href={`tel:${site.phones.landline.e164}`}
                      className="btn-outline-light"
                    >
                      <Phone className="h-4 w-4" aria-hidden="true" />
                      {site.phones.landline.display}
                    </a>
                  </div>
                </div>
              </section>

              {/* Nazad na listu */}
              <p className="mt-12">
                <Link
                  href="/blog"
                  className="inline-flex items-center gap-2 text-sm font-bold text-leaf-700 transition-colors hover:text-leaf-600"
                >
                  <span aria-hidden="true">←</span>
                  Svi tekstovi na blogu
                </Link>
              </p>
            </div>
          </div>
        </article>
      </main>
      <Footer />
    </>
  )
}
