import { useState } from 'react';

const Blog = () => {
  const [posts] = useState([
    {
      id: 1,
      title: 'Building Scalable UX for Azure Logic Apps',
      excerpt: 'Lessons learned from designing user experiences for enterprise integration platforms at massive scale.',
      date: '2024-03-15',
      readTime: '8 min read',
      category: 'Engineering',
      featured: true
    },
    {
      id: 2,
      title: 'From Facebook to Microsoft: A Journey in Cloud Computing',
      excerpt: 'Reflections on transitioning between tech giants and the evolution of cloud technologies.',
      date: '2024-02-28',
      readTime: '6 min read',
      category: 'Career',
      featured: false
    },
    {
      id: 3,
      title: 'The Future of Low-Code Development',
      excerpt: 'How visual programming and low-code platforms are democratizing software development.',
      date: '2024-02-10',
      readTime: '12 min read',
      category: 'Technology',
      featured: true
    }
  ]);

  return (
    <section id="blog" className="py-32 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-20 right-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-10 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-20">
          <h2 className="text-5xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-6">
            Blog
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-purple-400 mx-auto mb-8 rounded-full"></div>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Thoughts on technology, engineering leadership, and life in the cloud.
          </p>
        </div>

        {posts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <article
                key={post.id}
                className={`group bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden hover:bg-white/10 transition-all duration-500 transform hover:scale-105 hover:border-white/20 ${
                  post.featured ? 'ring-2 ring-purple-400/30' : ''
                }`}
              >
                <div className="h-48 bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center relative overflow-hidden">
                  <div className="text-6xl group-hover:scale-110 transition-transform duration-300">📝</div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                </div>
                
                <div className="p-8">
                  <div className="flex items-center justify-between mb-4">
                    <span className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-300 px-4 py-2 rounded-xl text-sm font-semibold border border-white/10">
                      {post.category}
                    </span>
                    {post.featured && (
                      <span className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 text-yellow-300 px-3 py-1 rounded-xl text-xs font-semibold border border-yellow-400/20">
                        Featured
                      </span>
                    )}
                  </div>
                  
                  <h3 className="text-xl font-bold text-white mb-4 line-clamp-2 group-hover:text-blue-300 transition-colors duration-300">
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
                  
                  <button className="group/btn text-blue-400 font-semibold hover:text-white transition-all duration-300 flex items-center">
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
                href="https://x.com/hartra34"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-4 rounded-2xl font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-2xl border border-white/20"
              >
                Follow me on X for updates
                <svg className="w-5 h-5 ml-3 group-hover:scale-110 group-hover:translate-x-1 transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
