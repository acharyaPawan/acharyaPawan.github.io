import Link from 'next/link'
import { formatDate } from 'app/blog/utils'
import { getPublishedTILPosts } from './utils'

export const metadata = {
  title: 'Today I Learned',
  description: 'Short engineering notes captured in-flight.',
}

export default function TILIndexPage() {
  let posts = getPublishedTILPosts().sort((a, b) => {
    return (
      new Date(b.metadata.publishedAt).getTime() -
      new Date(a.metadata.publishedAt).getTime()
    )
  })

  return (
    <section>
      <h1 className="text-2xl font-semibold uppercase tracking-[0.15em]">
        Today I Learned
      </h1>
      <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
        Bite-sized notes from my notebooks, fewer polish passes than full blog posts.
      </p>

      {posts.length === 0 ? (
        <p className="mt-8 text-sm text-neutral-500 dark:text-neutral-400">
          Nothing logged yet—come back after the next coding rabbit hole.
        </p>
      ) : (
        <div className="mt-8 divide-y divide-dashed divide-neutral-200 dark:divide-neutral-800">
          {posts.map((post) => (
            <article
              key={post.slug}
              className="py-5"
            >
              <div className="flex flex-wrap items-center justify-between text-[11px] uppercase tracking-[0.2em] text-neutral-500 dark:text-neutral-400">
                <span>{formatDate(post.metadata.publishedAt)}</span>
                {post.metadata.tags && post.metadata.tags.length > 0 ? (
                  <div className="flex flex-wrap gap-2 text-[11px]">
                    {post.metadata.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-neutral-500 dark:text-neutral-400"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                ) : null}
              </div>
              <Link
                href={`/til/${post.slug}`}
                className="mt-3 block text-lg font-semibold tracking-tight text-neutral-900 transition hover:text-blue-600 dark:text-neutral-50 dark:hover:text-blue-300"
              >
                {post.metadata.title}
              </Link>
              {post.metadata.summary ? (
                <p className="mt-2 text-sm text-neutral-700 dark:text-neutral-300">
                  {post.metadata.summary}
                </p>
              ) : null}
              <div className="mt-4 text-sm">
                <Link
                  href={`/til/${post.slug}`}
                  className="font-medium text-blue-600 transition hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300"
                >
                  Read the full note →
                </Link>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  )
}
