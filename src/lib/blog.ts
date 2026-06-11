/**
 * Blog loader — server-side util (App Router, Node runtime).
 *
 * Čita content/blog/*.mdx fajlove koje piše BizFlow content mašina
 * (isti frontmatter format kao fakturko.io / bizflowai.io: title, slug,
 * date, hero, hero_alt, hero_width, hero_height, meta_description,
 * llm_summary, seo_keywords, reading_time_min, word_count,
 * aeo_questions JSON block scalar, video_url, category, author).
 *
 * Za razliku od Vite varijante (import.meta.glob) ovde se radi čisto
 * server-side: fs + gray-matter za frontmatter, remark + remark-gfm +
 * remark-html za markdown → HTML. Poziva se isključivo iz server
 * komponenti / generateStaticParams / sitemap-a.
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

/** Metadata jednog posta — sve što treba index stranici i sitemap-u. */
export interface BlogPostMeta {
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
  /** YouTube URL ako ga publisher upiše — prazan string kad ga nema. */
  videoUrl: string
  /** LLM-friendly sažetak za JSON-LD. */
  llmSummary: string
  seoKeywords: string[]
  /** Parsiran aeo_questions JSON block scalar. */
  aeoQuestions: AeoQuestion[]
}

/** Pun post — metadata + renderovan HTML sadržaj članka. */
export interface BlogPost extends BlogPostMeta {
  html: string
}

const BLOG_DIR = path.join(process.cwd(), 'content', 'blog')

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

/**
 * Koercira frontmatter u striktan BlogPostMeta — tolerantno na missing
 * ključeve (ručno editovani MDX fajlovi mogu izostaviti opciona polja).
 */
function normalizeFrontmatter(
  filename: string,
  fm: Record<string, unknown>,
): BlogPostMeta {
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
    category: String(fm.category ?? 'Saveti'),
    author: String(fm.author ?? 'UNA tim'),
    hero: typeof fm.hero === 'string' ? fm.hero : '',
    heroAlt: typeof fm.hero_alt === 'string' ? fm.hero_alt : '',
    heroWidth: Number(fm.hero_width) || 0,
    heroHeight: Number(fm.hero_height) || 0,
    readingTimeMin: Number(fm.reading_time_min) || 5,
    wordCount: Number(fm.word_count) || 0,
    videoUrl:
      typeof fm.video_url === 'string' && /^https?:\/\//.test(fm.video_url)
        ? fm.video_url
        : '',
    llmSummary: typeof fm.llm_summary === 'string' ? fm.llm_summary : '',
    seoKeywords: keywords,
    aeoQuestions: parseAeoQuestions(fm.aeo_questions),
  }
}

/** Imena svih .mdx fajlova u content/blog — prazan niz ako folder ne postoji. */
function listMdxFiles(): string[] {
  if (!fs.existsSync(BLOG_DIR)) return []
  return fs.readdirSync(BLOG_DIR).filter((f) => /\.mdx?$/.test(f))
}

/** Metadata svih postova, sortirano newest-first. Sinhrono — bezbedno za sitemap. */
export function listPosts(): BlogPostMeta[] {
  return listMdxFiles()
    .map((filename) => {
      const raw = fs.readFileSync(path.join(BLOG_DIR, filename), 'utf-8')
      const { data } = matter(raw)
      return normalizeFrontmatter(filename, data as Record<string, unknown>)
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

/** Slugovi svih postova — za generateStaticParams. */
export function listSlugs(): string[] {
  return listPosts().map((post) => post.slug)
}

/** Datum u sr-Latn formatu, npr. "11. jun 2026." — za byline i kartice. */
export function formatDateSr(isoDate: string): string {
  const date = new Date(isoDate)
  if (Number.isNaN(date.getTime())) return isoDate
  return date.toLocaleDateString('sr-Latn-RS', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

/**
 * Pun post po slug-u: metadata + markdown telo konvertovano u HTML.
 * Vraća null ako post ne postoji.
 */
export async function getPost(slug: string): Promise<BlogPost | null> {
  const filename = listMdxFiles().find((f) => {
    const raw = fs.readFileSync(path.join(BLOG_DIR, f), 'utf-8')
    const { data } = matter(raw)
    const fmSlug =
      typeof data.slug === 'string' && data.slug
        ? data.slug
        : f.replace(/\.mdx?$/, '')
    return fmSlug === slug
  })
  if (!filename) return null

  const raw = fs.readFileSync(path.join(BLOG_DIR, filename), 'utf-8')
  const { data, content } = matter(raw)
  const meta = normalizeFrontmatter(filename, data as Record<string, unknown>)

  // sanitize: false — sadržaj pišemo sami (BizFlow publisher), nije user input.
  const processed = await remark()
    .use(remarkGfm)
    .use(remarkHtml, { sanitize: false })
    .process(content)

  return { ...meta, html: String(processed) }
}
