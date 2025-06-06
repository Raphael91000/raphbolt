import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useTranslation } from 'react-i18next';
import {
  FaCode,
  FaRobot,
  FaBoxes,
  FaHardHat,
  FaLightbulb,
  FaBullhorn,
  FaUserFriends,
  FaHandshake
} from 'react-icons/fa';
import AnimatedBot from '../components/ui/AnimatedBot';

const Skills: React.FC = () => {
  const { t } = useTranslation();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [currentPage, setCurrentPage] = useState(0);
  const [visibleCount, setVisibleCount] = useState(3);
  const [isMobile, setIsMobile] = useState(false);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const skills = [
    { id: 1, key: 'relation_client', icon: <FaHandshake /> },
    { id: 2, key: 'logistique', icon: <FaBoxes /> },
    { id: 3, key: 'experience_terrain', icon: <FaHardHat /> },
    { id: 4, key: 'entrepreneur', icon: <FaLightbulb /> },
    { id: 5, key: 'automatisation', icon: <FaRobot /> },
    { id: 6, key: 'marketing', icon: <FaBullhorn /> },
    { id: 7, key: 'developpement_web', icon: <FaCode /> },
    { id: 8, key: 'competences_humaines', icon: <FaUserFriends /> },
  ];

  useEffect(() => {
    const updateVisibleCount = () => {
      const width = window.innerWidth;
      if (width < 768) {
        setVisibleCount(1);
        setIsMobile(true);
      } else if (width < 1024) {
        setVisibleCount(2);
        setIsMobile(false);
      } else {
        setVisibleCount(3);
        setIsMobile(false);
      }
    };
    updateVisibleCount();
    window.addEventListener('resize', updateVisibleCount);
    return () => window.removeEventListener('resize', updateVisibleCount);
  }, []);

  const totalPages = Math.ceil(skills.length / visibleCount);

  const handleTouchStart = (e: React.TouchEvent) => {
    if (!isMobile) return;
    touchStartX.current = e.changedTouches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!isMobile) return;
    touchEndX.current = e.changedTouches[0].clientX;
    const deltaX = touchEndX.current - touchStartX.current;
    if (Math.abs(deltaX) > 50) {
      if (deltaX > 0) {
        handlePrev();
      } else {
        handleNext();
      }
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrev = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleDotClick = (index: number) => {
    setCurrentPage(index);
  };

  const visibleSkills = () => {
    const startIndex = currentPage * visibleCount;
    return skills.slice(startIndex, startIndex + visibleCount);
  };

  return (
    <section id="skills" className="relative py-20 px-4 md:px-10">
      <div ref={ref} className="max-w-6xl mx-auto">
        <motion.h2
          className="text-4xl md:text-5xl font-bold text-white text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {t('skills.title')}
        </motion.h2>

        <div
          className="relative"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -ml-4 md:ml-0 z-10">
            <button
              onClick={handlePrev}
              disabled={currentPage === 0}
              className="p-2 rounded-full bg-gray-800 hover:bg-[#22eaff]/20 transition-colors disabled:opacity-30"
              aria-label="Previous skill"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6" /></svg>
            </button>
          </div>

          <div className="absolute right-0 top-1/2 transform -translate-y-1/2 -mr-4 md:mr-0 z-10">
            <button
              onClick={handleNext}
              disabled={currentPage >= totalPages - 1}
              className="p-2 rounded-full bg-gray-800 hover:bg-[#22eaff]/20 transition-colors disabled:opacity-30"
              aria-label="Next skill"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6" /></svg>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
            {visibleSkills().map((skill, index) => (
              <motion.div
                key={`${skill.id}-${index}`}
                className="w-full max-w-[300px] bg-black text-white p-6 rounded-lg border border-gray-700 shadow-lg animate-[pulseGlow_3s_ease-in-out_infinite]"
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 0.3, delay: index * 0.2 }}
                style={{
                  animationName: 'glitchIn, pulseGlow',
                  animationDuration: '0.6s, 3s',
                  animationTimingFunction: 'ease-out, ease-in-out',
                  animationIterationCount: '1, infinite',
                }}
              >
                <div className="flex flex-col items-center text-center space-y-4">
                  <div className="text-4xl text-[#22eaff]">{skill.icon}</div>
                  <h3 className="text-[#22eaff] font-bold text-xl">{t(`skills.${skill.key}.title`)}</h3>
                  <p className="text-white text-sm">{t(`skills.${skill.key}.description`)}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="flex justify-center mt-8 space-x-2">
            {Array.from({ length: totalPages }).map((_, idx) => (
              <button
                key={idx}
                onClick={() => handleDotClick(idx)}
                className={`w-3 h-3 rounded-full ${idx === currentPage ? 'bg-[#22eaff]' : 'bg-gray-500'} transition-all duration-300`}
                aria-label={`Go to page ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

      <AnimatedBot />
    </section>
  );
};

export default Skills;
