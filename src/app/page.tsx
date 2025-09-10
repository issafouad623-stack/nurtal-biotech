'use client';

import { useState, useEffect } from 'react';
import Navigation from '@/components/Navigation';
import HeroSection from '@/components/HeroSection';
import ArticleCard from '@/components/ArticleCard';
import Footer from '@/components/Footer';
import { Article } from '@/lib/articles-db';
import { motion } from 'framer-motion';
import { TrendingUp, Zap, BookOpen, Users, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    try {
      const response = await fetch('/api/articles');
      const data = await response.json();
      setArticles(data.filter((article: Article) => article.status === 'published'));
    } catch (error) {
      console.error('Error fetching articles:', error);
    } finally {
      setLoading(false);
    }
  };

  const featuredArticles = articles.filter(article => article.featured);
  const recentArticles = articles.slice(0, 6);

  return (
    <main style={{ backgroundColor: '#000000', minHeight: '100vh' }}>
      <Navigation />
      <HeroSection />
      
      {/* Featured Articles Section */}
      <section style={{ backgroundColor: '#111111', padding: '4rem 0' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 style={{ color: '#ffffff' }} className="font-display text-3xl lg:text-4xl font-bold mb-4">
              Featured Articles
            </h2>
            <p style={{ color: '#cbd5e1' }} className="text-lg max-w-2xl mx-auto">
              Discover the most groundbreaking developments in biotechnology and artificial intelligence
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8 mb-12">
            {loading ? (
              // Loading skeleton
              Array.from({ length: 2 }).map((_, index) => (
                <div
                  key={index}
                  className="bg-secondary-800 rounded-xl overflow-hidden animate-pulse"
                >
                  <div className="h-80 bg-secondary-700"></div>
                  <div className="p-6 space-y-3">
                    <div className="h-4 bg-secondary-700 rounded w-1/4"></div>
                    <div className="h-6 bg-secondary-700 rounded w-3/4"></div>
                    <div className="h-4 bg-secondary-700 rounded w-full"></div>
                    <div className="h-4 bg-secondary-700 rounded w-2/3"></div>
                  </div>
                </div>
              ))
            ) : featuredArticles.length > 0 ? (
              featuredArticles.map((article, index) => (
                <motion.div
                  key={article.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <ArticleCard article={article} variant="featured" />
                </motion.div>
              ))
            ) : (
              <div className="lg:col-span-2 text-center py-12">
                <p style={{ color: '#cbd5e1' }} className="text-lg">
                  No featured articles yet. Create your first article in the admin panel!
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section style={{ background: 'linear-gradient(to bottom right, #000000, #1a1a1a)', padding: '4rem 0' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 style={{ color: '#ffffff' }} className="font-display text-3xl lg:text-4xl font-bold mb-4">
              Explore Categories
            </h2>
            <p style={{ color: '#cbd5e1' }} className="text-lg">
              Dive deep into specific areas of biotechnology and AI
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { name: 'AI & Machine Learning', icon: Zap, color: 'from-purple-500 to-pink-500', count: 45 },
              { name: 'Biotechnology', icon: BookOpen, color: 'from-blue-500 to-cyan-500', count: 38 },
              { name: 'Research & Development', icon: TrendingUp, color: 'from-green-500 to-emerald-500', count: 52 },
              { name: 'Innovation', icon: Zap, color: 'from-orange-500 to-red-500', count: 29 },
              { name: 'Startups & Funding', icon: Users, color: 'from-indigo-500 to-purple-500', count: 33 },
              { name: 'Clinical Trials', icon: BookOpen, color: 'from-teal-500 to-blue-500', count: 41 },
            ].map((category, index) => (
              <motion.div
                key={category.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="group"
              >
                <Link href={`/category/${category.name.toLowerCase().replace(/\s+/g, '-')}`}>
                  <div style={{ backgroundColor: '#111111', border: '1px solid #333333' }} className="rounded-xl p-6 shadow-2xl hover:shadow-blue-500/10 transition-all duration-300">
                    <div className={`w-12 h-12 bg-gradient-to-r ${category.color} rounded-lg flex items-center justify-center mb-4`}>
                      <category.icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 style={{ color: '#ffffff' }} className="font-display text-xl font-bold mb-2 group-hover:text-blue-400 transition-colors">
                      {category.name}
                    </h3>
                    <p style={{ color: '#94a3b8' }} className="mb-4">
                      {category.count} articles available
                    </p>
                    <div style={{ color: '#38bdf8' }} className="flex items-center font-medium group-hover:text-blue-300 transition-colors">
                      <span>Explore</span>
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Latest Articles Section */}
      <section style={{ backgroundColor: '#111111', padding: '4rem 0' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 style={{ color: '#ffffff' }} className="font-display text-3xl lg:text-4xl font-bold">
                Latest Articles
              </h2>
              <p style={{ color: '#cbd5e1' }} className="text-lg mt-2">
                Stay updated with the newest developments
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Link
                href="/articles"
                style={{ background: 'linear-gradient(to right, #0ea5e9, #d946ef)', color: '#ffffff' }} className="inline-flex items-center px-6 py-3 font-semibold rounded-lg hover:shadow-2xl hover:shadow-blue-500/25 transition-all duration-300 transform hover:scale-105"
              >
                View All Articles
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {loading ? (
              // Loading skeleton
              Array.from({ length: 6 }).map((_, index) => (
                <div
                  key={index}
                  className="bg-secondary-800 rounded-xl overflow-hidden animate-pulse"
                >
                  <div className="h-48 bg-secondary-700"></div>
                  <div className="p-6 space-y-3">
                    <div className="h-4 bg-secondary-700 rounded w-1/4"></div>
                    <div className="h-5 bg-secondary-700 rounded w-3/4"></div>
                    <div className="h-4 bg-secondary-700 rounded w-full"></div>
                    <div className="h-4 bg-secondary-700 rounded w-2/3"></div>
                  </div>
                </div>
              ))
            ) : recentArticles.length > 0 ? (
              recentArticles.map((article, index) => (
                <motion.div
                  key={article.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <ArticleCard article={article} />
                </motion.div>
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <p style={{ color: '#cbd5e1' }} className="text-lg">
                  No articles yet. Create your first article in the admin panel!
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section style={{ background: 'linear-gradient(to right, #0c4a6e, #701a75)', padding: '4rem 0' }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <h2 style={{ color: '#ffffff' }} className="font-display text-3xl lg:text-4xl font-bold">
              Stay Informed
            </h2>
            <p style={{ color: '#e2e8f0' }} className="text-xl max-w-2xl mx-auto">
              Get the latest biotechnology and AI news delivered directly to your inbox. 
              Never miss a breakthrough.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)', color: '#ffffff', border: 'none' }} className="flex-1 px-4 py-3 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none backdrop-blur-sm"
              />
              <button style={{ backgroundColor: '#ffffff', color: '#0ea5e9' }} className="px-8 py-3 font-semibold rounded-lg hover:bg-gray-100 transition-colors">
                Subscribe
              </button>
            </div>
            
            <p style={{ color: '#cbd5e1' }} className="text-sm">
              Join 50,000+ professionals staying ahead of the curve
            </p>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
