import type { Metadata } from 'next'
import Link from 'next/link'
import { Timer, Users } from 'lucide-react'
import Header from '@/components/ui/Header'
import Footer from '@/components/ui/Footer'
import { formatDateSr } from '@/lib/blog'
import { formatIsoDuration, listRecipes } from '@/lib/recipes'
import { SITE_URL } from '@/lib/site'

export const metadata: Metadata = {
  // absolute — zaobilazi layout template (inače bi naslov prešao 60 karaktera)
  title: { absolute: 'Recepti — zdrava jela | UNA' },
  description:
    'Originalni zdravi recepti iz prodavnice UNA u Kragujevcu: doručci, ručkovi, ' +
    'užine i napici od namirnica sa naših polica — novi recept svakog dana.',
  alternates: { canonical: `${SITE_URL}/recepti` },
  openGraph: {
    type: 'website',
    locale: 'sr_RS',
    url: `${SITE_URL}/recepti`,
    siteName: 'UNA Zdrava Hrana',
    title: 'Recepti — zdrava jela | UNA',
    description:
      'Zdravi recepti od namirnica sa naših polica — iz prodavnice ' +
      'zdrave hrane UNA u Kragujevcu.',
  },
}

export default function RecipesIndexPage() {
  const recipes = listRecipes()

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
              UNA recepti
            </p>
            <h1 className="mt-5 max-w-3xl text-balance font-display text-4xl font-semibold text-forest-900 sm:text-5xl lg:text-6xl">
              Recepti za <span className="text-gradient-leaf">zdrava jela</span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink/70">
              Originalni recepti od namirnica koje zaista držimo na policama —
              doručci, ručkovi, užine i napici, pisani jednostavno i bez
              komplikovanja. Svaki sastojak možete da pronađete u našoj
              prodavnici u Kragujevcu, kod mosta u Bresnici.
            </p>
          </div>
        </section>

        {/* Grid kartica */}
        <section className="section-padding bg-cream-100">
          <div className="container-custom">
            {recipes.length === 0 ? (
              <p className="text-lg text-ink/60">
                Prvi recepti su u pripremi — svratite uskoro.
              </p>
            ) : (
              <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {recipes.map((recipe) => {
                  const totalTime = recipe.recipe
                    ? formatIsoDuration(
                        recipe.recipe.totalTime || recipe.recipe.prepTime,
                      )
                    : ''
                  const recipeYield = recipe.recipe?.recipeYield ?? ''

                  return (
                    <article
                      key={recipe.slug}
                      className="card-surface group flex flex-col"
                    >
                      <Link
                        href={`/recepti/${recipe.slug}`}
                        className="flex h-full flex-col"
                      >
                        {recipe.hero ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={recipe.hero}
                            alt={recipe.heroAlt}
                            width={recipe.heroWidth || 1600}
                            height={recipe.heroHeight || 1066}
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
                              {recipe.recipe?.recipeCategory || recipe.category}
                            </span>
                            <time
                              dateTime={recipe.date}
                              className="font-sans text-ink/55"
                            >
                              {formatDateSr(recipe.date)}
                            </time>
                          </div>
                          <h2 className="mt-4 text-balance font-display text-xl font-semibold text-forest-800 transition-colors group-hover:text-leaf-700 sm:text-2xl">
                            {recipe.title}
                          </h2>
                          <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-ink/65">
                            {recipe.description}
                          </p>
                          {/* Recept akcenti — ukupno vreme + porcije */}
                          {(totalTime || recipeYield) && (
                            <div className="mt-4 flex flex-wrap items-center gap-2.5 text-xs font-bold text-forest-800">
                              {totalTime && (
                                <span className="inline-flex items-center gap-1.5 rounded-full bg-honey-50 px-3 py-1.5 text-honey-600">
                                  <Timer
                                    className="h-3.5 w-3.5"
                                    aria-hidden="true"
                                  />
                                  {totalTime}
                                </span>
                              )}
                              {recipeYield && (
                                <span className="inline-flex items-center gap-1.5 rounded-full bg-leaf-50 px-3 py-1.5 text-leaf-700">
                                  <Users
                                    className="h-3.5 w-3.5"
                                    aria-hidden="true"
                                  />
                                  {recipeYield}
                                </span>
                              )}
                            </div>
                          )}
                          <span className="mt-auto inline-flex items-center gap-1.5 pt-5 text-sm font-bold text-honey-600 transition-colors group-hover:text-honey-500">
                            Pogledajte recept
                            <span aria-hidden="true">→</span>
                          </span>
                        </div>
                      </Link>
                    </article>
                  )
                })}
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
