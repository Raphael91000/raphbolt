import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
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

const skills = [
  {
    id: 1,
    title: 'Relation client & négociation',
    description: 'Prospection, suivi client, rendez-vous, gestion SAV et formation commerciale.',
    icon: <FaHandshake />,
  },
  {
    id: 2,
    title: 'Logistique & préparation de commandes',
    description: 'Picking, scan, emballage, organisation des tournées et optimisation des flux.',
    icon: <FaBoxes />,
  },
  {
    id: 3,
    title: 'Expérience terrain & gestion de chantier',
    description: 'Maçonnerie, lecture de plans, sécurité, devis, suivi chantiers.',
    icon: <FaHardHat />,
  },
  {
    id: 4,
    title: 'Entrepreneur multi-projets',
    description: 'Création et gestion de plusieurs entreprises (transport, restauration, lavage auto).',
    icon: <FaLightbulb />,
  },
  {
    id: 5,
    title: 'Automatisation & intelligence artificielle',
    description: 'Création d’agents IA, automatisation de processus, productivité augmentée.',
    icon: <FaRobot />,
  },
  {
    id: 6,
    title: 'Marketing digital & contenus',
    description: 'Création visuelle (Canva), vidéos TikTok, stratégie de présence en ligne.',
    icon: <FaBullhorn />,
  },
  {
    id: 7,
    title: 'Développement web',
    description: 'Codage moderne, création de sites dynamiques, composants interactifs.',
    icon: <FaCode />,
  },
  {
    id: 8,
    title: 'Compétences humaines',
    description: 'Écoute, autonomie, travail d’équipe, résilience, apprentissage continu.',
    icon: <FaUserFriends />,
  },
];

const Skills: React.FC = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [currentPage, setCurrentPage] = useState(0);
  const [visibleCount, setVisibleCount] = useState(3);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  useEffect(() => {
    const updateVisibleCount = () => {
      if (window.innerWidth < 768) setVisibleCount(1);
      else if (window.innerWidth < 1024) setVisibleCount(2);
      else setVisibleCount(3);
    };
    updateVisibleCount();
    window.addEventListener('resize', updateVisibleCount);
    return () => window.removeEventListener('resize', updateVisibleCount);
  }, []);

  const totalPages = Math.ceil(skills.length / visibleCount);

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
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrev = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const visibleSkills = () => {
    const startIndex = currentPage * visibleCount;
    return skills.slice(startIndex, startIndex + visibleCount);
  };

  return (
    <section id="skills" className="relative py-20 px-4 md:px-10">
      <div ref={ref} className="max-w-6xl mx-auto">
        <div
          className="relative"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
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
                  <h3 className="text-[#22eaff] font-bold text-xl">{skill.title}</h3>
                  <p className="text-white text-sm">{skill.description}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Swipe Buttons */}
          <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -ml-4 md:ml-0">
            <button
              onClick={handlePrev}
              disabled={currentPage === 0}
              className="p-2 rounded-full bg-gray-800 hover:bg-[#22eaff]/20 transition-colors disabled:opacity-30"
              aria-label="Previous skill"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6" /></svg>
            </button>
          </div>

          <div className="absolute right-0 top-1/2 transform -translate-y-1/2 -mr-4 md:mr-0">
            <button
              onClick={handleNext}
              disabled={currentPage >= totalPages - 1}
              className="p-2 rounded-full bg-gray-800 hover:bg-[#22eaff]/20 transition-colors disabled:opacity-30"
              aria-label="Next skill"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6" /></svg>
            </button>
          </div>

          {/* Navigation dots */}
          <div className="flex justify-center mt-8 space-x-2">
            {Array.from({ length: totalPages }).map((_, idx) => (
              <span
                key={idx}
                className={`w-3 h-3 rounded-full ${idx === currentPage ? 'bg-[#22eaff]' : 'bg-gray-500'} transition-all duration-300`}
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
