import { useTranslation } from 'react-i18next';

const Hero = () => {
  const { t } = useTranslation();

  return (
    <section
      id="home"
      data-testid="hero"
      className="min-h-[70vh] flex items-center pt-24 pb-section-md relative overflow-hidden"
    >
      {/* Background Decorative Element */}
      <div className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/4 w-[600px] h-[600px] bg-sage-200/30 rounded-full blur-3xl -z-10 pointer-events-none" />

      <div className="max-w-container mx-auto px-6 lg:px-8 relative z-10">
        <div className="max-w-2xl animate-fade-up">
          {/* Role badge */}
          <p className="text-body text-olive-500 font-medium mb-4">
            {t('hero.badge')}
          </p>

          {/* Main Heading */}
          <h1 className="text-display-1 md:text-[4rem] font-semibold text-charcoal-900 mb-6">
            {t('hero.heading1')}{' '}
            <span className="text-sage-500">{t('hero.headingHighlight')}</span>
            <br />
            <span className="text-charcoal-400">{t('hero.heading2')}</span>
          </h1>

          {/* Description */}
          <p className="text-body-lg text-charcoal-600 mb-8 leading-relaxed">
            {t('hero.description')}{' '}
            <span className="text-charcoal-900 font-medium">{t('hero.company')}</span>,{' '}
            {t('hero.descriptionCont')}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-4">
            <a href="#contact" className="btn-primary">
              {t('hero.letsConnect')}
            </a>
            <a href="/blog" className="btn-secondary">
              Read the Blog
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
