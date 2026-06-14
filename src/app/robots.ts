import type { MetadataRoute } from 'next'
import { SITE_URL } from '@/lib/site'

// AEO AI crawlers — generated/maintained by generate_aeo_files.py.
// Explicitly allow GPTBot/ClaudeBot/PerplexityBot/… so the site is
// eligible for AI answer engines (AEO). Idempotent: rerun is a no-op.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: '*', allow: '/' },
      { userAgent: 'GPTBot', allow: '/' },
      { userAgent: 'ClaudeBot', allow: '/' },
      { userAgent: 'PerplexityBot', allow: '/' },
      { userAgent: 'Google-Extended', allow: '/' },
      { userAgent: 'Applebot-Extended', allow: '/' },
      { userAgent: 'CCBot', allow: '/' },
      { userAgent: 'anthropic-ai', allow: '/' },
      { userAgent: 'cohere-ai', allow: '/' },
      { userAgent: 'Omgilibot', allow: '/' },
      { userAgent: 'YouBot', allow: '/' },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  }
}
