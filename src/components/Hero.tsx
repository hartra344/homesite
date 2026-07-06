import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

// One greeting per language the site speaks — a quiet nod to the 15 locales.
const GREETINGS = [
  'Hello',
  'Xin chào',
  '你好',
  'வணக்கம்',
  'Bonjour',
  'こんにちは',
  'Hola',
  '안녕하세요',
  'नमस्ते',
  'Olá',
  'Hallo',
  'Ciao',
];

const RotatingGreeting = () => {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }
    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setIndex((i) => (i + 1) % GREETINGS.length);
        setVisible(true);
      }, 250);
    }, 2600);
    return () => clearInterval(interval);
  }, []);

  return (
    <span
      className={`inline-block transition-all duration-200 ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-1'
      }`}
      aria-hidden="true"
    >
      {GREETINGS[index]}
    </span>
  );
};

const Hero = () => {
  const { t } = useTranslation();

  return (
    <section
      id="home"
      data-testid="hero"
      className="min-h-[70vh] flex items-center pt-24 pb-section-md relative overflow-hidden"
    >
      {/* Background Decorative Element */}
      <div className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/4 w-[600px] h-[600px] bg-sage-200/30 rounded-full blur-3xl z-0 pointer-events-none" />

      {/* Contrail flight path */}
      <svg
        className="absolute inset-0 w-full h-full z-0 pointer-events-none hidden md:block"
        viewBox="0 0 1200 600"
        fill="none"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
      >
        <path
          d="M -60 560 C 260 520, 480 420, 660 300 S 960 130, 1060 90"
          stroke="#a3b1a6"
          strokeWidth="2"
          strokeDasharray="8 10"
          strokeLinecap="round"
          className="animate-dash-march"
          opacity="0.45"
        />
        {/* Little plane at the end of the contrail, nose along the path tangent */}
        <g transform="translate(1078, 83) rotate(-22)">
          <path
            d="M2.5 19l19-7-19-7v5l13 2-13 2v5z"
            fill="#5f7563"
            opacity="0.85"
            transform="scale(1.4) translate(-12 -12)"
          />
        </g>
      </svg>

      <div className="max-w-container mx-auto px-6 lg:px-8 relative z-10">
        <div className="max-w-2xl animate-fade-up">
          {/* Rotating multilingual greeting */}
          <p className="font-mono text-caption text-sage-600 mb-2 h-5">
            <span className="sr-only">Hello</span>
            <RotatingGreeting />
            <span aria-hidden="true">, I'm Travis.</span>
          </p>

          {/* Role badge */}
          <p className="text-body text-olive-500 font-medium mb-4">
            {t('hero.badge')}
          </p>

          {/* Main Heading */}
          <h1 className="text-display-1 md:text-[4rem] font-semibold text-charcoal-900 mb-6">
            {t('hero.heading1')}{' '}
            <span className="text-sage-500">{t('hero.headingHighlight')}</span>
            <br />
            <span className="text-charcoal-500">{t('hero.heading2')}</span>
          </h1>

          {/* Description */}
          <p className="text-body-lg text-charcoal-600 mb-8 leading-relaxed">
            {t('hero.description')}{' '}
            <span className="text-charcoal-900 font-medium">{t('hero.company')}</span>,{' '}
            {t('hero.descriptionCont')}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-4 mb-10">
            <a href="#contact" className="btn-primary">
              {t('hero.letsConnect')}
            </a>
            <a href="/blog" className="btn-secondary">
              Read the Blog
            </a>
          </div>

          {/* Flight strip — aviation shorthand for the career so far */}
          <div
            className="inline-flex flex-wrap items-center gap-x-4 gap-y-1 font-mono text-[0.72rem] tracking-wide text-charcoal-500 border border-sage-200 bg-paper/70 rounded-lg px-4 py-2"
            aria-label="Career flight strip: departed Seattle 2014, arrived Fort Myers, currently climbing at GitHub"
          >
            <span>DEP&nbsp;SEA&nbsp;'14</span>
            <span aria-hidden="true" className="text-sage-400">✈</span>
            <span>ARR&nbsp;RSW</span>
            <span aria-hidden="true" className="text-sage-300">|</span>
            <span>ALT&nbsp;PRINCIPAL</span>
            <span aria-hidden="true" className="text-sage-300">|</span>
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-sage-500 animate-beacon" aria-hidden="true" />
              CLIMBING
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
