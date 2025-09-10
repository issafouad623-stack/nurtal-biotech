import { supabase, supabaseAdmin, Article } from './supabase';

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
  const wordCount = content.replace(/<[^>]*>/g, '').split(/\s+/).length;
  return Math.ceil(wordCount / wordsPerMinute);
}

// CRUD Operations
export async function getAllArticles(): Promise<Article[]> {
  const { data, error } = await supabaseAdmin
    .from('articles')
    .select('*')
    .order('published_at', { ascending: false });

  if (error) {
    console.error('Error fetching articles:', error);
    return [];
  }

  return data || [];
}

export async function getPublishedArticles(): Promise<Article[]> {
  const { data, error } = await supabase
    .from('articles')
    .select('*')
    .eq('status', 'published')
    .order('published_at', { ascending: false });

  if (error) {
    console.error('Error fetching published articles:', error);
    return [];
  }

  return data || [];
}

export async function getArticleById(id: string): Promise<Article | null> {
  const { data, error } = await supabaseAdmin
    .from('articles')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error('Error fetching article by ID:', error);
    return null;
  }

  return data;
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  const { data, error } = await supabase
    .from('articles')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error) {
    console.error('Error fetching article by slug:', error);
    return null;
  }

  return data;
}

export async function createArticle(articleData: {
  title: string;
  excerpt: string;
  content: string;
  author: string;
  category: string;
  tags?: string[];
  image_url?: string;
  video_url?: string;
  featured?: boolean;
  status?: 'draft' | 'published';
}): Promise<Article | null> {
  const slug = generateSlug(articleData.title);
  const readTime = calculateReadTime(articleData.content);

  // Check if slug exists and make it unique
  let uniqueSlug = slug;
  let counter = 1;
  
  while (true) {
    const { data: existingArticle } = await supabaseAdmin
      .from('articles')
      .select('id')
      .eq('slug', uniqueSlug)
      .single();

    if (!existingArticle) break;
    
    uniqueSlug = `${slug}-${counter}`;
    counter++;
  }

  const { data, error } = await supabaseAdmin
    .from('articles')
    .insert([{
      title: articleData.title,
      excerpt: articleData.excerpt,
      content: articleData.content,
      author: articleData.author,
      category: articleData.category,
      tags: articleData.tags || [],
      image_url: articleData.image_url || null,
      video_url: articleData.video_url || null,
      featured: articleData.featured || false,
      status: articleData.status || 'published',
      slug: uniqueSlug,
      read_time: readTime,
    }])
    .select()
    .single();

  if (error) {
    console.error('Error creating article:', error);
    return null;
  }

  return data;
}

export async function updateArticle(
  id: string, 
  updates: Partial<{
    title: string;
    excerpt: string;
    content: string;
    author: string;
    category: string;
    tags: string[];
    image_url: string;
    video_url: string;
    featured: boolean;
    status: 'draft' | 'published';
  }>
): Promise<Article | null> {
  const updateData: any = { ...updates };

  // Update slug if title changed
  if (updates.title) {
    const newSlug = generateSlug(updates.title);
    
    // Make sure new slug is unique
    let uniqueSlug = newSlug;
    let counter = 1;
    
    while (true) {
      const { data: existingArticle } = await supabaseAdmin
        .from('articles')
        .select('id')
        .eq('slug', uniqueSlug)
        .neq('id', id)
        .single();

      if (!existingArticle) break;
      
      uniqueSlug = `${newSlug}-${counter}`;
      counter++;
    }
    
    updateData.slug = uniqueSlug;
  }

  // Update read time if content changed
  if (updates.content) {
    updateData.read_time = calculateReadTime(updates.content);
  }

  const { data, error } = await supabaseAdmin
    .from('articles')
    .update(updateData)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Error updating article:', error);
    return null;
  }

  return data;
}

export async function deleteArticle(id: string): Promise<boolean> {
  const { error } = await supabaseAdmin
    .from('articles')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting article:', error);
    return false;
  }

  return true;
}

// Search articles
export async function searchArticles(query: string, category?: string, status?: string): Promise<Article[]> {
  let queryBuilder = supabaseAdmin
    .from('articles')
    .select('*');

  if (query) {
    queryBuilder = queryBuilder.or(`title.ilike.%${query}%,excerpt.ilike.%${query}%,content.ilike.%${query}%`);
  }

  if (category && category !== 'all') {
    queryBuilder = queryBuilder.eq('category', category);
  }

  if (status && status !== 'all') {
    queryBuilder = queryBuilder.eq('status', status);
  }

  const { data, error } = await queryBuilder.order('published_at', { ascending: false });

  if (error) {
    console.error('Error searching articles:', error);
    return [];
  }

  return data || [];
}

