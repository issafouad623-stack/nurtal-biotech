import { NextRequest, NextResponse } from 'next/server';
import { getAllArticles, createArticle } from '@/lib/supabase-db';
import { isAuthenticated } from '@/lib/supabase-auth';

export async function GET() {
  try {
    const articles = await getAllArticles();
    return NextResponse.json(articles);
  } catch (error) {
    console.error('Error fetching articles:', error);
    return NextResponse.json({ error: 'Failed to fetch articles' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    // Check authentication
    const authenticated = await isAuthenticated();
    if (!authenticated) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    
    // Validate required fields
    const requiredFields = ['title', 'excerpt', 'content', 'author', 'category'];
    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json({ error: `${field} is required` }, { status: 400 });
      }
    }

    // Set defaults
    const articleData = {
      title: body.title,
      excerpt: body.excerpt,
      content: body.content,
      author: body.author,
      category: body.category,
      tags: body.tags || [],
      image_url: body.imageUrl || body.image_url,
      video_url: body.videoUrl || body.video_url,
      featured: body.featured || false,
      status: body.status || 'published' as const,
    };

    const article = await createArticle(articleData);
    
    if (!article) {
      return NextResponse.json({ error: 'Failed to create article' }, { status: 500 });
    }

    return NextResponse.json(article, { status: 201 });

  } catch (error) {
    console.error('Error creating article:', error);
    return NextResponse.json({ error: 'Failed to create article' }, { status: 500 });
  }
}
