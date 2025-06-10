import React, { useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Card3D from '../components/ui/Card3D';
import AnimatedBot from '../components/ui/AnimatedBot';
import { skills } from '../constants/skills';

const Skills: React.FC = () => {
  const { t } = useTranslation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [currentIndex, setCurrentIndex] = useState(0);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartX.current - touchEndX.current > 50) {
      handleNext();
    } else if (touchEndX.current - touchStartX.current > 50) {
      handlePrev();
    }
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % skills.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + skills.length) % skills.length);
  };

  // Cards responsive
  const visibleSkills = () => {
    if (typeof window !== 'undefined' && window.innerWidth < 768) {
      return [skills[currentIndex]];
    }
    if (typeof window !== 'undefined' && window.innerWidth < 1024) {
      return [
        skills[currentIndex],
        skills[(currentIndex + 1) % skills.length]
      ];
    }
    return [
      skills[currentIndex],
      skills[(currentIndex + 1) % skills.length],
      skills[(currentIndex + 2) % skills.length]
    ];
  };

  return (
    <section 
      id="skills" 
      className="relative py-20 px-4 md:px-10 bg-black"
      // Option : pour un effet tech subtil tu peux remplacer bg-black par bg-gradient-to-b from-black via-[#161626] to-[#22223b]
    >
      <div ref={ref} className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <motion.div
            initial={{ width: 0 }}
            animate={inView ? { width: '80px' } : { width: 0 }}
            transition={{ duration: 0.8 }}
            className="h-1 bg-primary mx-auto mb-6"
          />
          <motion.h2
            className="text-4xl md:text-5xl font-bold mb-4 text-white"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {t('skillsSection.title')}
          </motion.h2>
          <motion.p
            className="text-xl text-gray-300"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {t('skillsSection.subtitle')}
          </motion.p>
        </div>

        <div
          className="relative"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
            {visibleSkills().map((skill, index) => (
              <Card3D
                key={`${skill.id}-${index}`}
                title={skill.title}
                description={skill.description}
                icon={skill.icon}
                color={skill.color}
                index={index}
              />
            ))}
          </div>

          <div className="flex justify-center mt-10 space-x-2">
            {skills.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentIndex ? 'bg-primary' : 'bg-gray-600'
                }`}
                aria-label={`Go to skill ${index + 1}`}
              />
            ))}
          </div>

          <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -ml-4 md:ml-0">
            <button
              onClick={handlePrev}
              className="p-2 rounded-full bg-background-light hover:bg-primary/20 transition-colors"
              aria-label="Previous skill"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 18 9 12 15 6"></polyline>
              </svg>
            </button>
          </div>
          <div className="absolute right-0 top-1/2 transform -translate-y-1/2 -mr-4 md:mr-0">
            <button
              onClick={handleNext}
              className="p-2 rounded-full bg-background-light hover:bg-primary/20 transition-colors"
              aria-label="Next skill"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </button>
          </div>
        </div>
      </div>
      <AnimatedBot />
    </section>
  );
};

export default Skills;