'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import AdminLayout from '@/components/admin/AdminLayout';
import ImageUpload from '@/components/admin/ImageUpload';
import SimpleTextEditor from '@/components/admin/SimpleTextEditor';
import { Save, Eye, X, ArrowLeft } from 'lucide-react';

interface ArticleForm {
  title: string;
  excerpt: string;
  content: string;
  author: string;
  category: 'AI' | 'Biotechnology' | 'Research' | 'Innovation' | 'Startup';
  tags: string[];
  imageUrl: string;
  videoUrl: string;
  featured: boolean;
  status: 'draft' | 'published';
}

const EditArticlePage = () => {
  const router = useRouter();
  const params = useParams();
  const articleId = params.id as string;
  
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [tagInput, setTagInput] = useState('');
  const [formData, setFormData] = useState<ArticleForm>({
    title: '',
    excerpt: '',
    content: '',
    author: '',
    category: 'Biotechnology',
    tags: [],
    imageUrl: '',
    videoUrl: '',
    featured: false,
    status: 'draft',
  });

  useEffect(() => {
    fetchArticle();
  }, [articleId]);

  const fetchArticle = async () => {
    try {
      const response = await fetch(`/api/articles/${articleId}`);
      if (response.ok) {
        const article = await response.json();
        setFormData({
          title: article.title,
          excerpt: article.excerpt,
          content: article.content,
          author: article.author,
          category: article.category,
          tags: article.tags,
          imageUrl: article.image_url || '',
          videoUrl: article.video_url || '',
          featured: article.featured,
          status: article.status,
        });
      } else if (response.status === 404) {
        alert('Article not found');
        router.push('/admin/articles');
      } else {
        alert('Failed to load article');
      }
    } catch (error) {
      console.error('Error fetching article:', error);
      alert('Failed to load article');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: keyof ArticleForm, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleAddTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, tagInput.trim()]
      }));
      setTagInput('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const handleSubmit = async (status: 'draft' | 'published') => {
    if (!formData.title || !formData.excerpt || !formData.content) {
      alert('Please fill in all required fields');
      return;
    }

    setSaving(true);

    try {
      const response = await fetch(`/api/articles/${articleId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          status,
        }),
      });

      if (response.ok) {
        router.push('/admin/articles');
      } else {
        const error = await response.json();
        alert(error.error || 'Failed to update article');
      }
    } catch (error) {
      console.error('Error updating article:', error);
      alert('Failed to update article');
    } finally {
      setSaving(false);
    }
  };

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
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => router.push('/admin/articles')}
              className="p-2 rounded-lg transition-colors hover:bg-gray-700"
              style={{ color: '#94a3b8' }}
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
            <div>
              <h1 style={{ color: '#ffffff' }} className="text-3xl font-bold">
                Edit Article
              </h1>
              <p style={{ color: '#94a3b8' }}>
                Update your biotech news article
              </p>
            </div>
          </div>
          <button
            onClick={() => router.back()}
            className="p-2 rounded-lg transition-colors hover:bg-gray-700"
            style={{ color: '#94a3b8' }}
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Title */}
            <div>
              <label style={{ color: '#ffffff' }} className="block text-sm font-medium mb-2">
                Title *
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                className="w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                style={{
                  backgroundColor: '#111111',
                  borderColor: '#333333',
                  color: '#ffffff'
                }}
                placeholder="Enter article title..."
              />
            </div>

            {/* Excerpt */}
            <div>
              <label style={{ color: '#ffffff' }} className="block text-sm font-medium mb-2">
                Excerpt *
              </label>
              <textarea
                value={formData.excerpt}
                onChange={(e) => handleInputChange('excerpt', e.target.value)}
                rows={3}
                className="w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                style={{
                  backgroundColor: '#111111',
                  borderColor: '#333333',
                  color: '#ffffff'
                }}
                placeholder="Write a brief excerpt..."
              />
            </div>

            {/* Content */}
            <div>
              <label style={{ color: '#ffffff' }} className="block text-sm font-medium mb-2">
                Content *
              </label>
              <SimpleTextEditor
                value={formData.content}
                onChange={(content) => handleInputChange('content', content)}
              />
            </div>

            {/* Featured Image */}
            <div>
              <label style={{ color: '#ffffff' }} className="block text-sm font-medium mb-2">
                Featured Image
              </label>
              <ImageUpload
                value={formData.imageUrl}
                onChange={(url) => handleInputChange('imageUrl', url)}
                onRemove={() => handleInputChange('imageUrl', '')}
              />
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Publish Actions */}
            <div
              className="p-6 rounded-xl border"
              style={{
                backgroundColor: '#111111',
                borderColor: '#333333'
              }}
            >
              <h3 style={{ color: '#ffffff' }} className="text-lg font-bold mb-4">
                Update Article
              </h3>
              <div className="space-y-4">
                <button
                  onClick={() => handleSubmit('draft')}
                  disabled={saving}
                  className="w-full flex items-center justify-center space-x-2 px-4 py-3 rounded-lg border transition-colors hover:bg-gray-700 disabled:opacity-50"
                  style={{
                    borderColor: '#333333',
                    color: '#cbd5e1'
                  }}
                >
                  <Save className="w-5 h-5" />
                  <span>{saving ? 'Saving...' : 'Save as Draft'}</span>
                </button>
                <button
                  onClick={() => handleSubmit('published')}
                  disabled={saving}
                  className="w-full flex items-center justify-center space-x-2 px-4 py-3 rounded-lg transition-colors hover:opacity-90 disabled:opacity-50"
                  style={{
                    background: 'linear-gradient(to right, #0ea5e9, #d946ef)',
                    color: '#ffffff'
                  }}
                >
                  <Eye className="w-5 h-5" />
                  <span>{saving ? 'Updating...' : 'Update & Publish'}</span>
                </button>
              </div>
            </div>

            {/* Article Settings */}
            <div
              className="p-6 rounded-xl border"
              style={{
                backgroundColor: '#111111',
                borderColor: '#333333'
              }}
            >
              <h3 style={{ color: '#ffffff' }} className="text-lg font-bold mb-4">
                Article Settings
              </h3>
              <div className="space-y-4">
                {/* Author */}
                <div>
                  <label style={{ color: '#ffffff' }} className="block text-sm font-medium mb-2">
                    Author
                  </label>
                  <input
                    type="text"
                    value={formData.author}
                    onChange={(e) => handleInputChange('author', e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    style={{
                      backgroundColor: '#1a1a1a',
                      borderColor: '#333333',
                      color: '#ffffff'
                    }}
                  />
                </div>

                {/* Category */}
                <div>
                  <label style={{ color: '#ffffff' }} className="block text-sm font-medium mb-2">
                    Category
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => handleInputChange('category', e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    style={{
                      backgroundColor: '#1a1a1a',
                      borderColor: '#333333',
                      color: '#ffffff'
                    }}
                  >
                    <option value="AI">AI</option>
                    <option value="Biotechnology">Biotechnology</option>
                    <option value="Research">Research</option>
                    <option value="Innovation">Innovation</option>
                    <option value="Startup">Startup</option>
                  </select>
                </div>

                {/* Tags */}
                <div>
                  <label style={{ color: '#ffffff' }} className="block text-sm font-medium mb-2">
                    Tags
                  </label>
                  <div className="flex space-x-2 mb-2">
                    <input
                      type="text"
                      value={tagInput}
                      onChange={(e) => setTagInput(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTag())}
                      className="flex-1 px-3 py-2 rounded-lg border focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      style={{
                        backgroundColor: '#1a1a1a',
                        borderColor: '#333333',
                        color: '#ffffff'
                      }}
                      placeholder="Add tag..."
                    />
                    <button
                      type="button"
                      onClick={handleAddTag}
                      className="px-3 py-2 rounded-lg transition-colors hover:opacity-80"
                      style={{
                        backgroundColor: '#38bdf8',
                        color: '#ffffff'
                      }}
                    >
                      Add
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {formData.tags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center space-x-1 px-3 py-1 rounded-full text-sm"
                        style={{
                          backgroundColor: 'rgba(14, 165, 233, 0.2)',
                          color: '#38bdf8'
                        }}
                      >
                        <span>{tag}</span>
                        <button
                          type="button"
                          onClick={() => handleRemoveTag(tag)}
                          className="hover:text-red-400"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                </div>

                {/* Video URL */}
                <div>
                  <label style={{ color: '#ffffff' }} className="block text-sm font-medium mb-2">
                    Video URL (optional)
                  </label>
                  <input
                    type="url"
                    value={formData.videoUrl}
                    onChange={(e) => handleInputChange('videoUrl', e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    style={{
                      backgroundColor: '#1a1a1a',
                      borderColor: '#333333',
                      color: '#ffffff'
                    }}
                    placeholder="https://..."
                  />
                </div>

                {/* Featured */}
                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    id="featured"
                    checked={formData.featured}
                    onChange={(e) => handleInputChange('featured', e.target.checked)}
                    className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <label htmlFor="featured" style={{ color: '#ffffff' }} className="text-sm font-medium">
                    Featured Article
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default EditArticlePage;
