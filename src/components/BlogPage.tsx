import { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import type { BlogPost } from '../utils/blog';
import { loadBlogPosts, getCategories } from '../utils/blog';

const BlogPage = () => {
  const { t, i18n } = useTranslation();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [blogPosts, allCategories] = await Promise.all([
          loadBlogPosts(),
          getCategories(),
        ]);
        setPosts(blogPosts);
        setCategories(allCategories);
      } catch (error) {
        console.error('Error loading blog data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Filter posts based on search and category
  const filteredPosts = useMemo(() => {
    let result = posts;

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (post) =>
          post.title.toLowerCase().includes(query) ||
          post.excerpt.toLowerCase().includes(query) ||
          post.category.toLowerCase().includes(query)
      );
    }

    if (selectedCategory) {
      result = result.filter(
        (post) => post.category.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    return result;
  }, [posts, searchQuery, selectedCategory]);

  // Separate featured posts
  const featuredPosts = useMemo(
    () => filteredPosts.filter((post) => post.featured),
    [filteredPosts]
  );

  const regularPosts = useMemo(
    () => filteredPosts.filter((post) => !post.featured),
    [filteredPosts]
  );

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategory(null);
  };

  if (loading) {
    return (
      <main id="main-content" className="min-h-screen pt-24 pb-section-lg">
        <div className="max-w-container mx-auto px-6 lg:px-8">
          <div className="text-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sage-500 mx-auto mb-4"></div>
            <p className="text-charcoal-600">Loading posts...</p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main id="main-content" className="min-h-screen pt-24 pb-section-lg">
      <div className="max-w-container mx-auto px-6 lg:px-8">
        {/* Page Header */}
        <div className="mb-12">
          <h1 className="text-display-2 font-semibold text-charcoal-900 mb-4">
            {t('blog.title')}
          </h1>
          <p className="text-body-lg text-charcoal-600 max-w-2xl">
            {t('blog.subtitle')}
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative max-w-md">
            <svg
              className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-charcoal-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <input
              type="text"
              placeholder="Search posts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-paper border border-sage-200 rounded-xl text-charcoal-900 placeholder-charcoal-500 focus:outline-none focus:ring-2 focus:ring-sage-400 focus:border-transparent transition-all"
            />
          </div>
        </div>

        {/* Category Filters */}
        {categories.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-10">
            <button
              onClick={() => setSelectedCategory(null)}
              className={`px-4 py-2 rounded-full text-caption font-medium transition-all ${
                selectedCategory === null
                  ? 'bg-sage-500 text-white'
                  : 'bg-sage-100 text-sage-700 hover:bg-sage-200'
              }`}
            >
              All
            </button>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-caption font-medium transition-all ${
                  selectedCategory === category
                    ? 'bg-sage-500 text-white'
                    : 'bg-sage-100 text-sage-700 hover:bg-sage-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        )}

        {/* Featured Posts */}
        {featuredPosts.length > 0 && !searchQuery && !selectedCategory && (
          <section className="mb-12">
            <h2 className="text-heading-2 font-semibold text-charcoal-900 mb-6">
              Featured
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {featuredPosts.slice(0, 2).map((post) => (
                <Link
                  key={post.id}
                  to={`/blog/${post.slug}`}
                  className="card group block"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <span className="tag">{post.category}</span>
                    <span className="text-caption text-charcoal-500">
                      {post.readTime}
                    </span>
                  </div>
                  <h3 className="text-heading-3 font-medium text-charcoal-900 mb-2 group-hover:text-sage-600 transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-body text-charcoal-600 mb-4 line-clamp-2">
                    {post.excerpt}
                  </p>
                  <time className="text-caption text-charcoal-500">
                    {new Date(post.date).toLocaleDateString(i18n.language, {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </time>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* All Posts */}
        {filteredPosts.length > 0 ? (
          <section>
            <h2 className="text-heading-2 font-semibold text-charcoal-900 mb-6">
              {searchQuery || selectedCategory ? 'Results' : 'All Posts'}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {(searchQuery || selectedCategory ? filteredPosts : regularPosts).map(
                (post) => (
                  <Link
                    key={post.id}
                    to={`/blog/${post.slug}`}
                    className="card group block"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <span className="tag">{post.category}</span>
                      <span className="text-caption text-charcoal-500">
                        {post.readTime}
                      </span>
                    </div>
                    <h3 className="text-heading-3 font-medium text-charcoal-900 mb-2 group-hover:text-sage-600 transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-body text-charcoal-600 mb-4 line-clamp-2">
                      {post.excerpt}
                    </p>
                    <time className="text-caption text-charcoal-500">
                      {new Date(post.date).toLocaleDateString(i18n.language, {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </time>
                  </Link>
                )
              )}
            </div>
          </section>
        ) : (
          <div className="text-center py-16">
            <div className="text-6xl mb-6">🔍</div>
            <h3 className="text-heading-2 font-medium text-charcoal-900 mb-2">
              No posts found
            </h3>
            <p className="text-body text-charcoal-600 mb-6">
              {searchQuery
                ? `No posts match "${searchQuery}"`
                : 'No posts in this category yet'}
            </p>
            <button onClick={clearFilters} className="btn-secondary">
              Clear filters
            </button>
          </div>
        )}
      </div>
    </main>
  );
};

export default BlogPage;
