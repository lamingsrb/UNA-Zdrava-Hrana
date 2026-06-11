/**
 * Recipes loader — server-side util (App Router, Node runtime).
 *
 * Čita content/recepti/*.mdx fajlove koje piše BizFlow content mašina.
 * Frontmatter je isti kao blog (title, slug, date, hero, hero_alt,
 * hero_width, hero_height, meta_description, llm_summary, seo_keywords,
 * reading_time_min, word_count, aeo_questions) PLUS recept-specifično
 * polje `recipe_json` — YAML block scalar (|) sa JSON objektom u
 * schema.org/Recipe obliku: prepTime, cookTime, totalTime, recipeYield,
 * recipeCategory, recipeCuisine, recipeIngredient[], recipeInstructions[],
 * keywords, nutrition.calories.
 *
 * Parsiranje recipe_json je TOLERANTNO — polje sme da fali ili da bude
 * neispravno; stranica se tada renderuje bez recept-sekcija (kao blog post).
 *
 * Isti pristup kao src/lib/blog.ts: fs + gray-matter + remark — poziva se
 * isključivo iz server komponenti / generateStaticParams / sitemap-a.
 */
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import remarkGfm from 'remark-gfm'
import remarkHtml from 'remark-html'

export interface AeoQuestion {
  question: string
  answer: string
}

/** Strukturisani podaci recepta — parsiran recipe_json block scalar. */
export interface RecipeData {
  /** ISO 8601 trajanje pripreme, npr. "PT15M" — prazan string kad fali. */
  prepTime: string
  /** ISO 8601 trajanje kuvanja, npr. "PT30M". */
  cookTime: string
  /** ISO 8601 ukupno trajanje, npr. "PT45M". */
  totalTime: string
  /** Npr. "4 porcije". */
  recipeYield: string
  recipeCategory: string
  recipeCuisine: string
  recipeIngredient: string[]
  /** Koraci pripreme kao čist tekst — UI ih numeriše, JSON-LD pravi HowToStep. */
  recipeInstructions: string[]
  keywords: string
  /** Npr. { calories: "320 kcal" } — null kad nutrition blok fali. */
  nutrition: Record<string, string> | null
}

/** Metadata jednog recepta — sve što treba index stranici i sitemap-u. */
export interface RecipeMeta {
  slug: string
  title: string
  /** meta_description iz frontmatter-a (fallback: llm_summary). */
  description: string
  /** ISO datum objave (frontmatter `date`). */
  date: string
  category: string
  author: string
  /** Putanja hero slike — prazan string znači "nema hero slike". */
  hero: string
  heroAlt: string
  heroWidth: number
  heroHeight: number
  readingTimeMin: number
  wordCount: number
  /** LLM-friendly sažetak za JSON-LD. */
  llmSummary: string
  seoKeywords: string[]
  /** Parsiran aeo_questions JSON block scalar. */
  aeoQuestions: AeoQuestion[]
  /** Parsiran recipe_json — null kad polje fali ili je neispravno. */
  recipe: RecipeData | null
}

/** Pun recept — metadata + renderovan HTML sadržaj. */
export interface Recipe extends RecipeMeta {
  html: string
}

const RECIPES_DIR = path.join(process.cwd(), 'content', 'recepti')

/** Parsira JSON-in-YAML block scalar (publisher emituje string blob) u listu Q&A. */
function parseAeoQuestions(raw: unknown): AeoQuestion[] {
  let parsed: unknown = raw
  if (typeof raw === 'string') {
    try {
      parsed = JSON.parse(raw)
    } catch {
      return []
    }
  }
  if (!Array.isArray(parsed)) return []
  return parsed.filter(
    (q): q is AeoQuestion =>
      Boolean(q) &&
      typeof (q as AeoQuestion).question === 'string' &&
      typeof (q as AeoQuestion).answer === 'string',
  )
}

/** Niz nepoznatih vrednosti → niz stringova (ne-stringovi se preskaču). */
function toStringArray(raw: unknown): string[] {
  if (!Array.isArray(raw)) return []
  return raw
    .filter((item): item is string => typeof item === 'string')
    .map((item) => item.trim())
    .filter(Boolean)
}

/** nutrition objekat → flat Record<string, string> (samo string vrednosti). */
function toNutrition(raw: unknown): Record<string, string> | null {
  if (!raw || typeof raw !== 'object' || Array.isArray(raw)) return null
  const entries = Object.entries(raw as Record<string, unknown>).filter(
    (entry): entry is [string, string] => typeof entry[1] === 'string',
  )
  return entries.length > 0 ? Object.fromEntries(entries) : null
}

/**
 * Parsira recipe_json block scalar — TOLERANTNO. Polje sme da fali, da bude
 * prazan string ili nevalidan JSON: u svim tim slučajevima vraća null i
 * stranica se renderuje bez recept-specifičnih sekcija.
 */
