import { BlogPosts } from 'app/components/posts'

export const metadata = {
  title: 'Blog',
  description: 'Read my blog.',
}

export default function Page() {
  return (
    <section>
      <h1 className="mb-6 text-2xl font-semibold uppercase tracking-[0.15em]">
        Blog
      </h1>
      <BlogPosts />
    </section>
  )
}
