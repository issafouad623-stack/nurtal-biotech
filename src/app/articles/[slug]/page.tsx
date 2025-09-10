import { notFound } from 'next/navigation';
import Image from 'next/image';
import { getArticleBySlug, getPublishedArticles } from '@/lib/supabase-db';

export async function generateStaticParams() {
  const articles = await getPublishedArticles();
  return articles.map((article) => ({ slug: article.slug }));
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  if (!article || article.status !== 'published') return notFound();

  return (
    <main className="min-h-screen bg-secondary-900">
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <header className="mb-10">
          <div className="flex items-center space-x-4 text-sm text-secondary-400 mb-4">
            <span>{new Date(article.published_at).toLocaleDateString()}</span>
            <span>•</span>
            <span>By {article.author}</span>
            <span>•</span>
            <span>{article.read_time} min read</span>
            <span>•</span>
            <span className="px-2 py-1 bg-primary-500/20 text-primary-400 rounded-full">
              {article.category}
            </span>
          </div>
          
          <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
            {article.title}
          </h1>
          
          <p className="text-xl text-secondary-300 mb-6">
            {article.excerpt}
          </p>
          
          {article.image_url && (
            <div className="relative w-full h-64 md:h-80 lg:h-96 rounded-xl overflow-hidden border border-secondary-700 mb-8">
              <Image 
                src={article.image_url} 
                alt={article.title} 
                fill 
                className="object-cover" 
              />
            </div>
          )}
          
          {article.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-8">
              {article.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-secondary-800 text-secondary-300 rounded-full text-sm"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </header>

        <div 
          className="prose prose-invert prose-headings:font-display prose-lg max-w-none"
          dangerouslySetInnerHTML={{ __html: article.content }} 
        />
        
        {article.video_url && (
          <div className="mt-8">
            <h3 className="font-display text-2xl font-bold text-white mb-4">Related Video</h3>
            <div className="relative w-full h-64 md:h-96 rounded-xl overflow-hidden border border-secondary-700">
              <iframe
                src={article.video_url}
                title={`Video for ${article.title}`}
                className="w-full h-full"
                allowFullScreen
              />
            </div>
          </div>
        )}
      </article>
    </main>
  );
}


