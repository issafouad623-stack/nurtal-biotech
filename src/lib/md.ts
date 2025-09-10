import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

export interface MarkdownArticleMeta {
  title: string;
  date: string; // ISO string
  excerpt?: string;
  author?: string;
  category?: string;
  tags?: string[];
  image?: string; // optional cover image URL or path
}

export interface MarkdownArticle extends MarkdownArticleMeta {
  slug: string;
  contentHtml: string;
}

const contentDirectory = path.join(process.cwd(), 'content', 'articles');

export function getArticleSlugs(): string[] {
  if (!fs.existsSync(contentDirectory)) {
    return [];
  }
  return fs
    .readdirSync(contentDirectory)
    .filter((file) => file.endsWith('.md') || file.endsWith('.mdx'))
    .map((file) => file.replace(/\.(md|mdx)$/i, ''));
}

export async function getArticleBySlug(slug: string): Promise<MarkdownArticle | null> {
  const fullPathMd = path.join(contentDirectory, `${slug}.md`);
  const fullPathMdx = path.join(contentDirectory, `${slug}.mdx`);
  const fullPath = fs.existsSync(fullPathMd) ? fullPathMd : fullPathMdx;
  if (!fullPath || !fs.existsSync(fullPath)) {
    return null;
  }
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  const processedContent = await remark().use(html).process(content);
  const contentHtml = processedContent.toString();

  const meta = data as Partial<MarkdownArticleMeta>;
  return {
    slug,
    title: meta.title ?? slug,
    date: meta.date ?? new Date().toISOString(),
    excerpt: meta.excerpt ?? '',
    author: meta.author ?? 'Nurtal Team',
    category: meta.category ?? 'Biotechnology',
    tags: Array.isArray(meta.tags) ? meta.tags : [],
    image: meta.image,
    contentHtml,
  };
}

export async function getAllArticles(): Promise<MarkdownArticle[]> {
  const slugs = getArticleSlugs();
  const articles = await Promise.all(slugs.map((slug) => getArticleBySlug(slug)));
  return (articles.filter(Boolean) as MarkdownArticle[]).sort((a, b) =>
    new Date(b.date).getTime() - new Date(a.date).getTime(),
  );
}


