import { useTranslation } from 'react-i18next';

const socials = [
  {
    label: 'linkedin',
    href: 'https://www.linkedin.com/in/travis-harris/',
    path: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z',
    viewBox: '0 0 24 24',
  },
  {
    label: 'github',
    href: 'https://github.com/hartra344',
    path: 'M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z',
    viewBox: '0 0 24 24',
  },
  {
    label: 'bluesky',
    href: 'https://bsky.app/profile/travis.dev',
    path: 'M13.873 3.805C21.21 9.332 29.103 20.537 32 26.55v15.882c0-.338-.13.044-.41.867-1.512 4.456-7.418 21.847-20.923 7.944-7.111-7.32-3.819-14.64 9.125-16.85-7.405 1.264-15.73-.825-18.014-9.015C1.12 23.022 0 8.51 0 6.55 0-3.268 8.579-.182 13.873 3.805zm36.254 0C42.79 9.332 34.897 20.537 32 26.55v15.882c0-.338.13.044.41.867 1.512 4.456 7.418 21.847 20.923 7.944 7.111-7.32 3.819-14.64-9.125-16.85 7.405 1.264 15.73-.825 18.014-9.015C62.88 23.022 64 8.51 64 6.55c0-9.818-8.578-6.732-13.873-2.745z',
    viewBox: '0 -3.268 64 68.414',
  },
];

