import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Github, Linkedin } from 'lucide-react';
import AnimatedText from '../components/ui/AnimatedText';
import DynamicSplitText from "../components/animations/DynamicSplitText";
import CircuitBoardBackground from "../components/layout/CircuitBoardBackground";

const WORDS = ["J'apprends", "J'entreprends", "Je crée", "Je partage"];

const Home: React.FC = () => {
  const { t } = useTranslation();
  const [motIndex, setMotIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setMotIndex((prev) => (prev + 1) % WORDS.length);
    }, 2200);
    return () => clearInterval(timer);
  }, []);

  return (
    <section
      id="home"
      className="flex flex-col justify-center items-center relative min-h-screen overflow-hidden bg-black"
      // bg-black = fond noir garanti sur toute la section
    >
      <CircuitBoardBackground />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="z-10 text-center px-4 w-full"
      >
        <div className="flex flex-col items-center gap-6 md:gap-8">
          <AnimatedText className="text-white" />
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="text-3xl md:text-4xl font-semibold text-[#1ca6fa]"
          >
            <DynamicSplitText text={WORDS[motIndex]} duration={750} />
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-5xl md:text-7xl font-bold text-white"
          >
            {t('home.name')}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-xl md:text-2xl text-white"
          >
            {t('home.tagline')}
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="text-lg max-w-2xl mx-auto text-white"
          >
            {t('home.slogan')}
          </motion.p>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="flex flex-col md:flex-row items-center justify-center gap-4 mt-8"
        >
          <a
            href="/CV-Raph-2025.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 border border-white bg-white text-black font-medium rounded-lg transition-colors flex items-center justify-center min-w-[180px] hover:bg-[#22eaff] hover:text-white hover:border-[#22eaff]"
          >
            {t('home.cv')}
          </a>
          <div className="flex items-center space-x-4 mt-4 md:mt-0">
            <a
              href="https://github.com/Raphael91000"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 border border-white bg-white text-black rounded-full transition-colors hover:bg-[#22eaff] hover:text-white hover:border-[#22eaff]"
              aria-label="GitHub"
            >
              <Github size={24} />
            </a>
            <a
              href="https://www.linkedin.com/in/raphael-theuillon-689139261/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 border border-white bg-white text-black rounded-full transition-colors hover:bg-[#22eaff] hover:text-white hover:border-[#22eaff]"
              aria-label="LinkedIn"
            >
              <Linkedin size={24} />
            </a>
            <a
              href="https://www.fiverr.com/users/raph910/seller_dashboard"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 border border-white bg-white text-black rounded-full transition-colors hover:bg-[#22eaff] hover:text-white hover:border-[#22eaff]"
              aria-label="Fiverr"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M16.25 16.25v-10h-10v10h10m0-11.25c.69 0 1.25.56 1.25 1.25v10c0 .69-.56 1.25-1.25 1.25h-10c-.69 0-1.25-.56-1.25-1.25v-10c0-.69.56-1.25 1.25-1.25h10m-7.5 3.75v1.25h1.25v-1.25h-1.25m3.75 0v1.25h1.25v-1.25h-1.25m-3.75 2.5v1.25h1.25v-1.25h-1.25m3.75 0v1.25h1.25v-1.25h-1.25m-3.75 2.5v1.25h1.25v-1.25h-1.25m3.75 0v1.25h1.25v-1.25h-1.25z" />
              </svg>
            </a>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Home;
