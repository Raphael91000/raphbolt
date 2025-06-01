import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Github, Linkedin } from 'lucide-react';
import AnimatedText from '../components/ui/AnimatedText';

const Home: React.FC = () => {
  const { t } = useTranslation();
  
  return (
    <section id="home" className="flex flex-col justify-center items-center relative">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="absolute inset-0 z-0"
      >
        {/* Blue beam effects are handled by AnimatedBackground component */}
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="z-10 text-center px-4"
      >
        <AnimatedText className="mb-4" />
        
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-5xl md:text-7xl font-bold mb-2"
        >
          {t('home.name')}
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-xl md:text-2xl text-gray-300 mb-6"
        >
          {t('home.tagline')}
        </motion.p>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-lg mb-8 max-w-2xl mx-auto"
        >
          {t('home.slogan')}
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="flex flex-col md:flex-row items-center justify-center gap-4"
        >
          <a 
            href="/CV-Raph-2025.pdf" 
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 bg-primary text-background font-medium rounded-lg hover:bg-primary-dark transition-colors flex items-center justify-center min-w-[180px]"
          >
            {t('home.cv')}
          </a>
          
          <div className="flex items-center space-x-4 mt-4 md:mt-0">
            <a 
              href="https://github.com/Raphael91000"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-background-light rounded-full hover:bg-background-light/80 transition-colors"
              aria-label="GitHub"
            >
              <Github size={24} />
            </a>
            <a 
              href="https://www.linkedin.com/in/raphael-theuillon-689139261/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-background-light rounded-full hover:bg-background-light/80 transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin size={24} />
            </a>
            <a 
              href="https://www.fiverr.com/users/raph910/seller_dashboard"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-background-light rounded-full hover:bg-background-light/80 transition-colors"
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
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.4 }}
        transition={{ duration: 1, delay: 1.2 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ 
              y: { 
                repeat: Infinity, 
                duration: 1.5,
                ease: "easeInOut" 
              }
            }}
            className="w-1 h-1 bg-white rounded-full mt-2"
          />
        </div>
      </motion.div>
    </section>
  );
};

export default Home;