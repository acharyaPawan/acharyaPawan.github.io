import fs from 'fs'
import path from 'path'
import { loadFrontmatter } from 'app/blog/utils'

export type TILMetadata = {
  title: string
  publishedAt: string
  summary: string
  tags?: string[]
  status?: 'draft' | 'published'
}

export type TILPost = {
  metadata: TILMetadata
  slug: string
  content: string
}

function parseTILFrontmatter(fileContent: string) {
  let { raw, content } = loadFrontmatter(fileContent)

  let metadata: TILMetadata = {
    title: String(raw.title ?? ''),
    publishedAt: String(raw.publishedAt ?? ''),
    summary: String(raw.summary ?? ''),
    tags: Array.isArray(raw.tags) ? raw.tags.map(String) : undefined,
    status: (raw.status as TILMetadata['status']) ?? 'published',
  }

  return { metadata, content }
}

function getMDXFiles(dir: string) {
  if (!fs.existsSync(dir)) {
    return []
  }
  return fs.readdirSync(dir).filter((file) => path.extname(file) === '.mdx')
}

function readMDXFile(filePath: string) {
  let rawContent = fs.readFileSync(filePath, 'utf-8')
  return parseTILFrontmatter(rawContent)
}

function getMDXData(dir: string): TILPost[] {
  let mdxFiles = getMDXFiles(dir)
  return mdxFiles.map((file) => {
    let { metadata, content } = readMDXFile(path.join(dir, file))
    let slug = path.basename(file, path.extname(file))

    return {
      metadata,
      slug,
      content,
    }
  })
}

export function getTILPosts(): TILPost[] {
  let tilDir = path.join(process.cwd(), 'app', 'til', 'posts')
  if (!fs.existsSync(tilDir)) {
    return []
  }
  return getMDXData(tilDir)
}

export function getPublishedTILPosts(): TILPost[] {
  return getTILPosts().filter(
    (til) => (til.metadata.status ?? 'published') === 'published'
  )
}

export function getTILBySlug(slug: string) {
  return getTILPosts().find((til) => til.slug === slug)
}
