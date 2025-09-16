export interface NewsArticle {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  publishedAt: string;
  updatedAt: string;
  imageUrl: string;
  videoUrl?: string;
  category: 'AI' | 'Biotechnology' | 'Research' | 'Innovation' | 'Startup';
  tags: string[];
  readTime: number; // in minutes
  featured: boolean;
  slug: string;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  color: string;
  count: number;
}

export interface Author {
  id: string;
  name: string;
  bio: string;
  avatar: string;
  expertise: string[];
  articlesCount: number;
}

export interface Article {
  id: string;
  title: string;
  description: string;
  content: string;
  imageUrl: string;
  category: Category;
  author: Author;
  publishedAt: string;
  views: number;
  likes: number;
  comments: number;
  tags: string[];
  readTime: number;
  featured: boolean;
  slug: string;
}

export interface Article {
  id: string;
  title: string;
  description: string;
  content: string;
  imageUrl: string;
  category: Category;
  author: Author;
  publishedAt: string;
  views: number;
  likes: number;
  comments: number;
  tags: string[];
  readTime: number;
  featured: boolean;
  slug: string;
}
