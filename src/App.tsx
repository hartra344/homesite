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

function App() {
  return (
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
  );
}

export default App;
