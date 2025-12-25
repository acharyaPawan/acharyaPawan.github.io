import {
  getPublishedBlogPosts,
  getSeriesList,
} from 'app/blog/utils'
import { getPublishedTILPosts } from 'app/til/utils'

export const baseUrl = 'https://portfolio-blog-starter.vercel.app'

export default async function sitemap() {
  let blogs = getPublishedBlogPosts().map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: post.metadata.updatedAt ?? post.metadata.publishedAt,
  }))

  let series = getSeriesList().map((entry) => ({
    url: `${baseUrl}/series/${entry.slug}`,
    lastModified: entry.latestPublishedAt,
  }))

  let til = getPublishedTILPosts().map((post) => ({
    url: `${baseUrl}/til/${post.slug}`,
    lastModified: post.metadata.publishedAt,
  }))

  let routes = ['', '/blog', '/series', '/til'].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString().split('T')[0],
  }))

  return [...routes, ...blogs, ...series, ...til]
}
