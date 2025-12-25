import Link from 'next/link'
import { formatDate, getSeriesList } from 'app/blog/utils'

export const metadata = {
  title: 'Series',
  description: 'Deep dives, devlogs, and thematic collections.',
}

export default function SeriesIndexPage() {
  let series = getSeriesList()

  return (
    <section>
      <h1 className="text-2xl font-semibold uppercase tracking-[0.15em]">
        Series
      </h1>
      <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
        Multi-part explorations and devlogs grouped by theme.
      </p>

      {series.length === 0 ? (
        <p className="mt-8 text-sm text-neutral-500 dark:text-neutral-400">
          No series just yet—new collections will appear here automatically.
        </p>
      ) : (
        <div className="mt-8 divide-y divide-dashed divide-neutral-200 dark:divide-neutral-800">
          {series.map((entry) => {
            let intro =
              entry.posts[0]?.metadata.summary ??
              `A ${entry.posts.length}-part series.`
            return (
              <article key={entry.slug} className="py-5">
                <div className="flex flex-wrap items-center justify-between text-[11px] uppercase tracking-[0.2em] text-neutral-500 dark:text-neutral-400">
                  <span>{entry.posts.length} parts</span>
                  <span>{formatDate(entry.latestPublishedAt)}</span>
                </div>
                <Link href={`/series/${entry.slug}`} className="mt-3 block">
                  <h2 className="text-xl font-semibold text-neutral-900 transition hover:text-blue-600 dark:text-neutral-50 dark:hover:text-blue-300">
                    {entry.title}
                  </h2>
                </Link>
                <p className="mt-2 text-sm text-neutral-700 dark:text-neutral-300">
                  {intro}
                </p>
              </article>
            )
          })}
        </div>
      )}
    </section>
  )
}
