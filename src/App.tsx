import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import CircuitBoardBackground from './components/layout/CircuitBoardBackground';
import Navbar from './components/layout/Navbar';
import Home from './sections/Home';
import About from './sections/About';
import Skills from './sections/Skills';
import Experience from './sections/Experience';
import PersonalProjects from './sections/PersonalProjects';
import Contact from './sections/Contact';
import './lib/i18n';

function App() {
  const { t, i18n } = useTranslation();
  const [showCircuitBg, setShowCircuitBg] = useState(true);
  const isRtl = i18n.language === 'ar';

  useEffect(() => {
    document.documentElement.dir = isRtl ? 'rtl' : 'ltr';
  }, [isRtl]);

  useEffect(() => {
    const handleHashChange = () => {
      setShowCircuitBg(!window.location.hash.includes('about'));
    };
    window.addEventListener('hashchange', handleHashChange);
    handleHashChange();
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const circle = document.createElement('span');
      circle.className = 'mouse-click-circle';
      document.body.appendChild(circle);
      circle.style.left = `${e.clientX}px`;
      circle.style.top = `${e.clientY}px`;
      circle.addEventListener('animationend', () => { circle.remove(); });
    };
    document.addEventListener('click', handleClick);
    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, []);

  useEffect(() => {
    document.title = t('app.title');
  }, [t]);

  return (
    <div className="relative min-h-screen overflow-hidden" style={{ height: "600vh" }}> {/* Hauteur ajustée pour toutes les sections */}
      {showCircuitBg && (
        <div
          style={{
            position: 'fixed',
            zIndex: 0,
            left: 0,
            top: 0,
            width: '100vw',
            height: '600vh', // Correspond à la hauteur totale estimée
            pointerEvents: 'none',
          }}
        >
          <CircuitBoardBackground />
        </div>
      )}
      <Navbar />
      <main>
        <Home />
        <About />
        <Skills />
        <Experience />
        <PersonalProjects />
        <Contact />
      </main>
      <footer className="py-6 px-4 text-center text-sm text-gray-400 z-10 relative">
        <p>© {new Date().getFullYear()} Raphael Theuillon. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;