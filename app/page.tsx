import { BlogPosts } from 'app/components/posts'

export default function Page() {
  return (
    <section>
      <h1 className="mb-6 text-2xl font-semibold uppercase tracking-[0.15em]">
        My Portfolio
      </h1>
      <p className="mb-8 text-sm text-neutral-600 dark:text-neutral-400">
        {`Fullstack engineer writing about distributed systems, cli ergonomics, and day-to-day learnings.`}
      </p>
      <div className="my-8">
        <BlogPosts variant="home" />
      </div>
    </section>
  )
}
