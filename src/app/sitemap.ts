import type { MetadataRoute } from 'next'
import { listPosts } from '@/lib/blog'
import { listRecipes } from '@/lib/recipes'
import { SITE_URL } from '@/lib/site'

export default function sitemap(): MetadataRoute.Sitemap {
  // Blog postovi — lastmod iz frontmatter `date` polja (server-side fs read)
  const posts = listPosts()

  const postEntries: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${SITE_URL}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: 'monthly',
    priority: 0.7,
  }))

  // Recepti — isti princip kao blog (content/recepti)
  const recipes = listRecipes()

  const recipeEntries: MetadataRoute.Sitemap = recipes.map((recipe) => ({
    url: `${SITE_URL}/recepti/${recipe.slug}`,
    lastModified: new Date(recipe.date),
    changeFrequency: 'monthly',
    priority: 0.7,
  }))

  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: `${SITE_URL}/blog`,
      // index se menja kad god izađe nov post
      lastModified: posts.length > 0 ? new Date(posts[0].date) : new Date(),
      changeFrequency: 'daily',
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/recepti`,
      // index se menja kad god izađe nov recept
      lastModified: recipes.length > 0 ? new Date(recipes[0].date) : new Date(),
      changeFrequency: 'daily',
      priority: 0.8,
    },
    ...postEntries,
    ...recipeEntries,
  ]
}
