import type { Metadata } from 'next'
import type { ImgHTMLAttributes } from 'react'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import {
  ChefHat,
  Clock,
  Flame,
  MapPin,
  Phone,
  ShoppingBasket,
  Timer,
  Users,
} from 'lucide-react'
import Header from '@/components/ui/Header'
import Footer from '@/components/ui/Footer'
import { formatDateSr } from '@/lib/blog'
import {
  formatIsoDuration,
  getRecipe,
  listRecipes,
  listRecipeSlugs,
  type Recipe,
} from '@/lib/recipes'
import { SITE_URL, site } from '@/lib/site'

interface PageProps {
  params: { slug: string }
}

// Svi recepti se statički generišu iz content/recepti — nepoznat slug je 404.
export const dynamicParams = false

export function generateStaticParams(): Array<{ slug: string }> {
  return listRecipeSlugs().map((slug) => ({ slug }))
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
  const recipe = listRecipes().find((r) => r.slug === params.slug)
  if (!recipe) return {}

  const url = `${SITE_URL}/recepti/${recipe.slug}`

  return {
    // absolute — layout template bi prešao limit od 60 karaktera
    title: { absolute: metaTitle(recipe.title) },
    description: recipe.description,
    keywords: recipe.seoKeywords,
    alternates: { canonical: url },
    openGraph: {
      type: 'article',
      locale: 'sr_RS',
      url,
      siteName: site.name,
      title: metaTitle(recipe.title),
      description: recipe.description,
      publishedTime: recipe.date,
      authors: [recipe.author],
      ...(recipe.hero
        ? {
            images: [
              {
                url: absoluteHeroUrl(recipe.hero),
                width: recipe.heroWidth || undefined,
                height: recipe.heroHeight || undefined,
                alt: recipe.heroAlt || recipe.title,
              },
            ],
          }
        : {}),
    },
    twitter: {
      card: recipe.hero ? 'summary_large_image' : 'summary',
      title: metaTitle(recipe.title),
      description: recipe.description,
    },
  }
}

/**
 * schema.org/Recipe — Google Recipe rich results format.
 * https://developers.google.com/search/docs/appearance/structured-data/recipe
 */
function buildRecipeJsonLd(recipe: Recipe) {
  const url = `${SITE_URL}/recepti/${recipe.slug}`
  const r = recipe.recipe

  return {
    '@context': 'https://schema.org',
    '@type': 'Recipe',
    '@id': `${url}#recipe`,
    name: recipe.title,
    description: recipe.description,
    ...(recipe.llmSummary ? { abstract: recipe.llmSummary } : {}),
    ...(recipe.hero ? { image: [absoluteHeroUrl(recipe.hero)] } : {}),
    url,
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    datePublished: recipe.date,
    inLanguage: 'sr-Latn-RS',
    // referenca na postojeći GroceryStore čvor sa početne strane
    author: { '@id': `${SITE_URL}/#store` },
    publisher: { '@id': `${SITE_URL}/#store` },
    ...(r?.prepTime ? { prepTime: r.prepTime } : {}),
    ...(r?.cookTime ? { cookTime: r.cookTime } : {}),
    ...(r?.totalTime ? { totalTime: r.totalTime } : {}),
    ...(r?.recipeYield ? { recipeYield: r.recipeYield } : {}),
    ...(r?.recipeCategory ? { recipeCategory: r.recipeCategory } : {}),
    ...(r?.recipeCuisine ? { recipeCuisine: r.recipeCuisine } : {}),
    ...(r && r.recipeIngredient.length > 0
      ? { recipeIngredient: r.recipeIngredient }
      : {}),
    ...(r && r.recipeInstructions.length > 0
      ? {
          recipeInstructions: r.recipeInstructions.map((step, index) => ({
            '@type': 'HowToStep',
            position: index + 1,
            text: step,
            url: `${url}#korak-${index + 1}`,
          })),
        }
      : {}),
    ...(r?.nutrition
      ? {
          nutrition: {
            '@type': 'NutritionInformation',
            ...r.nutrition,
          },
        }
      : {}),
    keywords:
      r?.keywords ||
      (recipe.seoKeywords.length > 0 ? recipe.seoKeywords.join(', ') : undefined),
  }
}

function buildBreadcrumbJsonLd(recipe: Recipe) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Početna', item: SITE_URL },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Recepti',
        item: `${SITE_URL}/recepti`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: recipe.title,
        item: `${SITE_URL}/recepti/${recipe.slug}`,
      },
    ],
  }
}

