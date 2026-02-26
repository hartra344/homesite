import { useTranslation } from 'react-i18next';

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

        <div className="max-w-2xl mx-auto">
          {/* Contact Info */}
          <div className="bg-paper border border-sage-200 rounded-2xl p-8 md:p-12 shadow-sm text-center">
            <h3 className="text-heading-2 font-medium text-charcoal-900 mb-8">
              {t('contact.letsConnect')}
            </h3>

            <div className="flex flex-col md:flex-row gap-8 justify-center mb-10">
              <div className="flex flex-col items-center gap-3">
                <div className="p-4 bg-sage-100 rounded-full">
                  <svg
                    className="w-6 h-6 text-sage-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <div className="text-center">
                  <h4 className="font-medium text-charcoal-900 mb-1">
                    {t('contact.form.email')}
                  </h4>
                  <a
                    href="mailto:me@travis.dev"
                    className="text-charcoal-600 hover:text-sage-600 transition-colors"
                  >
                    me@travis.dev
                  </a>
                </div>
              </div>

              <div className="hidden md:block w-px bg-sage-200"></div>

              <div className="flex flex-col items-center gap-3">
                <div className="p-4 bg-sage-100 rounded-full">
                  <svg
                    className="w-6 h-6 text-sage-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </div>
                <div className="text-center">
                  <h4 className="font-medium text-charcoal-900 mb-1">
                    {t('contact.location')}
                  </h4>
                  <p className="text-charcoal-600">{t('contact.locationValue')}</p>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div>
              <h4 className="font-medium text-charcoal-900 mb-4">
                {t('contact.findMeOnline')}
              </h4>
              <div className="flex gap-4 justify-center">
                <a
                  href="https://www.linkedin.com/in/travis-harris/"
                  className="p-3 bg-white border border-sage-200 rounded-xl text-charcoal-600 hover:text-sage-600 hover:border-sage-300 transition-all hover:-translate-y-1 shadow-sm"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={t('contact.social.linkedin')}
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </a>
                <a
                  href="https://github.com/hartra344"
                  className="p-3 bg-white border border-sage-200 rounded-xl text-charcoal-600 hover:text-sage-600 hover:border-sage-300 transition-all hover:-translate-y-1 shadow-sm"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={t('contact.social.github')}
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                </a>
                <a
                  href="https://bsky.app/profile/travis.dev"
                  className="p-3 bg-white border border-sage-200 rounded-xl text-charcoal-600 hover:text-sage-600 hover:border-sage-300 transition-all hover:-translate-y-1 shadow-sm"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={t('contact.social.bluesky')}
                >
                  <svg
                    className="w-6 h-6"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 -3.268 64 68.414"
                    fill="currentColor"
                  >
                    <path d="M13.873 3.805C21.21 9.332 29.103 20.537 32 26.55v15.882c0-.338-.13.044-.41.867-1.512 4.456-7.418 21.847-20.923 7.944-7.111-7.32-3.819-14.64 9.125-16.85-7.405 1.264-15.73-.825-18.014-9.015C1.12 23.022 0 8.51 0 6.55 0-3.268 8.579-.182 13.873 3.805zm36.254 0C42.79 9.332 34.897 20.537 32 26.55v15.882c0-.338.13.044.41.867 1.512 4.456 7.418 21.847 20.923 7.944 7.111-7.32 3.819-14.64-9.125-16.85 7.405 1.264 15.73-.825 18.014-9.015C62.88 23.022 64 8.51 64 6.55c0-9.818-8.578-6.732-13.873-2.745z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
