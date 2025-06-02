import { useTranslation } from 'react-i18next';

const About = () => {
  const { t } = useTranslation();
  return (
    <section
      id="about"
      className="py-32 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden"
    >
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-green-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-20">
          <h2 className="text-5xl font-bold bg-gradient-to-r from-green-400 via-emerald-400 to-lime-400 bg-clip-text text-transparent mb-6">
            {t('about.title')}
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-green-400 to-emerald-400 mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
          <div className="space-y-6">
            <h3 className="text-3xl font-bold text-white mb-8 leading-tight">
              {t('about.tagline')}
              <span className="bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                {" "}
                {t('about.taglineHighlight')}
              </span>
            </h3>
            <div className="space-y-6">
              <p className="text-lg text-gray-300 leading-relaxed">
                {t('about.intro')}
              </p>
              <p className="text-lg text-gray-300 leading-relaxed">
                {t('about.expertise')}
              </p>
              <p className="text-lg text-gray-300 leading-relaxed">
                {t('about.personal')}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="group bg-white/5 backdrop-blur-sm border border-white/10 p-8 rounded-2xl text-center hover:bg-white/10 transition-all duration-300 hover:scale-105">
              <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                ✈️
              </div>
              <h4 className="font-bold text-white mb-2 text-lg">{t('about.interests.items.aviation')}</h4>
              <p className="text-gray-400">{t('about.interests.items.aviationDesc')}</p>
            </div>
            <div className="group bg-white/5 backdrop-blur-sm border border-white/10 p-8 rounded-2xl text-center hover:bg-white/10 transition-all duration-300 hover:scale-105">
              <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                🏍️
              </div>
              <h4 className="font-bold text-white mb-2 text-lg">{t('about.interests.items.motorcycles')}</h4>
              <p className="text-gray-400">{t('about.interests.items.motorcyclesDesc')}</p>
            </div>
            <div className="group bg-white/5 backdrop-blur-sm border border-white/10 p-8 rounded-2xl text-center hover:bg-white/10 transition-all duration-300 hover:scale-105">
              <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                🏰
              </div>
              <h4 className="font-bold text-white mb-2 text-lg">{t('about.interests.items.travel')}</h4>
              <p className="text-gray-400">{t('about.interests.items.travelDesc')}</p>
            </div>
            <div className="group bg-white/5 backdrop-blur-sm border border-white/10 p-8 rounded-2xl text-center hover:bg-white/10 transition-all duration-300 hover:scale-105">
              <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                💪
              </div>
              <h4 className="font-bold text-white mb-2 text-lg">{t('about.interests.items.fitness')}</h4>
              <p className="text-gray-400">{t('about.interests.items.fitnessDesc')}</p>
            </div>
          </div>
        </div>

        <div className="mt-20">
          <h3 className="text-3xl font-bold text-white mb-12 text-center">
            {t('about.skills.title')}
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {[
              "TypeScript",
              "JavaScript",
              "React",
              "Node.js",
              "Azure",
              "Docker",
              "Kubernetes",
              "GraphQL",
              "REST APIs",
              "MongoDB",
              "PostgreSQL",
              "Git",
            ].map((skill, index) => (
              <div
                key={skill}
                className="group bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-white/10 backdrop-blur-sm text-white px-6 py-3 rounded-xl text-center font-semibold hover:from-green-500/30 hover:to-emerald-500/30 transition-all duration-300 hover:scale-105 hover:border-white/20"
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
