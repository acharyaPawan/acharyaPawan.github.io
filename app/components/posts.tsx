import Link from "next/link";
import { formatDate, getPublishedBlogPosts } from "app/blog/utils";

type BlogPostsProps = {
  variant?: "home" | "blog";
};

export function BlogPosts({ variant = "blog" }: BlogPostsProps) {
  let posts = getPublishedBlogPosts().sort((a, b) => {
    return (
      new Date(b.metadata.publishedAt).getTime() -
      new Date(a.metadata.publishedAt).getTime()
    );
  });

  const hasNoPosts = posts.length === 0;
  if (hasNoPosts) {
    return <p>No blog posts. Maybe checkin latter.</p>;
  }

  return (
    <div className="divide-y divide-dashed divide-neutral-200 dark:divide-neutral-800">
      {posts.map((post) =>
        variant === "home" ? (
          <HomePostItem key={post.slug} {...post.metadata} slug={post.slug} />
        ) : (
          <BlogListItem key={post.slug} {...post.metadata} slug={post.slug} />
        )
      )}
    </div>
  );
}

type BlogItemProps = {
  slug: string;
  title: string;
  publishedAt: string;
  summary?: string;
  tags?: string[];
  series?: string;
  seriesSlug?: string;
};

function HomePostItem({ slug, title, publishedAt }: BlogItemProps) {
  return (
    <article className="py-3">
      <p className="text-[12px] uppercase tracking-[0.2em] text-neutral-500 dark:text-neutral-500">
        {formatDate(publishedAt, false)}
      </p>
      <Link
        href={`/blog/${slug}`}
        className="text-lg font-semibold text-neutral-900 transition hover:text-blue-600 dark:text-neutral-50 dark:hover:text-blue-300"
      >
        {title}
      </Link>
    </article>
  );
}

function BlogListItem({
  slug,
  title,
  publishedAt,
  summary,
  tags,
  series,
  seriesSlug,
}: BlogItemProps) {
  let hasTags = tags && tags.length > 0;

  return (
    <article className="py-5">
      <div className="flex flex-col gap-1 text-[12px] uppercase tracking-[0.2em] text-neutral-500 dark:text-neutral-400">
        <span>{formatDate(publishedAt, false)}</span>
        {series && seriesSlug ? (
          <Link
            href={`/series/${seriesSlug}`}
            className="text-[11px] font-semibold text-neutral-600 transition hover:text-blue-600 dark:text-neutral-400 dark:hover:text-blue-300"
          >
            {series}
          </Link>
        ) : null}
      </div>
      <Link
        href={`/blog/${slug}`}
        className="mt-3 block text-xl font-semibold text-neutral-900 transition hover:text-blue-600 dark:text-neutral-50 dark:hover:text-blue-300"
      >
        {title}
      </Link>
      {summary ? (
        <p className="mt-2 text-sm text-neutral-700 dark:text-neutral-300">
          {summary}
        </p>
      ) : null}
      {hasTags ? (
        <p className="mt-3 text-xs text-neutral-500 dark:text-neutral-400">
          {tags!.map((tag) => `#${tag}`).join("  ")}
        </p>
      ) : null}
    </article>
  );
}
