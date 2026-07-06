import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from './LanguageSwitcher';

const Footer = () => {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-charcoal-900 text-white py-12">
      <div className="max-w-container mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link to="/" className="text-xl font-semibold text-white mb-2 py-2 -mt-2 inline-flex items-center">
              Travis Vu
            </Link>
            <p className="text-charcoal-300 mb-6 max-w-sm">
              {t('footer.tagline')}
            </p>
            <div className="flex gap-3">
              <a
                href="https://www.linkedin.com/in/travis-harris/"
                className="p-3 -m-1 text-charcoal-300 hover:text-white transition-colors"
                target="_blank"
                rel="noopener noreferrer"
                aria-label={t('contact.social.linkedin')}
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
              <a
                href="https://github.com/hartra344"
                className="p-3 -m-1 text-charcoal-300 hover:text-white transition-colors"
                target="_blank"
                rel="noopener noreferrer"
                aria-label={t('contact.social.github')}
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
              </a>
              <a
                href="https://bsky.app/profile/travis.dev"
                className="p-3 -m-1 text-charcoal-300 hover:text-white transition-colors"
                target="_blank"
                rel="noopener noreferrer"
                aria-label={t('contact.social.bluesky')}
              >
                <svg
                  className="w-5 h-5"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 -3.268 64 68.414"
                  fill="currentColor"
                >
                  <path d="M13.873 3.805C21.21 9.332 29.103 20.537 32 26.55v15.882c0-.338-.13.044-.41.867-1.512 4.456-7.418 21.847-20.923 7.944-7.111-7.32-3.819-14.64 9.125-16.85-7.405 1.264-15.73-.825-18.014-9.015C1.12 23.022 0 8.51 0 6.55 0-3.268 8.579-.182 13.873 3.805zm36.254 0C42.79 9.332 34.897 20.537 32 26.55v15.882c0-.338.13.044.41.867 1.512 4.456 7.418 21.847 20.923 7.944 7.111-7.32 3.819-14.64-9.125-16.85 7.405 1.264 15.73-.825 18.014-9.015C62.88 23.022 64 8.51 64 6.55c0-9.818-8.578-6.732-13.873-2.745z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h2 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              {t('footer.quickLinks')}
            </h2>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/"
                  className="inline-flex items-center min-w-[44px] py-3.5 -my-3.5 text-charcoal-300 hover:text-white transition-colors text-sm"
                >
                  {t('nav.home')}
                </Link>
              </li>
              <li>
                <Link
                  to="/blog"
                  className="inline-flex items-center min-w-[44px] py-3.5 -my-3.5 text-charcoal-300 hover:text-white transition-colors text-sm"
                >
                  {t('nav.blog')}
                </Link>
              </li>
              <li>
                <a
                  href="/resume.html"
                  className="inline-flex items-center min-w-[44px] py-3.5 -my-3.5 text-charcoal-300 hover:text-white transition-colors text-sm"
                >
                  {t('footer.resume')}
                </a>
              </li>
            </ul>
          </div>

          {/* Language */}
          <div>
            <h2 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Language
            </h2>
            <LanguageSwitcher />
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-charcoal-700 pt-8 text-center space-y-2">
          <p className="text-charcoal-300 text-sm">
            © {currentYear} Travis Vu. {t('footer.rights')}
          </p>
          <p className="font-mono text-xs text-charcoal-300" aria-hidden="true">
            KFMY · 26.59°N 81.86°W · psst — type "fly"
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
