'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import AdminLayout from '@/components/admin/AdminLayout';
import { 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  Search, 
  Filter,
  Calendar,
  User,
  Tag
} from 'lucide-react';

interface Article {
  id: string;
  title: string;
  excerpt: string;
  author: string;
  published_at: string;
  updated_at: string;
  category: string;
  tags: string[];
  featured: boolean;
  status: 'draft' | 'published';
  image_url?: string;
  slug: string;
}

const ArticlesPage = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'published' | 'draft'>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    try {
      const response = await fetch('/api/articles');
      const data = await response.json();
      setArticles(data);
    } catch (error) {
      console.error('Error fetching articles:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Are you sure you want to delete "${title}"? This action cannot be undone.`)) {
      return;
    }

    try {
      const response = await fetch(`/api/articles/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setArticles(articles.filter(article => article.id !== id));
      } else {
        alert('Failed to delete article');
      }
    } catch (error) {
      console.error('Error deleting article:', error);
      alert('Failed to delete article');
    }
  };

  const filteredArticles = articles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.author.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || article.status === statusFilter;
    const matchesCategory = categoryFilter === 'all' || article.category === categoryFilter;
    
    return matchesSearch && matchesStatus && matchesCategory;
  });

  const categories = [...new Set(articles.map(article => article.category))];

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2" style={{ borderColor: '#38bdf8' }}></div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 style={{ color: '#ffffff' }} className="text-3xl font-bold">
              Articles
            </h1>
            <p style={{ color: '#94a3b8' }}>
              Manage all your published and draft articles
            </p>
          </div>
          <Link
            href="/admin/articles/new"
            className="flex items-center space-x-2 px-6 py-3 rounded-lg transition-colors hover:opacity-90"
            style={{
              background: 'linear-gradient(to right, #0ea5e9, #d946ef)',
              color: '#ffffff'
            }}
          >
            <Plus className="w-5 h-5" />
            <span>New Article</span>
          </Link>
        </div>

        {/* Filters */}
        <div
          className="p-6 rounded-xl border"
          style={{
            backgroundColor: '#111111',
            borderColor: '#333333'
          }}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5" style={{ color: '#94a3b8' }} />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-lg border focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                style={{
                  backgroundColor: '#1a1a1a',
                  borderColor: '#333333',
                  color: '#ffffff'
                }}
              />
            </div>

            {/* Status Filter */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as any)}
              className="px-4 py-3 rounded-lg border focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              style={{
                backgroundColor: '#1a1a1a',
                borderColor: '#333333',
                color: '#ffffff'
              }}
            >
              <option value="all">All Status</option>
              <option value="published">Published</option>
              <option value="draft">Draft</option>
            </select>

            {/* Category Filter */}
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="px-4 py-3 rounded-lg border focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              style={{
                backgroundColor: '#1a1a1a',
                borderColor: '#333333',
                color: '#ffffff'
              }}
            >
              <option value="all">All Categories</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Articles List */}
        <div
          className="rounded-xl border overflow-hidden"
          style={{
            backgroundColor: '#111111',
            borderColor: '#333333'
          }}
        >
          {filteredArticles.length === 0 ? (
            <div className="p-12 text-center">
              <FileText className="w-12 h-12 mx-auto mb-4" style={{ color: '#94a3b8' }} />
              <h3 style={{ color: '#ffffff' }} className="text-xl font-medium mb-2">
                No articles found
              </h3>
              <p style={{ color: '#94a3b8' }} className="mb-4">
                {articles.length === 0 
                  ? "Get started by creating your first article"
                  : "Try adjusting your search or filter criteria"
                }
              </p>
              {articles.length === 0 && (
                <Link
                  href="/admin/articles/new"
                  className="inline-flex items-center space-x-2 px-6 py-3 rounded-lg transition-colors hover:opacity-90"
                  style={{
                    background: 'linear-gradient(to right, #0ea5e9, #d946ef)',
                    color: '#ffffff'
                  }}
                >
                  <Plus className="w-5 h-5" />
                  <span>Create First Article</span>
                </Link>
              )}
            </div>
          ) : (
            <div className="divide-y" style={{ borderColor: '#333333' }}>
              {filteredArticles.map((article) => (
                <div key={article.id} className="p-6 hover:bg-gray-900/50 transition-colors">
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 style={{ color: '#ffffff' }} className="text-lg font-semibold truncate">
                          {article.title}
                        </h3>
                        <div className="flex items-center space-x-2">
                          <span
                            className="px-2 py-1 rounded-full text-xs font-medium"
                            style={{
                              backgroundColor: article.status === 'published' 
                                ? 'rgba(34, 197, 94, 0.2)' 
                                : 'rgba(251, 191, 36, 0.2)',
                              color: article.status === 'published' ? '#4ade80' : '#fbbf24'
                            }}
                          >
                            {article.status}
                          </span>
                          {article.featured && (
                            <span
                              className="px-2 py-1 rounded-full text-xs font-medium"
                              style={{
                                backgroundColor: 'rgba(217, 70, 239, 0.2)',
                                color: '#e879f9'
                              }}
                            >
                              Featured
                            </span>
                          )}
                        </div>
                      </div>
                      
                      <p style={{ color: '#94a3b8' }} className="text-sm mb-3 line-clamp-2">
                        {article.excerpt}
                      </p>
                      
                      <div className="flex items-center space-x-4 text-sm" style={{ color: '#94a3b8' }}>
                        <div className="flex items-center space-x-1">
                          <User className="w-4 h-4" />
                          <span>{article.author}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Calendar className="w-4 h-4" />
                          <span>{new Date(article.published_at).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Tag className="w-4 h-4" />
                          <span>{article.category}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2 ml-4">
                      <Link
                        href={`/articles/${article.id}`}
                        className="p-2 rounded-lg transition-colors hover:bg-blue-500/20"
                        style={{ color: '#38bdf8' }}
                        title="View Article"
                      >
                        <Eye className="w-5 h-5" />
                      </Link>
                      <Link
                        href={`/admin/articles/${article.id}/edit`}
                        className="p-2 rounded-lg transition-colors hover:bg-green-500/20"
                        style={{ color: '#4ade80' }}
                        title="Edit Article"
                      >
                        <Edit className="w-5 h-5" />
                      </Link>
                      <button
                        onClick={() => handleDelete(article.id, article.title)}
                        className="p-2 rounded-lg transition-colors hover:bg-red-500/20"
                        style={{ color: '#ef4444' }}
                        title="Delete Article"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Stats */}
        {filteredArticles.length > 0 && (
          <div className="text-center" style={{ color: '#94a3b8' }}>
            Showing {filteredArticles.length} of {articles.length} articles
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default ArticlesPage;
