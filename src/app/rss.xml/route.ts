// RSS 2.0 feed for UNA Zdrava Hrana - App Router route handler (served at /rss.xml).
// Mirrors src/app/sitemap.ts: reads blog posts + recipes at build time and emits a
// valid feed. Source kept ASCII-only on purpose; all dynamic text comes from data.
import { listPosts } from '@/lib/blog'
import { listRecipes } from '@/lib/recipes'
import { SITE_URL, site } from '@/lib/site'

function esc(s: string): string {
  return (s || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

function rfc822(iso: string): string {
  const d = new Date(iso)
  return Number.isNaN(d.getTime()) ? new Date().toUTCString() : d.toUTCString()
}

export async function GET() {
  const posts = listPosts().map((p) => ({
    title: p.title,
    description: p.description,
    date: p.date,
    url: `${SITE_URL}/blog/${p.slug}`,
    category: 'Blog',
  }))
  const recipes = listRecipes().map((r) => ({
    title: r.title,
    description: r.description,
    date: r.date,
    url: `${SITE_URL}/recepti/${r.slug}`,
    category: 'Recepti',
  }))
  const items = [...posts, ...recipes].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  )

  const lastBuild = items.length ? rfc822(items[0].date) : new Date().toUTCString()

  const body = items
    .map(
      (it) =>
        '    <item>\n' +
        `      <title>${esc(it.title)}</title>\n` +
        `      <link>${it.url}</link>\n` +
        `      <guid isPermaLink="true">${it.url}</guid>\n` +
        `      <description>${esc(it.description)}</description>\n` +
        `      <category>${esc(it.category)}</category>\n` +
        `      <pubDate>${rfc822(it.date)}</pubDate>\n` +
        '    </item>',
    )
    .join('\n')

  const xml =
    '<?xml version="1.0" encoding="UTF-8"?>\n' +
    '<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">\n' +
    '  <channel>\n' +
    `    <title>${esc(site.name)} - Blog i recepti</title>\n` +
    `    <link>${SITE_URL}</link>\n` +
    `    <description>${esc(site.description)}</description>\n` +
    '    <language>sr-Latn-RS</language>\n' +
    `    <lastBuildDate>${lastBuild}</lastBuildDate>\n` +
    `    <atom:link href="${SITE_URL}/rss.xml" rel="self" type="application/rss+xml" />\n` +
    body +
    '\n' +
    '  </channel>\n' +
    '</rss>'

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  })
}
