import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import type { BlogPost } from '../utils/blog';
import { getRecentPosts } from '../utils/blog';

const FeaturedPosts = () => {
  const { t, i18n } = useTranslation();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const recentPosts = await getRecentPosts(3);
        setPosts(recentPosts);
      } catch (error) {
        console.error('Error loading blog posts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) {
    return (
      <section id="blog" className="py-section-md bg-stone">
        <div className="max-w-container mx-auto px-6 lg:px-8">
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-sage-500 mx-auto"></div>
          </div>
        </div>
      </section>
    );
  }

  if (posts.length === 0) {
    return (
      <section id="blog" className="py-section-md bg-stone">
        <div className="max-w-container mx-auto px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-display-2 font-semibold text-charcoal-900 mb-4">
              {t('blog.title')}
            </h2>
            <p className="text-body-lg text-charcoal-600 mb-8">
              {t('blog.emptyState')}
            </p>
            <a
              href="https://bsky.app/profile/travis.dev"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
              Follow me on Bluesky
            </a>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="blog" className="py-section-md bg-stone">
      <div className="max-w-container mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-10">
          <div>
            <h2 className="text-display-2 font-semibold text-charcoal-900 mb-2">
              Recent Writing
            </h2>
            <p className="text-body-lg text-charcoal-600">
              {t('blog.subtitle')}
            </p>
          </div>
          <Link
            to="/blog"
            className="mt-4 sm:mt-0 min-h-[44px] text-sage-600 font-medium hover:text-sage-700 transition-colors inline-flex items-center gap-2"
          >
            View all posts
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </Link>
        </div>

        {/* Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <Link
              key={post.id}
              to={`/blog/${post.slug}`}
              className="card group block bg-cream"
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
              <time className="text-caption text-charcoal-500 block mb-4">
                {new Date(post.date).toLocaleDateString(i18n.language, {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </time>
              
              <span className="text-sage-600 font-medium text-sm inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                Read article
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedPosts;
