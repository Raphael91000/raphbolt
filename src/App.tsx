import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import NeuralBeamsBackground from "./components/layout/CircuitBoardBackground"; // <-- Nouveau background animé
import NavBar from './components/layout/NavBar';
import Home from './sections/Home';
import About from './sections/About';
import Skills from './sections/Skills';
import Experience from './sections/Experience';
import Contact from './sections/Contact';
import './lib/i18n';

function App() {
  const { t } = useTranslation();
  const [showCircuitBg, setShowCircuitBg] = useState(true);

  // Met à jour le background selon l'ancre de l'URL
  useEffect(() => {
    const handleHashChange = () => {
      setShowCircuitBg(!window.location.hash.includes('about'));
    };
    window.addEventListener('hashchange', handleHashChange);
    handleHashChange();
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Effet clic souris
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const circle = document.createElement('span');
      circle.className = 'mouse-click-circle';
      document.body.appendChild(circle);

      circle.style.left = `${e.clientX}px`;
      circle.style.top = `${e.clientY}px`;

      circle.addEventListener('animationend', () => {
        circle.remove();
      });
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
    <div className="relative min-h-screen overflow-hidden">
      {/* NeuralBeamsBackground en full-screen, toujours derrière */}
      {showCircuitBg && (
        <div
          style={{
            position: 'fixed',
            zIndex: 0,
            left: 0,
            top: 0,
            width: '100vw',
            height: '100vh',
            pointerEvents: 'none'
          }}
        >
          <NeuralBeamsBackground />
        </div>
      )}
      <NavBar />
      <main>
        <Home />
        <About />
        <Skills />
        <Experience />
        <Contact />
      </main>
      <footer className="py-6 px-4 text-center text-sm text-gray-400 z-10 relative">
        <p>© {new Date().getFullYear()} Raphael Theuillon. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
