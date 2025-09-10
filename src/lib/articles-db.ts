import fs from 'fs';
import path from 'path';

export interface Article {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  publishedAt: string;
  updatedAt: string;
  imageUrl?: string;
  videoUrl?: string;
  category: 'AI' | 'Biotechnology' | 'Research' | 'Innovation' | 'Startup';
  tags: string[];
  readTime: number;
  featured: boolean;
  slug: string;
  status: 'draft' | 'published';
}

const DB_FILE = path.join(process.cwd(), 'data', 'articles.json');

// Ensure data directory exists
function ensureDataDir() {
  const dataDir = path.dirname(DB_FILE);
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
}

// Load articles from JSON file
export function loadArticles(): Article[] {
  ensureDataDir();
  try {
    if (fs.existsSync(DB_FILE)) {
      const data = fs.readFileSync(DB_FILE, 'utf8');
      return JSON.parse(data);
    }
    return [];
  } catch (error) {
    console.error('Error loading articles:', error);
    return [];
  }
}

// Save articles to JSON file
export function saveArticles(articles: Article[]): void {
  ensureDataDir();
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(articles, null, 2));
  } catch (error) {
    console.error('Error saving articles:', error);
    throw new Error('Failed to save articles');
  }
}

// Generate slug from title
export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

// Calculate read time (words per minute)
export function calculateReadTime(content: string): number {
  const wordsPerMinute = 200;
  const wordCount = content.split(/\s+/).length;
  return Math.ceil(wordCount / wordsPerMinute);
}

// Generate unique ID
export function generateId(): string {
  return Date.now().toString() + Math.random().toString(36).substr(2, 9);
}

// CRUD Operations
export function getAllArticles(): Article[] {
  return loadArticles().sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
}

export function getPublishedArticles(): Article[] {
  return loadArticles()
    .filter(article => article.status === 'published')
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
}

export function getArticleById(id: string): Article | null {
  const articles = loadArticles();
  return articles.find(article => article.id === id) || null;
}

export function getArticleBySlug(slug: string): Article | null {
  const articles = loadArticles();
  return articles.find(article => article.slug === slug) || null;
}

export function createArticle(articleData: Omit<Article, 'id' | 'publishedAt' | 'updatedAt' | 'slug' | 'readTime'>): Article {
  const articles = loadArticles();
  const now = new Date().toISOString();
  
  const article: Article = {
    id: generateId(),
    ...articleData,
    slug: generateSlug(articleData.title),
    readTime: calculateReadTime(articleData.content),
    publishedAt: now,
    updatedAt: now,
  };

  // Ensure slug is unique
  let counter = 1;
  let originalSlug = article.slug;
  while (articles.some(a => a.slug === article.slug)) {
    article.slug = `${originalSlug}-${counter}`;
    counter++;
  }

  articles.push(article);
  saveArticles(articles);
  return article;
}

export function updateArticle(id: string, updates: Partial<Omit<Article, 'id' | 'publishedAt'>>): Article | null {
  const articles = loadArticles();
  const index = articles.findIndex(article => article.id === id);
  
  if (index === -1) return null;

  const updatedArticle = {
    ...articles[index],
    ...updates,
    updatedAt: new Date().toISOString(),
  };

  // Update slug if title changed
  if (updates.title && updates.title !== articles[index].title) {
    updatedArticle.slug = generateSlug(updates.title);
    
    // Ensure slug is unique
    let counter = 1;
    let originalSlug = updatedArticle.slug;
    while (articles.some((a, i) => i !== index && a.slug === updatedArticle.slug)) {
      updatedArticle.slug = `${originalSlug}-${counter}`;
      counter++;
    }
  }

  // Update read time if content changed
  if (updates.content) {
    updatedArticle.readTime = calculateReadTime(updates.content);
  }

  articles[index] = updatedArticle;
  saveArticles(articles);
  return updatedArticle;
}

export function deleteArticle(id: string): boolean {
  const articles = loadArticles();
  const index = articles.findIndex(article => article.id === id);
  
  if (index === -1) return false;

  articles.splice(index, 1);
  saveArticles(articles);
  return true;
}
