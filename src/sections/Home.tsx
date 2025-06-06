import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Github, Linkedin } from 'lucide-react';
import CircuitBoardBackground from "../components/layout/CircuitBoardBackground";
import SplitRevealText from "../components/animations/SplitRevealText";

const NAVBAR_BLUE = "#22eaff";

const Home: React.FC = () => {
  const { t } = useTranslation();
  const [motIndex, setMotIndex] = useState(0);

  // Tableau dynamique basé sur les traductions
  const phrases = [
    t('text.learn'),
    t('text.enterprise'),
    t('text.create'),
    t('text.innovate'),
    t('text.share'),
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setMotIndex((prev) => (prev + 1) % phrases.length);
    }, 3200);
    return () => clearInterval(timer);
  }, [phrases]);

  return (
    <section
      id="home"
      className="flex flex-col justify-center items-center relative min-h-screen overflow-hidden bg-black"
    >
      <CircuitBoardBackground />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="z-10 text-center px-4 w-full"
      >
        <div className="flex flex-col items-center gap-7 md:gap-12">
          {/* Texte dynamique avec effet split horizontal */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="w-full flex justify-center"
          >
            <SplitRevealText
              className="text-[6vw] md:text-[3.5vw] font-extrabold leading-[1.07] mb-3"
              color={NAVBAR_BLUE}
              duration={1.1}
            >
              {phrases[motIndex]}
            </SplitRevealText>
          </motion.div>

          {/* Slogan, tagline, etc */}
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

        {/* Boutons réseaux avec effet survol et contours */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="flex flex-col md:flex-row items-center justify-center gap-4 mt-6"
        >
          <a
            href="/CV-Raph-2025.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 bg-transparent border border-white/20 rounded-lg text-white font-medium text-base transition-all relative group min-w-[180px] text-center"
            style={{
              transition: "color 0.2s, background-color 0.2s, box-shadow 0.2s, border-color 0.2s",
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.color = "#000";
              e.currentTarget.style.backgroundColor = NAVBAR_BLUE;
              e.currentTarget.style.boxShadow = `0 0 8px ${NAVBAR_BLUE}80`;
              e.currentTarget.style.borderColor = NAVBAR_BLUE;
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.color = "#fff";
              e.currentTarget.style.backgroundColor = "transparent";
              e.currentTarget.style.boxShadow = "none";
              e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.2)";
            }}
          >
            {t('home.cv')}
            <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[${NAVBAR_BLUE}] group-hover:w-full transition-all duration-300" />
          </a>
          <div className="flex items-center gap-4 mt-4 md:mt-0">
            <a
              href="https://github.com/Raphael91000"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-transparent border border-white/20 rounded-full text-white transition-all relative group"
              style={{
                transition: "color 0.2s, background-color 0.2s, box-shadow 0.2s, border-color 0.2s",
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.color = "#000";
                e.currentTarget.style.backgroundColor = NAVBAR_BLUE;
                e.currentTarget.style.boxShadow = `0 0 8px ${NAVBAR_BLUE}80`;
                e.currentTarget.style.borderColor = NAVBAR_BLUE;
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.color = "#fff";
                e.currentTarget.style.backgroundColor = "transparent";
                e.currentTarget.style.boxShadow = "none";
                e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.2)";
              }}
              aria-label="GitHub"
            >
              <Github size={24} />
              <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[${NAVBAR_BLUE}] group-hover:w-full transition-all duration-300" />
            </a>
            <a
              href="https://www.linkedin.com/in/raphael-theuillon-689139261/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-transparent border border-white/20 rounded-full text-white transition-all relative group"
              style={{
                transition: "color 0.2s, background-color 0.2s, box-shadow 0.2s, border-color 0.2s",
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.color = "#000";
                e.currentTarget.style.backgroundColor = NAVBAR_BLUE;
                e.currentTarget.style.boxShadow = `0 0 8px ${NAVBAR_BLUE}80`;
                e.currentTarget.style.borderColor = NAVBAR_BLUE;
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.color = "#fff";
                e.currentTarget.style.backgroundColor = "transparent";
                e.currentTarget.style.boxShadow = "none";
                e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.2)";
              }}
              aria-label="LinkedIn"
            >
              <Linkedin size={24} />
              <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[${NAVBAR_BLUE}] group-hover:w-full transition-all duration-300" />
            </a>
            <a
              href="https://www.fiverr.com/users/raph910/seller_dashboard"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-transparent border border-white/20 rounded-full text-white transition-all relative group"
              style={{
                transition: "color 0.2s, background-color 0.2s, box-shadow 0.2s, border-color 0.2s",
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.color = "#000";
                e.currentTarget.style.backgroundColor = NAVBAR_BLUE;
                e.currentTarget.style.boxShadow = `0 0 8px ${NAVBAR_BLUE}80`;
                e.currentTarget.style.borderColor = NAVBAR_BLUE;
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.color = "#fff";
                e.currentTarget.style.backgroundColor = "transparent";
                e.currentTarget.style.boxShadow = "none";
                e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.2)";
              }}
              aria-label="Fiverr"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path fill="currentColor" d="M7.573 18.676c0 1.184-.95 2.145-2.122 2.145s-2.122-.96-2.122-2.145c0-1.183.95-2.144 2.122-2.144s2.122.96 2.122 2.144m2.788-3.74c0 .592-.475 1.073-1.06 1.073s-1.061-.48-1.061-1.073c0-.592.475-1.073 1.06-1.073s1.061.48 1.061 1.073m5.297 0c0 .592-.475 1.073-1.06 1.073s-1.061-.48-1.061-1.073c0-.592.475-1.073 1.06-1.073s1.061.48 1.061 1.073m2.827 3.74c0 1.184-.95 2.145-2.122 2.145s-2.122-.96-2.122-2.145c0-1.183.95-2.144 2.122-2.144s2.122.96 2.122 2.144m2.827-7.48V5.934c0-.592-.475-1.073-1.06-1.073h-3.183V2.146c0-.592-.475-1.073-1.06-1.073H2.122C1.53 1.073 1.06 1.554 1.06 2.146v12.868c0 .592.475 1.073 1.06 1.073h3.183v3.218c0 .592.475 1.073 1.06 1.073h2.122c.585 0 1.06-.48 1.06-1.073v-3.218h2.122v3.218c0 .592.475 1.073 1.06 1.073h2.122c.585 0 1.06-.48 1.06-1.073v-3.218h3.183c.585 0 1.06-.48 1.06-1.073v-2.145h-2.122v1.072h-1.061c-.585 0-1.06.48-1.06 1.073s.475 1.073 1.06 1.073h2.122c.585 0 1.06-.48 1.06-1.073v-3.218c0-.592-.475-1.073-1.06-1.073" />
              </svg>
              <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[${NAVBAR_BLUE}] group-hover:w-full transition-all duration-300" />
            </a>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Home;
