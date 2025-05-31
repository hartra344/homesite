import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Header = () => {
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

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    
    // If we're on a blog post page, navigate to home first
    if (location.pathname.startsWith('/blog/')) {
      navigate('/', { replace: true });
      // Use setTimeout to ensure navigation completes before scrolling
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      // We're on the home page, just scroll
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
    
    setIsMobileMenuOpen(false); // Close mobile menu after navigation
  };

  return (
    <>
      {/* Skip link for keyboard users */}
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-green-600 text-white px-4 py-2 rounded-md z-50"
      >
        Skip to main content
      </a>
      <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-slate-900/95 backdrop-blur-md border-b border-white/10' : 'bg-transparent'
      }`}>
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" aria-label="Main navigation">
        <div className="flex justify-between items-center py-6">
          <Link 
            to="/" 
            className="text-2xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent hover:scale-105 transition-transform duration-300 py-2.5"
          >
            Travis Vu
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            <a
              href="#home"
              onClick={(e) => handleLinkClick(e, 'home')}
              className="text-white/80 hover:text-white transition-all duration-300 hover:scale-105 relative group min-h-[44px] px-2 py-2 flex items-center"
              aria-label="Navigate to home section"
            >
              Home
              <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-green-400 to-emerald-400 group-hover:w-full transition-all duration-300"></div>
            </a>
            <a
              href="#about"
              onClick={(e) => handleLinkClick(e, 'about')}
              className="text-white/80 hover:text-white transition-all duration-300 hover:scale-105 relative group min-h-[44px] px-2 py-2 flex items-center"
              aria-label="Navigate to about section"
            >
              About
              <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-green-400 to-emerald-400 group-hover:w-full transition-all duration-300"></div>
            </a>
            <a
              href="#experience"
              onClick={(e) => handleLinkClick(e, 'experience')}
              className="text-white/80 hover:text-white transition-all duration-300 hover:scale-105 relative group min-h-[44px] px-2 py-2 flex items-center"
              aria-label="Navigate to experience section"
            >
              Experience
              <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-green-400 to-emerald-400 group-hover:w-full transition-all duration-300"></div>
            </a>
            <a
              href="#blog"
              onClick={(e) => handleLinkClick(e, 'blog')}
              className="text-white/80 hover:text-white transition-all duration-300 hover:scale-105 relative group min-h-[44px] px-2 py-2 flex items-center"
              aria-label="Navigate to blog section"
            >
              Blog
              <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-green-400 to-emerald-400 group-hover:w-full transition-all duration-300"></div>
            </a>
            <a
              href="#contact"
              onClick={(e) => handleLinkClick(e, 'contact')}
              className="text-white/80 hover:text-white transition-all duration-300 hover:scale-105 relative group min-h-[44px] px-2 py-2 flex items-center"
              aria-label="Navigate to contact section"
            >
              Contact
              <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-green-400 to-emerald-400 group-hover:w-full transition-all duration-300"></div>
            </a>
          </div>
          
          {/* Mobile menu button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-white p-2 min-h-[44px] min-w-[44px] flex items-center justify-center"
            aria-label="Toggle mobile menu"
            aria-expanded={isMobileMenuOpen}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
        
        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-slate-900/95 backdrop-blur-md border-t border-white/10">
            <div className="px-4 py-6 space-y-4">
              <a
                href="#home"
                onClick={(e) => handleLinkClick(e, 'home')}
                className="block w-full text-left text-white/80 hover:text-white transition-all duration-300 py-3 px-4 rounded-lg hover:bg-white/10 min-h-[44px] flex items-center"
                aria-label="Navigate to home section"
              >
                Home
              </a>
              <a
                href="#about"
                onClick={(e) => handleLinkClick(e, 'about')}
                className="block w-full text-left text-white/80 hover:text-white transition-all duration-300 py-3 px-4 rounded-lg hover:bg-white/10 min-h-[44px] flex items-center"
                aria-label="Navigate to about section"
              >
                About
              </a>
              <a
                href="#experience"
                onClick={(e) => handleLinkClick(e, 'experience')}
                className="block w-full text-left text-white/80 hover:text-white transition-all duration-300 py-3 px-4 rounded-lg hover:bg-white/10 min-h-[44px] flex items-center"
                aria-label="Navigate to experience section"
              >
                Experience
              </a>
              <a
                href="#blog"
                onClick={(e) => handleLinkClick(e, 'blog')}
                className="block w-full text-left text-white/80 hover:text-white transition-all duration-300 py-3 px-4 rounded-lg hover:bg-white/10 min-h-[44px] flex items-center"
                aria-label="Navigate to blog section"
              >
                Blog
              </a>
              <a
                href="#contact"
                onClick={(e) => handleLinkClick(e, 'contact')}
                className="block w-full text-left text-white/80 hover:text-white transition-all duration-300 py-3 px-4 rounded-lg hover:bg-white/10 min-h-[44px] flex items-center"
                aria-label="Navigate to contact section"
              >
                Contact
              </a>
            </div>
          </div>
        )}
      </nav>
    </header>
    </>
  );
};

export default Header;
