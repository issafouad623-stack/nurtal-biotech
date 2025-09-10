import Link from 'next/link';
import Image from 'next/image';
import { getPublishedArticles } from '@/lib/supabase-db';

export const dynamic = 'force-dynamic';

export default async function ArticlesPage() {
  const articles = await getPublishedArticles();

  return (
    <main className="min-h-screen bg-secondary-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-8">All Articles</h1>
        {articles.length === 0 ? (
          <p className="text-secondary-300">No articles yet. Create your first article in the admin panel.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((article) => (
              <Link
                key={article.id}
                href={`/articles/${article.slug}`}
                className="block bg-secondary-800 border border-secondary-700 rounded-xl overflow-hidden hover:border-primary-500 transition-colors"
              >
                {article.image_url && (
                  <div className="relative w-full h-48">
                    <Image
                      src={article.image_url}
                      alt={article.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <div className="text-sm text-secondary-400">
                      {new Date(article.published_at).toLocaleDateString()}
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-xs px-2 py-1 bg-primary-500/20 text-primary-400 rounded-full">
                        {article.category}
                      </span>
                      {article.featured && (
                        <span className="text-xs px-2 py-1 bg-purple-500/20 text-purple-400 rounded-full">
                          Featured
                        </span>
                      )}
                    </div>
                  </div>
                  <h2 className="font-display text-xl font-bold text-white mb-2 line-clamp-2">
                    {article.title}
                  </h2>
                  <p className="text-secondary-300 line-clamp-3 mb-3">{article.excerpt}</p>
                  <div className="flex items-center justify-between text-sm text-secondary-400">
                    <span>By {article.author}</span>
                    <span>{article.read_time} min read</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}


