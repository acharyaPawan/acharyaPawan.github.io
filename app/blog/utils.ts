import fs from "fs";
import path from "path";
import yaml from "js-yaml";
import { slugify } from "lib/slugify";

export type Reference =
  | string
  | {
      id?: string;
      title?: string;
      url: string;
      author?: string;
      publishedAt?: string;
      note?: string;
    };

export type Metadata = {
  title: string;
  publishedAt: string;
  summary: string;
  updatedAt?: string;
  type?: "Writing" | "Devlog" | "Note" | "Tutorial";
  status?: "draft" | "published";
  tags?: string[];
  series?: string;
  seriesSlug?: string;
  seriesOrder?: number;
  slug?: string;
  coverImage?: string;
  canonicalUrl?: string;
  readingTime?: number;
  references?: Reference[];
  related?: string[];
  image?: string;
};

export type BlogPost = {
  metadata: Metadata;
  slug: string;
  content: string;
};

export type RawFrontmatter = Record<string, unknown>;

export function loadFrontmatter(fileContent: string): {
  raw: RawFrontmatter;
  content: string;
} {
  let frontmatterRegex = /^---\s*([\s\S]*?)\s*---\s*/m;
  let match = frontmatterRegex.exec(fileContent);

  if (!match) {
    return {
      raw: {},
      content: fileContent.trim(),
    };
  }

  let frontMatterBlock = match[1];
  let content = fileContent.replace(frontmatterRegex, "").trim();
  let raw = (yaml.load(frontMatterBlock) ?? {}) as RawFrontmatter;

  return { raw, content };
}

function parseFrontmatter(fileContent: string) {
  let { raw, content } = loadFrontmatter(fileContent);
  let seriesName = raw.series ? String(raw.series) : undefined;
  let explicitSeriesSlug = raw.seriesSlug ? String(raw.seriesSlug) : undefined;
  let computedSeriesSlug = explicitSeriesSlug
    ? explicitSeriesSlug
    : seriesName
    ? slugify(seriesName)
    : undefined;

  let metadata: Metadata = {
    title: String(raw.title ?? ""),
    publishedAt: String(raw.publishedAt ?? ""),
    summary: String(raw.summary ?? ""),
    updatedAt: raw.updatedAt ? String(raw.updatedAt) : undefined,
    type: raw.type as Metadata["type"],
    status: (raw.status as Metadata["status"]) ?? "published",
    tags: Array.isArray(raw.tags) ? raw.tags.map(String) : undefined,
    series: seriesName,
    seriesSlug: computedSeriesSlug,
    seriesOrder:
      typeof raw.seriesOrder === "number"
        ? raw.seriesOrder
        : raw.seriesOrder
        ? Number(raw.seriesOrder)
        : undefined,
    slug: raw.slug ? String(raw.slug) : undefined,
    coverImage: raw.coverImage ? String(raw.coverImage) : undefined,
    canonicalUrl: raw.canonicalUrl ? String(raw.canonicalUrl) : undefined,
    readingTime:
      typeof raw.readingTime === "number"
        ? raw.readingTime
        : raw.readingTime
        ? Number(raw.readingTime)
        : undefined,
    references: Array.isArray(raw.references)
      ? raw.references.map((reference) => {
          if (typeof reference === "string") {
            return reference;
          }

          if (
            reference &&
            typeof reference === "object" &&
            typeof (reference as { url?: unknown }).url === "string"
          ) {
            let ref = reference as Record<string, unknown>;
            return {
              id: ref.id ? String(ref.id) : undefined,
              title: ref.title ? String(ref.title) : undefined,
              url: String(ref.url),
              author: ref.author ? String(ref.author) : undefined,
              publishedAt: ref.publishedAt
                ? String(ref.publishedAt)
                : undefined,
              note: ref.note ? String(ref.note) : undefined,
            };
          }

          return String(reference);
        })
      : undefined,
    related: Array.isArray(raw.related) ? raw.related.map(String) : undefined,
    image: raw.image ? String(raw.image) : undefined,
  };

  return { metadata, content };
}