const Contact = () => {
  const { t } = useTranslation();

  return (
    <section
      id="contact"
      data-testid="contact"
      className="py-section-lg bg-sage-50"
    >
      <div className="max-w-container mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-display-2 font-semibold text-charcoal-900 mb-4">
            {t('contact.title')}
          </h2>
          <p className="text-body-lg text-charcoal-600 max-w-2xl mx-auto">
            {t('contact.subtitle')}
          </p>
        </div>

        {/* Boarding pass */}
        <div className="max-w-3xl mx-auto">
          <div className="bg-paper border border-sage-200 rounded-2xl shadow-sm overflow-hidden">
            {/* Header strip */}
            <div className="bg-sage-600 text-white px-6 md:px-8 py-3 flex items-center justify-between font-mono text-[0.72rem] tracking-widest">
              <span>BOARDING PASS</span>
              <span className="hidden sm:inline" aria-hidden="true">
                TRAVIS AIR ✈ TRAVIS.DEV
              </span>
              <span>FIRST CLASS</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_260px]">
              {/* Main section */}
              <div className="p-6 md:p-8">
                {/* Route */}
                <div className="flex items-center gap-4 mb-8">
                  <div>
                    <p className="font-mono text-[0.68rem] tracking-widest text-charcoal-500 mb-1">
                      FROM
                    </p>
                    <p className="text-heading-1 font-semibold font-display text-charcoal-900 leading-none">
                      YOU
                    </p>
                  </div>
                  <div className="flex-1 relative h-px border-t-2 border-dashed border-sage-300 mx-2" aria-hidden="true">
                    <svg
                      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-5 h-5 text-sage-500 bg-paper"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M21 16v-2l-8-5V3.5a1.5 1.5 0 0 0-3 0V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z" transform="rotate(90 12 12)" />
                    </svg>
                  </div>
                  <div className="text-right">
                    <p className="font-mono text-[0.68rem] tracking-widest text-charcoal-500 mb-1">
                      TO
                    </p>
                    <p className="text-heading-1 font-semibold font-display text-charcoal-900 leading-none">
                      TRAVIS
                    </p>
                  </div>
                </div>

                {/* Pass details */}
                <dl className="grid grid-cols-2 sm:grid-cols-4 gap-x-4 gap-y-5 mb-8">
                  <div>
                    <dt className="font-mono text-[0.68rem] tracking-widest text-charcoal-500 mb-1">
                      GATE
                    </dt>
                    <dd className="text-body font-medium text-charcoal-900">Always open</dd>
                  </div>
                  <div>
                    <dt className="font-mono text-[0.68rem] tracking-widest text-charcoal-500 mb-1">
                      SEAT
                    </dt>
                    <dd className="text-body font-medium text-charcoal-900">1A</dd>
                  </div>
                  <div className="col-span-2">
                    <dt className="font-mono text-[0.68rem] tracking-widest text-charcoal-500 mb-1">
                      {t('contact.location').toUpperCase()}
                    </dt>
                    <dd className="text-body font-medium text-charcoal-900">
                      {t('contact.locationValue')}
                    </dd>
                  </div>
                </dl>

                {/* Email + socials */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-5 justify-between">
                  <a
                    href="mailto:me@travis.dev"
                    className="inline-flex items-center gap-2 min-h-[44px] text-sage-700 hover:text-sage-600 font-medium transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                    me@travis.dev
                  </a>
                  <div className="flex gap-3">
                    {socials.map((social) => (
                      <a
                        key={social.label}
                        href={social.href}
                        className="p-3 bg-white border border-sage-200 rounded-xl text-charcoal-600 hover:text-sage-600 hover:border-sage-300 transition-all hover:-translate-y-1 shadow-sm"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={t(`contact.social.${social.label}`)}
                      >
                        <svg className="w-5 h-5" fill="currentColor" viewBox={social.viewBox}>
                          <path d={social.path} />
                        </svg>
                      </a>
                    ))}
                  </div>
                </div>
              </div>

              {/* Perforated divider */}
              <div className="relative hidden md:block w-px border-l-2 border-dashed border-sage-300 my-0" aria-hidden="true">
                <span className="absolute -top-[1px] left-1/2 -translate-x-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-sage-50 border-b border-sage-200" />
                <span className="absolute -bottom-[1px] left-1/2 -translate-x-1/2 translate-y-1/2 w-5 h-5 rounded-full bg-sage-50 border-t border-sage-200" />
              </div>
              <div className="relative md:hidden h-px border-t-2 border-dashed border-sage-300 mx-0" aria-hidden="true">
                <span className="absolute -left-[1px] top-1/2 -translate-y-1/2 -translate-x-1/2 w-5 h-5 rounded-full bg-sage-50 border-r border-sage-200" />
                <span className="absolute -right-[1px] top-1/2 -translate-y-1/2 translate-x-1/2 w-5 h-5 rounded-full bg-sage-50 border-l border-sage-200" />
              </div>

              {/* Stub */}
              <div className="p-6 md:p-8 flex flex-row md:flex-col items-center justify-between md:justify-center gap-4 md:gap-5">
                <div className="text-center">
                  <p className="font-mono text-[0.68rem] tracking-widest text-charcoal-500 mb-1">
                    PASSENGER
                  </p>
                  <p className="text-body font-semibold text-charcoal-900">FUTURE COLLABORATOR</p>
                  <p className="font-mono text-[0.68rem] tracking-widest text-charcoal-500 mt-3 mb-1">
                    FLIGHT
                  </p>
                  <p className="font-mono text-body font-semibold text-charcoal-900">TV 2026</p>
                </div>
                {/* Barcode */}
                <div
                  className="h-16 w-28 md:w-full rounded-sm opacity-80"
                  style={{
                    backgroundImage:
                      'repeating-linear-gradient(90deg, #2d3a2e 0 2px, transparent 2px 4px, #2d3a2e 4px 7px, transparent 7px 9px, #2d3a2e 9px 10px, transparent 10px 14px)',
                  }}
                  aria-hidden="true"
                />
              </div>
            </div>
          </div>

          <p className="text-center font-mono text-[0.72rem] tracking-wider text-charcoal-500 mt-6" aria-hidden="true">
            NO MIDDLE SEATS ON THIS AIRLINE · REPLIES USUALLY SAME-DAY
          </p>
        </div>
      </div>
    </section>
  );
};

export default Contact;
