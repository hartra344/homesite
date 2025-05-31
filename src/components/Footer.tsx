

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white py-20 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-72 h-72 bg-green-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-72 h-72 bg-emerald-500/5 rounded-full blur-3xl"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div>
            <h3 className="text-3xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparentmb-6">
              Travis Vu
            </h3>
            <p className="text-gray-300 mb-8 leading-relaxed text-lg">
              Software developer, manager, and amateur pilot building the future of cloud integration.
            </p>
            <div className="flex space-x-6">
              <a
                href="https://www.linkedin.com/in/travis-harris/"
                className="group bg-gradient-to-r from-green-600/20 to-emerald-700/20 border border-white/10 p-4 rounded-2xl hover:from-green-600/30 hover:to-emerald-700/30 transition-all duration-300 transform hover:scale-110"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn profile"
              >
                <svg className="w-6 h-6 text-green-400 group-hover:text-white transition-colors duration-300" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
              <a
                href="https://github.com/hartra344"
                className="group bg-gradient-to-r from-green-600/20 to-emerald-700/20 border border-white/10 p-4 rounded-2xl hover:from-green-600/30 hover:to-emerald-700/30 transition-all duration-300 transform hover:scale-110"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub profile"
              >
                <svg className="w-6 h-6 text-green-400 group-hover:text-white transition-colors duration-300" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </a>
              <a
                href="https://bsky.app/profile/travis.dev"
                className="group bg-gradient-to-r from-green-600/20 to-emerald-600/20 border border-white/10 p-4 rounded-2xl hover:from-green-600/30 hover:to-emerald-600/30 transition-all duration-300 transform hover:scale-110"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Bluesky profile"
              >
                <svg className="w-6 h-6 text-green-400 group-hover:text-white transition-colors duration-300" xmlns="http://www.w3.org/2000/svg" viewBox="0 -3.268 64 68.414" fill="currentColor">
                  <path d="M13.873 3.805C21.21 9.332 29.103 20.537 32 26.55v15.882c0-.338-.13.044-.41.867-1.512 4.456-7.418 21.847-20.923 7.944-7.111-7.32-3.819-14.64 9.125-16.85-7.405 1.264-15.73-.825-18.014-9.015C1.12 23.022 0 8.51 0 6.55 0-3.268 8.579-.182 13.873 3.805zm36.254 0C42.79 9.332 34.897 20.537 32 26.55v15.882c0-.338.13.044.41.867 1.512 4.456 7.418 21.847 20.923 7.944 7.111-7.32 3.819-14.64-9.125-16.85 7.405 1.264 15.73-.825 18.014-9.015C62.88 23.022 64 8.51 64 6.55c0-9.818-8.578-6.732-13.873-2.745z"/>
                </svg>
              </a>
              <a
                href="https://www.instagram.com/travih222/"
                className="group bg-gradient-to-r from-emerald-600/20 to-green-600/20 border border-white/10 p-4 rounded-2xl hover:from-emerald-600/30 hover:to-green-600/30 transition-all duration-300 transform hover:scale-110"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram profile"
              >
                <svg className="w-6 h-6 text-emerald-400 group-hover:text-white transition-colors duration-300" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-xl font-bold text-white mb-6">Quick Links</h4>
            <ul className="space-y-4">
              <li>
                <a href="#home" className="text-gray-400 hover:text-white transition-all duration-300 hover:translate-x-2 inline-block py-2 px-1 min-h-[44px] flex items-center">
                  Home
                </a>
              </li>
              <li>
                <a href="#about" className="text-gray-400 hover:text-white transition-all duration-300 hover:translate-x-2 inline-block py-2 px-1 min-h-[44px] flex items-center">
                  About
                </a>
              </li>
              <li>
                <a href="#experience" className="text-gray-400 hover:text-white transition-all duration-300 hover:translate-x-2 inline-block py-2 px-1 min-h-[44px] flex items-center">
                  Experience
                </a>
              </li>
              <li>
                <a href="#blog" className="text-gray-400 hover:text-white transition-all duration-300 hover:translate-x-2 inline-block py-2 px-1 min-h-[44px] flex items-center">
                  Blog
                </a>
              </li>
              <li>
                <a href="#contact" className="text-gray-400 hover:text-white transition-all duration-300 hover:translate-x-2 inline-block py-2 px-1 min-h-[44px] flex items-center">
                  Contact
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-xl font-bold text-white mb-6">Professional</h4>
            <ul className="space-y-4">
              <li>
                <a 
                  href="/resume.html" 
                  className="text-gray-400 hover:text-white transition-all duration-300 hover:translate-x-2 inline-block py-2 px-1 min-h-[44px] flex items-center"
                >
                  Resume
                </a>
              </li>
              <li>
                <a 
                  href="https://www.linkedin.com/in/travis-harris/"
                  className="text-gray-400 hover:text-green-400 transition-all duration-300 hover:translate-x-2 inline-block py-2 px-1 min-h-[44px] flex items-center"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  LinkedIn
                </a>
              </li>
              <li>
                <a 
                  href="https://github.com/hartra344"
                  className="text-gray-400 hover:text-green-400 transition-all duration-300 hover:translate-x-2 inline-block py-2 px-1 min-h-[44px] flex items-center"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  GitHub
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-white/10 mt-16 pt-12 text-center">
          <p className="text-gray-400 text-lg">
            © {currentYear} Travis Vu. All rights reserved. Built with React and Tailwind CSS.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