function getMDXFiles(dir) {
  if (!fs.existsSync(dir)) {
    return [];
  }
  return fs.readdirSync(dir).filter((file) => path.extname(file) === ".mdx");
}

function readMDXFile(filePath) {
  let rawContent = fs.readFileSync(filePath, "utf-8");
  return parseFrontmatter(rawContent);
}

function getMDXData(dir): BlogPost[] {
  let mdxFiles = getMDXFiles(dir);
  return mdxFiles.map((file) => {
    let { metadata, content } = readMDXFile(path.join(dir, file));
    let slug = path.basename(file, path.extname(file));

    return {
      metadata,
      slug,
      content,
    };
  });
}

export function getBlogPosts(): BlogPost[] {
  return getMDXData(path.join(process.cwd(), "app", "blog", "posts"));
}

export function getPublishedBlogPosts(): BlogPost[] {
  return getBlogPosts().filter(
    (post) => (post.metadata.status ?? "published") === "published"
  );
}

export type SeriesSummary = {
  title: string;
  slug: string;
  posts: BlogPost[];
  latestPublishedAt: string;
};

function sortSeriesPosts(posts: BlogPost[]) {
  return posts.slice().sort((a, b) => {
    let orderA = a.metadata.seriesOrder;
    let orderB = b.metadata.seriesOrder;

    if (typeof orderA === "number" && typeof orderB === "number") {
      if (orderA !== orderB) {
        return orderA - orderB;
      }
    } else if (typeof orderA === "number") {
      return -1;
    } else if (typeof orderB === "number") {
      return 1;
    }

    return (
      new Date(a.metadata.publishedAt).getTime() -
      new Date(b.metadata.publishedAt).getTime()
    );
  });
}

export function getSeriesList(): SeriesSummary[] {
  try {
    let postsWithSeries = getPublishedBlogPosts().filter(
      (post) => post.metadata.series && post.metadata.seriesSlug
    );
    let collection = new Map<string, SeriesSummary>();

    postsWithSeries.forEach((post) => {
      let slug = post.metadata.seriesSlug!;
      let existing = collection.get(slug);
      if (!existing) {
        collection.set(slug, {
          title: post.metadata.series!,
          slug,
          posts: [post],
          latestPublishedAt: post.metadata.publishedAt,
        });
        return;
      }

      existing.posts.push(post);
      if (
        new Date(post.metadata.publishedAt) >
        new Date(existing.latestPublishedAt)
      ) {
        existing.latestPublishedAt = post.metadata.publishedAt;
      }
    });

    return Array.from(collection.values())
      .map((series) => ({
        ...series,
        posts: sortSeriesPosts(series.posts),
      }))
      .sort(
        (a, b) =>
          new Date(b.latestPublishedAt).getTime() -
          new Date(a.latestPublishedAt).getTime()
      );
  } catch (e) {
    console.log("Got error: ", e);
    return [];
  }
}

export function getSeriesBySlug(slug: string): SeriesSummary | undefined {
  return getSeriesList().find((series) => series.slug === slug);
}

export function formatDate(date: string, includeRelative = false) {
  let currentDate = new Date();
  if (!date.includes("T")) {
    date = `${date}T00:00:00`;
  }
  let targetDate = new Date(date);

  let yearsAgo = currentDate.getFullYear() - targetDate.getFullYear();
  let monthsAgo = currentDate.getMonth() - targetDate.getMonth();
  let daysAgo = currentDate.getDate() - targetDate.getDate();

  let formattedDate = "";

  if (yearsAgo > 0) {
    formattedDate = `${yearsAgo}y ago`;
  } else if (monthsAgo > 0) {
    formattedDate = `${monthsAgo}mo ago`;
  } else if (daysAgo > 0) {
    formattedDate = `${daysAgo}d ago`;
  } else {
    formattedDate = "Today";
  }

  let fullDate = targetDate.toLocaleString("en-us", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  if (!includeRelative) {
    return fullDate;
  }

  return `${fullDate} (${formattedDate})`;
}