function parseRecipeJson(raw: unknown): RecipeData | null {
  let parsed: unknown = raw
  if (typeof raw === 'string') {
    const trimmed = raw.trim()
    if (!trimmed) return null
    try {
      parsed = JSON.parse(trimmed)
    } catch {
      return null
    }
  }
  if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) {
    return null
  }
  const r = parsed as Record<string, unknown>
  return {
    prepTime: typeof r.prepTime === 'string' ? r.prepTime : '',
    cookTime: typeof r.cookTime === 'string' ? r.cookTime : '',
    totalTime: typeof r.totalTime === 'string' ? r.totalTime : '',
    recipeYield: typeof r.recipeYield === 'string' ? r.recipeYield : '',
    recipeCategory: typeof r.recipeCategory === 'string' ? r.recipeCategory : '',
    recipeCuisine: typeof r.recipeCuisine === 'string' ? r.recipeCuisine : '',
    recipeIngredient: toStringArray(r.recipeIngredient),
    recipeInstructions: toStringArray(r.recipeInstructions),
    keywords: typeof r.keywords === 'string' ? r.keywords : '',
    nutrition: toNutrition(r.nutrition),
  }
}

/**
 * Koercira frontmatter u striktan RecipeMeta — tolerantno na missing
 * ključeve (ručno editovani MDX fajlovi mogu izostaviti opciona polja).
 */
function normalizeFrontmatter(
  filename: string,
  fm: Record<string, unknown>,
): RecipeMeta {
  const fallbackSlug = filename.replace(/\.mdx?$/, '')
  const slug = typeof fm.slug === 'string' && fm.slug ? fm.slug : fallbackSlug
  const keywords: string[] = Array.isArray(fm.seo_keywords)
    ? fm.seo_keywords.map(String)
    : []

  return {
    slug,
    title: String(fm.title ?? slug),
    description: String(fm.meta_description ?? fm.llm_summary ?? ''),
    date: String(fm.date ?? new Date().toISOString()),
    category: String(fm.category ?? 'Recepti'),
    author: String(fm.author ?? 'UNA tim'),
    hero: typeof fm.hero === 'string' ? fm.hero : '',
    heroAlt: typeof fm.hero_alt === 'string' ? fm.hero_alt : '',
    heroWidth: Number(fm.hero_width) || 0,
    heroHeight: Number(fm.hero_height) || 0,
    readingTimeMin: Number(fm.reading_time_min) || 5,
    wordCount: Number(fm.word_count) || 0,
    llmSummary: typeof fm.llm_summary === 'string' ? fm.llm_summary : '',
    seoKeywords: keywords,
    aeoQuestions: parseAeoQuestions(fm.aeo_questions),
    recipe: parseRecipeJson(fm.recipe_json),
  }
}

/** Imena svih .mdx fajlova u content/recepti — prazan niz ako folder ne postoji. */
function listMdxFiles(): string[] {
  if (!fs.existsSync(RECIPES_DIR)) return []
  return fs.readdirSync(RECIPES_DIR).filter((f) => /\.mdx?$/.test(f))
}

/** Metadata svih recepata, sortirano newest-first. Sinhrono — bezbedno za sitemap. */
export function listRecipes(): RecipeMeta[] {
  return listMdxFiles()
    .map((filename) => {
      const raw = fs.readFileSync(path.join(RECIPES_DIR, filename), 'utf-8')
      const { data } = matter(raw)
      return normalizeFrontmatter(filename, data as Record<string, unknown>)
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

/** Slugovi svih recepata — za generateStaticParams. */
export function listRecipeSlugs(): string[] {
  return listRecipes().map((recipe) => recipe.slug)
}

/**
 * ISO 8601 trajanje ("PT45M", "PT1H30M") → čitljiv srpski format
 * ("45 min", "1 h 30 min"). Vraća prazan string za nevalidan input.
 */
export function formatIsoDuration(iso: string): string {
  const match = /^PT(?:(\d+)H)?(?:(\d+)M)?$/i.exec(iso.trim())
  if (!match) return ''
  const hours = Number(match[1] ?? 0)
  const minutes = Number(match[2] ?? 0)
  if (hours === 0 && minutes === 0) return ''
  const parts: string[] = []
  if (hours > 0) parts.push(`${hours} h`)
  if (minutes > 0) parts.push(`${minutes} min`)
  return parts.join(' ')
}

/**
 * Pun recept po slug-u: metadata + markdown telo konvertovano u HTML.
 * Vraća null ako recept ne postoji.
 */
export async function getRecipe(slug: string): Promise<Recipe | null> {
  const filename = listMdxFiles().find((f) => {
    const raw = fs.readFileSync(path.join(RECIPES_DIR, f), 'utf-8')
    const { data } = matter(raw)
    const fmSlug =
      typeof data.slug === 'string' && data.slug
        ? data.slug
        : f.replace(/\.mdx?$/, '')
    return fmSlug === slug
  })
  if (!filename) return null

  const raw = fs.readFileSync(path.join(RECIPES_DIR, filename), 'utf-8')
  const { data, content } = matter(raw)
  const meta = normalizeFrontmatter(filename, data as Record<string, unknown>)

  // sanitize: false — sadržaj pišemo sami (BizFlow publisher), nije user input.
  const processed = await remark()
    .use(remarkGfm)
    .use(remarkHtml, { sanitize: false })
    .process(content)

  return { ...meta, html: String(processed) }
}
