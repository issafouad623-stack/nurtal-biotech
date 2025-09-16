'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { Clock, User, Tag, ArrowRight } from 'lucide-react';
import { Article } from '@/lib/articles-db';
import { formatDate, formatReadTime, getCategoryColor, truncateText } from '@/lib/utils';

interface ArticleCardProps {
  article: Article;
  variant?: 'default' | 'featured' | 'compact';
}

const ArticleCard = ({ article, variant = 'default' }: ArticleCardProps) => {
  const isFeatured = variant === 'featured';
  const isCompact = variant === 'compact';

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
      className={`group bg-secondary-800 rounded-xl overflow-hidden shadow-2xl hover:shadow-primary-500/10 transition-all duration-300 border border-secondary-700 ${
        isFeatured ? 'lg:col-span-2' : ''
      }`}
    >
      <Link href={`/articles/${article.slug}`} className="block">
        {/* Image */}
        <div className={`relative overflow-hidden ${isFeatured ? 'h-80' : 'h-48'} ${!article.imageUrl ? 'bg-secondary-700' : ''}`}>
          {article.imageUrl ? (
            <Image
              src={article.imageUrl}
              alt={article.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <div className="text-secondary-500 text-center">
                <div className="w-16 h-16 mx-auto mb-2 rounded-lg bg-secondary-600 flex items-center justify-center">
                  <Tag className="w-8 h-8" />
                </div>
                <span className="text-sm">No Image</span>
              </div>
            </div>
          )}
          
          {/* Category Badge */}
          <div className="absolute top-4 left-4">
            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium text-white ${getCategoryColor(article.category)}`}>
              {article.category}
            </span>
          </div>
          
          {/* Featured Badge */}
          {article.featured && (
            <div className="absolute top-4 right-4">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-accent-500 text-white">
                Featured
              </span>
            </div>
          )}
          
          {/* Video Indicator */}
          {article.video_url && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center">
                <div className="w-0 h-0 border-l-[12px] border-l-primary-600 border-t-[8px] border-t-transparent border-b-[8px] border-b-transparent ml-1"></div>
              </div>
            </div>
          )}
        </div>

        {/* Content */}
        <div className={`p-6 ${isCompact ? 'p-4' : ''}`}>
          <div className="space-y-3">
            {/* Meta Information */}
            <div className="flex items-center justify-between text-sm text-secondary-400">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-1">
                  <Clock className="w-4 h-4" />
                  <span>{formatReadTime(article.read_time)}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <User className="w-4 h-4" />
                  <span>{article.author}</span>
                </div>
              </div>
              <time dateTime={article.published_at} className="text-xs">
                {formatDate(article.published_at)}
              </time>
            </div>

            {/* Title */}
            <h3 className={`font-display font-bold text-white group-hover:text-primary-400 transition-colors ${
              isFeatured ? 'text-2xl' : isCompact ? 'text-lg' : 'text-xl'
            }`}>
              {truncateText(article.title, isCompact ? 60 : 80)}
            </h3>

            {/* Excerpt */}
            {!isCompact && (
              <p className="text-secondary-300 leading-relaxed">
                {truncateText(article.excerpt, 120)}
              </p>
            )}

            {/* Tags */}
            {article.tags.length > 0 && (
              <div className="flex items-center space-x-2 pt-2">
                <Tag className="w-4 h-4 text-secondary-500" />
                <div className="flex flex-wrap gap-1">
                  {article.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="inline-block px-2 py-1 text-xs bg-secondary-700 text-secondary-300 rounded-md"
                    >
                      {tag}
                    </span>
                  ))}
                  {article.tags.length > 3 && (
                    <span className="inline-block px-2 py-1 text-xs bg-secondary-700 text-secondary-300 rounded-md">
                      +{article.tags.length - 3}
                    </span>
                  )}
                </div>
              </div>
            )}

            {/* Read More */}
            <div className="flex items-center justify-between pt-4">
              <span className="text-primary-400 font-medium text-sm group-hover:text-primary-300 transition-colors">
                Read Article
              </span>
              <ArrowRight className="w-4 h-4 text-primary-400 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>
      </Link>
    </motion.article>
  );
};

export default ArticleCard;
