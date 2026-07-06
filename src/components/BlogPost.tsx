import { useState, useEffect } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { useTranslation } from 'react-i18next';
import type { BlogPost as BlogPostType } from '../utils/blog';
import { getBlogPost } from '../utils/blog';

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const { i18n } = useTranslation();
  const [post, setPost] = useState<BlogPostType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadPost = async () => {
      if (!slug) {
        setError('No blog post specified');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const blogPost = await getBlogPost(slug);
        if (blogPost) {
          setPost(blogPost);
        } else {
          setError('Blog post not found');
        }
      } catch (err) {
        setError('Failed to load blog post');
        console.error('Error loading blog post:', err);
      } finally {
        setLoading(false);
      }
    };

    loadPost();
  }, [slug]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!slug) {
    return <Navigate to="/" replace />;
  }

  if (loading) {
    return (
      <main id="main-content" className="min-h-screen pt-24 pb-section-lg">
        <div className="max-w-prose mx-auto px-6 lg:px-8">
          <div className="text-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sage-500 mx-auto mb-4"></div>
            <p className="text-charcoal-600">Loading post...</p>
          </div>
        </div>
      </main>
    );
  }

  if (error || !post) {
    return (
      <main id="main-content" className="min-h-screen pt-24 pb-section-lg">
        <div className="max-w-prose mx-auto px-6 lg:px-8">
          <div className="text-center py-20">
            <div className="text-6xl mb-6">📝</div>
            <h1 className="text-heading-1 font-semibold text-charcoal-900 mb-4">
              Post Not Found
            </h1>
            <p className="text-body-lg text-charcoal-600 mb-8">
              {error || "The blog post you're looking for doesn't exist."}
            </p>
            <Link to="/blog" className="btn-primary">
              Back to Blog
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main id="main-content" className="min-h-screen pt-24 pb-section-lg">
      <article className="max-w-prose mx-auto px-6 lg:px-8">
        {/* Back Link */}
        <Link
          to="/blog"
          className="inline-flex items-center text-sage-600 hover:text-sage-700 transition-colors mb-8 group"
        >
          <svg
            className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Back to all posts
        </Link>

        {/* Article Header */}
        <header className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <span className="tag">{post.category}</span>
            <span className="text-caption text-charcoal-500">{post.readTime}</span>
          </div>

          <h1 className="text-display-1 font-semibold text-charcoal-900 mb-4">
            {post.title}
          </h1>

          <p className="text-body-lg text-charcoal-600 mb-6">{post.excerpt}</p>

          <time className="text-caption text-charcoal-500" dateTime={post.date}>
            {new Date(post.date).toLocaleDateString(i18n.language, {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </time>
        </header>

        {/* Article Content */}
        <div className="prose prose-lg prose-charcoal max-w-none">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              h1: ({ children, ...props }) => (
                <h2
                  className="text-heading-1 font-semibold text-charcoal-900 mb-4 mt-10 first:mt-0"
                  {...props}
                >
                  {children}
                </h2>
              ),
              h2: ({ children, ...props }) => (
                <h3
                  className="text-heading-2 font-semibold text-charcoal-900 mb-3 mt-8"
                  {...props}
                >
                  {children}
                </h3>
              ),
              h3: ({ children, ...props }) => (
                <h4
                  className="text-heading-3 font-medium text-charcoal-900 mb-2 mt-6"
                  {...props}
                >
                  {children}
                </h4>
              ),
              p: ({ children, ...props }) => (
                <p className="text-body text-charcoal-700 mb-5 leading-relaxed" {...props}>
                  {children}
                </p>
              ),
              a: ({ children, href, ...props }) => (
                <a
                  href={href}
                  className="text-sage-600 hover:text-sage-700 underline decoration-sage-300 hover:decoration-sage-400 transition-colors"
                  target={href?.startsWith('http') ? '_blank' : undefined}
                  rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
                  {...props}
                >
                  {children}
                </a>
              ),
              code: ({ children, className, ...props }) => {
                const isInline = !className;
                if (isInline) {
                  return (
                    <code
                      className="bg-sage-100 text-charcoal-800 px-1.5 py-0.5 rounded text-[0.9em]"
                      {...props}
                    >
                      {children}
                    </code>
                  );
                }
                return (
                  <code
                    className="block bg-charcoal-900 text-charcoal-100 rounded-lg p-4 text-sm overflow-x-auto"
                    {...props}
                  >
                    {children}
                  </code>
                );
              },
              pre: ({ children, ...props }) => (
                <pre
                  className="bg-charcoal-900 rounded-xl p-4 overflow-x-auto mb-6 text-sm"
                  {...props}
                >
                  {children}
                </pre>
              ),
              ul: ({ children, ...props }) => (
                <ul className="list-disc list-outside ml-6 text-charcoal-700 mb-5 space-y-2" {...props}>
                  {children}
                </ul>
              ),
              ol: ({ children, ...props }) => (
                <ol
                  className="list-decimal list-outside ml-6 text-charcoal-700 mb-5 space-y-2"
                  {...props}
                >
                  {children}
                </ol>
              ),
              li: ({ children, ...props }) => (
                <li className="text-charcoal-700 leading-relaxed" {...props}>
                  {children}
                </li>
              ),
              blockquote: ({ children, ...props }) => (
                <blockquote
                  className="border-l-4 border-sage-400 pl-4 my-6 text-charcoal-600 italic"
                  {...props}
                >
                  {children}
                </blockquote>
              ),
              hr: ({ ...props }) => <hr className="border-sage-200 my-10" {...props} />,
              img: ({ src, alt, ...props }) => (
                <img
                  src={src}
                  alt={alt}
                  className="rounded-xl my-6 w-full"
                  {...props}
                />
              ),
            }}
          >
            {post.content}
          </ReactMarkdown>
        </div>

        {/* Share Section */}
        <footer className="mt-12 pt-8 border-t border-sage-200">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-charcoal-600">Enjoyed this post? Let me know!</p>
            <a
              href="https://bsky.app/profile/travis.dev"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary"
            >
              Discuss on Bluesky
            </a>
          </div>
        </footer>
      </article>
    </main>
  );
};

export default BlogPost;
