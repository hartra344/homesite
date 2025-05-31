import { useState, useEffect } from 'react';
import { useParams, useNavigate, Navigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import type { BlogPost as BlogPostType } from '../utils/blog';
import { getBlogPost } from '../utils/blog';

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [post, setPost] = useState<BlogPostType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Custom navigation function to go back to blog without smooth scrolling
  const handleBackToBlog = () => {
    // Temporarily disable smooth scrolling
    document.documentElement.style.scrollBehavior = 'auto';
    
    // Navigate to home page
    navigate('/');
    
    // Use setTimeout to ensure navigation is complete before scrolling
    setTimeout(() => {
      const blogSection = document.getElementById('blog');
      if (blogSection) {
        blogSection.scrollIntoView({ behavior: 'auto' });
      }
      
      // Re-enable smooth scrolling after a brief delay
      setTimeout(() => {
        document.documentElement.style.scrollBehavior = 'smooth';
      }, 100);
    }, 50);
  };

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

  // Scroll to top when component mounts or slug changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  // Redirect to home if no slug provided
  if (!slug) {
    return <Navigate to="/" replace />;
  }

  if (loading) {
    return (
      <section className="py-32 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 min-h-screen">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="text-6xl mb-8 animate-pulse">📝</div>
            <h2 className="text-2xl font-bold text-white mb-4">Loading blog post...</h2>
          </div>
        </div>
      </section>
    );
  }

  if (error || !post) {
    return (
      <section className="py-32 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 min-h-screen">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="text-6xl mb-8">❌</div>
            <h2 className="text-2xl font-bold text-white mb-4">Post Not Found</h2>
            <p className="text-gray-300 mb-8">{error || 'The blog post you\'re looking for doesn\'t exist.'}</p>
            <button
              onClick={handleBackToBlog}
              className="inline-flex items-center bg-gradient-to-r from-green-600 to-emerald-700 text-white px-6 py-3 rounded-xl font-semibold hover:from-green-700 hover:to-emerald-800 transition-all duration-300"
            >
              ← Back to Blog
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-32 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 min-h-screen">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-20 right-10 w-72 h-72 bg-green-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-10 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Back Button */}
        <button
          onClick={handleBackToBlog}
          className="inline-flex items-center text-green-400 hover:text-white transition-all duration-300 mb-8 group"
        >
          <svg className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Blog
        </button>

        {/* Article Header */}
        <header className="mb-12">
          <div className="flex items-center gap-4 mb-6">
            <span className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 text-green-300 px-4 py-2 rounded-xl text-sm font-semibold border border-white/10">
              {post.category}
            </span>
            {post.featured && (
              <span className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 text-yellow-300 px-3 py-1 rounded-xl text-xs font-semibold border border-yellow-400/20">
                Featured
              </span>
            )}
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
            {post.title}
          </h1>

          <p className="text-xl text-gray-300 mb-8 leading-relaxed">
            {post.excerpt}
          </p>

          <div className="flex items-center justify-between text-gray-400 border-b border-white/10 pb-8">
            <time dateTime={post.date} className="flex items-center">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              {new Date(post.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </time>
            <span className="flex items-center">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {post.readTime}
            </span>
          </div>
        </header>

        {/* Article Content */}
        <article className="prose prose-lg prose-invert prose-green max-w-none">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              // Custom components for better styling
              h1: ({ children, ...props }) => (
                <h1 className="text-3xl font-bold text-white mb-6 mt-12 first:mt-0" {...props}>
                  {children}
                </h1>
              ),
              h2: ({ children, ...props }) => (
                <h2 className="text-2xl font-bold text-white mb-4 mt-10" {...props}>
                  {children}
                </h2>
              ),
              h3: ({ children, ...props }) => (
                <h3 className="text-xl font-bold text-white mb-3 mt-8" {...props}>
                  {children}
                </h3>
              ),
              p: ({ children, ...props }) => (
                <p className="text-gray-300 mb-6 leading-relaxed" {...props}>
                  {children}
                </p>
              ),
              a: ({ children, href, ...props }) => (
                <a 
                  href={href} 
                  className="text-green-400 hover:text-green-300 transition-colors duration-300 underline decoration-green-400/30 hover:decoration-green-300/50" 
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
                    <code className="bg-white/10 text-green-300 px-2 py-1 rounded text-sm" {...props}>
                      {children}
                    </code>
                  );
                }
                return (
                  <code className="block bg-white/5 border border-white/10 rounded-lg p-4 text-sm overflow-x-auto" {...props}>
                    {children}
                  </code>
                );
              },
              pre: ({ children, ...props }) => (
                <pre className="bg-white/5 border border-white/10 rounded-lg p-4 overflow-x-auto mb-6" {...props}>
                  {children}
                </pre>
              ),
              ul: ({ children, ...props }) => (
                <ul className="list-disc list-inside text-gray-300 mb-6 space-y-2" {...props}>
                  {children}
                </ul>
              ),
              ol: ({ children, ...props }) => (
                <ol className="list-decimal list-inside text-gray-300 mb-6 space-y-2" {...props}>
                  {children}
                </ol>
              ),
              li: ({ children, ...props }) => (
                <li className="text-gray-300" {...props}>
                  {children}
                </li>
              ),
              blockquote: ({ children, ...props }) => (
                <blockquote className="border-l-4 border-green-400 pl-6 my-6 italic text-gray-300" {...props}>
                  {children}
                </blockquote>
              ),
              hr: ({ ...props }) => (
                <hr className="border-white/20 my-12" {...props} />
              ),
            }}
          >
            {post.content}
          </ReactMarkdown>
        </article>

        {/* Share/Social Section */}
        <footer className="mt-16 pt-8 border-t border-white/10">
          <div className="text-center">
            <p className="text-gray-300 mb-6">
              Enjoyed this post? Feel free to share your thoughts or connect with me!
            </p>
            <div className="flex justify-center space-x-4">
              <a
                href="https://bsky.app/profile/travis.dev"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center bg-gradient-to-r from-green-600 to-emerald-700 text-white px-6 py-3 rounded-xl font-semibold hover:from-green-700 hover:to-emerald-800 transition-all duration-300 transform hover:scale-105"
              >
                <svg className="w-5 h-5 mr-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 -3.268 64 68.414" fill="currentColor">
                  <path d="M13.873 3.805C21.21 9.332 29.103 20.537 32 26.55v15.882c0-.338-.13.044-.41.867-1.512 4.456-7.418 21.847-20.923 7.944-7.111-7.32-3.819-14.64 9.125-16.85-7.405 1.264-15.73-.825-18.014-9.015C1.12 23.022 0 8.51 0 6.55 0-3.268 8.579-.182 13.873 3.805zm36.254 0C42.79 9.332 34.897 20.537 32 26.55v15.882c0-.338.13.044.41.867 1.512 4.456 7.418 21.847 20.923 7.944 7.111-7.32 3.819-14.64-9.125-16.85 7.405 1.264 15.73-.825 18.014-9.015C62.88 23.022 64 8.51 64 6.55c0-9.818-8.578-6.732-13.873-2.745z"/>
                </svg>
                Discussion on Bluesky
              </a>
            </div>
          </div>
        </footer>
      </div>
    </section>
  );
};

export default BlogPost;
