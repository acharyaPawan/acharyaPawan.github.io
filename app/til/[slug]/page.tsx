import Link from 'next/link'
import { notFound } from 'next/navigation'
import { formatDate } from 'app/blog/utils'
import { CustomMDX } from 'app/components/mdx'
import { getTILPosts } from '../utils'

export async function generateStaticParams() {
  return getTILPosts().map((til) => ({ slug: til.slug }))
}

export function generateMetadata({ params }) {
  let til = getTILPosts().find((entry) => entry.slug === params.slug)
  if (!til) {
    return {
      title: 'Today I Learned',
    }
  }

  return {
    title: til.metadata.title,
    description: til.metadata.summary,
  }
}

export default function TILDetailPage({ params }) {
  let til = getTILPosts().find((entry) => entry.slug === params.slug)

  if (!til) {
    notFound()
  }

  return (
    <section>
      <Link
        href="/til"
        className="text-xs uppercase tracking-[0.25em] text-neutral-500 transition hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100"
      >
        ← All TILs
      </Link>
      <h1 className="mt-4 text-3xl font-semibold tracking-tight">
        {til.metadata.title}
      </h1>
      <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
        Logged {formatDate(til.metadata.publishedAt)}
      </p>
      {til.metadata.tags && til.metadata.tags.length > 0 ? (
        <div className="mt-3 flex flex-wrap gap-2">
          {til.metadata.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-neutral-100 px-3 py-1 text-xs font-medium text-neutral-600 dark:bg-neutral-800 dark:text-neutral-300"
            >
              #{tag}
            </span>
          ))}
        </div>
      ) : null}
      <article className="prose mt-8 dark:prose-invert">
        <CustomMDX source={til.content} />
      </article>
    </section>
  )
}
