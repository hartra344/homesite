import { useTranslation } from 'react-i18next';

const About = () => {
  const { t } = useTranslation();

  const skills = [
    'TypeScript',
    'React',
    'Node.js',
    'GitHub',
    'System Design',
    'Platform Engineering',
  ];

  return (
    <section id="about" className="py-section-md">
      <div className="max-w-container mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16">
          {/* Main Content */}
          <div className="lg:col-span-3">
            <h2 className="text-display-2 font-semibold text-charcoal-900 mb-6">
              {t('about.title')}
            </h2>
            <div className="space-y-4 text-body-lg text-charcoal-600 leading-relaxed">
              <p>{t('about.intro')}</p>
              <p>{t('about.expertise')}</p>
              <p>{t('about.personal')}</p>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-2 space-y-8">
            {/* Skills */}
            <div className="card">
              <h3 className="text-heading-3 font-medium text-charcoal-900 mb-4">
                {t('about.skills.title')}
              </h3>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <span key={skill} className="tag">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Quick Facts */}
            <div className="card">
              <h3 className="text-heading-3 font-medium text-charcoal-900 mb-4">
                {t('about.interests.title')}
              </h3>
              <ul className="space-y-3">
                <li className="flex items-center gap-3 text-charcoal-600">
                  <span className="w-8 h-8 flex items-center justify-center bg-sage-50 rounded-full text-lg">✈️</span>
                  <span>{t('about.interests.items.aviationDesc')}</span>
                </li>
                <li className="flex items-center gap-3 text-charcoal-600">
                  <span className="w-8 h-8 flex items-center justify-center bg-sage-50 rounded-full text-lg">🏍️</span>
                  <span>{t('about.interests.items.motorcyclesDesc')}</span>
                </li>
                <li className="flex items-center gap-3 text-charcoal-600">
                  <span className="w-8 h-8 flex items-center justify-center bg-sage-50 rounded-full text-lg">🏰</span>
                  <span>{t('about.interests.items.travelDesc')}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
