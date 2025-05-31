import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import type { BlogPost as BlogPostType } from '../utils/blog';
import { loadBlogPosts } from '../utils/blog';

const Blog = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState<BlogPostType[]>([]);
  const [loading, setLoading] = useState(true);

  // Custom navigation function to go to blog post without smooth scrolling
  const handleReadMore = (slug: string) => {
    // Temporarily disable smooth scrolling
    document.documentElement.style.scrollBehavior = 'auto';
    
    // Navigate to blog post
    navigate(`/blog/${slug}`);
    
    // Re-enable smooth scrolling after a brief delay
    setTimeout(() => {
      document.documentElement.style.scrollBehavior = 'smooth';
    }, 100);
  };

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const blogPosts = await loadBlogPosts();
        setPosts(blogPosts);
      } catch (error) {
        console.error('Error loading blog posts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  return (
    <section id="blog" className="py-32 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-20 right-10 w-72 h-72 bg-green-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-10 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-20">
          <h2 className="text-5xl font-bold bg-gradient-to-r from-green-400 via-emerald-400 to-lime-400 bg-clip-text text-transparent mb-6 pb-2">
            Blog
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-green-400 to-emerald-400 mx-auto mb-8 rounded-full"></div>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Thoughts on technology, engineering leadership, and life in the cloud.
          </p>
        </div>

        {loading ? (
          <div className="text-center py-20">
            <div className="text-8xl mb-8 animate-pulse">📝</div>
            <h3 className="text-3xl font-bold text-white mb-6">
              Loading blog posts...
            </h3>
          </div>
        ) : posts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <article
                key={post.id}
                className={`group bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden hover:bg-white/10 transition-all duration-500 transform hover:scale-105 hover:border-white/20 ${
                  post.featured ? 'ring-2 ring-green-400/30' : ''
                }`}
              >
                <div className="h-48 bg-gradient-to-br from-green-500/20 to-emerald-500/20 flex items-center justify-center relative overflow-hidden">
                  <div className="text-6xl group-hover:scale-110 transition-transform duration-300">📝</div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                </div>
                
                <div className="p-8">
                  <div className="flex items-center justify-between mb-4">
                    <span className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 text-green-300 px-4 py-2 rounded-xl text-sm font-semibold border border-white/10">
                      {post.category}
                    </span>
                    {post.featured && (
                      <span className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 text-yellow-300 px-3 py-1 rounded-xl text-xs font-semibold border border-yellow-400/20">
                        Featured
                      </span>
                    )}
                  </div>
                  
                  <h3 className="text-xl font-bold text-white mb-4 line-clamp-2 group-hover:text-green-300 transition-colors duration-300">
                    {post.title}
                  </h3>
                  
                  <p className="text-gray-300 mb-6 line-clamp-3 leading-relaxed">
                    {post.excerpt}
                  </p>
                  
                  <div className="flex items-center justify-between text-sm text-gray-400 mb-4">
                    <time dateTime={post.date}>
                      {new Date(post.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </time>
                    <span>{post.readTime}</span>
                  </div>
                  
                  <button 
                    onClick={() => handleReadMore(post.slug)}
                    className="group/btn text-green-400 font-semibold hover:text-white transition-all duration-300 flex items-center min-h-[44px] px-4 py-2"
                  >
                    Read more 
                    <svg className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </button>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="text-8xl mb-8 animate-pulse">📝</div>
            <h3 className="text-3xl font-bold text-white mb-6">
              Blog Coming Soon
            </h3>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed mb-8">
              I'm currently working on some exciting content about engineering leadership, 
              cloud technologies, and lessons learned from building products at scale. 
              Check back soon for insights from the world of enterprise software development!
            </p>
            <div className="mt-12">
              <a
                href="https://bsky.app/profile/travis.dev"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center bg-gradient-to-r from-green-600 to-emerald-700 text-white px-8 py-4 rounded-2xl font-semibold hover:from-green-700 hover:to-emerald-800 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-2xl border border-white/20"
              >
                <svg className="w-5 h-5 mr-3 group-hover:scale-110 transition-all duration-300" xmlns="http://www.w3.org/2000/svg" viewBox="0 -3.268 64 68.414" fill="currentColor">
                  <path d="M13.873 3.805C21.21 9.332 29.103 20.537 32 26.55v15.882c0-.338-.13.044-.41.867-1.512 4.456-7.418 21.847-20.923 7.944-7.111-7.32-3.819-14.64 9.125-16.85-7.405 1.264-15.73-.825-18.014-9.015C1.12 23.022 0 8.51 0 6.55 0-3.268 8.579-.182 13.873 3.805zm36.254 0C42.79 9.332 34.897 20.537 32 26.55v15.882c0-.338.13.044.41.867 1.512 4.456 7.418 21.847 20.923 7.944 7.111-7.32 3.819-14.64-9.125-16.85 7.405 1.264 15.73-.825 18.014-9.015C62.88 23.022 64 8.51 64 6.55c0-9.818-8.578-6.732-13.873-2.745z"/>
                </svg>
                Follow me on Bluesky for updates
                <svg className="w-4 h-4 ml-3 group-hover:scale-110 group-hover:translate-x-1 transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Blog;
