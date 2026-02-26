import { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header.tsx';
import Hero from './components/Hero.tsx';
import About from './components/About.tsx';
import FeaturedPosts from './components/FeaturedPosts.tsx';
import BlogPage from './components/BlogPage.tsx';
import BlogPost from './components/BlogPost.tsx';
import Contact from './components/Contact.tsx';
import Footer from './components/Footer.tsx';

// Homepage component with focused sections
function HomePage() {
  return (
    <main id="main-content">
      <Hero />
      <About />
      <FeaturedPosts />
      <Contact />
    </main>
  );
}

// Loading component for Suspense
function LoadingFallback() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-cream">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sage-500 mx-auto mb-4"></div>
        <p className="text-charcoal-600">Loading...</p>
      </div>
    </div>
  );
}

function App() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <Router>
        <div className="min-h-screen bg-cream">
          <Header />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
          </Routes>
          <Footer />
        </div>
      </Router>
    </Suspense>
  );
}

export default App;
