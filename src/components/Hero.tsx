import { useTranslation } from 'react-i18next';

const Hero = () => {
  const { t } = useTranslation();
  
  return (
    <section id="home" data-testid='hero' className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background Effects */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary-500/30 rounded-full blur-[100px] mix-blend-screen animate-blob"></div>
        <div className="absolute top-40 right-10 w-96 h-96 bg-secondary-500/20 rounded-full blur-[100px] mix-blend-screen animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-20 left-1/2 w-80 h-80 bg-cyan-500/20 rounded-full blur-[100px] mix-blend-screen animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="space-y-8">
          {/* Badge */}
          <div className="inline-flex items-center px-3 py-1 rounded-full border border-primary-500/30 bg-primary-500/10 backdrop-blur-sm mb-6">
            <span className="flex h-2 w-2 rounded-full bg-primary-400 mr-2 animate-pulse"></span>
            <span className="text-primary-200 text-sm font-medium tracking-wide uppercase">{t('hero.badge')}</span>
          </div>

          {/* Main Heading */}
          <h1 className="text-6xl md:text-8xl font-bold tracking-tight text-white mb-6">
            {t('hero.heading1')}{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 via-secondary-400 to-primary-400 animate-gradient-x bg-[length:200%_auto]">
              {t('hero.headingHighlight')}
            </span>
            <br className="hidden md:block" />
            <span className="text-4xl md:text-7xl text-slate-400 font-medium mt-2 block">
              {t('hero.heading2')}
            </span>
          </h1>

          {/* Description */}
          <p className="text-xl md:text-2xl text-slate-300 max-w-3xl mx-auto leading-relaxed font-light">
            {t('hero.description')} <span className="text-secondary-400 font-semibold">{t('hero.company')}</span>, {t('hero.descriptionCont')}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mt-12">
            <a
              href="#contact"
              className="group relative px-8 py-4 bg-primary-600 hover:bg-primary-500 text-white rounded-full font-semibold text-lg transition-all duration-300 hover:scale-105 hover:shadow-[0_0_40px_-10px_rgba(124,58,237,0.5)]"
            >
              {t('hero.letsConnect')}
              <span className="absolute inset-0 rounded-full ring-2 ring-white/20 group-hover:ring-white/40 transition-all"></span>
            </a>
            
            <a
              href="/resume.html"
              className="group px-8 py-4 bg-slate-800/50 hover:bg-slate-800 text-white rounded-full font-semibold text-lg border border-slate-700 hover:border-slate-600 transition-all duration-300 hover:scale-105 backdrop-blur-sm"
            >
              {t('hero.viewResume')}
            </a>
          </div>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
        <svg className="w-6 h-6 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  );
};

export default Hero;
