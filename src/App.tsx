import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import CircuitBoardBackground from "./components/layout/CircuitBoardBackground";
import NavBar from './components/layout/NavBar';
import Home from './sections/Home';
import About from './sections/About';
import Skills from './sections/Skills';
import Experience from './sections/Experience';
import Contact from './sections/Contact';
import './lib/i18n';

function App() {
  const { t } = useTranslation();

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
    <div className="relative min-h-screen">
      <CircuitBoardBackground /> {/* <-- Nouveau background circuit animé */}
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
