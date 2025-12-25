import Link from 'next/link'
import { notFound } from 'next/navigation'
import {
  formatDate,
  getSeriesBySlug,
  getSeriesList,
} from 'app/blog/utils'

export async function generateStaticParams() {
  return getSeriesList().map((series) => ({ slug: series.slug }))
}

export function generateMetadata({ params }) {
  let series = getSeriesBySlug(params.slug)
  if (!series) {
    return {
      title: 'Series',
    }
  }

  return {
    title: `${series.title} · Series`,
    description: `A ${series.posts.length}-part series updated ${formatDate(series.latestPublishedAt)}.`,
  }
}

export default function SeriesDetailPage({ params }) {
  let series = getSeriesBySlug(params.slug)

  if (!series) {
    notFound()
  }

  return (
    <section>
      <Link
        href="/series"
        className="text-xs uppercase tracking-[0.25em] text-neutral-500 transition hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100"
      >
        ← All series
      </Link>
      <h1 className="mt-4 text-3xl font-semibold tracking-tight">
        {series.title}
      </h1>
      <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
        {series.posts.length} parts · Updated{' '}
        {formatDate(series.latestPublishedAt)}
      </p>

      <ol className="mt-8 divide-y divide-dashed divide-neutral-200 dark:divide-neutral-800">
        {series.posts.map((post, index) => (
          <li
            key={post.slug}
            className="py-5"
          >
            <div className="flex flex-wrap items-center justify-between text-[11px] uppercase tracking-[0.2em] text-neutral-500 dark:text-neutral-400">
              <span>
                Part {index + 1}
                {post.metadata.readingTime
                  ? ` · ${post.metadata.readingTime} min read`
                  : ''}
              </span>
              <span>{formatDate(post.metadata.publishedAt)}</span>
            </div>
            <Link
              href={`/blog/${post.slug}`}
              className="mt-2 block text-lg font-semibold tracking-tight text-neutral-900 transition hover:text-blue-600 dark:text-neutral-50 dark:hover:text-blue-300"
            >
              {post.metadata.title}
            </Link>
            {post.metadata.summary ? (
              <p className="mt-2 text-sm text-neutral-700 dark:text-neutral-300">
                {post.metadata.summary}
              </p>
            ) : null}
            {post.metadata.tags && post.metadata.tags.length > 0 ? (
              <p className="mt-3 text-xs text-neutral-500 dark:text-neutral-400">
                {post.metadata.tags.map((tag) => (
                  <span key={tag} className="mr-3">
                    #{tag}
                  </span>
                ))}
              </p>
            ) : null}
          </li>
        ))}
      </ol>
    </section>
  )
}
