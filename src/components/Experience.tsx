

const Experience = () => {
  const experiences = [
    {
      company: 'Microsoft',
      role: 'Principal Software Engineering Manager',
      period: '2021 - Present',
      description: 'Leading the Azure Logic Apps UX team, driving innovation in cloud integration and workflow solutions.',
      achievements: [
        'Leading a team of 12+ engineers building world-class UX for Azure Logic Apps',
        'Driving architectural decisions for next-generation integration platforms',
        'Collaborating with product teams to deliver features used by millions of developers'
      ]
    },
    {
      company: 'Facebook',
      role: 'Software Engineer',
      period: '2019 - 2021',
      description: 'Built scalable web applications and contributed to core platform features.',
      achievements: [
        'Developed high-performance React components used across multiple products',
        'Optimized application performance resulting in 30% faster load times',
        'Mentored junior engineers and contributed to engineering culture'
      ]
    },
    {
      company: 'Microsoft',
      role: 'Senior Software Engineer',
      period: '2014 - 2019',
      description: 'Focused on cloud services and developer tools, building the foundation for modern Azure services.',
      achievements: [
        'Built core Azure services handling millions of requests per day',
        'Led migration projects from on-premises to cloud infrastructure',
        'Contributed to open-source projects and developer documentation'
      ]
    }
  ];

  return (
    <section id="experience" className="py-32 bg-gradient-to-br from-slate-800 via-slate-900 to-slate-800 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-40 left-20 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-40 right-20 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-20">
          <h2 className="text-5xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-6">
            Experience
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-purple-400 mx-auto mb-8 rounded-full"></div>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Over a decade of experience building scalable software solutions and leading high-performing teams.
          </p>
        </div>

        <div className="space-y-8">
          {experiences.map((exp, index) => (
            <div 
              key={index} 
              className="group bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all duration-500 hover:scale-105 hover:border-white/20"
            >
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
                <div className="space-y-2">
                  <h3 className="text-3xl font-bold text-white group-hover:text-blue-300 transition-colors duration-300">
                    {exp.role}
                  </h3>
                  <h4 className="text-xl bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent font-bold">
                    {exp.company}
                  </h4>
                </div>
                <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-white font-semibold px-6 py-3 rounded-xl border border-white/10 mt-4 md:mt-0">
                  {exp.period}
                </div>
              </div>
              
              <p className="text-lg text-gray-300 mb-8 leading-relaxed">
                {exp.description}
              </p>
              
              <div>
                <h5 className="font-bold text-white mb-6 text-lg">Key Achievements:</h5>
                <ul className="space-y-4">
                  {exp.achievements.map((achievement, i) => (
                    <li key={i} className="flex items-start group/item">
                      <div className="w-3 h-3 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full mt-2 mr-4 flex-shrink-0 group-hover/item:scale-125 transition-transform duration-300"></div>
                      <span className="text-gray-300 leading-relaxed group-hover/item:text-white transition-colors duration-300">
                        {achievement}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <a
            href="/resume.pdf"
            className="group inline-flex items-center bg-gradient-to-r from-blue-500 to-purple-600 text-white px-10 py-4 rounded-2xl font-bold text-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-2xl border border-white/20"
          >
            <svg className="w-6 h-6 mr-3 group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Download Full Resume
          </a>
        </div>
      </div>
    </section>
  );
};

export default Experience;
