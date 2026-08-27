import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { destinations } from '../content/travel/destinations';
import { getPhotos, formatSettings } from '../utils/photos';

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

// Latest frames from the gallery, presented like prints pinned to a contact sheet.
const ContactSheet = () => {
  const photos = getPhotos().slice(0, 3);
  if (photos.length === 0) return null;

  const [lead, ...rest] = photos;

  return (
    <Link
      to="/photos"
      aria-label="Latest photos — view the full gallery"
      className="group relative block rounded-2xl border border-sage-200 bg-paper p-4 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-sage-400 focus:ring-offset-2 focus:ring-offset-cream"
    >
      {/* Viewfinder corner brackets */}
      <span className="absolute -top-2 -left-2 w-6 h-6 border-t-2 border-l-2 border-sage-400 rounded-tl" aria-hidden="true" />
      <span className="absolute -top-2 -right-2 w-6 h-6 border-t-2 border-r-2 border-sage-400 rounded-tr" aria-hidden="true" />
      <span className="absolute -bottom-2 -left-2 w-6 h-6 border-b-2 border-l-2 border-sage-400 rounded-bl" aria-hidden="true" />
      <span className="absolute -bottom-2 -right-2 w-6 h-6 border-b-2 border-r-2 border-sage-400 rounded-br" aria-hidden="true" />

      <div className="flex items-baseline justify-between mb-3">
        <span className="font-mono text-[0.65rem] tracking-[0.25em] text-charcoal-500">
          LATEST FRAMES
        </span>
        <span className="font-mono text-[0.65rem] tracking-[0.25em] text-sage-600 group-hover:text-sage-500 transition-colors">
          GALLERY →
        </span>
      </div>

      <img
        src={lead.images.thumb}
        alt={lead.title}
        width={lead.width}
        height={lead.height}
        loading="eager"
        className={`w-full h-52 object-cover rounded-lg ${lead.height > lead.width ? 'object-top' : ''}`}
      />
      <div className="flex items-baseline justify-between gap-3 mt-2 mb-3">
        <span className="text-caption font-medium text-charcoal-900 truncate">{lead.title}</span>
        {lead.exif && (
          <span className="font-mono text-[0.65rem] text-charcoal-500 whitespace-nowrap">
            {formatSettings(lead.exif)}
          </span>
        )}
      </div>

      {rest.length > 0 && (
        <div className="grid grid-cols-2 gap-3">
          {rest.map((photo) => (
            <img
              key={photo.id}
              src={photo.images.thumb}
              alt={photo.title}
              width={photo.width}
              height={photo.height}
              loading="lazy"
              className={`w-full h-24 object-cover rounded-lg ${photo.height > photo.width ? 'object-top' : ''}`}
            />
          ))}
        </div>
      )}

      <p className="font-mono text-[0.65rem] tracking-[0.15em] text-charcoal-500 mt-3">
        {lead.location ? lead.location.toUpperCase() : 'ON LOCATION'}
      </p>
    </Link>
  );
};

const Hero = () => {
  const { t } = useTranslation();
  const continents = new Set(destinations.map((d) => d.continent));
  const countryCount = String(destinations.length).padStart(2, '0');
  const continentCount = String(continents.size).padStart(2, '0');

  return (
    <section
      id="home"
      data-testid="hero"
      className="min-h-[70vh] flex items-center pt-24 pb-section-md relative overflow-hidden"
    >
      {/* Background Decorative Element */}
      <div className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/4 w-[600px] h-[600px] bg-sage-200/30 rounded-full blur-3xl z-0 pointer-events-none" />

      <div className="max-w-container mx-auto px-6 lg:px-8 relative z-10 w-full">
        <div className="grid lg:grid-cols-5 gap-12 lg:gap-16 items-center">
          <div className="lg:col-span-3 animate-fade-up">
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
              <Link to="/photos" className="btn-primary">
                {t('hero.viewPhotos', 'View the Photos')}
              </Link>
              <a href="#contact" className="btn-secondary">
                {t('hero.letsConnect')}
              </a>
            </div>

            {/* Field-notes strip — EXIF shorthand for the life so far */}
            <div
              className="inline-flex flex-wrap items-center gap-x-4 gap-y-1 font-mono text-[0.72rem] tracking-wide text-charcoal-500 border border-sage-200 bg-paper/70 rounded-lg px-4 py-2"
              aria-label={`Field notes: based in Fort Myers, Florida; ${destinations.length} countries across ${continents.size} continents; usually out shooting`}
            >
              <span>BASE&nbsp;FT&nbsp;MYERS,&nbsp;FL</span>
              <span aria-hidden="true" className="text-sage-400">✦</span>
              <span>{countryCount}&nbsp;COUNTRIES&nbsp;·&nbsp;{continentCount}&nbsp;CONTINENTS</span>
              <span aria-hidden="true" className="text-sage-300">|</span>
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-sage-500 animate-beacon" aria-hidden="true" />
                OUT&nbsp;SHOOTING
              </span>
            </div>
          </div>

          <div className="lg:col-span-2 animate-fade-up">
            <ContactSheet />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
