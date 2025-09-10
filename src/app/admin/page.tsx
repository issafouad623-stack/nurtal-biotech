'use client';

import { useState, useEffect } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import Link from 'next/link';
import { 
  FileText, 
  Plus, 
  Eye, 
  TrendingUp, 
  Users, 
  Calendar,
  BarChart3
} from 'lucide-react';

interface DashboardStats {
  totalArticles: number;
  publishedArticles: number;
  draftArticles: number;
  featuredArticles: number;
}

const AdminDashboard = () => {
  const [stats, setStats] = useState<DashboardStats>({
    totalArticles: 0,
    publishedArticles: 0,
    draftArticles: 0,
    featuredArticles: 0,
  });
  const [recentArticles, setRecentArticles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const response = await fetch('/api/articles');
      const articles = await response.json();
      
      const totalArticles = articles.length;
      const publishedArticles = articles.filter((a: any) => a.status === 'published').length;
      const draftArticles = articles.filter((a: any) => a.status === 'draft').length;
      const featuredArticles = articles.filter((a: any) => a.featured).length;
      
      setStats({
        totalArticles,
        publishedArticles,
        draftArticles,
        featuredArticles,
      });
      
      setRecentArticles(articles.slice(0, 5));
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    {
      title: 'Total Articles',
      value: stats.totalArticles,
      icon: FileText,
      color: '#38bdf8',
      bgColor: 'rgba(14, 165, 233, 0.1)',
    },
    {
      title: 'Published',
      value: stats.publishedArticles,
      icon: Eye,
      color: '#4ade80',
      bgColor: 'rgba(34, 197, 94, 0.1)',
    },
    {
      title: 'Drafts',
      value: stats.draftArticles,
      icon: FileText,
      color: '#fbbf24',
      bgColor: 'rgba(251, 191, 36, 0.1)',
    },
    {
      title: 'Featured',
      value: stats.featuredArticles,
      icon: TrendingUp,
      color: '#e879f9',
      bgColor: 'rgba(217, 70, 239, 0.1)',
    },
  ];

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
      <div className="space-y-8">
        {/* Welcome Section */}
        <div>
          <h1 style={{ color: '#ffffff' }} className="text-3xl font-bold mb-2">
            Welcome back!
          </h1>
          <p style={{ color: '#94a3b8' }}>
            Here's what's happening with your content today.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {statCards.map((stat) => (
            <div
              key={stat.title}
              className="p-6 rounded-xl border"
              style={{ 
                backgroundColor: '#111111',
                borderColor: '#333333'
              }}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p style={{ color: '#94a3b8' }} className="text-sm font-medium">
                    {stat.title}
                  </p>
                  <p style={{ color: '#ffffff' }} className="text-3xl font-bold mt-1">
                    {stat.value}
                  </p>
                </div>
                <div
                  className="p-3 rounded-lg"
                  style={{ backgroundColor: stat.bgColor }}
                >
                  <stat.icon className="w-6 h-6" style={{ color: stat.color }} />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Quick Actions Card */}
          <div
            className="p-6 rounded-xl border"
            style={{ 
              backgroundColor: '#111111',
              borderColor: '#333333'
            }}
          >
            <h3 style={{ color: '#ffffff' }} className="text-xl font-bold mb-4">
              Quick Actions
            </h3>
            <div className="space-y-3">
              <Link
                href="/admin/articles/new"
                className="flex items-center space-x-3 p-3 rounded-lg transition-colors hover:bg-blue-500/10"
                style={{ color: '#cbd5e1' }}
              >
                <Plus className="w-5 h-5" style={{ color: '#38bdf8' }} />
                <span>Create New Article</span>
              </Link>
              <Link
                href="/admin/articles"
                className="flex items-center space-x-3 p-3 rounded-lg transition-colors hover:bg-blue-500/10"
                style={{ color: '#cbd5e1' }}
              >
                <FileText className="w-5 h-5" style={{ color: '#38bdf8' }} />
                <span>Manage Articles</span>
              </Link>
              <Link
                href="/admin/analytics"
                className="flex items-center space-x-3 p-3 rounded-lg transition-colors hover:bg-blue-500/10"
                style={{ color: '#cbd5e1' }}
              >
                <BarChart3 className="w-5 h-5" style={{ color: '#38bdf8' }} />
                <span>View Analytics</span>
              </Link>
            </div>
          </div>

          {/* Recent Articles */}
          <div
            className="p-6 rounded-xl border"
            style={{ 
              backgroundColor: '#111111',
              borderColor: '#333333'
            }}
          >
            <h3 style={{ color: '#ffffff' }} className="text-xl font-bold mb-4">
              Recent Articles
            </h3>
            <div className="space-y-3">
              {recentArticles.length > 0 ? (
                recentArticles.map((article) => (
                  <Link
                    key={article.id}
                    href={`/admin/articles/${article.id}/edit`}
                    className="block p-3 rounded-lg transition-colors hover:bg-gray-500/10"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 style={{ color: '#ffffff' }} className="font-medium truncate">
                          {article.title}
                        </h4>
                        <p style={{ color: '#94a3b8' }} className="text-sm">
                          {new Date(article.updatedAt).toLocaleDateString()}
                        </p>
                      </div>
                      <span
                        className="px-2 py-1 rounded-full text-xs"
                        style={{
                          backgroundColor: article.status === 'published' 
                            ? 'rgba(34, 197, 94, 0.2)' 
                            : 'rgba(251, 191, 36, 0.2)',
                          color: article.status === 'published' ? '#4ade80' : '#fbbf24'
                        }}
                      >
                        {article.status}
                      </span>
                    </div>
                  </Link>
                ))
              ) : (
                <p style={{ color: '#94a3b8' }} className="text-center py-4">
                  No articles yet. Create your first article!
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;