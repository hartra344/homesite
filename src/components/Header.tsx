import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from './LanguageSwitcher';

const Header = () => {
  const { t } = useTranslation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScrollLink = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();

    // If we're not on homepage, navigate there first
    if (location.pathname !== '/') {
      navigate('/', { replace: true });
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }

    setIsMobileMenuOpen(false);
  };

  const isOnBlogPage = location.pathname === '/blog' || location.pathname.startsWith('/blog/');

  return (
    <>
      {/* Skip link for keyboard users */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-sage-500 text-white px-4 py-2 rounded-md z-50"
      >
        Skip to main content
      </a>
      <header
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-cream/95 backdrop-blur-md border-b border-sage-200 shadow-sm'
            : 'bg-transparent'
        }`}
      >
        <nav className="max-w-container mx-auto px-6 lg:px-8" aria-label="Main navigation">
          <div className="flex justify-between items-center py-4">
            <Link
              to="/"
              className="text-xl font-semibold text-charcoal-900 hover:text-sage-600 transition-colors duration-200"
            >
              Travis Vu
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              <a
                href="#about"
                onClick={(e) => handleScrollLink(e, 'about')}
                className="text-charcoal-600 hover:text-charcoal-900 transition-colors duration-200 text-body font-medium"
                aria-label="Navigate to about section"
              >
                {t('nav.about')}
              </a>
              <Link
                to="/blog"
                className={`text-body font-medium transition-colors duration-200 ${
                  isOnBlogPage
                    ? 'text-sage-600'
                    : 'text-charcoal-600 hover:text-charcoal-900'
                }`}
                aria-label="Navigate to blog"
              >
                {t('nav.blog')}
              </Link>
              <a
                href="#contact"
                onClick={(e) => handleScrollLink(e, 'contact')}
                className="text-charcoal-600 hover:text-charcoal-900 transition-colors duration-200 text-body font-medium"
                aria-label="Navigate to contact section"
              >
                {t('nav.contact')}
              </a>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden text-charcoal-900 p-2 min-h-[44px] min-w-[44px] flex items-center justify-center rounded-lg hover:bg-sage-50 transition-colors"
              aria-label="Toggle mobile menu"
              aria-expanded={isMobileMenuOpen}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>

          {/* Mobile Navigation Menu */}
          {isMobileMenuOpen && (
            <div className="md:hidden bg-paper border-t border-sage-200">
              <div className="px-4 py-6 space-y-2">
                <a
                  href="#about"
                  onClick={(e) => handleScrollLink(e, 'about')}
                  className="block text-charcoal-600 hover:text-charcoal-900 hover:bg-sage-50 transition-colors duration-200 py-3 px-4 rounded-lg min-h-[44px] flex items-center"
                  aria-label="Navigate to about section"
                >
                  {t('nav.about')}
                </a>
                <Link
                  to="/blog"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`block py-3 px-4 rounded-lg min-h-[44px] flex items-center transition-colors duration-200 ${
                    isOnBlogPage
                      ? 'text-sage-600 bg-sage-50'
                      : 'text-charcoal-600 hover:text-charcoal-900 hover:bg-sage-50'
                  }`}
                  aria-label="Navigate to blog"
                >
                  {t('nav.blog')}
                </Link>
                <a
                  href="#contact"
                  onClick={(e) => handleScrollLink(e, 'contact')}
                  className="block text-charcoal-600 hover:text-charcoal-900 hover:bg-sage-50 transition-colors duration-200 py-3 px-4 rounded-lg min-h-[44px] flex items-center"
                  aria-label="Navigate to contact section"
                >
                  {t('nav.contact')}
                </a>
                <div className="pt-4 border-t border-sage-200">
                  <LanguageSwitcher />
                </div>
              </div>
            </div>
          )}
        </nav>
      </header>
    </>
  );
};

export default Header;
