import { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header.tsx';
import Hero from './components/Hero.tsx';
import About from './components/About.tsx';
import Experience from './components/Experience.tsx';
import Blog from './components/Blog.tsx';
import BlogPost from './components/BlogPost.tsx';
import Contact from './components/Contact.tsx';
import Footer from './components/Footer.tsx';

// Homepage component with all sections
function HomePage() {
  return (
    <main id="main-content">
      <Hero />
      <About />
      <Experience />
      <Blog />
      <Contact />
    </main>
  );
}

// Loading component for Suspense
function LoadingFallback() {
  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-400 mx-auto mb-4"></div>
        <p className="text-white">Loading translations...</p>
      </div>
    </div>
  );
}

function App() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <Router>
        <div className="min-h-screen bg-slate-900">
          <Header />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
          </Routes>
          <Footer />
        </div>
      </Router>
    </Suspense>
  );
}

export default App;
