

const About = () => {
  return (
    <section id="about" className="py-32 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-20">
          <h2 className="text-5xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-6">
            About Me
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-purple-400 mx-auto rounded-full"></div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
          <div className="space-y-6">
            <h3 className="text-3xl font-bold text-white mb-8 leading-tight">
              Building the future of 
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"> cloud integration</span>
            </h3>
            <div className="space-y-6">
              <p className="text-lg text-gray-300 leading-relaxed">
                I'm Travis, a seasoned software engineering leader with a strong focus on 
                TypeScript/JavaScript, React, Node.js, and cloud technologies. With a rich 
                career spanning roles at Microsoft and Facebook, I now lead the Microsoft 
                Azure Logic Apps UX team, where we're building the next generation of 
                integration and workflow solutions.
              </p>
              <p className="text-lg text-gray-300 leading-relaxed">
                My passion lies in creating intuitive user experiences that make complex 
                cloud technologies accessible to developers and businesses worldwide. I believe 
                that great software should be both powerful and delightful to use.
              </p>
              <p className="text-lg text-gray-300 leading-relaxed">
                Outside of work, I'm a private pilot who loves exploring the world from above, 
                a motorcycle enthusiast who enjoys the freedom of the open road, and an avid 
                traveler with a particular soft spot for Disney World. I'm also passionate 
                about fitness and staying active.
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-6">
            <div className="group bg-white/5 backdrop-blur-sm border border-white/10 p-8 rounded-2xl text-center hover:bg-white/10 transition-all duration-300 hover:scale-105">
              <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">🚁</div>
              <h4 className="font-bold text-white mb-2 text-lg">Aviation</h4>
              <p className="text-gray-400">Private pilot exploring the skies</p>
            </div>
            <div className="group bg-white/5 backdrop-blur-sm border border-white/10 p-8 rounded-2xl text-center hover:bg-white/10 transition-all duration-300 hover:scale-105">
              <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">🏍️</div>
              <h4 className="font-bold text-white mb-2 text-lg">Motorcycles</h4>
              <p className="text-gray-400">Freedom on two wheels</p>
            </div>
            <div className="group bg-white/5 backdrop-blur-sm border border-white/10 p-8 rounded-2xl text-center hover:bg-white/10 transition-all duration-300 hover:scale-105">
              <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">🏰</div>
              <h4 className="font-bold text-white mb-2 text-lg">Travel</h4>
              <p className="text-gray-400">Exploring the world, especially Disney</p>
            </div>
            <div className="group bg-white/5 backdrop-blur-sm border border-white/10 p-8 rounded-2xl text-center hover:bg-white/10 transition-all duration-300 hover:scale-105">
              <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">💪</div>
              <h4 className="font-bold text-white mb-2 text-lg">Fitness</h4>
              <p className="text-gray-400">Staying active and healthy</p>
            </div>
          </div>
        </div>
        
        <div className="mt-20">
          <h3 className="text-3xl font-bold text-white mb-12 text-center">Skills & Technologies</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {[
              'TypeScript', 'JavaScript', 'React', 'Node.js', 'Azure', 'Docker',
              'Kubernetes', 'GraphQL', 'REST APIs', 'MongoDB', 'PostgreSQL', 'Git'
            ].map((skill, index) => (
              <div 
                key={skill} 
                className="group bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-white/10 backdrop-blur-sm text-white px-6 py-3 rounded-xl text-center font-semibold hover:from-blue-500/30 hover:to-purple-500/30 transition-all duration-300 hover:scale-105 hover:border-white/20"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {skill}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