function buildRecipeFaqJsonLd(recipe: Recipe) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: recipe.aeoQuestions.map((q) => ({
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

export default async function RecipePage({ params }: PageProps) {
  const recipe = await getRecipe(params.slug)
  if (!recipe) notFound()

  const r = recipe.recipe
  const prepTime = r ? formatIsoDuration(r.prepTime) : ''
  const cookTime = r ? formatIsoDuration(r.cookTime) : ''
  const totalTime = r ? formatIsoDuration(r.totalTime) : ''

  const infoItems = [
    prepTime && { icon: Timer, label: 'Priprema', value: prepTime },
    cookTime && { icon: Flame, label: 'Kuvanje', value: cookTime },
    totalTime && { icon: Clock, label: 'Ukupno', value: totalTime },
    r?.recipeYield && { icon: Users, label: 'Porcije', value: r.recipeYield },
    r?.recipeCategory && {
      icon: ChefHat,
      label: 'Kategorija',
      value: r.recipeCategory,
    },
  ].filter(Boolean) as Array<{
    icon: typeof Timer
    label: string
    value: string
  }>

  const jsonLd: Array<Record<string, unknown>> = [
    buildRecipeJsonLd(recipe),
    buildBreadcrumbJsonLd(recipe),
  ]
  if (recipe.aeoQuestions.length > 0) jsonLd.push(buildRecipeFaqJsonLd(recipe))

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
              <nav
                aria-label="Putanja do stranice"
                className="text-sm font-semibold text-ink/55"
              >
                <ol className="flex flex-wrap items-center gap-2">
                  <li>
                    <Link href="/" className="transition-colors hover:text-leaf-700">
                      Početna
                    </Link>
                  </li>
                  <li aria-hidden="true">/</li>
                  <li>
                    <Link
                      href="/recepti"
                      className="transition-colors hover:text-leaf-700"
                    >
                      Recepti
                    </Link>
                  </li>
                  <li aria-hidden="true">/</li>
                  <li aria-current="page" className="text-ink/75">
                    {recipe.title}
                  </li>
                </ol>
              </nav>

              <h1 className="mt-7 text-balance font-display text-3xl font-semibold leading-tight text-forest-900 sm:text-4xl lg:text-5xl">
                {recipe.title}
              </h1>

              {/* Byline */}
              <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm font-semibold text-ink/60">
                <span className="rounded-full bg-leaf-50 px-3 py-1 text-xs font-bold uppercase tracking-widest2 text-leaf-700">
                  {r?.recipeCategory || recipe.category}
                </span>
                <time dateTime={recipe.date}>{formatDateSr(recipe.date)}</time>
                <span aria-hidden="true" className="text-ink/25">·</span>
                <span>{recipe.author}</span>
              </div>

              {/* Hero slika — LCP: eager + fetchpriority high */}
              {recipe.hero && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={recipe.hero}
                  alt={recipe.heroAlt}
                  width={recipe.heroWidth || 1600}
                  height={recipe.heroHeight || 1066}
                  loading="eager"
                  decoding="async"
                  {...heroFetchPriority}
                  className="mt-10 h-auto w-full rounded-3xl shadow-lift ring-1 ring-ink/5"
                />
              )}

              {/* Info traka — vreme / porcije / kategorija */}
              {infoItems.length > 0 && (
                <dl className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-3xl bg-ink/5 ring-1 ring-ink/5 sm:grid-cols-3 lg:grid-cols-5">
                  {infoItems.map((item) => (
                    <div
                      key={item.label}
                      className="flex flex-col items-center gap-1.5 bg-cream-50 px-4 py-5 text-center"
                    >
                      <item.icon
                        className="h-5 w-5 text-honey-600"
                        aria-hidden="true"
                      />
                      <dt className="text-[11px] font-bold uppercase tracking-widest2 text-ink/50">
                        {item.label}
                      </dt>
                      <dd className="text-sm font-bold text-forest-900">
                        {item.value}
                      </dd>
                    </div>
                  ))}
                </dl>
              )}

              {/* Sastojci — istaknuta kartica */}
              {r && r.recipeIngredient.length > 0 && (
                <section aria-label="Sastojci" className="mt-10">
                  <div className="card-surface p-7 sm:p-9">
                    <p className="eyebrow text-leaf-700">
                      <span className="eyebrow-dot" aria-hidden="true" />
                      Šta vam treba
                    </p>
                    <h2 className="mt-4 font-display text-2xl font-semibold text-forest-800 sm:text-3xl">
                      Sastojci
                      {r.recipeYield && (
                        <span className="ml-3 align-middle text-sm font-bold text-ink/50">
                          ({r.recipeYield})
                        </span>
                      )}
                    </h2>
                    <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                      {r.recipeIngredient.map((ingredient) => (
                        <li
                          key={ingredient}
                          className="flex items-start gap-3 rounded-2xl bg-leaf-50/60 px-4 py-3 text-sm font-semibold leading-relaxed text-ink/80"
                        >
                          <span
                            aria-hidden="true"
                            className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-honey-500"
                          />
                          {ingredient}
                        </li>
                      ))}
                    </ul>
                    {r.nutrition?.calories && (
                      <p className="mt-6 text-sm font-semibold text-ink/55">
                        Energetska vrednost: oko{' '}
                        <strong className="font-bold text-forest-800">
                          {r.nutrition.calories}
                        </strong>{' '}
                        po porciji.
                      </p>
                    )}
                  </div>
                </section>
              )}

              {/* Priprema — numerisani koraci */}
              {r && r.recipeInstructions.length > 0 && (
                <section aria-label="Priprema" className="mt-12">
                  <p className="eyebrow text-leaf-700">
                    <span className="eyebrow-dot" aria-hidden="true" />
                    Korak po korak
                  </p>
                  <h2 className="mt-4 font-display text-2xl font-semibold text-forest-800 sm:text-3xl">
                    Priprema
                  </h2>
                  <ol className="mt-7 space-y-4">
                    {r.recipeInstructions.map((step, index) => (
                      <li
                        key={step}
                        id={`korak-${index + 1}`}
                        className="card-surface flex items-start gap-5 p-6 sm:p-7"
                      >
                        <span
                          aria-hidden="true"
                          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-leaf-700 font-display text-lg font-bold text-cream-50"
                        >
                          {index + 1}
                        </span>
                        <p className="pt-1.5 leading-relaxed text-ink/80">
                          {step}
                        </p>
                      </li>
                    ))}
                  </ol>
                </section>
              )}

              {/* Telo recepta — uvod, saveti, varijacije */}
              <div
                className="prose-una mt-12"
                dangerouslySetInnerHTML={{ __html: recipe.html }}
              />

              {/* Vidljiva AEO sekcija — poklapa se sa FAQPage JSON-LD šemom */}
              {recipe.aeoQuestions.length > 0 && (
                <section
                  aria-label="Česta pitanja o receptu"
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
                    {recipe.aeoQuestions.map((q) => (
                      <div key={q.question} className="card-surface p-6 sm:p-7">
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

              {/* CTA — sastojci iz naše radnje (poseta prodavnici) */}
              <section
                aria-label="Sastojci iz naše radnje"
                className="grain relative mt-16 overflow-hidden rounded-3xl bg-forest-950 p-8 sm:p-10"
              >
                <div
                  aria-hidden="true"
                  className="glow-blob -right-20 -top-20 h-64 w-64 bg-honey-400/20"
                />
                <div className="relative z-10">
                  <p className="eyebrow text-honey-300">
                    <span className="eyebrow-dot" aria-hidden="true" />
                    Sastojci iz naše radnje
                  </p>
                  <h2 className="mt-4 text-balance font-display text-2xl font-semibold text-cream-50 sm:text-3xl">
                    Sve za ovaj recept —{' '}
                    <em className="text-gradient-honey font-medium italic">
                      čeka vas na polici
                    </em>
                  </h2>
                  <p className="mt-4 max-w-xl leading-relaxed text-cream-100/80">
                    Semenke, pahuljice, začini i ostale namirnice iz ovog
                    recepta deo su naše svakodnevne ponude. Svratite u
                    prodavnicu u Kragujevcu, {site.address.landmarkInline} —
                    rado ćemo vam pomoći da izaberete najbolje sastojke.
                  </p>
                  <ul className="mt-7 space-y-3 text-sm font-semibold text-cream-100/85">
                    <li className="flex items-start gap-3">
                      <MapPin
                        className="mt-0.5 h-4 w-4 shrink-0 text-honey-300"
                        aria-hidden="true"
                      />
                      <span>
                        {site.address.street} ({site.address.landmark}),{' '}
                        {site.address.city}
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Clock
                        className="mt-0.5 h-4 w-4 shrink-0 text-honey-300"
                        aria-hidden="true"
                      />
                      <span>
                        {site.hours.weekdays.label}: {site.hours.weekdays.opens}{' '}
                        – {site.hours.weekdays.closes} ·{' '}
                        {site.hours.sunday.label}: {site.hours.sunday.opens} –{' '}
                        {site.hours.sunday.closes}
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
                      <ShoppingBasket className="h-4 w-4" aria-hidden="true" />
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
                  href="/recepti"
                  className="inline-flex items-center gap-2 text-sm font-bold text-leaf-700 transition-colors hover:text-leaf-600"
                >
                  <span aria-hidden="true">←</span>
                  Svi recepti
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
