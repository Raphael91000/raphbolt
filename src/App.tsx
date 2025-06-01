import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import AnimatedBackground from './components/layout/AnimatedBackground';
import LanguageSelector from './components/layout/LanguageSelector';
import Home from './sections/Home';
import About from './sections/About';
import Skills from './sections/Skills';
import Experience from './sections/Experience';
import Contact from './sections/Contact';
import './lib/i18n';

function App() {
  const { t } = useTranslation();
  
  useEffect(() => {
    document.title = t('app.title');
  }, [t]);
  
  return (
    <div className="relative">
      <AnimatedBackground />
      <LanguageSelector />
      
      <main>
        <Home />
        <About />
        <Skills />
        <Experience />
        <Contact />
      </main>
      
      <footer className="py-6 px-4 text-center text-sm text-gray-400">
        <p>© {new Date().getFullYear()} Raphael Theuillon. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;