import Link from "next/link";
import { notFound } from "next/navigation";
import { CustomMDX } from "app/components/mdx";
import {
  formatDate,
  getBlogPosts,
  getSeriesBySlug,
  type Reference,
  type SeriesSummary,
} from "app/blog/utils";
import { baseUrl } from "app/sitemap";

export const dynamic = "force-static";
export const dynamicParams = false;

export async function generateStaticParams() {
  let posts = getBlogPosts();
  if (!posts || posts.length === 0) {
    return [
      {
        slug: "not-found",
      },
    ];
  }

  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export function generateMetadata({ params }) {
  let post = getBlogPosts().find((post) => post.slug === params.slug);
  if (!post) {
    return;
  }

  let {
    title,
    publishedAt: publishedTime,
    summary: description,
    image,
    coverImage,
    updatedAt,
    tags,
    canonicalUrl,
  } = post.metadata;
  let ogImage =
    image || coverImage
      ? image ?? coverImage
      : `${baseUrl}/og?title=${encodeURIComponent(title)}`;
  let modifiedTime = updatedAt ?? publishedTime;
  let canonical = canonicalUrl ?? `${baseUrl}/blog/${post.slug}`;

  return {
    title,
    description,
    alternates: {
      canonical,
    },
    openGraph: {
      title,
      description,
      type: "article",
      publishedTime,
      modifiedTime,
      url: `${baseUrl}/blog/${post.slug}`,
      images: [
        {
          url: ogImage,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
    keywords: tags,
  };
}

export default function Blog({ params }) {
  let post = getBlogPosts().find((post) => post.slug === params.slug);

  if (!post) {
    notFound();
  }

  let ogImage = post.metadata.image ?? post.metadata.coverImage;
  let dateModified = post.metadata.updatedAt ?? post.metadata.publishedAt;
  let seriesDetails = post.metadata.seriesSlug
    ? getSeriesBySlug(post.metadata.seriesSlug)
    : undefined;
  let references = post.metadata.references ?? [];

  return (
    <section>
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: post.metadata.title,
            datePublished: post.metadata.publishedAt,
            dateModified,
            description: post.metadata.summary,
            image: ogImage
              ? ogImage
              : `${baseUrl}/og?title=${encodeURIComponent(
                  post.metadata.title
                )}`,
            url: `${baseUrl}/blog/${post.slug}`,
            keywords: post.metadata.tags,
            author: {
              "@type": "Person",
              name: "My Portfolio",
            },
          }),
        }}
      />

      <header className="mb-8 space-y-4">
        <h1 className="title text-3xl font-semibold tracking-tighter">
          {post.metadata.title}
        </h1>
        <div className="flex flex-wrap gap-4 text-sm text-neutral-600 dark:text-neutral-400">
          <span>Published {formatDate(post.metadata.publishedAt)}</span>
          {post.metadata.updatedAt &&
          post.metadata.updatedAt !== post.metadata.publishedAt ? (
            <span>Updated {formatDate(post.metadata.updatedAt)}</span>
          ) : null}
          {post.metadata.readingTime ? (
            <span>{post.metadata.readingTime} min read</span>
          ) : null}
          {post.metadata.type ? <span>{post.metadata.type}</span> : null}
        </div>
        {post.metadata.tags && post.metadata.tags.length > 0 ? (
          <p className="text-xs uppercase tracking-[0.2em] text-neutral-500 dark:text-neutral-400">
            {post.metadata.tags.map((tag) => `#${tag}`).join("  ")}
          </p>
        ) : null}
        {seriesDetails ? (
          <Link
            href={`/series/${seriesDetails.slug}`}
            className="inline-flex items-center gap-1 text-sm font-medium text-blue-600 transition hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300"
          >
            Part of {seriesDetails.title} ({seriesDetails.posts.length} parts)
            <span aria-hidden="true">↗</span>
          </Link>
        ) : null}
      </header>

      <article className="prose dark:prose-invert">
        <CustomMDX source={post.content} />
      </article>

      {seriesDetails ? (
        <SeriesNavigator series={seriesDetails} currentSlug={post.slug} />
      ) : null}

      {references.length > 0 ? (
        <ReferencesList references={references} />
      ) : null}
    </section>
  );
}

function SeriesNavigator({
  series,
  currentSlug,
}: {
  series: SeriesSummary;
  currentSlug: string;
}) {
  return (
    <aside className="mt-12 border-t border-dashed border-neutral-200 pt-6 dark:border-neutral-800">
      <p className="text-xs uppercase tracking-[0.2em] text-neutral-500 dark:text-neutral-400">
        Series
      </p>
      <h2 className="text-lg font-semibold text-neutral-900 dark:text-neutral-50">
        {series.title}
      </h2>
      <ol className="mt-4 space-y-2">
        {series.posts.map((seriesPost, index) => {
          let isCurrent = seriesPost.slug === currentSlug;
          return (
            <li key={seriesPost.slug}>
              <Link
                href={`/blog/${seriesPost.slug}`}
                aria-current={isCurrent ? "page" : undefined}
                className={`flex flex-col border-l-2 border-dashed pl-3 text-sm transition ${
                  isCurrent
                    ? "border-blue-600 text-blue-900 dark:border-blue-400 dark:text-blue-200"
                    : "border-neutral-200 text-neutral-700 hover:text-neutral-900 dark:border-neutral-800 dark:text-neutral-300 dark:hover:text-neutral-100"
                }`}
              >
                <span className="text-[11px] uppercase tracking-[0.2em] text-neutral-500 dark:text-neutral-400">
                  Part {index + 1} ·{" "}
                  {formatDate(seriesPost.metadata.publishedAt)}
                </span>
                <span className="font-medium text-neutral-900 dark:text-neutral-50">
                  {seriesPost.metadata.title}
                </span>
              </Link>
            </li>
          );
        })}
      </ol>
    </aside>
  );
}

function ReferencesList({ references }: { references: Reference[] }) {
  return (
    <aside className="mt-12 border-t border-dashed border-neutral-200 pt-6 dark:border-neutral-800">
      <p className="text-xs uppercase tracking-wide text-neutral-500 dark:text-neutral-400">
        References
      </p>
      <ol className="mt-4 space-y-3 list-none p-0">
        {references.map((reference, index) => {
          let label = `[${index + 1}]`;
          if (typeof reference === "string") {
            return (
              <li key={`${reference}-${index}`}>
                <p className="text-sm leading-relaxed text-neutral-700 dark:text-neutral-200">
                  <span className="font-semibold text-neutral-900 dark:text-neutral-50">
                    {label}
                  </span>{" "}
                  <a
                    href={reference}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline underline-offset-4"
                  >
                    {reference}
                  </a>
                </p>
              </li>
            );
          }

          let title = reference.title ?? reference.url;
          let metaPieces: string[] = [];
          if (reference.author) metaPieces.push(reference.author);
          if (reference.publishedAt) metaPieces.push(reference.publishedAt);
          if (reference.note) metaPieces.push(reference.note);
          if (reference.id && metaPieces.length === 0)
            metaPieces.push(reference.id);

          return (
            <li key={`${reference.url}-${reference.id ?? index}`}>
              <p className="text-sm leading-relaxed text-neutral-700 dark:text-neutral-200">
                <span className="font-semibold text-neutral-900 dark:text-neutral-50">
                  {label}
                </span>{" "}
                <a
                  href={reference.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline underline-offset-4"
                >
                  {title}
                </a>
                {metaPieces.length > 0 ? ` — ${metaPieces.join(" · ")}` : ""}
              </p>
            </li>
          );
        })}
      </ol>
    </aside>
  );
}
